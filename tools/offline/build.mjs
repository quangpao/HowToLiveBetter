// Đóng index.html + README + book/*.md thành một file HTML tự chứa: bấm đúp là đọc được, không cần server, không cần mạng.
// Cách dùng: node tools/offline/build.mjs [đường dẫn đầu ra]   mặc định ghi dist/HowToLiveBetter.html
// Nội dung được nhúng thẳng vào window.__CORPUS__, init() của index.html thấy biến này là không gửi request nữa;
// liên kết tương đối trong site đổi thành địa chỉ online, ảnh thanh bên chuyển thành data URI, còn lại không đổi một chữ.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { ROOT, REPO, REPO_BRANCH, SITE, README_FILE, read, gitCommit, buildStamp } from '../lib/book.mjs';
import {readerData} from '../reader-data.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/HowToLiveBetter.html');
const STAMP = buildStamp();
const COMMIT = gitCommit();

// ---------- Nội dung ----------
const readme = read(README_FILE);
const files = [...new Set([...readme.matchAll(/\]\((book\/[^)]+\.md)\)/g)].map(m => m[1]))].sort();
if (!files.length) throw new Error(`${README_FILE} mục lục không có file nào trong book/ — bản offline sẽ rỗng`);
// Bài dài (docs/*.md) cũng phải mang theo: cửa sổ bài dài của trang tra cứu dựng chúng tại chỗ, bản offline mà thiếu thì chỉ còn
// một liên kết GitHub bấm không được. Danh sách lấy từ README, cùng một chỗ với hai bộ dựng EPUB và PDF.
const docs = [...new Set([...readme.matchAll(/\]\((docs\/[^)#/]+\.md)\)/g)].map(m => m[1]))].sort();
const corpus = {
  readme,
  parts: Object.fromEntries(files.map(f => [f, read(f)])),
  docs: Object.fromEntries(docs.map(f => [f, read(f)])),
  // dấu "mới cập nhật", do tools/updates.mjs sinh ra và được commit vào repo
  updates: JSON.parse(read('updates.json')),
  citations: JSON.parse(read('data/legal-references.json')),
  reviews: JSON.parse(read('data/review-status.json')),
  readerVersion: readerData().version,
};
// </script sẽ đóng thẻ script sớm; \/ trong chuỗi JS chính là /, nội dung không đổi
const corpusJson = JSON.stringify(corpus).replace(/<\/script/gi, '<\\/script');

// ---------- Trang ----------
let html = read('index.html');
html = html.replace('<script src="assets/book-references.js"></script>',()=>'<script>' + read('assets/book-references.js').replace(/<\/script/gi,'<\\/script') + '</script>');
html = html.replace('<script src="assets/book-citations.js"></script>',()=>'<script>' + read('assets/book-citations.js').replace(/<\/script/gi,'<\\/script') + '</script>');
html = html.replace('<script src="assets/book-reader.js"></script>',()=>'<script>' + read('assets/book-reader.js').replace(/<\/script/gi,'<\\/script') + '</script>');
const must = (needle, label) => {
  if (!html.includes(needle)) throw new Error(`Không tìm thấy${label} trong index.html, script bản offline phải sửa theo: ${needle}`);
};

// Script thống kê không được đi theo bản offline: bản sao người khác bấm đúp mở không nên gửi request ra ngoài, mất mạng còn phải chờ timeout
const GA_START = '<!-- ga:start', GA_END = '<!-- ga:end -->';
if(html.includes(GA_START) && html.includes(GA_END)) html = html.slice(0, html.indexOf(GA_START)) + html.slice(html.indexOf(GA_END) + GA_END.length);
// Chỉ tìm tên miền gọi ra ngoài: track() trong script chính có kiểm tra typeof, không có gtag vẫn chạy được, không tính là sót
if (/googletagmanager|google-analytics/.test(html)) throw new Error('Sau khi bỏ đoạn giữa hai dấu vẫn còn tên miền thống kê, bản offline sẽ gửi request ra ngoài');

// Liên kết tương đối mở ở máy là chết, đổi thành địa chỉ online
must('href="book/"', ' liên kết book/');
// Trang tự kiểm tra chưa dịch nên bản Việt chưa trỏ tới; có thì mới đổi sang link tuyệt đối
html = html
  .replaceAll(`href="${README_FILE}"`, `href="${REPO}/blob/${REPO_BRANCH}/${README_FILE}"`)
  .replaceAll('href="selfcheck.html"', `href="${SITE}selfcheck.html"`)  // nếu trang có link
  .replaceAll('href="book/"', `href="${REPO}/tree/${REPO_BRANCH}/book"`)
  .replace(/href="(tinh-huong|phap-luat|tai-ve|ve-cam-nang|kiem-chung)\/([^"\n]*)"/g,(_,page,fragment)=>`href="${SITE}${page}/${fragment}"`)
  .replaceAll('<a class="title" href="./"', `<a class="title" href="${SITE}"`);

// Nhúng minh họa bìa để bản một file không cần tải ảnh ngoài.
const cover = 'assets/life-evidence-cover.jpg';
if (html.includes(`src="${cover}"`)) {
  const data = readFileSync(resolve(ROOT, cover)).toString('base64');
  html = html.replace(`src="${cover}"`, `src="data:image/jpeg;base64,${data}"`);
}

// Chân trang ghi rõ đây là bản offline của phiên bản nào
const foot = '<div class="foot">';
must(foot, 'phần chân trang');
const commitNote = COMMIT ? `, bản nội dung ${COMMIT.slice(0, 7)}` : '';
html = html.replace(foot, `${foot}<p class="offline-stamp">Bản offline, dựng lúc ${STAMP} (giờ Việt Nam)${commitNote}; nội dung còn cập nhật, lấy <a href="${SITE}">bản online</a> làm chuẩn.</p>`);

// Nội dung phải có mặt trước script chính
const mainScript = '\n<script>\n/* ---------- PERF-PANEL';
must(mainScript, 'đoạn đầu script chính');
html = html.replace(mainScript, () => `\n<script>window.__CORPUS__=${corpusJson}</script>${mainScript}`);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
const kb = n => (n / 1024 | 0) + ' KB';
console.log(`Đã tạo ${OUT}: ${files.length} file nội dung, ${docs.length} bài dài, ${kb(Buffer.byteLength(html))} (trong đó nội dung ${kb(Buffer.byteLength(corpusJson))})`);
