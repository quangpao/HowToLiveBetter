import {read} from './book.mjs';

// Keep the home page's navigation on every entry point, including its mobile layout.
export function siteNav(prefix='./', current='', onHome=false) {
  const root=onHome?'':prefix;
  const logo=read('assets/favicon.svg').replace(/<title>[\s\S]*?<\/title>\s*/, '').replace('<svg ', '<svg focusable="false" ');
  const links=[['?view=book','Đọc sách'],['tinh-huong/','Theo tình huống'],['phap-luat/','Pháp luật']];
  return `<!-- site-nav:start -->
<header class="nav">
  <div class="nav-in">
    <a class="title" href="${prefix}"><span class="logo" aria-hidden="true">${logo.trim()}</span><span>HowToLiveBetter</span></a>
    <nav class="nav-r" aria-label="Liên kết chính">
${links.map(([path,label])=>`      <a class="nav-extra" href="${root+path}"${path==='?view=book'&&onHome?' data-open-book':''}${path===current+'/'?' aria-current="page"':''}>${label}</a>`).join('\n')}
      <a href="https://github.com/quangpao/HowToLiveBetter" target="_blank" rel="noopener">GitHub ↗</a>
      <button class="utility-btn" id="theme" type="button" data-theme aria-label="Bật/tắt nền tối" aria-pressed="false">Nền tối</button>
    </nav>
  </div>
</header>
<!-- site-nav:end -->`;
}
