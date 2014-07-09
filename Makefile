ASSETS_DIR=public/assets

build: clean deps_save test assets

deploy: deps_save test assets
	git push heroku master

$(ASSETS_DIR)/app.js:
	grunt emberTemplates concat:app

$(ASSETS_DIR)/vendor.js:
	grunt concat:vendor

$(ASSETS_DIR)/app.min.js: $(ASSETS_DIR)/app.js
	grunt uglify:app

$(ASSETS_DIR)/vendor.min.js: $(ASSETS_DIR)/vendor.js
	grunt uglify:vendor

$(ASSETS_DIR)/*.css:
	ENV=production grunt sass:app

VERSION:
	echo '$(shell git rev-parse --abbrev-ref HEAD)-$(shell git rev-parse HEAD)' > VERSION

clean:
	rm -f $(ASSETS_DIR)/*.js $(ASSETS_DIR)/*.css VERSION

deps:
	go get github.com/pilu/fresh
	go get github.com/kr/godep
	godep restore
	go get

deps_save:
	godep save

test:
	go test

assets: $(ASSETS_DIR)/app.min.js $(ASSETS_DIR)/vendor.min.js $(ASSETS_DIR)/*.css VERSION

coverage:
	go test -coverprofile=coverage.out ./core
	go tool cover -html=coverage.out
	rm coverage.out

dev:
	memcached -vvv &
	grunt --force &
	fresh

