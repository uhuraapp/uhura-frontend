# Uhura [![Build Status](https://travis-ci.org/dukex/uhura.png?branch=master)](https://travis-ci.org/dukex/uhura)

Hailing Frequencies Are Open!

![Screenshot](http://uhura.herokuapp.com/assets/uhura-home.png)

## Development

```
$ export DATABASE_URL="postgres://root@localhost/uhura?sslmode=disable"
$ cd $GOPATH/src
$ git clone git@github.com:dukex/uhura.git github.com/dukex/uhura
$ cd github.com/dukex/uhura
$ make install
$ make serve # set env and up server
```

open [127.0.0.1:3002](http://127.0.0.1:3002)
