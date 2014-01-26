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
		var channel struct {
			Id int
		}
		var imageUrl string
		if itunesImage := channelData.Extensions[itunesExt]["image"]; itunesImage != nil {
			imageUrl = itunesImage[0].Attrs["href"]
		} else {
			imageUrl = channelData.Image.Url
		}

		database.Table("channels").Where("url = ?", feed.Url).First(&channel)

		database.Table("channels").Where(channel.Id).Updates(map[string]interface{}{
			"title":           channelData.Title,
			"description":     channelData.Description,
			"image_url":       imageUrl,
			"copyright":       channelData.Copyright,
			"last_build_date": channelData.LastBuildDate,
		})
		ChannelChan <- 1
	}
}

const itemForm = "Mon, 02 Jan 2006 15:04:05 -0700"

func itemFetchHandler(feed *rss.Feed, ch *rss.Channel, items []*rss.Item) {
	var channel Channel
	database.Where("url = ?", feed.Url).First(&channel)

	for _, itemdata := range items {
		if len(itemdata.Enclosures) > 0 {
			h := md5.New()
			io.WriteString(h, itemdata.Enclosures[0].Url)
			key := hex.EncodeToString(h.Sum(nil))

			itemdata.PubDate = strings.Replace(itemdata.PubDate, "GMT", "+0000", -1)
			publishedAt, err := time.Parse(itemForm, itemdata.PubDate)
			if err != nil {
				fmt.Println(err)
			}


			var item Item
			var duration string

			database.Where(Item{Key: key}).Assign(Item{Title: itemdata.Title, SourceUrl: itemdata.Enclosures[0].Url, Description: itemdata.Description, ChannelId: channel.Id, PublishedAt: publishedAt, Duration: duration}).FirstOrCreate(&item)
		}
	}
}
