package core

import (
	"strconv"
	"time"
)

type ChannelEntity struct {
	Title       string      `json:"title"`
	Description string      `json:"description"`
	ImageUrl    string      `json:"image_url"`
	Url         string      `json:"url"`
	Id          int64       `json:"id"`
	Uri         string      `json:"uri"`
	ToView      int         `json:"to_view"`
	Subscribed  interface{} `json:"subscribed"`
	Copyright   string      `json:"copyright"`
	Episodes    []int       `json:"episodes"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

func (ce *ChannelEntity) FixUri() string {
	if ce.Uri == "" {
		ch := Channel{Title: ce.Title, Id: ce.Id}
		ce.Uri = ch.SetUri()
	}
	return ce.Uri
}

func (ce *ChannelEntity) SetSubscribe(userId string) {
	var status bool

	channelId := strconv.Itoa(int(ce.Id))
	cacheKey := "s:" + channelId + ":" + userId

	cached, err := CacheGet(cacheKey, status)

	if err != nil {
		err = database.Table("user_channels").
			Where("channel_id = ? AND user_id = ?", ce.Id, userId).
			First(&UserChannel{}).Error
		status = err == nil

		CacheSet(cacheKey, status)
	} else {
		status = cached.(bool)
	}

	ce.Subscribed = status
}

func (ce *ChannelEntity) Cache() ChannelEntity {
	var (
		cacheKey    = "c:" + strconv.Itoa(int(ce.Id))
		episodesIds []int
	)

	if _, err := CacheGet(cacheKey, ChannelEntity{}); err != nil {
		database.Table("items").Where("items.channel_id = ?", ce.Id).Pluck("id", &episodesIds)
		ce.Episodes = episodesIds

		CacheSet(cacheKey, ce)
	}

	return *ce
}
