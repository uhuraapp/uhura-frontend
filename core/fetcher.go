package core

import (
  "fmt"
  "github.com/jinzhu/gorm"
  rss "github.com/jteeuwen/go-pkg-rss"
  pq "github.com/lib/pq"
  "os"
  "time"
)

var database gorm.DB

const MaxOutstanding = 10

var c chan int

func configDatabase() {
  databaseUrl, _ := pq.ParseURL(os.Getenv("DATABASE_URL"))
  database, _ = gorm.Open("postgres", databaseUrl)
  database.LogMode(true)
}

func FetchAllChannell() {
  configDatabase()

  var channels []Channel
  database.Find(&channels)

  for _, channel := range channels {
    go pollFeed(channel.Url, 5)
  }
}

func FetchChanell(id string) {
  configDatabase()
  var channel Channel

  database.Where("id = ?", id).First(&channel)
  go pollFeed(channel.Url, 5)
}

func pollFeed(uri string, timeout int) {
  feed := rss.New(timeout, true, channelFetchHandler, itemFetchHandler)

  if err := feed.Fetch(uri, nil); err != nil {
    fmt.Fprintf(os.Stderr, "[e] %s: %s", uri, err)
    return
  }

  <-time.After(time.Duration(feed.SecondsTillUpdate() * 1e9))
}

func channelFetchHandler(feed *rss.Feed, channels []*rss.Channel) {
  for _, channelData := range channels {
    var channel Channel

    database.Where("url = ?", feed.Url).First(&channel)

    database.Model(channel).Updates(
      Channel{
        Title:         channelData.Title,
        Description:   channelData.Description,
        ImageUrl:      channelData.Image.Url,
        Copyright:     channelData.Copyright,
        LastBuildDate: channelData.LastBuildDate,
      })
  }
}

func itemFetchHandler(feed *rss.Feed, ch *rss.Channel, items []*rss.Item) {
  var channel Channel

  database.Where("url = ?", feed.Url).First(&channel)

  fmt.Println(channel.Title)
  //for _, item := range items {
  //h := md5.New()
  //io.WriteString(h, item.Key())
  //fmt.Printf("#%x\n", h.Sum(nil))
  //fmt.Printf("Title: %s\n", item.Title)
  //fmt.Printf("       %s\n", item.Enclosures[0].Url)
  //fmt.Printf("       %s\n", item.Description)
  //fmt.Println(" ")
  //}
}
