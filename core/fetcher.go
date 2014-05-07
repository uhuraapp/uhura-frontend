package core

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	charset "code.google.com/p/go-charset/charset"
	_ "code.google.com/p/go-charset/data"
	"github.com/dukex/image_colors"
	rss "github.com/jteeuwen/go-pkg-rss"
)

const (
	itunesExt = "http://www.itunes.com/dtds/podcast-1.0.dtd"
)

var noItemFn = func(feed *rss.Feed, ch *rss.Channel, items []*rss.Item) {}

func FetchOnlyChannelFromBytes(uri string, body []byte) {
	feed := rss.New(5, true, channelFetchHandler, noItemFn)
	feed.FetchBytes(uri, body, charset.NewReader)

	<-time.After(time.Duration(feed.SecondsTillUpdate() * 1e9))

	return
}

// func FetchTempChannelFromLinks(links []string) []TempChannel {
// 	channels := make([]TempChannel, 0)

// 	ch := func(feed *rss.Feed, c []*rss.Channel) {
// 		for _, channelData := range c {
// 			var imageUrl string
// 			if itunesImage := channelData.Extensions[itunesExt]["image"]; itunesImage != nil {
// 				imageUrl = itunesImage[0].Attrs["href"]
// 			} else {
// 				imageUrl = channelData.Image.Url
// 			}
// 			log.Println(channelData)
// 			channel := TempChannel{Url: feed.Url, Title: channelData.Title, ImageUrl: imageUrl}
// 			channels = append(channels, channel)
// 		}
// 	}

// 	for _, link := range links {
// 		go func(uri string) {
// 			feed := rss.New(5, true, ch, noItemFn)
// 			feed.Fetch(uri, charset.NewReader)
// 			<-time.After(time.Duration(feed.SecondsTillUpdate() * 1e9))
// 		}(link)

// 	}

// 	timeout := time.Second * 3
// 	<-time.After(time.Duration(timeout))
// 	log.Println(channels)
// 	return channels
// }

// func FetchAllChannell() {
// 	var channels []Channel
// 	database.Find(&channels)

// 	for _, channel := range channels {
// 		go pollFeed(channel.Url, 5)
// 	}
// }

func FetchChannel(url string) {
	go fetcher(url, 5)
}

func FetchColors(channelId int64, imageUrl string) {
	resp, err := http.Get(imageUrl)
	if err != nil {
		return
	}

	defer func() {
		resp.Body.Close()
		if r := recover(); r != nil {
			fmt.Println("Recovered in f", r)
		}
	}()

	imageColors, _ := image_colors.New(resp.Body)

	database.Table("channels").
		Where("id = ?", channelId).
		Update("colors", strings.Join(imageColors.TopColors(5, 0.7), "|"))
}

func fetcher(uri string, timeout int) {
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

		var link string

		if len(channelData.Links) > 0 {
			link = channelData.Links[0].Href
			err := database.Table("channels").Where("link = ?", link).First(&channel).Error
			if err != nil {
				database.Table("channels").Where("url = ?", feed.Url).First(&channel)
			}
		} else {
			database.Table("channels").Where("url = ?", feed.Url).First(&channel)
		}

		channel.Title = channelData.Title
		channel.Description = channelData.Description
		channel.ImageUrl = imageUrl
		channel.Copyright = channelData.Copyright
		channel.UpdatedAt = time.Now()
		channel.CreatedAt = time.Now()
		channel.Language = channelData.Language
		channel.LastBuildDate = channelData.LastBuildDate
		channel.Url = feed.Url
		channel.Link = channelData.Links[0].Href
		channel.Uri = channel.MakeUri(channelData.Title)

		database.Save(&channel)

		go FetchColors(channel.Id, channel.ImageUrl)

		if itunesCategory := channelData.Extensions[itunesExt]["category"]; itunesCategory != nil {
			for _, category := range itunesCategory {
				var categoryDB Category
				database.Where(&Category{Name: category.Attrs["text"]}).FirstOrCreate(&categoryDB)
				database.Where(&ChannelCategories{ChannelId: int64(channel.Id), CategoryId: categoryDB.Id}).FirstOrCreate(&ChannelCategories{})
			}
		}
	}
}

const itemForm = "Mon, _2 Jan 2006 15:04:05 -0700"

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

			itemdata.PubDate = strings.Replace(itemdata.PubDate, "GMT", "-0100", -1)
			itemdata.PubDate = strings.Replace(itemdata.PubDate, "PST", "-0800", -1)
			itemdata.PubDate = strings.Replace(itemdata.PubDate, "PDT", "-0700", -1)

			publishedAt, err := time.Parse(itemForm, itemdata.PubDate)
			if err != nil {
				// TODO: ErrorEmail publishedAt problem
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

			itemTmp := Item{Title: itemdata.Title}

			database.Where(Item{Key: key}).Assign(Item{Uri: itemTmp.MakeUri(itemdata.Title), Title: itemdata.Title, SourceUrl: itemdata.Enclosures[0].Url, Description: itemdata.Description, ChannelId: channel.Id, PublishedAt: publishedAt, Duration: duration, Type: itemdata.Enclosures[0].Type}).FirstOrCreate(&item)
		}
	}
}
