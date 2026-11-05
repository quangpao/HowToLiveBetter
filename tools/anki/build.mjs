// Đóng toàn bộ mục trong sách thành một bộ thẻ Anki (.apkg), mỗi mục một thẻ hỏi đáp, chia bộ con theo chương (issue #97).
// Cách dùng: node tools/anki/build.mjs [đường dẫn đầu ra]   mặc định ghi dist/HowToLiveBetter.apkg
//
// Mặt trước thẻ là tên chương và tiêu đề mục, mặt sau là "nói dễ hiểu", chi phí, mức đáng làm, mức lợi ích, thước đo và mức bằng chứng, kèm một liên kết tới bản online.
// Bản thân tiêu đề đã là lời khuyên, nên mặt trước không để chỗ trống; khi ôn tập người học nhớ lại "vì sao đáng làm, tốn bao nhiêu".
// Muốn để chỗ trống thì phải đánh dấu tay từng mục, thêm mục mới lại phải đánh theo, không kham nổi việc bảo trì, nên chỉ làm kiểu tự sinh này.
//
// Không phụ thuộc gói ngoài: .apkg chính là một zip, bên trong là một CSDL SQLite (cấu trúc CSDL kiểu cũ của Anki 2.1, mọi phiên bản Anki đều nhập được)
// cộng thêm một danh sách media. CSDL ghi bằng node:sqlite có sẵn của Node, zip dùng tools/lib/zip.mjs.
//
// Khi nhập lại, Anki nhận "cùng một thẻ" theo guid của ghi chú: nội dung được cập nhật, lịch sử ôn tập được giữ. guid lấy "số chương-số mục",
// nên chỉ cần thêm mục vào cuối chương (CLAUDE.md vốn đã yêu cầu vậy) là không bị lẫn; khi xóa một mục làm số mục phía sau giảm đều một bậc,
// thẻ bên người dùng cũ sẽ khớp sang nội dung mới, lịch sử ôn tập lệch theo một mục, cái giá này chấp nhận được.
// id của bộ thẻ và kiểu ghi chú được viết cứng, cũng để khi nhập lại thì gộp vào đúng bộ thẻ cũ, không tạo bộ mới.
import { writeFileSync, readFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { zip } from '../lib/zip.mjs';
import { ROOT, SITE, TITLE, read, readBook, COST_W, ratioOf, gitCommit, buildStamp } from '../lib/book.mjs';

const OUT = resolve(ROOT, process.argv[2] ?? 'dist/HowToLiveBetter.apkg');
const NOW = new Date();
const NOW_S = Math.floor(NOW.getTime() / 1000);
const NOW_MS = NOW.getTime();

const MODEL_ID = 1759900000001;
const ROOT_DECK_ID = 1759900000100;
const deckId = sec => ROOT_DECK_ID + Number(sec);
const noteId = (sec, n) => 1759900100000 + Number(sec) * 1000 + Number(n);
const cardId = (sec, n) => 1759900200000 + Number(sec) * 1000 + Number(n);

// ---------- Đọc mục ----------
const FIELD = { 'Chi phí': 'cost', 'Nói dễ hiểu': 'human', 'Mức bằng chứng': 'grade', 'Ghi chú': 'note' };

function parseSection(md) {
  const head = md.match(/^# (\d+)\. (.+)$/m);
  if (!head) throw new Error('File chương phải có dòng "# N. Tên chương"');
  const entries = [];
  let e = null;
  for (const line of md.split('\n')) {
    const h = line.match(/^### (\d+)\. (.+)$/);
    if (h) { e = { n: h[1], title: h[2].trim() }; entries.push(e); continue; }
    if (!e) continue;
    const tag = line.match(/^<!--\s*nhãn:\s*(.*?)\s*-->/);
    if (tag) {
      // Nhãn tiếng Việt → tên khóa nội bộ dùng chung với index.html và sync-stats
      const KEY = { 'tiền': 'money', 'thời-gian': 'time', 'ý-chí': 'will', 'lợi-ích': 'level', 'thước-đo': 'lens', 'nhóm': 'who' };
      for (const kv of tag[1].split(/\s+/)) {
        const [k, v] = kv.split('=');
        const key = KEY[k];
        if (key) e[key] = key === 'who' ? v.split(',').map(g => g.split('+')) : v;
      }
      continue;
    }
    const f = line.match(/^- (Chi phí|Nói dễ hiểu|Mức bằng chứng|Ghi chú):(.*)$/);
    if (f) e[FIELD[f[1]]] = f[2].trim();
  }
  return { sec: head[1], name: head[2].trim(), entries };
}

const { bookFiles } = readBook();
const sections = bookFiles.map(f => parseSection(read(f)));

// ---------- Các trường ----------
const esc = s => String(s ?? '').replace(/\*\*/g, '').replace(/\\([*_])/g, '$1')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pad = n => String(n).padStart(2, '0');
const deckName = s => `${TITLE}::${pad(s.sec)} ${s.name}`;

const FIELDS = ['Chương', 'Tiêu đề', 'Nói dễ hiểu', 'Chi phí', 'Tóm tắt', 'Liên kết'];
const notes = [];
let due = 0;
for (const s of sections) {
  for (const e of s.entries) {
    const cost = (COST_W.money[e.money] ?? 0) + (COST_W.time[e.time] ?? 0) + (COST_W.will[e.will] ?? 0);
    const ratio = e.level ? ratioOf(cost, e.level) : '';
    const grade = (e.grade ?? '').match(/^[ABC]/)?.[0] ?? '';
    const dispute = /^\*?\*?(tranh|đang tranh)/i.test(e.note ?? '') || /^tranh luận/i.test(e.note ?? '');
    const points = [
      ratio && `đáng làm: ${ratio}`,
      e.level && `lợi ích: ${e.level}`,
      e.lens && `đo bằng ${String(e.lens).replace(/-/g, ' ')}`,
      grade && `bằng chứng ${grade}${dispute ? ' (có tranh luận)' : ''}`,
    ].filter(Boolean).join(' · ');
    const url = `${SITE}#e-${s.sec}-${e.n}`;
    const fields = [
      `Chương ${s.sec} · ${esc(s.name)} · mục ${e.n}`,
      esc(e.title),
      esc(e.human || ''),
      esc(e.cost || ''),
      esc(points),
      `<a href="${url}">Xem bản đầy đủ và nguồn</a>`,
    ];
    const tags = [`Chuong${pad(s.sec)}`, grade && `BangChung${grade}`, ratio && `DangLam_${ratio}`, e.lens && `Do_${String(e.lens).replace(/-/g, '')}`, dispute && 'TranhLuan']
      .filter(Boolean);
    notes.push({ s, e, fields, tags, due: due++ });
  }
}

// ---------- Kiểu ghi chú và bộ thẻ ----------
const CSS = `.card { font-family: "Iowan Old Style", Georgia, -apple-system, "Segoe UI", "Helvetica Neue", sans-serif;
  font-size: 18px; line-height: 1.7; text-align: left; max-width: 40em; margin: 0 auto; padding: 0 12px; color: #213547; background: #fff; }
.nightMode.card, .night_mode .card { color: rgba(255,255,245,.86); background: #1b1b1f; }
.sec { font-size: 13px; color: #67676c; }
.q { font-size: 22px; font-weight: 600; margin: 8px 0 12px; }
.hint { font-size: 14px; color: #67676c; }
.label { font-size: 13px; color: #67676c; margin-top: 14px; }
.points { font-size: 14px; margin-top: 14px; }
.link { font-size: 14px; margin-top: 14px; }
a { color: #3451b2; }
.nightMode a, .night_mode a { color: #a8b1ff; }
.nightMode .sec, .nightMode .hint, .nightMode .label { color: #98989f; }`;

const QFMT = `<div class="sec">{{Chương}}</div>
<div class="q">{{Tiêu đề}}</div>
<div class="hint">Nghĩ trước: việc này để làm gì, tốn bao nhiêu, bằng chứng mạnh đến đâu?</div>`;
const AFMT = `<div class="sec">{{Chương}}</div>
<div class="q">{{Tiêu đề}}</div>
<hr id="answer">
{{#Nói dễ hiểu}}<div class="label">Nói dễ hiểu</div><div>{{Nói dễ hiểu}}</div>{{/Nói dễ hiểu}}
{{#Chi phí}}<div class="label">Chi phí</div><div>{{Chi phí}}</div>{{/Chi phí}}
<div class="points">{{Tóm tắt}}</div>
<div class="link">{{Liên kết}}</div>`;

const model = {
  id: MODEL_ID, name: `${TITLE} (thẻ hỏi đáp)`, type: 0, mod: NOW_S, usn: -1, sortf: 1, did: ROOT_DECK_ID,
  tmpls: [{ name: 'Hỏi đáp', ord: 0, qfmt: QFMT, afmt: AFMT, did: null, bqfmt: '', bafmt: '' }],
  flds: FIELDS.map((name, ord) => ({ name, ord, sticky: false, rtl: false, font: 'Arial', size: 20, media: [] })),
  css: CSS, latexPre: '', latexPost: '', latexsvg: false, req: [[0, 'any', [1]]], tags: [], vers: [],
};

const deck = (id, name, desc = '') => ({
  id, name, desc, mod: NOW_S, usn: -1, dyn: 0, conf: 1, collapsed: false, browserCollapsed: false,
  newToday: [0, 0], revToday: [0, 0], lrnToday: [0, 0], timeToday: [0, 0], extendNew: 0, extendRev: 0,
});
const commit = gitCommit();
const rootDesc = `Toàn bộ mục trong "${TITLE}", mỗi mục một thẻ, chia sổ con theo chương. Dựng lúc ${buildStamp()} (giờ Việt Nam)`
  + `${commit ? `, bản nội dung ${commit.slice(0, 7)}` : ''}. Nội dung còn cập nhật, lấy <a href="${SITE}">bản online</a> làm chuẩn; `
  + 'Tải lại rồi nhập lại sẽ cập nhật nội dung thẻ, lịch sử ôn tập được giữ nguyên.';
const decks = {
  1: deck(1, 'Default'),
  [ROOT_DECK_ID]: deck(ROOT_DECK_ID, TITLE, rootDesc),
  ...Object.fromEntries(sections.map(s => [deckId(s.sec), deck(deckId(s.sec), deckName(s))])),
};

const dconf = {
  1: {
    id: 1, name: 'Default', mod: 0, usn: 0, maxTaken: 60, autoplay: true, timer: 0, replayq: true, dyn: false,
    new: { delays: [1, 10], ints: [1, 4, 7], initialFactor: 2500, order: 1, perDay: 20, bury: true, separate: true },
    rev: { perDay: 200, ease4: 1.3, fuzz: 0.05, ivlFct: 1, maxIvl: 36500, minSpace: 1, bury: true },
    lapse: { delays: [10], mult: 0, minInt: 1, leechFails: 8, leechAction: 0 },
  },
};
const conf = {
  activeDecks: [1], curDeck: 1, newSpread: 0, collapseTime: 1200, timeLim: 0, estTimes: true, dueCounts: true,
  curModel: String(MODEL_ID), nextPos: notes.length + 1, sortType: 'noteFld', sortBackwards: false, addToCur: true,
};

// ---------- Ghi CSDL ----------
const SCHEMA = `
CREATE TABLE col (id integer primary key, crt integer not null, mod integer not null, scm integer not null,
  ver integer not null, dty integer not null, usn integer not null, ls integer not null, conf text not null,
  models text not null, decks text not null, dconf text not null, tags text not null);
CREATE TABLE notes (id integer primary key, guid text not null, mid integer not null, mod integer not null,
  usn integer not null, tags text not null, flds text not null, sfld integer not null, csum integer not null,
  flags integer not null, data text not null);
CREATE TABLE cards (id integer primary key, nid integer not null, did integer not null, ord integer not null,
  mod integer not null, usn integer not null, type integer not null, queue integer not null, due integer not null,
  ivl integer not null, factor integer not null, reps integer not null, lapses integer not null, left integer not null,
  odue integer not null, odid integer not null, flags integer not null, data text not null);
CREATE TABLE revlog (id integer primary key, cid integer not null, usn integer not null, ease integer not null,
  ivl integer not null, lastIvl integer not null, factor integer not null, time integer not null, type integer not null);
CREATE TABLE graves (usn integer not null, oid integer not null, type integer not null);
CREATE INDEX ix_notes_usn on notes (usn);
CREATE INDEX ix_cards_usn on cards (usn);
CREATE INDEX ix_revlog_usn on revlog (usn);
CREATE INDEX ix_cards_nid on cards (nid);
CREATE INDEX ix_cards_sched on cards (did, queue, due);
CREATE INDEX ix_revlog_cid on revlog (cid);
CREATE INDEX ix_notes_csum on notes (csum);`;

const tmp = mkdtempSync(join(tmpdir(), 'anki-'));
const dbPath = join(tmp, 'collection.anki2');
const db = new DatabaseSync(dbPath);
db.exec(SCHEMA);
const dayStart = Math.floor(new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()).getTime() / 1000);
db.prepare('INSERT INTO col VALUES (1, ?, ?, ?, 11, 0, 0, 0, ?, ?, ?, ?, ?)').run(
  dayStart, NOW_MS, NOW_MS, JSON.stringify(conf), JSON.stringify({ [MODEL_ID]: model }),
  JSON.stringify(decks), JSON.stringify(dconf), '{}');

const stripHtml = s => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const csum = s => parseInt(createHash('sha1').update(stripHtml(s)).digest('hex').slice(0, 8), 16);
const insNote = db.prepare('INSERT INTO notes VALUES (?, ?, ?, ?, -1, ?, ?, ?, ?, 0, \'\')');
const insCard = db.prepare('INSERT INTO cards VALUES (?, ?, ?, 0, ?, -1, 0, 0, ?, 0, 0, 0, 0, 0, 0, 0, 0, \'\')');
db.exec('BEGIN');
for (const { s, e, fields, tags, due } of notes) {
  const sortField = fields[model.sortf];
  insNote.run(noteId(s.sec, e.n), `hltb-${s.sec}-${e.n}`, MODEL_ID, NOW_S, ` ${tags.join(' ')} `,
    fields.join('\x1f'), stripHtml(sortField), csum(sortField));
  insCard.run(cardId(s.sec, e.n), noteId(s.sec, e.n), deckId(s.sec), NOW_S, due);
}
db.exec('COMMIT');
db.close();
const collection = readFileSync(dbPath);
rmSync(tmp, { recursive: true, force: true });

// ---------- Đóng gói ----------
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, zip([
  { name: 'collection.anki2', data: collection },
  { name: 'media', data: Buffer.from('{}') },
], NOW));
const missing = notes.filter(x => !x.fields[2]).length;
console.log(`Đã tạo ${OUT}: ${sections.length} chương ${notes.length} thẻ${missing ? `, trong đó ${missing} thẻ thiếu "nói dễ hiểu"` : ''}`);
