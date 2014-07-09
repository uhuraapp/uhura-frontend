package core

import (
	"time"
)

type User struct {
	Id            int64
	Name          string
	Link          string
	Picture       string
	Gender        string
	Locale        string
	GoogleId      string
	Email         string `sql:"not null;unique"`
	Password      string `sql:"type:varchar(100);"`
	WelcomeMail   bool
	CreatedAt     time.Time
	Provider      string      `sql:"type:varchar(100);"`
	ProviderId    string      `sql:"type:varchar(50);"`
	RememberToken string      `sql:"type:varchar(100);"`
	ApiToken      interface{} `sql:"type:varchar(100);"`
}

func (u *User) AfterCreate() {
	WelcomeMail(u)
}
