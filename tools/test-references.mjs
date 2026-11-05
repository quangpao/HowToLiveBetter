import assert from 'node:assert/strict';
import vm from 'node:vm';
import { read } from './lib/book.mjs';
import { refs, readCatalog, prepareMarkdown } from './lib/references.mjs';

const c = readCatalog(), aliases = JSON.parse(read('data/entry-aliases.json')).aliases;
const manifest = JSON.parse(read('data/entries.json'));
assert.equal(c.entries.length, manifest.entries.length);
assert.equal(c.byId.size,c.entries.length);
for (const e of c.entries) {
  assert.equal(c.byNumber.get(e.sec + '-' + e.n),e);
  assert.ok(e.tags,'Missing cost labels: ' + e.id);
  if (e.legacy) assert.equal(aliases[e.legacy],e.id,'A historical alias was reassigned');
}
let targets = 0;
for (const s of c.sections) {
  const md = read(s.file);
  const pdf = prepareMarkdown(md,s.file,c);
  for (const e of s.entries) assert.ok(pdf.includes('{#entry-' + e.id + '}'),'PDF destination missing: ' + e.id);
  assert.equal(refs.refreshLinks(md,c,s.file),md,'Stale location/number in ' + s.file);
  for (const link of refs.links(md)) for (const id of link.ids) { assert.ok(c.byId.has(id),id); targets++; }
}
const fixture = (chapter,number,title,id,legacy='') => `# ${chapter}. Test\n### ${number}. ${title}\n<!-- nhãn: tiền=0 -->\n<a name="entry-${id}"${legacy ? ` data-legacy="${legacy}"` : ''}></a>\n- Nói dễ hiểu: Text.\n`;
const moved = refs.catalog({'book/02-test.md':fixture(2,8,'Changed title','seat-belt','1-1')});
const linked = '[chương 1 mục 1](01-old.md#entry-seat-belt)';
assert.equal(refs.refreshLinks(linked,moved,'book/03-test.md'),'[chương 2 mục 8](02-test.md#entry-seat-belt)');
assert.equal(refs.refreshLinks('[mục 1](01-old.md#entry-seat-belt)',moved,'book/03-test.md'),'[chương 2 mục 8](02-test.md#entry-seat-belt)','A moved local reference gains the destination chapter');
assert.equal(moved.byLegacy.get('1-1').id,'seat-belt');
const history = JSON.parse(read('data/entry-aliases.json'));
for (const e of c.entries) { assert.ok(history.reservedIds.includes(e.id)); assert.ok(!history.retiredIds.includes(e.id)); }
assert.throws(()=>refs.refreshLinks('[mục 1](old.md#entry-deleted)',moved,'book/02-test.md'),/không tồn tại/);
assert.throws(()=>refs.catalog({'book/a.md':fixture(1,1,'A','same')+fixture(1,2,'B','same')}),/ID trùng/);
assert.throws(()=>refs.catalog({'book/a.md':'# 1. Test\n### 1. Missing ID\n'}),/chưa có ID/);
assert.equal(refs.labelFor('Giải thích về mục 1',[moved.entries[0]]),'Giải thích về mục 1');
const small = refs.catalog({'book/01-test.md':fixture(1,1,'A','a')+fixture(1,2,'B','b')+fixture(1,3,'C','c')});
const list = refs.migrateLine('Xem mục 1, 2 và 3.',1,small,'book/01-test.md');
assert.equal(refs.links(list).length,3,'Each number in a list remains independently clickable');
assert.equal(refs.plainText(list),'Xem mục 1, 2 và 3.');
const range = refs.migrateLine('mục 1 đến 3',1,small,'book/01-test.md');
assert.deepEqual(refs.links(range)[0].ids,['a','b','c']);
const crossList = refs.migrateLine('Xem chương 1 mục 1 và mục 2 trước khi ký.',29,small,'book/29-test.md');
assert.deepEqual(refs.links(crossList).flatMap(l=>l.ids),['a','b'],'A repeated mục in a cross-chapter list keeps the named chapter');
const main = read('index.html');
const mdLink = vm.runInNewContext(main.match(/const MD_LINK_RE = ([^\n]+);/)[1]);
assert.ok(mdLink.test(range),'The website must recognize range metadata without exposing Markdown');
assert.equal(refs.migrateLine('Điều 24 khoản 1; Luật 12/2020/QH14 mục 2.',1,small,'book/01-test.md'),'Điều 24 khoản 1; Luật 12/2020/QH14 mục 2.');
assert.equal(refs.references('mục 2',1,small,{source:true}).length,0,'Source-law section numbers are not book references');
assert.equal(refs.references('mục 2',1,small,{doc:true}).length,0,'Bare numbers in long reads are not inferred');
const ctx = {}; vm.runInNewContext(read('assets/book-references.js'),ctx);
assert.equal(ctx.BookReferences.catalog({'book/test.md':fixture(2,8,'Changed title','seat-belt','1-1')}).byLegacy.get('1-1').id,'seat-belt');
console.log(`PASS: ${c.entries.length} identities, ${Object.keys(aliases).length} frozen aliases, ${targets} reference targets; moves, renumbering, deletion, lists/ranges and browser loading`);
