package core

import (
	"bytes"
	"html/template"
	"io/ioutil"
	"log"
	"net/smtp"
	"os"
	"strconv"
	"time"

	"github.com/jordan-wright/email"
	// "github.com/rakyll/coop"
)

const (
	TemplateEmailPath = "views/emails"
)

var (
	FROM                string
	SMTP_SERVER         string
	SMTP_HOST           string
	SMTP_PASSWORD       string
	DELAY_WELCOME_EMAIL time.Duration
)

func init() {
	FROM = os.Getenv("EMAIL_FROM")
	SMTP_SERVER = os.Getenv("SMTP_SERVER")
	SMTP_HOST = os.Getenv("SMTP_HOST")
	SMTP_PASSWORD = os.Getenv("SMTP_PASSWORD")
	delay, _ := strconv.Atoi(os.Getenv("DELAY_WELCOME"))
	DELAY_WELCOME_EMAIL = time.Duration(delay) * time.Minute
}

func WelcomeMail(user *User) {
	//coop.After(DELAY_WELCOME_EMAIL, func() {
	err := sendMail([]string{user.Email}, "dukekhaos@gmail.com", "Welcome to Uhura", renderEmail("welcome", user), false)
	if err == nil {
		database.Model(user).Update("WelcomeMail", true)
	}
	//})
}

func ResetPasswordEmail(user *User) {
	token := user.RememberToken
	changePasswordUrl := UrlTo("change_password/"+token, map[string]string{})
	to := []string{user.Email}
	subject := "Uhura Login - Password Reset"
	body := renderEmail("reset_password", map[string]interface{}{
		"user": user,
		"url":  changePasswordUrl,
	})

	go sendMail(to, "noreply@uhuraapp.com", subject, body, true)
}

func renderEmail(name string, data interface{}) []byte {
	content, err := ioutil.ReadFile(TemplateEmailPath + "/" + name + ".tmpl")
	if err != nil {
		panic(err)
	}
	t, err := template.New(name).Parse(string(content))
	if err != nil {
		panic(err)
	}
	buff := bytes.NewBufferString("")
	t.Execute(buff, map[string]interface{}{"data": data})
	return buff.Bytes()
}

func sendMail(to []string, from string, subject string, body []byte, useHtml bool) error {
	log.Println("Sending '"+subject+"' to", to)
	log.Println(string(body[:]))

	e := email.NewEmail()
	e.From = from
	e.To = to
	e.Subject = subject
	if useHtml {
		e.HTML = body
	} else {
		e.Text = body
	}
	err := e.Send(SMTP_SERVER, smtp.PlainAuth("", from, SMTP_PASSWORD, SMTP_HOST))
	log.Println("Error", err)
	return err
}
