import api from '../../assets/book-references.js';
import { read, readBook } from './book.mjs';
export const refs = api;
export function readCatalog() { return refs.catalog(Object.fromEntries(readBook().bookFiles.map(file => [file,read(file)]))); }
export function prepareMarkdown(md, file, catalog) {
  const section = catalog.sections.find(s => s.file === file);
  return refs.refreshLinks(md,catalog,file)
    .replace(/^<a name="entry-[^\n]+<\/a>\s*\n/gm,'')
    .replace(/^### (\d+)\. (.+)$/gm,(all,n,title) => {
      const e = section?.entries.find(e => e.n === n);
      return e ? all + ' {#entry-' + e.id + '}' : all;
    });
}
