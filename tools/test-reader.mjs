// Bookmarks must survive renumbering and malformed browser storage.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { read, readBook } from './lib/book.mjs';

const html = read('index.html');
const rules = html.match(/\/\/ <reader-rules>[\s\S]*?\/\/ <\/reader-rules>/);
assert.ok(rules, 'Missing browser reader rules');
const ctx = { URLSearchParams };
vm.runInNewContext(rules[0], ctx);
const { readerFont, readerPosition, readerUrlPosition } = ctx;
const sections = readBook().bookFiles.map(path => {
  const md = read(path), chapter = md.match(/^# (\d+)\. (.+)$/m);
  assert.ok(chapter, path);
  return { n:chapter[1], entries:[...md.matchAll(/^### (\d+)\. (.+)$/gm)].map(m => ({n:m[1], title:m[2]})) };
});
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
console.log(`PASS: reader links for ${total} entries in ${sections.length} chapters; bookmark recovery and font bounds`);
