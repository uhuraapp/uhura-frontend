package core

import (
	. "github.com/fiam/gounidecode/unidecode"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Channel struct {
	Title         string
	Description   string
	ImageUrl      string
	Copyright     string
	LastBuildDate string
	Url           string `sql:"not null;unique"`
	Id            int
	Uri           string
}

type UserChannel struct {
	Id        int
	UserId    int
	ChannelId int
	CreatedAt time.Time
	UpdatedAt time.Time
}

type ChannelResult struct {
	Title       string      `json:"title"`
	Description string      `json:"description"`
	ImageUrl    string      `json:"image_url"`
	Url         string      `json:"url"`
	Id          int         `json:"id"`
	Uri         string      `json:"uri"`
	ToView      int         `json:"to_view"`
	Subscribed  interface{} `json:"subscribed"`
	Copyright   string      `json:"copyright"`
	Episodes    []int64     `json:"episodes"`
}

func (cr *ChannelResult) GetUri() string {
	re := regexp.MustCompile(`\W`)
	uri := Unidecode(cr.Title)
	uri = re.ReplaceAllString(uri, "")
	uri = strings.ToLower(uri)
	uri = strings.Replace(uri, "podcast", "", -1)
	database.Table("channels").Where(cr.Id).Update("Uri", uri)

	return uri
}

func AllChannels(userId int) []ChannelResult {
	var channels []ChannelResult

	query := database.Table("channels").Order("title").Where("title IS NOT NULL").Where("title <> ''")

	if userId > 0 {
		query = query.Joins("FULL OUTER JOIN user_channels ON user_channels.channel_id=channels.id AND user_channels.user_id=" + strconv.Itoa(userId)).Select("channels.uri, channels.image_url, channels.title, channels.id, CAST(user_channels.user_id AS BOOLEAN) AS subscribed ")
	}

	query.Find(&channels)

	for i, c := range channels {
		if c.Uri == "" {
			c.Uri = c.GetUri()
			channels[i] = c
		}
	}

	return channels
}

type UserChannelsEntity struct {
	Id        int `json:"id"`
	ChannelId int `json:"channel"`
}

func Subscriptions(user *User) (subscriptions []UserChannelsEntity, channels []ChannelResult) {
	var channelsIds []int64

	database.Table("user_channels").Where("user_id = ?", user.Id).Find(&subscriptions).Pluck("channel_id", &channelsIds)
	database.Table("channels").Where("id IN (?)", channelsIds).Find(&channels)

	for i, channel := range channels {
		var items []struct {
			Id int
		}
		var userItems []interface{}
		var watched []int64

		database.Table("items").Select("DISTINCT items.id").Where("channel_id = ?", channel.Id).Joins("FULL OUTER JOIN user_items ON user_items.item_id=items.id AND user_items.user_id="+strconv.Itoa(user.Id)).Find(&items).Pluck("user_items.id", &userItems)

		for _, j := range userItems {
			id, ok := j.(int64)
			if ok {
				watched = append(watched, id)
			}
		}
		toView := len(items) - len(watched)
		channel.ToView = toView
		channels[i] = channel
	}
	return
}

func GetChannel(channelUri string, userId interface{}) (channel ChannelResult, episodes []ItemResult) {
	var episodesIds []int64

	database.Table("channels").Where("uri = ?", channelUri).First(&channel)
	itemQuery := database.Table("items").Where("channel_id = ?", channel.Id).Pluck("id", &episodesIds)

	userIdInt, ok := userId.(int)

	if ok {
		itemQuery = itemQuery.Select("items.*, user_items.viewed").Joins("LEFT JOIN user_items on user_items.item_id = items.id and user_items.user_id = " + strconv.Itoa(userIdInt) + "")
	}

	itemQuery.Find(&episodes)

	channel.Episodes = episodesIds

	return
}

func GetChannelByChannel(channelId string) (channel Channel) {
	channelIdInt, _ := strconv.Atoi(channelId)
	database.Table("channels").First(&channel, channelIdInt)
	return
}

func SubscribeChannel(userId int, channelId string) (channel ChannelResult) {
	var userChannel UserChannel

	channelIdInt, _ := strconv.Atoi(channelId)

	database.Table("user_channels").Where(UserChannel{ChannelId: channelIdInt, UserId: userId}).FirstOrCreate(&userChannel)
	database.Table("channels").First(&channel, userChannel.ChannelId)

	return channel
}
