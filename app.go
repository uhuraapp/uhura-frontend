package main

import (
  "code.google.com/p/goauth2/oauth"
  "github.com/codegangsta/martini"
  "github.com/codegangsta/martini-contrib/render"
  "github.com/gorilla/sessions"
  "net/http"
  "os"
  "uhura/core"
  "html/template"
)

var config oauth.Config

var store = sessions.NewCookieStore([]byte("something-very-secret"))

const profileInfoURL = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json"

func main() {
  config := &oauth.Config{
    ClientId:     "933623108791-imtedbq5d1vgfhotj15gq6493jl22j4m.apps.googleusercontent.com",
    ClientSecret: "HjKW82HOb1jT-XyWgPFc9jW8",
    RedirectURL:  "http://127.0.0.1:3002/auth/callback",
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
      },
    },
  }))

  m.Use(martini.Static("assets"))
  m.Use(martini.Static("fonts"))

  m.Get("/", func(r render.Render, req *http.Request) {
    data := make(map[string]interface{})

    r.HTML(200, "home", data)
  })

  m.Get("/dashboard", func(r render.Render, w http.ResponseWriter, request *http.Request) {
    user, err := core.CurrentUser(request)
    if err {
      http.Redirect(w, request, "/authorize", http.StatusFound)
    } else {
      channels := core.GetChannelByUser(user)
      items := core.GetUserItems(user, channels)

      r.HTML(200, "dashboard", map[string]interface{}{"current_user": &user, "channels": channels, "items": items})
    }
  })

  m.Get("/dashboard/podcasts/:id", func(r render.Render, w http.ResponseWriter, req *http.Request) {
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
      http.Redirect(responseWriter, request, "/dashboard", http.StatusMovedPermanently)
    }
  })

  // API

  m.Patch("/api/channels/:id/fetcher", func(r render.Render, params martini.Params) {
    core.FetchChanell(params["id"])
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  m.Post("/api/channels", func(r render.Render, request *http.Request, params martini.Params) {
    request.ParseForm()
    var url = request.Form.Get("url")

    user, err := core.CurrentUser(request)

    if err {
      r.Error(503)
    } else {
      core.AddFeed(url, user.Id)
      r.JSON(202, map[string]interface{}{"message": "Processing"})
    }
  })

  m.Post("/api/items/:key/watched", func(r render.Render, request *http.Request, params martini.Params){
    user, err := core.CurrentUser(request)
    if err {
      r.Error(503)
      return
    }

    core.UserWatched(user.Id, params["key"])
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  http.ListenAndServe(":"+os.Getenv("PORT"), m)
}
