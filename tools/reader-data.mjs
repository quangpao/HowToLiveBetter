// Compact catalogue for first paint/search. Full fields are read one chapter at a time.
// node tools/reader-data.mjs [--check]
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
import {read,ROOT,COST_W,ratioOf,readBook} from './lib/book.mjs';
import {readCatalog,refs} from './lib/references.mjs';
import {join} from 'node:path';

export function readerData() {
  const {BookReader:R} = vm.runInNewContext(read('assets/book-reader.js') + '; ({BookReader})');
  const book = readBook(), catalog = readCatalog();
  const reviews=JSON.parse(read('data/review-status.json')).entries;
  const hash = text => createHash('sha256').update(text).digest('hex');
  const intro = s => refs.withoutGroupIndex(s.intro.slice(s.intro.findIndex(line=>/^#{1,2} \d+\. /.test(line))+1).filter(line=>line.trim()));
  const sections = catalog.sections.map(s => ({n:s.n,title:s.title,file:s.file,hash:hash(read(s.file)),intro:intro(s),
    entries:s.entries.map(e => {
      const t=Object.fromEntries([...e.tags.matchAll(/([^\s=]+)=([^\s]+)/g)].map(m=>[m[1],m[2]]));
      const money=t['tiền'] || '', time=t['thời-gian'] || '', will=t['ý-chí'] || '', level=t['lợi-ích'] || '';
      const cs=(COST_W.money[money]||0)+(COST_W.time[time]||0)+(COST_W.will[will]||0);
      const hay=R.searchable(refs.plainText([e.title,e.cost,e.human,e.gain,e.legal,e.note,e.src].join(' ')));
      return {sec:e.sec,n:e.n,id:e.id,legacy:e.legacy||'',title:e.title,human:e.human,grade:e.grade,
        money,time,will,level,lens:t['thước-đo']||'',who:t['nhóm'] ? t['nhóm'].split(',').map(g=>g.split('+')) : [],
        cs,ratio:ratioOf(cs,level),isLegal:!!e.legal?.trim() || /(?:Bộ luật|Luật|Nghị định|Thông tư|Nghị quyết)[^;\n]{0,120}\b\d{1,4}\/(?:19|20)\d{2}\b/i.test(e.src),
        dispute:/^tranh luận/i.test(e.note),todo:/chưa kiểm chứng|chưa tra được|TODO/.test(e.src+e.gain+e.note+e.cost) || /^needs-/.test(reviews[e.id]?.status || ''),
        hay:[...new Set(hay.split(' '))].join(' ')};
    })}));
  return {schema:1,version:hash(book.bookFiles.map(read).join('\n')).slice(0,12),sections};
}
export function writeReaderData(check=false) {
  const path=join(ROOT,'data/reader-index.json'), text=JSON.stringify(readerData())+'\n';
  const same=existsSync(path) && readFileSync(path,'utf8')===text;
  if (check && !same) throw new Error('data/reader-index.json đã cũ: chạy node tools/reader-data.mjs');
  if (!check && !same) writeFileSync(path,text);
  console.log(`Reader catalogue: ${Buffer.byteLength(text)} bytes${check ? ' · khớp' : ''}`);
}
if (process.argv[1] && new URL(import.meta.url).pathname===process.argv[1]) writeReaderData(process.argv.includes('--check'));
