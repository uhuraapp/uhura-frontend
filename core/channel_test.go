package core

import (
	//  "io/ioutil"
	//"fmt"
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

func TestChannelFuncSetUri(t *testing.T) {
	cleanDB()
	var channel Channel

	x := Channel{Title: "Uhúra", Url: "http://uhura.x"}
	database.Table("channels").Save(&x)

	expected := "uhura"
	uri := x.SetUri()
	sTest(t, expected, uri)

	database.Table("channels").First(&channel)
	sTest(t, expected, channel.Uri)
}
