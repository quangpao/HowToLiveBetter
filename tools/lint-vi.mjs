import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// node tools/lint-vi.mjs [--all] [--strict] [--json]
const ROOT = process.env.LINT_VI_ROOT || resolve(dirname(fileURLToPath(import.meta.url)), '..');
const flags = new Set(process.argv.slice(2));
const book = readdirSync(join(ROOT, 'book')).filter(x => /^\d\d-[a-z0-9-]+\.md$/.test(x)).sort();
const paths = book.map(x => 'book/' + x).concat(['README.md', 'docs/phap-luat-viet-nam.md', 'selfcheck.html']);
const forbidden = [
  [/bệnh mãn tính/iu, 'bệnh mạn tính'], [/ăn hại/iu, 'lệch tông y tế'],
  [/tính giá bỉ/iu, 'hiệu quả chi phí'], [/vạch đỏ/iu, 'lằn ranh đỏ'],
  [/ý định thực hiện/iu, 'kế hoạch nếu... thì...'],
  [/học tập ngắt khoảng/iu, 'ôn tập ngắt quãng']
];
const awkward = [
  [/việc thực hiện/iu, 'viết chủ động'], [/tiến hành thực hiện/iu, 'bỏ động từ rỗng'],
  [/một cách\s/iu, 'xem lại trạng từ'], [/bởi vì[^.!?]{0,160}cho nên/iu, 'rút gọn quan hệ từ']
];
const stat = /(?:^|[^\p{L}])(?:95\s*%\s*CI|(?:HR|RR|OR)\s*[=<>≈:]?\s*\d|p(?:-value)?\s*[<>=]\s*0[.,]\d|n\s*=\s*\d)/iu;
const acronyms = [
  ['BHYT', /bảo hiểm y tế/i], ['BHXH', /bảo hiểm xã hội/i],
  ['BHTN', /bảo hiểm thất nghiệp/i], ['TNCN', /thuế thu nhập cá nhân/i],
  ['OTC', /thuốc không kê đơn/i], ['CBT-I', /(?:trị liệu|liệu pháp) nhận thức.{0,20}hành vi/i],
  ['SIDS', /hội chứng đột tử ở trẻ sơ sinh/i]
];
const findings = [];
const add = (level, file, line, kind, message) => findings.push({level, file, line, kind, message});
const countWords = s => (s.trim().match(/\S+/gu) || []).length;
let items = 0;
for (const file of paths) {
  const lines = readFileSync(join(ROOT, file), 'utf8').split(/\r?\n/);
  const isBook = file.startsWith('book/');
  const defined = new Set();
  let prior = '', next = 1, fenced = false;
  for (let i = 0; i < lines.length; i++) {
    const original = lines[i];
    if (/^\s*\x60{3}/.test(original)) { fenced = !fenced; continue; }
    if (fenced || /^\s*<!--/.test(original) || /^- Nguồn:/.test(original)) continue;
    const row = original.replace(/https?:\/\/\S+/g, '').replace(/\x60[^\x60]+\x60/g, '');
    for (const [re, suggestion] of forbidden)
      if (re.test(row)) add('ERROR', file, i + 1, 'forbidden-term', suggestion);
    for (const [re, suggestion] of awkward)
      if (re.test(row)) add('WARN', file, i + 1, 'translationese', suggestion);
    if (!isBook) continue;
    const heading = original.match(/^### (\d+)\. /);
    if (heading) {
      items++;
      const no = +heading[1];
      if (no !== next) add('ERROR', file, i + 1, 'item-sequence', 'Cần mục ' + next + ', gặp ' + no);
      next = no + 1;
    }
    for (const [abbr, expanded] of acronyms) {
      if (defined.has(abbr)) continue;
      const re = new RegExp('(^|[^\\p{L}\\p{N}])' + abbr + '(?![\\p{L}\\p{N}])', 'u');
      const m = re.exec(row);
      if (!m) continue;
      defined.add(abbr);
      if (!expanded.test(prior + ' ' + row))
        add('WARN', file, i + 1, 'abbreviation', 'Giải nghĩa ' + abbr + ' lần đầu trong chương');
    }
    prior += ' ' + row;
    if (prior.length > 10000) prior = prior.slice(-10000);
    const m = original.match(/^- Nói dễ hiểu:\s*(.*)/);
    if (!m) continue;
    const content = m[1];
    if (stat.test(content))
      add('ERROR', file, i + 1, 'stats-in-plain', 'Chuyển chỉ số sang Ghi chú / Nguồn');
    const sentences = content.split(/(?<=[.!?])\s+/);
    const first = countWords(sentences[0] || '');
    if (first > 25) add('WARN', file, i + 1, 'opening-over-25', first + ' từ (>25)');
    if (sentences.some(x => countWords(x) > 40))
      add('WARN', file, i + 1, 'sentence-over-40', 'Câu dài hơn 40 từ');
  }
}
if (!flags.has('--no-integrity')) {
  if (book.length !== 35) add('ERROR', 'book/', 0, 'chapter-count', 'Dự kiến 35 chương');
  if (items !== 775) add('ERROR', 'book/', 0, 'item-count', 'Dự kiến 775 mục, hiện có ' + items);
}
const errors = findings.filter(x => x.level === 'ERROR').length;
const warnings = findings.length - errors;
if (flags.has('--json')) console.log(JSON.stringify({files:paths.length, items, errors, warnings, findings}, null, 2));
else {
  const limit = flags.has('--all') ? Infinity : 60;
  for (const f of findings.slice(0, limit))
    console.log(f.level + ' ' + f.file + ':' + f.line + ' [' + f.kind + '] ' + f.message);
  if (findings.length > limit) console.log('Còn ' + (findings.length - limit) + ' cảnh báo; dùng --all.');
  console.log('Đã quét ' + paths.length + ' file, ' + items + ' mục: ' + errors + ' ERROR, ' + warnings + ' WARN.');
}
if (errors || (flags.has('--strict') && warnings)) process.exitCode = 1;
