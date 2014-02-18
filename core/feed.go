package core

// var ChannelChan = make(chan int)

// func AddFeed(feed_url string, userId int) ChannelResult {
// 	var channel Channel
// 	var userChannel UserChannel

// 	database.Where(Channel{Url: feed_url}).Attrs(Channel{Featured: true}).FirstOrCreate(&channel)

// 	FetchChanell(channel)
// 	<-ChannelChan

// 	var result ChannelResult
// 	database.Table("channels").First(&result, channel.Id)
// 	if result.Title != "" {
// 		go database.Where(UserChannel{ChannelId: channel.Id, UserId: userId}).FirstOrCreate(&userChannel)
// 		result.Subscribed = true
// 	}

// 	return result
// }
