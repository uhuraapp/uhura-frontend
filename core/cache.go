package core

import (
	"io"
	"os"
	"reflect"

	"github.com/bradfitz/gomemcache/memcache"
	"github.com/ugorji/go/codec"
)

var (
	cache  *memcache.Client
	writer io.Writer
	reader io.Reader
)

func CacheSet(key string, data interface{}) error {
	var (
		value []byte
		mh    codec.MsgpackHandle
	)

	mh.MapType = reflect.TypeOf(data)

	enc := codec.NewEncoder(writer, &mh)
	enc = codec.NewEncoderBytes(&value, &mh)
	err := enc.Encode(data)

	if err != nil {
		return err
	}

	return cache.Set(&memcache.Item{Key: key, Value: value})
}

func CacheGet(key string, as interface{}) (interface{}, error) {
	var (
		data interface{}
		mh   codec.MsgpackHandle
	)

	mh.MapType = reflect.TypeOf(as)

	cached, err := cache.Get(key)
	if err != nil {
		return nil, err
	}

	dec := codec.NewDecoder(reader, &mh)
	dec = codec.NewDecoderBytes(cached.Value, &mh)
	err = dec.Decode(&data)

	return data, err
}

func init() {
	memcacheUrl := os.Getenv("MEMCACHED_URL")
	cache = memcache.New(memcacheUrl)
}
