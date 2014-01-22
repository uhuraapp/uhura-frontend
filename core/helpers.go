package core

import (
	"html/template"
	"strconv"
)

func UserViewedHelper(arg interface{}) bool {
	viewed := arg.(UserItemsResult).Viewed

	switch str := viewed.(type) {
	case bool:
		return str
	case nil:
		return false
	}
	return false
}

func Pagination(arg interface{}) template.HTML {
	counter := *arg.(*Counter)
	limit := 10
	pages := counter.size / limit

	paginationHtml := "<ul id=\"pagination\">"
	for i := 1; i < pages; i++ {
		if counter.currentPage == i {
			paginationHtml += "<li class=\"current_page\">"
		} else {
			paginationHtml += "<li>"
		}
		paginationHtml += "<a href=\"?page=" + strconv.Itoa(i) + "&channel=" + counter.channel + "\">" + strconv.Itoa(i) + "</a>"
		paginationHtml += "</li>"
	}
	paginationHtml += "</ul>"
	return template.HTML(paginationHtml)
}

func ToHTML(body string) template.HTML {
	return template.HTML(body)
}
