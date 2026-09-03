(function(){
  function fit(){var z=Math.min(1,window.innerWidth/1440);document.documentElement.style.zoom=z;}
  fit();window.addEventListener('resize',fit);
  var root=document.documentElement;
  var saved=localStorage.getItem('merlin-theme');if(saved)root.setAttribute('data-theme',saved);
  var qs=new URLSearchParams(location.search);var qp=qs.get('theme');if(qp)root.setAttribute('data-theme',qp);var vh=qs.get('vh');var hero=document.querySelector('.sec.hero');if(vh&&hero)hero.style.height=(parseInt(vh,10)-78)+'px';
  document.querySelectorAll('.theme').forEach(function(b){b.addEventListener('click',function(){var t=root.getAttribute('data-theme')==='dark'?'light':'dark';root.setAttribute('data-theme',t);localStorage.setItem('merlin-theme',t);});});
  var fill=document.querySelector('.strip-fill');
  function prog(){var h=document.documentElement;var max=h.scrollHeight-h.clientHeight;var p=max>0?Math.min(1,Math.max(0,h.scrollTop/max)):0;if(fill)fill.style.clipPath='inset(0 '+((1-p)*100).toFixed(2)+'% 0 0)';}
  window.addEventListener('scroll',prog,{passive:true});window.addEventListener('resize',prog);prog();setTimeout(prog,300);
  document.querySelectorAll('.faq-q').forEach(function(q){q.addEventListener('click',function(){var r=q.parentElement;var open=r.classList.toggle('open');q.setAttribute('aria-expanded',open);});});
  var spend=document.getElementById('calc-spend');
  if(spend){
    var total=document.getElementById('calc-total'),save=document.getElementById('calc-save'),shareL=document.getElementById('calc-share');
    var money=function(v){return '$'+Math.round(v).toLocaleString('en-US');};
    var share=70;var range=document.createElement('input');range.type='range';range.min=0;range.max=100;range.value=share;range.className='calc-range';
    var card=spend.closest('.n');if(card){card.appendChild(range);card.classList.add('has-range');}
    var pills=[];card&&card.querySelectorAll('.n').forEach(function(p){var t=p.querySelector('.t');if(t&&['GPT','Claude','Gemini','Other'].indexOf(t.textContent.trim())>=0){p.classList.add('calc-pill');pills.push(p);p.dataset.on=(t.textContent.trim()==='GPT'||t.textContent.trim()==='Claude')?'1':'0';}});
    var splits={};card&&card.querySelectorAll('.t').forEach(function(t){var s=t.textContent.trim();if(['$812','$644','$694'].indexOf(s)>=0)splits[s]=t;});
    function tier(v){return v<=1000?0.10:(v<=10000?0.20:0.25);}
    function recalc(){
      var v=parseFloat((spend.textContent||'').replace(/[^0-9.]/g,''))||0;var d=tier(v);var t=v*(1-d);
      total.textContent=money(t);save.textContent='you save ~'+money(v-t)+' · '+Math.round(d*100)+'%*';
      shareL.textContent='EVERYDAY SHARE · '+share+'%';
      var routable=t*share/100,rest=t-routable;var on=pills.filter(function(p){return p.dataset.on==='1';}).length||1;
      if(splits['$694'])splits['$694'].textContent=money(routable);
      if(splits['$812'])splits['$812'].textContent=money(rest/on);
      if(splits['$644'])splits['$644'].textContent=money(on>1?rest/on:0);
    }
    spend.addEventListener('input',recalc);spend.addEventListener('blur',function(){var v=parseFloat((spend.textContent||'').replace(/[^0-9.]/g,''))||0;spend.textContent=money(v);});
    spend.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();spend.blur();}});
    range.addEventListener('input',function(){share=+range.value;recalc();});
    pills.forEach(function(p){p.addEventListener('click',function(){p.dataset.on=p.dataset.on==='1'?'0':'1';var t=p.querySelector('.t');p.style.setProperty('--bg',p.dataset.on==='1'?'#121217':'#ffffff');p.style.setProperty('--dbg',p.dataset.on==='1'?'#f5f5f7':'#1a1a20');p.style.setProperty('--bd',p.dataset.on==='1'?'0 0 #0000':'inset 0 0 0 1px #e5e5eb');t.style.setProperty('--fg',p.dataset.on==='1'?'#ffffff':'#292933');t.style.setProperty('--dfg',p.dataset.on==='1'?'#0e0e12':'#c7c7d4');recalc();});});
  }
  var cap=document.querySelector('form.capture');
  if(cap){cap.addEventListener('submit',function(e){e.preventDefault();var inp=cap.querySelector('input');var v=inp.value.trim();if(!v||v.indexOf('@')<0){inp.focus();return;}cap.classList.add('sent');cap.textContent='Sent. The exact breakdown goes to '+v+'.';});}
  var search=document.getElementById('model-search');
  if(search){
    var kind='all';var cards=[].slice.call(document.querySelectorAll('.card'));var groups=[].slice.call(document.querySelectorAll('.mgroup'));var wrap=document.getElementById('models');
    function apply(){var q=search.value.trim().toLowerCase();var any=false;cards.forEach(function(c){var ok=(kind==='all'||c.dataset.kind===kind)&&(!q||c.dataset.name.indexOf(q)>=0);c.classList.toggle('hide',!ok);if(ok)any=true;});
      groups.forEach(function(g){g.classList.toggle('hide',!g.querySelector('.card:not(.hide)'));});wrap.classList.toggle('empty',!any);}
    search.addEventListener('input',apply);
    document.querySelectorAll('.pill').forEach(function(p){p.addEventListener('click',function(){document.querySelectorAll('.pill').forEach(function(x){x.classList.remove('on');});p.classList.add('on');kind=p.dataset.kind;apply();});});
  }
})();
