package core

var ChannelChan = make(chan int)

func AddFeed(feed_url string, userId int) ChannelResult {
	var channel Channel
	var userChannel UserChannel
	database.FirstOrCreate(&channel, map[string]interface{}{"url": feed_url})
	go database.Where(UserChannel{ChannelId: channel.Id, UserId: userId}).FirstOrCreate(&userChannel)

	FetchChanell(channel)
	<-ChannelChan
	var result ChannelResult
	database.Table("channels").First(&result, channel.Id)
	return result
}
