/* Shared by the buildless website and the Node book builders. No DOM or filesystem access. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BookReferences = factory();
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const ID = '[a-z0-9]+(?:-[a-z0-9]+)*';
  const IDENTITY = new RegExp('^<a name="entry-(' + ID + ')"(?: data-legacy="(\\d+-\\d+)")?></a>$');
  const LINK = /\[([^\]]+)\]\(([^\s)]+)(?:\s+"refs:([a-z0-9,-]+)")?\)/g;
  const FIELDS = {'Chi phí':'cost','Nói dễ hiểu':'human','Lợi ích':'gain','Pháp luật Việt Nam':'legal','Mức bằng chứng':'grade','Nguồn':'src','Ghi chú':'note'};
  const plainText = text => String(text).replace(LINK, '$1').replace(/\*\*/g, '');
  const slug = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').split('-').slice(0, 12).join('-');
  function identity(line) {
    const m = IDENTITY.exec(line.trim()); return m ? {id:m[1], legacy:m[2] || ''} : null;
  }
  function section(md, file = '') {
    const head = /^# (\d+)\. (.+)$/m.exec(md);
    if (!head) throw new Error(file + ': thiếu tiêu đề chương');
    const s = {n:head[1], title:head[2], file, intro:[], entries:[]}; let e = null;
    for (const line of md.split(/\r?\n/)) {
      const h = /^### (\d+)\. (.+)$/.exec(line);
      if (h) { e = {sec:s.n,n:h[1],title:h[2],file,id:'',legacy:'',fields:{},tags:''}; s.entries.push(e); continue; }
      if (!e) { s.intro.push(line); continue; }
      const anchor = identity(line);
      if (anchor) { if (e.id) throw new Error(file + ': trùng neo trong mục ' + e.n); Object.assign(e, anchor); continue; }
      if (/^<!--\s*nhãn:/.test(line)) e.tags = line;
      const f = /^- ([^:]+):(.*)$/.exec(line);
      if (f && FIELDS[f[1]]) { e[FIELDS[f[1]]] = f[2]; e.fields[f[1]] = f[2]; }
    }
    return s;
  }
  function catalog(parts, requireIds = true) {
    const sections = Object.entries(parts).map(([file,md]) => section(md,file));
    const entries = sections.flatMap(s => s.entries), byId = new Map(), byNumber = new Map(), byLegacy = new Map();
    for (const e of entries) {
      if (requireIds && !e.id) throw new Error(e.file + ': mục ' + e.n + ' chưa có ID cố định');
      if (e.id && byId.has(e.id)) throw new Error('ID trùng: ' + e.id);
      if (e.legacy && byLegacy.has(e.legacy)) throw new Error('Alias trùng: ' + e.legacy);
      if (e.id) byId.set(e.id,e);
      if (e.legacy) byLegacy.set(e.legacy,e);
      byNumber.set(e.sec + '-' + e.n,e);
    }
    return {sections,entries,byId,byNumber,byLegacy};
  }
  function idsOf(href, extra = '') {
    const m = /#entry-([a-z0-9-]+)$/.exec(href);
    return extra ? extra.split(',') : m ? [m[1]] : [];
  }
  function hrefFor(e, from = e.file) {
    const name = e.file.split('/').pop();
    return (from.startsWith('docs/') ? '../book/' : from.startsWith('book/') ? '' : 'book/') + name + '#entry-' + e.id;
  }
  function labelFor(label, entries) {
    if (!entries.length) return label;
    const first = entries[0];
    if (!/^(?:chương\s*\d+\s*)?mục\s*[\d,\sđếnvà–-]+$|^\d+$/iu.test(label)) return label;
    const cross = /^chương/i.test(label), bare = /^\d/.test(label);
    let prefix = cross ? 'chương ' + first.sec + ' mục ' : bare ? '' : 'mục ';
    if (/^[CM]/.test(label)) prefix = prefix[0].toUpperCase() + prefix.slice(1);
    const unchanged = numbers => JSON.stringify((label.match(/\d+/g) || []).map(Number)) === JSON.stringify(numbers.map(Number));
    if (entries.length === 1) return unchanged(cross ? [first.sec,first.n] : [first.n]) ? label : prefix + first.n;
    const same = entries.every(e => e.sec === first.sec);
    const contiguous = same && entries.every((e,i) => +e.n === +first.n + i);
    if (contiguous && /đến|–|-/.test(label)) return unchanged(cross ? [first.sec,first.n,entries.at(-1).n] : [first.n,entries.at(-1).n]) ? label : prefix + first.n + ' đến ' + entries.at(-1).n;
    return same ? prefix + entries.map(e => e.n).join(', ') : entries.map(e => 'chương ' + e.sec + ' mục ' + e.n).join(', ');
  }
  function refreshLinks(md, c, from = '') {
    return md.replace(LINK, (all,label,href,extra) => {
      const ids = idsOf(href,extra); if (!ids.length) return all;
      const entries = ids.map(id => c.byId.get(id));
      if (entries.some(e => !e)) throw new Error(from + ': tham chiếu ID không tồn tại: ' + ids.join(','));
      const title = ids.length > 1 ? ' "refs:' + ids.join(',') + '"' : '';
      let text = labelFor(label,entries);
      const fromSec = c.sections.find(s => s.file === from)?.n || /(?:^|\/)(\d+)-/.exec(from)?.[1];
      const moved = href.split('#')[0].split('/').pop() !== entries[0].file.split('/').pop();
      if (moved && fromSec && +fromSec !== +entries[0].sec && /^(?:mục\s|\d)/i.test(label) && entries.every(e=>e.sec === entries[0].sec)) {
        text = labelFor('chương ' + entries[0].sec + ' mục ' + label.replace(/^mục\s*/i,''),entries);
      }
      return '[' + text + '](' + hrefFor(entries[0],from) + title + ')';
    });
  }
  function links(text) {
    return [...text.matchAll(LINK)].map(m => ({index:m.index,text:m[0],label:m[1],href:m[2],ids:idsOf(m[2],m[3])})).filter(x => x.ids.length);
  }
  function withoutGroupIndex(lines) {
    let inGroupIndex = false;
    return lines.filter(line => {
      if (/^\*\*Nhóm mục\*\*\s*:/.test(line)) return false;
      if (/^Các mục trong chương chia theo nhóm như sau,/.test(line)) { inGroupIndex = true; return false; }
      if (!line.trim()) return true;
      if (inGroupIndex && /^\*\*[^*]+\*\*\s*:/.test(line) && links(line).length) return false;
      inGroupIndex = false; return true;
    });
  }
  const RANGE = '\\d+(?:\\s*(?:đến|–|-)\\s*(?:mục\\s*)?\\d+)?';
  const SPEC = RANGE + '(?:\\s*(?:,|và)\\s*(?:mục\\s*)?' + RANGE + ')*';
  function references(text, sec, c, {source = false, doc = false} = {}) {
    // Existing Markdown links and literal code are opaque. Never link inside a URL.
    const excluded = [...text.matchAll(/\[[^\]]*\]\([^)]*\)|`[^`]*`|https?:\/\/\S+/g)].map(m => [m.index,m.index+m[0].length]);
    const candidates = [], cross = new RegExp('chương\\s*(\\d+)\\s*mục\\s+(' + SPEC + ')(?![\\d\\p{L}]|\\.\\d)','giu');
    for (const m of text.matchAll(cross)) candidates.push({start:m.index,end:m.index+m[0].length,text:m[0],sec:m[1],spec:m[2],prefix:m[0].slice(0,m[0].length-m[2].length)});
    if (!source && !doc) for (const m of text.matchAll(new RegExp('mục\\s+(' + SPEC + ')(?![\\d\\p{L}]|\\.\\d)','giu'))) {
      if (candidates.some(r => m.index >= r.start && m.index < r.end)) continue;
      const tail = text.slice(0,m.index).trimEnd();
      if (/(Điều\s*\d+|\d+\s*\/\s*\d{4}\/|(?:Nghị định|Thông tư|Luật|Quyết định|QĐ|TT|NĐ)[^.;:]{0,20}\d+)$/i.test(tail)) continue;
      candidates.push({start:m.index,end:m.index+m[0].length,text:m[0],sec:String(sec),spec:m[1],prefix:m[0].slice(0,m[0].length-m[1].length)});
    }
    return candidates.filter(r => !excluded.some(([a,b]) => r.start >= a && r.start < b)).sort((a,b) => a.start-b.start).map(r => {
      const chunks = r.spec.split(/(\s*,\s*|\s+và\s+)/); let first = true;
      const segments = chunks.map((part,i) => {
        if (i % 2) return {label:part,ids:[]};
        const m = /^(?:mục\s*)?(\d+)(?:\s*(?:đến|–|-)\s*(?:mục\s*)?(\d+))?$/.exec(part);
        if (!m) return {label:part,ids:[]};
        const a = +m[1], b = m[2] ? +m[2] : a;
        const numbers = b >= a && b-a <= 40 ? Array.from({length:b-a+1},(_,j) => a+j) : [];
        const targets = numbers.map(n => c.byNumber.get(r.sec + '-' + n));
        const label = (first ? r.prefix : '') + part; first = false;
        return {label,ids:targets.length && targets.every(Boolean) ? targets.map(e => e.id) : [],numbers};
      });
      return {...r,segments};
    });
  }
  function migrateLine(text, sec, c, from, options) {
    const refs = references(text,sec,c,options); let out = '', last = 0;
    for (const ref of refs) {
      if (ref.segments.some(s => s.numbers && !s.ids.length)) throw new Error(from + ': cần đối chiếu tay: ' + ref.text);
      out += text.slice(last,ref.start);
      for (const s of ref.segments) out += s.ids.length ? '[' + s.label + '](' + hrefFor(c.byId.get(s.ids[0]),from) + (s.ids.length > 1 ? ' "refs:' + s.ids.join(',') + '"' : '') + ')' : s.label;
      last = ref.end;
    }
    return out + text.slice(last);
  }
  return {identity,section,catalog,slug,plainText,idsOf,hrefFor,labelFor,refreshLinks,links,withoutGroupIndex,references,migrateLine,fieldNames:FIELDS};
});
