package core

import (
	// "fmt"
	. "github.com/fiam/gounidecode/unidecode"
	"regexp"
	"strconv"
	"strings"
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
}

type ChannelResult struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageUrl    string `json:"image_url"`
	Url         string `json:"url"`
	Id          int    `json:"id"`
	Uri         string `json:"uri"`
	ToView      int    `json:"to_view"`
	Subscribed  bool   `json:"subscribed"`
	Copyright   string `json:"copyright"`
}

func (cr *ChannelResult) GetUri() string {
	re := regexp.MustCompile(`\W`)
	uri := Unidecode(cr.Title)
	uri = re.ReplaceAllString(uri, "")
	uri = strings.ToLower(uri)
	uri = strings.Replace(uri, "podcast", "", -1)
	go database.Table("channels").Where(cr.Id).Update("Uri", uri)

	return uri
}

func AllChannels(userId int) []ChannelResult {
	var channels []ChannelResult

	query := database.Table("channels").Order("title").Where("title IS NOT NULL").Where("title <> ''")

	if userId > 0 {
		query = query.Joins("FULL OUTER JOIN user_channels ON user_channels.channel_id=channels.id AND user_channels.user_id=" + strconv.Itoa(userId)).Select("channels.uri, channels.image_url, channels.title, channels.id, CAST(user_channels.user_id AS BOOLEAN) AS subscribed ")
	}

	query.Find(&channels)

	for _, c := range channels {
		if c.Uri == "" {
			c.Uri = c.GetUri()
		}
	}

	return channels
}

func GetChannelByUser(user *User) *[]ChannelResult {
	var channels []ChannelResult
	database.Table("user_channels").Select("channels.title, channels.description, channels.image_url, channels.url, channels.id").Where("user_id = ?", user.Id).Joins("inner join channels on channels.id = user_channels.channel_id").Scan(&channels)

	for i, channel := range channels {
		var watched int
		var itemsIds []int64
		database.Table("items").Where("channel_id = ?", channel.Id).Pluck("id", &itemsIds)
		database.Table("user_items").Where("user_id = ? and item_id in (?) and viewed = true", user.Id, itemsIds).Count(&watched)

		toView := len(itemsIds) - watched
		channel.ToView = toView
		channels[i] = channel
	}

	return &channels
}

func GetChannel(channelUri string) ChannelResult {
	var channel ChannelResult
	database.Table("channels").Where("uri = ?", channelUri).First(&channel)
	return channel
}

func SubscribeChannel(userId int, channelId string) ChannelResult {
	var channel ChannelResult
	var userChannel UserChannel

	channelIdInt, _ := strconv.Atoi(channelId)

	database.Table("user_channels").Where(UserChannel{ChannelId: channelIdInt, UserId: userId}).FirstOrCreate(&userChannel)
	database.Table("channels").First(&channel, userChannel.ChannelId)

	return channel
}
