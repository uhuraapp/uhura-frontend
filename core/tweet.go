package core

import (
	"github.com/dukex/buffer"
	"github.com/rakyll/coop"
	"os"
	"strconv"
	"time"
)

var client *buffer.Client
var bufferProfile string

func init() {
	client = buffer.NewClient("1/8fed29fabae1cd48cfb9d885ee77a6ed")
	bufferProfile = os.Getenv("BUFFER_PROFILE")
}

func NewChannelTweet(chId int) {
	coop.After(2*time.Minute, func() {
		var ch Channel
		database.First(&ch, chId)

		text := ch.ShareUrl()
		text = text + " #podcast " + ch.Title
		client.CreateUpdate(text, []string{bufferProfile}, map[string]interface{}{})
	})
}

func NewEpisodeTweet(epId int) {
	coop.After(1*time.Minute, func() {
		var episode Item
		var channel Channel
		var message string

		database.First(&episode, epId)
		database.First(&channel, episode.ChannelId)

		channelId := strconv.Itoa(channel.Id)

		message = "http://uhuraapp.com/channels/" + channelId + "/" + episode.Uri
		message = message + episode.Title + " - " + channel.Title

		client.CreateUpdate(message, []string{bufferProfile}, map[string]interface{}{})
	})
}
