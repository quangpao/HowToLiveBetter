// Đồng bộ số liệu: sửa xong các mục thì chạy một lần. Làm bốn việc theo thứ tự:
// ① Tính lại số liệu thống kê của cả sách, ghi ngược vào README.md, index.html, tools/og.html;
// ② Gọi check-refs.mjs tính lại docs/doi-chieu-muc.md, gọi updates.mjs tính lại updates.json;
// ③ Gọi check-plain.mjs kiểm "nói dễ hiểu", chỗ chưa đạt chỉ nhắc chứ không dừng;
// ④ Dùng Typst dựng ảnh og.png từ nội dung và số liệu trong tools/og.html.
//
//   node tools/sync-stats.mjs                   # làm tất cả
//   node tools/sync-stats.mjs --no-screenshot   # không chụp ảnh
//   node tools/sync-stats.mjs --check           # chỉ so ① không ghi, có số liệu cũ thì mã thoát 1 (dùng cho CI)
//
// Ảnh chia sẻ dùng cùng Typst ghim trong workflow PDF và phông nhúng của Typst.
// --no-screenshot giữ tương thích lệnh cũ; có thể dựng riêng bằng node tools/og/build.mjs.
// CI --check kiểm số liệu, job build dựng lại ảnh để đối chiếu og.png.
//
// 2026-09-29 chuyển từ sync-stats.ps1 sang, file ps1 đã xóa: nó chỉ chạy trên Windows,
// PR bên ngoài merge thẳng trên web hoàn toàn không đi qua nó, số liệu cũ rồi cũng không có kiểm tra nào báo đỏ.
// Ở bước ① chỉ thay đúng con số, không động vào chữ nào khác.
// Cách đếm: số mục = số tiêu đề ### trong book/*.md; số chương = số file book/*.md;
// A/B/C = chữ cái đầu của dòng mức bằng chứng (có hậu tố "(tranh luận)" vẫn tính); tranh luận = số mục có ghi chú mở đầu bằng "tranh luận";
// TODO = số dòng trong nội dung có "chưa kiểm chứng" hoặc "TODO"; liên kết = tổng số http(s) trong các dòng "- Nguồn:", "- Ghi chú:" và "- Pháp luật Việt Nam:";
// Quy tắc ba mức đáng làm nằm trong tools/lib/book.mjs, chép từ index.html.
// Cắt dòng dùng /\r?\n/, lý do xem phần đầu file check-refs.mjs.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { COST_W as W, ratioOf } from './lib/book.mjs';
import {writeReaderData} from './reader-data.mjs';
import {writeSitePages} from './site-pages.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const read = f => readFileSync(join(ROOT, f), 'utf8');

// Quy tắc mức (tools/lib/book.mjs) phải khớp hai dòng COST_W và e.ratio trong index.html; hai dòng đó đổi thì bên kia phải đổi theo, nên so một lần trước
const indexText = read('index.html');
const COST_W_LINE = "const COST_W = { money:{'0':0,'ít':1,'nhiều':2}, time:{'ít':0,'vừa':1,'nhiều':2}, will:{'không':0,'ít':1,'có':2} };";
const RATIO_LINE = "e.ratio = e.level === 'lớn' ? (e.cs === 0 ? 'rất cao' : (e.cs <= 2 ? 'cao' : 'trung bình'))";
if (!indexText.includes(COST_W_LINE)) throw new Error('Dòng COST_W của index.html đã đổi, hãy đồng bộ trọng số chi phí trong tools/lib/book.mjs');
if (!indexText.includes(RATIO_LINE)) throw new Error('Dòng e.ratio của index.html đã đổi, hãy đồng bộ quy tắc mức trong tools/lib/book.mjs');

// Chỉ đếm chương bản Việt (bản Trung còn trong book/ để tham chiếu, nhận ra bằng "- Chi phí:")
const bookFiles = readdirSync(join(ROOT, 'book')).filter(f => f.endsWith('.md')).sort()
  .filter(f => read(join('book', f)).includes('- Chi phí:'));
const sections = bookFiles.length;
let entries = 0, dispute = 0, todo = 0, links = 0;
const grade = { A: 0, B: 0, C: 0 };
const ratio = { 'rất cao': 0, 'cao': 0, 'trung bình': 0 };
// Bảng giá trị của "nhóm=" trong nhãn chi phí, ứng một-một với WHO_LABEL trong index.html và nút "Hoàn cảnh của tôi" ở thanh bên
const WHO = new Set(['nữ', 'nam', 'trẻ-em', 'trẻ-sơ-sinh', 'trẻ-nhỏ', 'cao-tuổi', 'người-già', 'người-cao-tuổi',
  '65-tuổi', '60-tuổi', '50-tuổi', '45-tuổi', '40-tuổi', '35-tuổi', 'nữ-40-tuổi',
  'mang-thai', 'hút-thuốc', 'tim-mạch', 'nam-quan-hệ-đồng-giới']);
const badWho = [];

for (const f of bookFiles) {
  for (const line of read(join('book', f)).split(/\r?\n/)) {
    if (line.startsWith('### ')) entries++;
    const g = line.match(/^- Mức bằng chứng:\s*([ABC])/);
    if (g) grade[g[1]]++;
    if (/^- Ghi chú:\s*tranh luận/i.test(line)) dispute++;
    if (/^- /.test(line) && /chưa kiểm chứng|chưa tra được|TODO/.test(line)) todo++;
    if (/^- (Nguồn|Ghi chú|Pháp luật Việt Nam):/.test(line)) links += (line.match(/https?:\/\//g) ?? []).length;
    const t = line.match(/<!--\s*nhãn:\s*tiền=(\S+)\s+thời-gian=(\S+)\s+ý-chí=(\S+)\s+lợi-ích=(\S+)\s+thước-đo=/);
    if (t) ratio[ratioOf(W.money[t[1]] + W.time[t[2]] + W.will[t[3]], t[4])]++;
    const w = line.match(/<!--\s*nhãn:.*\snhóm=(\S+)/);
    if (w) for (const v of w[1].split(/[,+]/)) if (!WHO.has(v)) badWho.push(`${f}：${v}`);
  }
}
if (badWho.length) { console.error(`Nhãn nhóm có giá trị lạ (chỉ nhận: ${[...WHO].join(', ')}):\n  ${badWho.join('\n  ')}`); process.exitCode = 1; }

const tagged = ratio['rất cao'] + ratio['cao'] + ratio['trung bình'];
if (tagged !== entries) console.warn(`Cảnh báo: ${entries - tagged} mục thiếu dòng nhãn, ba mức đáng làm không khớp số mục`);
if (grade.A + grade.B + grade.C !== entries) console.warn('Cảnh báo: số dòng "Mức bằng chứng" không khớp số mục');

// Ba mức phần trăm chia theo phương pháp số dư lớn nhất: làm tròn xuống trước, số điểm phần trăm còn lại bù theo phần thập phân từ lớn tới nhỏ.
// Ba số làm tròn riêng lẻ sẽ ra 99 hoặc 101 (gặp phải ngày 2026-09-21 khi thêm chương 33), ở đây bảo đảm cộng lại đúng 100.
const ORDER = ['rất cao', 'cao', 'trung bình'];
const pct = {}, rem = {};
for (const k of ORDER) {
  const exact = ratio[k] * 100 / entries;
  pct[k] = Math.floor(exact);
  rem[k] = exact - pct[k];
}
const short = 100 - ORDER.reduce((s, k) => s + pct[k], 0);
for (const k of [...ORDER].sort((a, b) => rem[b] - rem[a]).slice(0, Math.max(short, 0))) pct[k]++;

console.log(`Mục ${entries} · chương ${sections} · A ${grade.A} B ${grade.B} C ${grade.C} · tranh luận ${dispute} · TODO ${todo} · liên kết ${links}`);
console.log(`Đáng làm: rất cao ${ratio['rất cao']} (${pct['rất cao']}%) · cao ${ratio['cao']} (${pct['cao']}%) · trung bình ${ratio['trung bình']} (${pct['trung bình']}%)`);
console.log('');

// Số mục của từng chương để dòng mục lục trong README khớp theo: dòng có dạng
// "1. [Tên](book/01-….md) — 48 mục: …". Trước đây chỉ một dòng và ghi tổng số mục của cả sách,
// sang chương thứ hai là sai ngay.
const perChapter = bookFiles.map(f => [f, read(join('book', f)).split(/\r?\n/).filter(l => l.startsWith('### ')).length]);
const EDITS = [
  ['tools/og.html', 'số mục trên ảnh chia sẻ', /(?<=data-stat="mục">)\d+(?=<)/g, String(entries)],
  ['tools/og.html', 'số mục bằng chứng A', /(?<=data-stat="A">)\d+(?=<)/g, String(grade.A)],
  ['tools/og.html', 'số liên kết nguồn', /(?<=data-stat="nguồn">)\d+(?=<)/g, String(links)],
  // Ba badge ở đầu README trước đây ghi tay nên lệch dần (95 mục, A65 B48 C9 trong khi sách đã 140 mục).
  // Ghi theo dạng đã mã hóa URL để khớp đúng chuỗi trong badge, không đụng tới màu và tham số khác.
  ['README.md', 'badge số mục', /(?<=badge\/mục-)\d+(?=-18794e)/g, String(entries)],
  ['README.md', 'badge mức bằng chứng', /(?<=badge\/bằng%20chứng-)A%20\d+%20·%20B%20\d+%20·%20C%20\d+(?=-915930)/g,
    `A%20${grade.A}%20·%20B%20${grade.B}%20·%20C%20${grade.C}`],
  ['README.md', 'badge số liên kết', /(?<=badge\/nguồn-)\d+(?=%20liên%20kết-565a5f)/g, String(links)],
  // Ba con số nằm trong câu văn (không phải badge) cũng lệch y như badge khi thêm chương: đoạn mở đầu,
  // câu thống kê mức bằng chứng, câu thống kê mức đáng làm. Thay cả câu theo mẫu để không phải đoán
  // vị trí từng con số; mẫu neo vào chữ Việt nên đổi lời văn thì phải sửa luôn dòng ở đây.
  ['README.md', 'số mục ở đoạn mở đầu', /^\d+(?= mục, mỗi mục ghi rõ)/gm, String(entries)],
  ['README.md', 'câu thống kê mức bằng chứng',
    /^\d+ mục hiện có: A \d+ mục, B \d+ mục, C \d+ mục\./gm,
    `${entries} mục hiện có: A ${grade.A} mục, B ${grade.B} mục, C ${grade.C} mục.`],
  ['README.md', 'câu thống kê mức đáng làm',
    /^\d+ mục hiện có: rất cao \d+ mục \(\d+%\), cao \d+ mục \(\d+%\), trung bình \d+ mục \(\d+%\)\./gm,
    `${entries} mục hiện có: rất cao ${ratio['rất cao']} mục (${pct['rất cao']}%), cao ${ratio['cao']} mục (${pct['cao']}%), trung bình ${ratio['trung bình']} mục (${pct['trung bình']}%).`],
];
for (const [f, n] of perChapter) {
  // Lookbehind để giữ nguyên phần "N. [Tên](book/…md) — " và chỉ thay con số
  const esc = f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  EDITS.push(['README.md', `số mục ${f}`, new RegExp(`(?<=\\]\\(book/${esc}\\)[^\\n]*?— )\\d+(?= mục:)`, 'g'), String(n)]);
}

const texts = new Map();
const stale = [];
for (const [file, label, pattern, repl] of EDITS) {
  const text = texts.get(file) ?? read(file);
  const found = [...text.matchAll(pattern)];
  if (found.length === 0) { console.log(`  ${file} ${label}: không thấy mẫu, bỏ qua`); continue; }
  const old = found[0][1] ?? found[0][0];
  // Dùng hàm làm giá trị thay thế, để ký tự $ trong chuỗi thay thế không bị hiểu là tham chiếu nhóm
  const updated = text.replace(pattern, () => repl);
  texts.set(file, updated);
  if (updated === text) {
    console.log(`  ${file} ${label}: ${old} (không đổi)`);
    continue;
  }
  stale.push(`${file} ${label}`);
  console.log(`  ${file} ${label}: ${old} -> ${CHECK ? 'đã cũ' : `đã cập nhật (${found.length} chỗ)`}`);
}

// Chương nào có trong book/ mà không có dòng trong mục lục README thì trang tra cứu, EPUB, PDF và
// bản offline đều lặng lẽ thiếu chương đó — không có cổng nào khác bắt được lỗi này.
// Mỗi chương phải được link đúng hai chỗ: dòng "N. [Tên](book/…md)" trong ## Mục lục, và ô "Xem ở đâu"
// của bảng ## Cuốn sách này trả lời câu gì. Chỉ có một link nghĩa là bảng câu hỏi còn ghi
// "đang biên soạn" dù chương đã viết xong — đúng kiểu lệch đã xảy ra lúc viết tới chương 22.
const readmeNow = texts.get('README.md') ?? read('README.md');
const linkCount = f => readmeNow.split(`](book/${f})`).length - 1;
const missingToc = bookFiles.filter(f => linkCount(f) === 0);
const missingQuestions = bookFiles.filter(f => linkCount(f) === 1);
if (missingToc.length) {
  console.error(`Mục lục README thiếu chương: ${missingToc.join(', ')}. Thêm dòng "N. [Tên](book/…md) — N mục: …" vào mục ## Mục lục.`);
  badWho.push('mục lục README thiếu chương');
  process.exitCode = 1;
}
if (missingQuestions.length) {
  console.error(`Bảng câu hỏi README chưa link chương: ${missingQuestions.join(', ')}. Ô "Xem ở đâu" phải là "[N. Tên](book/…md)", không để "đang biên soạn".`);
  badWho.push('bảng câu hỏi README thiếu chương');
  process.exitCode = 1;
}

if (CHECK) {
  if (stale.length === 0 && !badWho.length) {
    writeReaderData(true); writeSitePages(true);
    console.log('\nKiểm tra số liệu: đạt');
    process.exit(0);
  }
  if (stale.length === 0) process.exit(1);   // Chỉ có lỗi nhãn nhóm, đã báo ở trên
  console.log(`\nCó ${stale.length} chỗ số liệu đã cũ. Chạy node tools/sync-stats.mjs ở máy (kèm dựng lại og.png), rồi commit.`);
  process.exit(1);
}

for (const [file, text] of texts) if (text !== read(file)) writeFileSync(join(ROOT, file), text);

// ② Tính lại bảng đối chiếu tham chiếu: chèn hay xóa một mục làm mọi "mục X" phía sau lệch hàng loạt, mà số mục sau khi lệch
// thường vẫn nằm trong khoảng hợp lệ (6 chỗ ở chương 7 ngày 2026-09-19 là vậy), chỉ khi trải "tham chiếu → tiêu đề đích" ra và commit,
// diff mới thấy được. Đặt trước bước chụp ảnh, để --no-screenshot vẫn chạy tới đây
const runTool = name => spawnSync(process.execPath, [join(ROOT, 'tools', name)], { stdio: 'inherit' }).status;
console.log('');
if (runTool('check-refs.mjs') !== 0) throw new Error('check-refs.mjs thất bại');
console.log('Trước khi commit liếc qua diff của docs/doi-chieu-muc.md: số mục không đổi mà "mục được trỏ tới" đổi thì đó là tham chiếu bị dồn lệch.');

// Mới cập nhật: dấu "mới" "đã sửa" trên trang tra cứu, thay đổi chưa commit trong vùng làm việc tính là hôm nay
console.log('');
if (runTool('updates.mjs') !== 0) throw new Error('updates.mjs thất bại');
writeReaderData(); writeSitePages();

// ③ Kiểm "nói dễ hiểu" chỉ nhắc không dừng: số liệu đã đồng bộ xong, dừng ở đây lại làm người ta tưởng thống kê chưa cập nhật. Trên CI nó vẫn báo đỏ
console.log('');
if (runTool('check-plain.mjs') !== 0) console.log('Các chỗ "nói dễ hiểu" chưa đạt liệt kê ở trên, sửa trước khi commit (quy tắc xem phần đầu tools/check-plain.mjs).');

if (process.argv.includes('--no-screenshot')) process.exit(0);

// ④ Dựng ảnh chia sẻ bằng cùng Typst đã ghim cho PDF. Không phụ thuộc Chrome/phông máy.
if (runTool('og/build.mjs') !== 0) throw new Error('Dựng og.png thất bại');
