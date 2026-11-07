(function(){
  let saved;
  try{saved=localStorage.getItem('theme');}catch(_){}
  const root=document.documentElement;
  root.classList.toggle('dark',saved?saved==='dark':matchMedia('(prefers-color-scheme: dark)').matches);
  function sync(){
    const dark=root.classList.contains('dark');
    document.querySelectorAll('[data-theme]').forEach(button=>{
      button.textContent=dark?'Nền sáng':'Nền tối';
      button.setAttribute('aria-pressed',String(dark));
    });
  }
  document.addEventListener('DOMContentLoaded',sync);
  document.addEventListener('click',event=>{
    document.querySelectorAll('.nav-mobile[open]').forEach(menu=>{
      if(!menu.contains(event.target)||event.target.closest?.('.nav-mobile-links a'))menu.open=false;
    });
    if(!event.target.closest?.('[data-theme]'))return;
    const dark=root.classList.toggle('dark');
    try{localStorage.setItem('theme',dark?'dark':'light');}catch(_){}
    sync();
  });
  document.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    const menus=[...document.querySelectorAll('.nav-mobile[open]')];
    if(!menus.length)return;
    const focused=menus.find(menu=>menu.contains(document.activeElement));
    menus.forEach(menu=>menu.open=false);
    focused?.querySelector('summary').focus();
    event.preventDefault();
  });
})();
