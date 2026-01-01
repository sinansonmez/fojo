import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import crypto from 'crypto';
function getBinaryPath() {
    const platform = os.platform();
    const arch = os.arch();
    const base = path.join(__dirname, '../dist/bin');
    if (platform === 'linux' && arch === 'x64') {
        return path.join(base, 'linux-x64/fojo');
    }
    if (platform === 'darwin' && arch === 'x64') {
        return path.join(base, 'darwin-x64/fojo');
    }
    if (platform === 'darwin' && arch === 'arm64') {
        return path.join(base, 'darwin-arm64/fojo');
    }
    if (platform === 'win32' && arch === 'x64') {
        return path.join(base, 'win32-x64/fojo.exe');
    }
    throw new Error(`Unsupported platform: ${platform} ${arch}`);
}
export function createPdfNode(text) {
    const binary = getBinaryPath();
    const tmpFile = path.join(os.tmpdir(), `fojo-${crypto.randomUUID()}.pdf`);
    if (!fs.existsSync(binary)) {
        throw new Error(`Fojo binary not found: ${binary}`);
    }
    return new Promise((resolve, reject) => {
        const proc = spawn(binary, [text, tmpFile]);
        proc.on('error', reject);
        proc.on('close', code => {
            if (code !== 0)
                return reject(new Error('Fojo failed'));
            const data = fs.readFileSync(tmpFile);
            fs.unlinkSync(tmpFile);
            resolve(new Uint8Array(data));
        });
    });
}
