package core

import (
	"os"
	"strconv"

	"github.com/jinzhu/gorm"
	pq "github.com/lib/pq"
)

var database gorm.DB

func init() {
	databaseUrl, _ := pq.ParseURL(os.Getenv("DATABASE_URL"))
	database, _ = gorm.Open("postgres", databaseUrl)
	database.LogMode(os.Getenv("DEBUG") == "true")

	database.AutoMigrate(Channel{})
	database.AutoMigrate(Item{})
	database.AutoMigrate(User{})
	database.AutoMigrate(UserChannel{})
	database.AutoMigrate(UserItem{})
	database.AutoMigrate(Category{})
	database.AutoMigrate(ChannelCategories{})
}

func DatabaseManager() {
	if os.Getenv("SETUP_DATABASE") == "true" {
		go func() {
			var users []User

			database.Find(&users)

			for _, user := range users {
				people := MIXPANEL.Identify(strconv.Itoa(int(user.Id)))
				people.Update("$set", map[string]interface{}{
					"$email":        user.Email,
					"$created":      user.CreatedAt,
					"provider":      user.Provider,
					"welcome_email": user.WelcomeMail,
				})
			}
		}()
		database.Where("title is NULL").Or("title = ''").Delete(&Channel{})

		// var channels []Channel
		// database.Table("channels").Find(&channels)
		// for _, channel := range channels {
		// 	// TouchChannel(int(channel.Id))
		// 	// go FetchColors(channel.Id, channel.ImageUrl)
		// }

		// var users []User
		// database.Table("users").Find(&users)
		// for _, user := range users {
		// 	user.ProviderId = user.GoogleId
		// 	if user.Provider == "" {
		// 		user.Provider = "google	"
		// 	}
		// 	database.Save(&user)
		// }

		// var userItems []UserItem
		// database.Table("user_items").Find(&userItems)
		// for _, listened := range userItems {
		// 	var item Item
		// 	database.Table("items").First(&item, listened.ItemId)
		// 	database.Table("user_items").Where("id = ?", listened.Id).
		// 		Update("channel_id", item.ChannelId)
		// }
	}
}
