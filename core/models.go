package core

import (
	"github.com/dukex/uhura/core/helper"
	"time"
)

type Channel struct {
	Title         string `sql:"not null;unique"`
	Description   string
	ImageUrl      string
	Copyright     string
	LastBuildDate string
	Url           string `sql:"not null;unique"`
	Id            int
	Uri           string
	Featured      bool
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Language      string
	helper.Uriable
}

type UserChannel struct {
	Id        int
	UserId    int
	ChannelId int
	CreatedAt time.Time
	UpdatedAt time.Time
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

type Item struct {
	Key         string `sql:"unique"`
	SourceUrl   string `sql:"not null;unique"`
	Title       string
	Description string
	ChannelId   int
	Id          int
	PublishedAt time.Time `sql:"not null"`
	Duration    string
	Uri         string
}

type UserItem struct {
	Id        int
	UserId    int
	ItemId    int
	Viewed    bool
	CreatedAt time.Time
}

// type ChannelCategories struct {
// 	Id         int64
// 	ChannelId  int64
// 	CategoryId int64
// }
