package core

import (
	"net/http"
	"time"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
)

type CategoryEntity struct {
	Id   string `json:"id"`
	Name string `json:"name"`
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

	r.ResponseJSON(w, 200, map[string][]CategoryEntity{"categories": categories})
}

func GetCategoryChannels(userId string, w http.ResponseWriter, request *http.Request) {
	channels := make([]ChannelEntity, 0)
	vars := mux.Vars(request)
	id := vars["id"]

	database.Table("channel_categories").Select("DISTINCT(channels.id), channels.*").
		Joins("LEFT JOIN channels on channels.id = channel_categories.channel_id").
		Where("channel_categories.category_id = ?", id).
		Order("title").
		Find(&channels)

	for i, _ := range channels {
		channels[i].SetSubscription(userId)
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
}
