package core

import (
	"bytes"
	"encoding/xml"
	"errors"
	"io"
	"io/ioutil"
	"net/http"

	render "github.com/dukex/uhura/core/helper"
	"github.com/gilliek/go-opml/opml"
)

func OPMLExport(userId string) {
}

func OPMLImport(userId string, content []byte) ([]*ChannelEntity, bool) {
	var root opml.OPML
	r := bytes.NewReader(content)
	d := xml.NewDecoder(r)
	d.CharsetReader = charsetReader

	if d.Decode(&root) != nil {
		return nil, true
	}

	return extractOutlines(root.Outlines())
}

func extractOutlines(outlines []opml.Outline) ([]*ChannelEntity, bool) {
	channels := make([]*ChannelEntity, 0)

	for i, _ := range outlines {
		_channels, ok := extractOutline(outlines[i])
		if ok {
			channels = append(channels, _channels...)
		}
	}

	return channels, (len(channels) > 0)
}

func extractOutline(outline opml.Outline) ([]*ChannelEntity, bool) {
	channels := make([]*ChannelEntity, 0)

	var title, url string

	if title = outline.Title; title == "" {
		title = outline.Text
	}
	if url = outline.URL; url == "" {
		url = outline.XMLURL
	}

	if url != "" {
		channels = append(channels, &ChannelEntity{Url: url, Title: title})
	}

	if len(outline.Outlines) > 1 {
		_channels, ok := extractOutlines(outline.Outlines)
		if ok {
			channels = append(channels, _channels...)
		}
	}

	return channels, (len(channels) > 0)
}

func OPMLImportHandler(userId string, w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(100000)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	m := r.MultipartForm

	if len(m.File["opml-file"]) > 0 {
		file, err := m.File["opml-file"][0].Open()
		defer file.Close()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fileContent, err := ioutil.ReadAll(file)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		channels, ok := OPMLImport(userId, fileContent)

		if !ok {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		render.ResponseJSON(w, 200, map[string]interface{}{"channels": channels})
	} else {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

func charsetReader(charset string, r io.Reader) (io.Reader, error) {
	if charset == "ISO-8859-1" || charset == "iso-8859-1" {
		return r, nil
	}
	return nil, errors.New("Unsupported character set encoding: " + charset)
}
