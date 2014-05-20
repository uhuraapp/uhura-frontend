package helper

import (
	. "github.com/fiam/gounidecode/unidecode"
	"regexp"
	"strings"
)

type Uriable struct {
}

func (u *Uriable) MakeUri(txt string) string {
	re := regexp.MustCompile(`\W`)
	uri := Unidecode(txt)
	uri = re.ReplaceAllString(uri, "")
	uri = strings.ToLower(uri)
	return uri
}
