package pdf

import (
	"bytes"

	"github.com/jung-kurt/gofpdf"
)

type CreateOptions struct {
	Title string
	Text  string
}

func Create(options CreateOptions) ([]byte, error) {
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.SetTitle(options.Title, false)
	pdf.AddPage()
	pdf.SetFont("Arial", "", 14)

	pdf.MultiCell(0, 10, options.Text, "", "", false)

	var buffer bytes.Buffer
	err := pdf.Output(&buffer)
	if err != nil {
		return nil, err
	}

	return buffer.Bytes(), nil
}
