package core

import (
	"net/http"
	"strconv"
	"strings"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func (c *Channel) SetUri() string {
	uri := c.Uriable.MakeUri(c.Title)
	uri = strings.Replace(uri, "podcast", "", -1)
	database.Table("channels").Where(c.Id).Update("Uri", uri)

	return uri
}

// Handlers

type ChannelResult struct {
	ChannelEntity
	Items       int64  `json:"-"`
	Viewed      int64  `json:"-"`
	EpisodesIds string `json:"-"`
}

func GetChannels(userId string, w http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	ids := query["ids[]"]

	channels := make([]ChannelResult, 0)

	database.Table("channels").Where("id in (?)", ids).Scan(&channels)

	r.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
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

	database.Table("user_channels").Where(UserChannel{ChannelId: int64(channelId), UserId: int64(userIdInt)}).Delete(&userChannel)
}

func GetSubscriptions(userId string, w http.ResponseWriter, request *http.Request) {
	channels := make([]ChannelResult, 0)

	database.Scopes(ChannelDefaultQuery(userId)).Where("user_channels.user_id = ?", userId).Scan(&channels)

	for i, channel := range channels {
		channels[i].Uri = channel.FixUri()
		channels[i].ToView = channel.Items - channel.Viewed
		channels[i].Episodes = convertEpisodesId(channel.EpisodesIds)
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
	return
}

func GetChannel(userId string, w http.ResponseWriter, request *http.Request) {
	var channel ChannelResult

	vars := mux.Vars(request)
	id := vars["id"]

	database.Scopes(ChannelDefaultQuery(userId)).Where("channels.id = ?", id).Limit(1).First(&channel)

	channel.ToView = channel.Items - channel.Viewed
	channel.Episodes = convertEpisodesId(channel.EpisodesIds)

	r.ResponseJSON(w, 200, map[string]interface{}{"channel": channel})
	return
}

func ReloadChannel(userId string, w http.ResponseWriter, request *http.Request) {
	vars := mux.Vars(request)
	id := vars["id"]
	idI, _ := strconv.Atoi(id)

	TouchChannel(idI)
}

func ChannelDefaultQuery(userId string) func(d *gorm.DB) *gorm.DB {
	return func(d *gorm.DB) *gorm.DB {
		return d.Table("channels").Select("channels.*, COUNT(items.id) AS items, array_agg(items.id) AS episodes_ids, CAST(user_channels.id AS BOOLEAN) AS subscribed").Joins("LEFT OUTER JOIN user_channels ON user_channels.channel_id = channels.id AND user_channels.user_id = " + userId + " LEFT OUTER JOIN items ON items.channel_id = channels.id LEFT OUTER JOIN user_items ON user_items.item_id = items.id AND user_items.user_id = " + userId + " AND user_items.viewed = TRUE").Group("channels.id, user_channels.id")
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
