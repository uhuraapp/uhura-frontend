package core

import "strconv"

type Channel struct {
  Title         string
  Description   string
  ImageUrl      string
  Copyright     string
  LastBuildDate string
  Url           string `sql:"not null;unique"`
  Id            int
}

type UserChannel struct {
  Id        int
  UserId    int
  ChannelId int
}

type ChannelResult struct {
  Title       string
  Description string
  ImageUrl    string
  Url         string
  Id          int
  ToView      int
}

func AllChannels(user *User) []Channel {
  var channels []Channel
  database.Find(&channels)
  return channels
}

func GetChannelByUser(user *User) *[]ChannelResult {
  var channels []ChannelResult
  database.Table("user_channels").Select("channels.title, channels.description, channels.image_url, channels.url, channels.id").Where("user_id = ?", user.Id).Joins("left join channels on channels.id = user_channels.channel_id").Scan(&channels)

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

func GetChannel(channelParams string) Channel {
  channelId, _ := strconv.Atoi(channelParams)
  var channel Channel
  database.First(&channel, channelId)
  return channel
}
