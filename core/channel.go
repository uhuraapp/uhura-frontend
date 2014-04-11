package core

import (
	"net/http"
	"strconv"
	"strings"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func (c *Channel) BeforeUpdate() {
	cache.Delete("c:" + strconv.Itoa(int(c.Id)))
}

func (c *Channel) SetUri() string {
	uri := c.Uriable.MakeUri(c.Title)
	uri = strings.Replace(uri, "podcast", "", -1)
	database.Table("channels").Where(c.Id).Update("Uri", uri)

	return uri
}

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

// Handlers

func ReloadChannel(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	idI, _ := strconv.Atoi(id)

	TouchChannel(idI)
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

func ChannelDefaultQuery(userId string) func(d *gorm.DB) *gorm.DB {
	return func(d *gorm.DB) *gorm.DB {
		//return d.Table("channels").Select("channels.*, COUNT(user_items.id) AS viewed, array_agg(items.id) AS episodes_ids, user_channels.id AS subscribed").Joins("LEFT OUTER JOIN user_channels ON user_channels.channel_id = channels.id AND user_channels.user_id = " + userId + " LEFT OUTER JOIN items ON items.channel_id = channels.id LEFT OUTER JOIN user_items ON user_items.item_id = items.id AND user_items.user_id = " + userId + " AND user_items.viewed = TRUE").Group("channels.id, user_channels.id")

		return d.Table("channels").Joins("LEFT OUTER JOIN user_channels ON user_channels.channel_id = channels.id AND user_channels.user_id = " + userId)
	}
}

func convertEpisodesId(ids string) []int {
	var iids = make([]int, 0)
	ids = strings.Replace(ids, "}", "", -1)
	ids = strings.Replace(ids, "{", "", -1)
	for _, id := range strings.Split(ids, ",") {
		if iid, err := strconv.Atoi(id); err == nil && iid > 0 {
			iids = append(iids, iid)
		}
	}
	return iids
}
