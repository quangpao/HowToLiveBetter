import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = mkdtempSync(join(tmpdir(), 'lint-vi-'));
const script = fileURLToPath(new URL('./lint-vi.mjs', import.meta.url));
try {
  mkdirSync(join(root, 'book'));
  mkdirSync(join(root, 'docs'));
  writeFileSync(join(root, 'README.md'), 'Tự kiểm tra\n');
  writeFileSync(join(root, 'docs/phap-luat-viet-nam.md'), 'Pháp luật\n');
  writeFileSync(join(root, 'selfcheck.html'), '<h1>Tự kiểm tra</h1>\n');
  const file = join(root, 'book/01-test.md');
  const run = () => spawnSync(process.execPath, [script, '--no-integrity', '--json'], {
    encoding: 'utf8', env: {...process.env, LINT_VI_ROOT: root},
  });
  writeFileSync(file, '# Chương\n### 1. Thử\n- Nói dễ hiểu: HR 0,72 là chỉ số thống kê.\n');
  let r = run();
  assert.equal(r.status, 1, r.stderr);
  assert.ok(JSON.parse(r.stdout).findings.some(x => x.kind === 'stats-in-plain'));
  writeFileSync(file, '# Chương\n### 1. Thử\n- Nói dễ hiểu: Việc thực hiện nên bắt đầu từ hôm nay.\n- Ghi chú: HR 0,72.\n');
  r = run();
  assert.equal(r.status, 0, r.stderr);
  assert.ok(JSON.parse(r.stdout).findings.some(x => x.kind === 'translationese'));
  writeFileSync(file, '# Chương\n### 1. Thử\n- Nói dễ hiểu: Đừng để bệnh mãn tính tiến triển.\n');
  r = run();
  assert.equal(r.status, 1, r.stderr);
  assert.ok(JSON.parse(r.stdout).findings.some(x => x.kind === 'forbidden-term'));
  console.log('3/3 kiểm thử linter tiếng Việt thành công');
} finally {
  rmSync(root, {recursive:true, force:true});
}
