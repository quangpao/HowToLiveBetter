// Kiểm tra "nói dễ hiểu": dòng này là đoạn nổi bật nhất trên thẻ của trang tra cứu, phần lớn người đọc chỉ nhìn nó.
// 2026-09-28 issue #42 phàn nàn văn phong giống máy viết, ví dụ nêu ở chương 1 mục 33 một dòng viết số bệnh viện,
// số ca bệnh, cách chia nhóm, còn dùng những cách nói kiểu "đầu bên kia", "đầu ra", "kết cục sạch" buộc người đọc phải tự dịch.
// Đây đều là lối viết CLAUDE.md đã cấm từ lâu, chỉ vì không có máy kiểm nên viết mãi lại quay về.
//
//   node tools/check-plain.mjs          # liệt kê mọi chỗ "nói dễ hiểu" chưa đạt, có thì mã thoát 1 (dùng cho CI)
//   node tools/check-plain.mjs --stat     # chỉ đếm theo từng quy tắc
//   node tools/check-plain.mjs --numbers  # kiểm thêm mục ③, dùng khi soi tay
//
// Mặc định kiểm ①②④, mục ③ phải thêm --numbers mới kiểm. Nó báo nhầm quá nhiều nên không vào CI: số đường dây nóng (120, 12356),
// số tiền nêu làm ví dụ trong mục luật pháp và tiền bạc ("vay 1000 đồng") đều bị coi là số mới, mà đó là cách viết hợp lệ.
// Kiểm bốn thứ:
// ① Độ dài: trong 120 chữ (không tính khoảng trắng).
// ② Thuật ngữ nghiên cứu: viết tắt thống kê, thiết kế nghiên cứu, cỡ mẫu. Người đọc quan tâm hướng và độ lớn, không quan tâm ai làm, làm trên bao nhiêu người.
// ③ Số mới: mọi chữ số Ả Rập trong "nói dễ hiểu" đều phải xuất hiện ở tiêu đề, chi phí hoặc lợi ích của cùng mục đó.
//    "Nói dễ hiểu" chỉ dịch lại cột lợi ích, không được thêm số. Cách nói bằng chữ như "bốn phần mười", "một phần tư" thì không kiểm.
// ④ Giọng trừu tượng: ẩn dụ và sáo ngữ buộc người đọc tự dịch lại, danh sách xem VAGUE. Chỉ thu những từ từng thực sự gây vấn đề,
//    thà bỏ sót còn hơn báo nhầm, báo nhầm nhiều thì chẳng ai xem nữa.
// Cắt dòng dùng /\r?\n/, lý do xem phần đầu file check-refs.mjs.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STAT = process.argv.includes('--stat');
const NUMBERS = process.argv.includes('--numbers');
const MAX = 235;   // ký tự, không tính khoảng trắng; mục tiêu viết là ~220

const JARGON = [
  [/\b(HR|RR|OR|CI|RCT|OR值)\b/, 'viết tắt thống kê'],
  [/phân tích gộp|tổng quan hệ thống|nghiên cứu thuần tập|hồi cứu|tiến cứu|nhóm chứng|nhóm giả dược|mù đôi|ngẫu nhiên hoá/i, 'thiết kế nghiên cứu'],
  [/\bn\s*=\s*\d/i, 'cỡ mẫu'],
  [/cỡ mẫu|người tham gia|đối tượng tham gia/i, 'cỡ mẫu'],
  [/nhóm đối chứng|nhóm can thiệp|nhóm giả dược|nhóm kia/i, 'chia nhóm'],
];
const VAGUE = ['nói chung là', 'về cơ bản', 'về bản chất', 'suy cho cùng', 'nói cách khác',
  'giá trị cốt lõi', 'giải pháp toàn diện', 'đầu tư cho bản thân'];

// So sánh theo giá trị, không theo mặt chữ: "0,28" và "0.28", "10.527" và "10527" là cùng một số.
// Tiếng Việt ngược với tiếng Anh: dấu chấm là hàng nghìn, dấu phẩy là phần thập phân.
const NUM_RE = /\d{1,3}(?:\.\d{3})+(?:,\d+)?|\d+(?:,\d+)?/g;
const toNum = x => Number(x.replace(/\./g, '').replace(',', '.'));
function numbers(s) {
  // số hiệu văn bản (168/2024/NĐ-CP, 36/2024/QH15) và ngày tháng không phải khẳng định về lượng
  const t = s
    // số điện thoại (096.306.1414, 1900 1267) là địa chỉ, không phải số liệu
    .replace(/\b0\d{2}[.\s]?\d{3}[.\s]?\d{3,4}\b/g, ' ')
    .replace(/\b1900[.\s]?\d{3,4}\b/g, ' ')
    .replace(/\d+\s*\/\s*\d{4}\s*\/\s*[A-Za-zĐđ]/g, ' ')
    .replace(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/g, ' ')
    .replace(/\b1900\s+(\d{4})\b/g, '1900$1');
  return [...t.matchAll(NUM_RE)].map(m => toNum(m[0])).filter(Number.isFinite);
}
// Số n trong "nói dễ hiểu" có tính là dịch từ p ở cột lợi ích không: làm tròn (45.6 → 46, 5801 → 5800),
// hoặc tỉ số nguy cơ đổi thành mức giảm (0.72 → giảm 28%, 0.53 → giảm 47%). Lệch trong 5% đều tính.
function derived(n, p) {
  const near = (a, b) => a === b || Math.abs(a - b) <= 0.05 * Math.max(Math.abs(a), Math.abs(b));
  return near(n, p) || near(n / 100, p) || (p < 1 && near(n / 100, 1 - p)) || (p > 1 && p < 100 && near(n, 100 - p))
    || near(n * 1e6, p) || near(n * 1e5, p) || near(n * 1e3, p);
}

const bad = [];
const count = { 'độ dài': 0, 'thuật ngữ': 0, 'số mới': 0, 'trừu tượng': 0 };
let total = 0;

const files = readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).sort();
for (const f of files) {
  const sec = Number(f.slice(0, 2));
  const lines = readFileSync(resolve(ROOT, 'book', f), 'utf8').split(/\r?\n/);
  let no = 0, title = '', fields = {};
  const flush = () => {
    const plain = fields['Nói dễ hiểu'];
    if (!no || plain == null) return;
    total++;
    const where = `chương ${sec} mục ${no}`;
    const problems = [];
    const len = [...plain.replace(/\s/g, '')].length;
    if (len > MAX) { problems.push(`${len} ký tự, quá ${MAX}`); count['độ dài']++; }
    const jar = JARGON.filter(([re]) => re.test(plain)).map(([re, name]) => `${name}「${plain.match(re)[0]}」`);
    if (jar.length) { problems.push(...jar); count['thuật ngữ']++; }
    if (NUMBERS) {
      const pool = numbers([title, fields['Chi phí'] ?? '', fields['Lợi ích'] ?? '', fields['Pháp luật Việt Nam'] ?? ''].join(' '));
      const isPhone = n => [111, 112, 113, 114, 115].includes(n) || String(n).startsWith('1900') || /^0\d{9,10}$/.test(String(n));
      // Số nằm giữa hai mốc đã nêu ở Chi phí/Lợi ích ("250.000 đến 400.000") coi như suy ra được
      const sorted = [...pool].sort((a, b) => a - b);
      const inRange = n => sorted.some((a, i) => { const b = sorted[i + 1]; return b !== undefined && b / a > 1.2 && n > a && n < b; });
      const fresh = [...new Set(numbers(plain))].filter(n => !isPhone(n) && !inRange(n) && !pool.some(p => derived(n, p)));
      if (fresh.length) { problems.push(`số không có trong Chi phí/Lợi ích: ${fresh.join(', ')}`); count['số mới']++; }
    }
    const vague = VAGUE.filter(w => plain.includes(w));
    if (vague.length) { problems.push(`cách nói trừu tượng "${vague.join('", "')}"`); count['trừu tượng']++; }
    if (problems.length) bad.push(`${f}  ${where}: ${problems.join('; ')}`);
  };
  for (const line of lines) {
    const h = line.match(/^### (\d+)\. (.*)$/);
    if (h) { flush(); no = Number(h[1]); title = h[2]; fields = {}; continue; }
    const m = line.match(/^- (Nói dễ hiểu|Chi phí|Lợi ích|Pháp luật Việt Nam):(.*)$/);
    if (m && no) fields[m[1]] = m[2];
  }
  flush();
}

if (!STAT) for (const b of bad) console.log(b);
console.log(`\n"Nói dễ hiểu" ${total} mục, ${bad.length} chỗ chưa đạt: ` +
  Object.entries(count).map(([k, v]) => `${k} ${v}`).join(', '));
if (bad.length && !STAT) process.exit(1);
