package main

import (
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/dukex/uhuraapp/api"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	html, _ := template.ParseFiles("dist/index.html")
	r.SetHTMLTemplate(html)

	r.NoRoute(static.Serve("dist"))

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", gin.H{})
	})

	apiRouter := r.Group("/api")
	api.Mount(apiRouter)

	log.Println("Listening...")
	http.ListenAndServe(":"+os.Getenv("PORT"), r)
}
