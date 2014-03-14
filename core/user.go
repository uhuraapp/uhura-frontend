package core

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
func UserPasswordByEmail(email string) (string, bool) {
	var user User
	err := database.Where("email = ? ", email).First(&user).Error
	if err != nil {
		return "", true
	}
	password, ok := user.Password.(string)
	if ok {
		return password, false
	}

	return "", true
}
