// Regression: trường pháp luật là tùy chọn; số trong đó dùng làm căn cứ cho Nói dễ hiểu.
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const checker = join(repoRoot, 'tools/check-draft.mjs');
const temp = mkdtempSync(join(tmpdir(), 'hltb-draft-regression-'));
const note = 'Kiểm tra thông tin, giữ chứng từ và đọc kỹ điều kiện trước khi thực hiện. '.repeat(12);
let passed = 0;
const fixture = (human, legal = null) => [
  '### 1. Kiểm thử bản nháp',
  '<!-- nhãn: tiền=0 thời-gian=ít ý-chí=không lợi-ích=lớn thước-đo=tiền -->',
  '- Chi phí: Không mất tiền.',
  '- Nói dễ hiểu: ' + human,
  '- Lợi ích: Giúp tránh nhầm lẫn về thủ tục.',
  ...(legal === null ? [] : ['- Pháp luật Việt Nam: ' + legal]),
  '- Mức bằng chứng: B',
  '- Nguồn: https://example.org/official-law',
  '- Ghi chú: ' + note,
  '',
].join('\n');

function check(label, content, shouldPass, expectedError = '') {
  const path = join(temp, label + '.md');
  writeFileSync(path, content);
  const r = spawnSync(process.execPath, [checker, path], { cwd: repoRoot, encoding: 'utf8' });
  const output = r.stdout + r.stderr;
  if ((r.status === 0) !== shouldPass || (expectedError && !output.includes(expectedError))) {
    throw new Error(label + ': expected ' + (shouldPass ? 'success' : 'failure') + ', got ' + r.status + '\n' + output);
  }
  passed++;
}

try {
  check('legacy-without-legal', fixture('Đọc kỹ điều kiện trước khi làm.'), true);
  check('legal-number-present', fixture('Năm 2026 có quy định cần đọc.', 'Quy định được áp dụng từ năm 2026.'), true);
  check('legal-empty', fixture('Đọc kỹ điều kiện trước khi làm.', ''), false, 'để trống');
  check('missing-number', fixture('Năm 2032 có quy định cần đọc.', 'Quy định được áp dụng từ năm 2026.'), false, '2032');
  check('short-useful-note', fixture('Đọc kỹ điều kiện trước khi làm.').replace(note,'Giữ chứng từ và đọc điều kiện áp dụng.'), true);
  check('empty-note', fixture('Đọc kỹ điều kiện trước khi làm.').replace(note,''), false, 'Ghi chú trống');
  console.log('PASS: ' + passed + ' trường hợp regression cho tools/check-draft.mjs');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
