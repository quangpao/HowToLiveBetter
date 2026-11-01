// Tách các trường dài ("Lợi ích", "Ghi chú") và danh sách "Nguồn" thành nhiều dòng nhỏ khi đổi chủ đề/chỗ dẫn.
//
// Vì sao: một trường "Lợi ích" hay dài 800–1.200 ký tự, gói nhiều nghiên cứu trong cùng một đoạn; trên máy đọc
// sách thì thành một khối chữ, không biết câu nào thuộc nghiên cứu nào.
//
// Chỉ đổi cách trình bày, không sửa chữ: ghép các mảnh theo thứ tự phải đúng bằng văn bản gốc (riêng "Nguồn"
// mất các dấu ";" dùng làm phân cách). File markdown vẫn một trường một dòng, nên bộ đọc của index.html và
// đếm liên kết của sync-stats không bị ảnh hưởng.
//
// Bốn đầu ra dùng cùng một luật: EPUB và PDF gọi splitLongItems khi dựng; trang tra cứu và bản offline nằm
// trong index.html có một bản splitGain / splitSrc tương đương. **Sửa luật ở đây thì phải sửa bên index.html**,
// `node tools/check-split.mjs` so từng trường của cả sách để phát hiện hai bên lệch nhau.

export const GAIN_MIN_LEN = 320;  // "Lợi ích"/"Ghi chú" ngắn hơn thì không tách
export const GAIN_MIN_CHUNK = 40; // mảnh tách ra ngắn hơn thì gộp lại mảnh trước

// Sau dấu chấm, câu tiếp theo mở đầu bằng những cụm này thì coi là sang một ý mới
export const GAIN_TOPIC_START = [
  /^(Ở|Tại)\s(Việt Nam|Mỹ|Anh|Pháp|Hàn Quốc|Nhật Bản|Trung Quốc|châu Âu|Đông Nam Á)/,   // Ở Việt Nam, …
  /^(Theo|Dẫn theo)\s/,                                                                  // Theo GLOBOCAN 2024 …
  /^(Nghiên cứu|Thử nghiệm|Phân tích gộp|Tổng quan|Khảo sát|Điều tra)\b/,                // Nghiên cứu của …
  /^(Một|Hai|Ba)\s+(nghiên cứu|thử nghiệm|tổng quan|phân tích)/,                          // Một thử nghiệm khác …
  /^(Tuy nhiên|Nhưng|Ngược lại|Mặt khác|Ngoài ra|Bên cạnh đó|Đồng thời)\b/,              // đổi ý
  /^(Về|Đối với|Riêng)\s/,                                                               // Về giá cả …
  /^(Còn|Còn lại|Trong khi đó)\b/,
  /^Năm\s\d{4}/,                                                                         // Năm 2025 …
  /^(Nguy cơ|Lợi ích|Chi phí|Tác hại|Rủi ro|Hiệu quả)\b/,                                // nêu lại một vế
  /^(Nếu|Khi|Ai|Người)\s/,                                                               // khuyến cáo theo tình huống
  /^[A-ZĐ][^,.;:]{2,30}\s20\d{2}\b/,                                                     // GLOBOCAN 2024 …, NLST 2011 …
];

// Dấu mở/đóng ngoặc và nháy: bên trong thì không cắt câu, không cắt nguồn
const OPEN = '“‘"\'‘«(《';
const CLOSE = '”"\'’»)'; // 《》 của tiêu đề văn bản cũng tính; ngoặc đơn Anh dùng trong tên bài
const SEMI = ';；';

// "Lợi ích"/"Ghi chú": cắt ở dấu chấm ngoài ngoặc, gặp câu mở đầu ý mới thì sang mảnh khác
export function splitGain(text) {
  if (!text || text.length < GAIN_MIN_LEN) return [text];
  const sentences = [];
  let buf = '', depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (OPEN.includes(c)) depth++;
    else if (CLOSE.includes(c)) depth = Math.max(0, depth - 1);
    buf += c;
    if (c === '.' && depth === 0) {
      const next = text[i + 1] ?? '';
      const after = text.slice(i + 2, i + 3);
      // "0.43" hay "…." không phải hết câu; hết chuỗi thì cắt
      if (next === ' ' && (/[A-ZĐ0-9“‘"«(]/.test(after) || after === '')) { sentences.push(buf); buf = ''; }
    }
  }
  if (buf) sentences.push(buf);
  const chunks = [];
  for (const s of sentences) {
    if (chunks.length && GAIN_TOPIC_START.some(re => re.test(s.trim()))) chunks.push(s);
    else if (chunks.length) chunks[chunks.length - 1] += s;
    else chunks.push(s);
  }
  const out = [];
  for (const c of chunks) {
    if (out.length && c.trim().length < GAIN_MIN_CHUNK) out[out.length - 1] += c;
    else out.push(c);
  }
  if (out.length > 1 && out[0].trim().length < GAIN_MIN_CHUNK) out.splice(0, 2, out[0] + out[1]);
  return out;
}

// "Nguồn": các tài liệu cách nhau bằng ";", mỗi tài liệu một dòng. Dấu ";" bên trong ngoặc/nháy không tính
// (tên bài báo hay có "…: nghiên cứu; 2024").
export function splitSrc(text) {
  const parts = []; let buf = '', depth = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (OPEN.includes(c)) depth++;
    if (CLOSE.includes(c)) depth = Math.max(0, depth - 1);
    if (SEMI.includes(c) && depth === 0) { parts.push(buf); buf = ''; continue; }
    buf += c;
  }
  parts.push(buf);
  return parts.map(s => s.trim()).filter(Boolean);
}

// Mảnh mở đầu bằng "1. " sẽ bị markdown hiểu là danh sách có số, thoát dấu chấm
const safe = s => s.replace(/^(\d+)([.)])(\s)/, '$1\\$2$3');

// Cho EPUB và PDF: viết lại trường dài thành "- Lợi ích:" cộng một tầng danh sách con
export function splitLongItems(md) {
  return md.split('\n').map(line => {
    const m = line.match(/^(\s*)- (Lợi ích|Ghi chú|Nguồn):(.*)$/);
    if (!m) return line;
    const [, indent, label, body] = m;
    const chunks = label === 'Nguồn' ? splitSrc(body) : splitGain(body);
    if (chunks.length < 2) return line;
    return `${indent}- ${label}:\n` + chunks.map(c => `${indent}  - ${safe(c.trim())}`).join('\n');
  }).join('\n');
}
