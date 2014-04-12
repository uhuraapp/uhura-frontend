package core

import (
	"log"
	"net/http"
	"strconv"

	r "github.com/dukex/uhura/core/helper"
	"github.com/gorilla/mux"
)

// func GetChannels(userId string, w http.ResponseWriter, request *http.Request) {
// 	query := request.URL.Query()
// 	ids := query["ids[]"]

// 	channels := make([]ChannelEntity, 0)

// 	if len(ids) > 0 {
// 		database.Table("channels").Where("id in (?)", ids).Scan(&channels)
// 	}

// 	r.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
// 	return
// }

/// --------

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

	CacheUserSubscription(&userChannel)

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

	cache.Del(0, "s:"+id+":"+userId)

	database.Table("user_channels").Where(UserChannel{ChannelId: int64(channelId), UserId: int64(userIdInt)}).Delete(&userChannel)
}

func GetChannel(userId string, w http.ResponseWriter, request *http.Request) {
	var (
		vars     = mux.Vars(request)
		id       = vars["id"]
		cacheKey = "c:" + id
		channel  ChannelEntity
	)

	cached, err := CacheGet(cacheKey, channel)

	if err != nil {
		err = database.Table("channels").Where("channels.id = ?", id).First(&channel).Error
		if err != nil {
			w.WriteHeader(404)
			return
		}

		channel = channel.Cache()
	} else {
		channel = cached.(ChannelEntity)
	}

	channel.SetSubscribe(userId)

	r.ResponseJSON(w, 200, map[string]interface{}{"channel": channel})

	return
}

func GetSubscriptions(userId string, w http.ResponseWriter, request *http.Request) {
	channels := make([]ChannelEntity, 0)
	var ids []interface{}
	toDB := make([]int64, 0)

	cache, err := CacheGet("s:ids:"+userId, ids)
	if err == nil {
		ids = cache.([]interface{})
	} else {
		database.Table("channels").Select("channels.*").Joins("LEFT OUTER JOIN user_channels ON user_channels.channel_id = channels.id AND user_channels.user_id = "+userId).Where("user_channels.user_id = ?", userId).Pluck("channels.id", &ids)

		CacheSet("s:ids:"+userId, ids)
	}

	for _, id := range ids {
		channelId := int(id.(int64))

		cache, err := CacheGet("c:"+strconv.Itoa(channelId), ChannelEntity{})
		if err == nil {
			channels = append(channels, cache.(ChannelEntity))
		} else {
			log.Println(err)
			toDB = append(toDB, id.(int64))
		}
	}

	if len(toDB) > 0 {
		database.Table("channels").Where("channels.id in (?)", toDB).Find(&channels)
	}

	for i, channel := range channels {
		channels[i].Uri = channel.FixUri()
		channels[i] = channels[i].Cache()
		channels[i].SetSubscribe(userId)

		listened := make([]int, 0)

		for _, eId := range channels[i].Episodes {
			var marked bool
			cache, err := CacheGet("el:"+strconv.Itoa(eId)+":"+userId, marked)
			if err == nil {
				marked = cache.(bool)
				if marked {
					listened = append(listened, eId)
				}
			} else {
				err := database.Table("user_items").
					Where("user_items.item_id = ? AND user_items.user_id = ?", eId, userId).
					Find(&UserItem{}).Error
				if err == nil {
					listened = append(listened, eId)
				}
			}
		}

		channels[i].ToView = len(channels[i].Episodes) - len(listened)
	}

	r.ResponseJSON(w, 200, map[string]interface{}{"subscriptions": channels})
	return
}
