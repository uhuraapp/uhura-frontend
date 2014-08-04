package core

func TouchChannel(uri string) {
	var channel Channel
	database.Where("channels.uri = ?", uri).First(&channel).Update("loading", true)
	FetchChannel(channel.Url)
}
