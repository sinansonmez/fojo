# fojo

Go-powered PDF generation for Node.js and the browser (WASM).

## Install

```bash
npm install fojo
```

## Usage

### Node.js

```ts
import { createPdf } from 'fojo'
import { writeFile } from 'node:fs/promises'

const bytes = await createPdf('Hello from fojo')
await writeFile('out.pdf', Buffer.from(bytes))
```

`fojo` uses a bundled, platform-specific native binary under `dist/bin/*` and runs it via `child_process.spawn`.

Supported (Node) platforms:
- Linux x64
- macOS arm64
- Windows x64

### Browser (WASM)

The browser build fetches `fojo.wasm` from `/fojo.wasm` and expects the Go WASM runtime (`wasm_exec.js`) to be loaded (it provides the global `Go` constructor).

1. Copy `node_modules/fojo/dist/wasm/fojo.wasm` to your app’s public root as `fojo.wasm`.
2. Copy Go’s `wasm_exec.js` into your app (from `$(go env GOROOT)/misc/wasm/wasm_exec.js`) and load it before your bundle (for example: `<script src="/wasm_exec.js"></script>`).

```ts
import { createPdf } from 'fojo'

const bytes = await createPdf('Hello from the browser')
const blob = new Blob([bytes], { type: 'application/pdf' })
const url = URL.createObjectURL(blob)

// Example download
const a = document.createElement('a')
a.href = url
a.download = 'out.pdf'
a.click()
URL.revokeObjectURL(url)
```

## CLI (bundled)

The Node.js wrapper invokes the bundled CLI binary. You can run it directly:

```bash
./node_modules/fojo/dist/bin/<platform>/fojo "Some text" out.pdf
```

## Development

Prereqs: Node.js + Go (see `go/go.mod` for the Go version).

```bash
npm test
npm run lint
npm run build
```

## License

MIT
