package main

import (
  "github.com/codegangsta/martini"
  "github.com/codegangsta/martini-contrib/render"
  "net/http"
  "os"
  "uhura/core"
)

func main() {
  m := martini.Classic()
  m.Use(render.Renderer())

  m.Get("/", func() string {
    return "Hello world!"
  })

  m.Patch("/channels/:id/fetcher", func(r render.Render, params martini.Params) {
    core.FetchChanell(params["id"])
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  m.Post("/channels", func(r render.Render, req *http.Request, params martini.Params) {
    req.ParseForm()
    var url = req.Form.Get("url")

    core.AddFeed(url)
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  http.ListenAndServe(":"+os.Getenv("PORT"), m)
}
