package core

import (
  "crypto/md5"
  "encoding/hex"
  "fmt"
  rss "github.com/jteeuwen/go-pkg-rss"
  "io"
  "os"
  "strconv"
  "time"
)

func FetchAllChannell() {
  configDatabase()

  var channels []Channel
  database.Find(&channels)

  for _, channel := range channels {
    go pollFeed(channel.Url, 5)
  }
}

func FetchChanell(idString string) {
  configDatabase()
  var channel Channel

  id, _ := strconv.Atoi(idString)

  database.First(&channel, id)
  fmt.Println("ID:", id)
  fmt.Println("channel:", channel)
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

    database.Table("channels").Where(channel.Id).Updates(map[string]interface{}{
      "title":           channelData.Title,
      "description":     channelData.Description,
      "image_url":       channelData.Image.Url,
      "copyright":       channelData.Copyright,
      "last_build_date": channelData.LastBuildDate,
    })
  }
}

func itemFetchHandler(feed *rss.Feed, ch *rss.Channel, items []*rss.Item) {
  var channel Channel
  database.Where("url = ?", feed.Url).First(&channel)

  for _, itemdata := range items {
    h := md5.New()
    io.WriteString(h, itemdata.Enclosures[0].Url)
    key := hex.EncodeToString(h.Sum(nil))

    var item Item
    database.Where(Item{Key: key}).Attrs(Item{Title: itemdata.Title, SourceUrl: itemdata.Enclosures[0].Url, Description: item.Description, ChannelId: channel.Id}).FirstOrCreate(&item)
  }
}
