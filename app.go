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

  m.Get("/", func() string {
    return "Hello world!"
  })

  m.Patch("/channel/:id/fetcher", func(params martini.Params, r render.Render) {
    core.FetchChanell(params["id"])
    r.JSON(202, map[string]interface{}{"message": "Processing"})
  })

  http.ListenAndServe(":"+os.Getenv("PORT"), m)
}
