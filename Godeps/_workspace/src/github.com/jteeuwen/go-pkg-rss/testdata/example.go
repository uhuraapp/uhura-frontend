package main

/*
This is a minimal sample application, demonstrating how to set up an RSS feed
for regular polling of new channels/items.

Build & run with:

 $ 6g example.go && 6l example.6 && ./6.out

*/

import (
	"fmt"
	rss "github.com/jteeuwen/go-pkg-rss"
	"os"
	"time"
)

func main() {
	// This sets up a new feed and polls it for new channels/items.
	// Invoke it with 'go PollFeed(...)' to have the polling performed in a
	// separate goroutine, so you can continue with the rest of your program.
	PollFeed("http://blog.case.edu/news/feed.atom", 5)
}

func PollFeed(uri string, timeout int) {
	feed := rss.New(timeout, true, chanHandler, itemHandler)

	for {
		if err := feed.Fetch(uri, nil); err != nil {
			fmt.Fprintf(os.Stderr, "[e] %s: %s", uri, err)
			return
		}

		<-time.After(time.Duration(feed.SecondsTillUpdate() * 1e9))
	}
}

func chanHandler(feed *rss.Feed, newchannels []*rss.Channel) {
	fmt.Printf("%d new channel(s) in %s\n", len(newchannels), feed.Url)
}

func itemHandler(feed *rss.Feed, ch *rss.Channel, newitems []*rss.Item) {
	fmt.Printf("%d new item(s) in %s\n", len(newitems), feed.Url)
}
