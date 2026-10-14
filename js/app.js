const CATS=[["art","Артикуляционная гимнастика","👄"],["games","Игры и пособия","🧩"],["cards","Карточки и картотеки","🃏"],["dev","Развивающие игры","🧸"],["lit","Литература и методики","📘"],["eq","Оборудование для кабинета","🪞"],["kit","Готовые комплекты для ДОУ","🧰"]];
const P=[
[10234,"Настольная игра «Развиваем речь»","games","Играем",890,1,"#0046AC","5+","60 карточек с заданиями, методические рекомендации, правила игры."],
[10452,"Набор карточек «Эмоции»","cards","Реченок",650,1,"#F05800","3+","Карточки для работы с эмоциями и связной речью."],
[10721,"Пазл «Домашние животные»","games","Кубик",790,1,"#2a9d5c","3+","Деревянный пазл для знакомства с названиями животных."],
[10876,"Логопедическое лото «Звуки и буквы»","games","Звуки",720,1,"#7a4bc2","4+","Лото для автоматизации звуков."],
[10903,"Набор для развития мелкой моторики","dev","Разное",1190,0,"#d98a00","3+","Крупные элементы для развития моторики рук."],
[11012,"Дидактический материал «Слоги и слова»","cards","Звуки",550,1,"#0b8fb3","5+","Материал для работы над слоговой структурой слова."]];
const ph=(c,t)=>`<svg viewBox="0 0 200 200" role="img" aria-label="Заглушка: ${t}"><rect width="200" height="200" fill="#EEF7FF"/><rect x="38" y="48" width="124" height="104" rx="12" fill="${c}"/><circle cx="82" cy="92" r="16" fill="#fff" opacity=".9"/><rect x="108" y="78" width="38" height="12" rx="6" fill="#fff" opacity=".8"/><rect x="108" y="98" width="28" height="12" rx="6" fill="#fff" opacity=".6"/><text x="100" y="178" font-size="11" text-anchor="middle" fill="#5b7391" font-family="Arial">фото товара — заглушка</text></svg>`;
const S=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const W=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let cart=S('lp_cart',{}),fav=S('lp_fav',[]);
const $=s=>document.querySelector(s),rub=n=>n.toLocaleString('ru-RU')+' ₽',pid=id=>P.find(p=>p[0]==id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function save(){W('lp_cart',cart);W('lp_fav',fav);$('#cc').textContent=Object.values(cart).reduce((a,b)=>a+b,0);$('#fc').textContent=fav.length}
function add(id,n=1){cart[id]=(cart[id]||0)+n;save();toast()}
function toast(){const b=$('#cc');b.animate([{transform:'scale(1.5)'},{transform:'scale(1)'}],200)}
function tgl(id){fav=fav.includes(id)?fav.filter(x=>x!=id):[...fav,id];save();route()}
const catName=k=>(CATS.find(c=>c[0]==k)||[])[1];
function card(p){const[id,n,c,b,pr,st,col]=p;return `<article class="pc"><button class="fav ${fav.includes(id)?'on':''}" onclick="tgl(${id})" aria-label="В избранное">${fav.includes(id)?'♥':'♡'}</button><a class="im" href="#/product/${id}">${ph(col,esc(n))}</a><h3><a href="#/product/${id}">${esc(n)}</a></h3><span class="sk">Артикул: ${id}</span><span class="p">${rub(pr)}</span><span class="${st?'ok':'no'}">${st?'● В наличии':'● Под заказ'}</span><div class="row"><button class="btn o s" onclick="add(${id})">В корзину</button></div></article>`}
const home=()=>`<section class="hero"><div class="t"><h1>Всё для развития речи — дома и в детском саду</h1><p>Игры, пособия, книги и оборудование для логопедов, родителей и образовательных учреждений.</p><div class="r"><a class="btn o" href="#/catalog">Перейти в каталог →</a><a class="btn l" href="#/org">Заказать для детского сада</a></div></div><div class="hi"><img src="assets/hero.webp" alt="Улыбающаяся девочка за столом с книгами, карточками и развивающими играми" width="1000" height="658"></div></section>
<section class="cats">${CATS.map(c=>`<a class="cat" href="#/catalog?cat=${c[0]}"><span class="e" aria-hidden="true">${c[2]}</span>${c[1]}</a>`).join('')}</section>
<section class="dou"><div><h2>Для детских садов и организаций</h2><p>Удобные условия для закупок, пакет документов и помощь в подборе комплектации.</p><a class="btn o s" href="#/org">Оставить заявку</a></div><div><div class="adv"><div>📄 Заказ по списку или спецификации</div><div>🧾 Счёт для юридического лица</div><div>📑 Документы для закупки</div><div>🧭 Помощь с подбором комплектации</div></div><p class="note">Условия оплаты и поставки согласуем с менеджером.</p></div></section>
<h2 style="font-size:24px">Как оформить заказ</h2><section class="steps">${[["Выберите товары","Добавьте нужные позиции в корзину."],["Укажите данные организации","Заполните форму и прикрепите спецификацию (при необходимости)."],["Согласуйте счёт и доставку","Менеджер подготовит счёт и предложит удобные условия доставки."],["Получите заказ и документы","После согласования и оплаты получите товар и комплект документов."]].map((s,i)=>`<div class="st"><b>${i+1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('')}</section>`;
function catalog(qs){const sp=new URLSearchParams(qs),cat=sp.get('cat')||'',fv=sp.get('fav'),q=(sp.get('q')||'').toLowerCase();
return `<p class="crumb"><a href="#/">Главная</a> › <a href="#/catalog">Каталог</a>${cat?' › '+esc(catName(cat)||''):''}</p><div class="cl"><aside class="side"><div class="bx"><h3>Каталог товаров</h3><a href="#/catalog" class="${cat?'':'on'}">Все товары</a>${CATS.map(c=>`<a href="#/catalog?cat=${c[0]}" class="${cat==c[0]?'on':''}">${c[1]}<span>${P.filter(p=>p[2]==c[0]).length}</span></a>`).join('')}</div>
<div class="bx"><h3>Фильтры</h3><b style="font-size:13px">Цена</b><div class="pr"><input id="pmin" type="number" min="0" placeholder="от" aria-label="Цена от"><input id="pmax" type="number" min="0" placeholder="до" aria-label="Цена до"></div><h3 style="margin-top:14px">Бренд</h3>${[...new Set(P.map(p=>p[3]))].map(b=>`<label><input type="checkbox" class="fb" value="${b}"> ${b}</label>`).join('')}<h3 style="margin-top:14px">Наличие</h3><label><input type="checkbox" id="fs"> В наличии</label><button class="btn l s" style="width:100%;margin-top:14px" id="rs">Сбросить фильтры</button></div></aside>
<section><div class="mchips">${[['','Все'],...CATS.map(c=>[c[0],c[1]])].map(([k,n])=>`<a class="chip ${(cat||'')==k?'on':''}" href="#/catalog${k?'?cat='+k:''}">${n}</a>`).join('')}</div><button class="btn l s mft" id="ft" type="button">Фильтры</button><h1 style="font-size:28px">${fv?'Избранное':esc(catName(cat)||'Все товары')}</h1><div class="bar"><span id="cnt"></span><select id="so" aria-label="Сортировка"><option value="">По популярности</option><option value="a">Цена ↑</option><option value="d">Цена ↓</option></select></div><div class="grid" id="gr"></div></section></div>`}
function fill(qs){const ft=$('#ft');if(ft)ft.onclick=()=>document.querySelector('.side').classList.toggle('open');const sp=new URLSearchParams(qs),cat=sp.get('cat'),fv=sp.get('fav'),q=(sp.get('q')||'').toLowerCase();
const run=()=>{const mn=+$('#pmin').value||0,mx=+$('#pmax').value||1e9,br=[...document.querySelectorAll('.fb:checked')].map(x=>x.value),s=$('#fs').checked,so=$('#so').value;
let l=P.filter(p=>(!cat||p[2]==cat)&&(!fv||fav.includes(p[0]))&&(!q||(p[1]+catName(p[2])).toLowerCase().includes(q))&&p[4]>=mn&&p[4]<=mx&&(!br.length||br.includes(p[3]))&&(!s||p[5]));
if(so)l.sort((a,b)=>so=='a'?a[4]-b[4]:b[4]-a[4]);
$('#cnt').textContent='Найдено '+l.length+' товаров';$('#gr').innerHTML=l.length?l.map(card).join(''):'<p>Ничего не найдено. Измените фильтры или <a href="#/catalog" style="color:var(--b)">покажите все товары</a>.</p>'};
document.querySelectorAll('.side input,#so').forEach(e=>e.addEventListener('input',run));
$('#rs').onclick=()=>{document.querySelectorAll('.side input').forEach(e=>e.type=='checkbox'?e.checked=false:e.value='');$('#so').value='';run()};run()}
function product(id){const p=pid(id);if(!p)return'<p>Товар не найден. <a href="#/catalog">В каталог</a></p>';const[,n,c,b,pr,st,col,age,d]=p;
return `<p class="crumb"><a href="#/">Главная</a> › <a href="#/catalog">Каталог</a> › <a href="#/catalog?cat=${c}">${catName(c)}</a> › ${esc(n)}</p><div class="pd"><div class="big">${ph(col,esc(n))}</div><div><h1>${esc(n)}</h1><span class="sk">Артикул: ${id}</span><div class="p">${rub(pr)}</div><span class="${st?'ok':'no'}">${st?'● В наличии':'● Под заказ'}</span> <small>(демо-данные)</small><div class="row" style="margin-top:18px"><span class="q"><button onclick="qt(-1)" aria-label="Меньше">−</button><span id="qn">1</span><button onclick="qt(1)" aria-label="Больше">+</button></span><button class="btn o" onclick="add(${id},+$('#qn').textContent)">В корзину</button><button class="btn l" onclick="tgl(${id})">${fav.includes(id)?'♥ В избранном':'♡ В избранное'}</button></div></div></div>
<div class="tabs" role="tablist"><button class="on" data-t="d">Описание</button><button data-t="c">Характеристики</button><button data-t="r">Отзывы</button></div><div class="tp" id="tp"></div>
<h2 style="font-size:22px;margin:24px 0 12px">Похожие товары</h2><div class="grid sim" style="grid-template-columns:repeat(auto-fill,minmax(210px,1fr));margin-bottom:40px">${P.filter(x=>x[0]!=id&&x[2]==c||x[0]!=id).slice(0,4).map(card).join('')}</div>`}
function tabs(id){const p=pid(id);if(!p)return;const T={d:`<p>${esc(p[8])}</p>`,c:`<dl><dt>Артикул</dt><dd>${id}</dd><dt>Категория</dt><dd>${catName(p[2])}</dd><dt>Бренд</dt><dd>${p[3]}</dd><dt>Возраст</dt><dd>${p[7]}</dd></dl>`,r:'<p>Отзывов пока нет. Раздел заработает после подключения реальных отзывов покупателей.</p>'};
const sh=k=>{$('#tp').innerHTML=T[k];document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.t==k))};document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>sh(b.dataset.t));sh('d')}
const qt=d=>{const e=$('#qn');e.textContent=Math.max(1,+e.textContent+d)};
const sum=()=>Object.entries(cart).reduce((a,[i,n])=>a+pid(i)[4]*n,0);
function setq(i,d){cart[i]=(cart[i]||0)+d;if(cart[i]<1)delete cart[i];save();route()}
function rm(i){delete cart[i];save();route()}
function cartPg(){const e=Object.entries(cart);if(!e.length)return'<h1 style="margin-top:24px">Корзина</h1><div class="ok2" style="margin:16px 0 40px">Корзина пуста. <a class="btn o s" href="#/catalog">Перейти в каталог</a></div>';
return `<h1 style="margin-top:24px;font-size:30px">Корзина</h1><div class="bx" style="padding:0;margin-top:16px">${e.map(([i,n])=>{const p=pid(i);return `<div class="ci"><a class="im" href="#/product/${i}">${ph(p[6],esc(p[1]))}</a><div><a href="#/product/${i}"><b>${esc(p[1])}</b></a><br><small class="sk">Артикул: ${i}</small></div><span class="unit">${rub(p[4])}</span><span class="q"><button onclick="setq(${i},-1)" aria-label="Меньше">−</button><span>${n}</span><button onclick="setq(${i},1)" aria-label="Больше">+</button></span><b class="sum">${rub(p[4]*n)}</b><button class="x" onclick="rm(${i})" aria-label="Удалить">✕</button></div>`}).join('')}</div>
<div class="tot"><a href="#/catalog" style="color:var(--b)">← Продолжить покупки</a><span>Итого: <b>${rub(sum())}</b></span><a class="btn o" href="#/checkout">Оформить заказ</a></div>`}
let type='p';
function checkout(t){type=t||'p';const org=type!='p';
return `<h1 style="margin:24px 0 8px;font-size:28px">${org?'Заявка для организации':'Оформление заказа'}</h1><div class="warn">Демо-режим: заявка сохраняется только в вашем браузере. Приём заказов, счета и письма заработают после подключения сервера.</div>
<div class="seg" role="group" aria-label="Покупатель"><button data-k="p" class="${type=='p'?'on':''}">Физическое лицо</button><button data-k="u" class="${type=='u'?'on':''}">Юридическое лицо / ИП</button><button data-k="d" class="${type=='d'?'on':''}">Детский сад / бюджетное учреждение</button></div>
<form id="fo" class="fm" novalidate>
<div class="fl f ${org?'':'hide'}"><label>Полное наименование организации *</label><input name="org"><span class="er"></span></div>
<div class="fl ${org?'':'hide'}"><label>ИНН *</label><input name="inn" inputmode="numeric"><span class="er"></span></div>
<div class="fl ${org?'':'hide'}"><label>КПП</label><input name="kpp" inputmode="numeric"></div>
<div class="fl"><label>${org?'Контактное лицо (ФИО) *':'Имя *'}</label><input name="name"><span class="er"></span></div>
<div class="fl ${org?'':'hide'}"><label>Должность</label><input name="pos"></div>
<div class="fl"><label>Телефон *</label><input name="tel" type="tel" placeholder="+7 ___ ___-__-__"><span class="er"></span></div>
<div class="fl"><label>E-mail ${org?'*':''}</label><input name="mail" type="email"><span class="er"></span></div>
<div class="fl f"><label>Адрес доставки *</label><input name="adr"><span class="er"></span></div>
<div class="fl"><label>Доставка</label><select name="dl"><option>Способ уточнит менеджер</option><option>Самовывоз</option><option>Курьер / транспортная компания</option></select></div>
<div class="fl"><label>Оплата</label><select name="pay"><option>${org?'Счёт — условия согласует менеджер':'Способ уточнит менеджер'}</option></select></div>
<div class="fl f"><label>Комментарий</label><textarea name="cm" rows="3"></textarea></div>
<div class="fl f ${org?'':'hide'}"><label>Спецификация (PDF, DOC, XLSX)</label><input type="file" name="fl" accept=".pdf,.doc,.docx,.xls,.xlsx"><small class="note">Файл пока не отправляется — для загрузки нужен сервер.</small></div>
<div class="f"><p><b>Состав:</b> ${Object.keys(cart).length?Object.entries(cart).map(([i,n])=>esc(pid(i)[1])+' × '+n).join('; '):'корзина пуста'}${org?' (можно оставить пустым и приложить спецификацию)':''}</p><p><b>Итого: ${rub(sum())}</b>${org?' — окончательную цену, поставку и документы согласует менеджер.':''}</p><button class="btn o" type="submit">${org?'Отправить заявку':'Подтвердить заказ'}</button></div></form>`}
function bindCo(){document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{type=b.dataset.k;$('#app').innerHTML=checkout(type);bindCo()});
$('#fo').onsubmit=e=>{e.preventDefault();const f=e.target,org=type!='p';let ok=true;const chk=(n,c,m)=>{const el=f[n];if(!el||el.closest('.hide'))return;const fl=el.closest('.fl'),bad=!c(el.value.trim());fl.classList.toggle('bad',bad);fl.querySelector('.er').textContent=bad?m:'';if(bad)ok=false};
chk('org',v=>!org||v,'Укажите название');chk('inn',v=>!org||/^(\d{10}|\d{12})$/.test(v),'ИНН: 10 или 12 цифр');chk('name',v=>v.length>1,'Укажите имя');chk('tel',v=>v.replace(/\D/g,'').length>=10,'Введите телефон полностью');chk('mail',v=>org?/^\S+@\S+\.\S+$/.test(v):(!v||/^\S+@\S+\.\S+$/.test(v)),'Проверьте e-mail');chk('adr',v=>v.length>4,'Укажите адрес');
if(!ok){f.querySelector('.bad input')?.focus();return}
if(!org&&!Object.keys(cart).length){alert('Корзина пуста — добавьте товары.');return}
const no='LP-'+Date.now().toString().slice(-6),L=S('lp_orders',[]);L.push({no,type,items:cart,total:sum(),at:new Date().toISOString()});W('lp_orders',L);cart={};save();
$('#app').innerHTML=`<div class="ok2" style="margin:32px 0"><h2>${org?'Заявка принята (демо)':'Заказ оформлен (демо)'}</h2><p>Номер в браузере: <b>${no}</b>. Это не настоящий заказ: сервер и оплата не подключены.${org?' После подключения менеджер свяжется для согласования счёта, условий поставки и документов.':''}</p><a class="btn o" href="#/catalog">В каталог</a></div>`}}
const info={about:["О нас","Текст о магазине появится после заполнения владельцем."],delivery:["Доставка и оплата","Способы и стоимость доставки, способы оплаты — данные для заполнения владельцем магазина."],contacts:["Контакты","Телефон с логотипа: 8-914-999-95-01. Адрес и график работы — данные для заполнения."]};
function route(){const h=location.hash.slice(1)||'/',[path,qs]=h.split('?'),s=path.split('/')[1]||'',a=$('#app');$('#nav').classList.remove('open');
document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.dataset.n==s));
if(s=='catalog'){a.innerHTML=catalog(qs);fill(qs)}else if(s=='product'){a.innerHTML=product(path.split('/')[2]);tabs(path.split('/')[2])}else if(s=='cart')a.innerHTML=cartPg();
else if(s=='checkout'){a.innerHTML=checkout('p');bindCo()}else if(s=='org'){a.innerHTML=checkout('d');bindCo()}else if(info[s])a.innerHTML=`<h1 style="margin:24px 0 12px">${info[s][0]}</h1><div class="warn">${info[s][1]}</div>`;else a.innerHTML=home();
scrollTo(0,0)}
$('#q').addEventListener('keydown',e=>{if(e.key=='Enter')location.hash='#/catalog?q='+encodeURIComponent(e.target.value)});
$('#bg').onclick=()=>$('#nav').classList.toggle('open');
addEventListener('hashchange',route);save();route();
