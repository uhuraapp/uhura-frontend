# Login2

## USAGE

``` bash
$ export SESSION_SECRET="secret session key"
```

``` go
package main

import (
  "os"
  "net/http"

  auth "github.com/dukex/login2"
  "github.com/gorilla/mux"
)

var builder auth.Builder

func setupUser(provider string, user *auth.User, rawResponse *http.Response){
  ... Find and Create the User ...
}

func configAuth() {
  providers := make([]*auth.Provider, 0)

  providers = append(providers, &auth.Provider{
    RedirectURL: os.Getenv("GOOGLE_CALLBACK_URL"),
    AuthURL:     "https://accounts.google.com/o/oauth2/auth",
    TokenURL:    "https://accounts.google.com/o/oauth2/token",
    Name:        "google",
    Key:         os.Getenv("GOOGLE_CLIENT_ID"),
    Secret:      os.Getenv("GOOGLE_CLIENT_SECRET"),
    Scope:       "https://www.googleapis.com/auth/userinfo.email",
    UserInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
  })

  builder = auth.NewBuilder(providers, setupUser)
}


func main(){
  configAuth()

  // HTTP Server
  r := mux.NewRouter()

  // Auth Router
  builder.Router(r)


  http.Handle("/", r)

  server := &http.Server{
    Addr:           ":3000",
    Handler:        r,
    ReadTimeout:    10 * time.Second,
    WriteTimeout:   10 * time.Second,
    MaxHeaderBytes: 1 << 20,
  }

  fmt.Println("Starting server on 3000")
  log.Fatal(server.ListenAndServe())
}
```

Now send user to [127.0.0.1:3000/auth/google](http://127.0.0.1:3000/auth/google)

