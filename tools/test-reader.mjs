// Bookmarks must survive renumbering and malformed browser storage.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {webcrypto} from 'node:crypto';
import { read, readBook, COST_W } from './lib/book.mjs';
import { refs, readCatalog } from './lib/references.mjs';
import { readerData } from './reader-data.mjs';

const html = read('index.html');
const rules = html.match(/\/\/ <reader-rules>[\s\S]*?\/\/ <\/reader-rules>/);
assert.ok(rules, 'Missing browser reader rules');
const ctx = { URLSearchParams };
vm.runInNewContext(rules[0], ctx);
const { readerFont, readerPosition, readerUrlPosition } = ctx;
const sections = readCatalog().sections;
// Exercise the actual Web parser across every chapter, not a copy of its navigation rules.
const parser = html.match(/function parseReadme\(md\)\{[\s\S]*?\n\}/);
assert.ok(parser,'Missing website parser');
const browser = {BookReferences:refs,COST_W,fold:s=>s};
vm.runInNewContext(read('assets/book-reader.js'), browser);
vm.runInNewContext(parser[0],browser);
const web = browser.parseReadme(readBook().bookFiles.map(read).join('\n\n'));
const indexed=readerData().sections;
assert.equal(web.length,sections.length);
for (const [i,s] of sections.entries()) {
  assert.equal(web[i].entries.length,s.entries.length);
  assert.deepEqual(indexed[i].intro,Array.from(web[i].intro),'Indexed and full chapter introductions must match: '+s.file);
  assert.ok(!web[i].intro.some(p=>p.startsWith('**Nhóm mục**') || p.startsWith('Các mục trong chương chia theo nhóm')),'Duplicate group navigation: ' + s.file);
  for (const line of s.intro.filter(p=>/^(?:Chương này|Về thang bằng chứng:|Về bối cảnh Việt Nam:|Ở Việt Nam,|Phần lớn con số|Ba mục 5, 6 và 40)/.test(p))) {
    assert.ok(web[i].intro.includes(line),'Meaningful introduction was dropped: ' + s.file);
  }
  for (const [j,e] of s.entries.entries()) {
    assert.equal(web[i].entries[j].id,e.id);
    for (const field of ['cost','human','gain','legal','note','src']) assert.equal(web[i].entries[j][field],e[field] || '');
  }
}
assert.equal(web[0].intro.length,1,'Chapter 1 keeps its introduction without the multi-paragraph group list');
assert.equal(web[1].intro.length,2,'Keep the Vietnam-specific explanation after chapter 2’s group list');
assert.equal(web[2].intro.length,3,'Keep chapter 3’s evidence and local context paragraphs');
const introFixture = '# 1. Test\n\nMở đầu.\n\nCác mục trong chương chia theo nhóm như sau, số trong ngoặc là số mục.\n\n**Nhóm thử**: [mục 1](test.md#entry-test).\n\nGiải thích riêng sau nhóm.\n\n**Lưu ý**: xem [mục 1](test.md#entry-test) trước khi bắt đầu.\n\n### 1. Test\n- Nói dễ hiểu: Nội dung mục.\n';
assert.deepEqual(Array.from(browser.parseReadme(introFixture)[0].intro),['Mở đầu.','Giải thích riêng sau nhóm.','**Lưu ý**: xem [mục 1](test.md#entry-test) trước khi bắt đầu.']);
const indexedSection=indexed.find(s=>s.n==='13');
browser.SECS=new Map([['13',structuredClone(indexedSection)]]);
browser.CHAPTER_LOADS=new Map();browser.crypto=webcrypto;browser.TextEncoder=TextEncoder;
browser.readText=async file=>read(file).replace(/\n/g,'\r\n');
vm.runInNewContext(html.match(/async function ensureChapter\(n\)\{[\s\S]*?\n\}/)[0],browser);
await browser.ensureChapter('13');
assert.ok(browser.SECS.get('13').entries.every(e=>e.loaded),'Windows CRLF chapters must pass the normalized catalogue hash');
browser.SECS=new Map([['13',structuredClone(indexedSection)]]);browser.CHAPTER_LOADS=new Map();
browser.readText=async file=>read(file)+'\nNội dung khác phiên bản.';
await assert.rejects(()=>browser.ensureChapter('13'),/Nội dung đang cập nhật/,'Reject a stale chapter instead of mixing editions');
let total = 0;
for (const s of sections) for (const entry of s.entries) {
  const key = `${s.n}-${entry.n}`;
  const saved = readerPosition({chapter:s.n, entry:key, title:entry.title, offset:.37}, sections);
  assert.equal(saved.entry, key);
  assert.equal(saved.offset, .37);
  const url = readerUrlPosition('?view=book&chapter=999', '#e-' + key, sections);
  assert.equal(url.chapter, s.n, 'Entry hash takes precedence over query chapter');
  assert.equal(url.entry, key);
  total++;
}
const fixture = [{n:'1',entries:[{n:'1',title:'New entry'},{n:'2',title:'Original entry'}]}];
const renamed = readerPosition({chapter:'1',entry:'1-1',title:'Original entry',offset:.6}, fixture);
assert.equal(renamed.entry, '1-2', 'Resolve saved title after another entry is inserted');
assert.equal(renamed.offset, .6);
const deleted = readerPosition({chapter:'1',entry:'1-1',title:'Deleted entry',offset:.6}, fixture);
assert.equal(deleted.entry, 'intro', 'Do not land on an unrelated entry after deletion');
assert.equal(deleted.offset, 0);
for (const bad of [null, [], 'oops', {chapter:'999'}, {chapter:Infinity}]) {
  const p = readerPosition(bad, sections);
  assert.equal(p.chapter, sections[0].n); assert.equal(p.entry, 'intro'); assert.equal(p.offset, 0);
}
for (const [offset, expected] of [[-1,0],[2,1],[NaN,0],[Infinity,0],['.5',0]]) {
  assert.equal(readerPosition({chapter:'1',entry:'intro',offset}, fixture).offset, expected);
}
for (const [input, expected] of [[undefined,19],[null,19],['',19],['broken',19],[Infinity,19],[-5,16],[99,26],['20',20],[20.6,21]]) {
  assert.equal(readerFont(input), expected);
}
assert.equal(readerUrlPosition('?view=chapters','#e-1-2',fixture), null);
assert.equal(readerUrlPosition('', '#e-1-2', fixture), null);
assert.equal(readerUrlPosition('?view=book','',fixture), null, 'Bare reader view may resume saved position');
assert.equal(readerUrlPosition('?view=book&chapter=1','#bad',fixture).entry, 'intro');
assert.equal(readerPosition({},[]).chapter, '');
const moved = [{n:'2',entries:[{n:'8',title:'Changed title',id:'original',legacy:'1-1'}]}];
assert.equal(readerPosition({id:'original',chapter:'1',entry:'1-1',title:'Old title',offset:.6},moved).entry,'2-8');
assert.equal(readerPosition({id:'original',chapter:'1',offset:.6},moved).offset,.6);
assert.equal(readerUrlPosition('?view=book&chapter=1','#entry-original',moved).chapter,'2');
assert.equal(readerUrlPosition('?view=book&chapter=1','#e-1-1',moved).entry,'2-8');
assert.equal(readerUrlPosition('?view=book&chapter=2','#e-2-8',moved).entry,'intro','Unassigned old link must not jump to an unrelated current position');
assert.equal(readerPosition({id:'deleted',chapter:'2',entry:'2-8'},moved).entry,'intro');
console.log(`PASS: reader links and unchanged fields for ${total} entries in ${sections.length} chapters; clean introductions, bookmark recovery and font bounds`);
