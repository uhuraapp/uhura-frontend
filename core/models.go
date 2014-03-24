package core

import (
	"github.com/dukex/uhura/core/helper"
	"time"
)

type Channel struct {
	Id            int64
	Title         string `sql:"not null;unique"`
	Description   string
	ImageUrl      string
	Copyright     string
	LastBuildDate string
	Url           string `sql:"not null;unique"`
	Uri           string
	Featured      bool
	CreatedAt     time.Time
	UpdatedAt     time.Time
	Language      string
	Link          string
	Loading       bool
	helper.Uriable
}

type UserChannel struct {
	Id        int64
	UserId    int64
	ChannelId int64
	CreatedAt time.Time
	UpdatedAt time.Time
}

type User struct {
	Id          int64
	Name        string
	GivenName   string
	FamilyName  string
	Link        string
	Picture     string
	Gender      string
	Locale      string
	GoogleId    string
	Email       string      `sql:"not null;unique"`
	Password    interface{} `sql:"type:varchar(100);"`
	WelcomeMail bool
	CreatedAt   time.Time
	Provider    string
	ProviderId  interface{} `sql:"type:varchar(50);"`
}

type Item struct {
	Id          int64
	ChannelId   int64
	Key         string `sql:"unique"`
	SourceUrl   string `sql:"not null;unique"`
	Title       string
	Description string
	PublishedAt time.Time `sql:"not null"`
	Duration    string
	Uri         string
	helper.Uriable
}

type UserItem struct {
	Id        int64
	UserId    int64
	ItemId    int64
	Viewed    bool
	ChannelId int64
	CreatedAt time.Time
}

type ChannelCategories struct {
	Id         int64
	ChannelId  int64
	CategoryId int64
}

type Category struct {
	Id        int64
	Name      string `sql:"not null;unique"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
