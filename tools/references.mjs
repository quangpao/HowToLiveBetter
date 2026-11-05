// Assign identities once, freeze old numeric links, and validate/generate the catalog.
// --init migrates this release. Later use --assign for new entries, --check in CI.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT, read, readBook } from './lib/book.mjs';
import { refs } from './lib/references.mjs';

const check = process.argv.includes('--check'), init = process.argv.includes('--init'), assign = init || process.argv.includes('--assign');
const migrate = init || process.argv.includes('--migrate');
const {bookFiles,docFiles} = readBook();
const parts = Object.fromEntries(bookFiles.map(file => [file,read(file)]));
const before = refs.catalog(parts,false), ids = new Set(before.entries.map(e => e.id).filter(Boolean));
const aliasesPath = resolve(ROOT,'data/entry-aliases.json');
const aliases = existsSync(aliasesPath) ? JSON.parse(readFileSync(aliasesPath,'utf8')) : {version:1,aliases:{}};
const reserved = new Set([...(aliases.reservedIds || []),...Object.values(aliases.aliases)]);
const retired = new Set(aliases.retiredIds || []);
const oldManifest = existsSync(resolve(ROOT,'data/entries.json')) ? JSON.parse(read('data/entries.json')).entries : [];
if (init && Object.keys(aliases.aliases).length) throw new Error('--init chỉ chạy một lần; dùng --assign cho mục mới');
for (const e of before.entries) if (!e.id) {
  if (!assign) throw new Error(e.file + ': mục ' + e.n + ' thiếu ID; chạy node tools/references.mjs --assign');
  const stem = refs.slug(e.title) || 'muc'; let id = stem, i = 2;
  while (ids.has(id) || reserved.has(id)) id = stem + '-' + i++;
  ids.add(id); e.id = id; e.legacy = init ? e.sec + '-' + e.n : '';
  const lines = parts[e.file].split('\n'), start = lines.findIndex(line => line === '### ' + e.n + '. ' + e.title);
  if (start < 0) throw new Error('Không tìm được tiêu đề: ' + e.title);
  let at = start + 1; if (/^<!--\s*nhãn:/.test(lines[at] || '')) at++;
  lines.splice(at,0,'<a name="entry-' + id + '"' + (e.legacy ? ' data-legacy="' + e.legacy + '"' : '') + '></a>','');
  parts[e.file] = lines.join('\n');
}
const catalog = refs.catalog(parts);
for (const e of oldManifest) if (!catalog.byId.has(e.id)) retired.add(e.id);
for (const e of catalog.entries) {
  if (retired.has(e.id)) throw new Error('Không được dùng lại ID đã xóa: ' + e.id);
  reserved.add(e.id);
}
aliases.reservedIds = [...reserved].sort();
aliases.retiredIds = [...retired].sort();
for (const e of catalog.entries) if (e.legacy) {
  if (aliases.aliases[e.legacy] && aliases.aliases[e.legacy] !== e.id) throw new Error('Không được dùng lại alias ' + e.legacy);
  aliases.aliases[e.legacy] = e.id;
}
const migrated = new Map(), counts = {links:0,targets:0};
for (const file of [...bookFiles,...docFiles]) {
  const md = parts[file] ?? read(file), s = catalog.sections.find(s => s.file === file); let inEntry = false;
  const text = md.split('\n').map(line => {
    if (/^### \d+\. /.test(line)) inEntry = true;
    if (migrate && !/^<a |^<!--|^#|^\[←/.test(line) && (!inEntry || /^- (Chi phí|Nói dễ hiểu|Lợi ích|Pháp luật Việt Nam|Ghi chú|Nguồn):/.test(line))) {
      line = refs.migrateLine(line,s?.n,catalog,file,{doc:!s,source:inEntry && /^- Nguồn:/.test(line)});
    }
    return line;
  }).join('\n');
  const fresh = refs.refreshLinks(text,catalog,file);
  for (const link of refs.links(fresh)) { counts.links++; counts.targets += link.ids.length; }
  migrated.set(file,fresh);
}
const manifest = {version:1,entries:catalog.entries.map(e => ({id:e.id,legacy:e.legacy,chapter:e.sec,number:e.n,title:e.title,file:e.file}))};
const output = new Map([...migrated,['data/entries.json',JSON.stringify(manifest,null,2)+'\n'],['data/entry-aliases.json',JSON.stringify(aliases,null,2)+'\n']]);
let changed = 0;
for (const [file,text] of output) {
  const old = existsSync(resolve(ROOT,file)) ? read(file) : '';
  if (text === old) continue;
  changed++;
  if (check) console.error('Cần cập nhật: ' + file);
  else { mkdirSync(resolve(ROOT,file,'..'),{recursive:true}); writeFileSync(resolve(ROOT,file),text); }
}
console.log(`${catalog.sections.length} chương, ${catalog.entries.length} ID, ${Object.keys(aliases.aliases).length} alias được giữ; ${counts.links} liên kết / ${counts.targets} đích; ${changed} tệp ${check ? 'cần cập nhật' : 'đã cập nhật'}`);
if (check && changed) process.exitCode = 1;
