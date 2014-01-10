package main

import (
  "code.google.com/p/goauth2/oauth"
  "encoding/json"
  "github.com/codegangsta/martini"
  "github.com/codegangsta/martini-contrib/render"
  "github.com/gorilla/sessions"
  "net/http"
  "os"
  "uhura/core"
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
  }))

  m.Use(martini.Static("assets"))
  m.Use(martini.Static("fonts"))

  m.Get("/", func(r render.Render, req *http.Request) {
    data := make(map[string]interface{})

    r.HTML(200, "home", data)
  })

  m.Get("/dashboard", func(r render.Render, w http.ResponseWriter, req *http.Request) {
    session, _ := store.Get(req, "session")
    userId, ok := session.Values["user_id"].(string)
    if ok {
      user := core.GetUser(userId)
      chanell := core.GetChannelByUser(user)
      r.HTML(200, "dashboard", map[string]interface{}{"current_user": &user, "channels": chanell})
    } else {
      http.Redirect(w, req, "/authorize", http.StatusFound)
    }
  })

  m.Get("/dashboard/podcasts/:id", func(r render.Render, w http.ResponseWriter, req *http.Request) {
  })

  m.Get("/authorize", func(w http.ResponseWriter, r *http.Request) {
    url := config.AuthCodeURL("")
    http.Redirect(w, r, url, http.StatusFound)
  })

  m.Get("/auth/callback", func(w http.ResponseWriter, r *http.Request) {
    var tempUser core.TempUser
    code := r.FormValue("code")
    t := &oauth.Transport{Config: config}
    t.Exchange(code)
    resp, _ := t.Client().Get(profileInfoURL)
    defer resp.Body.Close()

    decoder := json.NewDecoder(resp.Body)
    err := decoder.Decode(&tempUser)
    if err != nil {
      panic(err)
    }

    user := core.CreateUser(tempUser)

    session, _ := store.Get(r, "session")
    session.Values["user_id"] = user.IdString()

    session.Save(r, w)
    http.Redirect(w, r, "/dashboard", http.StatusMovedPermanently)
  })

  // API

  m.Patch("/api/channels/:id/fetcher", func(r render.Render, params martini.Params) {
    core.FetchChanell(params["id"])
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  m.Post("/api/channels", func(r render.Render, req *http.Request, params martini.Params) {
    req.ParseForm()
    var url = req.Form.Get("url")

    core.AddFeed(url)
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  http.ListenAndServe(":"+os.Getenv("PORT"), m)
}
