package core

import (
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func isABotRequest(r *http.Request) bool {
	userAgent := strings.ToLower(r.UserAgent())

	return strings.Contains(userAgent, "structureddata") ||
		strings.Contains(userAgent, "flipboard.com") ||
		strings.Contains(userAgent, "newsme") ||
		strings.Contains(userAgent, "bot") ||
		strings.Contains(userAgent, "slurp") ||
		strings.Contains(userAgent, "facebookexternalhit")
}

func isABotUser(userId string) bool {
	return userId == "bot"
}

type episodeEntityBot struct {
	EpisodeEntity
	DescriptionHTML template.HTML
}

func renderToBot(w http.ResponseWriter, r *http.Request) {

	var channel struct {
		Channel
		DescriptionHTML template.HTML
		Episodes        []episodeEntityBot
	}

	templateChannel, _ := ioutil.ReadFile("views/channel.tmpl")
	parts := strings.Split(r.URL.Path, "/")

	channelUri := parts[2]

	if len(parts) > 3 {
		log.Println("episode", parts[4])
	}

	err := database.Table("channels").Where("uri = ?", channelUri).Find(&channel).Error

	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	t := template.New("Channel template")
	t, err = t.Parse(string(templateChannel))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}

	episodes := make([]episodeEntityBot, 0)

	database.Table("items").Where("items.channel_id = ?", channel.Id).Find(&episodes)

	channel.Episodes = episodes
	for i, _ := range channel.Episodes {
		channel.Episodes[i].DescriptionHTML = template.HTML(channel.Episodes[i].Description)
	}

	channel.DescriptionHTML = template.HTML(channel.Description)

	err = t.Execute(w, channel)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	} else {
		w.WriteHeader(200)
	}
	return
}
