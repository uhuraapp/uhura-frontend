package core

type Item struct {
  Key         string `sql:"unique"`
  SourceUrl   string `sql:"not null;unique"`
  Title       string
  Description string
  ChannelId   int
  Id          int
}
