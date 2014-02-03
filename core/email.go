package core

import (
	"bytes"
	"github.com/jordan-wright/email"
	"github.com/rakyll/coop"
	"html/template"
	"io/ioutil"
	"net/smtp"
	"os"
	"time"
)

const (
	TemplateEmailPath = "templates/emails"
)

var (
	FROM          string
	SMTP_SERVER   string
	SMTP_HOST     string
	SMTP_PASSWORD string
)

func init() {
	FROM = os.Getenv("EMAIL_FROM")
	SMTP_SERVER = os.Getenv("SMTP_SERVER")
	SMTP_HOST = os.Getenv("SMTP_HOST")
	SMTP_PASSWORD = os.Getenv("SMTP_PASSWORD")
}

func render(name string, data interface{}) []byte {
	content, _ := ioutil.ReadFile(TemplateEmailPath + "/welcome.tmpl")
	t, _ := template.New("welcome").Parse(string(content))
	buff := bytes.NewBufferString("")
	t.Execute(buff, map[string]interface{}{"data": data})
	return buff.Bytes()
}

func WelcomeMail(user *User) {
	coop.After(15*time.Minute, func() {
		err := sendMail([]string{user.Email}, "Welcome to Uhura", render("welcome", user))
		if err == nil {
			database.Model(user).Update("WelcomeMail", true)
		}
	})
}

func sendMail(to []string, subject string, body []byte) error {
	e := email.NewEmail()
	e.From = FROM
	e.To = to
	e.Subject = subject
	e.Text = body
	return e.Send(SMTP_SERVER, smtp.PlainAuth("", FROM, SMTP_PASSWORD, SMTP_HOST))
}
