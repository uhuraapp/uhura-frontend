package core

import (
	"os"
	"time"

	"github.com/jinzhu/gorm"
	pq "github.com/lib/pq"
	"github.com/rakyll/coop"
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
	coop.Every(time.Hour*2, func() {
		database.Where("title is NULL").Or("title = ''").Delete(&Channel{})
	})
}
