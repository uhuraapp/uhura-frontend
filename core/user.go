package core

// import (
// 	"encoding/json"
// 	"github.com/gorilla/sessions"
// 	"net/http"
// 	"strconv"
// 	"time"
// )

// var store = sessions.NewCookieStore([]byte("something-very-secret"))

func UserExists(email string) bool {
	var count int

	database.Table("users").Where("email = ?", email).Count(&count)

	return count > 0
}

func UserCreate(email, password string) (User, error) {
	user := User{Email: email, Password: password}
	err := database.Save(&user).Error

	return user, err
}

func UserByEmail(email string) (User, error) {
	var user User
	err := database.Where("email = ?", email).First(&user).Error
	return user, err
}

// test
func UserPasswordByEmail(email string) (string, error) {
	var user User
	err := database.Where("email = ? ", email).First(&user).Error

	return user.Password, err
}

// type TempUser struct {
// 	Id         string
// 	Name       string
// 	GivenName  string
// 	FamilyName string
// 	Link       string
// 	Picture    string
// 	Gender     string
// 	Locale     string
// 	Email      string
// }

// func (u *User) IdString() string {
// 	return strconv.Itoa(u.Id)
// }

// func createUser(tempUser TempUser) *User {
// 	var user User

// 	database.Where(User{GoogleId: tempUser.Id}).Attrs(User{CreatedAt: time.Now()}).Assign(User{Name: tempUser.Name, GivenName: tempUser.GivenName, FamilyName: tempUser.FamilyName, Link: tempUser.Link, Picture: tempUser.Picture, Gender: tempUser.Gender, Locale: tempUser.Locale, Email: tempUser.Email}).FirstOrCreate(&user)
// 	if !user.WelcomeMail {
// 		WelcomeMail(&user)
// 	}
// 	return &user
// }

// func getUser(userId string) (*User, bool) {
// 	var user User

// 	id, _ := strconv.Atoi(userId)

// 	if id == 0 {
// 		return nil, true
// 	}

// 	if database.First(&user, id).RecordNotFound() {
// 		return nil, true
// 	}

// 	return &user, false
// }

// func CurrentUser(request *http.Request) (*User, bool) {
// 	session, _ := store.Get(request, "_uhura_session")
// 	userId, ok := session.Values["user_id"].(string)
// 	if ok {
// 		user, err := getUser(userId)
// 		return user, err
// 	} else {
// 		return nil, true
// 	}
// }

// func SetReturnTo(request *http.Request, responseWriter http.ResponseWriter, url string) {
// 	session, _ := store.Get(request, "_uhura_session")
// 	session.Values["return_to"] = url
// 	session.Save(request, responseWriter)
// }

// func GetReturnTo(request *http.Request) string {
// 	session, _ := store.Get(request, "_uhura_session")
// 	url, ok := session.Values["return_to"].(string)
// 	if !ok {
// 		url = "/dashboard"
// 	}
// 	return url
// }

// func CreateAndLoginUser(request *http.Request, responseWriter http.ResponseWriter, responseAuth *http.Response) (*User, bool) {
// 	var tempUser TempUser
// 	decoder := json.NewDecoder(responseAuth.Body)
// 	err := decoder.Decode(&tempUser)
// 	if err != nil {
// 		panic(err)
// 	}

// 	user := createUser(tempUser)

// 	session, _ := store.Get(request, "_uhura_session")
// 	session.Values["user_id"] = user.IdString()

// 	session.Save(request, responseWriter)
// 	return user, false
// }
