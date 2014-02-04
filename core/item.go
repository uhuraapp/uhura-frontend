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
	Duration    string
}

type UserItem struct {
	Id        int
	UserId    int
	ItemId    int
	Viewed    bool
	CreatedAt time.Time
}

type UserItemsResult struct {
	Viewed       interface{}
	ChannelTitle string
	ChannelId    int
	Key          string
	SourceUrl    string
	Title        string
	Description  string
	Id           int
	PublishedAt  time.Time
}

type ItemResult struct {
	Id          int         `json:"id"`
	Title       string      `json:"title"`
	Description string      `json:"description"`
	Viewed      interface{} `json:"listened"`
	ChannelId   int         `json:"channel_id"`
	SourceUrl   string      `json:"source_url"`
	PublishedAt time.Time   `json:"published_at"`
}

type Counter struct {
	size        int
	currentPage int
	channel     string
}

// func GetUserItems(user *User, channels *[]ChannelResult, channel string, pageParams string) (*[]UserItemsResult, *Counter) {

// 	var channelsIds []int
// 	channelsIds = append(channelsIds, 0)
// 	for _, channel := range *channels {
// 		channelsIds = append(channelsIds, channel.Id)
// 	}

// 	if channel != "" {
// 		channelInt, _ := strconv.Atoi(channel)
// 		channelsIds = []int{channelInt}
// 	}

// 	limit := 10
// 	page, err := strconv.Atoi(pageParams)
// 	if err != nil {
// 		page = 1
// 	}
// 	offset := (page * limit) - limit

// 	var itemsResult []UserItemsResult
// 	database.Table("items").Select("user_items.listened, channels.title as channel_title, items.key, items.source_url, items.title, items.description, items.id, items.published_at").Where("channel_id in (?)", channelsIds).Joins("left join user_items on user_items.item_id = items.id and user_items.user_id = " + strconv.Itoa(user.Id) + " left join channels on channels.id = items.channel_id").Order("user_items.viewed DESC, published_at DESC").Where("channels.title IS NOT NULL").Offset(offset).Limit("10").Scan(&itemsResult)

// 	var total int
// 	database.Table("items").Where("channel_id in (?)", channelsIds).Count(&total)

// 	counter := Counter{size: *&total, currentPage: page, channel: channel}

// 	return &itemsResult, &counter
// }

func GetItem(id int, userId int) (episodes ItemResult) {
	itemQuery := database.Table("items").Where("items.id = ?", id)

	if userId > 0 {
		itemQuery = itemQuery.Select("user_items.viewed as viewed, items.*")
		itemQuery = itemQuery.Joins("left join user_items on user_items.item_id = items.id and user_items.user_id = " + strconv.Itoa(userId))
		itemQuery = itemQuery.Order("user_items.viewed DESC")
	}

	itemQuery.Order("published_at DESC").Find(&episodes)

	return
}

func GetItems(ids []string) (itemsResult []ItemResult) {
	database.Table("items").Where("id in (?)", ids).Order("published_at DESC").Find(&itemsResult)
	return
}

func UserListen(userId int, id string) ItemResult {
	var item Item
	var userItem UserItem
	itemId, _ := strconv.Atoi(id)
	database.First(&item, itemId)
	database.Where(UserItem{ItemId: item.Id}).Assign(UserItem{UserId: userId, Viewed: true}).FirstOrCreate(&userItem)
	return GetItem(item.Id, userId)
}
