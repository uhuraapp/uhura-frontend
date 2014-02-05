package core

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	rss "github.com/jteeuwen/go-pkg-rss"
	"io"
	"os"
	"strings"
	"time"

	charset "code.google.com/p/go-charset/charset"
	_ "code.google.com/p/go-charset/data"
)

const (
	itunesExt = "http://www.itunes.com/dtds/podcast-1.0.dtd"
)

func FetchAllChannell() {
	var channels []Channel
	database.Find(&channels)

	for _, channel := range channels {
		go pollFeed(channel.Url, 5)
	}
}

func FetchChanell(channel Channel) {
	go pollFeed(channel.Url, 5)
}

func pollFeed(uri string, timeout int) {
	feed := rss.New(timeout, true, channelFetchHandler, itemFetchHandler)

	if err := feed.Fetch(uri, charset.NewReader); err != nil {
		fmt.Fprintf(os.Stderr, "[e] %s: %s", uri, err)
		return
	}

	<-time.After(time.Duration(feed.SecondsTillUpdate() * 1e9))
}

func channelFetchHandler(feed *rss.Feed, channels []*rss.Channel) {
	for _, channelData := range channels {
		var channel Channel

		var imageUrl string
		if itunesImage := channelData.Extensions[itunesExt]["image"]; itunesImage != nil {
			imageUrl = itunesImage[0].Attrs["href"]
		} else {
			imageUrl = channelData.Image.Url
		}

		database.Table("channels").Where("url = ?", feed.Url).First(&channel)

		channel.Title = channelData.Title
		channel.Description = channelData.Description
		channel.ImageUrl = imageUrl
		channel.Copyright = channelData.Copyright
		channel.UpdatedAt = time.Now()
		channel.CreatedAt = time.Now()
		channel.LastBuildDate = channelData.LastBuildDate

		database.Save(&channel)

		ChannelChan <- 1
	}
}

const itemForm = "Mon, 02 Jan 2006 15:04:05 -0700"

func itemFetchHandler(feed *rss.Feed, ch *rss.Channel, items []*rss.Item) {
	var channel Channel
	database.Where("url = ?", feed.Url).First(&channel)

	for _, itemdata := range items {
		if len(itemdata.Enclosures) > 0 {
			var duration string
			var item Item

			h := md5.New()
			io.WriteString(h, itemdata.Enclosures[0].Url)
			key := hex.EncodeToString(h.Sum(nil))

			itemdata.PubDate = strings.Replace(itemdata.PubDate, "GMT", "+0000", -1)
			publishedAt, err := time.Parse(itemForm, itemdata.PubDate)
			if err != nil {
				fmt.Println(err)
			}

			if i := itemdata.Extensions[itunesExt]; i != nil {
				if i["summary"] != nil {
					itemdata.Description = i["summary"][0].Value
				} else if i["subtitle"] != nil {
					itemdata.Description = i["subtitle"][0].Value
				}

				if i["duration"] != nil {
					duration = i["duration"][0].Value
				}
			}

			database.Where(Item{Key: key}).Assign(Item{Title: itemdata.Title, SourceUrl: itemdata.Enclosures[0].Url, Description: itemdata.Description, ChannelId: channel.Id, PublishedAt: publishedAt, Duration: duration}).FirstOrCreate(&item)
		}
	}
}
