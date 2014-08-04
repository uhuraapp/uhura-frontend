package core

import (
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gorilla/sessions"
)

var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_SECRET")))

func ApiNative(fn func(string, http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		p, _ := url.ParseQuery(r.URL.RawQuery)
		token := p.Get("token")
		log.Println(token)
		log.Println(p)

		var userID []string
		err := database.Table("users").Where("api_token = ?", token).Pluck("id", &userID).Error

		log.Println(userID)

		if err == nil && len(userID) > 0 {
			fn(userID[0], w, r)
		} else {
			w.WriteHeader(403)
		}
	}
}

func BotSupport(fn func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		if isBot(r) {
			session, _ := store.Get(r, "_session")
			session.Values["user_id"] = "bot"
			session.Save(r, w)
		}

		fn(w, r)
	}
}

func isBot(r *http.Request) bool {
	userAgent := strings.ToLower(r.UserAgent())

	return strings.Contains(userAgent, "structureddata") ||
		strings.Contains(userAgent, "flipboard.com") ||
		strings.Contains(userAgent, "newsme") ||
		strings.Contains(userAgent, "bot") ||
		strings.Contains(userAgent, "slurp") ||
		strings.Contains(userAgent, "facebookexternalhit")
}
