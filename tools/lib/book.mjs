// Phân tích cấu trúc README và danh sách file: EPUB (tools/epub) và PDF (tools/pdf) dùng chung.
// Chỉ đọc cấu trúc trong README, không giữ danh sách file bằng tay — thêm một chương hay một bài dài,
// cả hai bộ dựng tự theo kịp.
//
// Bản Việt đọc `README.md` (giữ `README.cn.md` của bản gốc tiếng Trung làm tham chiếu).
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const README_FILE = 'README.md';
export const REPO = 'https://github.com/quangpao/HowToLiveBetter';
export const SITE = 'https://quangpao.github.io/HowToLiveBetter/';
export const TITLE = 'Cẩm nang sống thông minh';
export const RELEASE = `${REPO}/releases/download/epub-latest`;

// Luôn đưa cho các bộ dựng nội dung theo LF: trên Windows, core.autocrlf=true khiến file được checkout
// thành CRLF, script bản offline tìm mốc bằng '\n' trong index.html sẽ không thấy gì và báo "không tìm thấy
// đoạn đầu của script chính" (CI chạy Linux nên chưa bao giờ gặp). Bộ đọc nội dung cũng khỏi phải tự xử lý \r.
export const read = p => readFileSync(resolve(ROOT, p), 'utf8').replace(/\r\n/g, '\n');
export const unique = arr => [...new Set(arr)];

export function gitCommit() {
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return process.env.GITHUB_SHA ?? '';
  }
}

// Nội dung có thể sửa vài lần trong ngày, chỉ ghi ngày thì không biết là bản nào, nên ghi tới phút.
// CI chạy trên UTC, thống nhất hiển thị giờ Việt Nam để người tải đối chiếu đúng ngày.
export function buildStamp() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh', dateStyle: 'short', timeStyle: 'short' }).format(new Date());
}

export function stripBackLink(md) {
  return md.replace(/^\[← Về mục lục\]\([^)]*\)\s*\n/, '');
}

// Một đoạn trong README: từ标题 mở đầu tới tiêu đề kế tiếp
export function readBook() {
  const readme = read(README_FILE);
  const lines = readme.split('\n');
  const between = (from, to) => {
    const a = lines.findIndex(l => l.startsWith(from));
    const b = lines.findIndex((l, i) => i > a && l.startsWith(to));
    if (a < 0 || b < 0) throw new Error(`${README_FILE}: không thấy đoạn từ "${from}" đến "${to}"`);
    return lines.slice(a, b).join('\n');
  };
  const description = between(`# ${TITLE}`, '[![')
    .split('\n').slice(1).map(l => l.replace(/<[^>]+>/g, '').trim()).filter(Boolean).join('');
  const frontMd = between('## Cuốn sách này trả lời câu gì', '## Mục lục');
  const contentsMd = between('## Mục lục', '## Nội dung')
    .split('\n\n').filter(p => !p.includes('index.html')).join('\n\n');
  const bookFiles = unique([...contentsMd.matchAll(/\]\((book\/[^)#]+\.md)\)/g)].map(m => m[1]));
  const docFiles = unique([...readme.matchAll(/\]\((docs\/[^)#/]+\.md)\)/g)].map(m => m[1]));
  if (bookFiles.length === 0) throw new Error(`${README_FILE}: mục lục không có file nào trong book/`);
  return { readme, description, frontMd, contentsMd, bookFiles, docFiles };
}

// Ba mức "đáng làm": khớp với COST_W và e.ratio trong index.html; sync-stats.mjs so lại mỗi lần chạy.
// Số liệu thống kê và nhãn bộ thẻ Anki dùng chung bảng này.
export const COST_W = {
  money: { '0': 0, 'ít': 1, 'nhiều': 2 },
  time: { 'ít': 0, 'vừa': 1, 'nhiều': 2 },
  will: { 'không': 0, 'ít': 1, 'có': 2 },
};

export function ratioOf(cost, level) {
  if (level === 'lớn') return cost === 0 ? 'rất cao' : cost <= 2 ? 'cao' : 'trung bình';
  return level === 'vừa' && cost === 0 ? 'cao' : 'trung bình';
}
