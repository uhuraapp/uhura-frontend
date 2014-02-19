package login2

import (
	"testing"
)

func TestNewBuilder(t *testing.T) {
	providers := []*Provider{&Provider{Name: "Duke", Key: "CsE34", Secret: "Aeee", Scope: "email", RedirectUrl: "/d"}}
	builder := NewBuilder(providers)

	expected := "CsE34"

	client := *builder.Providers["Duke"]
	current := client.ClientId

	if current != expected {
		t.Errorf("Expected [%s] but [%s]", expected, current)
	}
}
