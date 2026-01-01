declare const Go: any

let ready: Promise<void> | null = null

async function initWasm(): Promise<void> {
    if (ready) return ready

    ready = (async () => {
        const go = new Go()

        const response = await fetch('/fojo.wasm')
        const bytes = await response.arrayBuffer()

        const result = await WebAssembly.instantiate(bytes, go.importObject)
        go.run(result.instance)
    })()

    return ready
}

export async function createPdfWasm(text: string): Promise<Uint8Array> {
    await initWasm()

    const fn = (window as any).createPdf
    if (typeof fn !== 'function') {
        throw new Error('WASM createPdf not found')
    }

    return fn(text) as Uint8Array
}
