package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/dukex/uhura/core"
)

var (
	EMAIL string
	PAGES map[string][]byte
)

func init() {
	PAGES = make(map[string][]byte, 0)
}

// Handlers
func LandingHandler(w http.ResponseWriter, r *http.Request) {
	if loginBuilder.CurrentUser(r) != "" {
		http.Redirect(w, r, "/app/", 302)
	} else {
		fmt.Fprintf(w, BuildPage("index"))
	}
}

func EnterHandler(w http.ResponseWriter, request *http.Request) {
	EMAIL = request.FormValue("email")
	exists := core.UserExists(EMAIL)
	if exists {
		http.Redirect(w, request, "/login?user=exists", 302)
	} else {
		fmt.Fprintf(w, BuildPage("users/sign_up"))
	}
}

func AppHandler(userId string, w http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(w, BuildPage("app"))
}

func LoginHandler(w http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(w, BuildPage("users/sign_in"))
}

// helpers

func BuildPage(page string) string {
	if ENV == "development" {
		buildPageFromFile(page)
	}

	var pageBytes []byte
	pageBytes, ok := PAGES[page]

	if !ok {
		pageBytes, _ = buildPageFromFile(page)
	}

	pageHTML := string(pageBytes[:])
	pageHTML = strings.Replace(pageHTML, "<% EMAIL %>", EMAIL, -1)
	pageHTML = strings.Replace(pageHTML, "<% URL %>", URL, -1)
	pageHTML = strings.Replace(pageHTML, "<% ASSETS_VERSION %>", ASSETS_VERSION, -1)

	return pageHTML
}

func buildPageFromFile(page string) ([]byte, error) {
	pBytes, err := ioutil.ReadFile("./views/" + page + ".html")
	PAGES[page] = pBytes
	return pBytes, err
}
