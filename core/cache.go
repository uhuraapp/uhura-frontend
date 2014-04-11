package core

import (
	"io"
	"log"
	"os"
	"reflect"

	memcache "github.com/dustin/gomemcached/client"
	"github.com/ugorji/go/codec"
)

var (
	cache  *memcache.Client
	writer io.Writer
	reader io.Reader
)

func CacheSet(key string, data interface{}) {
	var (
		value []byte
		mh    codec.MsgpackHandle
	)

	mh.MapType = reflect.TypeOf(data)

	enc := codec.NewEncoder(writer, &mh)
	enc = codec.NewEncoderBytes(&value, &mh)
	err := enc.Encode(data)

	if err == nil {
		log.Println("CACHE ERROR:", err)
		cache.Set(0, key, 0, -1, value)
	}
}

func CacheGet(key string, as interface{}) (interface{}, error) {
	var (
		data interface{}
		mh   codec.MsgpackHandle
	)

	mh.MapType = reflect.TypeOf(as)

	cached, err := cache.Get(0, key)
	if err != nil {
		return nil, err
	}

	dec := codec.NewDecoder(reader, &mh)
	dec = codec.NewDecoderBytes(cached.Body, &mh)
	err = dec.Decode(&data)

	return data, err
}

func init() {
	memcachedUrl := os.Getenv("MEMCACHEDCLOUD_SERVERS")
	memcachedPassword := os.Getenv("MEMCACHEDCLOUD_PASSWORD")
	memcachedUsername := os.Getenv("MMEMCACHEDCLOUD_USERNAME")

	cache, err := memcache.Connect("tcp", memcachedUrl)
	if err != nil {
		panic(err)
	}

	if memcachedPassword != "" {
		cache.Auth(memcachedUsername, memcachedPassword)
	}

	log.Println("CACHE", cache.IsHealthy())
}
