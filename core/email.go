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
	FROM              = "dukekhaos@gmail.com"
	TemplateEmailPath = "templates/emails"
)

func render(name string, data interface{}) []byte {
	content, _ := ioutil.ReadFile(TemplateEmailPath + "/welcome.tmpl")
	t, _ := template.New("welcome").Parse(string(content))
	buff := bytes.NewBufferString("")
	t.Execute(buff, map[string]interface{}{"data": data})
	return buff.Bytes()
}

func WelcomeMail(user *User) {
	coop.After(32*time.Minute, func() {
		e := email.NewEmail()
		e.From = FROM
		e.To = []string{user.Email}
		e.Subject = "Welcome to Uhura"
		e.Text = render("welcome", user)
		e.Send("smtp.gmail.com:587", smtp.PlainAuth("", FROM, os.Getenv("SMTP_PASSWORD"), "smtp.gmail.com"))
		database.Model(user).Update("WelcomeMail", true)
	})
}
