// Kiểm liên kết hỏng: gửi request lần lượt tới mọi liên kết ngoài trong nội dung và bài dài, báo ra những cái không mở được.
//
//   node tools/check-links.mjs              # kiểm toàn bộ, kết quả in ra terminal; trong GitHub Actions còn ghi vào job summary
//   node tools/check-links.mjs --limit 50   # chỉ kiểm 50 liên kết đầu, dùng khi chạy thử ở máy
//
// Chỉ báo cáo, mã thoát luôn là 0: những site như gov.cn khi truy cập từ nước ngoài lúc được lúc không, lấy nó chặn build chỉ thành đỏ mỗi ngày.
// Kết quả chia hai mức. "Chắc chắn hỏng" chỉ nhận 404 và 410, cùng DOI không tra thấy ở cơ quan đăng ký doi.org, mức này phải quay lại sửa.
// "Không kết nối được" là timeout, 403, 5xx..., phần nhiều do bên kia chặn IP máy chủ hoặc lỗi tạm thời, kéo dài mấy tuần mới đáng xem.
//
// DOI không mở trang nhà xuất bản: các site như Wiley, SAGE trả 403 với mọi request máy, kiểm cũng vô ích.
// Hỏi thẳng API cơ quan đăng ký của doi.org, nó chỉ trả lời "DOI này có tồn tại không", đúng thứ cần ở đây.
import { readFileSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg > 0 ? Number(process.argv[limitArg + 1]) : Infinity;
const CONCURRENCY = 8;
const TIMEOUT = 20000;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

// Lấy liên kết từ đâu: từng chương trong book/, bài dài ngay dưới docs/ (bản ghi kiểm chứng là trạng thái lịch sử, không kiểm), README.
const files = [
  ...readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).map(f => `book/${f}`),
  ...readdirSync(resolve(ROOT, 'docs')).filter(f => f.endsWith('.md') && f !== 'doi-chieu-muc.md').map(f => `docs/${f}`),
  'README.md',
];

// url -> vị trí xuất hiện đầu tiên
const where = new Map();
for (const f of files) {
  readFileSync(resolve(ROOT, f), 'utf8').split(/\r?\n/).forEach((line, i) => {
    // Liên kết ở cột nguồn viết dạng <url>, cả đoạn trong ngoặc nhọn là liên kết, dấu ngoặc trong DOI (10.1016/S0140-6736(15)01225-8)
    // cũng giữ nguyên; liên kết viết trần cắt theo khoảng trắng và dấu câu tiếng Trung, rồi bỏ dấu ngoặc đóng lẻ ở cuối.
    const found = [...line.matchAll(/<(https?:\/\/[^>\s]+)>/g)].map(m => m[1]);
    const rest = line.replace(/<https?:\/\/[^>\s]+>/g, '');
    for (const m of rest.matchAll(/https?:\/\/[^\s<>（）「」，。；、"'`\]]+/g)) {
      let url = m[0].replace(/[.,;:]+$/, '');
      while (url.endsWith(')') && (url.match(/\(/g) ?? []).length < (url.match(/\)/g) ?? []).length) url = url.slice(0, -1);
      found.push(url);
    }
    for (const url of found) if (!where.has(url)) where.set(url, `${f}:${i + 1}`);
  });
}
// Không kiểm huy hiệu, chính trang tra cứu, liên kết tải Release: chúng không phải nguồn, hỏng thì cũng có chỗ khác phát hiện trước.
const SKIP = /img\.shields\.io|quangpao\.github\.io|\/releases\/download\/|localhost/;
// Không ít site cơ quan địa phương còn dùng bộ mã hóa cũ hoặc chuỗi chứng chỉ không đầy đủ, Node bắt tay báo lỗi ngay, trình duyệt vẫn mở bình thường.
// Loại này để riêng một mức, không trộn với loại thật sự không kết nối được.
const TLS = /^(ERR_SSL_|UNABLE_TO_VERIFY|CERT_|SELF_SIGNED|DEPTH_ZERO)/;
const urls = [...where.keys()].filter(u => !SKIP.test(u)).slice(0, LIMIT);

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('quá thời gian chờ')), ms))]);

async function checkDoi(doi) {
  const r = await withTimeout(fetch(`https://doi.org/api/handles/${encodeURIComponent(doi)}`), TIMEOUT);
  if (r.status === 404) return { dead: true, why: 'doi.org không có DOI này' };
  if (!r.ok) return { dead: false, why: `doi.org trả về ${r.status}` };
  return null;
}

async function checkUrl(url) {
  const doi = /^https?:\/\/(?:dx\.)?doi\.org\/(.+)$/i.exec(url);
  if (doi) return checkDoi(decodeURIComponent(doi[1]));
  // Dùng GET trước chứ không HEAD: có site HEAD trả 403 mà GET bình thường (Sở Dược Hải Nam là vậy), dùng HEAD sẽ đoán nhầm thành liên kết chết.
  const r = await withTimeout(fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } }), TIMEOUT);
  r.body?.cancel().catch(() => {});
  if ([404, 410].includes(r.status)) return { dead: true, why: `${r.status}` };
  if (!r.ok) return { dead: false, why: `${r.status}` };
  return null;
}

const dead = [];
const flaky = [];
const tls = [];
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    try {
      const res = await checkUrl(url);
      if (res) (res.dead ? dead : flaky).push({ url, why: res.why, at: where.get(url) });
    } catch (e) {
      const why = e.cause?.code ?? e.message;
      (TLS.test(why) ? tls : flaky).push({ url, why, at: where.get(url) });
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const sortAt = a => a.sort((x, y) => x.at.localeCompare(y.at, 'zh'));
const lines = [
  `## Kiểm liên kết hỏng`,
  ``,
  `Đã kiểm ${urls.length} liên kết: chắc chắn hỏng ${dead.length}, không kết nối được ${flaky.length}, không tương thích bắt tay mã hóa ${tls.length}.`,
  ``,
  `### Chắc chắn hỏng (404, 410, DOI không tồn tại)`,
  ``,
  ...(dead.length ? sortAt(dead).map(d => `- ${d.at}　${d.why}　${d.url}`) : ['không có']),
  ``,
  `### Không kết nối được (timeout, 403, 5xx, phần nhiều do bên kia chặn IP máy chủ, kéo dài mấy tuần mới đáng xem)`,
  ``,
  ...(flaky.length ? sortAt(flaky).map(d => `- ${d.at}　${d.why}　${d.url}`) : ['không có']),
  ``,
  `### Không tương thích bắt tay mã hóa (site cơ quan cũ dùng kiểu mã hóa Node không nhận, trình duyệt thường mở được, không cần sửa)`,
  ``,
  ...(tls.length ? sortAt(tls).map(d => `- ${d.at}　${d.why}　${d.url}`) : ['không có']),
  ``,
];
console.log(lines.join('\n'));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n');
