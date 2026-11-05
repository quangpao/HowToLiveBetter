// Kiểm tra bằng câu hỏi thật và nội dung thật: ngưỡng tuổi, chuyển đáp án cũ, phần lưu ý trong kết quả.
// node tools/check-selfcheck.mjs (không phụ thuộc gói ngoài, không ghi file)
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
import { refs } from './lib/references.mjs';

const root = new URL('../', import.meta.url);
const read = file => readFileSync(new URL(file, root), 'utf8');
const html = read('selfcheck.html');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
assert.ok(script, 'Không tìm thấy script của trang tự kiểm tra');
const parts = Object.fromEntries(readdirSync(new URL('book/', root))
  .filter(f => f.endsWith('.md')).map(f => [`book/${f}`, read(`book/${f}`)]));
const elements = new Map();
const element = id => {
  if (!elements.has(id)) elements.set(id, {
    innerHTML:'', textContent:'', value:'', hidden:false, removed:false,
    listeners:new Map(),
    addEventListener(type, fn) { this.listeners.set(type, fn); },
    remove() { this.removed = true; },
  });
  return elements.get(id);
};
const warnings = [];
// ⚠ Trang tự kiểm nay đọc BẢN TIẾNG VIỆT: khóa tra cứu của mỗi câu hỏi là một đoạn chữ trong tiêu đề
// tiếng Việt của book/*.md, nên dữ liệu phải là README.md.
// Trỏ sang tệp khác là mọi câu hỏi mất đích ngay. Đổi khóa trong selfcheck.html thì đổi cả các khóa trong file này.
const oldAnswers = {'p:tuoi':'30', 'p:sex':'f', 'p:kid':'n', '2:muối giảm natri':'n', '1:viêm gan B':'y'};
const context = vm.createContext({
  BookReferences:refs,
  window:{__CORPUS__:{readme:read('README.md'), parts}},
  document:{getElementById:element},
  localStorage:{getItem:() => JSON.stringify(oldAnswers), setItem:() => {}},
  location:{protocol:'http:'}, scrollTo:() => {},
  console:{error:message => warnings.push(message)},
});
vm.runInContext(script, context);
await new Promise(resolve => setImmediate(resolve));
assert.equal(element('status').removed, true, element('status').textContent);
assert.deepEqual(warnings, [], 'Mỗi câu hỏi đều phải tìm được mục trong nội dung sách');
const run = code => vm.runInContext(code, context);

assert.equal(run('profileDone()'), false, 'Trường tuổi của bản cũ không được hiểu thành tuổi thật');
assert.equal(run("ans['2:muối giảm natri']"), 'n', 'Đổi trường tuổi phải giữ nguyên các câu trả lời khác');
assert.equal(run("ans[qid(GROUPS.flatMap(g => g.qs).find(q => q.key === 'viêm gan B'))]"), undefined,
  'Câu viêm gan B đã đổi nghĩa thì không được dùng lại đáp án "đã làm" của bản cũ');
for (const age of ['', 'abc', '-1', '121', '39.5']) {
  run(`ans['p:ageYears'] = ${JSON.stringify(age)}`);
  assert.equal(run('profileDone()'), false, `Phải từ chối tuổi không hợp lệ: ${age}`);
}
const expected = [
  ['Xét nghiệm đường huyết',35], ['nhũ ảnh',40], ['đại trực tràng',45],
  ['zona thần kinh',50], ['vắc xin cúm',60], ['phế cầu',65], ['mật độ xương',65],
];
for (const [key, min] of expected) {
  for (const age of [min - 1, min]) {
    run(`ans['p:ageYears'] = '${age}'`);
    assert.equal(run('profileDone()'), true);
    assert.equal(run(`activeQs().some(q => q.key === ${JSON.stringify(key)})`), age >= min,
      `Trạng thái hiện của câu "${key}" ở tuổi ${age}`);
  }
}
run("ans['p:ageYears'] = '65'; ans['p:sex'] = 'm'");
assert.equal(run("activeQs().some(q => q.key === 'nhũ ảnh' || q.key === 'mật độ xương')"), false);

// Chưa dùng muối giảm natri thì thẻ kết quả và danh sách chép ra đều phải giữ lưu ý về bệnh thận / thuốc giữ kali.
run('renderOut()');
for (const output of [element('todo').innerHTML, element('copy-text').value]) {
  assert.match(output, /bệnh thận/);
  assert.match(output, /spironolactone/);
}
const noteOrder = element('todo').innerHTML;
assert.ok(noteOrder.indexOf('class="caution"') < noteOrder.indexOf('class="human"'),
  'Điều kiện áp dụng phải hiện trước phần tóm tắt lợi ích');
run("ENTRIES[0].note = '<img src=x onerror=alert(1)>'");
const escaped = run('card(ENTRIES[0], [])');
assert.ok(escaped.includes('&lt;img'));
assert.ok(!escaped.includes('<img'), 'Ghi chú phải được escape thành văn bản');

// Chạy đúng bộ xử lý ô tuổi của trang để chắc việc lưu và việc ra lại câu hỏi khớp nhau.
run('renderAsk()');
const profileHtml = element('profile-qs').innerHTML;
element('qs').listeners.get('input')({target:{
  matches:selector => selector === 'input[data-k="p:ageYears"]', value:'40',
}});
assert.equal(run("ans['p:ageYears']"), '40');
assert.equal(element('profile-qs').innerHTML, profileHtml, 'Không dựng lại ô thông tin khi đang nhập');
console.log('Trang tự kiểm tra đã qua: tham chiếu câu hỏi, 7 ngưỡng tuổi, chuyển đáp án cũ, kiểm tra đầu vào, hiện lưu ý và chép danh sách');
