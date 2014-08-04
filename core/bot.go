package core

import (
	"net/http"
	"strings"
)

func isABotRequest(r *http.Request) bool {
	userAgent := strings.ToLower(r.UserAgent())

	return strings.Contains(userAgent, "structureddata") ||
		strings.Contains(userAgent, "flipboard.com") ||
		strings.Contains(userAgent, "newsme") ||
		strings.Contains(userAgent, "bot") ||
		strings.Contains(userAgent, "slurp") ||
		strings.Contains(userAgent, "facebookexternalhit")
}

func isABotUser(userId string) bool {
	return userId == "bot"
}
