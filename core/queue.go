package core

func TouchChannel(id int) {
	var channel Channel
	database.First(&channel, id).Update("loading", true)
	FetchChannel(channel.Url)
}
