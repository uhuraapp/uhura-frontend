package core

import (
	"strconv"

	"github.com/dchest/uniuri"
	auth "github.com/dukex/login2"
)

func UserExists(email string) bool {
	var count int

	database.Table("users").Where("email = ?", email).Count(&count)

	return count > 0
}

func UserCreate(email, password string) (User, error) {
	user := User{Email: email, Password: password, Provider: "email"}
	err := database.Save(&user).Error

	return user, err
}

func UserByEmail(email string) (User, error) {
	var user User
	err := database.Where("email = ?", email).First(&user).Error
	return user, err
}

func UserCreateFromOAuth(provider string, temp *auth.User) (int64, error) {
	user := User{
		Email:      temp.Email,
		Password:   uniuri.NewLen(6),
		Provider:   provider,
		ProviderId: temp.Id,
		Link:       temp.Link,
		Picture:    temp.Picture,
		Locale:     temp.Locale,
	}
	err := database.Save(&user).Error

	if err != nil {
		return 0, err
	}

	go func() {
		userId := strconv.Itoa(int(user.Id))
		p := MIXPANEL.Identify(userId)
		p.Track("sign up", map[string]interface{}{"from": provider})
		p.Set(map[string]interface{}{"$email": user.Email, "gender": user.Gender})
	}()

	return user.Id, err
}

func UserPasswordByEmail(email string) (password string, ok bool) {
	var user User
	ok = false

	err := database.Where("email = ? ", email).First(&user).Error

	if err != nil {
		return
	}

	password = user.Password
	ok = true
	return
}
