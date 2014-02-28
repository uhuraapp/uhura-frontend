package core

import (
	"github.com/jinzhu/gorm"
	pq "github.com/lib/pq"
	"os"
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
	// database.AutoMigrate(Category{})
	// database.AutoMigrate(ChannelCategories{})
}
