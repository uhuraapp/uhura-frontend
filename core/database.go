package core

import (
	"os"
	//"time"
	"log"

	"github.com/jinzhu/gorm"
	pq "github.com/lib/pq"
	//"github.com/rakyll/coop"
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
	database.Where("title is NULL").Or("title = ''").Delete(&Channel{})

	var users []User

	database.Table("users").Find(&users)

	for _, user := range users {
		user.ProviderId = user.GoogleId
		if user.Provider == "" {
			user.Provider = "google	"
		}
		database.Save(&user)
	}

	var usersE []User
	database.Not("welcome_mail", true).Find(&usersE)
	for _, user := range usersE {
		log.Println("will send email to " + user.Email)
		WelcomeMail(&user)
	}
}
