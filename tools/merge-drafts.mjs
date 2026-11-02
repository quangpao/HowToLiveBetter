// Ghép các file nháp (book/.drafts/0X-nhom-*.md) vào file chương theo ĐÚNG thứ tự số mục.
// Người điều phối giữ việc merge: agent viết nháp, không agent nào được ghi thẳng vào file chương.
//   node tools/merge-drafts.mjs book/05-dung-lang-phi-tien.md book/.drafts/05-nhom-*.md
//   node tools/merge-drafts.mjs --write  …   (mặc định chỉ in ra, không ghi)
// Từ chối khi: trùng số mục, số mục đã có trong chương bị ghi đè mà không có --force,
// hoặc khoảng số mục bị thiếu so với file gốc (cảnh báo, không chặn — chương đang viết dở).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const write = args.includes('--write');
const force = args.includes('--force');
const [target, ...drafts] = args.filter(a => !a.startsWith('--'));
if (!target || !drafts.length) {
  console.error('Cách dùng: node tools/merge-drafts.mjs [--write] [--force] <file-chương> <nháp...>');
  process.exit(2);
}

const splitBlocks = text => (text.match(/^### \d+\.[\s\S]*?(?=^### \d+\.|(?![\s\S]))/gm) || []);
const blocksOf = text => new Map(splitBlocks(text).map(b => [Number(b.match(/^### (\d+)\./)[1]), b.trimEnd()]));

const current = readFileSync(target, 'utf8');
const cur = blocksOf(current);
// phần đầu chương: mọi thứ trước khối "### 1." đầu tiên
const firstAt = current.search(/^### \d+\./m);
const head = firstAt === -1 ? current.trimEnd() : current.slice(0, firstAt).trimEnd();

const incoming = new Map();
const problems = [];
for (const file of drafts) {
  if (!existsSync(file)) { problems.push(`${file}: không tồn tại`); continue; }
  for (const [n, block] of blocksOf(readFileSync(file, 'utf8'))) {
    if (incoming.has(n)) { problems.push(`mục ${n}: có ở cả hai nháp (${incoming.get(n).file} và ${file})`); continue; }
    incoming.set(n, { block, file });
  }
}

for (const [n] of incoming) {
  if (cur.has(n) && !force) problems.push(`mục ${n}: đã có trong ${target}; muốn thay thì thêm --force`);
}

const merged = new Map(cur);
for (const [n, v] of incoming) merged.set(n, v.block);
const nums = [...merged.keys()].sort((a, b) => a - b);

const missing = [];
for (let i = 1; i <= nums[nums.length - 1]; i++) if (!merged.has(i)) missing.push(i);

console.log(`Chương: ${target}`);
console.log(`  hiện có ${cur.size} mục · nháp đem vào ${incoming.size} mục · sau khi ghép ${merged.size} mục`);
console.log(`  thêm mới: ${[...incoming.keys()].filter(n => !cur.has(n)).sort((a, b) => a - b).join(', ') || '(không)'}`);
console.log(`  thay thế: ${[...incoming.keys()].filter(n => cur.has(n)).sort((a, b) => a - b).join(', ') || '(không)'}`);
if (missing.length) console.log(`  còn thiếu trong dải 1…${nums[nums.length - 1]}: ${missing.join(', ')}`);

if (problems.length) {
  console.error('\nKHÔNG GHÉP ĐƯỢC:');
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}

const out = head + '\n\n' + nums.map(n => merged.get(n)).join('\n\n') + '\n';
if (write) {
  writeFileSync(target, out);
  console.log(`\nĐã ghi ${target} (${nums.length} mục).`);
} else {
  console.log('\n(chưa ghi gì — thêm --write để ghi)');
}
