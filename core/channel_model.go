package core

import (
	"time"

	"github.com/dukex/uhura/core/helper"
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
	Colors        string
	helper.Uriable
}

func (c *Channel) SetUri() string {
	uri := c.MakeUri(c.Title)
	database.Table("channels").Where(c.Id).Update("Uri", uri)

	return uri
}
