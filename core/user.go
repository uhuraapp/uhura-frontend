package core

import (
	"encoding/json"
	"github.com/gorilla/sessions"
	"net/http"
	"strconv"
	"time"
)

var store = sessions.NewCookieStore([]byte("something-very-secret"))

type TempUser struct {
	Id         string
	Name       string
	GivenName  string
	FamilyName string
	Link       string
	Picture    string
	Gender     string
	Locale     string
	Email      string
}

type User struct {
	Id          int
	Name        string
	GivenName   string
	FamilyName  string
	Link        string
	Picture     string
	Gender      string
	Locale      string
	GoogleId    string
	Email       string
	WelcomeMail bool
	CreatedAt   time.Time
}

func (u *User) AfterCreate() {
	WelcomeMail(u)
}

func (u *User) IdString() string {
	return strconv.Itoa(u.Id)
}

func createUser(tempUser TempUser) *User {
	var user User

	database.Where(User{GoogleId: tempUser.Id}).Assign(User{Name: tempUser.Name, GivenName: tempUser.GivenName, FamilyName: tempUser.FamilyName, Link: tempUser.Link, Picture: tempUser.Picture, Gender: tempUser.Gender, Locale: tempUser.Locale, Email: tempUser.Email}).FirstOrCreate(&user)

	return &user
}

func getUser(userId string) (*User, bool) {
	var user User

	id, _ := strconv.Atoi(userId)

	if id == 0 {
		return nil, true
	}

	database.First(&user, id)

	return &user, false
}

func CurrentUser(request *http.Request) (*User, bool) {
	session, _ := store.Get(request, "session")
	userId, ok := session.Values["user_id"].(string)
	if ok {
		user, err := getUser(userId)
		return user, err
	} else {
		return nil, true
	}
}

func SetReturnTo(request *http.Request, responseWriter http.ResponseWriter, url string) {
	session, _ := store.Get(request, "session")
	session.Values["return_to"] = url
	session.Save(request, responseWriter)
}

func GetReturnTo(request *http.Request) string {
	session, _ := store.Get(request, "session")
	url, ok := session.Values["return_to"].(string)
	if !ok {
		url = "/dashboard"
	}
	return url
}

func CreateAndLoginUser(request *http.Request, responseWriter http.ResponseWriter, responseAuth *http.Response) (*User, bool) {
	var tempUser TempUser
	decoder := json.NewDecoder(responseAuth.Body)
	err := decoder.Decode(&tempUser)
	if err != nil {
		panic(err)
	}

	user := createUser(tempUser)

	session, _ := store.Get(request, "session")
	session.Values["user_id"] = user.IdString()

	session.Save(request, responseWriter)
	return user, false
}
