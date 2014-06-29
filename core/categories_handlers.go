package core

import (
	"net/http"
	"time"

	r "github.com/dukex/uhura/core/helper"
)

type CategoryEntity struct {
	Id       string  `json:"id"`
	Name     string  `json:"name"`
	Channels []int64 `json:"channels"`
}

type Category struct {
	Id        int64
	Name      string `sql:"not null;unique"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func GetCategories(userId string, w http.ResponseWriter, request *http.Request) {

	var categories []CategoryEntity

	database.Table("categories").Find(&categories)
	setChannelsToCategories(categories)

	r.ResponseJSON(w, 200, map[string][]CategoryEntity{"categories": categories})
}

func setChannelsToCategories(categories []CategoryEntity) {
	for i, _ := range categories {
		categories[i].Channels = categories[i].setChannels()
	}
}

func (ce *CategoryEntity) setChannels() []int64 {
	channelsIds := make([]int64, 0)

	database.Table("channel_categories").
		Where("channel_categories.category_id = ?", ce.Id).
		Pluck("channel_id", &channelsIds)

	return channelsIds
}
