package buffer

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
)

const (
	URL = "https://api.bufferapp.com/1"
)

type Client struct {
	AccessToken string
	Url         string
}

type Update struct {
	Id        string
	Text      string
	ProfileId string
}

type ResponseUpdate struct {
	Success          bool
	BufferCount      int
	BufferPercentage int
	Updates          []Update
}

func (c *Client) CreateUpdate(text string, profileIds []string, options map[string]interface{}) []Update {
	urlEndpoint := c.Url + "/updates/create.json?access_token=" + c.AccessToken
	params := url.Values{}
	params.Set("text", text)
	for _, p := range profileIds {
		params.Add("profile_ids[]", p)
	}

	request, err := http.PostForm(urlEndpoint, params)

	if err != nil {
		panic(err)
	}

	defer request.Body.Close()

	requestBodyByte, _ := ioutil.ReadAll(request.Body)

	response := new(ResponseUpdate)
	err = json.Unmarshal(requestBodyByte, &response)

	if err != nil {
		panic(err)
	}

	return response.Updates
}

func NewClient(accessToken string) *Client {
	return &Client{Url: URL, AccessToken: accessToken}
}
