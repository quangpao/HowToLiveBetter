// Cổng kiểm cho FILE NHÁP của một nhóm mục (book/.drafts/05-nhom-X.md).
// Dùng khi nhiều người/agent viết song song: file nháp chưa nằm trong README nên
// check-plain/check-refs không nhìn thấy nó; script này kiểm đúng những luật mà
// check-plain/check-split sẽ kiểm sau khi merge — bắt lỗi trước khi merge.
//   node tools/check-draft.mjs book/.drafts/05-nhom-A.md [more files...]
import { readFileSync } from 'node:fs';

const LIMIT = 235;                 // "Nói dễ hiểu": số ký tự KHÔNG tính khoảng trắng
const FIELDS = ['Chi phí', 'Nói dễ hiểu', 'Lợi ích', 'Mức bằng chứng', 'Nguồn', 'Ghi chú'];
const OPTIONAL_FIELDS = ['Pháp luật Việt Nam']; // không bắt buộc với các mục không chứa quy định pháp luật
const LABEL_OK = {
  'tiền': ['0', 'ít', 'nhiều'],
  'thời-gian': ['ít', 'vừa', 'nhiều'],
  'ý-chí': ['không', 'ít', 'có'],
  'lợi-ích': ['vừa', 'lớn'],
  'thước-đo': null,                // chương 5 dùng 'tiền'; để mở cho chương sau
};

const norm = s => s.replace(/\s+/g, '');
const nums = s => new Set((s.match(/\d+(?:[.,]\d+)*/g) || []).map(x => x.replace(/\./g, '')));

function checkBlock(block, problems, file) {
  const head = block.match(/^### (\d+)\.\s*(.+)$/m);
  if (!head) { problems.push(`${file}: có khối không mở đầu bằng "### N. …"`); return null; }
  const n = Number(head[1]);
  const add = m => problems.push(`${file} mục ${n}: ${m}`);

  const labelLine = block.match(/<!--\s*nhãn:\s*(.+?)-->/);
  if (!labelLine) add('thiếu dòng <!-- nhãn: … -->');
  else {
    const kv = Object.fromEntries(labelLine[1].trim().split(/\s+/).map(x => x.split('=')));
    for (const [k, ok] of Object.entries(LABEL_OK)) {
      if (!(k in kv)) add(`nhãn thiếu khóa "${k}"`);
      else if (ok && !ok.includes(kv[k])) add(`nhãn ${k}=${kv[k]} không hợp lệ (chỉ ${ok.join('/')})`);
    }
  }

  const field = name => {
    const re = new RegExp(`^- ${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:(.*)$`, 'm');
    const m = block.match(re);
    return m ? m[1].trim() : null;
  };

  const vals = {};
  for (const f of FIELDS) {
    const v = field(f);
    vals[f] = v;
    if (v === null) add(`thiếu dòng "- ${f}:"`);
    else if (!v) add(`dòng "- ${f}:" để trống`);
  }

  for (const f of OPTIONAL_FIELDS) {
    const v = field(f);
    if (v !== null) {
      vals[f] = v;
      if (!v) add(`dòng "- ${f}:" để trống`);
    }
  }

  if (vals['Mức bằng chứng'] && !/^[ABC]$/.test(vals['Mức bằng chứng'])) add(`Mức bằng chứng "${vals['Mức bằng chứng']}" phải là A, B hoặc C`);

  const plain = vals['Nói dễ hiểu'] || '';
  const len = norm(plain).length;
  if (len > LIMIT) add(`Nói dễ hiểu ${len} ký tự (không tính khoảng trắng) — quá ${len - LIMIT}`);

  const allowed = nums((vals['Chi phí'] || '') + ' ' + (vals['Lợi ích'] || '') + ' ' + (vals['Pháp luật Việt Nam'] || ''));
  const missing = [...nums(plain)].filter(x => !allowed.has(x));
  if (missing.length) add(`Nói dễ hiểu có số không xuất hiện ở Chi phí/Lợi ích/Pháp luật Việt Nam: ${missing.join(', ')}`);

  const src = vals['Nguồn'] || '';
  if (!/https?:\/\//.test(src)) add('Nguồn không có liên kết nào');
  if (/thuvienphapluat\.vn/.test(src)) add('Nguồn dẫn thuvienphapluat.vn (bị cấm, chỉ được dùng để tìm)');
  if (/TODO|chưa viết|XXX/i.test(block)) add('còn chỗ đánh dấu TODO/chưa viết');

  const note = vals['Ghi chú'] || '';
  if (norm(note).length < 400) add(`Ghi chú chỉ ${norm(note).length} ký tự — thường là thiếu bẫy Việt Nam`);

  // Chữ Hán lọt vào phần tiếng Việt (tiêu đề giữ Hán là lỗi, thân mục cũng vậy)
  const han = block.match(/[\u4e00-\u9fff]/g);
  if (han) add(`còn ${han.length} chữ Hán trong khối`);

  return n;
}

const files = process.argv.slice(2);
if (!files.length) { console.error('Cách dùng: node tools/check-draft.mjs <file-nháp.md> [...]'); process.exit(2); }

let bad = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const blocks = text.split(/^(?=### \d+\.)/m).filter(b => /^### \d+\./.test(b));
  const problems = [];
  const seen = [];
  for (const b of blocks) {
    const n = checkBlock(b, problems, file);
    if (n !== null) {
      if (seen.length && n <= seen[seen.length - 1]) problems.push(`${file} mục ${n}: số mục không tăng dần (sau ${seen[seen.length - 1]})`);
      seen.push(n);
    }
  }
  const ok = problems.length === 0;
  if (!ok) bad++;
  console.log(`${ok ? '✓' : '✗'} ${file}: ${blocks.length} khối, mục ${seen[0] ?? '-'}…${seen[seen.length - 1] ?? '-'}${ok ? '' : `, ${problems.length} vấn đề`}`);
  for (const p of problems) console.log('   - ' + p);
}
process.exit(bad ? 1 : 0);
