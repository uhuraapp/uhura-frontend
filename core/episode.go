package core

import (
	"net/http"
	"strconv"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
)

func SugestionsEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
	episodes := make([]EpisodeEntity, 0)
	channels := make([]ChannelEntity, 0)

	q := database.Table("user_channels").Joins("INNER JOIN channels ON channels.id = user_channels.channel_id JOIN (SELECT * FROM (SELECT ROW_NUMBER() OVER (PARTITION BY items.channel_id order by items.channel_id DESC) AS count,items.* FROM items) line WHERE line.count <= 5) items ON items.channel_id = channels.id FULL OUTER JOIN user_items ON user_items.item_id = items.id").Where("user_channels.user_id = ?", userId).Where("user_items.id IS NULL")

	//q.Scopes(episodeDefaultQuery).Find(&episodes)
	q.Select("DISTINCT ON (channels.id) channels.id, channels.*").Find(&channels)

	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes, "channels": channels})
}

func GetEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
	episodes := make([]EpisodeEntity, 0)

	query := request.URL.Query()
	ids := query["ids[]"]

	toDB := make([]string, 0)

	for _, id := range ids {
		cache, err := CacheGet("e:"+id, EpisodeEntity{})
		if err == nil {
			episodes = append(episodes, cache.(EpisodeEntity))
		} else {
			toDB = append(toDB, id)
		}
	}

	if len(toDB) > 0 {
		database.Table("items").Where("items.id in (?)", toDB).Find(&episodes)

		go func() {
			for _, e := range episodes {
				cacheKey := "e:" + strconv.Itoa(int(e.Id))
				CacheSet(cacheKey, e)
			}
		}()
	}

	for i, episode := range episodes {
		var status bool
		cacheKey := "el:" + strconv.Itoa(episode.Id) + ":" + userId
		cached, err := CacheGet(cacheKey, status)

		if err != nil {
			var userItem UserItem
			database.Table("user_items").Where("user_id = ? AND item_id = ?", userId, episode.Id).First(&userItem)
			status = userItem.Viewed
			CacheSet(cacheKey, status)
		} else {
			status = cached.(bool)
		}

		episode.Listened = status
		episodes[i] = episode
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"episodes": episodes})
}

func SetEpisodeListened(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id, _ := strconv.Atoi(vars["id"])
	userIdInt, _ := strconv.Atoi(userId)

	database.Save(&UserItem{UserId: int64(userIdInt), ItemId: int64(id), Viewed: true})

	cacheKey := "el:" + vars["id"] + ":" + userId
	CacheSet(cacheKey, true)

	go func() {
		p := MIXPANEL.Identify(userId)
		p.Track("listened", map[string]interface{}{"Episode ID": id})
	}()

	r.ResponseJSON(w, 202, nil)
}
