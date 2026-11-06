// Static, accessible entry points; all excerpts/IDs come from the canonical book.
// node tools/site-pages.mjs [--check]
import {mkdirSync,writeFileSync,existsSync,readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {read,ROOT} from './lib/book.mjs';
import {readCatalog,refs} from './lib/references.mjs';
import {readerData} from './reader-data.mjs';

const escape = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text = value => escape(refs.plainText(value));
const link = e => '../?view=chapters#entry-' + e.id;
const release = 'https://github.com/quangpao/HowToLiveBetter/releases/download/epub-latest/HowToLiveBetter.';
const canonical = 'https://quangpao.github.io/HowToLiveBetter/';
const themeInit = `<script>(function(){var s;try{s=localStorage.getItem('theme')}catch(e){}var dark=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',dark)})();</script>`;

export function sitePages() {
  const catalog=readCatalog(), data=readerData(), reviews=JSON.parse(read('data/review-status.json')).entries;
  const paths=JSON.parse(read('data/reading-paths.json')).paths;
  for(const path of paths)for(const id of path.entries)if(!catalog.byId.has(id))throw new Error('Lộ trình có ID không tồn tại: '+id);
  for(const id of Object.keys(reviews))if(!catalog.byId.has(id))throw new Error('Hồ sơ kiểm chứng có ID không tồn tại: '+id);
  const nav=[['tinh-huong','Tra theo tình huống'],['phap-luat','Pháp luật'],['tai-ve','Tải sách'],['ve-cam-nang','Về cẩm nang']];
  const shell=(slug,title,description,body)=>`<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · Cẩm nang sống thông minh</title><meta name="description" content="${escape(description)}"><link rel="canonical" href="${canonical+slug}/"><link rel="icon" href="../assets/favicon.svg"><meta name="theme-color" content="#f4f1e8"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:image" content="${canonical}og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${canonical}og.png">${themeInit}<link rel="stylesheet" href="../assets/pages.css"><script src="../assets/book-reader.js" defer></script><script src="../assets/site-pages.js" defer></script></head>
<body><a class="skip" href="#main">Đi tới nội dung</a><header class="site-nav"><div class="nav-inner"><a class="brand" href="../"><img src="../assets/favicon.svg" alt="" width="34" height="34">HowToLiveBetter</a><nav aria-label="Liên kết chính">${nav.map(([path,label])=>`<a href="../${path}/"${path===slug?' aria-current="page"':''}>${label}</a>`).join('')}<button type="button" data-theme aria-label="Đổi nền sáng hoặc tối">Đổi nền</button></nav></div></header><main class="page" id="main"><header class="page-header"><p class="eyebrow">Cẩm nang sống thông minh · Bản tiếng Việt</p><h1>${escape(title)}</h1><p class="lead">${escape(description)}</p></header>${body}</main><footer class="footer"><nav aria-label="Thông tin cẩm nang"><a href="../">Tra cứu và đọc sách</a><a href="../kiem-chung/">Cách kiểm chứng và việc còn mở</a><a href="../ve-cam-nang/#rieng-tu">Riêng tư</a><a href="https://github.com/quangpao/HowToLiveBetter">Mã nguồn và góp ý</a></nav><p>Bản Việt do Bảo biên soạn từ dự án của <a href="https://github.com/eternity4719/HowToLiveBetter">eternity4719</a>. Nội dung CC BY 4.0; phần mã theo LICENSE-CODE. Mã nội dung web: <code>${data.version}</code>.</p></footer></body></html>\n`;
  const about=shell('ve-cam-nang','Về cẩm nang','Một nơi để tìm căn cứ và những việc có thể làm trong đời sống.',`
<div class="prose"><h2>Cuốn sách này dành cho việc gì?</h2><p>Khi cần đi khám, ký hợp đồng, chăm người thân hay chuẩn bị cho một thay đổi, bạn có thể cần một điểm bắt đầu. Cẩm nang tập hợp các việc thường gặp, giải thích chi phí, lợi ích, điều kiện và nguồn để bạn tự cân nhắc.</p><p>Bạn không cần làm hết mọi mục. Một việc phù hợp với hoàn cảnh hiện tại đã có thể hữu ích.</p>
<h2>Người biên soạn bản Việt</h2><p>Mình là Bảo, một kỹ sư phần mềm. Mình làm bản Việt vì muốn những kiến thức có ích dễ tìm và dễ áp dụng hơn trong đời sống ở Việt Nam. Công việc của mình ở dự án này là biên soạn, đối chiếu nguồn, sửa cách diễn đạt và xây dựng công cụ đọc. Mình cũng dùng công cụ tự động để hỗ trợ công việc đó. Mình không phải bác sĩ hay luật sư; những nội dung thuộc chuyên môn này cần được kiểm tra theo nguồn hiện hành và hoàn cảnh cụ thể. Bạn có thể theo dõi thay đổi hoặc góp ý qua <a href="https://github.com/quangpao">GitHub của mình</a>.</p>
<h2>Nguồn gốc và giấy phép</h2><p>Bản Việt phát triển từ <a href="https://github.com/eternity4719/HowToLiveBetter">HowToLiveBetter của eternity4719</a>. Phần biên soạn cho Việt Nam có điều chỉnh cách viết, pháp luật, thủ tục và một số chủ đề địa phương. Giao diện có tham khảo <a href="https://github.com/geekan/HowToLiveLonger">HowToLiveLonger</a>.</p><p>Nội dung được chia sẻ theo <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Khi dẫn lại hoặc sửa, hãy ghi tác giả gốc, nguồn bản Việt, giấy phép và những thay đổi của bạn. Phần mã có giấy phép riêng trong repo.</p>
<h2>Cách biên soạn và cập nhật</h2><p>Mỗi mục giữ nguồn để người đọc đối chiếu. Nghiên cứu và văn bản chính thức được ưu tiên; phần dễ hiểu phải giữ đúng đối tượng, điều kiện và mức chắc chắn của nguồn. Mức A/B/C mô tả bằng chứng theo quy ước của sách, không xác nhận mọi người đều nên làm.</p><p>Văn bản mở được chưa có nghĩa là còn hiệu lực hoặc đã được diễn giải đúng. Hồ sơ trên <a href="../kiem-chung/">trang kiểm chứng</a> ghi rõ phạm vi đã xem và phần còn cần rà lại. Sách tải về có thể chậm hơn bản web trong lúc bản phát hành đang được dựng.</p>
<h2>Góp ý một mục</h2><p>Dùng nút “Góp ý mục này” khi đang đọc để điền sẵn ID và liên kết. Bạn có thể báo câu khó hiểu, thông tin có thể cũ, lỗi số liệu hoặc liên kết hỏng. Không bắt buộc có nguồn khi báo lỗi chữ hoặc trải nghiệm đọc.</p>
<h2 id="rieng-tu">Dữ liệu trên thiết bị của bạn</h2><p>Vị trí đọc, cỡ chữ, nền sáng/tối, câu trả lời tự kiểm tra và danh sách việc được lưu trong trình duyệt. Chúng không đồng bộ giữa các thiết bị. Bạn có thể xóa ở từng trang hoặc xóa dữ liệu trang trong trình duyệt.</p><p>Tìm kiếm được xử lý trên thiết bị; trang không gửi nguyên văn truy vấn tới analytics. Website không nhúng analytics. Nếu bạn tự gửi góp ý trên GitHub, nội dung góp ý có thể công khai.</p></div>`);
  const downloads=shell('tai-ve','Tải sách để đọc ngoại tuyến','Chọn định dạng phù hợp với thiết bị và cách bạn muốn đọc.',`
<div class="grid">${[
 ['pdf','PDF','Giữ bố cục trang, phù hợp để in hoặc đọc trên màn hình lớn.'],
 ['epub','EPUB','Phù hợp điện thoại và máy đọc sách; đổi cỡ chữ và cách dàn trang trong ứng dụng đọc.'],
 ['html','HTML ngoại tuyến','Một file để mở bằng trình duyệt, dùng tra cứu nội dung đã tải khi không có mạng.'],
 ['apkg','Thẻ Anki','Dành cho người đã dùng Anki và muốn ôn lại các mục.']
].map(([ext,label,description])=>`<article class="tile download-card"><p class="download-format">${ext.toUpperCase()}</p><h2>${label}</h2><p>${description}</p><a class="button primary" href="${release+ext}">Tải ${label}</a></article>`).join('')}</div>
<div class="prose"><h2>Phiên bản và ngày dựng</h2><p>Các nút trên dẫn thẳng tới file của bản phát hành gần nhất. <a href="https://github.com/quangpao/HowToLiveBetter/releases/tag/epub-latest">Xem phiên bản, ngày dựng và dung lượng file</a> nếu cần đối chiếu. Bạn không cần vào GitHub để bắt đầu tải.</p><p>Nội dung có thể được sửa sau khi bạn tải. Với thông tin về thuốc, quyền lợi hoặc thời hạn pháp lý, hãy kiểm tra lại mục tương ứng trên web và nguồn đang áp dụng trước khi làm.</p><h2>Chọn nhanh</h2><p>Đọc trên điện thoại: thử EPUB. Muốn in: chọn PDF. Muốn giữ ô tìm kiếm trong trình duyệt: tải HTML. Sau khi tải, mở thử file trước khi đi nơi không có mạng.</p></div>`);
  const journeys=shell('tinh-huong','Bạn đang cần giải quyết việc gì?','Chọn một tình huống, đọc điều kiện từng mục và lưu những việc phù hợp với bạn.',`
<nav class="jump-links" aria-label="Các tình huống">${paths.map(p=>`<a href="#${p.id}">${escape(p.title)}</a>`).join('')}<a href="#viec-da-luu">Việc đã lưu</a></nav>
<div class="notice">Danh sách dưới đây nối các mục trong sách để bạn dễ tìm. Thứ tự không thay cho đánh giá mức khẩn cấp hay điều kiện áp dụng. Mỗi mục vẫn giữ căn cứ và lưu ý riêng.</div>
<div class="actions no-print"><button type="button" data-print>In danh sách</button><button type="button" data-export-actions>Chép những việc đã chọn</button><button type="button" data-clear-actions>Xóa đánh dấu</button></div><p class="meta no-print" data-action-status role="status" aria-live="polite">Đánh dấu để lưu việc cần xem lại; dữ liệu chỉ ở trình duyệt này.</p><textarea class="no-print" data-action-export hidden rows="12" style="width:100%" aria-label="Danh sách việc đã chọn để chép" readonly></textarea>
${paths.map(p=>`<section class="path" id="${p.id}"><div class="path-intro"><h2>${escape(p.title)}</h2><p>${escape(p.description)}</p></div><ol class="steps">${p.entries.map(id=>{const e=catalog.byId.get(id);return `<li class="step"><h3><a href="${link(e)}">${text(e.title)}</a></h3><p>${text(e.human)}</p><p class="meta">Chương ${e.sec} · Mục ${e.n} · Bằng chứng ${e.grade}</p><label><input type="checkbox" data-action-id="${e.id}">Lưu để đọc và cân nhắc</label></li>`;}).join('')}</ol></section>`).join('')}
<section class="path" id="viec-da-luu"><h2>Những việc đã lưu</h2><p class="meta">Danh sách có thể gồm cả mục bạn lưu từ trang đọc chính. Đánh dấu là lưu để xem lại, không có nghĩa đã hoàn thành.</p><ul class="steps" data-saved-actions><li>Chưa có việc nào được lưu trên thiết bị này.</li></ul></section>`);
  const groups=[
    {id:'viec-lam-an-sinh',name:'Việc làm và an sinh',chapters:[7,19,24,31,33]},
    {id:'gia-dinh-nha-o',name:'Gia đình, nhà ở và thừa kế',chapters:[10,15,17,18,25,27,30]},
    {id:'quyen-va-trach-nhiem',name:'Tài sản, quyền và trách nhiệm',chapters:[8,9]},
    {id:'cong-nghe',name:'Công nghệ và dữ liệu',chapters:[11,14]},
    {id:'kinh-doanh',name:'Kinh doanh và nền tảng',chapters:[12,26]},
    {id:'doi-song',name:'Giao thông, sức khỏe và đời sống',chapters:[]}
  ];
  const legalIds=new Set(data.sections.flatMap(s=>s.entries).filter(e=>e.isLegal).map(e=>e.id));
  const legal=catalog.entries.filter(e=>legalIds.has(e.id));
  const belongs=(e,g)=>g.chapters.includes(Number(e.sec)) || g.id==='doi-song' && !groups.slice(0,-1).some(other=>other.chapters.includes(Number(e.sec)));
  const law=shell('phap-luat','Pháp luật Việt Nam trong đời sống','Tìm những quy định liên quan các tình huống trong cẩm nang, rồi mở mục để xem điều kiện và căn cứ.',`
<div class="notice"><strong>Phạm vi của trang:</strong> đây là mục lục theo vấn đề, không phải cơ sở dữ liệu toàn bộ pháp luật. Có dẫn văn bản không đồng nghĩa đã kiểm tra hiệu lực cho mọi trường hợp. Ngày đối chiếu, khi có, chỉ áp dụng cho phạm vi ghi trong hồ sơ.</div>
<nav class="jump-links" aria-label="Nhóm pháp luật">${groups.map(g=>`<a href="#${g.id}">${g.name}</a>`).join('')}</nav>
<div class="legal-tools"><label><span class="meta">Tìm trong tiêu đề và phần dễ hiểu của danh mục này</span><input type="search" data-legal-search placeholder="Ví dụ: hợp đồng, bằng A1, BHYT" autocomplete="off"></label><p role="status" aria-live="polite"><strong data-result-count>${legal.length}</strong> mục</p></div>
<p class="empty" data-no-results hidden>Chưa thấy mục phù hợp. Thử từ ngắn hơn hoặc <a href="../">tìm trong toàn bộ nội dung sách</a>.</p>
${groups.map(g=>`<section id="${g.id}" data-legal-group><h2>${g.name}</h2>${legal.filter(e=>belongs(e,g)).map(e=>`<article class="legal-item" data-legal-item><p class="meta">Chương ${e.sec} · Mục ${e.n}</p><h3><a href="${link(e)}">${text(e.title)}</a></h3><p>${text(e.human)}</p>${reviews[e.id]?`<p class="status-badge">Đối chiếu ${reviews[e.id].checkedAt} · ${escape(reviews[e.id].scope)}</p>`:''}<a href="${link(e)}">Xem điều kiện, quy định và nguồn →</a></article>`).join('')}</section>`).join('')}
<p class="meta"><a href="../kiem-chung/">Xem cách kiểm chứng</a> · <a href="https://github.com/quangpao/HowToLiveBetter/blob/vi/docs/phap-luat-viet-nam.md">Bài hướng dẫn tra luật trong repo</a></p>`);
  const verification=shell('kiem-chung','Kiểm chứng và cập nhật','Biết rõ phần nào đã được đối chiếu, phần nào còn cần rà soát.',`
<div class="prose"><h2>Một mục được kiểm tra những gì?</h2><p>Các phần cần xem riêng gồm: diễn đạt có đúng nguồn không, con số có khớp không, hướng dẫn có đủ điều kiện không và văn bản pháp luật còn áp dụng thế nào. Các kiểm tra tự động giúp bắt lỗi cấu trúc, không thay cho thẩm định y khoa hay pháp lý.</p><p>A/B/C là thang bằng chứng của sách. Ngày sửa gần nhất cũng không phải ngày mọi căn cứ trong mục được xác minh lại.</p><h2>Những hồ sơ đã ghi phạm vi cụ thể</h2><ul class="review-list">${Object.entries(reviews).map(([id,r])=>{const e=catalog.byId.get(id);return `<li><a href="${link(e)}">${e.sec}.${e.n} — ${text(e.title)}</a><br><span class="meta">${r.checkedAt} · ${escape(r.scope)}</span>${r.status==='needs-medical-review'?'<br><strong>Còn cần rà soát chuyên môn độc lập.</strong>':r.status==='needs-legal-review'?'<br><strong>Còn nội dung pháp luật cần rà hiệu lực hoặc phạm vi riêng.</strong>':''}${r.sources.length?'<br>'+r.sources.map((url,i)=>`<a href="${escape(url)}" rel="noopener">Nguồn đối chiếu ${i+1}</a>`).join(' · '):''}</li>`;}).join('')}</ul><p>Danh sách này mới ghi nhận một số mục được sửa trong đợt hiện tại. Không có hồ sơ ở đây không có nghĩa mục đã được chứng nhận hoặc chưa từng có người đọc lại.</p><h2>Báo một vấn đề</h2><p>Nút góp ý trong từng mục điền sẵn ID và liên kết. Khi nhận ra thông tin có thể cũ hoặc thiếu điều kiện, hãy mô tả hoàn cảnh và gửi nguồn nếu có. Những việc chưa xác minh được cần giữ trạng thái đang rà soát.</p><p><a href="https://github.com/quangpao/HowToLiveBetter/tree/vi/docs/kiem-chung">Hồ sơ nghiên cứu và nhật ký lịch sử trong repo</a> có thể dùng số mục của phiên bản cũ; hãy ưu tiên ID và nội dung hiện tại khi đối chiếu.</p></div>`);
  return {'ve-cam-nang/index.html':about,'tai-ve/index.html':downloads,'tinh-huong/index.html':journeys,'phap-luat/index.html':law,'kiem-chung/index.html':verification};
}
export function writeSitePages(check=false) {
  for(const [file,html] of Object.entries(sitePages())){
    const path=join(ROOT,file),same=existsSync(path)&&readFileSync(path,'utf8')===html;
    if(check&&!same)throw new Error(file+' đã cũ: chạy node tools/site-pages.mjs');
    if(!check&&!same){mkdirSync(dirname(path),{recursive:true});writeFileSync(path,html);}
  }
  console.log('5 static entry points'+(check?' · khớp':''));
}
if(process.argv[1] && new URL(import.meta.url).pathname===process.argv[1])writeSitePages(process.argv.includes('--check'));
