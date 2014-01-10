package core

type Channel struct {
  Title         string
  Description   string
  ImageUrl      string
  Copyright     string
  LastBuildDate string
  Url           string `sql:"not null;unique"`
  Id            int
}

type UserChannel struct {
  Id        int
  UserId    int
  ChannelId int
}

func GetChannelByUser(user *User) *[]Channel {
  configDatabase()

  var channels []Channel
  database.Table("user_channels").Select("channels.title, channels.description, channels.image_url, channels.copyright, channels.last_build_date, channels.url, channels.id").Where("user_id = ?", user.Id).Joins("left join channels on channels.id = user_channels.channel_id").Scan(&channels)

  return &channels
}
