// Đóng README + book/*.md + docs/*.md thành một quyển EPUB 3.
// Cách dùng: node tools/epub/build.mjs [đường dẫn đầu ra]   mặc định ghi dist/HowToLiveBetter.epub
// Chỉ phụ thuộc marked; zip tự đóng bằng tools/lib/zip.mjs (EPUB đòi mimetype đứng đầu và không nén, thư viện zip thông dụng không bảo đảm).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, posix } from 'node:path';
import { zip } from '../lib/zip.mjs';
import { Marked, Tokenizer } from 'marked';
import { splitLongItems } from '../lib/split-items.mjs';
import { ROOT, REPO, REPO_BRANCH, SITE, TITLE, read, readBook, gitCommit, buildStamp, stripBackLink } from '../lib/book.mjs';
import { refs, readCatalog } from '../lib/references.mjs';
import { registry, validateCitations, annotateCitations, citationNotesMarkdown } from '../lib/citations.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/HowToLiveBetter.epub');
const RELEASE = `${REPO}/releases/download/epub-latest/HowToLiveBetter.epub`;
const BOOK_ID = 'urn:uuid:5c0c1c0e-6a5c-4d2b-9b1e-7d1f0a4e8c31';
const NOW = new Date();
const COMMIT = gitCommit();

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = html => html.replace(/<[^>]+>/g, '');

// ---------- Lấy nội dung và danh sách file từ README ----------
const book = readBook();
const catalog = readCatalog();
validateCitations(catalog);
const { description, frontMd, bookFiles, docFiles } = book;
const contentsMd = book.contentsMd.replace(/^## (?:Mục lục)/, '# Giới thiệu các chương');

// ---------- Danh sách trang ----------
// Mỗi trang: tên file xhtml, đường dẫn md nguồn trong repo (dùng để phân giải liên kết tương đối), nội dung md
const pages = [
  { file: 'front.xhtml', src: 'README.md', title: 'Lời mở', md: `# ${TITLE}\n\n${description}\n\n${frontMd}` },
  { file: 'contents.xhtml', src: 'README.md', title: 'Giới thiệu các chương', md: contentsMd },
  ...bookFiles.map((src, i) => ({ file: `ch${String(i + 1).padStart(2, '0')}.xhtml`, src, md: splitLongItems(stripBackLink(read(src))) })),
  ...docFiles.map((src, i) => ({ file: `doc${i + 1}.xhtml`, src, md: splitLongItems(stripBackLink(read(src))) })),
  { file:'legal-notes.xhtml', src:'legal-notes', title:'Trích dẫn pháp luật đã đối chiếu', md:citationNotesMarkdown(catalog) },
  { file: 'about.xhtml', src: 'README.md', title: 'Thông tin phiên bản', md: aboutMd() },
];
const pageByPath = new Map(pages.map(p => [p.src, p.file]));
pageByPath.set('README.md', 'front.xhtml');

function aboutMd() {
  const commitLine = COMMIT ? `- Commit tương ứng: [${COMMIT.slice(0, 7)}](${REPO}/commit/${COMMIT})` : '';
  return `# Thông tin phiên bản

Sách điện tử này được sinh tự động từ nội dung Markdown trong repo, nội dung đổi là sinh lại một quyển mới. Phiên bản đang cầm:

- Thời điểm dựng: ${buildStamp()} (giờ Việt Nam)
${commitLine}
- Tải bản mới nhất: ${RELEASE}
- Trang tra cứu online (lọc theo từ khóa, chương, mức bằng chứng và chi phí): ${SITE}
- Repo, góp ý, xem bản ghi kiểm chứng từng nguồn: ${REPO}

Liên kết trỏ tới file khác trong repo đã đổi thành nhảy trong sách; liên kết trỏ tới bản ghi kiểm chứng, giấy phép và các file không đưa vào sách đã đổi thành địa chỉ GitHub.

Nội dung phát hành theo CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Được đăng lại, chỉnh sửa, dùng cho mục đích thương mại, miễn ghi rõ nguồn "Cẩm nang sống thông minh" kèm liên kết repo, bản có sửa nội dung phải ghi rõ là đã sửa.`;
}

// ---------- Markdown → XHTML ----------
let current = null; // trang đang chuyển đổi
let headingSeq = 0;
const marked = new Marked({ gfm: true });
marked.use({
  // Tự tạo liên kết cho URL trần của GFM chỉ ngắt ở chỗ trắng, nên khi chữ dính ngay sau URL như
  // "www.12333.gov.cn trang web, ứng dụng 12333" thì cả chuỗi phía sau bị nuốt vào liên kết, epubcheck xử là URL không hợp lệ (RSC-020).
  // URL trần vốn không nên có ký tự ngoài ASCII, gặp là cắt tại đó, phần đầu cắt được vẫn tạo liên kết theo quy tắc mặc định.
  tokenizer: {
    url(src) {
      const tok = Tokenizer.prototype.url.call(this, src);
      if (!tok || /^[\x21-\x7e]*$/.test(tok.raw)) return tok;
      return Tokenizer.prototype.url.call(this, tok.raw.match(/^[\x21-\x7e]*/)[0]);
    },
  },
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const n = /^(\d+)\. /.exec(plain(html))?.[1];
      const entry = depth === 3 && catalog.sections.find(s => s.file === current.src)?.entries.find(e => e.n === n);
      const law = current.file === 'legal-notes.xhtml' && depth === 3 && registry.references[Number(n)-1];
      const id = entry ? 'entry-' + entry.id : law ? 'law-' + law.id : `h${++headingSeq}`;
      current.headings.push({ id, depth, text: plain(html) });
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const t = title && !title.startsWith('refs:') ? ` title="${esc(title)}"` : '';
      return `<a href="${esc(rewriteHref(href))}"${t}>${text}</a>`;
    },
    image: () => '',
    html: () => '',
  },
});

function rewriteHref(href) {
  if (/^#law-/.test(href)) return 'legal-notes.xhtml' + href;
  const stable = /^#entry-([a-z0-9-]+)$/.exec(href);
  if (stable && catalog.byId.has(stable[1])) return pageByPath.get(catalog.byId.get(stable[1]).file) + href;
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [pathPart, hash] = href.split('#');
  const target = posix.normalize(posix.join(posix.dirname(current.src), pathPart));
  const page = pageByPath.get(target);
  if (page) return hash ? `${page}#${hash}` : page;
  const kind = target.endsWith('/') ? 'tree' : 'blob';
  return `${REPO}/${kind}/${REPO_BRANCH}/${target}`;
}

function toXhtml(body) {
  return body
    .replace(/<(br|hr)>/g, '<$1/>')
    .replace(/<(img|input)\b([^>]*?)\s*\/?>/g, '<$1$2/>')
    .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
}

function wrap(title, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="vi" lang="vi">
<head>
<meta charset="utf-8"/>
<title>${esc(title)}</title>
<link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
${body}</body>
</html>
`;
}

for (const p of pages) {
  current = p;
  p.headings = [];
  const annotated = annotateCitations(p.md,p.src,catalog,ref => '#law-' + ref.id);
  const body = toXhtml(marked.parse(refs.refreshLinks(annotated,catalog,p.src)));
  p.title ??= p.headings[0]?.text ?? p.file;
  p.xhtml = wrap(p.title, `<section epub:type="chapter">\n${body}</section>\n`);
}

// ---------- Điều hướng ----------
const navItems = pages.map(p => {
  const [first, ...rest] = p.headings;
  const top = first?.depth === 1 ? { href: `${p.file}#${first.id}`, text: p.title } : { href: p.file, text: p.title };
  const subs = (first?.depth === 1 ? rest : p.headings).filter(h => h.depth <= 3).map(h => ({ href: `${p.file}#${h.id}`, text: h.text }));
  return { ...top, subs };
});

const navXhtml = wrap('Mục lục', `<nav epub:type="toc" id="toc">
<h1>Mục lục</h1>
<ol>
${navItems.map(n => `<li><a href="${n.href}">${n.text}</a>${n.subs.length ? `\n<ol>\n${n.subs.map(s => `<li><a href="${s.href}">${s.text}</a></li>`).join('\n')}\n</ol>\n` : ''}</li>`).join('\n')}
</ol>
</nav>
<nav epub:type="landmarks" hidden="hidden">
<ol>
<li><a epub:type="cover" href="cover.xhtml">Bìa</a></li>
<li><a epub:type="bodymatter" href="${pages[2].file}">Nội dung</a></li>
</ol>
</nav>
`);

let play = 0;
const navPoint = n => `<navPoint id="np${++play}" playOrder="${play}"><navLabel><text>${n.text}</text></navLabel><content src="${n.href}"/>${n.subs?.map(navPoint).join('') ?? ''}</navPoint>`;
const ncx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="vi">
<head>
<meta name="dtb:uid" content="${BOOK_ID}"/>
<meta name="dtb:depth" content="2"/>
<meta name="dtb:totalPageCount" content="0"/>
<meta name="dtb:maxPageNumber" content="0"/>
</head>
<docTitle><text>${TITLE}</text></docTitle>
<navMap>
${navItems.map(navPoint).join('\n')}
</navMap>
</ncx>
`;

// ---------- Bìa, OPF, container ----------
const coverXhtml = wrap(TITLE, `<div class="cover"><img src="cover.png" alt="${esc(TITLE)}"/></div>\n`);
const modified = NOW.toISOString().replace(/\.\d{3}Z$/, 'Z');
const manifestPages = pages.map(p => `<item id="${p.file.replace('.xhtml', '')}" href="${p.file}" media-type="application/xhtml+xml"/>`);
const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="vi">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="pub-id">${BOOK_ID}</dc:identifier>
<dc:title>${TITLE}</dc:title>
<dc:language>vi</dc:language>
<dc:creator>quangpao</dc:creator>
<dc:contributor>eternity4719 (tác giả bản gốc)</dc:contributor>
<dc:description>${esc(description)}</dc:description>
<dc:source>${REPO}</dc:source>
<dc:rights>CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)</dc:rights>
<dc:date>${NOW.toISOString().slice(0, 10)}</dc:date>
<meta property="dcterms:modified">${modified}</meta>
<meta name="cover" content="cover-img"/>
</metadata>
<manifest>
<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
<item id="css" href="style.css" media-type="text/css"/>
<item id="cover-img" href="cover.png" media-type="image/png" properties="cover-image"/>
<item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>
${manifestPages.join('\n')}
</manifest>
<spine toc="ncx">
<itemref idref="cover"/>
${pages.map(p => `<itemref idref="${p.file.replace('.xhtml', '')}"/>`).join('\n')}
</spine>
</package>
`;
const container = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>
`;

// ---------- Đóng zip ----------
const entries = [
  { name: 'mimetype', data: Buffer.from('application/epub+zip'), store: true },
  { name: 'META-INF/container.xml', data: Buffer.from(container) },
  { name: 'OEBPS/content.opf', data: Buffer.from(opf) },
  { name: 'OEBPS/nav.xhtml', data: Buffer.from(navXhtml) },
  { name: 'OEBPS/toc.ncx', data: Buffer.from(ncx) },
  { name: 'OEBPS/style.css', data: readFileSync(resolve(ROOT, 'tools/epub/style.css')) },
  { name: 'OEBPS/cover.png', data: readFileSync(resolve(ROOT, 'og.png')) },
  { name: 'OEBPS/cover.xhtml', data: Buffer.from(coverXhtml) },
  ...pages.map(p => ({ name: `OEBPS/${p.file}`, data: Buffer.from(p.xhtml) })),
];
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, zip(entries, NOW));
const entryCount = pages.filter(p => p.file.startsWith('ch')).reduce((n, p) => n + p.headings.filter(h => h.depth === 3).length, 0);
console.log(`Đã tạo ${OUT}: ${bookFiles.length} chương ${entryCount} mục, phụ lục ${docFiles.length} bài, ${(entries.reduce((n, e) => n + e.data.length, 0) / 1024 | 0)} KB chưa nén`);

