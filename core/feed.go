package core

import "strconv"

func AddFeed(feed_url string, userId int) {
  configDatabase()

  var channel Channel
  var userChannel UserChannel
  database.Where(Channel{Url: feed_url}).FirstOrCreate(&channel)
  go database.Where(UserChannel{ChannelId: channel.Id, UserId: userId}).FirstOrCreate(&userChannel)

  FetchChanell(strconv.Itoa(channel.Id))
}
