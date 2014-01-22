package main

import (
	"code.google.com/p/goauth2/oauth"
	"encoding/json"
	"fmt"
	"github.com/codegangsta/martini"
	"github.com/codegangsta/martini-contrib/render"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"uhura/core"
)

var config oauth.Config

const profileInfoURL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

func main() {
	config := &oauth.Config{
		ClientId:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GOOGLE_CALLBACK_URL"),
		Scope:        "https://www.googleapis.com/auth/userinfo.profile",
		AuthURL:      "https://accounts.google.com/o/oauth2/auth",
		TokenURL:     "https://accounts.google.com/o/oauth2/token",
		TokenCache:   oauth.CacheFile("cache.json"),
	}

	m := martini.Classic()

	m.Use(render.Renderer(render.Options{
		// Layout: "layout",
		Funcs: []template.FuncMap{
			{
				"UserViewedHelper": core.UserViewedHelper,
				"Pagination":       core.Pagination,
			},
		},
	}))

	m.Use(martini.Static("assets"))
	m.Use(martini.Static("fonts"))

	m.Get("/", func(r render.Render, req *http.Request) string {
		itb, _ := ioutil.ReadFile("./templates/index.html")
		indexTemplate := string(itb[:])
		return indexTemplate
	})

	m.Get("/dashboard", func(r render.Render, w http.ResponseWriter, request *http.Request) {
		page := request.FormValue("page")
		channel := request.FormValue("channel")
		user, err := core.CurrentUser(request)
		if err {
			http.Redirect(w, request, "/authorize", http.StatusFound)
		} else {
			channels := core.GetChannelByUser(user)
			items, counter := core.GetUserItems(user, channels, channel, page)

			r.HTML(200, "dashboard", map[string]interface{}{"current_user": &user, "channels": channels, "items": items, "counter": counter})
		}
	})

	m.Get("/dashboard/channels/:id", func(r render.Render, w http.ResponseWriter, params martini.Params, request *http.Request) {
		page := request.FormValue("page")
		channelParams := params["id"]
		user, err := core.CurrentUser(request)
		if err {
			http.Redirect(w, request, "/authorize", http.StatusFound)
		} else {
			channels := core.GetChannelByUser(user)
			channel := core.GetChannel(channelParams)
			items, counter := core.GetUserItems(user, channels, channelParams, page)

			r.HTML(200, "dashboard", map[string]interface{}{"current_user": &user, "channels": channels, "items": items, "counter": counter, "channel": channel})
		}
	})

	// API

	m.Post("/api/channels/:id/fetcher", func(responseWriter http.ResponseWriter, request *http.Request, params martini.Params) {
		//		core.FetchChanell(channel)
		//	http.Redirect(responseWriter, request, "/dashboard/channels/"+params["id"], http.StatusMovedPermanently)
	})

	m.Post("/api/items/:key/watched", func(responseWriter http.ResponseWriter, r render.Render, request *http.Request, params martini.Params) {
		user, err := core.CurrentUser(request)
		if err {
			r.Error(403)
			return
		}

		core.UserWatched(user.Id, params["key"])
		// r.JSON(202, map[string]interface{}{"message": "Processing"})
		http.Redirect(responseWriter, request, "/dashboard", http.StatusMovedPermanently)
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
		channels := core.AllChannels(userId)
		r.JSON(200, map[string]interface{}{"channels": channels})
	})

	m.Post("/api/channels", func(responseWriter http.ResponseWriter, r render.Render, request *http.Request, params martini.Params) {
		request.ParseForm()
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

	m.Get("/api/channels/:uri", func(r render.Render, params martini.Params) {
		channel := core.GetChannel(params["uri"])
		r.JSON(200, map[string]interface{}{"channel": channel})
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

	// API - Users
	m.Get("/api/users/current_user", func(r render.Render, request *http.Request) {
		user, err := core.CurrentUser(request)
		if err {
			r.Error(403)
			return
		}

		r.JSON(200, &user)
	})

	m.Post("/api/users/save_state", func(r render.Render, request *http.Request) {
		user, err := core.CurrentUser(request)
		if err {
			r.Error(403)
			return
		}

		r.JSON(200, &user)
	})

	// API - Auth
	m.Get("/api/authorize", func(w http.ResponseWriter, r *http.Request) {
		url := config.AuthCodeURL("")
		http.Redirect(w, r, url, http.StatusFound)
	})

	m.Get("/auth/callback", func(responseWriter http.ResponseWriter, request *http.Request, r render.Render) string {
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

	fmt.Println("Starting server on", os.Getenv("PORT"))
	http.ListenAndServe(":"+os.Getenv("PORT"), m)
}
