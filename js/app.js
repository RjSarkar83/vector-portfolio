/* asset resolver: lets the single-file build swap in embedded data-URIs; no-op on the normal build */
const A = p => { const u = (window.__ASSETS && window.__ASSETS[p]) || p; return /^assets\//.test(u) ? u + '?v=20261005ratio4' : u; };  /* ?v= busts the browser cache when artwork changes */
/* ArtViSiON — portfolio interactions */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const PILLARS = ['ADVERTiSiNG', 'BRANDiNG', 'CREATiVE', 'DESiGNiNG', 'EXECUTiON'];

/* ---------------- data ---------------- */
const projects = [
  { id:1, title:'Kaffé Noir — Emblem & Coffee Pouch', sub:'Emblem on a matte pouch and striped cup', cat:'BRANDiNG', year:'2026', scope:'Logo, emblem & pouch label design', tools:'CorelDRAW, Photoshop, Pre-Press', img:A('assets/covers/project-1-branding.svg'),
    challenge:'One simple emblem for pouch and cup.',
    solution:'A half-black, half-red emblem, applied to both.', palette:['#FF7A1F', '#111110', '#F3F0E9', '#F2271A'] },
  { id:2, title:'Forma & Grid — Geometric Posters', sub:'Three geometric posters on one shelf', cat:'ADVERTiSiNG', year:'2026', scope:'Poster artwork & key visuals', tools:'CorelDRAW, Illustrator', img:A('assets/covers/project-2-posters.svg'), art:'#2C3FD6', floor:true,
    challenge:'Posters that read from afar and up close.',
    solution:'Circles, arcs and one shared grid in four colours.', palette:['#2C3FD6', '#D9A441', '#F2271A', '#111110'] },
  { id:3, title:'Veda Botanicals — Botanical Packaging', sub:'Carton, dropper bottle and jar', cat:'DESiGNiNG', year:'2026', scope:'Packaging design: carton, bottle & jar', tools:'CorelDRAW, Photoshop, 3D Mockup', img:A('assets/covers/project-3-packaging.svg'),
    challenge:'One look across carton, bottle and jar.',
    solution:'A leaf emblem in deep green, cream and amber.', palette:['#14553F', '#F6F4EE', '#FF8A00', '#CDE8DA'] },
  { id:4, title:'Solstice — Book Cover & Spread', sub:'Book cover and open spread', cat:'CREATiVE', year:'2025', scope:'Book cover & spread artwork', tools:'CorelDRAW, Illustrator', img:A('assets/covers/project-4-editorial.svg'),
    challenge:'Cover and spreads in one visual language.',
    solution:'Circle and arc artwork on a simple page layout.', palette:['#2C3FD6', '#FFE600', '#F2271A', '#FF4F9A'] },
  { id:5, title:'Aura Lifestyle — Social Campaign', sub:'Phone-feed creatives and colour tiles', cat:'CREATiVE', year:'2026', scope:'Social creatives & digital campaign', tools:'Photoshop, CorelDRAW, Canva', img:A('assets/covers/project-5-social.svg'),
    challenge:'Posts that stay recognisable as small tiles.',
    solution:'A bold tile system sized for mobile feeds.', palette:['#FF4F9A', '#0E1238', '#FF8A00', '#FFE600'] },
  { id:6, title:'Marks, Monograms & Brand Symbols — Logofolio', sub:'Nine geometric marks on one grid', cat:'BRANDiNG', year:'2024–2026', scope:'Logo design & mark exploration', tools:'CorelDRAW, Illustrator', img:A('assets/covers/project-6-logofolio.svg'),
    challenge:'Marks that stay clear small and large.',
    solution:'Nine flat marks on a shared square grid.', palette:['#FFE600', '#F2271A', '#2C3FD6', '#111110'] },
  { id:7, title:'Mobile Brand Retail Rollout — ACP Cladding & Signage', sub:'ACP cladding, fascia boxes, glazing & wall signs', cat:'EXECUTiON', year:'2026', scope:'Mobile-brand retail branding: ACP cladding, signage & brand store branding', tools:'CorelDRAW, Illustrator, 3D Mockup', img:A('assets/covers/project-7-execution.svg'),
    challenge:'One store look across many outlets.',
    solution:'A modular signage kit, from recce to installation.', palette:['#FF8A00','#E06F00','#F3F0E9','#2C3FD6'] },
  { id:8, title:'Corporate Event & POSM Production Kit', sub:'POSM shelf, standee, badge, lanyard & tote', cat:'EXECUTiON', year:'2026', scope:'Event branding & POSM print execution', tools:'CorelDRAW, Illustrator, Print Production', img:A('assets/covers/project-8-print-posm.svg'),
    challenge:'One brand look across every event item.',
    solution:'One master artwork set, proofed before print.', palette:['#14A89A', '#F2271A', '#FFE600', '#FF4F9A'] }
];

const pillars = [
  { key:'ADVERTiSiNG', letters:'H · N · O · S · W', img:A('assets/storyboard/scene-1-advertising.svg'), desc:'Hoardings, neon, outdoor media and window displays.', del:['Hoardings','Neon & LED','Outdoor media','Signage','Window display'] },
  { key:'BRANDiNG', letters:'B · L · V · Z', img:A('assets/storyboard/scene-2-branding.svg'), desc:'Identity, logos, stationery and zonal rollouts.', del:['Logo systems','Identity','Stationery','Zonal rollouts'] },
  { key:'CREATiVE', letters:'C · U · X', img:A('assets/storyboard/scene-3-creative.svg'), desc:'Campaigns, key visuals and experience design.', del:['Campaigns','Key visuals','UX flows','Experience design'] },
  { key:'DESiGNiNG', letters:'A · D · G · M · P · T', img:A('assets/templates/designing-wide.svg'), desc:'Artwork, typography, packaging and 3D mockups.', del:['Artworking','Graphic design','Typography','Packaging','3D mockups'] },
  { key:'EXECUTiON', letters:'E · F · I · J · K · Q · R · Y', img:A('assets/storyboard/scene-5-execution.svg'), desc:'Recce, fabrication, ACP cladding and installation.', del:['Recce','Fabrication','Job production','Kiosks','Installation','Quality control'] }
];

const az = [
  ['A','ArtWORKing','DESiGNiNG','atoz-A-artworking','Print-ready production artwork.'],
  ['B','Branding','BRANDiNG','atoz-B-branding','Identity systems and brand guidelines.'],
  ['C','Creative','CREATiVE','atoz-C-creative','Concepts and key visuals.'],
  ['D','Designing','DESiGNiNG','atoz-D-designing','Layouts and drawings fabricators can build.'],
  ['E','Execution','EXECUTiON','atoz-E-execution','Turnkey build with on-site supervision.'],
  ['F','Fabrication','EXECUTiON','atoz-F-fabrication','CNC-ready files and fabrication drawings.'],
  ['G','Graphic Design','DESiGNiNG','atoz-G-graphic-design','Colour, print collateral and catalogues.'],
  ['H','Hoarding','ADVERTiSiNG','atoz-H-hoarding','Large hoardings that read from the road.'],
  ['I','Installation','EXECUTiON','atoz-I-installation','Facade signage fitted exactly to the drawing.'],
  ['J','Job Production','EXECUTiON','atoz-J-job-production','Print and production runs, proof to delivery.'],
  ['K','Kiosk','EXECUTiON','atoz-K-kiosk','Retail kiosks and counters, built and branded.'],
  ['L','Logo','BRANDiNG','atoz-L-logo','Logos built on geometry.'],
  ['M','Mockup','DESiGNiNG','atoz-M-mockup','3D mockups shown before production.'],
  ['N','Neon','ADVERTiSiNG','atoz-N-neon','Neon and LED-neon signs.'],
  ['O','Outdoor','ADVERTiSiNG','atoz-O-outdoor','Street media planned for visibility.'],
  ['P','Packaging','DESiGNiNG','atoz-P-packaging','Dielines, boxes, pouches and labels.'],
  ['Q','Quality Control','EXECUTiON','atoz-Q-quality-control','Proofs, colour checks and QA.'],
  ['R','Recce','EXECUTiON','atoz-R-recce','Site survey and exact measurements.'],
  ['S','Signage','ADVERTiSiNG','atoz-S-signage','Fascia, blade and wayfinding signs.'],
  ['T','Typography','DESiGNiNG','atoz-T-typography','Type systems on a baseline grid.'],
  ['U','User Experience','CREATiVE','atoz-U-user-experience','Easy-to-use flows and web assets.'],
  ['V','Visiting Card','BRANDiNG','atoz-V-visiting-card','Visiting cards and stationery.'],
  ['W','Window Display','ADVERTiSiNG','atoz-W-window-display','Window displays and in-shop merchandising.'],
  ['X','X-Perience Design','CREATiVE','atoz-X-experience-design','Walk-through event and exhibition experiences.'],
  ['Y','Yard','EXECUTiON','atoz-Y-yard','Materials and dispatch, managed.'],
  ['Z','Zonal Branding','BRANDiNG','atoz-Z-zonal-branding','Zone-by-zone rollouts across cities.']
].map(([l,t,p,i,d]) => ({ l, t, p, img:A(`assets/storyboard/${i}.svg`), d }));

/* ---------------- helpers ---------------- */
const split = t => { const [a, ...b] = t.split(' — '); return [a, b.join(' — ')]; };
const pad = n => String(n).padStart(2, '0');
const triHTML = '<i class="tri"></i>';

/* ---------------- marquee ---------------- */
(() => {
  const unit = PILLARS.map(p => `<span>${p}</span><i class="tri"></i>`).join('');
  $('#marqueeTrack').innerHTML = unit.repeat(4);
})();

/* ---------------- nav ---------------- */
const nav = $('#nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive:true });
const burger = $('#burger');
const setMenu = o => { document.body.classList.toggle('menu-open', o); burger.setAttribute('aria-expanded', o); };
burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
$$('#sheet a').forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ---------------- text splitting ---------------- */
const walkText = (root, fn) => [...root.childNodes].forEach(n => { if (n.nodeType === 3) fn(n); else if (n.nodeType === 1) walkText(n, fn); });
const splitWords = (el, cls) => {
  walkText(el, n => {
    const frag = document.createDocumentFragment();
    n.textContent.split(/(\s+)/).forEach(t => {
      if (!t) return;
      if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(' ')); return; }
      const w = document.createElement('span');
      if (cls === 'w') { w.className = 'w'; const i = document.createElement('span'); i.textContent = t; w.appendChild(i); }
      else { w.className = cls; w.textContent = t; }
      frag.appendChild(w);
    });
    n.replaceWith(frag);
  });
};
const heroH1 = $('h1.split');
if (heroH1) { splitWords(heroH1, 'w'); $$('.w>span', heroH1).forEach((s, i) => s.style.transitionDelay = (i * .08) + 's'); }
const statement = $('#statement');
if (statement) splitWords(statement, 'wd');

/* ---------------- reveal (gated until the loader has left) ---------------- */
const root = document.documentElement;
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold:.12, rootMargin:'0px 0px -6% 0px' });
const observeRv = () => $$('.rv:not(.in), .split:not(.in), .feature:not(.in)').forEach(el => {
  if (!root.classList.contains('ready') && el.closest('.hero')) return;
  io.observe(el);
});
observeRv();

/* ---------------- loader ---------------- */
(() => {
  const loader = $('#loader');
  const ready = () => { root.classList.add('ready'); observeRv(); };
  if (!loader) return ready();
  if (reduce || sessionStorage.getItem('av-seen')) { loader.remove(); return ready(); }
  const num = $('#ldCount'), bar = $('#ldBar'), t0 = performance.now(), dur = 1400;
  const ease = t => 1 - Math.pow(1 - t, 3);
  const step = now => {
    const p = Math.min((now - t0) / dur, 1), v = Math.round(ease(p) * 100);
    num.textContent = String(v).padStart(2, '0'); bar.style.width = v + '%';
    if (p < 1) requestAnimationFrame(step);
    else { loader.classList.add('done'); sessionStorage.setItem('av-seen', '1'); setTimeout(ready, 380); setTimeout(() => loader.remove(), 1300); }
  };
  requestAnimationFrame(step);
})();

/* ---------------- custom cursor ---------------- */
const cursor = $('#cursor'), cLabel = $('#cursorLabel');
if (fine && !reduce) {
  document.documentElement.classList.add('has-cursor');
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });
  const loop = () => { cx += (tx - cx) * .22; cy += (ty - cy) * .22; cursor.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); };
  loop();
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor]');
    if (t && t.dataset.cursor) { cLabel.textContent = t.dataset.cursor; cursor.classList.add('big'); }
    else cursor.classList.remove('big');
  });
}

/* ---------------- hero mark: eyes follow the pointer ---------------- */
(() => {
  const mark = $('#mark'); if (!mark || reduce) return;
  const pupils = $$('.pupil', mark);
  const eyes = [{ el:pupils[0], cx:.254, cy:.437, x:0, y:0 }, { el:pupils[1], cx:.743, cy:.437, x:0, y:0 }];
  let mx = null, my = null, lastMove = -1e9, visible = true;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; lastMove = performance.now(); });
  new IntersectionObserver(([e]) => visible = e.isIntersecting).observe(mark);
  const tick = now => {
    if (visible) {
      const r = mark.getBoundingClientRect(), W = r.width, H = r.height;
      const rx = W * .068, ry = W * .03;
      eyes.forEach((eye, i) => {
        let vx, vy;
        if (now - lastMove < 3500 && mx !== null) {
          const dx = mx - (r.left + eye.cx * W), dy = my - (r.top + eye.cy * H);
          const d = Math.hypot(dx, dy) || 1, k = Math.min(d / (W * .55), 1);
          vx = dx / d * rx * k; vy = dy / d * ry * k;
        } else {
          vx = Math.sin(now / 1700 + i * .25) * rx * .7;
          vy = Math.cos(now / 2300) * ry * .45;
        }
        eye.x += (vx - eye.x) * .14; eye.y += (vy - eye.y) * .14;
        eye.el.style.setProperty('--x', eye.x.toFixed(2) + 'px');
        eye.el.style.setProperty('--y', eye.y.toFixed(2) + 'px');
      });
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* ---------------- work ---------------- */
const grid = $('#grid'), index = $('#index'), wrapEl = $('#workWrap');
grid.innerHTML = projects.map((p, i) => { const [n, d] = split(p.title); return `
  <button class="card rv" data-id="${p.id}" data-cat="${p.cat}" data-cursor="View" style="--d:${(i % 2) * .08}s">
    <div class="ph"><img src="${p.img}" alt="${n} — ${p.sub}" loading="lazy" decoding="async"></div>
    <div class="meta"><h3>${n}</h3><span class="cat">${p.cat}</span></div>
    <p class="sub">${d || p.sub}</p>
  </button>`; }).join('');
index.innerHTML = projects.map((p, i) => { const [n] = split(p.title); return `
  <li><button class="row" data-id="${p.id}" data-cat="${p.cat}" data-img="${p.img}" data-cursor="Open">
    <span class="n">${pad(i + 1)}</span><h3>${n}</h3><span class="c">${p.cat}</span><span class="y">${p.year}</span>
  </button></li>`; }).join('');
observeRv();

// filters
const wc = $('#workChips');
wc.innerHTML = ['ALL', ...PILLARS].map((p, i) => `<button class="chip${i ? '' : ' on'}" data-f="${p}">${p === 'ALL' ? 'All' : p}</button>`).join('');
wc.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('.chip', wc).forEach(c => c.classList.toggle('on', c === b));
  const f = b.dataset.f;
  $$('.card, .index li', wrapEl).forEach(el => {
    const cat = (el.dataset.cat) || el.firstElementChild.dataset.cat;
    el.classList.toggle('hide', f !== 'ALL' && cat !== f);
  });
});
// view toggle
$('#viewSeg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('#viewSeg button').forEach(x => x.classList.toggle('on', x === b));
  wrapEl.classList.toggle('is-index', b.dataset.v === 'index');
});
// hover preview for index
const peek = $('#peek'), peekImg = $('img', peek);
if (fine) {
  let px = 0, py = 0, tx = 0, ty = 0, on = false;
  addEventListener('pointermove', e => { tx = e.clientX + 28; ty = e.clientY - 120; });
  const loop = () => { px += (tx - px) * .16; py += (ty - py) * .16; peek.style.left = px + 'px'; peek.style.top = py + 'px'; requestAnimationFrame(loop); };
  loop();
  index.addEventListener('pointerover', e => {
    const r = e.target.closest('.row');
    if (r) { peekImg.src = r.dataset.img; peek.classList.add('on'); }
  });
  index.addEventListener('pointerleave', () => peek.classList.remove('on'));
}

/* ---------------- case study ---------------- */
const cs = $('#case');
let curId = null;
const openCase = id => {
  const p = projects.find(x => x.id === +id); if (!p) return;
  curId = p.id;
  const [n] = split(p.title);
  $('#cCat').textContent = p.cat;
  $('#cTitle').textContent = n;
  $('#cSub').textContent = split(p.title)[1] ? split(p.title)[1] + ' — ' + p.sub : p.sub;
  $('#cScope').textContent = p.scope; $('#cTools').textContent = p.tools; $('#cYear').textContent = p.year;
  const im = $('#cImg'); im.src = p.img; im.alt = p.title;
  const art = $('#cArt'); art.classList.toggle('tint', !!p.art); art.classList.toggle('floor', !!p.floor); if (p.art) art.style.setProperty('--art', p.art); else art.style.removeProperty('--art');
  $('#cChallenge').textContent = p.challenge; $('#cSolution').textContent = p.solution;
  $('#cPal').innerHTML = p.palette.map(h => `<button class="sw" data-hex="${h}" data-cursor="Copy"><i style="background:${h}"></i><span>${h.toUpperCase()}<em>COPY</em></span></button>`).join('');
  cs.classList.add('open'); cs.setAttribute('aria-hidden', 'false'); cs.scrollTop = 0;
  document.body.style.overflow = 'hidden';
};
const closeCase = () => { cs.classList.remove('open'); cs.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; cursor.classList.remove('big'); };
const step = d => { const i = projects.findIndex(p => p.id === curId); openCase(projects[(i + d + projects.length) % projects.length].id); };
wrapEl.addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) openCase(b.dataset.id); });
$('#cClose').addEventListener('click', closeCase);
$('#cPrev').addEventListener('click', () => step(-1));
$('#cNext').addEventListener('click', () => step(1));
addEventListener('keydown', e => {
  if (!cs.classList.contains('open')) return;
  if (e.key === 'Escape') closeCase();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});
$('#cPal').addEventListener('click', e => {
  const b = e.target.closest('.sw'); if (!b) return;
  navigator.clipboard && navigator.clipboard.writeText(b.dataset.hex);
  const em = $('em', b); em.textContent = 'COPIED'; setTimeout(() => em.textContent = 'COPY', 1400);
});

/* ---------------- pillars accordion ---------------- */
const acc = $('#acc');
acc.innerHTML = pillars.map((p, i) => `
  <article class="panel${i === 0 ? ' on' : ''}${p.key === 'DESiGNiNG' ? ' design-ratios' : ''}" tabindex="0" role="button" aria-expanded="${i === 0}">
    <img src="${p.img}" alt="" decoding="async">
    <span class="num">${pad(i + 1)}</span>
    <span class="vt">${p.key}</span>
    <div class="body">
      <h3>${p.key}</h3>
      <p>${p.desc}</p>
      <div class="del">${p.del.slice(0, 3).map(d => `<span>${d}</span>`).join('')}</div>
      <div class="lt">${p.letters}</div>
      ${p.key === 'DESiGNiNG' ? `<div class="ratio-picker" role="group" aria-label="Artwork aspect ratio"><button type="button" data-ratio="square" aria-pressed="false">1:1</button><button type="button" data-ratio="wide" aria-pressed="true">16:9</button><button type="button" data-ratio="portrait" aria-pressed="false">4:5</button><button type="button" data-ratio="classic" aria-pressed="false">4:3</button><button type="button" data-ratio="tall" aria-pressed="false">1:2</button><button type="button" data-ratio="panoramic" aria-pressed="false">2:1</button></div><p class="ratio-caption" aria-live="polite">16:9 · Landscape presentation</p><a class="ratio-more" href="designing-templates.html">View & download all templates ↗</a>` : ''}
    </div>
  </article>`).join('');
const panels = $$('.panel', acc);
const setPanel = el => panels.forEach(p => { const on = p === el; p.classList.toggle('on', on); p.setAttribute('aria-expanded', on); });
const stacked = matchMedia('(max-width:860px)');
/* stacked layout: opening one panel collapses the one above it, which slides the tapped panel upward.
   The switch is instant there and the scroll position is corrected in the same frame, so nothing jumps or flickers. */
const pick = (p, hold) => {
  if (p.classList.contains('on')) return;
  if (hold && stacked.matches) { const t0 = p.getBoundingClientRect().top; setPanel(p); const d = p.getBoundingClientRect().top - t0; if (d) scrollBy(0, d); const r = p.getBoundingClientRect(); if (r.bottom > innerHeight) scrollTo({ top: scrollY + r.top - 96, behavior: reduce ? 'auto' : 'smooth' }); }
  else setPanel(p);
};
panels.forEach(p => {
  p.addEventListener('click', () => pick(p, true));
  p.addEventListener('focus', () => { if (p.matches(':focus-visible')) pick(p, true); });
  /* hover opening only in the side-by-side layout: in the stacked layout the panels move under the pointer and would fight each other */
  if (fine) p.addEventListener('mouseenter', () => { if (!stacked.matches) setPanel(p); });
  p.addEventListener('keydown', e => { if (e.target.closest('button, a')) return; if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPanel(p); } });
});

/* Ratio templates switch directly inside the DESiGNiNG panel. */
const ratioPanel = $('.design-ratios', acc);
if (ratioPanel) {
  const descriptions = {square:'1:1 · Square presentation', wide:'16:9 · Landscape presentation', portrait:'4:5 · Portrait presentation', classic:'4:3 · Classic presentation', tall:'1:2 · Tall portrait presentation', panoramic:'2:1 · Panoramic presentation'};
  ratioPanel.addEventListener('click', e => {
    const button = e.target.closest('[data-ratio]');
    if (!button) return;
    e.stopPropagation(); setPanel(ratioPanel);
    const key = button.dataset.ratio;
    const image = $('img', ratioPanel);
    image.src = A('assets/templates/designing-' + key + '.svg');
    image.alt = 'DESiGNiNG — ' + descriptions[key];
    $$('.ratio-picker button', ratioPanel).forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    $('.ratio-caption', ratioPanel).textContent = descriptions[key];
  });
  $('img', ratioPanel).alt = 'DESiGNiNG — 16:9 landscape presentation';
}

/* ---------------- A to Z ---------------- */
const lettersEl = $('#letters'), imgsEl = $('#azImgs');
lettersEl.innerHTML = az.map((s, i) => `<button class="letter${i === 0 ? ' on' : ''}" role="tab" data-i="${i}" aria-label="${s.l} — ${s.t}">${s.l}</button>`).join('');
imgsEl.innerHTML = az.map((s, i) => `<img src="${s.img}" alt="${s.t}" loading="${i < 3 ? 'eager' : 'lazy'}"${i === 0 ? ' class="on"' : ''}>`).join('');
const azImgs = $$('img', imgsEl), azLetters = $$('.letter', lettersEl);
let azCur = -1, azTimer = null, azFilter = 'ALL', azAuto = true;
const setAz = i => {
  if (i === azCur) return; azCur = i;
  const s = az[i];
  azLetters.forEach((b, k) => b.classList.toggle('on', k === i));
  azImgs.forEach((im, k) => im.classList.toggle('on', k === i));
  $('#azTag').innerHTML = `${triHTML}${s.l} &nbsp;/&nbsp; ${s.p}`;
  $('#azTitle').textContent = s.t; $('#azDesc').textContent = s.d;
};
setAz(0);
lettersEl.addEventListener('pointerover', e => { const b = e.target.closest('.letter'); if (b) { azAuto = false; setAz(+b.dataset.i); } });
lettersEl.addEventListener('click', e => { const b = e.target.closest('.letter'); if (b) { azAuto = false; setAz(+b.dataset.i); } });
lettersEl.addEventListener('focusin', e => { const b = e.target.closest('.letter'); if (b) setAz(+b.dataset.i); });
/* ---- A to Z full-screen viewer (letters + artwork) ---- */
const lb = document.createElement('div');
lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-hidden', 'true'); lb.setAttribute('aria-label', 'A to Z artwork');
lb.innerHTML = `<div class="lb-bar"><span class="lb-tag" id="lbTag"></span><div class="lb-btns"><button class="lb-b" id="lbPrev" aria-label="Previous letter" data-cursor="Prev">&larr;</button><button class="lb-b" id="lbNext" aria-label="Next letter" data-cursor="Next">&rarr;</button><button class="lb-b" id="lbClose" aria-label="Close" data-cursor="Close">&times;</button></div></div>
<div class="lb-stage"><img id="lbImg" alt=""></div>
<div class="lb-cap"><b id="lbL"></b><div><h3 id="lbT"></h3><p id="lbD"></p></div></div>`;
document.body.appendChild(lb);
let lbI = 0, lbOpen = false;
const lbShow = i => {
  lbI = (i + az.length) % az.length; const s = az[lbI];
  const im = $('#lbImg'); im.classList.remove('in'); im.src = s.img; im.alt = s.t;
  requestAnimationFrame(() => requestAnimationFrame(() => im.classList.add('in')));
  $('#lbTag').innerHTML = `${triHTML}${s.l} &nbsp;/&nbsp; ${s.p} &nbsp;&middot;&nbsp; ${pad(lbI + 1)} / ${az.length}`;
  $('#lbL').textContent = s.l; $('#lbT').textContent = s.t; $('#lbD').textContent = s.d;
  setAz(lbI);
};
const lbOpenAt = i => {
  lbOpen = true; azAuto = false; lbShow(i);
  lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; $('#lbClose').focus({ preventScroll:true });
};
const lbCloseFn = () => {
  if (!lbOpen) return; lbOpen = false;
  lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};
lettersEl.addEventListener('click', e => { const b = e.target.closest('.letter'); if (b) lbOpenAt(+b.dataset.i); });
const azView = imgsEl; azView.style.cursor = 'zoom-in'; azView.setAttribute('data-cursor', 'Full screen'); azView.tabIndex = 0; azView.setAttribute('role', 'button'); azView.setAttribute('aria-label', 'Open artwork full screen');
azView.addEventListener('click', () => lbOpenAt(azCur));
azView.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbOpenAt(azCur); } });
$('#lbClose').addEventListener('click', lbCloseFn);
$('#lbPrev').addEventListener('click', () => lbShow(lbI - 1));
$('#lbNext').addEventListener('click', () => lbShow(lbI + 1));
lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-stage')) lbCloseFn(); });
addEventListener('keydown', e => {
  if (!lbOpen) return;
  if (e.key === 'Escape') lbCloseFn();
  if (e.key === 'ArrowRight') lbShow(lbI + 1);
  if (e.key === 'ArrowLeft') lbShow(lbI - 1);
});
const ac = $('#azChips');
ac.innerHTML = ['ALL', ...PILLARS].map((p, i) => `<button class="chip${i ? '' : ' on'}" data-f="${p}">${p === 'ALL' ? 'All 26' : p}</button>`).join('');
ac.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  azAuto = false; azFilter = b.dataset.f;
  $$('.chip', ac).forEach(c => c.classList.toggle('on', c === b));
  azLetters.forEach((l, k) => l.classList.toggle('dim', azFilter !== 'ALL' && az[k].p !== azFilter));
  if (azFilter !== 'ALL') { const first = az.findIndex(s => s.p === azFilter); setAz(first); }
});
// gentle autoplay while the section is on screen until the visitor interacts
new IntersectionObserver(([e]) => {
  clearInterval(azTimer);
  if (e.isIntersecting && !reduce) azTimer = setInterval(() => { if (azAuto) setAz((azCur + 1) % az.length); }, 3200);
}, { threshold:.4 }).observe($('#atoz'));

/* ---------------- artwork slideshow (all vector artwork, left/right) ---------------- */
(() => {
  const stage = $('#reelStage'); if (!stage) return;
  const track = $('#reelTrack'), thumbs = $('#reelThumbs'), bar = $('#reelBar');
  const BG = {"assets/covers/acp-brand-store.svg":"#CFE0F8","assets/covers/project-5-social.svg":"#FF4F9A","assets/covers/project-1-branding.svg":"#FF7A1F","assets/covers/project-2-posters.svg":"#2C3FD6","assets/covers/project-3-packaging.svg":"#CBE8D8","assets/covers/project-4-editorial.svg":"#F2D24B","assets/covers/project-6-logofolio.svg":"#F3F0E9","assets/covers/project-7-execution.svg":"#0E1238","assets/covers/project-8-print-posm.svg":"#12A89A","assets/covers/masterpiece-presentation.svg":"#EFE3CF","assets/dive/dive-1-acp-facade.svg":"#CFE0F8","assets/dive/dive-5-book.svg":"#F2D14B","assets/dive/dive-2-coffee.svg":"#FF7A1F","assets/dive/dive-3-poster-wall.svg":"#2C3FD6","assets/dive/dive-4-botanical.svg":"#C0E5D3","assets/dive/dive-6-social-grid.svg":"#FF4F9A","assets/dive/dive-7-mark-construction.svg":"#F3F0E9","assets/dive/dive-8-brand-store.svg":"#EFE9DC","assets/dive/dive-9-danglers.svg":"#B8A4FF","assets/storyboard/atoz-A-artworking.svg":"#F3F0E9","assets/storyboard/atoz-K-kiosk.svg":"#BFE5D2","assets/storyboard/atoz-B-branding.svg":"#FFD84A","assets/storyboard/atoz-C-creative.svg":"#B8A4FF","assets/storyboard/atoz-D-designing.svg":"#BFE5D2","assets/storyboard/atoz-E-execution.svg":"#8DB8FF","assets/storyboard/atoz-F-fabrication.svg":"#0E1238","assets/storyboard/atoz-G-graphic-design.svg":"#F3F0E9","assets/storyboard/atoz-H-hoarding.svg":"#8DB8FF","assets/storyboard/atoz-I-installation.svg":"#2C3FD6","assets/storyboard/atoz-J-job-production.svg":"#FF8A00","assets/storyboard/atoz-M-mockup.svg":"#F3F0E9","assets/storyboard/atoz-N-neon.svg":"#E9DCC6","assets/storyboard/atoz-O-outdoor.svg":"#FFE600","assets/storyboard/atoz-P-packaging.svg":"#E7D6BC","assets/storyboard/atoz-Q-quality-control.svg":"#12A89A","assets/storyboard/atoz-R-recce.svg":"#E7D6BC","assets/storyboard/atoz-S-signage.svg":"#F3F0E9","assets/storyboard/atoz-T-typography.svg":"#FF4F9A","assets/storyboard/atoz-U-user-experience.svg":"#2C3FD6","assets/storyboard/atoz-V-visiting-card.svg":"#B8A4FF","assets/storyboard/atoz-W-window-display.svg":"#FF5C39","assets/storyboard/atoz-X-experience-design.svg":"#B8A4FF","assets/storyboard/atoz-Y-yard.svg":"#E7D6BC","assets/storyboard/atoz-Z-zonal-branding.svg":"#F3F0E9","assets/storyboard/golden-keyvisual.svg":"#F3F0E9","assets/storyboard/scene-1-advertising.svg":"#BFE5D2","assets/storyboard/scene-2-branding.svg":"#F2271A","assets/storyboard/scene-3-creative.svg":"#2C3FD6","assets/storyboard/scene-4-design.svg":"#2C3FD6","assets/storyboard/scene-5-execution.svg":"#EFE6D6"};
  Object.assign(BG, { 'assets/covers/project-7-expo-pavilion.svg':'#0E1238', 'assets/retail/retail-1-phone-store-front.svg':'#CFE0F8', 'assets/retail/retail-2-phone-store-interior.svg':'#EFE9DC', 'assets/retail/retail-3-cladding-fascia-detail.svg':'#F3F0E9', 'assets/retail/retail-4-phone-store-night.svg':'#0E1238', 'assets/retail/retail-5-sign-system.svg':'#F3F0E9', 'assets/retail/retail-6-acp-installation.svg':'#CFE0F8', 'assets/retail/retail-7-mall-kiosk.svg':'#EFE9DC', 'assets/retail/retail-8-recce-to-installed.svg':'#CFE0F8', 'assets/retail/retail-9-glazing-vinyl.svg':'#CFE0F8', 'assets/retail/retail-10-rollout-grid.svg':'#F3F0E9' });
  BG['assets/storyboard/branding-ratio.svg'] = '#F2271A';
  const bgOf = u => BG[u.split('?')[0]] || '#F3F0E9';
  /* scenes with a horizon / floor line: continue it across the side margins so the art blends into the full-width stage */
  const lg = (top, line, floor, at, w) => `linear-gradient(${top} 0 ${at}%, ${line} ${at}% ${at + w}%, ${floor} ${at + w}%)`;
  /* r = artwork aspect ratio; desktop stage is 21:9 (art fits height), mobile stage is 4:3 (art fits width, centred) */
  const hz = (top, line, floor, at, w, r) => { const f = (4 / 3) / r, o = (1 - f) / 2 * 100, m = x => +(o + f * x).toFixed(2); return [lg(top, line, floor, at, w), lg(top, line, floor, m(at), +(f * w).toFixed(2))]; };
  const GRAD = {
    'assets/covers/acp-brand-store.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 57.8, .6, 2),
    'assets/covers/masterpiece-presentation.svg': hz('#EFE3CF', '#C9B18C', '#DCC8A8', 76, 1.2, 2),
    'assets/dive/dive-1-acp-facade.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 82.2, .9, 16 / 9),
    'assets/dive/dive-8-brand-store.svg': hz('#EFE9DC', '#C9B28C', '#DCC7A5', 77.8, .9, 16 / 9),
    'assets/retail/retail-1-phone-store-front.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 82.2, .9, 16 / 9),
    'assets/retail/retail-2-phone-store-interior.svg': hz('#EFE9DC', '#C9B28C', '#DCC7A5', 77.8, .9, 16 / 9),
    'assets/archive/archive-1-mall-atrium.svg': hz('#EADFC8', '#C9B28C', '#DCC7A5', 80, .9, 16 / 9),
    'assets/archive/archive-2-expo-pavilion-day.svg': hz('#8DB8FF', '#CDB98F', '#E3D2AE', 81.1, 1.1, 16 / 9),
    'assets/more/more-5-boutique-window.svg': hz('#EFE3CF', '#C9B28C', '#DCC7A5', 82.2, .9, 16 / 9),
    'assets/more/more-6-design-studio-desk.svg': hz('#F3F0E9', '#C9B28C', '#DCC7A5', 84.4, .9, 16 / 9),
    'assets/more/more-7-exhibition-stall.svg': hz('#E8E2D4', '#8E8E8E', '#C8C2B6', 77.8, .9, 16 / 9),
    'assets/more/more-8-dispatch-van.svg': hz('#CFE0F8', '#8E8E8E', '#C8C2B6', 80, .9, 16 / 9),
    'assets/more/more-9-building-wrap.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 84.4, .9, 16 / 9),
    'assets/more/more-10-client-presentation.svg': hz('#EFE3CF', '#8E8E8E', '#C8C2B6', 84.4, .9, 16 / 9),
    'assets/more/more-1-hoarding-night.svg': hz('#0E1238', '#3A4090', '#262B6B', 84.4, .9, 16 / 9),
    'assets/more/more-2-neon-shop.svg': hz('#0E1238', '#3A4090', '#262B6B', 82.2, .9, 16 / 9),
    'assets/more/more-3-packaging-factory.svg': hz('#E8E2D4', '#8E8E8E', '#C8C2B6', 77.8, .9, 16 / 9),
    'assets/more/more-4-fabrication-workshop.svg': hz('#E8E2D4', '#8E8E8E', '#C8C2B6', 80, .9, 16 / 9),
    'assets/retail/retail-4-phone-store-night.svg': hz('#0E1238', '#3A4090', '#262B6B', 82.2, .9, 16 / 9),
    'assets/retail/retail-6-acp-installation.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 82.2, .9, 16 / 9),
    'assets/retail/retail-7-mall-kiosk.svg': hz('#EFE9DC', '#C9B28C', '#DCC7A5', 76.7, .9, 16 / 9),
    'assets/retail/retail-8-recce-to-installed.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 77.8, .9, 16 / 9),
    'assets/retail/retail-9-glazing-vinyl.svg': hz('#CFE0F8', '#C9B28C', '#DCC7A5', 86.2, .9, 16 / 9),
    'assets/storyboard/branding-ratio.svg': hz('#F2271A', '#F2271A', '#F2271A', 50, .1, 4 / 3),
  };
  const stageStyle = u => { const g = GRAD[u.split('?')[0]]; return g ? `--g:${g[0]};--m:${g[1]};background:var(--g)` : `background:${bgOf(u)}`; };
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const ALLP = 'ADVERTiSiNG · BRANDiNG · CREATiVE · DESiGNiNG · EXECUTiON';
  const retail = [
    ['retail-9-glazing-vinyl', 'Shopfront glazing & vinyl', 'glass graphics and display plinths'],
    ['retail-5-sign-system', 'Sign system', 'fascia, blade, totem and wall signs'],
    ['retail-3-cladding-fascia-detail', 'Cladding & fascia detail', 'panel joints, fixings and fascia sizes'],
    ['retail-8-recce-to-installed', 'Recce to installed', 'measured, clad and finished'],
    ['retail-6-acp-installation', 'ACP cladding installation', 'panels fixed to the sub-frame from a lift'],
    ['retail-7-mall-kiosk', 'Mall kiosk', 'ACP counter, fascia sign and phone cases'],
    ['retail-4-phone-store-night', 'Store at night', 'lit fascia and glazing after dark'],
    ['retail-10-rollout-grid', 'Modular rollout', 'one store kit for many shopfronts']
  ];
  window.__retail = retail;
  const slides = [
    { img:A('assets/covers/acp-brand-store.svg'), t:'ACP cladding signage & brand store branding', d:'fascia boxes, cladding, glazing & wall signs', tag:ALLP },
    { img:A('assets/covers/masterpiece-presentation.svg'), t:'360° mall branding', d:'fascias, banners, wayfinding & kiosk', tag:ALLP },
    ...retail.map(([f, t, d], i) => ({ img:A('assets/retail/' + f + '.svg'), t, d, tag:'MOBILE BRAND RETAIL · ' + pad(i + 1) })),
    { img:A('assets/covers/project-7-expo-pavilion.svg'), t:'360° expo pavilion', d:'pavilion build & illuminated signage', tag:'EXECUTiON' },
    { img:A('assets/archive/archive-3-golden-corridor.svg'), t:'Golden corridor', d:'vanishing point on the logo', tag:'ALL PILLARS' },
    { img:A('assets/more/more-1-hoarding-night.svg'), t:'Hoarding at night', d:'a lit billboard on two poles', tag:'ADVERTiSiNG' },
    { img:A('assets/more/more-2-neon-shop.svg'), t:'Neon shop', d:'neon signs on fascia, window and door', tag:'ADVERTiSiNG' },
    { img:A('assets/more/more-3-packaging-factory.svg'), t:'Packaging factory', d:'cartons on the line, folded and packed', tag:'DESiGNiNG' },
    { img:A('assets/more/more-4-fabrication-workshop.svg'), t:'Fabrication workshop', d:'ACP sheets cut on a CNC router', tag:'EXECUTiON' },
    { img:A('assets/archive/archive-1-mall-atrium.svg'), t:'Mall atrium', d:'hanging logo disc and window displays', tag:'MALL BRANDING' },
    { img:A('assets/archive/archive-2-expo-pavilion-day.svg'), t:'Expo pavilion, daylight', d:'pavilion with pennant bunting', tag:'EXECUTiON' },
    { img:A('assets/retail/retail-1-phone-store-front.svg'), t:'Mobile brand store front', d:'ACP cladding, fascia box and glazing', tag:'MOBILE BRAND RETAIL' },
    { img:A('assets/retail/retail-2-phone-store-interior.svg'), t:'Mobile store interior', d:'back-wall logo, phone walls and counter', tag:'MOBILE BRAND RETAIL' },
    { img:A('assets/more/more-5-boutique-window.svg'), t:'Boutique window display', d:'mannequins, shelves and hanging discs', tag:'ADVERTiSiNG' },
    { img:A('assets/more/more-6-design-studio-desk.svg'), t:'Design studio desk', d:'logo on screen, swatches and dieline', tag:'DESiGNiNG' },
    { img:A('assets/more/more-7-exhibition-stall.svg'), t:'Exhibition stall', d:'branded back wall, counter and standees', tag:'EXECUTiON' },
    { img:A('assets/more/more-8-dispatch-van.svg'), t:'Dispatch van', d:'finished boards loaded for delivery', tag:'EXECUTiON' },
    { img:A('assets/more/more-9-building-wrap.svg'), t:'Building wrap', d:'printed wrap fitted over a scaffold', tag:'ADVERTiSiNG' },
    { img:A('assets/more/more-10-client-presentation.svg'), t:'Client approval', d:'the design shown on screen before production', tag:'CREATiVE' }
  ];
  /* hover artworks: added after the first 26 slides */
  const HVT = [["Hoarding board", "ADVERTiSiNG"], ["Shop front", "BRANDiNG"], ["Retail kiosk", "EXECUTiON"], ["Packaging set", "DESiGNiNG"], ["Window display", "ADVERTiSiNG"], ["Neon sign", "CREATiVE"], ["Poster set", "CREATiVE"], ["Roll-up standees", "EXECUTiON"], ["Delivery van", "EXECUTiON"], ["Totem pylon", "BRANDiNG"], ["Wayfinding signs", "DESiGNiNG"], ["Expo stall", "EXECUTiON"], ["Studio desk", "DESiGNiNG"], ["Family at the store", "BRANDiNG"]];
  const HVC = "#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#2C3FD6#111110#F3F0E9#2C3FD6#14173F#262B6B#8DB8FF#F3F0E9#C0E5D3#F3F0E9#B8A4FF#F3F0E9#FFD0E2#F3F0E9#E8D5B5#D9A441#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#FF8A00#2231A8#2C3FD6#111110#F3F0E9#2C3FD6#14173F#262B6B#8DB8FF#F3F0E9#C0E5D3#F3F0E9#B8A4FF#F3F0E9#FFD0E2#F3F0E9#E8D5B5#D9A441#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#2C3FD6#111110#F3F0E9#2C3FD6#F3F0E9#2C3FD6#14173F#262B6B#8DB8FF#F3F0E9#C0E5D3#F3F0E9#B8A4FF#F3F0E9#FFD0E2#F3F0E9#E8D5B5#D9A441#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#2C3FD6#111110#F3F0E9#2C3FD6#14173F#262B6B#8DB8FF#F3F0E9#8DB8FF#F3F0E9#C0E5D3#F3F0E9#B8A4FF#F3F0E9#FFD0E2#F3F0E9#E8D5B5#D9A441#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#2C3FD6#111110#F3F0E9#2C3FD6#14173F#262B6B#8DB8FF#F3F0E9#C0E5D3#F3F0E9#B8A4FF#F3F0E9#B8A4FF#F3F0E9#FFD0E2#F3F0E9#E8D5B5#D9A441#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#2C3FD6#111110#F3F0E9#2C3FD6#14173F#262B6B#8DB8FF#F3F0E9#C0E5D3#F3F0E9#B8A4FF#F3F0E9#FFD0E2#F3F0E9#E8D5B5#D9A441#E8D5B5#D9A441#F3F0E9#DCC7A5#FFE600#2C3FD6#FF8A00#2231A8#2C3FD6#111110".match(/.{14}/g);
  [3, 6, 7, 9, 10, 13].forEach(n => { const c = HVC[n];
    const u = 'assets/hover/hv-' + String(n + 1).padStart(2, '0') + '.svg', w = c.slice(0, 7), fl = c.slice(7), t = HVT[n % HVT.length];
    BG[u] = w; GRAD[u] = hz(w, fl, fl, 81.1, .1, 16 / 9);
    slides.push({ img:A(u), t:t[0], d:'', tag:t[1] });
  });
  /* the identity, drawn out on its own: the minimal vector ratio file for the BRANDiNG pillar */
  slides.push({ img:A('assets/storyboard/branding-ratio.svg'), t:'Identity on the golden ratio',
    d:'the logo built square by square on the ratio', tag:'BRANDiNG' });
  const N = slides.length;
  track.innerHTML = slides.map((s, i) => `<div class="reel-slide" style="${stageStyle(s.img)}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${N}" aria-hidden="true"><img ${i < 2 ? 'src="' + s.img + '"' : 'data-src="' + s.img + '"'} alt="${esc(s.t + ' — ' + s.d)}" width="1600" height="900" decoding="async"></div>`).join('');
  thumbs.innerHTML = slides.map((s, i) => `<button type="button" data-i="${i}" aria-label="Show artwork ${i + 1}: ${esc(s.t)}"><img loading="lazy" decoding="async" src="${s.img}" alt="" style="background:${bgOf(s.img)}"></button>`).join('');
  const els = $$('.reel-slide', track), tb = $$('button', thumbs);
  const cap = $('#reelCap'), tag = $('#reelTag'), count = $('#reelCount');
  const load = i => { const im = $('img', els[(i + N) % N]); if (im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } };
  let cur = -1, elapsed = 0, paused = false, vis = true, hov = false;
  const D = 5200;
  const show = (i, user) => {
    i = (i + N) % N; if (i === cur) return; cur = i; elapsed = 0;
    els.forEach((e, k) => { e.classList.toggle('on', k === i); e.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
    tb.forEach((b, k) => { b.classList.toggle('on', k === i); b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    load(i); load(i + 1); load(i - 1);
    const s = slides[i];
    cap.innerHTML = '<b>' + esc(s.t) + '</b>' + (s.d ? ' &mdash; ' + esc(s.d) : ''); tag.textContent = s.tag;
    count.textContent = pad(i + 1) + ' / ' + pad(N);
    const b = tb[i]; thumbs.scrollTo({ left: b.offsetLeft - (thumbs.clientWidth - b.offsetWidth) / 2, behavior: reduce || !user ? 'auto' : 'smooth' });
  };
  const go = d => show(cur + d, true);
  $('#reelPrev').addEventListener('click', () => go(-1));
  $('#reelNext').addEventListener('click', () => go(1));
  thumbs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i, true); });
  stage.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); } });
  let sx = null;
  stage.addEventListener('pointerdown', e => { if (!e.target.closest('.reel-nav')) sx = e.clientX; });
  stage.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
  stage.addEventListener('pointercancel', () => { sx = null; });
  new IntersectionObserver(([en]) => { vis = en.isIntersecting; }, { threshold:.35 }).observe(stage);
  document.addEventListener('visibilitychange', () => { paused = document.hidden || saver; });
  const saver = !!(navigator.connection && navigator.connection.saveData);
  if (reduce || saver) { paused = true; bar.parentElement.hidden = true; }
  let last = performance.now();
  const tick = now => {
    const dt = now - last; last = now;
    if (!reduce && vis && !paused && !hov && !document.body.style.overflow && !stage.matches(':focus-within:focus-visible')) {
      elapsed += dt; if (elapsed >= D) go(1);
      bar.style.transform = 'scaleX(' + Math.min(elapsed / D, 1).toFixed(3) + ')';
    }
    requestAnimationFrame(tick);
  };
  show(0); requestAnimationFrame(tick);
})();

/* ---------------- contact form -> mailto ---------------- */
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#f-name').value.trim(), contact = $('#f-contact').value.trim(), note = $('#formNote');
  if (!name || !contact) { note.textContent = 'Please add your name and a way to reach you.'; return; }
  const body = `Name / company: ${name}\nContact: ${contact}\nNeed: ${$('#f-pillar').value}\n\nBrief:\n${$('#f-brief').value.trim()}`;
  note.textContent = 'Opening your email app with the brief ready to send…';
  location.href = `mailto:rjsarkar@icloud.com?subject=${encodeURIComponent('Project brief — ' + name)}&body=${encodeURIComponent(body)}`;
});

/* ---------------- scroll-linked: progress, parallax, word highlight ---------------- */
(() => {
  const bar = $('#progress'), fi = $('.feature .fi'), words = $$('.wd', statement || document.body);
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
    if (fi && !reduce) {
      const r = fi.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
      fi.style.setProperty('--py', (p * r.height * -.09).toFixed(1) + 'px');
    }
    if (words.length) {
      const r = statement.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * .82 - r.top) / (r.height + vh * .25)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < n));
    }
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive:true });
  addEventListener('resize', update); update();
})();

/* ---------------- magnetic buttons ---------------- */
if (fine && !reduce) $$('.btn, .nav-links a.cta').forEach(b => {
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px,${(e.clientY - r.top - r.height / 2) * .32}px)`; });
  b.addEventListener('pointerleave', () => b.style.transform = '');
});

/* ---------------- design overlays: grid (G) & baseline (B) ---------------- */
(() => {
  $('#gridlines .wrap').innerHTML = '<i></i>'.repeat(12);
  const map = { grid:'show-grid', base:'show-base' };
  const sync = () => $$('[data-toggle]').forEach(b => b.classList.toggle('on', root.classList.contains(map[b.dataset.toggle])));
  const toggle = k => { root.classList.toggle(map[k]); sync(); };
  $$('[data-toggle]').forEach(b => b.addEventListener('click', () => toggle(b.dataset.toggle)));
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.target.matches('input,textarea,select')) return;
    const k = e.key.toLowerCase();
    if (k === 'g') toggle('grid'); if (k === 'b') toggle('base');
  });
})();

/* ---------------- method lab ---------------- */
(() => {
  $('#gdCols').innerHTML = '<i></i>'.repeat(12);
  // isolation field
  $('#iso').innerHTML = Array.from({ length: 36 }, (_, i) => `<i${i === 21 ? ' class="x"' : ''}></i>`).join('');
  // live contrast
  const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4)); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };
  const grade = r => r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA large' : 'accent only';
  const PAPER = '#F3F0E9', INK = '#111110';
  const sw = [['Paper', PAPER, INK, 'on ink'], ['Ink', INK, PAPER, 'on paper'], ['Amber', '#FF8A00', INK, 'on ink'], ['Yellow', '#FFE600', INK, 'on ink'], ['Red', '#F2271A', INK, 'on ink']];
  $('#sws').innerHTML = sw.map(([n, hx, bg, ctx]) => { const r = ratio(hx, bg); return `<button class="sw2" data-hex="${hx}" data-cursor="Copy" title="Copy ${hx}"><i style="background:${hx}"></i><b>${n}</b>${hx}<br>${r.toFixed(1)}:1 ${grade(r)}</button>`; }).join('');
  $('#sws').addEventListener('click', e => { const b = e.target.closest('.sw2'); if (!b) return; navigator.clipboard && navigator.clipboard.writeText(b.dataset.hex); const o = b.innerHTML; const i = $('b', b); const t = i.textContent; i.textContent = 'Copied'; setTimeout(() => i.textContent = t, 1200); });
  const deep = '#B04C00';
  if ($('#deepNote')) $('#deepNote').innerHTML = `<b>On cream</b> the accent deepens to ${deep} &mdash; ${ratio(deep, PAPER).toFixed(1)}:1, ${grade(ratio(deep, PAPER))}.`;
  // composition overlay
  const gf = $('#goldFig');
  $('#goldSeg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; gf.dataset.mode = b.dataset.m; $$('#goldSeg button').forEach(x => x.classList.toggle('on', x === b)); });
})();

/* =========================================================
   PHASE 4 — brand ON in red · the fall · velocity · tilt
   ========================================================= */

/* brand wordmark: the final "ON" of ArtViSiON is always red */
(() => {
  const re = /ArtViSiON/;
  const skip = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'OPTION', 'TITLE', 'NOSCRIPT']);
  const wrap = node => {
    const w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, { acceptNode: n => (n.parentElement && !skip.has(n.parentElement.tagName) && re.test(n.nodeValue)) ? 1 : 2 });
    const list = []; while (w.nextNode()) list.push(w.currentNode);
    list.forEach(n => {
      const wrap = document.createElement('span'); wrap.className = 'bt';
      n.nodeValue.split('ArtViSiON').forEach((part, i, arr) => {
        wrap.appendChild(document.createTextNode(part));
        if (i < arr.length - 1) { wrap.appendChild(document.createTextNode('ArtViSi')); const s = document.createElement('span'); s.className = 'bon'; s.textContent = 'ON'; wrap.appendChild(s); }
      });
      n.replaceWith(wrap);
    });
  };
  wrap(document.body);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if (n.nodeType === 1) wrap(n); else if (n.nodeType === 3 && re.test(n.nodeValue) && n.parentElement) wrap(n.parentElement); }))).observe(document.body, { childList:true, subtree:true });
})();

/* the fall: scroll dives through the eye of the logo into the work */
(() => {
  const sec = $('#dive'); if (!sec) return;
  const pin = $('.dive-pin', sec), g = $('#diveG'), logo = $('#diveLogo'), media = $('#diveMedia');
  const ui = $('.dive-ui', sec), end = $('.dive-end', sec), scrim = $('.dive-scrim', sec);
  const capN = $('#diveN'), capT = $('#diveT'), warp = $('#warpMap');
  const LW = 990, LH = 580, Lc = [495, 290], O = [231.5, 253.5], RIN = 104.5;
  const shots = [['dive-1-acp-facade','ACP Cladding & Signage'],['dive-2-coffee','Kaffé Noir'],['dive-3-poster-wall','Forma & Grid'],['dive-4-botanical','Veda Botanicals'],['dive-5-book','Solstice'],['dive-6-social-grid','Aura Lifestyle'],['dive-7-mark-construction','Marks & Monograms'],['dive-8-brand-store','Brand Store Branding'],['dive-9-danglers','Event & POSM Kit']];
  const N = shots.length;
  media.innerHTML = shots.map(s => `<img src="${A('assets/dive/'+s[0]+'.svg')}" alt="" decoding="async">`).join('');
  const imgs = $$('img', media);
  if (reduce) sec.classList.add('static');

  let W = 0, H = 0, s0 = 1, sF = 8, cur = 0, tgt = 0, mx = 0, my = 0, tmx = 0, tmy = 0, idx = -1, auto = 0, vis = false, raf = 0;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const size = () => { W = pin.clientWidth; H = pin.clientHeight; s0 = Math.min(.9 * W / LW, .62 * H / LH); sF = Math.hypot(W, H) / 2 / RIN * 1.08; };
  const setIdx = i => { if (i === idx) return; idx = i; imgs.forEach((im, k) => im.classList.toggle('on', k === i)); capN.textContent = String(i + 1).padStart(2, '0'); capT.textContent = shots[i][1]; };
  const target = () => { const r = sec.getBoundingClientRect(), tot = sec.offsetHeight - pin.clientHeight; tgt = reduce || tot <= 0 ? 0 : clamp((-r.top / tot - .05) / .82); };
  const render = d => {
    const e = 1 - Math.pow(1 - cur, 2), s = s0 * Math.pow(sF / s0, cur), roll = 5 * Math.sin(Math.PI * cur);
    const k = Math.max(0, 1 - cur * 5), px = Lc[0] + (O[0] - Lc[0]) * e - mx * 16 * k, py = Lc[1] + (O[1] - Lc[1]) * e - my * 10 * k;
    g.setAttribute('transform', `translate(${W / 2} ${H / 2}) rotate(${roll.toFixed(2)}) scale(${s.toFixed(4)}) translate(${(-px).toFixed(2)} ${(-py).toFixed(2)})`);
    logo.style.opacity = 1 - ss(.1, .3, cur);
    const u = 1 - ss(0, .06, cur); ui.style.opacity = u; ui.style.transform = `translateY(${(1 - u) * -24}px)`;
    end.style.opacity = ss(.86, .98, cur); end.style.transform = `scale(${(.9 + .1 * ss(.84, 1, cur)).toFixed(3)})`;
    scrim.style.opacity = ss(.62, .95, cur);
    if (!reduce) {
      const v = Math.abs(d), wsc = Math.min(46, v * 900);
      if (wsc > 1.5) { media.style.filter = 'url(#warp)'; warp.setAttribute('scale', wsc.toFixed(1)); } else if (media.style.filter) media.style.filter = '';
    }
    setIdx((((auto + Math.floor(cur * 8.4)) % N) + N) % N);
  };
  const frame = () => {
    raf = 0; target();
    const d = tgt - cur; cur = Math.abs(d) < .0002 ? tgt : cur + d * .24;
    mx += (tmx - mx) * .06; my += (tmy - my) * .06;
    render(d);
    if (vis) raf = requestAnimationFrame(frame);
  };
  new IntersectionObserver(es => { vis = es[0].isIntersecting; root.classList.toggle('in-dive', vis); if (vis && !raf) raf = requestAnimationFrame(frame); }, { rootMargin:'200px 0px' }).observe(sec);
  if (!reduce) {
    setInterval(() => { if (vis && cur < .02) auto++; }, 2600);
    addEventListener('pointermove', e => { tmx = e.clientX / innerWidth - .5; tmy = e.clientY / innerHeight - .5; }, { passive:true });
  }
  addEventListener('resize', () => { size(); render(0); });
  size(); target(); cur = tgt; render(0);
})();

/* scroll velocity: cards skew, marquee surges */
(() => {
  if (reduce) return;
  let last = scrollY, sv = 0, shown = 0;
  const track = $('#marqueeTrack');
  const tick = () => {
    const y = scrollY, d = y - last; last = y;
    sv += (d - sv) * .1;
    const k = clamp2(sv / 70, -1, 1), sk = +(k * 2.6).toFixed(2);
    if (Math.abs(sk - shown) > .03 || (sk === 0 && shown !== 0)) { shown = sk; root.style.setProperty('--sk', sk + 'deg'); }
    if (track) { const a = track.getAnimations()[0]; if (a) a.playbackRate = 1 + Math.min(6, Math.abs(sv) / 10); }
    requestAnimationFrame(tick);
  };
  const clamp2 = (v, a, b) => Math.max(a, Math.min(b, v));
  requestAnimationFrame(tick);
})();

/* 3D tilt on work cards */
if (fine && !reduce) {
  let active = null;
  const reset = c => { if (c) { const p = c.querySelector('.ph'); if (p) p.style.transform = ''; } };
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card');
    if (c !== active) { reset(active); active = c; }
    if (!c) return;
    const p = c.querySelector('.ph'); if (!p) return;
    const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    p.style.transform = `perspective(1000px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) scale(1.015)`;
  }, { passive:true });
}

})();

/* ---------------- hover artworks ---------------- */
(() => {
  const HV = "acp-brand-store,masterpiece-presentation,project-1-branding,project-2-posters,project-3-packaging,project-4-editorial,project-5-social,project-6-logofolio,project-7-execution,project-7-expo-pavilion,project-8-print-posm,retail-1-phone-store-front,retail-10-rollout-grid,retail-2-phone-store-interior,retail-3-cladding-fascia-detail,retail-4-phone-store-night,retail-5-sign-system,retail-6-acp-installation,retail-7-mall-kiosk,retail-8-recce-to-installed,retail-9-glazing-vinyl,atoz-A-artworking,atoz-B-branding,atoz-C-creative,atoz-D-designing,atoz-E-execution,atoz-F-fabrication,atoz-G-graphic-design,atoz-H-hoarding,atoz-I-installation,atoz-J-job-production,atoz-K-kiosk,atoz-L-logo,atoz-M-mockup,atoz-N-neon,atoz-O-outdoor,atoz-P-packaging,atoz-Q-quality-control,atoz-R-recce,atoz-S-signage,atoz-T-typography,atoz-U-user-experience,atoz-V-visiting-card,atoz-W-window-display,atoz-X-experience-design,atoz-Y-yard,atoz-Z-zonal-branding,golden-keyvisual,scene-1-advertising,scene-2-branding,scene-3-creative,scene-4-design,scene-5-execution,dive-1-acp-facade,dive-2-coffee,dive-3-poster-wall,dive-4-botanical,dive-5-book,dive-6-social-grid,dive-7-mark-construction,dive-8-brand-store,dive-9-danglers,archive-1-mall-atrium,archive-2-expo-pavilion-day,archive-3-golden-corridor,more-1-hoarding-night,more-10-client-presentation,more-2-neon-shop,more-3-packaging-factory,more-4-fabrication-workshop,more-5-boutique-window,more-6-design-studio-desk,more-7-exhibition-stall,more-8-dispatch-van,more-9-building-wrap".split(',');
  const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const slots = [['.card .ph', 'img'], ['.az-img', 'img.on']];
  const keyOf = src => (src || '').split('?')[0].split('/').pop().replace(/\.svg$/, '');
  const url = box => {
    const im = box.querySelector(box._hs); if (!im) return '';
    const i = HV.indexOf(keyOf(im.currentSrc || im.src)); if (i < 0) return '';
    return 'url("' + A('assets/hover/hv-' + String(i % 14 + 1).padStart(2, '0') + '.svg') + '")';
  };
  const setOrigin = (box, xp, yp) => { box.style.setProperty('--hx', xp.toFixed(1) + '%'); box.style.setProperty('--hy', yp.toFixed(1) + '%'); };
  const pct = (box, e) => { const r = box.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100]; };
  const show = (b, xp, yp) => {
    let h = b._hv; if (!h) { h = b._hv = document.createElement('div'); h.className = 'hv'; h.setAttribute('aria-hidden', 'true'); b.appendChild(h); }
    const u = url(b); if (!u) return false; if (h._u !== u) { h.style.backgroundImage = u; h._u = u; }
    setOrigin(b, xp, yp); requestAnimationFrame(() => h.classList.add('on')); return true;
  };
  const hide = (b, xp, yp) => { setOrigin(b, xp, yp); if (b._hv) b._hv.classList.remove('on'); };
  if (FINE && !reduce) {   /* reduced motion: no animated overlay at all — SVG images can keep
                              animating in some browsers even when the OS pref is set */
    let cur = null;
    const find = t => { for (const [s, i] of slots) { const b = t.closest && t.closest(s); if (b) { b._hs = i; return b; } } return null; };
    document.addEventListener('pointerover', e => { const b = find(e.target); if (!b || b === cur) return; cur = b; const [x, y] = pct(b, e); show(b, x, y); });
    document.addEventListener('pointerout', e => { if (!cur || cur.contains(e.relatedTarget)) return; const [x, y] = pct(cur, e); hide(cur, x, y); cur = null; });
    return;
  }
  /* touch screens have no hover: the artworks peek by themselves, one at a time */
  if (reduce) return;
  const boxes = [...document.querySelectorAll('.card .ph, .az-img')];
  boxes.forEach(b => { b._hs = b.matches('.card .ph') ? 'img' : 'img.on'; });
  const seen = new Set(); let n = 0, busy = false;
  const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)), { threshold: .55 });
  boxes.forEach(b => io.observe(b));
  const sides = [[0, 50], [100, 50], [50, 0], [50, 100]];
  setInterval(() => {
    if (busy || document.hidden || !seen.size) return;
    const list = [...seen]; const b = list[n++ % list.length]; const [x, y] = sides[n % 4];
    busy = true; if (!show(b, x, y)) { busy = false; return; }
    setTimeout(() => { hide(b, 100 - x, 100 - y); setTimeout(() => { busy = false; }, 900); }, 1900);
  }, 2600);
})();
