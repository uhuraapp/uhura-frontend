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
	Id          int    `json:"id"`
	Title       string `json:"title"`
	URL         string `json:"url"`
	Description string `json:"description"`
}

type EpisodeES struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	URL         string `json:"url"`
	Description string `json:"description"`
}

func init() {
	searchURL, _ := url.Parse(os.Getenv("SEARCHBOX_URL"))
	userPassword := searchURL.User.String()
	domainPort := strings.Split(searchURL.Host, ":")
	domain := domainPort[0]
	var port string
	if len(domainPort) < 2 {
		port = "80"
	} else {
		port = domainPort[1]
	}

	esapi.Protocol = searchURL.Scheme
	esapi.Domain = userPassword + "@" + domain
	esapi.Port = port

	if os.Getenv("SEARCH_INDEX") == "true" {

		var channels []ChannelES
		var episodes []EpisodeES

		database.Table("channels").Find(&channels)
		database.Table("items").Find(&episodes)

		go func() {
			for _, channel := range channels {
				IndexChannel(channel)
			}
		}()

		go func() {
			for _, episode := range episodes {
				IndexEpisode(episode)
			}
		}()
	}
}

func IndexChannel(channel ChannelES) {
	log.Println("Indexing Channel", channel.Id, "....")
	id := strconv.Itoa(channel.Id)
	r, e := escore.Index(true, "uhura", "channel", id, channel)
	log.Println("Response", r)
	log.Println("Response", e)
}

func IndexEpisode(episode EpisodeES) {
	log.Println("Indexing Episodes", episode.Id, "....")
	id := strconv.Itoa(episode.Id)
	r, e := escore.Index(true, "uhura", "episode", id, episode)
	log.Println("Response", r)
	log.Println("Response", e)
}

func SearchChannels(userId string, w http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	q := strings.Join(query["q"], " ")

	searchJson := map[string]interface{}{
		"query": map[string]interface{}{
			"multi_match": map[string]interface{}{
				"fields": []string{"title^3", "url", "description^2"},
				"query":  q,
			},
		},
	}

	out, _ := escore.SearchRequest(true, "uhura", "channel", searchJson, "", 0)
	ids := getIds(out.Hits.Hits)

	channels := make([]ChannelResult, 0)

	if len(ids) > 0 {
		database.Scopes(ChannelDefaultQuery(userId)).Where("channels.id in (?)", ids).Find(&channels)
	}

	go MIXPANEL.Track(userId, "search", map[string]interface{}{"q": q})

	r.ResponseJSON(w, 200, map[string][]ChannelResult{"channels": channels})
}

func SearchEpisodes(userId string, w http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	q := strings.Join(query["q"], " ")

	searchJson := map[string]interface{}{
		"query": map[string]interface{}{
			"multi_match": map[string]interface{}{
				"fields": []string{"title", "description"},
				"query":  q,
			},
		},
	}

	out, _ := escore.SearchRequest(true, "uhura", "episode", searchJson, "", 0)

	r.ResponseJSON(w, 200, map[string][]int{"episodes": getIds(out.Hits.Hits)})
}

func getIds(hits []escore.Hit) []int {
	ids := make([]int, 0)
	for _, hit := range hits {
		var source struct {
			Id int `json:"id"`
		}
		js, _ := hit.Source.MarshalJSON()
		json.Unmarshal(js, &source)
		ids = append(ids, source.Id)
	}
	return ids
}
