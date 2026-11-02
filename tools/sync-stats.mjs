// 统计对齐：改完条目跑一次。按顺序做四件事：
// ① 重算全书的统计数字，回写 README.md、index.html、tools/og.html；
// ② 调 check-refs.mjs 重算 docs/引用对照.md，调 updates.mjs 重算 updates.json；
// ③ 调 check-plain.mjs 查说人话，不合格只提示不中断；
// ④ 用无头 Chrome 把 tools/og.html 重新截成 og.png。
//
//   node tools/sync-stats.mjs                   # 全做
//   node tools/sync-stats.mjs --no-screenshot   # 不截图
//   node tools/sync-stats.mjs --check           # 只比对 ① 不写，有过时的数字则退出码 1（CI 用）
//
// Chrome 按常见安装位置找，装在别处就设环境变量 CHROME 指到可执行文件。
// og.html 用的是微软雅黑，Linux 上没有就会换成别的字体，截出来的图和 Windows 上不一样；
// CI 只跑 --check 不截图，也是这个原因。
//
// 2026-09-29 从 sync-stats.ps1 移植过来，ps1 已删：它只在 Windows 上跑，
// 网页上直接合并的外部 PR 完全经过不了它，数字过时了也没有任何检查会红。
// ① 只替换数字本身，不动任何其他文字。
// 数字口径：条目数 = book/*.md 里的 ### 标题数；节数 = book/*.md 的文件数；
// A/B/C = 证据等级行的首字母（带（争议）后缀的照样算）；争议 = 备注以「争议」开头的条数；
// TODO = 正文里含「待核实」或「TODO」的行数；链接 = 「- 来源：」和「- 备注：」行里的 http(s) 总数；
// 性价比三档的规则在 tools/lib/book.mjs，抄自 index.html。
// 切行用 /\r?\n/，理由见 check-refs.mjs 文件头。
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { COST_W as W, ratioOf } from './lib/book.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const read = f => readFileSync(join(ROOT, f), 'utf8');

// 档位规则（tools/lib/book.mjs）和 index.html 的 COST_W、e.ratio 两行一致；那两行改了那边必须跟着改，所以先比对一次
const indexText = read('index.html');
const COST_W_LINE = "const COST_W = { money:{'0':0,'ít':1,'nhiều':2}, time:{'ít':0,'vừa':1,'nhiều':2}, will:{'không':0,'ít':1,'có':2} };";
const RATIO_LINE = "e.ratio = e.level === 'lớn' ? (e.cs === 0 ? 'rất cao' : (e.cs <= 2 ? 'cao' : 'trung bình'))";
if (!indexText.includes(COST_W_LINE)) throw new Error('index.html 的 COST_W 行变了，请同步 tools/lib/book.mjs 里的成本权重');
if (!indexText.includes(RATIO_LINE)) throw new Error('index.html 的 e.ratio 行变了，请同步 tools/lib/book.mjs 里的档位规则');

// Chỉ đếm chương bản Việt (bản Trung còn trong book/ để tham chiếu, nhận ra bằng "- Chi phí:")
const bookFiles = readdirSync(join(ROOT, 'book')).filter(f => f.endsWith('.md')).sort()
  .filter(f => read(join('book', f)).includes('- Chi phí:'));
const sections = bookFiles.length;
let entries = 0, dispute = 0, todo = 0, links = 0;
const grade = { A: 0, B: 0, C: 0 };
const ratio = { 'rất cao': 0, 'cao': 0, 'trung bình': 0 };
// 成本标签里「人群=」的取值表，和 index.html 的 WHO_LABEL、侧栏「我的情况」按钮一一对应
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
    if (/chưa kiểm chứng|chưa tra được|TODO/.test(line)) todo++;
    if (/^- (Nguồn|Ghi chú):/.test(line)) links += (line.match(/https?:\/\//g) ?? []).length;
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

// 三档百分比用最大余数法分配：先向下取整，剩下的百分点按小数部分从大到小补。
// 三个数各自四舍五入会凑出 99 或者 101（2026-09-21 加第 33 节时碰到过），这里保证加起来正好 100。
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
  ['index.html', 'numberOfPages', /numberOfPages":(\d+)/g, `numberOfPages":${entries}`],
  ['tools/og.html', 'số mục trên ảnh chia sẻ', /(?<=data-stat="mục">)\d+(?=<)/g, String(entries)],
  ['tools/og.html', 'số mục bằng chứng A', /(?<=data-stat="A">)\d+(?=<)/g, String(grade.A)],
  ['tools/og.html', 'số liên kết nguồn', /(?<=data-stat="nguồn">)\d+(?=<)/g, String(links)],
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
  // 用函数做替换值，免得替换串里的 $ 被当成分组引用
  const updated = text.replace(pattern, () => repl);
  texts.set(file, updated);
  if (updated === text) {
    console.log(`  ${file} ${label}：${old}（未变）`);
    continue;
  }
  stale.push(`${file} ${label}`);
  console.log(`  ${file} ${label}：${old} -> ${CHECK ? '过时' : `已更新（${found.length} 处）`}`);
}

// Chương nào có trong book/ mà không có dòng trong mục lục README thì trang tra cứu, EPUB, PDF và
// bản offline đều lặng lẽ thiếu chương đó — không có cổng nào khác bắt được lỗi này.
const readmeNow = texts.get('README.md') ?? read('README.md');
const missingChapters = bookFiles.filter(f => !readmeNow.includes(`](book/${f})`));
if (missingChapters.length) {
  console.error(`Mục lục README thiếu chương: ${missingChapters.join(', ')}. Thêm dòng "N. [Tên](book/…md) — N mục: …" vào mục ## Mục lục.`);
  badWho.push('mục lục README thiếu chương');
  process.exitCode = 1;
}

if (CHECK) {
  if (stale.length === 0 && !badWho.length) {
    console.log('\n统计数字检查通过');
    process.exit(0);
  }
  if (stale.length === 0) process.exit(1);   // 只有人群标签的错，上面已经报过
  console.log(`\n有 ${stale.length} 处统计数字过时。本地跑 node tools/sync-stats.mjs（顺带重出 og.png），然后提交。`);
  process.exit(1);
}

for (const [file, text] of texts) if (text !== read(file)) writeFileSync(join(ROOT, file), text);

// ② 重算交叉引用对照表：插入或删除条目会让后面的「第 X 条」集体错位，而错位后的条号
// 往往仍在范围内（2026-09-19 第 7 节那 6 处就是），只有把「引用 → 目标标题」摊开入库，
// diff 才看得见。放在截图之前，--no-screenshot 也要跑到
const runTool = name => spawnSync(process.execPath, [join(ROOT, 'tools', name)], { stdio: 'inherit' }).status;
console.log('');
if (runTool('check-refs.mjs') !== 0) throw new Error('check-refs.mjs 失败');
console.log('提交前扫一眼 docs/引用对照.md 的 diff：条号没动而「指向的条目」变了，就是被顺延撞歪的引用。');

// 最近更新：检索页的「新增」「改过」标记，工作区里没提交的改动算今天
console.log('');
if (runTool('updates.mjs') !== 0) throw new Error('updates.mjs 失败');

// ③ 说人话检查只提示不中断：数字已经同步完了，卡在这里反而让人以为统计没更新。CI 里它会红
console.log('');
if (runTool('check-plain.mjs') !== 0) console.log('上面列出的说人话不合格，提交前改掉（规则见 tools/check-plain.mjs 文件头）。');

if (process.argv.includes('--no-screenshot')) process.exit(0);

// ④ 截 og.png
const CHROME_PATHS = [
  process.env.CHROME,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];
const chrome = CHROME_PATHS.find(p => p && existsSync(p));
if (!chrome) throw new Error('找不到 Chrome，设环境变量 CHROME 指到它，或者加 --no-screenshot 跳过截图');

// 每次用全新的 user-data-dir：否则 Chrome 会拿缓存里的旧 og.html 渲染，截出来还是旧数字。
// --screenshot 必须给绝对路径：给相对路径 Chrome 什么都不写，还照样返回 0
const profile = mkdtempSync(join(tmpdir(), 'og-shot-'));
const target = join(ROOT, 'og.png');
const startedAt = Date.now();
// Chrome 把「xxx bytes written」这类信息写在 stderr 上，不是报错，直接丢掉
spawnSync(chrome, [
  '--headless', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--window-size=1200,630', `--user-data-dir=${profile}`, `--screenshot=${target}`,
  pathToFileURL(join(ROOT, 'tools', 'og.html')).href,
], { stdio: 'ignore' });
rmSync(profile, { recursive: true, force: true });

// 自检：文件是这次写的、大小在正常区间。过了这两关就不必再打开图看，省一次读图的开销
const png = statSync(target);
if (png.mtimeMs < startedAt - 1000) throw new Error('og.png 没有被这次运行写入，截图失败了');
if (png.size < 120 * 1024 || png.size > 400 * 1024) throw new Error(`og.png 大小异常（${png.size} 字节），正常在 120KB 到 400KB，打开看一眼是不是渲染坏了`);
console.log(`\nog.png 已重出：${png.size} 字节，自检通过。改过 tools/og.html 的版式才需要打开图确认。`);
