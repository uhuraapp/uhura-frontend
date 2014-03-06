package core

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"

	r "github.com/dukex/uhura/core/helper"
	esapi "github.com/mattbaird/elastigo/api"
	escore "github.com/mattbaird/elastigo/core"
)

func init() {
	esapi.Domain = "127.0.0.1"

	if os.Getenv("SEARCH_INDEX") == "true" {
		type channelES struct {
			Id          int    `json:"id"`
			Title       string `json:"title"`
			URL         string `json:"url"`
			Description string `json:"description"`
		}

		type episodeES struct {
			Id          int    `json:"id"`
			Title       string `json:"title"`
			URL         string `json:"url"`
			Description string `json:"description"`
		}

		var channels []channelES
		var episodes []episodeES

		database.Table("channels").Find(&channels)
		database.Table("items").Find(&episodes)

		go func() {
			for _, channel := range channels {
				fmt.Println("Indexing Channel", channel.Id, "....")
				id := strconv.Itoa(channel.Id)
				escore.Index(true, "uhura", "channel", id, channel)
			}
		}()

		go func() {
			for _, episode := range episodes {
				fmt.Println("Indexing Episodes", episode.Id, "....")
				id := strconv.Itoa(episode.Id)
				escore.Index(true, "uhura", "episode", id, episode)
			}
		}()
	}
}

func SearchChannels(userId string, w http.ResponseWriter, request *http.Request) {
	query := request.URL.Query()
	q := strings.Join(query["q"], " ")

	searchJson := map[string]interface{}{
		"query": map[string]interface{}{
			"multi_match": map[string]interface{}{
				"fields": []string{"title", "url", "description"},
				"query":  q,
			},
		},
	}

	out, _ := escore.SearchRequest(true, "uhura", "channel", searchJson, "", 0)
	ids := getIds(out.Hits.Hits)

	channels := make([]ChannelResult, 0)

	database.Table("channels").Where("id in (?)", ids).Scan(&channels)

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
