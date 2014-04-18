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


prepare:
	make build_assets
	make save_deps

save_deps:
	godep save

new_version:
	echo '$(shell git rev-parse --abbrev-ref HEAD)-$(shell git rev-parse HEAD)' > VERSION

build_assets:	new_version
	ENV=production grunt emberTemplates concat:vendor uglify:vendor concat:app uglify:app sass:app
	rm tmp/assets/*.js

