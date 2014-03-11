package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/dukex/uhura/core"
)

var (
	LandingHTML string
	AppHTML     string
	SignUpHTML  string
	SignInHTML  string
)

// Handlers
func LandingHandler(w http.ResponseWriter, r *http.Request) {
	if ENV == "development" {
		buildLandingPage()
	}

	if loginBuilder.CurrentUser(r) != "" {
		http.Redirect(w, r, "/app/", 302)
	} else {
		fmt.Fprintf(w, LandingHTML)
	}
}

func EnterHandler(w http.ResponseWriter, request *http.Request) {
	email := request.FormValue("email")
	exists := core.UserExists(email)
	if exists {
		http.Redirect(w, request, "/login", 302)
	} else {
		fmt.Fprintf(w, buildSignUpPage(email))
	}
}

func AppHandler(userId string, w http.ResponseWriter, request *http.Request) {
	if ENV == "development" {
		buildAppPage()
	}

	fmt.Fprintf(w, AppHTML)
}

func LoginHandler(w http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(w, buildSignInPage())
}

// helpers

func buildLandingPage() {
	itb, _ := ioutil.ReadFile("./views/index.html")
	LandingHTML = string(itb[:])
	LandingHTML = strings.Replace(LandingHTML, "<% URL %>", URL, -1)
	LandingHTML = strings.Replace(LandingHTML, "<% ASSETS_VERSION %>", ASSETS_VERSION, -1)
}

func buildAppPage() {
	itb, _ := ioutil.ReadFile("./views/app.html")
	AppHTML = string(itb[:])
	AppHTML = strings.Replace(AppHTML, "<% URL %>", URL, -1)
	AppHTML = strings.Replace(AppHTML, "<% ASSETS_VERSION %>", ASSETS_VERSION, -1)
}

func buildSignUpPage(email string) string {
	itb, _ := ioutil.ReadFile("./views/users/sign_up.html")

	SignUpHTML = string(itb[:])
	SignUpHTML = strings.Replace(SignUpHTML, "<% EMAIL %>", email, -1)
	SignUpHTML = strings.Replace(SignUpHTML, "<% URL %>", URL, -1)
	SignUpHTML = strings.Replace(SignUpHTML, "<% ASSETS_VERSION %>", ASSETS_VERSION, -1)

	return SignUpHTML
}

func buildSignInPage() string {
	itb, _ := ioutil.ReadFile("./views/users/sign_in.html")
	SignInHTML = string(itb[:])
	SignInHTML = strings.Replace(SignInHTML, "<% URL %>", URL, -1)
	SignInHTML = strings.Replace(SignInHTML, "<% ASSETS_VERSION %>", ASSETS_VERSION, -1)

	return SignInHTML
}
