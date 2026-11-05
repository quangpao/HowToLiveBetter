// Quy tắc tách lợi ích, ghi chú, nguồn có hai bản: tools/lib/split-items.mjs (EPUB, PDF) và đoạn
// <split-rules> trong index.html (trang tra cứu, bản offline một file). Script này lấy từng mục trong cả sách so kết quả tách của hai bên,
// tiện thể kiểm xem tách xong có ghép lại đúng từng chữ thành văn bản gốc không, cặp ** in đậm có bị tách sang hai khối không.
// Cách dùng: node tools/check-split.mjs     có vấn đề thì mã thoát 1
import { readdirSync } from 'node:fs';
import vm from 'node:vm';
import { read, readBook } from './lib/book.mjs';
import { splitGain, splitSrc } from './lib/split-items.mjs';

const html = read('index.html');
const m = html.match(/\/\/ <split-rules>[\s\S]*?\/\/ <\/split-rules>/);
if (!m) { console.error('Không tìm thấy đoạn // <split-rules> … // </split-rules> trong index.html'); process.exit(1); }
const ctx = {};
vm.runInNewContext(`${m[0]}\nthis.splitGain = splitGain; this.splitSrc = splitSrc;`, ctx);

const { docFiles } = readBook();
const files = [...readdirSync(new URL('../book/', import.meta.url)).filter(f => f.endsWith('.md')).map(f => `book/${f}`), ...docFiles];
const problems = [];
let total = 0, split = 0;
for (const f of files) {
  read(f).split('\n').forEach((line, i) => {
    const mm = line.match(/^\s*- (Lợi ích|Ghi chú|Pháp luật Việt Nam|Nguồn):(.*)$/);
    if (!mm) return;
    const [, label, body] = mm;
    const at = `${f}:${i + 1}（${label}）`;
    const isSrc = label === 'Nguồn';
    const lib = isSrc ? splitSrc(body) : splitGain(body);
    const web = isSrc ? ctx.splitSrc(body) : ctx.splitGain(body);
    total++;
    if (lib.length > 1) split++;
    if (JSON.stringify(lib) !== JSON.stringify(web)) problems.push(`${at}: split-items.mjs tách thành ${lib.length} khối, index.html tách thành ${web.length} khối`);
    if (!isSrc && lib.join('') !== body) problems.push(`${at}: tách xong không ghép lại được nội dung gốc`);
    if (lib.length > 1 && lib.some(c => (c.match(/\*\*/g) || []).length % 2)) problems.push(`${at}: có một khối mà ** không thành cặp, phần in đậm bị tách đôi`);
  });
}
for (const p of problems) console.log(p);
console.log(`${files.length} file, ${total} trường lợi ích/ghi chú/nguồn, tách ra ${split} trường, ${problems.length} chỗ có vấn đề`);
process.exit(problems.length ? 1 : 0);
