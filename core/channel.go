package core

import (
	"net/http"
	"strconv"
	"strings"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// func (c *Channel) AfterCreate() {
// 	NewChannelTweet(c.Id)
// }

// func (c *Channel) ShareUrl() string {
// 	id := strconv.Itoa(c.Id)
// 	return "http://uhuraapp.com/channels/" + id
// }

func (c *Channel) SetUri() string {
	uri := c.Uriable.MakeUri(c.Title)
	uri = strings.Replace(uri, "podcast", "", -1)
	database.Table("channels").Where(c.Id).Update("Uri", uri)

	return uri
}

// func featuredScope(d *gorm.DB) *gorm.DB {
// 	return d.Not("featured", "false").Order("random()").Limit(12)
// }

// func userInfoScope(userId string) func(d *gorm.DB) *gorm.DB {
// 	return func(d *gorm.DB) *gorm.DB {
// 		return d.Joins("FULL OUTER JOIN user_channels ON user_channels.channel_id=channels.id AND user_channels.user_id=" + userId).Select("channels.*, CAST(user_channels.user_id AS BOOLEAN) AS subscribed ")
// 	}
// }

// func AllChannels() (channels []ChannelEntity) {
// 	channelQuery := database.Table("channels").Where("title IS NOT NULL").Where("title <> ''")

// 	// 	if userId > 0 {
// 	// 		channelQuery = channelQuery.Scopes(userInfoScope(strconv.Itoa(userId)))
// 	// 	}

// 	// 	if onlyFeatured {
// 	// 		channelQuery = channelQuery.Scopes(featuredScope)
// 	// 	}

// 	// 	if channelId != "" {
// 	// 		idInt, _ := strconv.Atoi(channelId)
// 	// 		channelQuery = channelQuery.Where("channels.id = ? OR channels.uri = ?", idInt, channelId)
// 	// 	}

// 	channelQuery.Order("title").Find(&channels)

// 	for i, c := range channels {
// 		channels[i].Uri = c.FixUri()
// 		// 		var episodesIds []int64
// 		// 		itemQuery := database.Table("items").Where("channel_id = ?", c.Id)
// 		// 		itemQuery.Pluck("id", &episodesIds)

// 		// 		if userId > 0 {
// 		// 			itemQuery = itemQuery.Select("user_items.viewed as viewed, items.*")
// 		// 			itemQuery = itemQuery.Joins("left join user_items on user_items.item_id = items.id and user_items.user_id = " + strconv.Itoa(userId) + " left join channels on channels.id = items.channel_id")
// 		// 			itemQuery = itemQuery.Order("user_items.viewed DESC")
// 	}

// 	// 		itemQuery.Order("published_at DESC, id DESC, title DESC").Find(&episodes)

// 	// 		for j, e := range episodes {
// 	// 			if e.Uri != "" {
// 	// 				episodes[j].Uri = e.GetUri()
// 	// 			}
// 	// 		}
// 	// 		channels[i].Episodes = episodesIds
// 	// 	}

// 	return
// }

// type UserChannelsEntity struct {
// 	Id        int     `json:"id"`
// 	ChannelId int     `json:"channel"`
// 	Episodes  []int64 `json:"episodes"`
// }

// func Subscriptions(user *User) (subscriptions []UserChannelsEntity, channels []ChannelResult) {
// 	var channelsIds []int64

// 	subscriptionsQuery := database.Table("user_channels").Where("user_id = ?", user.Id)
// 	subscriptionsQuery.Find(&subscriptions).Pluck("channel_id", &channelsIds)

// 	database.Table("channels").Where("id IN (?)", channelsIds).Order("title DESC").Find(&channels)

// 	for i, channel := range channels {
// 		var userItems []interface{}
// 		var watched []int64
// 		var items []int64
// 		var notListened []int64

// 		itemQuery := database.Table("items").Select("DISTINCT items.id").Where("channel_id = ?", channel.Id)
// 		itemQuery = itemQuery.Joins("FULL OUTER JOIN user_items ON user_items.item_id=items.id AND user_items.user_id=" + strconv.Itoa(user.Id))
// 		itemQuery.Pluck("items.id", &items)
// 		itemQuery.Pluck("user_items.id", &userItems)
// 		itemQuery.Where("user_items.user_id IS NULL").Pluck("items.id", &notListened)

// 		for _, j := range userItems {
// 			id, ok := j.(int64)
// 			if ok {
// 				watched = append(watched, id)
// 			}
// 		}

// 		toView := len(items) - len(watched)
// 		channel.ToView = toView
// 		channels[i] = channel

// 		if len(notListened) > 0 {
// 			for k, subscription := range subscriptions {
// 				if subscription.ChannelId == channel.Id {
// 					subscriptions[k].Episodes = append(subscription.Episodes, notListened[0])
// 				}
// 			}
// 		}
// 	}
// 	return
// }

// func UnsubscribeChannel(userId int, channelId string) (channel ChannelResult) {
// 	var userChannel UserChannel

// 	channelIdInt, _ := strconv.Atoi(channelId)

// 	database.Table("user_channels").Where(UserChannel{ChannelId: channelIdInt, UserId: userId}).Delete(&userChannel)
// 	channels, _ := AllChannels(userId, false, channelId)
// 	channel = channels[0]
// 	return
// }

// func GetChannel(channelId int) (channel Channel) {
// 	database.First(&channel, channelId)
// 	return
// }

// func GetChannels(channelsIds []int) (channels []ChannelResult) {
// 	database.Table("channels").Where("id IN (?)", channelsIds).Find(&channels)
// 	return
// }

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

	GetChannel(userId, w, request)
}

func UnsubscribeChannel(userId string, w http.ResponseWriter, request *http.Request) {
	var userChannel UserChannel

	vars := mux.Vars(request)
	id := vars["id"]

	channelId, _ := strconv.Atoi(id)
	userIdInt, _ := strconv.Atoi(userId)

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
