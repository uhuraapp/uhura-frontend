package core

import (
	"bytes"
	// "fmt"
	"github.com/joeguo/sitemap"
	"io/ioutil"
	"os"
	"strconv"
	"time"
)

const (
	header = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
	footer = ` </urlset>`
)

func generateSitemap() string {
	channels, episodes := AllChannels(0, false, "")
	var items []*sitemap.Item

	item := sitemap.Item{
		Loc:        "http://uhuraapp.com/",
		LastMod:    time.Now(),
		Priority:   0.8,
		Changefreq: "daily",
	}
	items = append(items, &item)

	items = append(items, &sitemap.Item{
		Loc:        "http://uhuraapp.com/channels",
		LastMod:    time.Now(),
		Priority:   1,
		Changefreq: "daily",
	})

	for _, channel := range channels {
		updatedAt := channel.UpdatedAt

		if updatedAt.Year() == 1 {
			updatedAt = time.Now()
		}

		items = append(items, &sitemap.Item{
			Loc:        "http://uhuraapp.com/channels/" + channel.Uri,
			LastMod:    updatedAt,
			Priority:   0.5,
			Changefreq: "weekly",
		})
	}

	for _, episode := range episodes {
		updatedAt := episode.PublishedAt

		if updatedAt.Year() == 1 {
			updatedAt = time.Now()
		}

		items = append(items, &sitemap.Item{
			Loc:        "http://uhuraapp.com/channels/" + strconv.Itoa(episode.ChannelId) + "/" + episode.GetUri(),
			LastMod:    updatedAt,
			Priority:   0.2,
			Changefreq: "monthly",
		})
	}

	var buffer bytes.Buffer

	buffer.WriteString(header)
	for _, item := range items {
		buffer.WriteString(item.String())
	}
	buffer.WriteString(footer)

	go ioutil.WriteFile("tmp/sitemap", buffer.Bytes(), 0644)

	return buffer.String()
}

func SiteMap() string {
	fi, err := os.Stat("tmp/sitemap")
	if err == nil {
		fileDay := fi.ModTime().Day()
		fileMonth := fi.ModTime().Month()
		nowDay := time.Now().Day()
		nowMonth := time.Now().Month()

		if (fileDay == nowDay) && (fileMonth == nowMonth) {
			cached, err := ioutil.ReadFile("tmp/sitemap")
			if err != nil {
				return generateSitemap()
			}
			return string(cached)
		} else {
			return generateSitemap()
		}
	}
	return generateSitemap()
}
