// Copyright 2014 The project AUTHORS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*
Package opml provides all the required structures and functions for parsing
OPML files, as defined by the specification of the OPML format:

	[OPML 1.0] http://dev.opml.org/spec1.html
	[OPML 2.0] http://dev.opml.org/spec2.html

It is able to parse both, OPML 1.0 and OPML 2.0, files.
*/
package opml

import (
	"encoding/xml"
	"io/ioutil"
	"net/http"
)

// OPML is the root node of an OPML document. It only has a single required
// attribute: the version.
type OPML struct {
	XMLName xml.Name `xml:"opml"`
	Version string   `xml:"version,attr"`
	Head    Head     `xml:"head"`
	Body    Body     `xml:"body"`
}

// Head holds some meta information about the document.
type Head struct {
	Title           string `xml:"title"`
	DateCreated     string `xml:"dateCreated,omitempty"`
	DateModified    string `xml:"dateModified,omitempty"`
	OwnerName       string `xml:"ownerName,omitempty"`
	OwnerEmail      string `xml:"ownerEmail,omitempty"`
	OwnerID         string `xml:"ownerId,omitempty"`
	Docs            string `xml:"docs,omitempty"`
	ExpansionState  string `xml:"expansionState,omitempty"`
	VertScrollState string `xml:"vertScrollState,omitempty"`
	WindowTop       string `xml:"windowTop,omitempty"`
	WindowBottom    string `xml:"windowBottom,omitempty"`
	WindowLeft      string `xml:"windowLeft,omitempty"`
	WindowRight     string `xml:"windowRight,omitempty"`
}

// Body is the parent structure of all outlines.
type Body struct {
	Outlines []Outline `xml:"outline"`
}

// Outline holds all information about an outline.
type Outline struct {
	Outlines     []Outline `xml:"outline"`
	Text         string    `xml:"text,attr"`
	Type         string    `xml:"type,attr,omitempty"`
	IsComment    string    `xml:"isComment,attr,omitempty"`
	IsBreakpoint string    `xml:"isBreakpoint,attr,omitempty"`
	Created      string    `xml:"created,attr,omitempty"`
	Category     string    `xml:"category,attr,omitempty"`
	XMLURL       string    `xml:"xmlUrl,attr,omitempty"`
	HTMLURL      string    `xml:"htmlUrl,attr,omitempty"`
	URL          string    `xml:"url,attr,omitempty"`
	Language     string    `xml:"language,attr,omitempty"`
	Title        string    `xml:"title,attr,omitempty"`
	Version      string    `xml:"version,attr,omitempty"`
	Description  string    `xml:"description,attr,omitempty"`
}

// NewOPML creates a new OPML structure from a slice of bytes.
func NewOPML(b []byte) (*OPML, error) {
	var root OPML
	err := xml.Unmarshal(b, &root)
	if err != nil {
		return nil, err
	}

	return &root, nil
}

// NewOPMLFromURL creates a new OPML structure from an URL.
func NewOPMLFromURL(url string) (*OPML, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return NewOPML(b)
}

// NewOPMLFromFile creates a new OPML structure from a file.
func NewOPMLFromFile(filePath string) (*OPML, error) {
	b, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil, err
	}

	return NewOPML(b)
}

// Outlines returns a slice of the outlines.
func (doc OPML) Outlines() []Outline {
	return doc.Body.Outlines
}

// XML exports the OPML document to a XML string.
func (doc OPML) XML() (string, error) {
	b, err := xml.MarshalIndent(doc, "", "\t")
	return xml.Header + string(b), err
}
