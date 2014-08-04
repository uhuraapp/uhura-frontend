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
	)

	channels := make([]ChannelEntity, 0)
	episodes := make([]EpisodeEntity, 0)

	subscriptionsCached, err := CacheGet("s:ids:"+userId, channelsIds)

	if err == nil {
		channelsIds, _ = subscriptionsCached.([]int)

		if len(channelsIds) > 0 {
			database.Table("channels").Where("channels.id in (?)", channelsIds).Find(&channels)
			database.Raw("SELECT * FROM (SELECT items.*,row_number() OVER (PARTITION BY items.channel_id ORDER BY items.title) AS number_rows FROM items LEFT JOIN user_items ON user_items.item_id = items.id AND user_items.user_id = ? AND user_items.viewed = FALSE WHERE items.channel_id IN (?)) AS itemS WHERE number_rows <= 5 ORDER BY title", userId, channelsIds).Scan(&episodes)
		}
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes, "channels": channels})
}

func GetEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
	var userItems []int64

	episodes := make([]EpisodeEntity, 0)
	query := request.URL.Query()
	ids := query["ids[]"]

	if len(ids) > 0 {
		database.Table("items").
			Where("items.id in (?)", ids).
			Order("published_at DESC").
			Find(&episodes)

		database.Table("user_items").
			Where("item_id in (?)", ids).
			Where("user_id = ?", userId).
			Where("viewed = TRUE").
			Pluck("item_id", &userItems)
	}

	for i, episode := range episodes {
		episode.Listened = HasListened(userItems, episode.Id)
		episodes[i] = episode
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes})
}

func GetEpisode(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	idI, _ := strconv.Atoi(id)

	var episode EpisodeEntity

	err := database.Table("items").First(&episode, idI).Error

	if err != nil {
		w.WriteHeader(404)
		return
	}

	var userItems []int64
	database.Table("user_items").
		Where("item_id = ?", id).
		Where("user_id = ?", userId).
		Where("viewed = TRUE").
		Pluck("item_id", &userItems)

	episode.Listened = HasListened(userItems, episode.Id)

	r.ResponseJSON(w, 200, map[string]interface{}{"episode": episode})
}

func SetEpisodeListened(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])
	userIdInt, _ := strconv.Atoi(userId)

	var episode EpisodeEntity
	database.Table("items").First(&episode, id)
	database.Save(&UserItem{
		UserId:    int64(userIdInt),
		ItemId:    int64(id),
		Viewed:    true,
		ChannelId: episode.ChannelId,
	})

	go func() {
		p := MIXPANEL.Identify(userId)
		p.Track("listened", map[string]interface{}{"Episode ID": id})

		CACHE.Del(0, "u:l:"+strconv.Itoa(int(episode.ChannelId))+":"+userId)
	}()

	r.ResponseJSON(w, 202, nil)
}

func EpisodeDownload(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])

	var episode EpisodeEntity
	database.Table("items").First(&episode, id)

	p := MIXPANEL.Identify(userId)
	p.Track("download", map[string]interface{}{"Episode ID": id})

	http.Redirect(w, request, episode.SourceUrl, http.StatusMovedPermanently)
}

func HasListened(listened []int64, episode int64) bool {
	for _, t := range listened {
		if t == episode {
			return true
		}
	}
	return false
}
