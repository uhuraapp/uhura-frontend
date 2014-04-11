package core

import (
	"net/http"
	"strconv"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
)

type ChannelResult struct {
	ChannelEntity
	//Viewed      int64  `json:"-"`
	//EpisodesIds string `json:"-"`
}

func (cr *ChannelResult) SetSubscribe(userId string) {
	var status bool
	cacheKey := "s:" + strconv.Itoa(int(cr.Id)) + ":" + userId

	cached, err := CacheGet(cacheKey, status)
	if err != nil {
		err = database.Table("user_channels").Where("channel_id = ? AND user_id = ?", cr.Id, userId).First(&UserChannel{}).Error
		status = err == nil
		CacheSet(cacheKey, status)
	} else {
		status = cached.(bool)
	}

	cr.Subscribed = status
}

func ReloadChannel(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	idI, _ := strconv.Atoi(id)

	TouchChannel(idI)
}

func SubscribeChannel(userId string, w http.ResponseWriter, request *http.Request) {
	var userChannel UserChannel

	vars := mux.Vars(request)
	id := vars["id"]

	channelId, _ := strconv.Atoi(id)
	userIdInt, _ := strconv.Atoi(userId)

	database.Table("user_channels").Where(UserChannel{ChannelId: int64(channelId), UserId: int64(userIdInt)}).FirstOrCreate(&userChannel)

	go func() {
		p := MIXPANEL.Identify(userId)
		p.Track("subscribed", map[string]interface{}{"Channel ID": id})
	}()

	TouchChannel(channelId)

	GetChannel(userId, w, request)
}

func GetChannel(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	cacheKey := "c:" + id
	var channel ChannelResult

	cached, err := CacheGet(cacheKey, channel)

	if err != nil {
		var episodesIds []int

		err = database.Table("channels").Where("channels.id = ?", id).First(&channel).Error
		if err != nil {
			w.WriteHeader(404)
			return
		}

		database.Table("items").Where("items.channel_id = ?", id).Pluck("id", &episodesIds)
		channel.Episodes = episodesIds

		CacheSet(cacheKey, channel)
	} else {
		channel = cached.(ChannelResult)
	}

	channel.SetSubscribe(userId)

	// database.Scopes(ChannelDefaultQuery(userId))

	r.ResponseJSON(w, 200, map[string]interface{}{"channel": channel})

	return
}

func UnsubscribeChannel(userId string, w http.ResponseWriter, request *http.Request) {
	var userChannel UserChannel

	vars := mux.Vars(request)
	id := vars["id"]

	channelId, _ := strconv.Atoi(id)
	userIdInt, _ := strconv.Atoi(userId)

	go func() {
		p := MIXPANEL.Identify(userId)
		p.Track("unsubscribed", map[string]interface{}{"Channel ID": channelId})
	}()

	cache.Delete("s:" + id + ":" + userId)

	database.Table("user_channels").Where(UserChannel{ChannelId: int64(channelId), UserId: int64(userIdInt)}).Delete(&userChannel)
}

func GetChannels(userId string, w http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	ids := query["ids[]"]

	channels := make([]ChannelResult, 0)

	if len(ids) > 0 {
		database.Table("channels").Where("id in (?)", ids).Scan(&channels)
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
	return
}

func GetSubscriptions(userId string, w http.ResponseWriter, request *http.Request) {
	channels := make([]ChannelResult, 0)

	database.Table("channels").Select("channels.*").Joins("LEFT OUTER JOIN user_channels ON user_channels.channel_id = channels.id AND user_channels.user_id = "+userId).Where("user_channels.user_id = ?", userId).Scan(&channels)

	for i, channel := range channels {
		channels[i].Uri = channel.FixUri()
		channels[i].SetSubscribe(userId)

		//channels[i].Episodes = convertEpisodesId(channel.EpisodesIds)
		//channels[i].ToView = int64(len(channels[i].Episodes)) - channel.Viewed
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"subscriptions": channels})
	return
}
