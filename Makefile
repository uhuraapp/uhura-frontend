install:
	go get github.com/kr/godep
	go get code.google.com/p/go-charset/charset
	go get github.com/jteeuwen/go-pkg-rss
	go get code.google.com/p/go-charset/data
	go get github.com/jinzhu/gorm
	go get github.com/lib/pq
	go get code.google.com/p/goauth2/oauth
	go get github.com/codegangsta/martini
	go get github.com/codegangsta/martini-contrib/render

set_env:
	export GOOGLE_CLIENT_ID="933623108791-imtedbq5d1vgfhotj15gq6493jl22j4m.apps.googleusercontent.com"
	export GOOGLE_CLIENT_SECRET="HjKW82HOb1jT-XyWgPFc9jW8"
	export GOOGLE_CALLBACK_URL="http://127.0.0.1:3002/auth/callback"
	export PORT=3002

serve: set_env
	go run app.go

