package core

import (
	"time"
)

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
