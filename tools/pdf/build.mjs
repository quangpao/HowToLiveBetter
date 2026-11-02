// Dàn README + book/*.md + docs/*.md thành một quyển PDF: pandoc chuyển Markdown sang typst, typst dàn trang.
// Cách dùng: node tools/pdf/build.mjs [đường dẫn đầu ra]   mặc định ghi dist/HowToLiveBetter.pdf
// Cần pandoc (≥3.1, phải có đầu ra typst) và typst (≥0.13) trên PATH, hoặc dùng biến môi trường PANDOC, TYPST trỏ đường dẫn.
// Bố cục nằm trong tools/pdf/template.typ; không sửa một chữ nào của nội dung, chỉ làm ba việc:
// bỏ dòng "← Về mục lục", gắn neo cho tiêu đề mỗi chương, đổi liên kết trong repo thành nhảy trong sách hoặc địa chỉ GitHub.
import { writeFileSync, mkdirSync, statSync } from 'node:fs';
import { resolve, dirname, posix, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, REPO, SITE, TITLE, README_FILE, read, readBook, gitCommit, buildStamp, stripBackLink } from '../lib/book.mjs';
import { splitLongItems } from '../lib/split-items.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/HowToLiveBetter.pdf');
const WORK = resolve(ROOT, 'dist/pdf-build.md');
const PANDOC = process.env.PANDOC ?? 'pandoc';
const TYPST = process.env.TYPST ?? 'typst';
const STAMP = buildStamp();          // chuỗi "(giờ Việt Nam)" được ghi trong template và trang thông tin phiên bản; giá trị truyền cho pandoc giữ thuần ASCII
const COMMIT = gitCommit();

const { description, frontMd, contentsMd, bookFiles, docFiles } = readBook();

// ---------- Trang (mỗi trang một tiêu đề cấp 1, tiêu đề cấp 1 sang trang mới trong typst) ----------
const anchorOf = new Map();
bookFiles.forEach(f => anchorOf.set(f, 'sec-' + (basename(f).match(/^\d+/)?.[0] ?? anchorOf.size + 1)));
docFiles.forEach((f, i) => anchorOf.set(f, `doc-${i + 1}`));

const pages = [
  { src: README_FILE, md: `# Lời mở\n\n${description}\n\n${frontMd}`, anchor: 'front' },
  { src: README_FILE, md: contentsMd.replace(/^## Mục lục/, '# Tóm tắt các chương'), anchor: 'contents' },
  ...[...bookFiles, ...docFiles].map(src => ({ src, md: splitLongItems(stripBackLink(read(src))), anchor: anchorOf.get(src) })),
  { src: README_FILE, md: aboutMd(), anchor: 'about' },
];

function aboutMd() {
  const commitLine = COMMIT ? `- Commit tương ứng: ${COMMIT.slice(0, 7)}\n` : '';
  return `# Thông tin phiên bản

Quyển PDF này được dàn tự động từ nội dung Markdown trong repo, nội dung đổi là dàn lại một quyển mới. Phiên bản đang cầm:

- Thời điểm dựng: ${STAMP} (giờ Việt Nam)
${commitLine}- Tải bản mới nhất, tra cứu online, góp ý: ${REPO}
- Trang tra cứu online (lọc theo từ khoá, chương, mức bằng chứng và chi phí, lưu được thành một file offline): ${SITE}

Liên kết trỏ tới chương khác trong sách đã đổi thành nhảy trong sách; liên kết trỏ tới bản ghi kiểm chứng, giấy phép và các file không dàn vào sách đã đổi thành địa chỉ GitHub.

Nội dung phát hành theo CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Được đăng lại, chỉnh sửa, dùng cho mục đích thương mại, miễn ghi rõ nguồn "Cẩm nang sống thông minh" kèm liên kết repo, bản có sửa nội dung phải ghi rõ là đã sửa.`;
}

// ---------- Liên kết: trong sách đổi thành neo, ngoài sách đổi thành địa chỉ tuyệt đối ----------
function rewriteLinks(md, src) {
  return md.replace(/\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (all, href, title) => {
    if (/^(https?:|mailto:)/.test(href)) return all;
    // Neo trỏ tới mục của chính README (kiểu #mục-lục) không chắc có trong sách, nên trỏ về README trên GitHub
    if (href.startsWith('#')) return `](${REPO}/blob/main/README.md${href}${title ?? ''})`;
    const [path] = href.split('#');
    const target = posix.normalize(posix.join(posix.dirname(src), path));
    const anchor = anchorOf.get(target);
    if (anchor) return `](#${anchor}${title ?? ''})`;
    const kind = target.endsWith('/') ? 'tree' : 'blob';
    return `](${REPO}/${kind}/main/${target}${title ?? ''})`;
  });
}

const body = pages.map(p => {
  const md = rewriteLinks(p.md, p.src)
    .replace(/<!--[\s\S]*?-->/g, '')                       // chú thích HTML kiểu nhãn chi phí không vào PDF
    .replace(/^(# .+?)\s*$/m, `$1 {#${p.anchor}}`);        // gắn neo cho tiêu đề cấp 1 của trang này
  if (!md.includes(`{#${p.anchor}}`)) throw new Error(`Không thấy tiêu đề cấp 1 trong ${p.src}, không gắn được neo`);
  return md.trim();
}).join('\n\n');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(WORK, body);

// ---------- pandoc → typst → pdf ----------
const run = (cmd, args) => {
  try {
    return execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (err) {
    if (err.code === 'ENOENT') throw new Error(`Không tìm thấy ${cmd}, hãy cài nó hoặc dùng biến môi trường ${cmd === PANDOC ? 'PANDOC' : 'TYPST'} trỏ tới file thực thi`);
    throw new Error(`${cmd} thất bại:\n${err.stderr || err.stdout || err.message}`);
  }
};

const typFile = resolve(ROOT, 'dist/pdf-build.typ');
run(PANDOC, [
  '--from=gfm+attributes', '--to=typst', '--wrap=none',
  `--template=${resolve(ROOT, 'tools/pdf/template.typ')}`,
  '-V', `booktitle=${TITLE}`, '-V', `subtitle=${description}`,
  '-V', `builddate=${STAMP}`, '-V', `commit=${COMMIT.slice(0, 7) || 'không rõ'}`,
  '-V', `site=${SITE}`, '-V', `repo=${REPO}`,
  '-o', typFile, WORK,
]);
const log = run(TYPST, ['compile', typFile, OUT, '--root', ROOT]);
if (log.trim()) console.log(log.trim());

const entries = pages.filter(p => bookFiles.includes(p.src))
  .reduce((n, p) => n + p.md.split('\n').filter(l => l.startsWith('### ')).length, 0);
console.log(`Đã tạo ${OUT}: ${bookFiles.length} chương ${entries} mục, phụ lục ${docFiles.length} bài, ${(statSync(OUT).size / 1048576).toFixed(1)} MB`);
