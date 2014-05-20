package core

import (
	"os"

	"github.com/dukex/mixpanel"
)

var MIXPANEL *mixpanel.Mixpanel

func init() {
	MIXPANEL = mixpanel.NewMixpanel(os.Getenv("MIXPANEL_TOKEN"))
}
