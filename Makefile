install:
	go get github.com/kr/godep
	godep restore

dev: install
	go get github.com/mattn/goveralls

coverage:
	go test -coverprofile=coverage.out ./core
	go tool cover -html=coverage.out
	rm coverage.out
