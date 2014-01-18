// This work is subject to the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// license. Its contents can be found at:
// http://creativecommons.org/publicdomain/zero/1.0/

package xmlx

import "testing"

func TestLoadLocal(t *testing.T) {
	doc := New()

	if err := doc.LoadFile("test.xml", nil); err != nil {
		t.Error(err.Error())
		return
	}

	if len(doc.Root.Children) == 0 {
		t.Errorf("Root node has no children.")
		return
	}
}

func TestWildcard(t *testing.T) {
	doc := New()

	if err := doc.LoadFile("test2.xml", nil); err != nil {
		t.Error(err.Error())
		return
	}

	list := doc.SelectNode("", "xml").SelectNodes("ns", "*")
	if len(list) != 1 {
		t.Errorf("Wrong number of child elements. Expected 1, got %d.", len(list))
		return
	}
}

func TestWildcardRecursive(t *testing.T) {
	doc := New()

	if err := doc.LoadFile("test2.xml", nil); err != nil {
		t.Error(err.Error())
		return
	}

	list := doc.SelectNodesRecursive("ns", "*")

	if len(list) != 7 {
		t.Errorf("Wrong number of child elements. Expected 7, got %d.", len(list))
		return
	}
}

func _TestLoadRemote(t *testing.T) {
	doc := New()

	if err := doc.LoadUri("http://blog.golang.org/feeds/posts/default", nil); err != nil {
		t.Error(err.Error())
		return
	}

	if len(doc.Root.Children) == 0 {
		t.Errorf("Root node has no children.")
		return
	}
}

func TestSave(t *testing.T) {
	doc := New()

	if err := doc.LoadFile("test.xml", nil); err != nil {
		t.Errorf("LoadFile(): %s", err)
		return
	}

	IndentPrefix = "\t"
	if err := doc.SaveFile("test1.xml"); err != nil {
		t.Errorf("SaveFile(): %s", err)
		return
	}
}

func TestNodeSearch(t *testing.T) {
	doc := New()

	if err := doc.LoadFile("test1.xml", nil); err != nil {
		t.Errorf("LoadFile(): %s", err)
		return
	}

	if node := doc.SelectNode("", "item"); node == nil {
		t.Errorf("SelectNode(): No node found.")
		return
	}

	nodes := doc.SelectNodesRecursive("", "item")
	if len(nodes) == 0 {
		t.Errorf("SelectNodes(): no nodes found.")
		return
	}

	ch := doc.SelectNode("", "channel")
	// Test that SelectNodes doesn't accidentally do recursive
	links := ch.SelectNodes("", "link")
	if len(links) != 1 {
		t.Errorf("SelectNodes(): Expected 1, Got %d", len(links))
		return
	}

	// Test SelectNodesRecursive does indeed get all of them
	links = ch.SelectNodesRecursive("", "link")
	if len(links) != 8 {
		t.Errorf("SelectNodesRecursive(): Expected 8, Got %d", len(links))
		return
	}
}

type Image struct {
	Title       string `xml:"title"`
	Url         string `xml:"url"`
	Link        string `xml:"link"`
	Description string `xml:"description"`
	Width       int    `xml:"width"`
	Height      int    `xml:"height"`
}

func TestUnmarshal(t *testing.T) {
	doc := New()
	err := doc.LoadFile("test1.xml", nil)

	if err != nil {
		t.Errorf("LoadFile(): %s", err)
		return
	}

	node := doc.SelectNode("", "image")
	if node == nil {
		t.Errorf("SelectNode(): No node found.")
		return
	}

	var img Image
	if err = node.Unmarshal(&img); err != nil {
		t.Errorf("Unmarshal(): %s", err)
		return
	}

	if img.Title != "WriteTheWeb" {
		t.Errorf("Image.Title has incorrect value. Got '%s', expected 'WriteTheWeb'.", img.Title)
		return
	}
}

func TestStringNamespaces(t *testing.T) {
	doc := New()
	err := doc.LoadFile("test3.xml", nil)

	if err != nil {
		t.Errorf("LoadFile(): %s", err)
		return
	}

	expected := `<root xmlns:foo="http:/example.org/foo">
  <child foo:bar="1">
    <grandchild xmlns:foo="">
      <great-grandchild bar="2">&#xA;      </great-grandchild>
    </grandchild>
  </child>
</root>
`

	if got := doc.Root.String(); got != expected {
		t.Fatalf("expected: %s\ngot: %s\n", expected, got)
	}
}

func TestStringEscaping(t *testing.T) {
	doc := New()
	err := doc.LoadFile("test4.xml", nil)

	if err != nil {
		t.Errorf("LoadFile(): %s", err)
		return
	}

	expected := `<body>  &lt;https://example.com/file/fm/SU0vRk0xLzIwMTMwOTEwLzA1MDA0MS5ybXdhdGVzdEByZXV0ZXJzLmNvbTEzNzg4NDU1OTk4OTA/Screen%20Shot%202013-09-10%20at%2021.33.54.png&gt; File Attachment:-Screen Shot 2013-09-10 at 21.33.54.png  </body>
`

	if got := doc.Root.String(); got != expected {
		t.Fatalf("expected: %s\ngot: %s\n", expected, got)
	}
}

func TestElementNodeValueFetch(t *testing.T) {
	data := `<car><color>
	r<cool />
	ed</color><brand>BMW</brand><price>50
	<cheap />.25</price><count>6
	<small />2
	</count><available>
	Tr
	<found />
	ue</available></car>`
	doc := New()

	if err := doc.LoadString(data, nil); nil != err {
		t.Fatalf("LoadString(): %s", err)
	}

	carN := doc.SelectNode("", "car")
	if v := carN.S("", "brand"); v != "BMW" {
		t.Errorf("Failed to get brand as string, got: '%s', wanted: 'BMW'", v)
	}
	if v := carN.S("", "color"); v != "red" {
		t.Errorf("Failed to get color as string, got: '%s', wanted: 'red'", v)
	}

	if v := carN.I("", "count"); v != 62 {
		t.Errorf("Failed to get count using I, got: %v, wanted: 62", v)
	}
	if v := carN.I8("", "count"); v != 62 {
		t.Errorf("Failed to get count using I8, got: %v, wanted: 62", v)
	}
	if v := carN.I16("", "count"); v != 62 {
		t.Errorf("Failed to get count using I16, got: %v, wanted: 62", v)
	}
	if v := carN.I32("", "count"); v != 62 {
		t.Errorf("Failed to get count using I32, got: %v, wanted: 62", v)
	}
	if v := carN.I64("", "count"); v != 62 {
		t.Errorf("Failed to get count using I64, got: %v, wanted: 62", v)
	}
	if v := carN.U("", "count"); v != 62 {
		t.Errorf("Failed to get count using U, got: %v, wanted: 62", v)
	}
	if v := carN.U8("", "count"); v != 62 {
		t.Errorf("Failed to get count using U8, got: %v, wanted: 62", v)
	}
	if v := carN.U16("", "count"); v != 62 {
		t.Errorf("Failed to get count using U16, got: %v, wanted: 62", v)
	}
	if v := carN.U32("", "count"); v != 62 {
		t.Errorf("Failed to get count using U32, got: %v, wanted: 62", v)
	}
	if v := carN.U64("", "count"); v != 62 {
		t.Errorf("Failed to get count using U64, got: %v, wanted: 62", v)
	}

	if v := carN.F32("", "price"); v != 50.25 {
		t.Errorf("Failed to get price using F32, got: %v, wanted: 50.25", v)
	}
	if v := carN.F64("", "price"); v != 50.25 {
		t.Errorf("Failed to get price using F64, got: %v, wanted: 50.25", v)
	}

	if v := carN.B("", "available"); v != true {
		t.Errorf("Failed to get availability using B, got: %v, wanted: true", v)
	}
}
