// Mới cập nhật: lần theo lịch sử git, so từng mục trong book/, ghi lại mỗi mục được thêm ngày nào, nội dung sửa lần cuối ngày nào,
// rồi ghi vào updates.json ở thư mục gốc; trang tra cứu dùng nó để đánh dấu "mới", "đã sửa" và lọc "mới cập nhật".
//
//   node tools/updates.mjs            # sinh lại updates.json (sync-stats.mjs tự gọi)
//   node tools/updates.mjs --check    # chỉ so không ghi, cũ rồi thì mã thoát 1 (dùng cho CI, cần fetch-depth: 0)
//
// Không dùng thông điệp commit: đó là viết cho người bảo trì ("đồng bộ phần dẫn", "bổ sung neo"), người đọc không hiểu.
// Mục được nhận theo tiêu đề, không theo số mục: xoá một mục là số mục phía sau đổi hết. Theo quy ước, tiêu đề chỉ được thêm chữ, nên hai bản trước sau
// khi tiêu đề không khớp thì ghép cặp theo độ giống nhau của tiêu đề và nội dung, cái nào không ghép được mới tính là thêm hoặc xoá.
// Chỉ khi nội dung người đọc nhìn thấy đổi mới tính là "đã sửa": tiêu đề, chi phí, nói dễ hiểu, lợi ích, mức bằng chứng, ghi chú.
// Cột nguồn, nhãn chi phí, số mục bị dồn, số mục và từ neo trong "mục N (neo)" đổi đều không tính, không thì ngày nào cũng đầy "đã sửa".
// Chỉ đi theo commit cha thứ nhất của main: PR merge bằng merge --no-ff ở máy được tính vào ngày merge.
// Mọi mục trước ngày mốc đều coi là mục cũ, không đánh dấu mới. Ngày tính theo giờ Việt Nam.
// --check chỉ so "mục nào, thêm hay sửa, sửa cột nào", không so ngày: PR trên CI là commit merge tạm,
// ngày chắc chắn lệch một chút so với lúc sinh ở máy.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { ROOT } from './lib/book.mjs';

const CHECK = process.argv.includes('--check');
const SINCE = '2026-11-01';
const OUT = 'updates.json';
const FIELDS = ['Tiêu đề', 'Chi phí', 'Nói dễ hiểu', 'Lợi ích', 'Pháp luật Việt Nam', 'Mức bằng chứng', 'Ghi chú'];

const day = sec => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(sec * 1000));
const git = (args, input) => {
  const r = spawnSync('git', ['-c', 'core.quotepath=false', ...args], { cwd: ROOT, input, maxBuffer: 1 << 30 });
  if (r.status !== 0) throw new Error(`git ${args.join(' ')} lỗi: ${r.stderr}`);
  return r.stdout;
};

// ---------- Phân tích ----------
// Số mục và từ neo trong tham chiếu đổi theo việc dồn mục và bổ sung neo, nên xoá đi rồi mới so
const norm = s => s.replace(/\s+/g, '')
  .replace(/mục\s*\d+/gi, 'mục #')
  .replace(/chương\s*\d+/gi, 'chương #');

function parse(text) {
  const out = [];
  let sec = null, e = null;
  for (const line of text.split(/\r?\n/)) {
    let m;
    if ((m = /^# (\d+)\. /.exec(line))) { sec = m[1]; continue; }
    if ((m = /^### (\d+)\. (.+)$/.exec(line)) && sec) {
      e = { key: `${sec}-${m[1]}`, f: { 'Tiêu đề': m[2].trim() } };
      out.push(e); continue;
    }
    if (!e) continue;
    if ((m = /^- (Chi phí|Nói dễ hiểu|Lợi ích|Pháp luật Việt Nam|Mức bằng chứng|Ghi chú):(.*)$/.exec(line))) e.f[m[1]] = m[2].trim();
  }
  for (const x of out) x.n = Object.fromEntries(FIELDS.map(k => [k, norm(x.f[k] ?? '')]));
  return out;
}

// Tiếng Việt: cắt theo từ (khoảng trắng) rồi lấy cặp hai từ liền nhau làm dấu hiệu so khớp
const grams = s => { const w = s.toLowerCase().split(/[\s,.;:()\[\]"“”]+/).filter(Boolean); const g = new Set(); for (let i = 0; i < w.length - 1; i++) g.add(w[i] + ' ' + w[i + 1]); return g; };
function dice(a, b) {
  if (!a.size || !b.size) return 0;
  let n = 0; for (const x of a) if (b.has(x)) n++;
  return 2 * n / (a.size + b.size);
}

// Ghép các mục của bản trước (kèm thông tin theo dõi) với bản này, trả về danh sách theo dõi của bản này
function step(prev, cur, date) {
  const next = new Array(cur.length);
  const byTitle = new Map();
  prev.forEach((p, i) => { const k = p.e.n['Tiêu đề']; if (!byTitle.has(k)) byTitle.set(k, []); byTitle.get(k).push(i); });
  const used = new Set();
  // ① Tiêu đề khớp từng chữ: mục cùng tên ưu tiên ghép trong cùng số chương
  cur.forEach((c, j) => {
    const cand = (byTitle.get(c.n['Tiêu đề']) ?? []).filter(i => !used.has(i));
    if (!cand.length) return;
    const sec = c.key.split('-')[0];
    const i = cand.find(i => prev[i].e.key.split('-')[0] === sec) ?? cand[0];
    used.add(i); next[j] = { ...prev[i], e: c };
  });
  // ② Phần còn lại ghép theo độ giống nhau của tiêu đề và nội dung
  const restP = prev.map((p, i) => i).filter(i => !used.has(i));
  const restC = cur.map((c, j) => j).filter(j => !next[j]);
  if (restP.length && restC.length) {
    const sig = e => ({ t: grams(e.n['Tiêu đề']), b: grams(e.n['Nói dễ hiểu'] + e.n['Lợi ích']) });
    const sp = new Map(restP.map(i => [i, sig(prev[i].e)]));
    const pairs = [];
    for (const j of restC) {
      const sc = sig(cur[j]);
      for (const i of restP) {
        const s = Math.max(dice(sc.t, sp.get(i).t), dice(sc.b, sp.get(i).b) * 0.9);
        if (s >= 0.5) pairs.push([s, i, j]);
      }
    }
    pairs.sort((a, b) => b[0] - a[0]);
    for (const [, i, j] of pairs) {
      if (used.has(i) || next[j]) continue;
      used.add(i); next[j] = { ...prev[i], e: cur[j] };
    }
  }
  cur.forEach((c, j) => { if (!next[j]) next[j] = { e: c, added: date, changed: null, fields: [] }; });
  return next;
}

// Chỉ đổi lời văn không tính là "đã sửa": 2026-10-14 rà soát cả sách một lần sửa hơn năm trăm mục phần nói dễ hiểu và ghi chú, đánh dấu hết thì người đọc bị nhấn chìm.
// Tính là sửa khi: tiêu đề hoặc mức bằng chứng đổi; con số trong cột đổi (dữ liệu mới, số đã sửa); hoặc một cột dài ra đáng kể (bổ sung nội dung mới).
const nums = s => (s.match(/\d+(?:\.\d+)?/g) ?? []).sort().join();
function real(k, a, b) {
  if (a === b) return false;
  if (k === 'Tiêu đề' || k === 'Mức bằng chứng') return true;
  return nums(a) !== nums(b) || b.length - a.length >= Math.max(60, a.length / 4);
}

// Sau khi ghép cặp thì so từng cột, ghi lại đã sửa cột nào; trong cùng một ngày sửa mấy lượt thì gộp các cột lại
function advance(prev, cur, date) {
  const next = step(prev, cur, date);
  const old = new Map(prev.map(p => [p.id, p.e]));
  for (const t of next) {
    if (t.id === undefined) { t.id = SEQ++; continue; }
    const o = old.get(t.id);
    const diff = FIELDS.filter(k => real(k, o.n[k], t.e.n[k]));
    if (!diff.length || t.added === date) continue;
    t.fields = t.changed === date ? [...new Set([...t.fields, ...diff])] : diff;
    t.changed = date;
  }
  return next;
}
let SEQ = 0;

// ---------- Lấy lịch sử ----------
const sinceTs = Math.floor(new Date(`${SINCE}T00:00:00+07:00`).getTime() / 1000);
const base = git(['rev-list', '-1', '--first-parent', `--before=${sinceTs}`, 'HEAD']).toString().trim();
if (!base) throw new Error(`Không thấy commit nào trước ${SINCE}. Trên CI phải checkout với fetch-depth: 0`);
const log = git(['log', '--first-parent', '--reverse', '--diff-merges=first-parent', '--name-only',
  '--format=@%H %ct', `${base}..HEAD`, '--', 'book/']).toString();
const commits = [];
for (const line of log.split('\n')) {
  if (line.startsWith('@')) { const [h, t] = line.slice(1).split(' '); commits.push({ h, date: day(Number(t)), files: [] }); continue; }
  if (/^book\/.+\.md$/.test(line.trim())) commits.at(-1).files.push(line.trim());
}
const isVi = txt => typeof txt === 'string' && txt.includes('- Chi phí:');
const baseFiles = git(['ls-tree', '--name-only', base, 'book/']).toString().split('\n')
  .filter(f => f.endsWith('.md'))
  .filter(f => isVi(git(['show', `${base}:${f}`]).toString()));

// Lấy hết các phiên bản cần một lần bằng cat-file --batch, trên Windows khởi từng tiến trình git quá chậm
const reqs = [...baseFiles.map(f => `${base}:${f}`), ...commits.flatMap(c => c.files.map(f => `${c.h}:${f}`))];
const blob = git(['cat-file', '--batch'], reqs.join('\n') + '\n');
const got = new Map();
let pos = 0;
for (const r of reqs) {
  const nl = blob.indexOf(10, pos);
  const head = blob.subarray(pos, nl).toString();
  pos = nl + 1;
  if (head.endsWith(' missing')) { got.set(r, null); continue; }
  const size = Number(head.split(' ')[2]);
  got.set(r, blob.subarray(pos, pos + size).toString('utf8'));
  pos += size + 1;
}

// ---------- So từng phiên bản ----------
const files = new Map(baseFiles.map(f => [f, got.get(`${base}:${f}`)]));
const snapshot = () => [...files.keys()].sort().flatMap(f => files.get(f) ? parse(files.get(f)) : []);
let track = advance([], snapshot(), null);
for (const c of commits) {
  for (const f of c.files) files.set(f, got.get(`${c.h}:${f}`));
  track = advance(track, snapshot(), c.date);
}
// Thay đổi chưa commit trong vùng làm việc tính là hôm nay: sync-stats chạy trước khi commit, sinh ra đúng như sau khi commit
const disk = readdirSync(join(ROOT, 'book')).filter(f => f.endsWith('.md')).map(f => `book/${f}`)
  .filter(f => isVi(readFileSync(join(ROOT, f), 'utf8')));
const dirty = disk.some(f => readFileSync(join(ROOT, f), 'utf8').replace(/\r\n/g, '\n') !== files.get(f)?.replace(/\r\n/g, '\n'))
  || [...files.keys()].some(f => files.get(f) && !disk.includes(f));
if (dirty) {
  files.clear();
  for (const f of disk) files.set(f, readFileSync(join(ROOT, f), 'utf8'));
  track = advance(track, snapshot(), day(Date.now() / 1000));
}

// ---------- Xuất ra ----------
const items = {};
for (const t of track) {
  if (t.added) items[t.e.key] = { added: t.added };
  else if (t.changed) items[t.e.key] = { changed: t.changed, fields: FIELDS.filter(k => t.fields.includes(k)) };
}
const keys = Object.keys(items).sort((a, b) => {
  const [x1, y1] = a.split('-').map(Number), [x2, y2] = b.split('-').map(Number);
  return x1 - x2 || y1 - y2;
});
// Mỗi mục một dòng, diff đọc được
const json = `{"since":"${SINCE}","items":{\n${keys.map(k => `${JSON.stringify(k)}:${JSON.stringify(items[k])}`).join(',\n')}\n}}\n`;

const nAdd = keys.filter(k => items[k].added).length, nChg = keys.length - nAdd;
console.log(`Cập nhật: từ ${SINCE} có ${nAdd} mục mới, ${nChg} mục đã sửa (so ${commits.length} commit${dirty ? ' và vùng làm việc' : ''})`);

const strip = s => JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(s).items)
  .map(([k, v]) => [k, v.added ? 'added' : v.fields.join()])));
const old = existsSync(join(ROOT, OUT)) ? readFileSync(join(ROOT, OUT), 'utf8') : '';
if (CHECK) {
  if (old && strip(old) === strip(json)) { console.log('updates.json khớp'); process.exit(0); }
  console.log('updates.json đã cũ — chạy node tools/updates.mjs rồi commit.');
  process.exit(1);
}
if (old.replace(/\r\n/g, '\n') !== json) writeFileSync(join(ROOT, OUT), json);
