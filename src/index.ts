import { createPdfNode } from './nodeWrapper'
import { createPdfWasm } from './wasmWrapper'
import { isBrowser, isNode } from './env'

export async function createPdf(text: string): Promise<Uint8Array> {
    if (isNode) return createPdfNode(text)
    if (isBrowser) return createPdfWasm(text)

    throw new Error('Unsupported runtime')
}
