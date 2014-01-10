package core

import (
  "github.com/jinzhu/gorm"
  pq "github.com/lib/pq"
  "os"
)

var database gorm.DB

func configDatabase() {
  databaseUrl, _ := pq.ParseURL(os.Getenv("DATABASE_URL"))
  database, _ = gorm.Open("postgres", databaseUrl)
  database.LogMode(true)

  database.AutoMigrate(Channel{})
  database.AutoMigrate(Item{})
  database.AutoMigrate(User{})
  database.AutoMigrate(UserChannel{})
}
