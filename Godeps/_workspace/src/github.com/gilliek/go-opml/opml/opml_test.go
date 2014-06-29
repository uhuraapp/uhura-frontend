// Copyright 2014 The project AUTHORS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package opml

import (
	"io"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
)

func TestXML(t *testing.T) {
	doc := OPML{
		Version: "2.0",
		Head: Head{
			Title:        "Foobar",
			DateCreated:  "Sun, 06 Jul 2008 21:02:00 GMT",
			DateModified: "Sun, 06 Jul 2008 21:02:00 GMT",
			OwnerName:    "Kevin",
			OwnerEmail:   "foo@bar.com",
		},
		Body: Body{
			Outlines: []Outline{
				Outline{
					Text: "Technology News",
					Outlines: []Outline{
						Outline{
							Text:    "Go News",
							Type:    "link",
							URL:     "http://blog.golang.org/feed.atom",
							Created: "Thu, 12 Sep 2003 23:35:52 GMT",
						},
					},
				},
			},
		},
	}

	expectedOPML := `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
	<head>
		<title>Foobar</title>
		<dateCreated>Sun, 06 Jul 2008 21:02:00 GMT</dateCreated>
		<dateModified>Sun, 06 Jul 2008 21:02:00 GMT</dateModified>
		<ownerName>Kevin</ownerName>
		<ownerEmail>foo@bar.com</ownerEmail>
	</head>
	<body>
		<outline text="Technology News">
			<outline text="Go News" type="link" created="Thu, 12 Sep 2003 23:35:52 GMT" url="http://blog.golang.org/feed.atom"></outline>
		</outline>
	</body>
</opml>`

	opml, err := doc.XML()
	if err != nil {
		t.Fatal(err)
	}

	if opml != expectedOPML {
		t.Errorf("Invalid generated OPML: expected\n\n%s\n\nfound\n\n%s",
			expectedOPML, opml)
	}
}

func TestNewOPMLFromURL(t *testing.T) {
	testNewOPMLFromURLSuccess(t)
	testNewOPMLFromURLFailure(t)
}

func TestNewOPMLFromFile(t *testing.T) {
	testNewOPMLFromFileSuccess(t)
	testNewOPMLFromFileFailure(t)
}

func testNewOPMLFromURLSuccess(t *testing.T) {
	handler := func(w http.ResponseWriter, r *http.Request) {
		b, err := ioutil.ReadFile(
			os.Getenv("GOPATH") + "/src/github.com/gilliek/go-opml/testdata/feeds.xml")
		if err != nil {
			t.Fatal(err)
		}
		io.WriteString(w, string(b))
	}

	server := httptest.NewServer(http.HandlerFunc(handler))
	defer server.Close()

	doc, err := NewOPMLFromURL(server.URL)
	if err != nil {
		t.Fatal(err)
	}

	testDoc(t, doc)
}

func testNewOPMLFromURLFailure(t *testing.T) {
	_, err := NewOPMLFromURL("1.2.3.4")
	if err == nil {
		t.Error("Expected failure!")
	}
}

func testNewOPMLFromFileSuccess(t *testing.T) {
	doc, err := NewOPMLFromFile(
		os.Getenv("GOPATH") + "/src/github.com/gilliek/go-opml/testdata/feeds.xml")
	if err != nil {
		t.Fatal(err)
	}

	testDoc(t, doc)
}

func testNewOPMLFromFileFailure(t *testing.T) {
	_, err := NewOPMLFromFile(
		os.Getenv("GOPATH") + "/src/github.com/gilliek/go-opml/testdata/does_not_exist.xml")
	if err == nil {
		t.Error("Expected failure!")
	}
}

func testDoc(t *testing.T, doc *OPML) {
	version := doc.Version
	if version != "1.0" {
		t.Errorf("Wrong OPML version: expected '1.0', found '%s'", version)
	}

	title := doc.Head.Title
	if title != "Foobar" {
		t.Errorf("Wrong title version: expected 'Foobar', found '%s'", title)
	}

	outlines := doc.Outlines()
	if len(outlines) != 1 {
		t.Fatalf("Invalid number of outlines: expected 1, found %d", len(outlines))
	}

	if outlines[0].Text != "foo" {
		t.Errorf("Wrong outline text: expected 'foo', found '%s'", outlines[0].Text)
	}

	if outlines[0].Title != "bar" {
		t.Errorf("Wrong outline title: expected 'foo', found '%s'", outlines[0].Title)
	}

	if outlines[0].Type != "rss" {
		t.Errorf("Wrong outline type: expected 'rss', found '%s'", outlines[0].Type)
	}

	if outlines[0].XMLURL != "http://www.gilliek.ch/feeds" {
		t.Errorf("Wrong outline XML URL: expected 'http://www.gilliek.ch/feeds', found '%s'",
			outlines[0].XMLURL)
	}

	if outlines[0].HTMLURL != "http://www.gilliek.ch" {
		t.Errorf("Wrong outline HTML URL: expected 'http://www.gilliek.ch', found '%s'",
			outlines[0].HTMLURL)
	}

}
