package core

import (
	"net/http"
	"strconv"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
)

func SugestionsEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
	var (
		channelsIds []int
		items       []int64
	)

	channels := make([]ChannelEntity, 0)
	episodes := make([]EpisodeEntity, 0)

	subscriptionsCached, err := CacheGet("s:ids:"+userId, channelsIds)

	if err == nil {
		channelsIds = subscriptionsCached.([]int)

		if len(channelsIds) > 0 {
			database.Table("channels").Where("channels.id in (?)", channelsIds).Find(&channels)
		}

		database.Table("user_items").Where("user_id = ?", userId).Pluck("item_id", &items)

		database.Raw("SELECT * FROM (SELECT items.*,row_number() OVER (PARTITION BY channel_id ORDER BY title) AS number_rows FROM items WHERE channel_id IN (?) AND id NOT IN (?)) AS itemS WHERE number_rows <= 5 ORDER BY title", channelsIds, items).Scan(&episodes)
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes, "channels": channels})
}

func GetEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
	var userItems []int64

	episodes := make([]EpisodeEntity, 0)
	query := request.URL.Query()
	ids := query["ids[]"]

	if len(ids) > 0 {
		database.Table("items").Where("items.id in (?)", ids).Find(&episodes)

		database.Table("user_items").
			Where("item_id in (?)", ids).
			Where("user_id = ?", userId).
			Where("viewed = TRUE").
			Pluck("item_id", &userItems)
	}

	for i, episode := range episodes {
		episode.Listened = hasListened(userItems, episode.Id)
		episodes[i] = episode
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes})
}

func SetEpisodeListened(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])
	userIdInt, _ := strconv.Atoi(userId)

	database.Save(&UserItem{UserId: int64(userIdInt), ItemId: int64(id), Viewed: true})

	go func() {
		p := MIXPANEL.Identify(userId)
		p.Track("listened", map[string]interface{}{"Episode ID": id})
	}()

	r.ResponseJSON(w, 202, nil)
}

func hasListened(listened []int64, episode int64) bool {
	for _, t := range listened {
		if t == episode {
			return true
		}
	}
	return false
}
