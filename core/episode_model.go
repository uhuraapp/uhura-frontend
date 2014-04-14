package core

import (
	"github.com/dukex/uhura/core/helper"
	"time"
)

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
	Type        string
	helper.Uriable
}
