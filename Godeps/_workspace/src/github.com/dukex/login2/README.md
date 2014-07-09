# Login2

Easy way to sign in and sign up users using oauth and email/password


``` go
var loginBuilder *login2.Builder
loginBuilder = login2.NewBuilder()
```

## Config

To config your oauth provider use ```NewProvider``` func

``` go
provider := &login2.Provider{
  RedirectURL: os.Getenv("GOOGLE_CALLBACK_URL"),
  AuthURL:     "https://accounts.google.com/o/oauth2/auth",
  TokenURL:    "https://accounts.google.com/o/oauth2/token",
  Name:        "google",
  Key:         os.Getenv("GOOGLE_CLIENT_ID"),
  Secret:      os.Getenv("GOOGLE_CLIENT_SECRET"),
  Scope:       "https://www.googleapis.com/auth/userinfo.email",
  UserInfoURL: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
}

loginBuilder.NewProvider(provider)
```

The func ```NewProviders``` accept a ```Provider``` array


``` go
providers := make([]*login2.Provider, 0)

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

loginBuilder.NewProviders(providers)

```

Login2 works with callback to be a agnostic way to sign in and sign up users, ```login2.Builder``` accept 4 callbacks

```  go
loginBuilder.UserSetupFn = func(provider string, user *auth.User, rawResponde *http.Response) (int64, error)  {
}

loginBuilder.UserCreateFn = func(email string, password string, request *http.Request) (int64, error) {
}

loginBuilder.UserIdByEmail = func(email string) (int64, error) {
}

loginBuilder.UserPasswordByEmail = func(email string) (string, error) {
}

loginBuilder.UserResetPasswordFn = func(token string, email string) {
}
```


To http handlers works you need config your URLs, login2 has URL type:

``` go
type URLS struct {
  Redirect                string
  SignIn                  string
  SignUp                  string
  ResetPasswordSuccess    string
}
```

And ```Builder``` has URLS field

``` go
loginBuilder.URLS = login2.URLS{
  Redirect: "/dashbaord",
  SignIn:    "/login",
  SignUp:  "/register",
  ResetPasswordSuccess: "/reset_password_success"
}
```
After your sign or sign up login2 will send user to ```Redirect``` url.

When login2 need sign in user, e.g User trying access protected path, login2 will send user to ```SignIn``` url.

When login2 need send up user, login2 will send user to ```SignUp``` url.

TODO: ResetPasswordSuccess


See [Doc](http://godoc.org/github.com/dukex/login2)
