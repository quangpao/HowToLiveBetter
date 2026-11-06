(function(){
  const search=document.querySelector('[data-legal-search]');
  if(search)search.addEventListener('input',()=>{
    const words=BookReader.terms(search.value);let count=0;
    document.querySelectorAll('[data-legal-item]').forEach(item=>{
      const hay=BookReader.searchable(item.textContent);item.hidden=!BookReader.matches(hay,words);if(!item.hidden)count++;
    });
    document.querySelectorAll('[data-legal-group]').forEach(group=>group.hidden=![...group.querySelectorAll('[data-legal-item]')].some(e=>!e.hidden));
    document.querySelector('[data-result-count]').textContent=count;
    document.querySelector('[data-no-results]').hidden=!!count;
  });
  const key='hltb-actions-v1', selected=new Set();
  try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))for(const id of saved)if(typeof id==='string')selected.add(id);}catch(_){}
  document.querySelectorAll('[data-action-id]').forEach(input=>input.checked=selected.has(input.dataset.actionId));
  document.addEventListener('change',event=>{
    const input=event.target.closest?.('[data-action-id]');if(!input)return;
      input.checked ? selected.add(input.dataset.actionId) : selected.delete(input.dataset.actionId);
      document.querySelectorAll('[data-action-id]').forEach(other=>other.checked=selected.has(other.dataset.actionId));
      try{localStorage.setItem(key,JSON.stringify([...selected]));}catch(_){}
  });
  const savedList=document.querySelector('[data-saved-actions]');
  if(savedList && selected.size)savedList.textContent='Đang đọc danh sách đã lưu…';
  if(savedList && selected.size)(async()=>{
    try{
      const response=await fetch('../data/reader-index.json',{cache:'no-cache'});if(!response.ok)throw Error();
      const data=await response.json(),entries=data.sections.flatMap(s=>s.entries).filter(e=>selected.has(e.id));
      savedList.replaceChildren();
      for(const e of entries){
        const li=document.createElement('li');li.className='step';
        const h=document.createElement('h3'),a=document.createElement('a');a.href='../?view=chapters#entry-'+e.id;a.textContent=e.title;h.appendChild(a);
        const p=document.createElement('p');p.textContent=e.human.replace(/\*\*/g,'');
        const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.dataset.actionId=e.id;input.checked=true;
        label.append(input,' Lưu để đọc và cân nhắc');li.append(h,p,label);savedList.appendChild(li);
      }
      if(!entries.length)savedList.textContent='Các mục đã lưu không còn trong phiên bản hiện tại. Hãy tìm lại theo tình huống hoặc từ khóa.';
    }catch(_){savedList.textContent='Chưa tải được danh sách mục đã lưu. Bạn có thể thử tải lại trang; dữ liệu đánh dấu vẫn ở trên thiết bị.';}
  })();
  document.querySelector('[data-print]')?.addEventListener('click',()=>print());
  document.querySelector('[data-clear-actions]')?.addEventListener('click',()=>{
    selected.clear();document.querySelectorAll('[data-action-id]').forEach(e=>e.checked=false);
    try{localStorage.removeItem(key);}catch(_){}
    document.querySelector('[data-action-status]').textContent='Đã xóa các mục đánh dấu trên thiết bị này.';
  });
  document.querySelector('[data-export-actions]')?.addEventListener('click',()=>{
    const found=new Map();
    document.querySelectorAll('[data-action-id]').forEach(input=>{
      if(!selected.has(input.dataset.actionId))return;
      const link=input.closest('li').querySelector('h3 a');found.set(input.dataset.actionId,{title:link.textContent,url:link.href});
    });
    const area=document.querySelector('[data-action-export]');area.hidden=false;
    area.value='Cẩm nang sống thông minh · Những việc mình chọn\n\n'+[...found.values()].map(e=>'- [ ] '+e.title+'\n  '+e.url).join('\n\n');area.focus();area.select();
    document.querySelector('[data-action-status]').textContent=found.size ? 'Danh sách đã sẵn sàng để chép hoặc lưu.' : 'Chưa có việc nào được đánh dấu.';
  });
})();
