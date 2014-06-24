package core

import (
	"strconv"
	"strings"

	"github.com/streadway/amqp"
)

// -- define tasks

func init() {
	tasks := make([]Tasker, 0)

	tasks = append(tasks, new(SubscriptionsByUrl))

	TasksSet(tasks)
}
