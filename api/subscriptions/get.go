package subscriptions

import (
	"github.com/dukex/uhuraapp/api/cache"
	"github.com/dukex/uhuraapp/api/database"
	"github.com/dukex/uhuraapp/api/utils"
	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {
	var ids []int
	DB := database.New()

	subscriptions := make([]Subscription, 0)
	_userId, _ := c.Get("user_id")
	userId := _userId.(string)

	if !utils.IsABotUser(userId) {
		subscriptionsCached, err := cache.Get("s:ids:"+userId, ids)

		if err == nil {
			var ok bool
			ids, ok = subscriptionsCached.([]int)
			if !ok {
				DB.Table("user_channels").Where("user_channels.user_id = ?", userId).
					Pluck("user_channels.channel_id", &ids)
				go cache.Set("s:ids:"+userId, ids)
			}
		} else {
			DB.Table("user_channels").Where("user_channels.user_id = ?", userId).
				Pluck("user_channels.channel_id", &ids)
			go cache.Set("s:ids:"+userId, ids)
		}

		if len(ids) > 0 {
			DB.Table("channels").Where("channels.id in (?)", ids).Find(&subscriptions)
		}

		//for i, channel := range subscriptions {
		//subscriptions[i].Uri = channel.FixUri()
		//go subscriptions[i].SetSubscribed(userId)
		//subscriptions[i].SetEpisodesIds()
		//subscriptions[i].SetToView(userId)
		//}
	}

	c.JSON(200, gin.H{"subscriptions": subscriptions})
}

type Subscription struct {
	Uri      string `json:"id"`
	Title    string `json:"title"`
	ImageUrl string `json:"image_url"`
	ToView   string `json:"to_view"`
}
