package api

import (
	"github.com/dukex/uhuraapp/api/middleware"
	"github.com/dukex/uhuraapp/api/subscriptions"
	"github.com/gin-gonic/gin"
)

func Mount(_r *gin.RouterGroup) {
	r := _r.Group("/v2", middleware.Authentication())
	{
		r.GET("/subscriptions", subscriptions.Get)
	}
}
