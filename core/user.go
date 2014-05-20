package core

import (
	"net/http"
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

func UserById(id string) (User, error) {
	var user User
	err := database.First(&user, id).Error
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
		Name:       temp.Name,
	}
	err := database.Save(&user).Error

	if err != nil {
		return 0, err
	}

	go func() {
		userId := strconv.Itoa(int(user.Id))
		p := MIXPANEL.Identify(userId)
		p.Track("sign up", map[string]interface{}{"from": provider})
		p.Update("$set", map[string]interface{}{"$email": user.Email, "gender": user.Gender})
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

func UserResetPassword(token string, email string) {
	var user User
	database.Table("users").Where("email = ? ", email).First(&user).Update("remember_token", token)
	ResetPasswordEmail(&user)
}

func UserByRememberToken(hash string) (User, error) {
	var user User
	err := database.Table("users").Where("remember_token = ? AND remember_token <> '0'", hash).First(&user).Error
	return user, err
}

func UserExistsByRememberToken(hash string) bool {
	_, err := UserByRememberToken(hash)
	return err == nil
}

func ChangePassword(w http.ResponseWriter, r *http.Request) {
	password := r.FormValue("password")
	password_confirmation := r.FormValue("password_confirmation")
	hash := r.FormValue("hash")
	if password != "" && password == password_confirmation {
		user, err := UserByRememberToken(hash)
		if err == nil {
			hPassword, _ := auth.GenerateHash(password)
			user.Password = hPassword
			user.RememberToken = "0"
			database.Save(&user)
			http.Redirect(w, r, "/login/"+"?password=changed", http.StatusTemporaryRedirect)
		} else {
			http.Redirect(w, r, "/change_password/"+hash+"?password=error", http.StatusTemporaryRedirect)
		}
	} else {
		http.Redirect(w, r, "/change_password/"+hash+"?password=dont_match", http.StatusTemporaryRedirect)
	}
}
