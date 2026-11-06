// Regressions found in the reader audit; exercise real data and shared browser rules.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
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
for(const a of ['cao-tuổi','người-già','người-cao-tuổi'])for(const b of ['cao-tuổi','người-già','người-cao-tuổi'])
  assert.equal(R.fitsAudience([[a]],new Set([b])),true,'Senior aliases must remain equivalent');

const catalog=readCatalog(), data=readerData(), entries=data.sections.flatMap(s=>s.entries);
assert.equal(entries.length,catalog.entries.length);
for(const key of ['1-13','1-21','1-22']){
  const e=entries.find(e=>e.legacy===key);assert.ok(e);
  assert.equal(R.fitsAudience(e.who,new Set(['65-tuổi'])),true,key+' must remain visible');
}
const results=query=>entries.filter(e=>R.score(e,R.terms(query))>=0).map(e=>e.id);
assert.deepEqual(results('bao hiem y te'),results('bảo hiểm y tế'));
assert.deepEqual(results('BHYT'),results('bảo hiểm y tế'));
// Derive the expected IDs from the original fields, before catalogue deduplication.
// Separate words somewhere in an entry are not the health-insurance concept.
const normalize=s=>s.replace(/https?:\/\/[^\s<>]+/g,' ').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/đ/g,'d').replace(/[^a-z0-9]+/g,' ');
const healthInsurance=catalog.entries.filter(e=>/\b(?:bao hiem y te|bhyt)\b/.test(normalize([e.title,e.human,e.cost,e.gain,e.legal,e.note,e.src].join(' ')))).map(e=>e.id);
assert.deepEqual(results('BHYT'),healthInsurance,'Return the actual phrase/acronym entries, not a minimum result count');
const fixture=hay=>({title:'',human:'',hay:R.searchable(hay)});
assert.equal(R.score(fixture('Bảo hộ trách nhiệm, ý thức và kinh tế'),R.terms('BHYT')),-1);
assert.equal(R.score(fixture('Bảo hiểm nhân thọ, y học và kinh tế'),R.terms('BHYT')),-1,'Scattered words are not the health-insurance phrase');
assert.equal(R.score(fixture('nhiệm nhiễm sinh tế ý'),R.terms('hiem')),-1);
assert.equal(R.score(fixture('website'),R.terms('te')),-1,'Short tokens cannot match inside another token');
assert.equal(R.score(fixture('xalpha'),R.terms('alpha')),-1,'Never match inside the middle of a word');
assert.ok(R.score(fixture('alpha alphabet'),R.terms('alph'))>=0,'Allow a final prefix of at least four characters');
assert.equal(R.score(fixture('alphabet beta'),R.terms('alph beta')),-1,'An earlier query token must be complete');
assert.equal(R.score(fixture('12345'),R.terms('1234')),-1,'Numbers must match complete tokens');
assert.ok(R.score(fixture('BHYT'),R.terms('y tế'))>=0,'Acronym expansion also supports partial phrase queries');
assert.ok(R.score(fixture('bảo hiểm y tế'),R.terms('BHYT'))>=0);
assert.ok(R.displayTerms(R.terms('BHYT')).includes('bao hiem y te'),'Highlight the full phrase when searching its acronym');
assert.equal(R.score({title:'Mục khác',human:'Không liên quan',hay:R.searchable('https://example.org/bao-hiem-y-te')},R.terms('BHYT')),-1);
assert.ok(R.score({...fixture('bảo hiểm y tế'),title:'Bảo hiểm y tế'},R.terms('BHYT')) > R.score({...fixture('bảo hiểm y tế'),title:'Khác'},R.terms('BHYT')));
const html=read('index.html');
const share=readFileSync(new URL('../og.png',import.meta.url));
assert.equal(share.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
assert.equal(share.readUInt32BE(16),1200);assert.equal(share.readUInt32BE(20),630);
assert.ok(html.includes('property="og:image:width" content="1200"') && html.includes('property="og:image:height" content="630"'));
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

const canonicalShareImage='https://quangpao.github.io/HowToLiveBetter/og.png';
for(const [path,source] of Object.entries(sitePages())){
  assert.ok(source.includes('<main') && source.includes('lang="vi"'),path);
  assert.ok(source.includes('canonical'),path);
  for(const match of source.matchAll(/#entry-([a-z0-9-]+)/g))assert.ok(catalog.byId.has(match[1]),path+' broken entry '+match[1]);
  assert.ok(source.includes(canonicalShareImage),path+' must use the live share card');
  const themeScript=source.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(themeScript && source.indexOf(themeScript[0])<source.indexOf('<link rel="stylesheet"'),path+' must set theme before styles/first paint');
  for(const [stored,system,blocked,expected] of [['dark',false,false,true],['light',true,false,false],[null,true,false,true],[null,true,true,true]]){
    let dark;
    vm.runInNewContext(themeScript[1],{localStorage:{getItem(){if(blocked)throw Error('blocked');return stored;}},matchMedia:()=>({matches:system}),document:{documentElement:{classList:{toggle:(name,value)=>{assert.equal(name,'dark');dark=value;}}}}});
    assert.equal(dark,expected,path+' wrong first-paint theme');
  }
}
const pages=sitePages();
for(const ext of ['pdf','epub','html','apkg'])assert.ok(pages['tai-ve/index.html'].includes('releases/download/epub-latest/HowToLiveBetter.'+ext));
assert.ok(!pages['ve-cam-nang/index.html'].includes('Google Analytics'));
for(const path of ['assets/book-reader.js','assets/site-pages.js'])new vm.Script(read(path));
new vm.Script([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1]);
console.log(`PASS: reader search/audience, all ${entries.length} catalogue entries, quote splitting and 5 static entry points`);
