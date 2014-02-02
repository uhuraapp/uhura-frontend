package main

import (
	"code.google.com/p/goauth2/oauth"
	"encoding/json"
	"fmt"
	"github.com/codegangsta/martini"
	"github.com/codegangsta/martini-contrib/render"
	"github.com/dukex/uhura/core"
	"github.com/rakyll/martini-contrib/cors"
	"html/template"
	"io/ioutil"
	"net/http"
	"strconv"

	"os"
)

var config oauth.Config

const profileInfoURL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

func main() {
	config := &oauth.Config{
		ClientId:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_CALLBACK_URL"),
		Scope:        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
		AuthURL:      "https://accounts.google.com/o/oauth2/auth",
		TokenURL:     "https://accounts.google.com/o/oauth2/token",
		TokenCache:   oauth.CacheFile("cache.json"),
	}

	m := martini.Classic()

	m.Use(render.Renderer(render.Options{
		Funcs: []template.FuncMap{
			{
				"UserViewedHelper": core.UserViewedHelper,
				"Pagination":       core.Pagination,
			},
		},
	}))

	m.Use(cors.Allow(&cors.Opts{
		AllowOrigins: []string{"http://emberjs.jsbin.com"},
	}))

	m.Use(martini.Static("assets"))
	m.Use(martini.Static("fonts"))

	m.Get("/", func(r render.Render, req *http.Request) string {
		itb, _ := ioutil.ReadFile("./templates/index.html")
		indexTemplate := string(itb[:])
		return indexTemplate
	})

	// API

	// m.Post("/api/channels/:id/fetcher", func(responseWriter http.ResponseWriter, request *http.Request, params martini.Params) {
	// 	channel := core.GetChannelByChannel(params["id"])
	// 	core.FetchChanell(channel)
	// 	//	http.Redirect(responseWriter, request, "/dashboard/channels/"+params["id"], http.StatusMovedPermanently)
	// })

	m.Post("/api/episodes/:id/listened", func(responseWriter http.ResponseWriter, r render.Render, request *http.Request, params martini.Params) {
		user, err := core.CurrentUser(request)
		if err {
			r.Error(403)
			return
		}

		episode := core.UserListen(user.Id, params["id"])
		r.JSON(202, map[string]interface{}{"episode": episode})
	})

	// -----------------
	// API
	m.Get("/api/channels", func(r render.Render, w http.ResponseWriter, request *http.Request) {
		var userId int
		user, err := core.CurrentUser(request)
		if err {
			userId = 0
		} else {
			userId = user.Id
		}

		var onlyFeatured bool
		if featured := request.FormValue("featured"); featured == "" {
			onlyFeatured = false
		} else {
			onlyFeatured = featured == "true"
		}

		channels, _ := core.AllChannels(userId, onlyFeatured, 0)
		r.JSON(200, map[string]interface{}{"channels": channels})
	})

	m.Post("/api/channels", func(responseWriter http.ResponseWriter, r render.Render, request *http.Request, params martini.Params) {
		user, err := core.CurrentUser(request)
		if err {
			r.Error(403)
			return
		}

		var channelJson struct {
			Channel core.Channel `json:"channel"`
		}

		json.NewDecoder(request.Body).Decode(&channelJson)

		channel := core.AddFeed(channelJson.Channel.Url, user.Id)
		r.JSON(200, map[string]interface{}{"channel": channel})
	})

	m.Get("/api/channels/:id", func(r render.Render, params martini.Params, request *http.Request) {
		var userId int
		user, err := core.CurrentUser(request)
		if err {
			userId = 0
		} else {
			userId = user.Id
		}

		channelId, _ := strconv.Atoi(params["id"])

		channels, episodes := core.AllChannels(userId, false, channelId)

		r.JSON(200, map[string]interface{}{"channel": channels[0], "episodes": episodes})
	})

	m.Get("/api/channels/:id/subscribe", func(r render.Render, request *http.Request, params martini.Params) {
		user, err := core.CurrentUser(request)

		if err {
			r.Error(403)
			return
		}

		channel := core.SubscribeChannel(user.Id, params["id"])

		r.JSON(200, map[string]interface{}{"channel": channel})
	})

	// API
	m.Get("/api/subscriptions", func(r render.Render, w http.ResponseWriter, request *http.Request) {
		user, err := core.CurrentUser(request)
		if err {
			r.Error(403)
			return
		}
		subscribes, channels := core.Subscriptions(user)
		r.JSON(200, map[string]interface{}{"subscriptions": subscribes, "channels": channels})
	})

	m.Get("/api/episodes", func(request *http.Request, r render.Render) {
		ids := request.URL.Query()["ids[]"]
		episodes := core.GetItems(ids)
		r.JSON(200, map[string]interface{}{"episodes": episodes})
	})
	// m.Get("/api/subscriptions/:uri/episodes", func(r render.Render, params martini.Params, request *http.Request) {
	// 	user, err := core.CurrentUser(request)
	// 	if err {
	// 		r.Error(403)
	// 		return
	// 	}

	// 	channel, episodes := core.GetChannel(params["uri"], user.Id)

	// 	r.JSON(200, map[string]interface{}{"episodes": episodes, "channel": channel})
	// })

	// API - Auth
	m.Get("/api/authorize", func(w http.ResponseWriter, request *http.Request) string {
		_, err := core.CurrentUser(request)
		if err {
			url := config.AuthCodeURL("")
			http.Redirect(w, request, url, http.StatusFound)
			return ""
		} else {
			return "<script>window.close();</script>"
		}
	})

	m.Get("/auth/callback", func(responseWriter http.ResponseWriter, request *http.Request) string {
		code := request.FormValue("code")
		t := &oauth.Transport{Config: config}
		t.Exchange(code)
		responseAuth, _ := t.Client().Get(profileInfoURL)
		defer responseAuth.Body.Close()

		_, err := core.CreateAndLoginUser(request, responseWriter, responseAuth)

		if err {
			// TODO: set flash
			// http.Redirect(responseWriter, request, "/", http.StatusMovedPermanently)
		} else {
			// returnTo := core.GetReturnTo(request)
		}

		return "<script>window.close();</script>"
	})

	// API - DEV
	m.Get("/api/dev/fetchall", func(r render.Render) {
		if os.Getenv("ENV") == "development" {
			core.FetchAllChannell()
		}
		r.JSON(202, "")
	})

	// Ember
	m.Get("/**", func(params martini.Params, responseWriter http.ResponseWriter, request *http.Request) {
		url := params["_1"]

		http.Redirect(responseWriter, request, "/#/"+url, http.StatusMovedPermanently)
	})

	fmt.Println("Starting server on", os.Getenv("PORT"))
	err := http.ListenAndServe(":"+os.Getenv("PORT"), m)
	if err != nil {
		panic(err)
	}
}
