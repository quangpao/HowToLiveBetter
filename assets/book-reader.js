/* Shared reader rules. No DOM or network access: also used by the build checks. */
(function (root) {
  'use strict';
  const fold = value => String(value ?? '').normalize('NFC').toLowerCase()
    .normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');
  const aliases = {bhyt:'bao hiem y te', bhxh:'bao hiem xa hoi', cccd:'can cuoc'};
  const terms = query => [...new Set(fold(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean)
    .flatMap(word => (aliases[word] || word).split(' ')))];
  const searchable = value => fold(value).replace(/https?:\/\/[^\s<>]+/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  const includes = (text, word) => word.length > 1 ? text.includes(word) : (' ' + text + ' ').includes(' ' + word + ' ');
  function score(entry, words) {
    if (!words.length) return 0;
    if (!words.every(word => includes(entry.hay || '', word))) return -1;
    const title = searchable(entry.title), summary = searchable(entry.human);
    return words.reduce((n, word) => n + (includes(title, word) ? 12 : includes(summary, word) ? 5 : 1), 0)
      + (title.includes(words.join(' ')) ? 30 : 0);
  }
  function fitsAudience(groups, selected) {
    const facts = new Set(selected);
    if (!facts.size || !groups?.length) return true;
    if (facts.has('không')) return false;
    const ages = [...facts].map(value => /^(?:(?:nữ|nam)-)?(\d+)-tuổi$/.exec(value)).filter(Boolean).map(m => Number(m[1]));
    const age = ages.length ? Math.max(...ages) : null;
    const has = value => {
      if (facts.has(value)) return true;
      const bound = /^(?:(nữ|nam)-)?(\d+)-tuổi$/.exec(value);
      if (bound) return age !== null && age >= Number(bound[2]) && (!bound[1] || facts.has(bound[1]));
      if (['cao-tuổi','người-già','người-cao-tuổi'].includes(value)) return age !== null && age >= 60
        || ['cao-tuổi','người-già','người-cao-tuổi'].some(v => facts.has(v));
      return false;
    };
    return groups.some(group => group.every(has));
  }
  function feedback(entry, version = '') {
    const url = 'https://quangpao.github.io/HowToLiveBetter/#entry-' + entry.id;
    const body = `Mục: ${entry.sec}.${entry.n} — ${entry.title}\nID: ${entry.id}\nPhiên bản: ${version || 'xem trên trang tải sách'}\nLiên kết: ${url}\n\nChỗ cần sửa hoặc khó hiểu:\n\n\nNguồn đối chiếu (nếu có):\n`;
    return 'https://github.com/quangpao/HowToLiveBetter/issues/new?' + new URLSearchParams({title:'Góp ý: ' + entry.title, body});
  }
  root.BookReader = {fold, terms, searchable, score, fitsAudience, feedback};
})(typeof globalThis === 'object' ? globalThis : this);
