import { createPdfNode } from './nodeWrapper'

describe('createPdfNode', () => {
    function isPdf(data: Uint8Array) {
        const header = Buffer.from(data.slice(0, 4)).toString()
        return header === '%PDF'
    }

    it('should create a PDF from text', async () => {
        const text = 'Hello, Fojo!'
        const pdf = await createPdfNode(text)

        expect(pdf).toBeInstanceOf(Uint8Array)
        expect(pdf.length).toBeGreaterThan(0)
        expect(isPdf(pdf)).toBe(true)
    })
})
