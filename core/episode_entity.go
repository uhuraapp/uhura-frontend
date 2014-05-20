package core

import "time"

type EpisodeEntity struct {
	Id          int64     `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Listened    bool      `json:"listened"`
	ChannelId   int64     `json:"channel_id"`
	SourceUrl   string    `json:"source_url"`
	Uri         string    `json:"uri"`
	PublishedAt time.Time `json:"published_at"`
	Duration    string    `json:"duration"`
	Type        string    `json:"type"`
}
