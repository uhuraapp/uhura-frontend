deps:
	go get github.com/kr/godep
	godep restore
	go get

test: deps
	go test

coverage:
	go test -coverprofile=coverage.out ./core
	go tool cover -html=coverage.out
	rm coverage.out

serve:
	go build
	./uhura

build_assets:
	ENV=production grunt emberTemplates concat:vendor uglify:vendor concat:app uglify:app sass:app
