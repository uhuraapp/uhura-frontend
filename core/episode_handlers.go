package core

import (
	"net/http"
	"strconv"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
)

// func SugestionsEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
// 	episodes := make([]EpisodeEntity, 0)
// 	channels := make([]ChannelEntity, 0)

// 	q := database.Table("user_channels").Joins("INNER JOIN channels ON channels.id = user_channels.channel_id JOIN (SELECT * FROM (SELECT ROW_NUMBER() OVER (PARTITION BY items.channel_id order by items.channel_id DESC) AS count,items.* FROM items) line WHERE line.count <= 5) items ON items.channel_id = channels.id FULL OUTER JOIN user_items ON user_items.item_id = items.id").Where("user_channels.user_id = ?", userId).Where("user_items.id IS NULL")

// 	//q.Scopes(episodeDefaultQuery).Find(&episodes)
// 	q.Select("DISTINCT ON (channels.id) channels.id, channels.*").Find(&channels)

// 	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes, "channels": channels})
// }

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
