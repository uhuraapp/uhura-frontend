package core

func UserViewedHelper(arg interface{}) bool {
  viewed := arg.(UserItemsResult).Viewed

  switch str := viewed.(type) {
  case bool:
    return str
  case nil:
    return false
  }
  return false
}
