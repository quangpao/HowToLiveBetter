// Verify the generated artifact, including JavaScript replacement-string metacharacters.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { read } from './lib/book.mjs';
import { readCatalog } from './lib/references.mjs';
import { registry } from './lib/citations.mjs';
const html = read(process.argv[2] || 'dist/HowToLiveBetter.html');
assert.ok(!/<script\b[^>]*\bsrc=/i.test(html),'Offline HTML must contain its scripts');
assert.ok(!/googletagmanager|google-analytics/.test(html));
const context = {window:{}}, scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
let compiled = 0;
for (const [,attrs,code] of scripts) {
  if (/application\/ld\+json/.test(attrs)) { JSON.parse(code); continue; }
  const script = new vm.Script(code); compiled++;
  if (/^window\.__CORPUS__=/.test(code.trim())) script.runInNewContext(context,{timeout:2000});
}
const c = readCatalog(), embedded = context.window.__CORPUS__;
assert.ok(embedded,'Missing embedded corpus');
for (const section of c.sections) assert.equal(embedded.parts[section.file],read(section.file));
assert.equal(JSON.stringify(embedded.citations),JSON.stringify(registry));
assert.ok(html.includes('data:image/jpeg;base64,'),'Cover must be embedded');
console.log(`PASS: ${compiled} scripts compile; ${c.sections.length} chapters and legal registry embedded exactly; no external scripts/analytics`);
