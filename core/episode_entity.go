package core

import "time"

type EpisodeEntity struct {
	Id          int64       `json:"id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Listened    interface{} `json:"listened"`
	ChannelId   int         `json:"channel_id"`
	SourceUrl   string      `json:"source_url"`
	Uri         interface{} `json:"uri"`
	PublishedAt time.Time   `json:"published_at"`
	Duration    string      `json:"duration"`
}
