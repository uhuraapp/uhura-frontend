package core

import (
	"strconv"
	"strings"

	"github.com/streadway/amqp"
)

type SubscriptionsByUrl struct {
	Tasker
}

func (s *SubscriptionsByUrl) Perform(d amqp.Delivery) {
	var channel Channel

	data := strings.Split(string(d.Body), "|")
	notFound := database.Table("channels").Where("url = ?", data[1]).First(&channel).RecordNotFound()

	if notFound {
		FetchChannel(data[1])
		d.Nack(true, true)
	} else {
		SubscribeChannelHelper(data[0], strconv.Itoa(int(channel.Id)))
		d.Ack(false)
	}
}

func (s *SubscriptionsByUrl) QueueName() string {
	return "subscriptions_by_url"
}

// -- define tasks

func init() {
	tasks := make([]Tasker, 0)

	tasks = append(tasks, new(SubscriptionsByUrl))

	TasksSet(tasks)
}
