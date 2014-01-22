package main

import (
	"code.google.com/p/goauth2/oauth"
	"github.com/codegangsta/martini"
	"github.com/codegangsta/martini-contrib/render"
	"html/template"
	"net/http"
	"os"
	"strconv"
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
		Layout: "layout",
		Funcs: []template.FuncMap{
			{
				"UserViewedHelper": core.UserViewedHelper,
				"Pagination":       core.Pagination,
				"ToHTML":           core.ToHTML,
			},
		},
	}))

	m.Use(martini.Static("assets"))
	m.Use(martini.Static("fonts"))

	m.Get("/", func(r render.Render, req *http.Request) {
		data := make(map[string]interface{})

		r.HTML(200, "home", data)
	})

	m.Get("/channels", func(r render.Render, w http.ResponseWriter, request *http.Request) {
		user, err := core.CurrentUser(request)
		if err {
			core.SetReturnTo(request, w, "/channels")
			http.Redirect(w, request, "/authorize", http.StatusFound)
		} else {
			channels := core.AllChannels(user)
			r.HTML(200, "channels", map[string]interface{}{"current_user": &user, "channels": channels})
		}
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

	m.Get("/authorize", func(w http.ResponseWriter, r *http.Request) {
		url := config.AuthCodeURL("")
		http.Redirect(w, r, url, http.StatusFound)
	})

	m.Get("/auth/callback", func(responseWriter http.ResponseWriter, request *http.Request) {
		code := request.FormValue("code")
		t := &oauth.Transport{Config: config}
		t.Exchange(code)
		responseAuth, _ := t.Client().Get(profileInfoURL)
		defer responseAuth.Body.Close()

		_, err := core.CreateAndLoginUser(request, responseWriter, responseAuth)

		if err {
			// TODO: set flash
			http.Redirect(responseWriter, request, "/", http.StatusMovedPermanently)
		} else {
			returnTo := core.GetReturnTo(request)
			http.Redirect(responseWriter, request, returnTo, http.StatusMovedPermanently)
		}
	})

	// API

	m.Post("/api/channels/:id/fetcher", func(responseWriter http.ResponseWriter, request *http.Request, params martini.Params) {
		core.FetchChanell(params["id"])
		http.Redirect(responseWriter, request, "/dashboard/channels/"+params["id"], http.StatusMovedPermanently)
	})

	m.Post("/api/channels", func(responseWriter http.ResponseWriter, r render.Render, request *http.Request, params martini.Params) {
		request.ParseForm()
		var url = request.Form.Get("url")

		user, err := core.CurrentUser(request)

		if err {
			r.Error(503)
		} else {
			channel := core.AddFeed(url, user.Id)
			// r.JSON(202, map[string]interface{}{"message": "Processing"})
			http.Redirect(responseWriter, request, "/dashboard/channels/"+strconv.Itoa(channel.Id), http.StatusMovedPermanently)
		}
	})

	m.Post("/api/items/:key/watched", func(responseWriter http.ResponseWriter, r render.Render, request *http.Request, params martini.Params) {
		user, err := core.CurrentUser(request)

		if err {
			r.Error(503)
			return
		}

		item := core.UserWatched(user.Id, params["key"])
		http.Redirect(responseWriter, request, "/dashboard/channels/"+strconv.Itoa(item.ChannelId), http.StatusMovedPermanently)
	})

	http.ListenAndServe(":"+os.Getenv("PORT"), m)
}
