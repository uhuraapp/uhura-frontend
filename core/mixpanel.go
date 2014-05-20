package core

import (
	"encoding/base64"
	"encoding/json"
	"net/http"
	"os"
)

var MIXPANEL *Mixpanel

func init() {
	MIXPANEL = NewMixpanel(os.Getenv("MIXPANEL_TOKEN"))
}

type Mixpanel struct {
	Token string
}

type People struct {
	m  *Mixpanel
	id string
}

type trackParams struct {
	Event      string                 `json:"event"`
	Properties map[string]interface{} `json:"properties"`
}

func (m *Mixpanel) Track(distinctId string, eventName string,
	properties map[string]interface{}) {
	params := trackParams{Event: eventName}
	params.Properties = make(map[string]interface{}, 0)
	for key, value := range properties {
		params.Properties[key] = value
	}
	params.Properties["distinct_id"] = distinctId
	params.Properties["token"] = m.Token
	m.send("track", params)
}

func (m *Mixpanel) Identify(id string) *People {
	params := map[string]interface{}{"$token": m.Token, "$distinct_id": id}
	m.send("engage", params)
	return &People{m: m, id: id}
}

func (p *People) Track(eventName string, properties map[string]interface{}) {
	p.m.Track(p.id, eventName, properties)
}

func (p *People) Set(setParams map[string]interface{}) {
	params := map[string]interface{}{
		"$token":       p.m.Token,
		"$distinct_id": p.id,
		"$set":         setParams,
	}
	p.m.send("engage", params)
}

func (m *Mixpanel) to64(data string) string {
	bytes := []byte(data)
	return base64.StdEncoding.EncodeToString(bytes)
}

func (m *Mixpanel) send(eventType string, params interface{}) (*http.Response, error) {

	dataJSON, _ := json.Marshal(params)
	data := string(dataJSON)

	url := "https://api.mixpanel.com/" + eventType + "?data=" + m.to64(data)
	return http.Get(url)
}

func NewMixpanel(token string) *Mixpanel {
	return &Mixpanel{Token: token}
}
