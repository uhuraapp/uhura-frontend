install:
	go get github.com/kr/godep
	godep restore

dev: install
	go get github.com/mattn/goveralls

set_env:
	export GOOGLE_CLIENT_ID="933623108791-imtedbq5d1vgfhotj15gq6493jl22j4m.apps.googleusercontent.com"
	export GOOGLE_CLIENT_SECRET="HjKW82HOb1jT-XyWgPFc9jW8"
	export GOOGLE_CALLBACK_URL="http://127.0.0.1:3002/auth/callback"
	export PORT=3002

serve: set_env
	go run app.go

