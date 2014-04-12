package core

import (
	"strings"
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
	helper.Uriable
}

func (c *Channel) SetUri() string {
	uri := c.Uriable.MakeUri(c.Title)
	uri = strings.Replace(uri, "podcast", "", -1)
	database.Table("channels").Where(c.Id).Update("Uri", uri)

	return uri
}
