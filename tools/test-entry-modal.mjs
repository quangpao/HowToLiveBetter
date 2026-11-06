// Exercise the actual modal/render functions with a deferred chapter request.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {read} from './lib/book.mjs';

const html=read('index.html');
function setup(loaded=false){
  const node=()=>({hidden:false,inert:false,textContent:'',open:false,scrollTop:0,
    appendChild(){},before(){},querySelector(){return null;},focus(){},addEventListener(){}});
  const nodes=new Map(),get=key=>{if(!nodes.has(key))nodes.set(key,node());return nodes.get(key);};
  const card=n=>({e:{sec:'1',n,id:'entry-'+n,title:'Mục '+n,human:'Bản ngắn',cost:'',gain:'Chi tiết',note:'',src:'Nguồn',legal:'',isLegal:false,loaded},
    f:Object.fromEntries(['t','human','cost','gain','note','legalDetails','legalSourceHint','details','src','srcN'].map(k=>[k,node()])),el:node()});
  const cards=[card('1'),card('2')],pending=new Map();
  const ctx={CARDS:cards,CUR_TERMS:[],CUR_KEY:'',CUR_SEC:'',POP:{hidden:true},
    ENTRY:{mask:{hidden:true},box:node(),body:node(),card:null,slot:null,trigger:null,wantSources:false},
    document:{createComment:()=>({replaceWith(){}}),createElement:node,getElementById:get,querySelector:get,body:{style:{}}},
    renderText:(el,text)=>{el.textContent=text;},renderGain:(el,text)=>{el.textContent=text;},renderSrc:()=>1,
    reviewNotice:()=>null,entryTools:node,markVN(){},
    ensureChapter:()=>new Promise((resolve,reject)=>pending.set('load',{resolve(){cards.forEach(c=>c.e.loaded=true);resolve();},reject})),
  };
  vm.runInNewContext(read('assets/book-references.js'),ctx);
  vm.runInNewContext(read('assets/book-reader.js'),ctx);
  for(const name of ['renderCard','entryOpen','entryClose']){
    const source=html.match(new RegExp('function '+name+'\\([^]*?\\n\\}'));
    assert.ok(source,'Missing function '+name);vm.runInNewContext(source[0],ctx);
  }
  return {ctx,cards,finish:()=>pending.get('load').resolve()};
}

{
  const {ctx,cards,finish}=setup();
  ctx.entryOpen('1-1',null,true);
  assert.equal(cards[0].f.details.open,true,'Open immediately while the chapter is loading');
  const pending=cards[0].loading;finish();await pending;
  assert.equal(cards[0].f.details.open,true,'Keep sources open after the real content replaces the placeholder');
  assert.equal(ctx.ENTRY.wantSources,false,'Consume the pending request once content is rendered');
  cards[0].f.details.open=false;ctx.renderCard(cards[0],[],'');
  assert.equal(cards[0].f.details.open,false,'A later render must not override a manual close');
  ctx.entryClose();ctx.entryOpen('1-1',null,true);
  assert.equal(cards[0].f.details.open,true,'Cached chapters also open sources');
  ctx.entryClose();ctx.entryOpen('1-1',null,false);
  assert.equal(cards[0].f.details.open,false,'The factor button does not inherit a previous source request');
}
{
  const {ctx,cards,finish}=setup();ctx.entryOpen('1-1',null,true);
  const pending=cards[0].loading;ctx.entryClose();finish();await pending;
  assert.equal(ctx.ENTRY.mask.hidden,true,'Loading must not reopen a closed modal');
  assert.equal(ctx.ENTRY.wantSources,false);
  assert.equal(cards[0].f.details.open,false);
}
{
  const {ctx,cards,finish}=setup();cards[1].e.loaded=true;
  ctx.entryOpen('1-1',null,true);const pending=cards[0].loading;
  ctx.entryOpen('1-2',null,false);finish();await pending;
  assert.equal(ctx.ENTRY.card,cards[1],'An older request must not replace the active entry');
  assert.equal(cards[1].f.details.open,false,'Source intent belongs to its entry only');
}
console.log('PASS: source intent survives lazy loading, cached reopen, manual close and switching entries');
