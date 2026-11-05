import assert from 'node:assert/strict';
import vm from 'node:vm';
import { read } from './lib/book.mjs';
import { readCatalog } from './lib/references.mjs';
import { citations, registry, validateCitations, annotateCitations, citationNotesMarkdown } from './lib/citations.mjs';

const catalog = readCatalog();
validateCitations(catalog);
const copy = () => structuredClone(registry);
let bad = copy(); bad.references[0].bindings[0].entryId = 'deleted';
assert.throws(()=>validateCitations(catalog,bad),/unknown entry/);
bad = copy(); bad.references[0].bindings[0].text += ' edited';
assert.throws(()=>validateCitations(catalog,bad),/exactly once/);
bad = copy(); bad.references[0].sourceUrl = 'https://example.com/claim';
assert.throws(()=>validateCitations(catalog,bad),/official/);
bad = copy(); bad.references[1].id = bad.references[0].id;
assert.throws(()=>validateCitations(catalog,bad),/duplicate legal/);
bad = copy(); bad.references[1].bindings[0] = {...bad.references[0].bindings[0]};
assert.throws(()=>validateCitations(catalog,bad),/duplicate binding/);
bad = copy(); bad.references[1].bindings[0] = {...bad.references[0].bindings[0],text:'09/2012/QH13 Điều 11'};
assert.throws(()=>validateCitations(catalog,bad),/Overlapping/);

const target = catalog.byId.get(registry.references[0].bindings[0].entryId);
assert.equal(citations.matches(target.legal,target.id,'legal',registry).length,2);
assert.equal(citations.matches(target.legal,'another-entry','legal',registry).length,0);
assert.equal(citations.matches(target.legal,target.id,'src',registry).length,0);
assert.equal(citations.matches(target.legal + target.legal,target.id,'legal',registry).length,0,'Repeated text must not be guessed');
assert.equal(citations.matches('Điều 24 khoản 1 của một nghị định khác',target.id,'legal',registry).length,0);
const md = read(target.file), annotated = annotateCitations(md,target.file,catalog,r=>'#law-' + r.id);
assert.equal(annotated.replace(/ \[ghi chú \d+\]\(#law-[a-z0-9-]+\)/g,''),md,'Adding endnotes must preserve the source text exactly');
for (const ref of registry.references) {
  assert.ok(annotated.includes('(#law-' + ref.id + ')'));
  assert.ok(citationNotesMarkdown(catalog).includes(ref.quote.split('\n')[0]));
}
const context = {}; vm.runInNewContext(read('assets/book-citations.js'),context);
assert.equal(context.BookCitations.matches(target.legal,target.id,'legal',registry).length,2);
console.log(`PASS: ${registry.references.length} exact legal excerpts; scoped bindings, stale text, ambiguous text, source validation, PDF/EPUB endnotes and browser loading`);
