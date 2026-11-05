// Bảng đối chiếu tham chiếu: phân giải mỗi chỗ tham chiếu "mục X" trong nội dung thành tiêu đề mục mà nó thực sự trỏ tới,
// rồi ghi vào docs/doi-chieu-muc.md. File đó được commit, nên khi chèn hay xóa mục làm tham chiếu trỏ sang chỗ khác,
// git diff sẽ bày thẳng thay đổi ra — số mục không đổi mà tiêu đề đổi, tức là bị lệch.
//
//   node tools/check-refs.mjs            # sinh lại bảng đối chiếu (sync-stats.mjs tự gọi)
//   node tools/check-refs.mjs --check    # chỉ kiểm không ghi file, có tham chiếu hỏng thì mã thoát 1 (dùng cho CI)
//   node tools/check-refs.mjs --suspect  # liệt kê thêm các chỗ lời văn không khớp tiêu đề đích, báo nhầm nhiều, dùng khi soi lại chỗ cũ
//
// Vì sao cần nó: số mục phụ thuộc vị trí, tham chiếu trong nội dung chỉ ghi vị trí chứ không ghi nội dung. 2026-09-19
// phát hiện 6 chỗ trỏ sai ở chương 7 (cứu trợ y tế trỏ sang trợ cấp thu nhập thấp, trạm cứu trợ trỏ sai mục), tất cả đều nằm trong khoảng số mục hợp lệ,
// kiểm tra vượt khoảng không bắt được chỗ nào.
// Lưu ý: cắt dòng luôn dùng /\r?\n/, không dùng '\n'. File trong book/ có kiểu xuống dòng không thống nhất (có CRLF có LF),
// mà dấu . trong regex JS không khớp \r (CR cũng tính là ký tự kết thúc dòng, điểm này khác Python và Perl),
// giữ \r lại sẽ làm /^### (\d+)\. (.*)$/ không khớp được dòng nào trên file CRLF.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_ONLY = process.argv.includes('--check');

// Tham chiếu trần trong chương ("xem mục 8") chỉ tìm trong mấy cột này: "mục N" ở cột nguồn gần như đều là
// số điều khoản luật, quét vào toàn báo nhầm.
const FIELDS = /^- (Nói dễ hiểu|Lợi ích|Ghi chú|Chi phí|Pháp luật Việt Nam):/;
// Nhưng tham chiếu chéo có số chương ("xem chương 11 mục 16") không lẫn với điều luật, cột nguồn cũng có, quét luôn.
// Chỗ "lưu nhật ký xem chương 11 mục 16" ở mục 103 của book/26 viết ngay trong cột nguồn, suýt bị bỏ sót.
const CROSS_FIELDS = /^- (Nói dễ hiểu|Lợi ích|Ghi chú|Chi phí|Pháp luật Việt Nam|Nguồn):/;

// Chỉ quét chương bản Việt; chương tiếng Trung còn trong book/ để tham chiếu, không tính vào bảng này.
const isVi = f => readFileSync(resolve(ROOT, 'book', f), 'utf8').includes('- Chi phí:');
const files = readdirSync(resolve(ROOT, 'book')).filter(f => /^\d\d-.*\.md$/.test(f)).sort().filter(isVi);
// Bài dài trong docs/ cũng quét. Chúng cùng đoạn mở đầu chương từng lâu nằm ngoài phạm vi quét: khi số mục bị dồn lệch
// --check vẫn báo đạt như thường, diff của bảng đối chiếu cũng không thấy các tham chiếu này. Lần rà ngày 2026-09-21
// ba bài dài có 23 chỗ "chương X mục Y", không chỗ nào từng được kiểm.
// Chỉ lấy .md ngay dưới docs/. Thư mục con docs/kiem-chung/ không quét: các file đó ghi quá trình kiểm chứng lúc đó,
// số mục trong đó là trạng thái lịch sử, không nên chạy theo nội dung. Bản thân bảng đối chiếu cũng loại ra.
// Bài dài cũng chỉ lấy file đã ở bản Việt (chưa có bài nào); tài liệu tiếng Trung không đưa vào bảng này.
const isViDoc = f => /^- |^# /.test(readFileSync(resolve(ROOT, 'docs', f), 'utf8')) && !/[\u4e00-\u9fff]/.test(readFileSync(resolve(ROOT, 'docs', f), 'utf8'));
const docs = readdirSync(resolve(ROOT, 'docs')).filter(f => f.endsWith('.md') && f !== 'doi-chieu-muc.md').sort().filter(isViDoc);

// Đọc tiêu đề các mục của từng chương trước: sections[số chương] = { file, titles: { số mục: tiêu đề } }
const sections = new Map();
for (const f of files) {
  const num = Number(f.slice(0, 2));
  const titles = new Map();
  for (const line of readFileSync(resolve(ROOT, 'book', f), 'utf8').split(/\r?\n/)) {
    const m = /^### (\d+)\. (.*)$/.exec(line);
    if (m) titles.set(Number(m[1]), m[2].trim());
  }
  sections.set(num, { file: f, titles });
}

// Một tham chiếu có thể viết "mục 3, 10, 11", tách thành nhiều số mục. Cũng nhận kiểu khoảng "mục 11 đến 14"
// "mục 5 đến mục 10": kiểu viết này trước đây cả chỗ đều không khớp, coi như không quét, cả sách có 5 chỗ viết vậy.
const RANGE = /^\s*(\d+)\s*(?:đến|-|–)\s*(?:mục\s*)?(\d+)\s*$/;
// Trả về [số mục, có phải mở ra từ khoảng không]. Khoảng là cả một khối mục ("mấy mục xả giận", "nghĩa vụ
// nền tảng"), không thể gắn neo cho từng mục trong khối, nên số mục mở ra từ khoảng được miễn kiểm neo — chúng vẫn
// vào bảng đối chiếu, khi bị dồn lệch thì phát hiện qua thay đổi tiêu đề trong diff.
const nums = s => {
  const out = [];
  for (const part of s.split(/,|\bvà\b/)) {
    const r = RANGE.exec(part);
    if (r) {
      const [a, b] = [Number(r[1]), Number(r[2])];
      if (b >= a && b - a <= 30) for (let i = a; i <= b; i++) out.push([i, true]);
      continue;
    }
    if (!part.trim()) continue;
    const n = Number(part.trim());
    if (Number.isFinite(n)) out.push([n, false]);
  }
  return out;
};
// Cách viết đoạn số mục: "3", "3, 10", "11 đến 14", "5 đến mục 10"
const SPEC = '[\\d,\\s]+?(?:(?:đến|-|–)\\s*(?:mục\\s*)?\\d+)?';

const out = [];
const problems = [];
const suspects = [];
const weak = [];
let total = 0;

// Đơn vị quét: mỗi chương trong book/ một đơn vị, mỗi bài dài trong docs/ một đơn vị.
const targets = [
  ...files.map(f => ({ f, dir: 'book', isDoc: false })),
  ...docs.map(f => ({ f, dir: 'docs', isDoc: true })),
];

for (const { f, dir, isDoc } of targets) {
  const num = isDoc ? 0 : Number(f.slice(0, 2));
  const self = isDoc ? null : sections.get(num);
  const lines = readFileSync(resolve(ROOT, dir, f), 'utf8').split(/\r?\n/);
  const rows = [];
  // cur là số mục đang đứng, 0 nghĩa là chưa vào mục nào (đoạn mở đầu chương của book, mọi vị trí trong docs).
  // unit là tên hiện ở cột "Từ": trong mục thì ghi "mục N", đoạn mở chương ghi "đầu chương", bài dài ghi tiêu đề con gần nhất.
  let cur = 0;
  let unit = isDoc ? 'mở đầu' : 'đầu chương';

  // Câu đứng trước tham chiếu thường đã nói nó muốn trỏ cái gì ("cứu trợ y tế (xem mục 11)"), nên
  // liệt kê cả phân câu, khi soi bảng đối chiếu bằng mắt không phải lật nội dung vẫn đoán được trỏ đúng chưa.
  // Cắt theo dấu ngắt câu gần nhất chứ không theo số chữ cố định — cắt cố định 14 chữ từng làm mấy chỗ trích dẫn đúng trông đáng ngờ
  // ("khí CO xem mục 18, bỏng nhiệt xem mục 13" cắt xong chỉ còn "CO" đối với "bỏng").
  const ctxOf = (line, idx) => {
    const before = line.slice(0, idx);
    let start = -1;
    for (const p of ['.', ';', '!', '?', ':']) start = Math.max(start, before.lastIndexOf(p));
    return before.slice(start + 1).slice(-44).replace(/\|/g, '｜');
  };
  // Cửa sổ dùng khi kiểm neo hẹp hơn cái trên: chỉ lấy phân câu chứa tham chiếu. Cửa sổ rộng bằng cả câu thì
  // những từ phổ biến như "mình", "công ty" rất dễ tình cờ trùng với tiêu đề mục khác, neo thành giả —
  // 2026-09-20 chèn mục vào chương 31, chỗ "... khoản vay xem mục 15 của chương này" ở ghi chú mục 1 bị dồn lệch đâm vào
  // mục mới "làm việc từ xa cho công ty nước ngoài tại nhà ... tự khai thuế", trong cửa sổ cả câu, chữ nằm ngoài hai dấu phẩy
  // "bạn tự trả" đâm vào "tự khai thuế" trong tiêu đề, --check vẫn báo đạt.
  // Khi phân câu quá ngắn (kiểu "..., xem mục 11", cửa sổ chỉ còn một chữ "xem") thì lùi thêm một phân câu,
  // không thì sẽ coi tham chiếu vốn đúng là tham chiếu trần.
  // Dấu liệt kê, ngoặc kép, ngoặc đơn đều không tính là ranh giới phân câu: neo của "đồ uống có đường, thịt chế biến (mục 3 chương này)" nằm sau dấu liệt kê,
  // neo của "khoản ngân sách thêm vào để 'hơn người khác một bậc' xem mục 24 chương này" nằm trong ngoặc kép, cắt ra là hỏng.
  const CLAUSE = ['.', ';', '!', '?', ':', ','];
  const narrowOf = (line, idx) => {
    const before = line.slice(0, idx);
    const cut = s => {
      let start = -1;
      for (const p of CLAUSE) start = Math.max(start, s.lastIndexOf(p));
      return { head: s.slice(0, start + 1), tail: s.slice(start + 1) };
    };
    const last = cut(before);
    if (last.tail.replace(/\b(xem|theo|và|ở|trong|của|với|như|theo đúng)\b/gi, '').trim().length >= 4) return last.tail.slice(-24);
    return (cut(last.head.slice(0, -1)).tail + last.tail).slice(-24);
  };
  // Chữ sau tham chiếu cũng tính là neo: kiểu "mục 16 (giấy vay và bảo lãnh)" đặt từ khóa sau số mục
  // lấy tới dấu ngắt câu đầu tiên sau tham chiếu (tối đa 40 chữ). Không dùng số ký tự cố định: "xem chương 1 mục 7, 8,
  // 14, 17, 18, 19, 23, 24, 29 (huyết áp, đường huyết…)" chuỗi số mục dài như vậy sẽ đẩy phần chú ra ngoài cửa sổ.
  const afterOf = (line, idx) => {
    const rest = line.slice(idx).replace(new RegExp(`^(?:chương\\s*\\d+\\s*)?mục\\s*(?:${SPEC})`), '');
    const end = rest.search(/[。；！？]/);
    return (end === -1 ? rest : rest.slice(0, end)).slice(0, 40).replace(/\|/g, '｜');
  };

  lines.forEach((line, i) => {
    if (isDoc) {
      const h = /^#{1,6}\s+(.+?)\s*$/.exec(line);
      if (h) { unit = h[1].slice(0, 24); return; }
    } else {
      const t = /^### (\d+)\. (.*)$/.exec(line);
      if (t) { cur = Number(t[1]); unit = `mục ${cur}`; return; }
    }
    // Thân mục chỉ quét mấy cột đó ("mục N" ở cột nguồn phần nhiều là số điều khoản luật). Đoạn mở đầu chương và
    // thân bài dài là đoạn văn thường, không khớp tiền tố cột, cả dòng được cho qua — trước đây chúng vốn bị bỏ qua lặng lẽ như vậy.
    const inEntry = !isDoc && cur > 0;
    if (inEntry ? !CROSS_FIELDS.test(line) : !line.trim()) return;

    // Chỉ dẫn tương đối ("xem mục dưới", "chế tài xem mục trên") nhất loạt cấm: nó không kèm số mục, khi chèn mục thì
    // dịch theo cả khối, lệch rồi diff của bảng đối chiếu cũng không thấy, kiểm tham chiếu trần của --check lại càng không quét tới.
    // 2026-09-20 một lần quét ra ngay ba chỗ trỏ sai từ lâu: "xem mục dưới" ở mục vắc-xin HPV trỏ sang tầm soát
    // ung thư vú (đáng ra là tầm soát ung thư cổ tử cung), "chế tài xem mục trên" ở mục đe dọa trỏ sang mục ý nghĩ,
    // "mục trên: không ký thì tự xin nghỉ" ở mục đăng ký thất nghiệp trỏ sang mục lưu bằng chứng. Loại trừ các trường hợp trùng nhầm kiểu "mục cuối cùng", "một chân sau".
    for (const m of line.matchAll(/\b(mục (?:trên|dưới|trước|sau|kế trên|kế dưới))\b/gi)) {
      problems.push(`${f}:${i + 1} ${unit} dùng chỉ dẫn tương đối "${m[1]}" — đổi thành "mục N (từ khóa)"`);
    }

    // Chéo chương: chương N mục X
    // "chương X mục Y": cả hai đều phải có số ngay sau mới tính
    for (const m of line.matchAll(/chương\s*(\d+)\s*mục\s+(\d[\d,]*(?:\s*(?:đến|-|–)\s*(?:mục\s*)?\d+)?)(?![\d.\p{L}])/giu)) {
      const target = sections.get(Number(m[1]));
      for (const [x, range] of nums(m[2])) {
        const title = target?.titles.get(x);
        rows.push({ from: unit, range, ref: `chương ${m[1]} mục ${x}`, title, line: i + 1, ctx: ctxOf(line, m.index), narrow: narrowOf(line, m.index), after: afterOf(line, m.index) });
        if (!title) problems.push(`${f}:${i + 1} ${unit} trỏ "chương ${m[1]} mục ${x}" — chương đó không có mục ${x}`);
      }
    }

    // Bài dài không có khái niệm "chương này", "mục N" trần trong bài dài là số điều khoản luật, không quét.
    if (isDoc) return;

    // Trong chương: quét mọi "mục X", không giới hạn từ dẫn — cách viết trong nội dung còn lâu mới chỉ có "xem mục X", còn có
    // "theo mục 1 ép ngực", "cách xác định như mục 4", "đối chiếu mục 8 trước", "chọn một trong hai với mục 4",
    // trước đây chỉ nhận ba từ dẫn, mấy chỗ này đều nằm ngoài phạm vi quét. Cả dòng cột nguồn không quét (toàn số điều khoản luật).
    // Đoạn mở đầu chương không bị giới hạn cột: "mục N" ở đó là lời dẫn ("mục 9 tính tiền", "mục 2 tính chuyện đọc sách
    // và quan hệ với tuổi thọ"), cũng bị dồn lệch như nhau, cũng phải vào bảng đối chiếu.
    if (inEntry && !FIELDS.test(line)) return;
    const stripped = line.replace(new RegExp(`chương\\s*\\d+\\s*mục\\s*${SPEC}`, 'gi'), '');
    // "mục" phải đi liền với số: "mục tiêu", "mục đích" không phải tham chiếu
    for (const m of stripped.matchAll(/mục\s+(\d[\d,]*(?:\s*(?:đến|-|–)\s*(?:mục\s*)?\d+)?)(?![\d.\p{L}])/giu)) {
      // Phân định đây là số điều khoản luật hay tham chiếu mục. Cách làm trước 2026-09-21 là xem trong 16 chữ đầu có chữ
      // chữ "pháp" hay không, nhưng "biện pháp", "cách tra", "trợ giúp pháp lý", "chấm dứt trái luật" đều có chữ đó, một loạt tham chiếu thật
      // bị bỏ qua theo. Mà là bỏ qua lặng lẽ: tham chiếu không vào bảng đối chiếu, --check không có tham chiếu để kiểm lại hiện
      // "đạt", chỉ phát hiện được nhờ tổng số tham chiếu ít đi. Một lần quét toàn bộ ra 12 chỗ như vậy.
      // Giờ bỏ qua theo hai tiêu chí rõ ràng:
      //   ① ngay sát "mục N" là dấu hiệu trích dẫn — 《…》, 〔…〕, "số 14", "giải thích đó",
      //      hoặc kết thúc bằng tên văn bản pháp luật ("Luật Xử phạt quản lý an ninh trật tự mục 26");
      // Chỉ nhận "sát ngay", không dùng cửa sổ mờ N chữ phía trước, cũng không lấy "có phải đầu câu" làm tiêu chí — tham chiếu mục
      // cũng đứng ở đầu câu ("mục 4: trạm cứu trợ lo ăn ở miễn phí", "mục 7: danh sách 'đi viện ngay'").
      // Cái giá là trích văn bản luật phải tự mang tên văn bản: khi liệt kê từng câu một phải viết "giải thích đó mục 11", không được viết
      // "... lệnh của tòa. Mục 11 nói về thu thập chứng cứ" rồi dựa vào câu trước. Đây vốn cũng là yêu cầu tự đủ của nội dung.
      const tail = stripped.slice(0, m.index).replace(/\s+$/, '');
      // VN: "Điều 10 Luật …" hay "Nghị định 168/2024/NĐ-CP" là trích văn bản, không phải tham chiếu mục
      const CITE = /(Điều\s*\d+|\d+\s*\/\s*\d{4}\/|(?:Nghị định|Thông tư|Luật|Quyết định|QĐ|TT|NĐ)[^.;:]{0,20}\d+)$/i;
      if (CITE.test(tail)) continue;
      for (const [x, range] of nums(m[1])) {
        const title = self.titles.get(x);
        rows.push({ from: unit, range, ref: `mục ${x}`, title, line: i + 1, ctx: ctxOf(stripped, m.index), narrow: narrowOf(stripped, m.index), after: afterOf(stripped, m.index) });
        // Tham chiếu trong chương vượt quá số mục của chương, phần nhiều là số điều khoản luật bị nhầm thành tham chiếu mục, liệt ra để xem bằng mắt
        if (!title) problems.push(`${f}:${i + 1} ${unit} trỏ "mục ${x}" — chương này chỉ có ${self.titles.size} mục`);
        if (inEntry && x === cur) problems.push(`${f}:${i + 1} mục ${cur} tự trỏ chính nó`);
      }
    }
  });

  // Có tự kiểm được tham chiếu này trỏ đúng không: trong chữ quanh tham chiếu, có đoạn nào cũng xuất hiện trong tiêu đề
  // mục đích không. Có → tham chiếu này tự mang neo, khi thay đổi gây lệch sẽ bị phát hiện; không → nó là số mục trần
  // ("cách tính thực tế xem mục 34"), sai cũng không thấy, cần bổ sung một chú thích rõ ràng.
  // Hai chữ Hán trùng nhau quá dễ xảy ra tình cờ ("mình", "công ty", "thời gian"), nên phân cấp theo độ dài và khoảng cách:
  // cả câu có ba chữ Hán liền nhau trùng ("đồ uống có đường", "bảo hiểm y tế cư dân") tính là neo thật; chỉ hai chữ Hán trùng thì
  // đòi hỏi nó nằm trong phân câu chứa tham chiếu mới tính — "bạn tự trả" cách hai dấu phẩy đâm vào
  // "tự khai thuế" trong tiêu đề, chính là lý do chỗ lệch ngày 2026-09-20 lọt qua kiểm tra.
  // Tiếng Việt: neo là số từ liền nhau cùng xuất hiện trong tiêu đề đích
  const longest = (text, title) => {
    const words = text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w => w.length >= 2);
    const t = title.toLowerCase();
    let best = 0;
    for (let i = 0; i < words.length; i++) {
      let n = 0;
      while (i + n < words.length && t.includes(words.slice(i, i + n + 1).join(' '))) n++;
      best = Math.max(best, n);
    }
    return best;
  };
  // Chuỗi số và chữ tiếng Anh cũng là neo: 12356, AED, CT, BMI, LPR thường chính là thứ tham chiếu muốn trỏ tới
  const token = (text, title) => (text.match(/[0-9A-Za-z]{2,}/g) ?? []).some(t => title.includes(t));
  for (const r of rows) {
    if (!r.title || r.range) continue;
    const wide = r.ctx + r.after;
    if (token(wide, r.title) || longest(wide, r.title) >= 3) continue;
    if (longest(r.narrow + r.after, r.title) >= 2) continue;
    // Chỗ chỉ trùng hai chữ nằm ngoài phân câu thì liệt riêng thành neo yếu: cách sửa cũng như số mục trần, là bổ sung chú thích rõ ràng.
    const list = longest(wide, r.title) >= 2 ? weak : suspects;
    list.push(`${f}:${r.line} ${r.from} →「${r.ref}」${r.title.slice(0, 20)}…　…${r.ctx}【${r.ref}】${r.after}…`);
  }

  if (!rows.length) continue;
  total += rows.length;
  out.push(`## ${isDoc ? 'docs/' : ''}${basename(f, '.md')}\n`);
  out.push('| Từ | Tham chiếu | Trỏ tới | Ngữ cảnh |');
  out.push('| --- | --- | --- | --- |');
  for (const r of rows) {
    const title = r.title ? r.title : '**không có mục này**';
    out.push(`| ${r.from} | ${r.ref} | ${title} | …${r.ctx}… |`);
  }
  out.push('');
}

const body = [
  '# Bảng đối chiếu tham chiếu',
  '',
  'File này do `node tools/check-refs.mjs` sinh ra, đừng sửa tay.',
  '',
  'Tham chiếu trong sách chỉ ghi số mục, không ghi nội dung; chèn hay xóa một mục thì số của',
  'mọi mục sau đổi hết, mà số mới thường vẫn nằm trong khoảng hợp lệ nên chỉ kiểm "vượt quá số mục"',
  'không bắt được. Vì vậy mỗi tham chiếu được mở ra thành **tiêu đề mà nó thực sự trỏ tới** và ghi vào',
  'đây: sửa xong chạy lại, chỗ nào số mục không đổi mà tiêu đề đổi thì `git diff` chỉ ra ngay.',
  '',
  'Phạm vi: phần thân từng mục và đoạn mở đầu mỗi chương trong `book/`, cộng các bài dài trong `docs/`.',
  'Trong bài dài không có "chương này" nên "mục N" trần được coi là điều khoản pháp luật và bỏ qua —',
  'muốn trỏ trong bài dài thì phải ghi đủ "chương X mục Y".',
  'Cột "Từ" ghi `mục N` cho thân mục, `đầu chương` cho đoạn mở chương, tên tiêu đề con cho bài dài.',
  '',
  'Lớp bảo hiểm thứ hai là **từ neo**: quanh mỗi tham chiếu phải có một từ trùng với tiêu đề đích',
  '("xem mục 12 (bảo hiểm y tế)" hoặc "… bảo hiểm y tế, xem mục 12"). `node tools/check-refs.mjs --check`',
  'coi tham chiếu không có từ neo là lỗi: loại đó bị lệch thì `git diff` của bảng cũng không thấy gì.',
  'Tham chiếu dạng khoảng ("xem mục 11 đến 14") là ngoại lệ: nó trỏ cả một khối, không gắn neo cho từng mục.',
  '',
  'Cách tính từ neo: hai từ liền nhau trùng tiêu đề đích, hoặc một từ dài (tên riêng, con số, viết tắt',
  'như 12356, AED, BMI, LPR) xuất hiện trong tiêu đề. Chỉ trùng một từ chung chung ("người", "tiền")',
  'thì không tính.',
  '',
  `Tổng ${total} chỗ tham chiếu.`,
  '',
  ...out,
].join('\n');

if (problems.length) {
  console.log('Cần xem tay:');
  for (const p of problems) console.log('  ' + p);
  console.log('');
}

// Heuristic này ngày trước tỉ lệ báo nhầm rất cao (trong tiếng Trung, "kết cục lâu dài sau khi chưa thành xem mục 30" trỏ tới "ý nghĩ vừa lóe lên
// thì nói ngay với một người bên cạnh" hoàn toàn đúng mà không trùng một chữ nào), 288 chỗ báo ra 159 chỗ; sau đó cả sách 345 chỗ
// tham chiếu được bổ sung neo từng chỗ, hai loại này bình thường giờ đều phải là 0, báo ra là thật có một chỗ cần bổ sung chú thích.
// Nhưng nó chỉ bảo đảm "lệch thì phát hiện được", không bảo đảm "lệch thì chắc chắn bị chặn": mô phỏng dồn toàn bộ tham chiếu trong chương lệch một mục,
// chặn được tại chỗ khoảng bảy phần mười, phần còn lại (hai mục liền nhau nói cùng một việc, tiêu đề dùng chung từ) vẫn phải dựa vào diff của bảng đối chiếu.
if (process.argv.includes('--suspect') && suspects.length) {
  console.log(`Ngữ cảnh quanh tham chiếu không khớp tiêu đề đích (${suspects.length} chỗ, dễ báo nhầm, chỉ để soi tay):`);
  for (const s of suspects) console.log('  ' + s);
  console.log('');
}

if (process.argv.includes('--suspect') && weak.length) {
  console.log(`Neo chỉ trùng ở ngoài phân câu (${weak.length} chỗ, phần nhiều là từ phổ biến tình cờ trùng, tức là không có neo):`);
  for (const s of weak) console.log('  ' + s);
  console.log('');
}

if (CHECK_ONLY) {
  const fatal = problems.filter(p => p.includes('dùng chỉ dẫn tương đối') || p.includes('tự trỏ chính nó') || p.includes('chương đó không có mục'));
  for (const p of fatal) console.log('  ' + p);
  // Số mục trần (quanh tham chiếu không có từ nào khớp tiêu đề đích) cũng tính là hỏng: tham chiếu kiểu này một khi bị dồn lệch
  // thì không ai thấy được. Cách sửa là bổ sung neo — "xem mục 16 (giấy vay và bảo lãnh)",
  // từ trong ngoặc lấy từ tiêu đề mục đích là được.
  if (suspects.length) {
    console.log(`${suspects.length} chỗ tham chiếu là số mục trần, sai cũng không thấy, hãy bổ sung neo (chạy --suspect xem danh sách):`);
    for (const s of suspects.slice(0, 10)) console.log('  ' + s.split('　')[0]);
    if (suspects.length > 10) console.log(`  …còn ${suspects.length - 10} chỗ khác`);
  }
  // Neo yếu cũng tính là hỏng: cả câu chỉ trùng hai chữ Hán phổ biến, lại còn cách phân câu, tức là không có neo.
  if (weak.length) {
    console.log(`${weak.length} chỗ neo của tham chiếu chỉ tình cờ trùng ở ngoài phân câu, tức là không có neo, hãy bổ sung chú thích rõ ràng (chạy --suspect xem danh sách):`);
    for (const s of weak.slice(0, 10)) console.log('  ' + s.split('　')[0]);
    if (weak.length > 10) console.log(`  …còn ${weak.length - 10} chỗ khác`);
  }
  const bad = fatal.length + suspects.length + weak.length;
  console.log(bad ? `Có ${bad} chỗ cần xử lý` : `Kiểm tham chiếu: đạt — ${total} chỗ đều trỏ đúng và đều có neo`);
  process.exit(bad ? 1 : 0);
}

writeFileSync(resolve(ROOT, 'docs/doi-chieu-muc.md'), body, 'utf8');
console.log(`Đã ghi docs/doi-chieu-muc.md: ${total} chỗ tham chiếu`);
