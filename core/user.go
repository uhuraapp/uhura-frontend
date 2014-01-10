package core

import "strconv"

type TempUser struct {
  Id         string
  Name       string
  GivenName  string
  FamilyName string
  Link       string
  Picture    string
  Gender     string
  Locale     string
}

type User struct {
  Id         int
  Name       string
  GivenName  string
  FamilyName string
  Link       string
  Picture    string
  Gender     string
  Locale     string
  GoogleId   string
}

func (u *User) IdString() string {
  return strconv.Itoa(u.Id)
}

func CreateUser(tempUser TempUser) *User {
  configDatabase()

  var user User

  database.Where(User{GoogleId: tempUser.Id}).Attrs(User{Name: tempUser.Name, GivenName: tempUser.GivenName, FamilyName: tempUser.FamilyName, Link: tempUser.Link, Picture: tempUser.Picture, Gender: tempUser.Gender, Locale: tempUser.Locale}).FirstOrCreate(&user)

  return &user
}

func GetUser(userId string) *User {
  configDatabase()

  var user User
  id, _ := strconv.Atoi(userId)

  database.First(&user, id)

  return &user
}
