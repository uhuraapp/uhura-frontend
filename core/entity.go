package core

import "time"

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

type EpisodeEntity struct {
	Id          int         `json:"id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Listened    interface{} `json:"listened"`
	ChannelId   int         `json:"channel_id"`
	SourceUrl   string      `json:"source_url"`
	Uri         interface{} `json:"uri"`
	PublishedAt time.Time   `json:"published_at"`
	Duration    string      `json:"duration"`
}
