import api from '../../assets/book-citations.js';
import { read } from './book.mjs';
import { refs } from './references.mjs';
export const citations = api;
export const registry = JSON.parse(read('data/legal-references.json'));
export function validateCitations(catalog, data = registry) {
  if (data.version !== 1 || !Array.isArray(data.references)) throw new Error('Unsupported legal registry');
  const ids = new Set(), bindings = new Set();
  for (const ref of data.references) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(ref.id) || ids.has(ref.id)) throw new Error('Invalid/duplicate legal ID: ' + ref.id);
    ids.add(ref.id);
    for (const key of ['document','provision','title','quote','sourceUrl','sourceLocation','versionLabel','checkedAt','verificationScope']) if (!ref[key]?.trim()) throw new Error(ref.id + ': missing ' + key);
    const url = new URL(ref.sourceUrl);
    if (url.protocol !== 'https:' || !/(^|\.)(?:gov\.vn|chinhphu\.vn)$/.test(url.hostname)) throw new Error(ref.id + ': expected an official government source');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ref.checkedAt)) throw new Error(ref.id + ': invalid check date');
    if (!ref.bindings?.length) throw new Error(ref.id + ': missing bindings');
    for (const b of ref.bindings) {
      const e = catalog.byId.get(b.entryId), key = b.entryId + '\0' + b.field + '\0' + b.text;
      if (!e || !refs.fieldNames || !Object.values(refs.fieldNames).includes(b.field)) throw new Error(ref.id + ': unknown entry/field');
      if (!b.text?.trim() || bindings.has(key)) throw new Error(ref.id + ': invalid/duplicate binding');
      bindings.add(key);
      const text = e[b.field] || '';
      if (text.split(b.text).length !== 2) throw new Error(ref.id + ': binding must occur exactly once; update the registry after editing source');
    }
  }
  // Two different references cannot claim overlapping text in the same field.
  for (const e of catalog.entries) for (const field of Object.values(refs.fieldNames)) {
    const found = citations.matches(e[field] || '',e.id,field,data);
    for (let i=1;i<found.length;i++) if (found[i].index < found[i-1].end) throw new Error('Overlapping legal citations: ' + e.id);
  }
}
export function annotateCitations(md, file, catalog, destination) {
  const section = catalog.sections.find(s => s.file === file); if (!section) return md;
  let entry = null;
  return md.split('\n').map(line => {
    const heading = /^### (\d+)\. /.exec(line);
    if (heading) entry = section.entries.find(e => e.n === heading[1]);
    const f = /^- ([^:]+):(.*)$/.exec(line), field = f && refs.fieldNames[f[1]];
    if (!entry || !field) return line;
    const matches = citations.matches(f[2],entry.id,field,registry);
    let body = f[2];
    for (const m of matches.reverse()) {
      const n = registry.references.indexOf(m.ref) + 1;
      body = body.slice(0,m.end) + ` [ghi chú ${n}](${destination(m.ref)})` + body.slice(m.end);
    }
    return '- ' + f[1] + ':' + body;
  }).join('\n');
}
export function citationNotesMarkdown(catalog, {heading = ref => '',backHref = e => '#entry-' + e.id} = {}) {
  const intro = '# Trích dẫn pháp luật đã đối chiếu\n\nCác ghi chú dưới đây chép nguyên văn từ phiên bản và vị trí ghi kèm. Phần “Pháp luật Việt Nam” trong mỗi mục vẫn là diễn giải của cẩm nang. Chỉ những trích dẫn đã đối chiếu mới có số ghi chú; các căn cứ khác giữ đầy đủ nội dung và nguồn như bản Markdown.\n';
  return intro + registry.references.map((ref,i) => {
    const back = [...new Set(ref.bindings.map(b => b.entryId))].map(id => {
      const e = catalog.byId.get(id); return `[chương ${e.sec} mục ${e.n}](${backHref(e)})`;
    }).join(', ');
    return `\n### ${i+1}. ${citations.label(ref)}${heading(ref)}\n\n${ref.title}\n\n${ref.quote.split('\n').map(l => '> ' + l + (l ? '  ' : '')).join('\n')}\n\n${ref.versionLabel}. Đối chiếu: ${ref.checkedAt}. ${ref.verificationScope}\n\nNguồn: ${ref.sourceLocation}. <${ref.sourceUrl}>. Quay lại ${back}.\n`;
  }).join('\n');
}
