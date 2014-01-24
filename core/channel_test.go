package core

import (
	//  "io/ioutil"
	//"fmt"
	//"strconv"
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
