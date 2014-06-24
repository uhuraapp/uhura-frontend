package core

import (
	"log"
	"os"

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
