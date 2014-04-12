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
	ToView      int64       `json:"to_view"`
	Subscribed  interface{} `json:"subscribed"`
	Copyright   string      `json:"copyright"`
	Episodes    []int64     `json:"episodes"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

func (ce *ChannelEntity) FixUri() string {
	if ce.Uri == "" {
		ch := Channel{Title: ce.Title, Id: ce.Id}
		ce.Uri = ch.SetUri()
	}
	return ce.Uri
}

func (ce *ChannelEntity) SetSubscribed(userId string) {
	status := true
	go func() {
		channelId := strconv.Itoa(int(ce.Id))
		cacheKey := "s:" + channelId + ":" + userId
		CacheSet(cacheKey, status)
	}()
	ce.Subscribed = status
}

func (ce *ChannelEntity) GetEpisodesIds() []int64 {
	var (
		key         = "c:e:" + strconv.Itoa(int(ce.Id))
		episodesIds []int64
	)

	cachedEpisodes, err := CacheGet(key, episodesIds)
	if err == nil {
		episodesIds = cachedEpisodes.([]int64)
	} else {
		database.Table("items").Where("items.channel_id = ?", ce.Id).Pluck("id", &episodesIds)

		go CacheSet(key, episodesIds)
	}
	return episodesIds
}

func (ce *ChannelEntity) GetToView(userId string) int64 {
	var (
		listened int64
		key      = "u:l:" + strconv.Itoa(int(ce.Id)) + ":" + userId
	)

	episodesIds := int64(len(ce.GetEpisodesIds()))

	listenedCache, err := CacheGet(key, listened)
	if err == nil {
		listened = listenedCache.(int64)
	} else {
		database.Table("user_items").
			Where("channel_id = ? AND user_id = ?", ce.Id, userId).
			Count(&listened)
		go CacheSet(key, listened)
	}
	return episodesIds - listened
}
