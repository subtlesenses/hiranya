document.documentElement.classList.add('js');
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* intro shutter cleanup */
setTimeout(function(){var s=document.getElementById('shutter');if(s)s.classList.add('done');},1700);

/* smooth scroll, native fallback */
var lenis = null;
if (window.Lenis && !REDUCED) {
  lenis = new Lenis({lerp: 0.085, smoothWheel: true});
  document.documentElement.classList.add('lenis-on');
  (function raf(t){ lenis.raf(t); requestAnimationFrame(raf); })(0);
}
document.addEventListener('click', function(e){
  var a = e.target.closest('a[href^="#"]'); if (!a) return;
  var id = a.getAttribute('href'); if (id === '#' || id === '#wa') return;
  var t = document.querySelector(id); if (!t) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(t, {offset: -64, duration: 1.5});
  else t.scrollIntoView({behavior: REDUCED ? 'auto' : 'smooth'});
});

/* marquee */
(function(){
  var bits=['<b>हिरण्य</b> hiranya — gold','Nakabahil, Patan','Homestay','Eight rooms','650m to Durbar Square','<b>छेली</b> chheli','<b>मातं</b> mātan','<b>छ्वत</b> chvata','<b>बैगः</b> baiga','<b>कौसी</b> kausi','The bell-makers’ courtyard'];
  var html=bits.map(function(b){return '<span>'+b+'</span>'}).join('');
  var el=document.getElementById('marq'); if(el) el.innerHTML=html+html;
})();

/* headings rise one line at a time */
Array.prototype.forEach.call(document.querySelectorAll('[data-lines]'), function(h){
  var parts = h.innerHTML.split(/<br\s*\/?>/i);
  h.innerHTML = parts.map(function(p,i){ return '<span class="ln"><b style="transition-delay:'+(i*90)+'ms">'+p.trim()+'</b></span>'; }).join('');
  var rv = h.closest('.rv'); if (rv) rv.classList.add('has-lines');
});

/* reveal on scroll */
(function(){
  var els=document.querySelectorAll('.rv,.shot');
  if(!('IntersectionObserver' in window)){Array.prototype.forEach.call(els,function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.12});
  Array.prototype.forEach.call(els,function(e){io.observe(e)});
})();

/* availability: sensible default dates */
(function(){
  var ci=document.getElementById('ci'), co=document.getElementById('co'); if(!ci||!co) return;
  function iso(d){ return d.toISOString().slice(0,10); }
  var a=new Date(); a.setDate(a.getDate()+7); var b=new Date(a); b.setDate(b.getDate()+4);
  ci.value=iso(a); co.value=iso(b); ci.min=iso(new Date()); co.min=iso(a);
  ci.addEventListener('change', function(){ co.min=ci.value; if(co.value<=ci.value){ var d=new Date(ci.value); d.setDate(d.getDate()+1); co.value=iso(d);} });
})();

/* the climb: scroll drives the floor, the image and the marker */
(function(){
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step')); if(!steps.length) return;
  var imgs  = Array.prototype.slice.call(document.querySelectorAll('.stack > *'));
  var ticks = Array.prototype.slice.call(document.querySelectorAll('[data-tick]'));
  var mark  = document.querySelector('.rail-mark');
  var cap   = document.querySelector('[data-cap]');
  var small = document.querySelector('.mark small');
  var smallDefault = small ? small.textContent : '';
  var cur = -1;
  function label(step){ var n=step.querySelector('.step-nep'); return n ? (n.querySelector('.deva').textContent + ' · ' + n.querySelector('i').textContent.split(' · ')[0]) : smallDefault; }
  function go(i){
    if(i===cur) return;
    steps.forEach(function(s,k){ s.classList.toggle('is-on', k===i); });
    imgs.forEach(function(im,k){ im.classList.remove('was'); if(k===cur) im.classList.add('was'); im.classList.toggle('on', k===i); });
    ticks.forEach(function(t){ t.classList.toggle('on', +t.getAttribute('data-tick')===i); });
    if(mark) mark.style.setProperty('--lvl', 4-i);
    if(cap) cap.textContent = steps[i].getAttribute('data-cap') || '';
    if(small) small.textContent = label(steps[i]);
    cur = i;
  }
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting) go(steps.indexOf(e.target)); });
  }, {rootMargin:'-42% 0px -42% 0px', threshold:0});
  steps.forEach(function(s){ io.observe(s); });
  var sec = document.querySelector('.climb');
  if(sec && small) new IntersectionObserver(function(es){
    es.forEach(function(e){ small.textContent = (!e.isIntersecting || cur<0) ? smallDefault : label(steps[cur]); });
  }, {threshold:0}).observe(sec);
  go(0);
})();

/* everything tied to scroll position, one frame at a time */
(function(){
  var hdr=document.getElementById('hdr'), mob=document.getElementById('mob'), doc=document.documentElement;
  var links=Array.prototype.slice.call(document.querySelectorAll('nav.top a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  var heroMedia=document.querySelector('.hero-media'), heroIn=document.querySelector('.hero-in');
  var pars=Array.prototype.slice.call(document.querySelectorAll('[data-par]'));
  var tick=false;
  function frame(){
    var y=window.scrollY, vh=window.innerHeight;
    hdr.classList.toggle('stuck', y>60);
    if(mob) mob.classList.toggle('up', y>vh*0.8);
    var max=doc.scrollHeight-vh;
    hdr.style.setProperty('--prog', (max>0 ? (y/max*100) : 0).toFixed(2)+'%');
    var cur=-1;
    secs.forEach(function(s,i){ if(s && s.getBoundingClientRect().top <= vh*0.42) cur=i; });
    links.forEach(function(a,i){ a.classList.toggle('on', i===cur); });
    if(!REDUCED){
      var p=Math.max(0, Math.min(1, y/vh));
      if(heroMedia && y<vh*1.2){ heroMedia.style.transform='scale('+(1+p*0.22).toFixed(4)+') translateY('+(p*7).toFixed(2)+'%)'; }
      if(heroIn && y<vh*1.2){ heroIn.style.opacity=Math.max(0,1-p*1.5).toFixed(3); heroIn.style.transform='translateY('+(p*70).toFixed(1)+'px)'; }
      pars.forEach(function(el){
        var r=el.parentElement.getBoundingClientRect();
        if(r.bottom<-200||r.top>vh+200) return;
        var amt=parseFloat(el.getAttribute('data-par'))||0.1;
        var mid=r.top+r.height/2-vh/2;
        el.style.transform='translate3d(0,'+(-mid*amt).toFixed(1)+'px,0)';
      });
    }
    tick=false;
  }
  window.addEventListener('scroll',function(){ if(!tick){ tick=true; requestAnimationFrame(frame); } },{passive:true});
  window.addEventListener('resize',frame);
  frame();
})();

/* room rail arrows */
(function(){
  var rail=document.getElementById('rail'); if(!rail) return;
  function step(dir){ var card=rail.firstElementChild; var w=card?card.getBoundingClientRect().width+22:340; rail.scrollBy({left:dir*w,behavior:'smooth'}); }
  document.getElementById('prev').addEventListener('click',function(){step(-1)});
  document.getElementById('next').addEventListener('click',function(){step(1)});
})();
