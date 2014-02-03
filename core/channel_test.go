package core

import (
	//  "io/ioutil"
	//"fmt"
	"strconv"

	"testing"
)

func cleanDB() {
	database.DropTable(Channel{})
	database.DropTable(Item{})
	database.DropTable(User{})
	database.DropTable(UserChannel{})
	database.DropTable(UserItem{})

	database.AutoMigrate(Channel{})
	database.AutoMigrate(Item{})
	database.AutoMigrate(User{})
	database.AutoMigrate(UserChannel{})
	database.AutoMigrate(UserItem{})
}

func sTest(t *testing.T, expected string, current string) {
	if current != expected {
		t.Errorf("Expected [%s] but [%s]", expected, current)
	}
}

func iTest(t *testing.T, expected int, current int) {
	if current != expected {
		t.Errorf("Expected [%s] but [%s]", expected, current)
	}
}

func TestChannelResultFuncGetUri(t *testing.T) {
	cleanDB()
	var channel Channel
	var channelR ChannelResult

	x := Channel{Title: "Uhúra", Url: "http://uhura.x"}
	database.Table("channels").Save(&x).First(&channelR)

	expected := "uhura"
	uri := channelR.GetUri()
	sTest(t, expected, uri)

	database.Table("channels").First(&channel)
	sTest(t, expected, channel.Uri)
}

func TestFuncAllChannelsWithoutUser(t *testing.T) {
	cleanDB()
	database.Table("channels").Save(&Channel{Title: "B", Url: "http://uhura.x1", Uri: "xpto"})
	database.Table("channels").Save(&Channel{Title: "Uhúra", Url: "http://uhura.x2"})
	database.Table("channels").Save(&Channel{Title: "A", Url: "http://uhura.x"})
	database.Table("channels").Save(&Channel{Title: "", Url: "http://uhura.x3"})

	all_ch := AllChannels(0)
	sTest(t, "A", all_ch[0].Title)
	sTest(t, "B", all_ch[1].Title)
	sTest(t, "a", all_ch[0].Uri)
	sTest(t, "xpto", all_ch[1].Uri)
	sTest(t, "uhura", all_ch[2].Uri)
	iTest(t, 3, len(all_ch))
}

func TestFuncAllChannelsWithUser(t *testing.T) {
	cleanDB()
	channel := Channel{Title: "B", Url: "http://uhura.x1", Uri: "xpto"}
	database.Table("channels").Save(&channel)
	database.Table("channels").Save(&Channel{Title: "Uhúra", Url: "http://uhura.x2"})

	user := User{}
	database.Table("users").Save(&user)
	database.Table("user_channels").Save(&UserChannel{UserId: user.Id, ChannelId: channel.Id})

	all_ch := AllChannels(user.Id)
	if !all_ch[0].Subscribed {
		t.Errorf("Users not subscribe")
	}
}

func TestFuncGetChannel(t *testing.T) {
	cleanDB()
	channel := Channel{Title: "B", Url: "http://uhura.x1", Uri: "xpto"}
	database.Table("channels").Save(&channel)
	item := Item{SourceUrl: "http://uhura.x2", Title: "Item 1", ChannelId: channel.Id}
	database.Table("channels").Save(&Channel{Title: "Uhúra", Url: "http://uhura.x2"})
	database.Table("items").Save(&item)

	gChannel, episodes := GetChannel("xpto")

	sTest(t, "B", gChannel.Title)
	iTest(t, 1, len(gChannel.Episodes))
	sTest(t, item.Title, episodes[0].Title)
}

func TestFuncSubscribeChannel(t *testing.T) {
	cleanDB()

	channel := Channel{Title: "Fav Channel"}
	database.Table("channels").Save(&channel)

	user := User{}
	database.Table("users").Save(&user)

	rChannel := SubscribeChannel(user.Id, strconv.Itoa(channel.Id))

	var userChannel UserChannel
	database.Table("user_channels").First(&userChannel)

	iTest(t, channel.Id, userChannel.ChannelId)
	iTest(t, user.Id, userChannel.UserId)
	sTest(t, channel.Title, rChannel.Title)
}

func TestSubscriptions(t *testing.T) {
	cleanDB()
	channel := Channel{Title: "Fav Channel"}
	database.Table("channels").Save(&channel)

	user := User{}
	database.Table("users").Save(&user)

	user_channel := UserChannel{ChannelId: channel.Id, UserId: user.Id}
	database.Table("user_channels").Save(&user_channel)

	subs, channels := Subscriptions(&user)

	iTest(t, channel.Id, subs[0].ChannelId)
	iTest(t, channel.Id, channels[0].Id)
}

func TestSubscriptionsCounters(t *testing.T) {
	cleanDB()
	channel := Channel{Title: "Fav Channel"}
	user := User{}

	database.Table("channels").Save(&channel)
	database.Table("users").Save(&user)

	user_channel := UserChannel{ChannelId: channel.Id, UserId: user.Id}
	database.Table("user_channels").Save(&user_channel)

	var item1, item2 Item

	// 7 episodes
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "1", Key: "1"}).Find(&item1)
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "2", Key: "2"}).Find(&item2)
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "3", Key: "3"})
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "4", Key: "4"})
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "5", Key: "5"})
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "6", Key: "6"})
	database.Table("items").Save(&Item{ChannelId: channel.Id, SourceUrl: "7", Key: "7"})

	// 2 watched
	database.Table("user_items").Save(&UserItem{ItemId: item1.Id, UserId: user.Id})
	database.Table("user_items").Save(&UserItem{ItemId: item2.Id, UserId: user.Id})

	_, channels := Subscriptions(&user)

	iTest(t, 5, channels[0].ToView)
}
