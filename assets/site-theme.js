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
    if(!event.target.closest?.('[data-theme]'))return;
    const dark=root.classList.toggle('dark');
    try{localStorage.setItem('theme',dark?'dark':'light');}catch(_){}
    sync();
  });
})();
