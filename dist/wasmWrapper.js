let ready = null;
async function initWasm() {
    if (ready)
        return ready;
    ready = (async () => {
        const go = new Go();
        const response = await fetch('/fojo.wasm');
        const bytes = await response.arrayBuffer();
        const result = await WebAssembly.instantiate(bytes, go.importObject);
        go.run(result.instance);
    })();
    return ready;
}
export async function createPdfWasm(text) {
    await initWasm();
    const fn = window.createPdf;
    if (typeof fn !== 'function') {
        throw new Error('WASM createPdf not found');
    }
    return fn(text);
}
