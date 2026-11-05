import api from '../../assets/book-references.js';
import { read, readBook } from './book.mjs';
export const refs = api;
export function readCatalog() { return refs.catalog(Object.fromEntries(readBook().bookFiles.map(file => [file,read(file)]))); }
export function withChapterIndex(md, file, catalog) {
  const section = catalog.sections.find(s => s.file === file);
  if (!section) return md;
  const lines = md.split(/\r?\n/), firstEntry = lines.findIndex(line=>/^### \d+\. /.test(line));
  if (firstEntry < 0) throw new Error(file + ': không có mục để tạo bảng Tra nhanh');
  const intro = refs.withoutGroupIndex(lines.slice(0,firstEntry));
  const heading = intro.findIndex(line=>/^# \d+\. /.test(line));
  if (heading < 0) throw new Error(file + ': không có tiêu đề chương');
  const cell = text => text.replace(/[\[\]|]/g,'\\$&');
  const table = ['| Mục | Nội dung | Bằng chứng |','| ---: | :--- | :---: |',...section.entries.map(e=>`| ${e.n} | [${cell(e.title)}](${refs.hrefFor(e,file)}) | ${e.grade.trim()} |`)];
  intro.splice(heading+1,0,'',`**Tra nhanh chương này · ${section.entries.length} mục**`,'',...table,'');
  return [...intro,...lines.slice(firstEntry)].join('\n');
}
export function prepareMarkdown(md, file, catalog) {
  const section = catalog.sections.find(s => s.file === file);
  return refs.refreshLinks(md,catalog,file)
    .replace(/^<a name="entry-[^\n]+<\/a>\s*\n/gm,'')
    .replace(/^### (\d+)\. (.+)$/gm,(all,n,title) => {
      const e = section?.entries.find(e => e.n === n);
      return e ? all + ' {#entry-' + e.id + '}' : all;
    });
}
