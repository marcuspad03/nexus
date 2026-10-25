(function(){
var C=window.NEXUS_CONFIG||{},$=function(s,r){return (r||document).querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
// Split headlines into letters
$$('[data-split]').forEach(function(el){var t=el.textContent;el.setAttribute('aria-label',t);el.innerHTML='';
 t.split(' ').forEach(function(w,wi){var s=document.createElement('span');s.style.whiteSpace='nowrap';s.setAttribute('aria-hidden','true');
  w.split('').forEach(function(c,i){var k=document.createElement('span');k.className='ch';k.textContent=c;k.style.transitionDelay=(wi*80+i*35)+'ms';s.appendChild(k)});
  el.appendChild(s);el.appendChild(document.createTextNode(' '))})});
// Reveal on scroll
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15}):null;
$$('.reveal,[data-split]').forEach(function(el){io?io.observe(el):el.classList.add('in')});
setTimeout(function(){$$('.hero [data-split]').forEach(function(e){e.classList.add('in')})},100);
// Scroll progress + scroll-linked story words
var words=$$('.word'),story=$('#story'),bar=$('#progress');
function onScroll(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight;bar.style.width=(max>0?h.scrollTop/max*100:0)+'%';
 var r=story.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
 words.forEach(function(w,i){w.classList.toggle('on',p>=(i+.3)/(words.length+.6))})}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);onScroll();
// Heat canvas (embers)
var cv=$('#heat'),cx=cv.getContext('2d'),P=[],W,H;
function size(){var d=devicePixelRatio||1;W=cv.width=cv.clientWidth*d;H=cv.height=cv.clientHeight*d}
size();addEventListener('resize',size);
var n=innerWidth<700?35:80;for(var i=0;i<n;i++)P.push({x:Math.random(),y:Math.random(),r:Math.random()*2.5+.5,v:Math.random()*.0008+.0002});
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
(function draw(){cx.clearRect(0,0,W,H);P.forEach(function(p){p.y-=p.v*16;if(p.y<0){p.y=1;p.x=Math.random()}
 var g=cx.createRadialGradient(p.x*W,p.y*H,0,p.x*W,p.y*H,p.r*6*(devicePixelRatio||1));g.addColorStop(0,'rgba(255,140,50,.8)');g.addColorStop(1,'rgba(255,106,43,0)');
 cx.fillStyle=g;cx.beginPath();cx.arc(p.x*W,p.y*H,p.r*6*(devicePixelRatio||1),0,7);cx.fill()});
 if(!reduce)requestAnimationFrame(draw)})();
// Cookie consent (DSGVO/TTDSG): nichts Optionales ohne Einwilligung
var KEY='nexus_consent',box=$('#cookie');
function get(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function save(s,m){try{localStorage.setItem(KEY,JSON.stringify({stats:s,marketing:m,ts:Date.now()}))}catch(e){}box.hidden=true;apply()}
function apply(){var c=get();if(!c)return;
 // Hier optionale Skripte erst nach Einwilligung laden (z.B. Analytics: c.stats, Pixel: c.marketing)
 document.dispatchEvent(new CustomEvent('nexus:consent',{detail:c}))}
if(!get())box.hidden=false;else apply();
$('#ck-all').onclick=function(){save(true,true)};$('#ck-reject').onclick=function(){save(false,false)};
$('#ck-save').onclick=function(){save($('#ck-stats').checked,$('#ck-mkt').checked)};
$('#cookieSettings').onclick=function(e){e.preventDefault();box.hidden=false};
// Kauf: Shopify Checkout
$$('[data-buy]').forEach(function(b){b.onclick=buy});
function msg(t){$('#buyMsg').textContent=t}
function buy(){
 if(C.shopifyDomain&&C.storefrontToken&&C.variantId){
  msg('Weiterleitung zur Kasse …');
  fetch('https://'+C.shopifyDomain+'/api/2024-10/graphql.json',{method:'POST',headers:{'Content-Type':'application/json','X-Shopify-Storefront-Access-Token':C.storefrontToken},
   body:JSON.stringify({query:'mutation($i:CartInput){cartCreate(input:$i){cart{checkoutUrl}userErrors{message}}}',variables:{i:{lines:[{merchandiseId:C.variantId,quantity:1,attributes:[{key:'Größe',value:$('#size').value}]}]}}})})
  .then(function(r){return r.json()}).then(function(d){var u=d.data&&d.data.cartCreate.cart&&d.data.cartCreate.cart.checkoutUrl;if(u)location.href=u;else msg('Fehler beim Erstellen des Warenkorbs.')})
  .catch(function(){msg('Verbindungsfehler – bitte erneut versuchen.')});
 }else if(C.fallbackCheckoutUrl){location.href=C.fallbackCheckoutUrl}
 else msg('Shop-Verbindung noch nicht eingerichtet (config.js).');
}
})();
