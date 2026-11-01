// 「说人话」检查：这一行是检索页卡片上最显眼的一段，读者多半只看它。
// 2026-09-28 issue #42 抱怨文风 AI 味重，举的第 1 节第 33 条一行里写了医院数、
// 病例数、分组，还用了「另一头」「产出」「干净的结局」这类要读者自己翻译的说法。
// 这些都是 CLAUDE.md 早就禁掉的写法，只是没有机器检查，写着写着就回来了。
//
//   node tools/check-plain.mjs          # 列出所有不合格的说人话，有则退出码 1（CI 用）
//   node tools/check-plain.mjs --stat     # 只按规则计数
//   node tools/check-plain.mjs --numbers  # 加查第 ③ 样，人工排查用
//
// 默认查 ①②④，第 ③ 样要加 --numbers 才查。它误报太多，不进 CI：热线号码（120、12356）、
// 法律和金钱条目里举例用的金额（「借 1000 元」）都会被当成新数字，而这些是合法写法。
// 检查四样：
// ① 长度：120 字以内（空格不算字）。
// ② 研究行话：统计缩写、研究设计、样本量。读者关心方向和量级，不关心谁做的、做了多少人。
// ③ 新数字：说人话里的每个阿拉伯数字都要在同一条的标题、成本或收益栏里出现过。
//    说人话只翻译收益栏，不许添数字。「四成多」「四分之一」这类汉字说法不查。
// ④ 抽象腔：要读者自己翻译一遍的比喻和套话，名单见 VAGUE。只收确实出过问题的词，
//    宁可漏也别误报，误报多了大家就不看了。
// 切行用 /\r?\n/，理由见 check-refs.mjs 文件头。
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const STAT = process.argv.includes('--stat');
const NUMBERS = process.argv.includes('--numbers');
const MAX = 235;   // ký tự, không tính khoảng trắng; mục tiêu viết là ~220

const JARGON = [
  [/\b(HR|RR|OR|CI|RCT|OR值)\b/, '统计缩写'],
  [/队列|荟萃|综述|随机|对照组|安慰剂组|双盲|样本/, '研究设计'],
  [/\d[\d,.]*\s*(例|名受试者|名参与者|家医院|项研究|篇研究|个国家)/, '样本量'],
  [/那组|两组|各组|组的人/, '分组'],
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
// 说人话里的 n 算不算从收益栏的 p 翻译过来的：四舍五入（45.6 → 46，5801 → 5800），
// 或者风险比换成降幅（0.72 → 低 28%，0.53 → 低 47%）。差 5% 以内都算。
function derived(n, p) {
  const near = (a, b) => a === b || Math.abs(a - b) <= 0.05 * Math.max(Math.abs(a), Math.abs(b));
  return near(n, p) || near(n / 100, p) || (p < 1 && near(n / 100, 1 - p)) || (p > 1 && p < 100 && near(n, 100 - p))
    || near(n * 1e6, p) || near(n * 1e5, p) || near(n * 1e3, p);
}

const bad = [];
const count = { 长度: 0, 行话: 0, 新数字: 0, 抽象腔: 0 };
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
    if (len > MAX) { problems.push(`${len} ký tự, quá ${MAX}`); count.长度++; }
    const jar = JARGON.filter(([re]) => re.test(plain)).map(([re, name]) => `${name}「${plain.match(re)[0]}」`);
    if (jar.length) { problems.push(...jar); count.行话++; }
    if (NUMBERS) {
      const pool = numbers([title, fields['Chi phí'] ?? '', fields['Lợi ích'] ?? ''].join(' '));
      const isPhone = n => [111, 112, 113, 114, 115].includes(n) || String(n).startsWith('1900') || /^0\d{9,10}$/.test(String(n));
      // Số nằm giữa hai mốc đã nêu ở Chi phí/Lợi ích ("250.000 đến 400.000") coi như suy ra được
      const sorted = [...pool].sort((a, b) => a - b);
      const inRange = n => sorted.some((a, i) => { const b = sorted[i + 1]; return b !== undefined && b / a > 1.2 && n > a && n < b; });
      const fresh = [...new Set(numbers(plain))].filter(n => !isPhone(n) && !inRange(n) && !pool.some(p => derived(n, p)));
      if (fresh.length) { problems.push(`số không có trong Chi phí/Lợi ích: ${fresh.join(', ')}`); count.新数字++; }
    }
    const vague = VAGUE.filter(w => plain.includes(w));
    if (vague.length) { problems.push(`抽象说法「${vague.join('」「')}」`); count.抽象腔++; }
    if (problems.length) bad.push(`${f}  ${where}：${problems.join('；')}`);
  };
  for (const line of lines) {
    const h = line.match(/^### (\d+)\. (.*)$/);
    if (h) { flush(); no = Number(h[1]); title = h[2]; fields = {}; continue; }
    const m = line.match(/^- (Nói dễ hiểu|Chi phí|Lợi ích):(.*)$/);
    if (m && no) fields[m[1]] = m[2];
  }
  flush();
}

if (!STAT) for (const b of bad) console.log(b);
console.log(`\n"Nói dễ hiểu" ${total} mục, ${bad.length} chỗ chưa đạt: ` +
  Object.entries(count).map(([k, v]) => `${k} ${v}`).join('，'));
if (bad.length && !STAT) process.exit(1);
