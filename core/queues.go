package core

import (
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/streadway/amqp"
)

var (
	AMQPCONN *amqp.Connection
)

func setupAMQP() {
	var err error

	url := os.Getenv("AMQP_URL")

	AMQPCONN, err = amqp.Dial(url)
	if err != nil {
		log.Fatal("Failed to connect to RabbitMQ:", err)
	}
}

type SubscriptionsByUrl struct {
	Tasker
}

func (s *SubscriptionsByUrl) Perform(d amqp.Delivery) {
	var channel Channel

	data := strings.Split(string(d.Body), "|")
	notFound := database.Table("channels").Where("url = ?", data[1]).First(&channel).RecordNotFound()

	if notFound {
		if d.Redelivered && time.Since(d.Timestamp).Minutes() > 2 {
			d.Ack(true)
		} else {
			FetchChannel(data[1])
			d.Nack(true, true)
		}
	} else {
		SubscribeChannelHelper(data[0], strconv.Itoa(int(channel.Id)))
		d.Ack(true)
	}
}

func (s *SubscriptionsByUrl) QueueName() string {
	return "subscriptions_by_url"
}

// -- define tasks

func init() {
	tasks := make([]Tasker, 0)

	tasks = append(tasks, new(SubscriptionsByUrl))

	go TaskerSet(tasks)
}
