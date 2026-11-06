// Render the share card from the same copy/counters as tools/og.html.
// Typst is pinned with the PDF toolchain; embedded fonts keep output reproducible.
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {ROOT,read} from '../lib/book.mjs';

const html=read('tools/og.html'),plain=s=>s.replace(/<[^>]+>/g,'').trim();
const get=re=>{const m=html.match(re);if(!m)throw Error('tools/og.html thiếu trường ảnh chia sẻ');return m[1];};
const title=get(/<h1>([\s\S]*?)<\/h1>/).split('<br>');
if(title.length!==2)throw Error('Tiêu đề ảnh chia sẻ cần hai dòng');
const values={brand:plain(get(/<div class="brand">([\s\S]*?)<\/div>/)),
  title1:plain(title[0]),title2:plain(title[1]),description:plain(get(/<p>([\s\S]*?)<\/p>/)),
  filter:plain(get(/<div class="c">([^<]+)<\/div>/))};
for(const [key,stat] of [['items','mục'],['grade','A'],['sources','nguồn']])
  values[key]=get(new RegExp('data-stat="'+stat+'">(\\d+)</b>'));

const dir=mkdtempSync(join(tmpdir(),'hltb-og-')),out=join(dir,'og.png');
try{
  const args=['compile','--root',ROOT,'--ignore-system-fonts','--format','png','--ppi','72'];
  for(const [key,value] of Object.entries(values))args.push('--input',key+'='+value);
  args.push(resolve(ROOT,'tools/og/template.typ'),out);
  const result=spawnSync(process.env.TYPST||'typst',args,{cwd:ROOT,encoding:'utf8'});
  if(result.error || result.status!==0)throw Error('Không dựng được ảnh chia sẻ bằng Typst: '+(result.error?.message||result.stderr));
  const png=readFileSync(out);
  if(png.subarray(0,8).toString('hex')!=='89504e470d0a1a0a' || png.readUInt32BE(16)!==1200 || png.readUInt32BE(20)!==630 || png.length>2*1024*1024)
    throw Error('Ảnh chia sẻ phải là PNG 1200×630, không quá 2 MB');
  const target=resolve(ROOT,'og.png');
  if(process.argv.includes('--check')){
    if(!readFileSync(target).equals(png))throw Error('og.png đã cũ: chạy node tools/og/build.mjs rồi commit ảnh');
    console.log('Share card: PNG 1200×630 · khớp dữ liệu và mẫu dựng');
  }else{
    writeFileSync(target,png);
    console.log('Share card: PNG 1200×630 · '+png.length+' bytes');
  }
}finally{rmSync(dir,{recursive:true,force:true});}
