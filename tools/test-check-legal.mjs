// Regression: chỉ quét chương tiếng Việt, không đếm nhầm file tiếng Trung.
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const checker = join(repoRoot, 'tools/check-legal.mjs');
const temp = mkdtempSync(join(tmpdir(), 'hltb-legal-regression-'));
const book = join(temp, 'book');
mkdirSync(book);
let passed = 0;
function run() {
  return spawnSync(process.execPath, [checker], { cwd: temp, encoding: 'utf8' });
}
try {
  writeFileSync(join(book, '01-test-viet.md'), [
    '### 1. Mục thử hợp lệ',
    '- Chi phí: Không tốn tiền.',
    '- Lợi ích: Biết quyền lợi.',
    '- Pháp luật Việt Nam: Theo Nghị định 123/2025/NĐ-CP.',
    '- Nguồn: Nghị định 123/2025/NĐ-CP, văn bản thử.',
    '',
  ].join('\n'));
  writeFileSync(join(book, '02-test-chinese.md'), [
    '### 1. 中文测试',
    '- 成本: 免费',
    '- Pháp luật Việt Nam: Đoạn ngoài bản Việt không được quét.',
    '- Nguồn: Không có căn cứ hợp lệ.',
    '',
  ].join('\n'));
  let r = run();
  if (r.status !== 0 || !r.stdout.includes('Đã kiểm 1 mục có trường pháp luật; 0 lỗi')) {
    throw new Error('isVi regression failed:\n' + r.stdout + r.stderr);
  }
  passed++;
  writeFileSync(join(book, '01-test-viet.md'), [
    '### 1. Mục thử không có nguồn',
    '- Chi phí: Không tốn tiền.',
    '- Lợi ích: Biết quyền lợi.',
    '- Pháp luật Việt Nam: Theo Nghị định 123/2025/NĐ-CP.',
    '- Nguồn: Một nguồn không có số hiệu.',
    '',
  ].join('\n'));
  r = run();
  if (r.status === 0 || !r.stderr.includes('thiếu căn cứ pháp luật')) {
    throw new Error('source citation regression failed:\n' + r.stdout + r.stderr);
  }
  passed++;
  console.log('PASS: ' + passed + ' kiểm thử isVi và proxy dẫn nguồn pháp luật');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
