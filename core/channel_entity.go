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
	Id          int64       `json:"raw_id"`
	Uri         string      `json:"id"`
	ToView      int64       `json:"to_view"`
	Subscribed  interface{} `json:"subscribed"`
	Copyright   string      `json:"copyright"`
	Episodes    []int64     `json:"episodes"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

func (ce *ChannelEntity) FixUri() string {
	ch := Channel{Title: ce.Title, Id: ce.Id}
	ce.Uri = ch.SetUri()
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

func (ce *ChannelEntity) SetEpisodesIds() {
	ce.Episodes = getEpisodesIds(ce.Id)
}

func (ce *ChannelEntity) SetSubscription(userId string) {
	var status bool
	key := "s:" + strconv.Itoa(int(ce.Id)) + ":" + userId
	_, err := CacheGet(key, status)
	ce.Subscribed = err == nil
}

func (ce *ChannelEntity) SetToView(userId string) {
	ce.ToView = getToView(ce.Id, userId)
}

func getToView(channelId int64, userId string) int64 {
	var (
		listened int64
		key      = "u:l:" + strconv.Itoa(int(channelId)) + ":" + userId
	)

	episodesIds := int64(len(getEpisodesIds(channelId)))

	// listenedCache, err := CacheGet(key, listened)
	// if err == nil  {
	// 	switch listenedCache := listenedCache.(type) {
	// 	case int64:
	// 		return listenedCache
	// 	case uint64:
	// 		return int64(listenedCache)
	// 	default:
	// 		return 0
	// 	}
	// 	log.Println("...", listenedCache)
	// 	listened = listenedCache.(int64)
	// } else {
	database.Table("user_items").
		Where("channel_id = ? AND user_id = ?", channelId, userId).
		Count(&listened)
	go CacheSet(key, listened)
	//}

	listenedCount := episodesIds - listened
	if listenedCount < 0 {
		listenedCount = 0
	}
	return listenedCount
}

func getEpisodesIds(channelId int64) []int64 {
	var (
		key         = "c:e:" + strconv.Itoa(int(channelId))
		episodesIds []int64
	)

	cachedEpisodes, err := CacheGet(key, episodesIds)
	if err == nil {
		episodesIds = cachedEpisodes.([]int64)
	} else {
		database.Table("items").Where("items.channel_id = ?", channelId).Pluck("id", &episodesIds)

		go CacheSet(key, episodesIds)
	}
	return episodesIds
}
