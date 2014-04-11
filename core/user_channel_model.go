package core

import (
	"strconv"
	"time"
)

type UserChannel struct {
	Id        int64
	UserId    int64
	ChannelId int64
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (uc *UserChannel) AfterCreate() {
	CacheUserSubscription(uc)
}

func CacheUserSubscription(uc *UserChannel) error {
	channelId := strconv.Itoa(int(uc.ChannelId))
	userId := strconv.Itoa(int(uc.UserId))

	cacheKey := "s:" + channelId + ":" + userId

	return CacheSet(cacheKey, true)
}
