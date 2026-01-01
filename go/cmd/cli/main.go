package main

import (
	"log"
	"os"

	"github.com/sinansonmez/fojo/internal/pdf"
)

func main() {
	if len(os.Args) < 3 {
		log.Fatal("usage: my-go-pdf <text> <output.pdf>")
	}

	text := os.Args[1]
	outputPath := os.Args[2]

	data, err := pdf.Create(pdf.CreateOptions{
		Title: "My PDF",
		Text:  text,
	})
	if err != nil {
		log.Fatal(err)
	}

	err = os.WriteFile(outputPath, data, 0644)
	if err != nil {
		log.Fatal(err)
	}
}
