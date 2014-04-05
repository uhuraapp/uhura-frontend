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

Follow the callbacks documentation:

### UserSetupFn

``` go
UserSetupFn         func(provider string, user *login2.User, rawResponse *http.Response) (int64, error)
```

Called when user return from oauth provider, this method will send a provider origin as string, some user information as ```login2.User``` and the raw response from origin(login2 will make a request to ```UserInfoURL``` configured on provider config). To sign in user the method expect the user id as int64


### UserCreateFn
``` go
UserCreateFn        func(email string, password string, request *http.Request) (int64, error)
```

Called when user sign up by email/password, the method will send email and password as string, password is encrypted hash, and expect the user id as int64

### UserIdByEmail
``` go
UserIdByEmail       func(email string) (int64, error)
```

Called when user sign in by email/password to get the user id by email after check the password with ```UserPasswordByEmail```, the method will send the user email as string and expect the user id as int64

### UserPasswordByEmail
``` go
UserPasswordByEmail func(email string) (string, bool)
```

Called when user sign in by email/password to get user password and check with inputed password, the method will send user email as string and expect the user password as string

### UserResetPasswordFn
``` go
UserResetPasswordFn func(token string, email string)
```
TODO

## CurrentUser

CurrentUser func expect you send the request(```http.Request```) and return the user id as string and bool true if is OK

``` go
(b *Builder) CurrentUser(r *http.Request) (string, bool)
```


## HTTP

Login2 provide some http handlers

#### OAuthAuthorize(provider string) func(http.ResponseWriter, *http.Request)

To authorize user on defined provider. Send provider name as params and method will return http handle

```
GET   /auth/google     loginBuilder.OAuthAuthorize("google")
GET   /auth/facebook   loginBuilder.OAuthAuthorize("facebook")
```

#### OAuthLogin(provider string) func(http.ResponseWriter, *http.Request)

The oauth endpoint callback, configured on provider, Send provider name as params and method will return http handle

```
GET   /auth/callback/google     loginBuilder.OAuthLogin("google")
GET   /auth/callback/facebook   loginBuilder.OAuthLogin("facebook")
```

#### SignUp() func(http.ResponseWriter, *http.Request)

Method to sign up user, send a http POST with email and password params on body

```
POST   /users/sign_up   SignUp
```


#### SignIn() func(http.ResponseWriter, *http.Request)
Method to sign in user, send a http POST with email and password params on body

```
POST   /users/sign_in   SignIn
```

#### SignOut() func(http.ResponseWriter, *http.Request)
Method to sign out user, send a http GET

```
GET   /users/sign_out   SignOut
```

#### Protected(fn func(string, http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request)

Method to use on protected path, send the original http handle as params and if user is logged Protected will pass user to original handler else Protected will save URL and send user to Sign In. Protected send as first params the user id.

```
GET   /dashboard   Protected(DashboardHandle)
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

##### Getting Errors
TODO

