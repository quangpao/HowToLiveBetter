/* Shared reader rules. No DOM or network access: also used by the build checks. */
(function (root) {
  'use strict';
  const fold = value => String(value ?? '').normalize('NFC').toLowerCase()
    .normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/g, 'd');
  const aliases = {bhyt:'bao hiem y te', bhxh:'bao hiem xa hoi', cccd:'can cuoc'};
  const normalize = value => fold(value).replace(/https?:\/\/[^\s<>]+/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  const whole = (text, word) => (' ' + text + ' ').includes(' ' + word + ' ');
  const searchable = value => {
    const text=normalize(value), extra=[];
    // Keep the original words for partial queries; add a concept token only when
    // the full phrase or its abbreviation occurs, before catalogue deduplication.
    for(const [alias,phrase] of Object.entries(aliases))if(whole(text,phrase)||whole(text,alias))extra.push(alias,phrase);
    return [text,...extra].filter(Boolean).join(' ');
  };
  const terms = query => {
    let text=normalize(query);
    for(const [alias,phrase] of Object.entries(aliases))text=text.replace(new RegExp('\\b'+phrase+'\\b','g'),alias);
    return [...new Set(text.split(' ').filter(Boolean))];
  };
  const displayTerms = words => [...new Set(words.flatMap(word=>aliases[word]?[aliases[word],word]:[word]))];
  const prefixAt = (words,i) => i===words.length-1 && words[i].length>=4 && /^\p{L}+$/u.test(words[i]) && !aliases[words[i]];
  const has = (text,word,prefix=false) => (' '+text+' ').includes(' '+word+(prefix?'':' '));
  const matches = (text,words) => words.every((word,i)=>has(text,word,prefixAt(words,i)));
  function score(entry, words) {
    if (!words.length) return 0;
    if (!matches(entry.hay || '', words)) return -1;
    const title = searchable(entry.title), summary = searchable(entry.human);
    return words.reduce((n,word,i)=>n+(has(title,word,prefixAt(words,i))?12:has(summary,word,prefixAt(words,i))?5:1),0)
      + (has(title,words.join(' '),prefixAt(words,words.length-1))?30:0);
  }
  function fitsAudience(groups, selected) {
    const senior = value => ['cao-tuổi','người-già','người-cao-tuổi'].includes(value)?'cao-tuổi':value;
    const facts = new Set([...selected].map(senior));
    if (!facts.size || !groups?.length) return true;
    if (facts.has('không')) return false;
    const ages = [...facts].map(value => /^(?:(?:nữ|nam)-)?(\d+)-tuổi$/.exec(value)).filter(Boolean).map(m => Number(m[1]));
    const age = ages.length ? Math.max(...ages) : null;
    const has = value => {
      value=senior(value);
      if (facts.has(value)) return true;
      const bound = /^(?:(nữ|nam)-)?(\d+)-tuổi$/.exec(value);
      if (bound) return age !== null && age >= Number(bound[2]) && (!bound[1] || facts.has(bound[1]));
      if (value==='cao-tuổi') return age !== null && age >= 60;
      return false;
    };
    return groups.some(group => group.every(has));
  }
  function feedback(entry, version = '') {
    const url = 'https://quangpao.github.io/HowToLiveBetter/#entry-' + entry.id;
    const body = `Mục: ${entry.sec}.${entry.n} — ${entry.title}\nID: ${entry.id}\nPhiên bản: ${version || 'xem trên trang tải sách'}\nLiên kết: ${url}\n\nChỗ cần sửa hoặc khó hiểu:\n\n\nNguồn đối chiếu (nếu có):\n`;
    return 'https://github.com/quangpao/HowToLiveBetter/issues/new?' + new URLSearchParams({title:'Góp ý: ' + entry.title, body});
  }
  root.BookReader = {fold, terms, displayTerms, searchable, matches, score, fitsAudience, feedback};
})(typeof globalThis === 'object' ? globalThis : this);
