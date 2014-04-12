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

func CacheUserSubscription(uc *UserChannel) {
	channelId := strconv.Itoa(int(uc.ChannelId))
	userId := strconv.Itoa(int(uc.UserId))
	cachedKey := "s:" + channelId + ":" + userId
	CacheSet(cachedKey, true)
	CACHE.Del(0, "s:ids:"+userId)
}
