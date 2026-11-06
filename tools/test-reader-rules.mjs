// Regressions found in the reader audit; exercise real data and shared browser rules.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {read} from './lib/book.mjs';
import {readCatalog} from './lib/references.mjs';
import {splitGain,splitSrc} from './lib/split-items.mjs';
import {readerData} from './reader-data.mjs';
import {sitePages} from './site-pages.mjs';

const {BookReader:R}=vm.runInNewContext(read('assets/book-reader.js')+';({BookReader})',{URLSearchParams});
assert.equal(R.fold('BẢO HIỂM Y TẾ'),R.fold('bao hiem y te'));
assert.equal(R.fold('hoà khỏe uỷ Đà Nẵng'),R.fold('hòa khoẻ ủy da nang'));
assert.equal(JSON.stringify(R.terms('BHYT')),JSON.stringify(R.terms('bảo hiểm y tế')));
for(const min of [35,40,45,50,60,65])assert.equal(R.fitsAudience([[min+'-tuổi']],new Set(['65-tuổi'])),true);
assert.equal(R.fitsAudience([['65-tuổi']],new Set(['60-tuổi'])),false);
assert.equal(R.fitsAudience([['nữ','40-tuổi']],new Set(['nữ','65-tuổi'])),true);
assert.equal(R.fitsAudience([['nữ','40-tuổi']],new Set(['nam','65-tuổi'])),false);
assert.equal(R.fitsAudience([],new Set(['không'])),true);
assert.equal(R.fitsAudience([['nữ']],new Set(['không'])),false);
assert.equal(R.fitsAudience([['60-tuổi']],new Set()),true);

const catalog=readCatalog(), data=readerData(), entries=data.sections.flatMap(s=>s.entries);
assert.equal(entries.length,catalog.entries.length);
for(const key of ['1-13','1-21','1-22']){
  const e=entries.find(e=>e.legacy===key);assert.ok(e);
  assert.equal(R.fitsAudience(e.who,new Set(['65-tuổi'])),true,key+' must remain visible');
}
const results=query=>entries.filter(e=>R.score(e,R.terms(query))>=0).map(e=>e.id);
assert.deepEqual(results('bao hiem y te'),results('bảo hiểm y tế'));
assert.deepEqual(results('BHYT'),results('bảo hiểm y tế'));
assert.ok(results('BHYT').length>50,'Search must find the real health-insurance content');
assert.equal(R.score({title:'Mục khác',human:'Không liên quan',hay:R.searchable('https://example.org/bao-hiem-y-te')},R.terms('BHYT')),-1);
assert.ok(R.score({title:'Bảo hiểm y tế',human:'',hay:'bao hiem y te'},R.terms('BHYT')) > R.score({title:'Khác',human:'',hay:'bao hiem y te'},R.terms('BHYT')));
const html=read('index.html');
for(const lens of new Set(entries.map(e=>e.lens)))assert.ok(html.includes(`data-v="${lens}"`),'Missing lens: '+lens);
assert.ok(!html.includes("'ít':'làm một lần'"));
assert.ok(!/googletagmanager|google-analytics|search_term\s*:/.test(html),'Search terms/URLs must not be sent to analytics');
assert.ok(!html.includes('numberOfPages'));

const prefix='Đây là câu mở đầu đủ dài để kiểm tra việc tách đoạn mà không làm mất một ký tự nào. '.repeat(5);
for(const quote of ['"dấu nháy"',"'dấu nháy'",'“dấu nháy”']){
  const value=prefix+'Một câu chứa '+quote+'. Theo nghiên cứu, đây là câu mở đầu một ý mới đủ dài để đứng trong đoạn tiếp theo.';
  assert.equal(splitGain(value).length,2);assert.equal(splitGain(value).join(''),value);
}
assert.equal(splitSrc('Tài liệu "Tên bài; phần hai" https://example.org/a ; Tài liệu B https://example.org/b').length,2);
assert.equal(splitSrc("O'Brien (2025). A title; Tài liệu B").length,2);
const guardianship=catalog.byLegacy.get('17-3');
assert.ok(splitGain(guardianship.legal).length>1,'Real long legal text must have paragraph breaks');
assert.equal(splitGain(guardianship.legal).join(''),guardianship.legal);

for(const [path,source] of Object.entries(sitePages())){
  assert.ok(source.includes('<main') && source.includes('lang="vi"'),path);
  assert.ok(source.includes('canonical'),path);
  for(const match of source.matchAll(/#entry-([a-z0-9-]+)/g))assert.ok(catalog.byId.has(match[1]),path+' broken entry '+match[1]);
}
const pages=sitePages();
for(const ext of ['pdf','epub','html','apkg'])assert.ok(pages['tai-ve/index.html'].includes('releases/download/epub-latest/HowToLiveBetter.'+ext));
assert.ok(!pages['ve-cam-nang/index.html'].includes('Google Analytics'));
for(const path of ['assets/book-reader.js','assets/site-pages.js'])new vm.Script(read(path));
new vm.Script([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1]);
console.log(`PASS: reader search/audience, all ${entries.length} catalogue entries, quote splitting and 5 static entry points`);
