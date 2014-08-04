package core

import (
	"bytes"
	"net/http"
	// "fmt"
	"io/ioutil"
	"os"
	//"strconv"
	"time"

	"github.com/joeguo/sitemap"
)

const (
	header = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
	footer = ` </urlset>`
)

func generateSitemap() []byte {
	var channels []Channel
	database.Table("channels").Find(&channels)

	// 	channels, episodes := AllChannels(0, false, "")
	var items []*sitemap.Item

	item := sitemap.Item{
		Loc:        "http://dashboard.uhuraapp.com/",
		LastMod:    time.Now(),
		Priority:   0.8,
		Changefreq: "daily",
	}

	items = append(items, &item)

	for _, channel := range channels {
		updatedAt := channel.UpdatedAt

		channel.SetUri()

		if updatedAt.Year() == 1 {
			updatedAt = time.Now()
		}

		items = append(items, &sitemap.Item{
			Loc:        "http://dashboard.uhuraapp.com/app/" + channel.Uri,
			LastMod:    updatedAt,
			Priority:   0.5,
			Changefreq: "weekly",
		})
	}

	// 	for _, episode := range episodes {
	// 		updatedAt := episode.PublishedAt

	// 		if updatedAt.Year() == 1 {
	// 			updatedAt = time.Now()
	// 		}

	// 		items = append(items, &sitemap.Item{
	// 			Loc:        "http://uhuraapp.com/channels/" + strconv.Itoa(episode.ChannelId) + "/" + episode.GetUri(),
	// 			LastMod:    updatedAt,
	// 			Priority:   0.2,
	// 			Changefreq: "monthly",
	// 		})
	// 	}

	var buffer bytes.Buffer

	buffer.WriteString(header)
	for _, item := range items {
		buffer.WriteString(item.String())
	}
	buffer.WriteString(footer)

	go ioutil.WriteFile("tmp/sitemap", buffer.Bytes(), 0644)

	return buffer.Bytes()
}

func SiteMapHandler(w http.ResponseWriter, r *http.Request) {
	fi, err := os.Stat("tmp/sitemap")
	var data []byte

	if err == nil {
		fileDate := fi.ModTime()
		nowDate := time.Now()

		if fileDate.Month() == nowDate.Month() &&
			fileDate.Day() == nowDate.Day() {
			cached, err := ioutil.ReadFile("tmp/sitemap")
			if err != nil {
				data = generateSitemap()
			} else {
				data = cached
			}
		} else {
			data = generateSitemap()
		}
	} else {
		data = generateSitemap()
	}

	w.WriteHeader(200)
	w.Write(data)
	// 	return generateSitemap()
}
