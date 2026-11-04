// CI: kiểm tính toàn vẹn của trường Pháp luật Việt Nam, không thay việc kiểm chứng luật.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
const dir = resolve('book');
let total = 0; const errors = [];
for (const file of readdirSync(dir).filter(x => /^\d\d-.*\.md$/.test(x))) {
  const content = readFileSync(resolve(dir, file), 'utf8');
  for (const part of content.split(/(?=^### \d+\. )/m).slice(1)) {
    const head = part.match(/^### \d+\. [^\n]*/)?.[0] || '(unknown)';
    const legal = [...part.matchAll(/^- Pháp luật Việt Nam:(.*)$/gm)];
    if (!legal.length) continue;
    total++;
    if (legal.length !== 1 || !legal[0][1].trim()) errors.push(file + ' ' + head + ': thiếu/trùng trường pháp luật');
    const source = part.match(/^- Nguồn:(.*)$/m)?.[1] || '';
    if (!source.trim() || !/(?:Luật|Nghị định|Thông tư|Nghị quyết|Quyết định|QCVN)[^;\n]{0,150}\d{1,4}\/(?:19|20)\d{2}/i.test(source)) {
      errors.push(file + ' ' + head + ': thiếu căn cứ pháp luật có số hiệu trong Nguồn');
    }
  }
}
if (!total) errors.push('Không có mục nào có trường Pháp luật Việt Nam');
for (const e of errors) console.error(e);
console.log('Đã kiểm ' + total + ' mục có trường pháp luật; ' + errors.length + ' lỗi');
if (errors.length) process.exitCode = 1;
