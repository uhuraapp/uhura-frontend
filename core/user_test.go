package core

import (
	"testing"
)

func TestUserFuncExistsTrue(test *testing.T) {
	cleanDB()
	database.Table("users").Save(&User{Email: "x@x.com"})
	result := UserExists("x@x.com")

	if !result {
		test.Errorf("Expexted user exists")
	}
}

func TestUserFuncExistsFalse(test *testing.T) {
	cleanDB()
	result := UserExists("x@x.com")

	if result {
		test.Errorf("Expexted user not exists")
	}
}

func TestUserFuncCreateOK(test *testing.T) {
	cleanDB()
	user, _ := UserCreate("x@x.com", "abc123")

	if user.Id < 1 {
		test.Errorf("Expexted user id")
	}

	if user.Email != "x@x.com" {
		test.Errorf("Expexted email x@x.com")
	}

	if user.Password != "abc123" {
		test.Errorf("Expexted password abc123")
	}
}

func TestUserFuncCreateErr(test *testing.T) {
	cleanDB()
	UserCreate("x@x.com", "abc123")
	user, err := UserCreate("x@x.com", "abc123")

	if user.Id != 0 {
		test.Errorf("Expexted no user id")
	}

	if err == nil {
		test.Errorf("Expexted a err")
	}
}
