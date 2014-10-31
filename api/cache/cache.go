package cache

import (
	"io"
	"log"
	"os"
	"reflect"

	memcache "github.com/dustin/gomemcached/client"
	"github.com/ugorji/go/codec"
)

var (
	CACHE *memcache.Client
)

func Set(key string, data interface{}) {
	var (
		value []byte
		mh    codec.MsgpackHandle
		w     io.Writer
	)

	mh.MapType = reflect.TypeOf(data)
	mh.SliceType = reflect.TypeOf(data)

	enc := codec.NewEncoder(w, &mh)
	enc = codec.NewEncoderBytes(&value, &mh)
	err := enc.Encode(data)

	if err == nil {
		_, err = CACHE.Set(0, key, 0, 0, value)
		log.Println("Caching", key, "--", mh.MapType, " -->", data)
		if err != nil {
			log.Println("CACHE ERROR:", err)
		}
	} else {
		log.Println("ENCODE ERROR:", err)
	}
}

func Get(key string, as interface{}) (interface{}, error) {
	var (
		data interface{}
		mh   codec.MsgpackHandle
		r    io.Reader
	)

	mh.MapType = reflect.TypeOf(as)
	mh.SliceType = reflect.TypeOf(as)

	cached, err := CACHE.Get(0, key)
	if err != nil {
		return nil, err
	}

	dec := codec.NewDecoder(r, &mh)
	dec = codec.NewDecoderBytes(cached.Body, &mh)
	err = dec.Decode(&data)

	log.Println("Getting", key, "--", mh.MapType, " -->", data)

	return data, err
}

func init() {
	memcachedUrl := os.Getenv("MEMCACHEDCLOUD_SERVERS")
	memcachedPassword := os.Getenv("MEMCACHEDCLOUD_PASSWORD")
	memcachedUsername := os.Getenv("MEMCACHEDCLOUD_USERNAME")

	var memcachedErr error

	CACHE, memcachedErr = memcache.Connect("tcp", memcachedUrl)

	if memcachedErr != nil {
		log.Println("Config:", memcachedUrl, memcachedPassword, memcachedUsername)
		log.Panic("Memcached error", memcachedErr.Error())
	}

	if memcachedPassword != "" {
		CACHE.Auth(memcachedUsername, memcachedPassword)
	}

	log.Println("CACHE Healthy", CACHE.IsHealthy())
	log.Println(CACHE.Set(0, "test", 0, 5, []byte("Testing...")))
	log.Println(CACHE.Get(0, "test"))
}
