import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL(import.meta.url).pathname, '..', '..');
const src = path.join(root, 'dist', 'client', 'assets');
const dest = path.join(root, 'assets');

function copyDirectory(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

if (!fs.existsSync(src)) {
  throw new Error(`Source asset directory not found: ${src}`);
}
copyDirectory(src, dest);
console.log(`Copied assets from ${src} to ${dest}`);
