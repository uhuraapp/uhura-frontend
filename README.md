# Uhura App [![Build Status](https://travis-ci.org/dukex/uhura.png?branch=master)](https://travis-ci.org/dukex/uhura)

Hailing Frequencies Are Open!

Uhura works with **golang** and **emberjs**

![Screenshot](http://uhura.herokuapp.com/assets/uhura-home-0.2.png)

## Development

``` bash
$ go version
go version go1.2
$ psql --version
psql (PostgreSQL) 9.1.9
```

Create a database

```
psql -c "CREATE DATABASE uhura" -h localhost -U $USER
```


``` bash
$ export DATABASE_URL="postgres://$USER@localhost/uhura?sslmode=disable"
$ cd $GOPATH/src
$ git clone git@github.com:dukex/uhura.git github.com/dukex/uhura
$ cd github.com/dukex/uhura
$ make deps
```

Dev env

``` bash
export DATABASE_URL="postgres://$USER@localhost/uhura?sslmode=disable"
export GOOGLE_CLIENT_ID="933623108791-imtedbq5d1vgfhotj15gq6493jl22j4m.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="HjKW82HOb1jT-XyWgPFc9jW8"
export GOOGLE_CALLBACK_URL="http://127.0.0.1:3002/auth/callback/google"
export FACEBOOK_CLIENT_ID="257036014466425"
export FACEBOOK_CLIENT_SECRET="2a7500446b1e3a135b2fd5caf71ef375"
export FACEBOOK_CALLBACK_URL="http://127.0.0.1:3002/auth/callback/facebook"
export PORT=3002
export DEBUG=true
export ENV="development"
export SEARCHBOX_URL="http://localhost:9200"
export MEMCACHEDCLOUD_SERVERS="127.0.0.1:11211"
export SEARCH_INDEX=false
export URL="http://127.0.0.1:3002"
```

``` bash
$ go build
$ ./uhura
```

open [127.0.0.1:3002](http://127.0.0.1:3002)


### Test

```
$ make test
```

or

```
$ make coverage
```

## Sending Email

``` bash
export EMAIL_FROM="you@server.com"
export SMTP_PASSWORD="yourpassword"
export SMTP_HOST="server.com"
export SMTP_SERVER="server.com:587"
```
