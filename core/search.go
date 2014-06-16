package core

import (
	"encoding/json"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"

	r "github.com/dukex/uhura/core/helper"
	esapi "github.com/mattbaird/elastigo/api"
	escore "github.com/mattbaird/elastigo/core"
)

type ChannelES struct {
	Id          int    `json:"_id"`
	Title       string `json:"title"`
	URL         string `json:"url"`
	Description string `json:"description"`
}

type EpisodeES struct {
	Id          int    `json:"_id"`
	Title       string `json:"title"`
	URL         string `json:"url"`
	Description string `json:"description"`
}

func init() {
	var scheme, domain, port string

	if os.Getenv("ENV") == "development" {
		scheme = "http"
		domain = "localhost"
		port = "9200"
	} else {
		searchURL, _ := url.Parse(os.Getenv("SEARCHBOX_URL"))
		userPassword := searchURL.User.String()
		domainPort := strings.Split(searchURL.Host, ":")
		domain = userPassword + "@" + domainPort[0]
		port = "80"
		scheme = searchURL.Scheme
	}

	esapi.Protocol = scheme
	esapi.Domain = domain
	esapi.Port = port

	if os.Getenv("SEARCH_INDEX") == "true" {
		var channels []ChannelES
		// var episodes []EpisodeES

		database.Table("channels").Find(&channels)
		// database.Table("items").Find(&episodes)

		go func() {
			for _, channel := range channels {
				IndexChannel(channel)
			}
		}()

		// go func() {
		// 	for _, episode := range episodes {
		// 		IndexEpisode(episode)
		// 	}
		// }()
	}
}

func IndexChannel(channel ChannelES) {
	log.Println("Indexing Channel", channel.Id, "....")
	id := strconv.Itoa(channel.Id)
	r, e := escore.Index(true, "channels", "channel", id, channel)
	log.Println("Response", r)
	log.Println("err", e)
}

func IndexEpisode(episode EpisodeES) {
	log.Println("Indexing Episodes", episode.Id, "....")
	id := strconv.Itoa(episode.Id)
	r, e := escore.Index(true, "episodes", "episode", id, episode)
	log.Println("Response", r)
	log.Println("err", e)
}

func SearchChannels(userId string, w http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	q := strings.Join(query["q"], " ")

	search := map[string]interface{}{
		"query": map[string]interface{}{
			"fuzzy_like_this": map[string]interface{}{
				"fields":    []string{"title", "description"},
				"like_text": q,
			},
		},
		"filter": map[string]interface{}{
			"type": map[string]string{
				"value": "channel",
			},
		},
	}

	log.Println("Query", search)

	out, _ := escore.SearchRequest(true, "channels", "channel", search, "", 0)
	ids := getIds(out.Hits.Hits)

	channels := make([]ChannelEntity, 0)

	if len(ids) > 0 {
		database.Table("channels").Where("channels.id in (?)", ids).Find(&channels)
	}

	for i, _ := range channels {
		channels[i].SetSubscription(userId)
	}

	go func() {
		MIXPANEL.Track(userId, "search", map[string]interface{}{
			"q":     q,
			"found": len(channels),
		})
	}()

	r.ResponseJSON(w, 200, map[string][]ChannelEntity{"channels": channels})
}

func getIds(hits []escore.Hit) []int {
	ids := make([]int, 0)
	for _, hit := range hits {
		var source struct {
			Id int `json:"_id"`
		}
		js, _ := hit.Source.MarshalJSON()
		json.Unmarshal(js, &source)
		ids = append(ids, source.Id)
	}
	return ids
}
