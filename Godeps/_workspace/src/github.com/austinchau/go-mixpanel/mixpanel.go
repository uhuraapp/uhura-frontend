package mixpanel

import (
  "fmt"
  "strings"
  "encoding/json"
  "net/http"
  "io/ioutil"
  "time"
  "sort"
  "bytes"
  "crypto/md5"
  "net/url"
)

const (
  DEFAULT_EXPIRE_IN_DAYS int64 = 5
)

type Mixpanel struct {
  ApiKey string
  Secret string
  Format string
  BaseUrl string
}

type EventQueryResult struct {
  LegendSize int `json:legend_size`
  Data struct {
    Series []string `json:series`
    Values map[string]map[string]int `json:values`
  } `json:data`
}

type ExportQueryResult struct {
  Event string `json:event`
  Properties map[string]interface{} `json:properties`
}

func NewMixpanel(key string, secret string) *Mixpanel {
  m := new(Mixpanel)
  m.Secret = secret
  m.ApiKey = key
  m.Format = "json"
  m.BaseUrl = "http://mixpanel.com/api/2.0"
  return m
}

func (m *Mixpanel) AddExpire(params *map[string]string) {
  if (*params)["expire"] == "" {
    (*params)["expire"] = fmt.Sprintf("%d", ExpireInDays(DEFAULT_EXPIRE_IN_DAYS))
  }
}

func (m *Mixpanel) AddSig(params *map[string]string) {
  keys := make([]string, 0)
  
  (*params)["api_key"] = m.ApiKey
  (*params)["format"] = m.Format

  for k,_ := range *params {
    keys = append(keys, k)
  }
  sort.StringSlice(keys).Sort()
  // fmt.Println(s)
  
  var buffer bytes.Buffer
  for _,key := range keys {
    value := (*params)[key]
    buffer.WriteString(fmt.Sprintf("%s=%s", key, value))
  }
  buffer.WriteString(m.Secret)
  // fmt.Println(buffer.String())
  
  hash := md5.New()
  hash.Write(buffer.Bytes())
  sigHex := fmt.Sprintf("%x", hash.Sum([]byte{}))
  (*params)["sig"] = sigHex
}

func (m *Mixpanel) makeRequest(action string, params map[string]string) ([]byte, error) {
  m.AddExpire(&params)
  m.AddSig(&params)
  
  var buffer bytes.Buffer
  for key,value := range params {
    value = url.QueryEscape(value)
    buffer.WriteString(fmt.Sprintf("%s=%s&", key, value))
  }
  
  uri := fmt.Sprintf("%s/%s?%s", m.BaseUrl, action, buffer.String())
  uri = uri[:len(uri)-1]
  // fmt.Println(uri)
  client := new(http.Client)
  req, err := http.NewRequest("GET", uri, nil)
  if err != nil {
  }
  // req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
  resp, err := client.Do(req)
  if err != nil {
  }
  // fmt.Println(resp.Header)
  defer resp.Body.Close()
  bytes, err := ioutil.ReadAll(resp.Body)
  return bytes, err
}

func ExpireInDays(days int64) int64 {
  return time.Now().Add(time.Duration(int64(time.Hour) * days * 24)).Unix()
}

func ExpireInHours(hours int64) int64 {
  return time.Now().Add(time.Duration(int64(time.Hour) * hours)).Unix()
}

func (m *Mixpanel) EventQuery(params map[string]string) (EventQueryResult,error) {
  m.BaseUrl = "http://mixpanel.com/api/2.0"
  bytes, err := m.makeRequest("events/properties", params)
  // fmt.Println(string(bytes))
  var result EventQueryResult
  err = json.Unmarshal(bytes, &result)
  return result, err
}

func (m *Mixpanel) ExportQuery(params map[string]string) []ExportQueryResult {
  m.BaseUrl = "http://data.mixpanel.com/api/2.0"
  var results []ExportQueryResult
  bytes, _ := m.makeRequest("export", params)
  str := string(bytes)
  // fmt.Println(str)
  for _, s := range strings.Split(str, "\n") {
    var result ExportQueryResult
    json.Unmarshal([]byte(s),&result)
    results = append(results, result)
  }
  return results
}

func (m *Mixpanel) PeopleQuery(params map[string]string) map[string]interface{} {
  m.BaseUrl = "http://mixpanel.com/api/2.0"
  bytes, _ := m.makeRequest("engage", params)
  str := string(bytes)
  // fmt.Println(str)
  var raw map[string]interface{}
  json.Unmarshal([]byte(str),&raw)
  return raw
}

func (m *Mixpanel) UserInfo(id string) map[string]interface{}{
  params := map[string]string{
    "distinct_id": id,
  }
  raw := m.PeopleQuery(params)
  return raw["results"].([]interface{})[0].(map[string]interface{})["$properties"].(map[string]interface{})
}