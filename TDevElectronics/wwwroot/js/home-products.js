/* Sản phẩm ở trang chủ ("Your next favorites"): luôn 4 sản phẩm mỗi hàng, mặc định 12 sản phẩm (3 hàng).
   Admin thêm / bớt / đổi thứ tự ở Cài đặt → Homepage products. Lưu localStorage 'tdev-homeprods' = {keys:[...]}.
   Chưa có dữ liệu -> dùng danh sách mặc định 12 sản phẩm bên dưới. */
(function(){
'use strict';
const KEY='tdev-homeprods',MIN=4,MAX=24,PER_ROW=4;
const DEF=['laptop','headphones','hub','phone','airpods','printer','chair','iphone-16-pro','macbook-pro-14','wf-1000xm5','power-bank-737','hero13'];
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const load=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return v&&Array.isArray(v.keys)?v.keys.filter(k=>typeof k==='string'):null}catch(e){return null}};
const store=k=>{try{localStorage.setItem(KEY,JSON.stringify({keys:k}));return true}catch(e){return false}};
const clear=()=>{try{localStorage.removeItem(KEY)}catch(e){}};
const toast=m=>{const t=$('#ts');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2200)};
/* nguồn thẻ sản phẩm: #pc-src chứa mọi sản phẩm đang bán (đã loại sản phẩm bị ẩn / xóa) */
const src=()=>{const m=new Map();$$('#pc-src .pc[data-k]').forEach(c=>{if(!m.has(c.dataset.k))m.set(c.dataset.k,c)});return m};
const current=()=>{const s=src(),k=(load()||DEF).filter((x,i,a)=>s.has(x)&&a.indexOf(x)===i);return k.slice(0,MAX)};

/* ---- Trang chủ ---- */
function renderHome(){
 const g=$('#home .g4');if(!g)return;
 const s=src(),keys=current();if(!keys.length)return;
 let wl=[];try{wl=JSON.parse(localStorage.getItem('tdev-wl'))||[]}catch(e){}
 g.innerHTML='';
 keys.forEach(k=>{const c=s.get(k).cloneNode(true);c.removeAttribute('style');const h=$('.hr',c);if(h)h.classList.toggle('on',wl.includes(k));g.appendChild(c)});
 g.dataset.count=keys.length}

/* ---- Admin: Settings → Homepage products ---- */
function nm(c){const b=$('b',c);return b?b.textContent:c.dataset.k}
function brand(c){const b=$('.br',c);return b?b.textContent:''}
function price(c){const p=$('.pr',c);return p?p.textContent:''}
function renderAdmin(){
 const w=$('#ahp');if(!w)return;
 const s=src(),keys=current(),custom=!!load(),rest=[...s.keys()].filter(k=>!keys.includes(k));
 const rows=Math.ceil(keys.length/PER_ROW),full=keys.length%PER_ROW===0;
 w.innerHTML=`<div class="cd sg" id="homeprods"><div class="hx"><div><h3>Homepage products</h3><p class="m">Choose which products appear in “Your next favorites” on the homepage. Products are shown 4 per row.</p></div><a class="bo" href="index.html">View homepage</a></div>
 <div class="hpc"><b>${keys.length}</b> of ${MAX} products · ${rows} row${rows>1?'s':''}</div>
 ${full?'':`<p class="m hpw"><small>The last row has ${keys.length%PER_ROW} of 4 products. Add ${PER_ROW-keys.length%PER_ROW} more (or remove ${keys.length%PER_ROW}) for a full row.</small></p>`}
 ${keys.map((k,i)=>{const c=s.get(k);return `<div class="hbr hpr"><span class="hpn">${i+1}</span><div class="hbi"><b>${esc(nm(c))}</b><small class="m">${esc(brand(c))} · ${esc(price(c))}</small></div><div class="hbb"><button class="bo" type="button" data-hp="up" data-k="${esc(k)}" aria-label="Move up"${i?'':' disabled'}>↑</button><button class="bo" type="button" data-hp="down" data-k="${esc(k)}" aria-label="Move down"${i<keys.length-1?'':' disabled'}>↓</button><button class="bo rd" type="button" data-hp="del" data-k="${esc(k)}"${keys.length>MIN?'':' disabled'}>Remove</button></div></div>`}).join('')}
 <div class="hpa"><label class="fld"><small>Add a product</small><select id="hp-add"${rest.length&&keys.length<MAX?'':' disabled'}>${rest.map(k=>`<option value="${esc(k)}">${esc(nm(s.get(k)))} — ${esc(brand(s.get(k)))}</option>`).join('')||'<option value="">No more products</option>'}</select></label><button class="bt" type="button" data-hp="add"${rest.length&&keys.length<MAX?'':' disabled'}>+ Add</button></div>
 <p class="m"><small>${keys.length>=MAX?`Maximum ${MAX} products reached. `:''}Minimum ${MIN} products. ${custom?'Your own list is shown on the homepage.':'The default 12 products are shown. Your first change creates your own list.'}</small></p>
 ${custom?'<button class="bo rd" type="button" data-hp="reset">Restore default 12 products</button>':''}</div>`;
 if(location.hash==='#homeprods'&&!renderAdmin.done){renderAdmin.done=1;const b=$('#homeprods');if(b)setTimeout(()=>b.scrollIntoView({block:'start'}),60)}}

function change(fn){const k=current(),n=fn(k.slice());if(!n)return;if(!store(n)){toast('Could not save in this browser.');return}renderAdmin()}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-hp]');if(!b||b.disabled)return;
 const a=b.dataset.hp,k=b.dataset.k;
 if(a==='reset'){clear();renderAdmin();toast('Default homepage products restored');return}
 if(a==='add'){const v=$('#hp-add').value;if(!v)return;change(l=>l.length>=MAX?null:l.concat(v));toast('Product added to homepage');return}
 if(a==='del'){change(l=>l.length<=MIN?null:l.filter(x=>x!==k));toast('Product removed from homepage');return}
 if(a==='up'||a==='down'){change(l=>{const i=l.indexOf(k),j=a==='up'?i-1:i+1;if(i<0||j<0||j>=l.length)return null;[l[i],l[j]]=[l[j],l[i]];return l})}
});

renderHome();renderAdmin();
})();
