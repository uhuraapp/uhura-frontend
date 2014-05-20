package core

import (
	"net/url"
	"os"
)

var URL string

func UrlTo(name string, params map[string]string) string {
	values := url.Values{}
	for k, v := range params {
		values.Set(k, v)
	}

	return URL + "/" + name + "/?" + values.Encode()
}

func init() {
	URL = os.Getenv("URL")
}
