package core

import (
	//"io"
	"io/ioutil"
	"net/http"
	"strings"

	// "code.google.com/p/go.net/html"
	r "github.com/dukex/uhura/core/helper"
)

func FindChannels(userId string, w http.ResponseWriter, request *http.Request) {
	channels := make([]ChannelEntity, 0)
	url := request.PostFormValue("url")
	pageR, _ := http.Get(url)
	contentype := pageR.Header.Get("Content-Type")
	isXml := (strings.Contains(contentype, "xml") && !strings.Contains(contentype, "html"))

	if isXml {
		body, _ := ioutil.ReadAll(pageR.Body)
		FetchOnlyChannelFromBytes(url, body)
		database.Table("channels").Where("url = ?", url).Scan(&channels)
		for i, _ := range channels {
			channels[i].SetSubscription(userId)
		}
	} else {
		// channels = FetchTempChannelFromLinks(findLinks(pageR.Body))
	}

	go func() {
		MIXPANEL.Track(userId, "find", map[string]interface{}{
			"url":   url,
			"found": len(channels),
		})
	}()

	r.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
}

// func findLinks(body io.Reader) []string {
// 	h, _ := html.Parse(body)

// 	links := make([]*html.Node, 0)
// 	feeds := make([]string, 0)

// 	var l func(n *html.Node)
// 	l = func(n *html.Node) {
// 		if n.Type == html.ElementNode && n.Data == "link" {
// 			for _, link := range n.Attr {
// 				if link.Key == "type" && link.Val == "application/rss+xml" {
// 					links = append(links, n)
// 				}
// 			}
// 		}

// 		for c := n.FirstChild; c != nil; c = c.NextSibling {
// 			l(c)
// 		}
// 	}

// 	l(h)

// 	for _, link := range links {
// 		for _, a := range link.Attr {
// 			if a.Key == "href" {
// 				feeds = append(feeds, a.Val)
// 			}
// 		}
// 	}

// 	return feeds
// }
