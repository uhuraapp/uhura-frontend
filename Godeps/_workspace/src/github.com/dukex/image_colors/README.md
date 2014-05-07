# Image Color

### Download
```
$ go get github.com/dukex/image_colors
```

### Import
```
import "github.com/dukex/image_colors"
```

### Example

``` go
reader, err := os.Open("image.jpg")
if err != nil {
  log.Fatal(err)
}

defer reader.Close()

imageColors, _ := image_color.New(reader)

log.Println(imageColors.TopColors(5, 0.5)) // return the top 5 colors with 0.5 of distance
```
