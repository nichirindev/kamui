import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] || 'public/imgly';
const manifest = JSON.parse(readFileSync(join(dir, 'resources.json'), 'utf8'));
const keys = [
  '/onnxruntime-web/ort-wasm-simd-threaded.wasm',
  '/onnxruntime-web/ort-wasm-simd.wasm',
  '/onnxruntime-web/ort-wasm-threaded.wasm',
  '/onnxruntime-web/ort-wasm.wasm',
  '/models/isnet_fp16',
  '/models/isnet_quint8',
];
const seen = new Set();
let ok = true;
for (const key of keys) {
  const entry = manifest[key];
  if (!entry) { console.log('MISSING KEY', key); ok = false; continue; }
  let missing = 0, bytes = 0;
  for (const c of entry.chunks) {
    bytes += c.offsets[1] - c.offsets[0];
    if (seen.has(c.hash)) continue;
    seen.add(c.hash);
    if (!existsSync(join(dir, c.hash))) missing++;
  }
  console.log(`${missing === 0 ? 'OK  ' : 'FAIL'} ${key.padEnd(45)} chunks=${entry.chunks.length} size=${(bytes / 1048576).toFixed(1)}MB`);
  if (missing) { console.log('   missing chunk files:', missing); ok = false; }
}
console.log(ok ? '\nAll required assets present.' : '\nSome assets are missing.');
process.exit(ok ? 0 : 1);
