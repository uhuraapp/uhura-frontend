package sitemap

import (
	"fmt"
	"testing"
	"time"
)

func TestItem(t *testing.T) {
	item := &Item{Loc:"http://hostye.com/", LastMod:time.Now(), Changefreq:"weekly", Priority:0.5}
	fmt.Printf("%+v", item)
}

func TestSiteMap(t *testing.T) {
	ds := []string{"hostye.com", "google.com", "yahoo.com", "ostree.org", "oschina.net"}
	items := make([]*Item, len(ds))
	for i, d := range ds {
		items[i] = &Item{Loc:fmt.Sprintf("http://%s/", d), LastMod:time.Now(), Changefreq:"weekly", Priority:0.5}
	}
	SiteMap("/home/joe/images/1.xml.gz",items)
}

func TestSiteMapIndex(t *testing.T) {
	SiteMapIndex("/home/joe/images","/home/joe/images/sitemap.xml","http://roseo.net/")
}
