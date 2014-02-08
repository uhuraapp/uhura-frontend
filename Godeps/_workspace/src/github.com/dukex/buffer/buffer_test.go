package buffer

import (
	"fmt"
	. "github.com/franela/goblin"
	. "github.com/onsi/gomega"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func Fixture(name string) ([]byte, error) {
	filename := strings.Replace(name, "/", "-", -1)
	return ioutil.ReadFile("fixtures/" + filename + ".json")
}

func Test(t *testing.T) {
	g := Goblin(t)

	g.Describe("NewClient", func() {
		g.It("set url and access_token", func() {
			client := NewClient("accessToken")
			Expect(client.AccessToken).Should(Equal("accessToken"))
			Expect(client.Url).Should(Equal("https://api.bufferapp.com/1"))
		})
	})

	g.Describe("client.CreateUpdate", func() {
		var ts *httptest.Server

		g.Before(func() {
			ts = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				w.WriteHeader(200)
				body, err := Fixture(r.Method + r.URL.Path)
				if err != nil {
					fmt.Println(err)
				}
				fmt.Fprint(w, string(body))
			}))
		})

		g.After(func() {
			ts.Close()
		})

		g.It("returns Updates", func() {
			client := NewClient("accessToken")
			client.Url = ts.URL
			updates := client.CreateUpdate("This is an example update", []string{"1", "2"}, map[string]interface{}{"now": false})
			Expect(updates[0].Text).Should(Equal("This is an example update"))
		})
	})
}
