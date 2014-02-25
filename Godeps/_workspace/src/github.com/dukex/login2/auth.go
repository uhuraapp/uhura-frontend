// Package login2 provides sign in and sign up by oauth2 and email and password.
// Inspired in omniauth and devise gem
//
package login2

import (
	"encoding/json"
	"net/http"
	"os"
	"strconv"

	"code.google.com/p/go.crypto/bcrypt"
	"code.google.com/p/goauth2/oauth"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))

// Provider is a oauth2 provider, like facebook or google
// Name is provider name, it's like a key, will can be use it after,
// the package only use it as a index.
// Key is oauth2 key
// Secret is oauth2 secret key
// RedirectURL is a url will config on provider
// TokenURL is a URL to get the token on provider
// AuthURL is a URL to auth user on provider
// UserInfoURL is a URL to get User Information on provider
// Scope is whats the scope your app wants
type Provider struct {
	Name        string
	Key         string
	Secret      string
	RedirectURL string
	TokenURL    string
	AuthURL     string
	UserInfoURL string
	Scope       string
}

// Internal auth config
type builderConfig struct {
	Auth        *oauth.Config
	UserInfoURL string
}

// URLS

type URLS struct {
	Redirect string
	SignIn   string
	SignUp   string
}

type Builder struct {
	Providers           map[string]*builderConfig
	UserSetupFn         func(provider string, user *User, rawResponde *http.Response)
	UserExistsFn        func(email string) bool
	UserCreateFn        func(email string, password string, request *http.Request) (int64, error)
	UserIdByEmail       func(email string) (int64, error)
	UserPasswordByEmail func(email string) (string, error)
	URLS                URLS
}

type User struct {
	ID     int64
	Email  string
	Link   string
	Name   string
	Gender string
	Locale string
}

func NewBuilder(userProviders []*Provider) *Builder {
	builder := new(Builder)
	builder.Providers = make(map[string]*builderConfig, 0)

	for _, p := range userProviders {
		config := &oauth.Config{
			ClientId:     p.Key,
			ClientSecret: p.Secret,
			RedirectURL:  p.RedirectURL,
			Scope:        p.Scope,
			AuthURL:      p.AuthURL,
			TokenURL:     p.TokenURL,
			TokenCache:   oauth.CacheFile("cache-" + p.Name + ".json"),
		}

		provider := new(builderConfig)
		provider.Auth = config
		provider.UserInfoURL = p.UserInfoURL

		builder.Providers[p.Name] = provider
	}

	return builder
}

func (b *Builder) Router(r *mux.Router) {
	for provider, _ := range b.Providers {
		r.HandleFunc("/auth/"+provider, b.OAuthAuthorize(provider)).Methods("GET")
	}

	r.HandleFunc("/auth/callback/{provider}", b.OAuthLogin()).Methods("GET")
	r.HandleFunc("/users/sign_in", b.SignIn()).Methods("POST")
	r.HandleFunc("/users/sign_up", b.SignUp()).Methods("POST")

}

// HTTP server

// OAuthAuthorize Send user to Authorize on provider
func (b *Builder) OAuthAuthorize(provider string) func(http.ResponseWriter, *http.Request) {
	config := b.Providers[provider]

	return func(w http.ResponseWriter, r *http.Request) {
		url := config.Auth.AuthCodeURL("")
		http.Redirect(w, r, url, http.StatusFound)
	}
}

func (b *Builder) OAuthLogin() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, request *http.Request) {
		vars := mux.Vars(request)
		provider := vars["provider"]

		user := b.OAuthCallback(provider, request)

		b.login(request, w, strconv.FormatInt(user.ID, 10))
	}
}

// OAuthCallback receive code from provider and get user information on provider
func (b *Builder) OAuthCallback(provider string, r *http.Request) User {
	config := b.Providers[provider]
	code := r.FormValue("code")
	t := &oauth.Transport{Config: config.Auth}
	t.Exchange(code)
	responseAuth, _ := t.Client().Get(config.UserInfoURL)
	defer responseAuth.Body.Close()

	var user User
	decoder := json.NewDecoder(responseAuth.Body)
	err := decoder.Decode(&user)
	if err != nil {
		panic(err)
	}

	b.UserSetupFn(provider, &user, responseAuth)
	return user
}

// SignUp Hanlder create and login user on database and redirecto to RedirectURL
func (b *Builder) SignUp() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, request *http.Request) {
		email := request.FormValue("email")
		password := request.FormValue("password")
		hpassword := generatePassword(password)

		userID, err := b.UserCreateFn(email, hpassword, request)
		if err != nil {
			http.Redirect(w, request, b.URLS.SignIn, 302)
		} else {
			b.login(request, w, strconv.FormatInt(userID, 10))
		}
	}
}

func (b *Builder) SignIn() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		email := r.FormValue("email")
		password := r.FormValue("password")
		userPassword, err := b.UserPasswordByEmail(email)

		if err != nil {
			http.Redirect(w, r, b.URLS.Redirect, 302)
		}

		err = checkPassword(userPassword, password)
		if err != nil {
			http.Redirect(w, r, b.URLS.Redirect, 302)
		} else {
			userId, _ := b.UserIdByEmail(email)
			b.login(r, w, strconv.FormatInt(userId, 10))
		}
	}
}

func (b *Builder) Protected(fn func(string, http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := b.CurrentUser(r)
		if userID != "" {
			fn(userID, w, r)
		} else {
			http.Redirect(w, r, b.URLS.SignIn, 302)
		}
	}
}

// helper

func (b *Builder) login(r *http.Request, w http.ResponseWriter, userId string) {
	session, _ := store.Get(r, "_session")
	session.Values["user_id"] = userId
	session.Save(r, w)

	http.Redirect(w, r, b.URLS.Redirect, 302)
}

func (b *Builder) CurrentUser(r *http.Request) string {
	session, _ := store.Get(r, "_session")
	userId := session.Values["user_id"]
	id, _ := userId.(string)
	return id
}

func generatePassword(password string) string {
	h, _ := bcrypt.GenerateFromPassword([]byte(password), 0)
	return string(h[:])
}

func checkPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
