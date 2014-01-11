package core

import "time"
import "strconv"

type Item struct {
  Key         string `sql:"unique"`
  SourceUrl   string `sql:"not null;unique"`
  Title       string
  Description string
  ChannelId   int
  Id          int
  PublishedAt time.Time `sql:"not null"`
}

type UserItem struct {
  Id     int
  UserId int
  ItemId int
  Viewed bool
}

type UserItemsResult struct {
  Viewed       interface{}
  ChannelTitle string
  Key          string
  SourceUrl    string
  Title        string
  Description  string
  Id           int
  PublishedAt  time.Time
}

func GetUserItems(user *User, channels *[]Channel) *[]UserItemsResult {
  configDatabase()

  var channelsIds []int
  for _, channel := range *channels {
    channelsIds = append(channelsIds, channel.Id)
  }

  var itemsResult []UserItemsResult
  database.Table("items").Select("user_items.viewed, channels.title as channel_title, items.key, items.source_url, items.title, items.description, items.id, items.published_at").Where("channel_id in (?)", channelsIds).Joins("left join user_items on user_items.item_id = items.id and user_items.user_id = " + strconv.Itoa(user.Id) + " left join channels on channels.id = items.channel_id").Order("title, user_items.viewed DESC, published_at DESC").Scan(&itemsResult)

  return &itemsResult
}

func UserWatched(userId int, key string) {
  configDatabase()

  var item Item
  var userItem UserItem
  database.Where(Item{Key: key}).First(&item)
  database.Where(UserItem{ItemId: item.Id}).Assign(UserItem{UserId: userId, Viewed: true}).FirstOrCreate(&userItem)
}
