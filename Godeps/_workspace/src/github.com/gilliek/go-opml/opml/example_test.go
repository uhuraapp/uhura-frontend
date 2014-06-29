// Copyright 2014 The project AUTHORS. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package opml_test

import (
	"fmt"
	"log"

	"github.com/gilliek/go-opml/opml"
)

func ExampleNewOPMLFromFile() {
	doc, err := opml.NewOPMLFromFile("path/to/file.xml")
	if err != nil {
		log.Fatal(err)
	}

	xml, _ := doc.XML()
	fmt.Println(xml)
}

func ExampleOPML_XML() {
	doc, err := opml.NewOPMLFromURL("http://www.example.com/file.xml")
	if err != nil {
		log.Fatal(err)
	}

	xml, _ := doc.XML()
	fmt.Println(xml)
}
