package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	auth "github.com/dukex/login2"
	"github.com/dukex/uhura/core"
	"github.com/gorilla/context"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

var (
	ASSETS_VERSION string
	ENV            string
	PORT           string
	URL            string
	loginBuilder   *auth.Builder
	MIXPANEL       *core.Mixpanel
	EMAIL          string
	PAGES          map[string][]byte
)

// Helpers

func userLogin(userId string) {
	go func() {
		user, _ := core.UserById(userId)

		people := MIXPANEL.Identify(userId)
		people.Set(map[string]interface{}{
			"$email":      user.Email,
			"$last_login": time.Now(),
			"$created":    user.CreatedAt,
			"provider":    user.Provider,
		})
	}()
}

func userSetup(provider string, user *auth.User, rawResponde *http.Response) (int64, error) {
	realUser, err := core.UserByEmail(user.Email)
	if err != nil {
		if err == gorm.RecordNotFound {
			return core.UserCreateFromOAuth(provider, user)
		}
		return 0, err
	} else {
		return realUser.Id, nil
	}
}

func userCreate(email, password string, request *http.Request) (int64, error) {
	user, err := core.UserCreate(email, password)

	go func() {
		userId := strconv.Itoa(int(user.Id))
		p := MIXPANEL.Identify(userId)
		p.Track("sign up", map[string]interface{}{"from": "email"})
		p.Set(map[string]interface{}{"$email": user.Email, "gender": user.Gender})
	}()

	return user.Id, err
}

func userId(email string) (int64, error) {
	user, err := core.UserByEmail(email)
	return user.Id, err
}

func checkEnvVar(key string) {
	if os.Getenv(key) == "" {
		panic("Missing " + key)
	}
}

func checkVars() {
	checkEnvVar("URL")
	checkEnvVar("BUFFER_PROFILE")
	checkEnvVar("SEARCHBOX_URL")
	checkEnvVar("SEARCH_INDEX")
	checkEnvVar("MIXPANEL_TOKEN")
	checkEnvVar("SMTP_PASSWORD")
	checkEnvVar("SMTP_HOST")
	checkEnvVar("SMTP_SERVER")
	checkEnvVar("ENV")
	checkEnvVar("PORT")
	checkEnvVar("DATABASE_URL")
	checkEnvVar("MEMCACHEDCLOUD_SERVERS")
	checkEnvVar("GOOGLE_CALLBACK_URL")
	checkEnvVar("GOOGLE_CLIENT_ID")
	checkEnvVar("GOOGLE_CLIENT_SECRET")
	checkEnvVar("FACEBOOK_CALLBACK_URL")
	checkEnvVar("FACEBOOK_CLIENT_ID")
	checkEnvVar("FACEBOOK_CLIENT_SECRET")
}

func configAuth() {
	loginBuilder = auth.NewBuilder()

	loginBuilder.NewProvider(&auth.Provider{
		RedirectURL: os.Getenv("GOOGLE_CALLBACK_URL"),
		AuthURL:     "https://accounts.google.com/o/oauth2/auth",
		TokenURL:    "https://accounts.google.com/o/oauth2/token",
		Name:        "google",
		Key:         os.Getenv("GOOGLE_CLIENT_ID"),
		Secret:      os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scope:       "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
		UserInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
	})

	loginBuilder.NewProvider(&auth.Provider{
		RedirectURL: os.Getenv("FACEBOOK_CALLBACK_URL"),
		AuthURL:     "https://www.facebook.com/dialog/oauth",
		TokenURL:    "https://graph.facebook.com/oauth/access_token",
		Name:        "facebook",
		Key:         os.Getenv("FACEBOOK_CLIENT_ID"),
		Secret:      os.Getenv("FACEBOOK_CLIENT_SECRET"),
		Scope:       "email",
		UserInfoURL: "https://graph.facebook.com/me",
	})

	loginBuilder.UserSetupFn = userSetup
	loginBuilder.UserCreateFn = userCreate
	loginBuilder.UserIdByEmail = userId
	loginBuilder.UserPasswordByEmail = core.UserPasswordByEmail
	loginBuilder.UserResetPasswordFn = core.UserResetPassword
	loginBuilder.LoginFn = userLogin
	loginBuilder.URLS = auth.URLS{
		Redirect:             "/app",
		SignIn:               "/login",
		SignUp:               "/enter",
		ResetPasswordSuccess: "/reset_password?step=2",
	}
}

func getVersion() string {
	vBytes, err := ioutil.ReadFile("./VERSION")
	if err != nil {
		return "1"
	}
	version := string(vBytes[:])
	version = strings.Replace(version, "\n", "", -1)
	return version
}

func BuildPage(page string, data string) string {
	if ENV == "development" {
		buildPageFromFile(page)
	}

	var pageBytes []byte
	pageBytes, ok := PAGES[page]

	if !ok {
		pageBytes, _ = buildPageFromFile(page)
	}

	pageHTML := string(pageBytes[:])
	pageHTML = strings.Replace(pageHTML, "<% EMAIL %>", EMAIL, -1)
	pageHTML = strings.Replace(pageHTML, "<% URL %>", URL, -1)
	pageHTML = strings.Replace(pageHTML, "<% ASSETS_VERSION %>", ASSETS_VERSION, -1)
	pageHTML = strings.Replace(pageHTML, "<% DATA %>", data, -1)

	return pageHTML
}

func buildPageFromFile(page string) ([]byte, error) {
	pBytes, err := ioutil.ReadFile("./views/" + page + ".html")
	PAGES[page] = pBytes
	return pBytes, err
}

// Handlers
func LandingHandler(w http.ResponseWriter, r *http.Request) {
	if _, ok := loginBuilder.CurrentUser(r); ok {
		http.Redirect(w, r, "/app/", 302)
	} else {
		fmt.Fprintf(w, BuildPage("index", ""))
	}
}

func EnterHandler(w http.ResponseWriter, r *http.Request) {
	if _, ok := loginBuilder.CurrentUser(r); ok {
		http.Redirect(w, r, "/app/", 302)
	} else {
		EMAIL = r.FormValue("email")
		exists := core.UserExists(EMAIL)
		if exists {
			http.Redirect(w, r, "/login?user=exists", 302)
		} else {
			fmt.Fprintf(w, BuildPage("users/sign_up", ""))
		}
	}
}

func AppHandler(userId string, w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, BuildPage("app", ""))
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if _, ok := loginBuilder.CurrentUser(r); ok {

	} else {
		fmt.Fprintf(w, BuildPage("users/sign_in", ""))
	}
}

func ResetPassword(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	if step, ok := query["step"]; ok && step[0] == "2" {
		fmt.Fprintf(w, BuildPage("users/success_reset_password", ""))
	} else {
		fmt.Fprintf(w, BuildPage("users/reset_password", ""))
	}
}

func ChangePasswordPage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	hash := vars["hash"]
	ok := core.UserExistsByRememberToken(hash)
	if ok {
		fmt.Fprintf(w, BuildPage("users/change_password", hash))
	} else {
		http.Redirect(w, r, "/", 302)
	}
}

func main() {
	checkVars()

	PAGES = make(map[string][]byte, 0)
	ASSETS_VERSION = getVersion()
	ENV = os.Getenv("ENV")
	PORT = os.Getenv("PORT")
	URL = os.Getenv("URL")
	MIXPANEL = core.NewMixpanel(os.Getenv("MIXPANEL_TOKEN"))

	configAuth()

	BuildPage("index", "")
	BuildPage("app", "")

	// HTTP Server
	r := mux.NewRouter()
	r.StrictSlash(true)

	r.HandleFunc("/", LandingHandler)

	// Auth Router
	loginBuilder.Router(r)

	// User
	r.HandleFunc("/enter", EnterHandler)
	r.HandleFunc("/login", LoginHandler)
	r.HandleFunc("/reset_password", ResetPassword)
	r.HandleFunc("/change_password/{hash}", ChangePasswordPage)
	r.HandleFunc("/password", core.ChangePassword).Methods("POST")

	// API
	apiRouter := r.PathPrefix("/api").Subrouter()
	apiRouter.StrictSlash(true)

	apiRouter.HandleFunc("/subscriptions", loginBuilder.Protected(core.GetSubscriptions))
	// apiRouter.HandleFunc("/channels", loginBuilder.Protected(core.GetChannels))
	apiRouter.HandleFunc("/channels/{id}", loginBuilder.Protected(core.GetChannel))
	apiRouter.HandleFunc("/channels/{id}/reload", loginBuilder.Protected(core.ReloadChannel))
	apiRouter.HandleFunc("/channels/{id}/subscribe", loginBuilder.Protected(core.SubscribeChannel))
	apiRouter.HandleFunc("/channels/{id}/unsubscribe", loginBuilder.Protected(core.UnsubscribeChannel))
	apiRouter.HandleFunc("/episodes", loginBuilder.Protected(core.GetEpisodes))
	apiRouter.HandleFunc("/episodes/{id}/listened", loginBuilder.Protected(core.SetEpisodeListened))
	apiRouter.HandleFunc("/suggestions", loginBuilder.Protected(core.SugestionsEpisodes))

	// API Search
	apiRouter.HandleFunc("/s/channels", loginBuilder.Protected(core.SearchChannels))

	apiRouter.HandleFunc("/finder", loginBuilder.Protected(core.FindChannels))

	// App
	appRouter := r.PathPrefix("/app").Subrouter()
	appRouter.StrictSlash(true)
	appRouter.HandleFunc("/", loginBuilder.Protected(AppHandler))
	appRouter.HandleFunc("/{path:.+}", loginBuilder.Protected(AppHandler))

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("./public/")))

	h := context.ClearHandler(handlers.LoggingHandler(os.Stdout, r))

	http.Handle("/", h)
	server := &http.Server{
		Addr:           ":" + PORT,
		Handler:        h,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go core.DatabaseManager()

	fmt.Println("Starting server on", PORT)
	log.Fatal(server.ListenAndServe())
}
