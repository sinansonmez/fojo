//go:build js && wasm

package main

import (
	"syscall/js"

	"github.com/sinansonmez/fojo/internal/pdf"
)

func createPdf(this js.Value, args []js.Value) any {
	text := args[0].String()

	data, err := pdf.Create(pdf.CreateOptions{
		Title: "WASM PDF",
		Text:  text,
	})
	if err != nil {
		return js.ValueOf(err.Error())
	}

	uint8Array := js.Global().Get("Uint8Array").New(len(data))
	js.CopyBytesToJS(uint8Array, data)

	return uint8Array
}

func main() {
	js.Global().Set("createPdf", js.FuncOf(createPdf))
	select {}
}
