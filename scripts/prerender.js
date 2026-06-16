import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');

const serverPath = path.join(root, 'dist', 'server', 'server.js');
const { default: server } = await import(pathToFileURL(serverPath).href);

const response = await server.fetch(new Request('http://localhost/'), {}, {});
const html = await response.text();

const outDir = path.join(root, 'public');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`Pre-rendered index.html (${html.length} bytes)`);

const src = path.join(root, 'dist', 'client', 'assets');
const dest = path.join(outDir, 'assets');
fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

function copy(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    if (entry.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copy(s, d); }
    else fs.copyFileSync(s, d);
  }
}
copy(src, dest);
console.log(`Copied assets to public/assets/`);
