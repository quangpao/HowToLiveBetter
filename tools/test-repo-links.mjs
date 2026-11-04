// Smoke test: mọi liên kết fallback của sách tiếng Việt phải trỏ nhánh vi.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { REPO_BRANCH, readBook } from './lib/book.mjs';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const files = ['index.html', 'tools/offline/build.mjs', 'tools/pdf/build.mjs', 'tools/epub/build.mjs'];
if (REPO_BRANCH !== 'vi') throw new Error('Repo source branch for Vietnamese edition must be vi');
for (const file of files) {
  const source = readFileSync(resolve(root, file), 'utf8');
  if (/\/(?:blob|tree)\/main\//.test(source) || /\$\{kind\}\/main\//.test(source)) {
    throw new Error(file + ': fallback link still targets the Chinese main branch');
  }
}
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
if (!html.includes("const REPO_BLOB = 'https://github.com/quangpao/HowToLiveBetter/blob/vi/';")
    || !html.includes("const DOC_PREFIX = REPO_BLOB + 'docs/';")) {
  throw new Error('Website document popup is not aligned with the vi branch');
}
const docs = readBook().docFiles;
if (!docs.includes('docs/phap-luat-viet-nam.md')
    || docs.filter(p => p === 'docs/phap-luat-viet-nam.md').length !== 1) {
  throw new Error('Legal long-read missing or duplicated in PDF/EPUB doc manifest');
}
console.log('PASS: vi links and legal long-read in unique document manifest');
