package core

func TouchChannel(id int) {
	var channel Channel
	database.First(&channel, id)
	FetchChannel(channel.Url)
}
