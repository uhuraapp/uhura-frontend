package core

import "strconv"

func AddFeed(feed_url string) {
  configDatabase()

  var channel Channel
  database.Where(Channel{Url: feed_url}).FirstOrCreate(&channel)

  FetchChanell(strconv.Itoa(channel.Id))
}
