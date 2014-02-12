package core

import (
	"bytes"
	"github.com/jordan-wright/email"
	"github.com/rakyll/coop"
	"html/template"
	"io/ioutil"
	"net/smtp"
	"os"
	"strconv"
	"time"
)

const (
	TemplateEmailPath = "templates/emails"
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

func render(name string, data interface{}) []byte {
	content, _ := ioutil.ReadFile(TemplateEmailPath + "/" + name + ".tmpl")
	t, _ := template.New(name).Parse(string(content))
	buff := bytes.NewBufferString("")
	t.Execute(buff, map[string]interface{}{"data": data})
	return buff.Bytes()
}

func WelcomeMail(user *User) {
	coop.After(5*time.Second, func() {
		err := sendMail([]string{user.Email}, "Welcome to Uhura", render("welcome", user))
		if err == nil {
			database.Model(user).Update("WelcomeMail", true)
		}
	})
}

func ErrorMail(err interface{}, stack []byte) {
	sendMail([]string{FROM}, "[uhura err] "+err.(string), render("error", string(stack)))
}

func sendMail(to []string, subject string, body []byte) error {
	e := email.NewEmail()
	e.From = FROM
	e.To = to
	e.Subject = subject
	e.Text = body
	return e.Send(SMTP_SERVER, smtp.PlainAuth("", FROM, SMTP_PASSWORD, SMTP_HOST))
}
