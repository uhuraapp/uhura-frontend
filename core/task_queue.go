package core

import (
	"log"

	"github.com/streadway/amqp"
)

type Tasker interface {
	Perform(amqp.Delivery)
	QueueName() string
}

type ManagerTask struct {
	Channel *amqp.Channel
}

func (m *ManagerTask) PerformAsync(t Tasker, data []byte) error {
	return m.Channel.Publish(
		"",
		t.QueueName(),
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        data,
		})
}

func TasksSet(tasks []Tasker) {
	setupAMQP()

	channelQ, err := AMQPCONN.Channel()
	if err != nil {
		log.Fatal("Failed to open a channel:", err)
	}
	defer channelQ.Close()

	done := make(chan bool)
	for _, t := range tasks {
		_, err := channelQ.QueueDeclare(
			t.QueueName(),
			true,
			false,
			false,
			false,
			nil,
		)
		if err != nil {
			log.Fatal("Failed to declare a task", err)
		}

		tasksQueue, err := channelQ.Consume(t.QueueName(), "", false, false, false, false, nil)
		if err != nil {
			log.Fatal("Failed to register a consumer:", err)
		}

		go func() {
			for d := range tasksQueue {
				t.Perform(d)
			}
		}()

	}

	log.Println("[*] Waiting for messages.")
	<-done
	log.Println("DONE")
}
