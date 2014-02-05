install:
	go get github.com/kr/godep
	godep restore
	go get

dev: install
	go test

coverage:
	go test -coverprofile=coverage.out ./core
	go tool cover -html=coverage.out
	rm coverage.out
