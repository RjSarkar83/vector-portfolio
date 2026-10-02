/* asset resolver: lets the single-file build swap in embedded data-URIs; no-op on the normal build */
const A = p => { const u = (window.__ASSETS && window.__ASSETS[p]) || p; return /^assets\//.test(u) ? u + '?v=20261003f' : u; };  /* ?v= busts the browser cache when artwork changes */
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
  { id:1, title:'Kaffé Noir — End-to-End Brand & Packaging', sub:'Brand identity, master dielines, matte pouches & print production', cat:'BRANDiNG', year:'2026', scope:'Logo, brand identity & pouch production', tools:'CorelDRAW, Photoshop, Pre-Press', img:A('assets/covers/project-1-branding.svg'),
    challenge:'Creating a luxury specialty coffee brand identity that looks iconic on retail shelves and keeps foil and matte finishes consistent across multiple packaging SKUs.',
    solution:'Developed the complete brand identity, geometric emblem, custom packaging dielines and press-ready CMYK + spot UV separation files.', palette:['#181715','#EFECE6','#C4A47C','#4A3B32'] },
  { id:2, title:'Forma & Grid — Master Key Visuals & Posters', sub:'High-resolution typographic artwork & archival screen-print series', cat:'ADVERTiSiNG', year:'2026', scope:'Master artwork & large-format print', tools:'CorelDRAW, Illustrator', img:A('assets/covers/project-2-posters.svg'), art:'#2C3FD6', floor:true,
    challenge:'Designing bold architectural key visuals and collector posters that command attention from a distance while rewarding close-up inspection.',
    solution:'Constructed crisp vector artwork on a 12-column Swiss grid with spot-colour separations ready for large-format gallery printing.', palette:['#2C3FD6','#D9A441','#F2271A','#111110'] },
  { id:3, title:'Veda Botanicals — Luxury Packaging Architecture', sub:'Structural box dielines, gold foil stamping & apothecary labels', cat:'DESiGNiNG', year:'2026', scope:'Packaging design & structural dielines', tools:'CorelDRAW, Photoshop, 3D Mockup', img:A('assets/covers/project-3-packaging.svg'),
    challenge:'Crafting a tactile, shelf-ready cosmetic packaging system with embossing and hot-foil stamping specs that elevate perceived value.',
    solution:'Engineered custom carton dielines, blind-debossed botanical patterns and photorealistic 3D studio presentations before the mass print run.', palette:['#8A9A86','#F6F4EE','#8C5828','#232922'] },
  { id:4, title:'Solstice — Editorial Publication & Custom Illustration', sub:'120-page print book layout, vector artworks & pre-press spec', cat:'CREATiVE', year:'2025', scope:'Editorial artwork & print specification', tools:'CorelDRAW, Illustrator', img:A('assets/covers/project-4-editorial.svg'),
    challenge:'Producing a multi-signature hardcover publication that combines custom geometric artwork with complex typographic grids.',
    solution:'Delivered complete page layouts, bespoke vector illustrations and bleed/trim pre-press packages for offset printing.', palette:['#C85232','#E5A93C','#1B2A4A','#F7F4EB'] },
  { id:5, title:'Aura Lifestyle — 360° Digital & Launch Campaign', sub:'Creative direction, social carousel system & retail launch kit', cat:'CREATiVE', year:'2026', scope:'Creative campaign & digital rollout', tools:'Photoshop, CorelDRAW, Canva', img:A('assets/covers/project-5-social.svg'),
    challenge:'Aligning digital social campaigns with physical in-store launch displays for a cohesive omnichannel brand experience.',
    solution:'Built a modular creative campaign system spanning Instagram carousels, digital lookbooks and matching retail display graphics.', palette:['#253D2C','#E8E3D9','#D4C8B4','#121312'] },
  { id:6, title:'Marks, Monograms & Brand Symbols — Logofolio', sub:'Selected scalable brand marks & corporate identities', cat:'BRANDiNG', year:'2024–2026', scope:'Logo design & visual identity systems', tools:'CorelDRAW, Illustrator', img:A('assets/covers/project-6-logofolio.svg'),
    challenge:'Designing versatile brand marks that reproduce cleanly across small digital icons, embroidered apparel and 10-foot outdoor acrylic signage.',
    solution:'Engineered precision geometric logos with complete vector master files, grid construction guides and fabrication-ready outlines.', palette:['#141413','#8C8A84','#EAE6DF','#FAF9F6'] },
  { id:7, title:'360° Expo Pavilion & Retail Signage Rollout', sub:'Expo pavilion build, illuminated signage & on-ground installation', cat:'EXECUTiON', year:'2026', scope:'360° space design, signage & fabrication', tools:'CorelDRAW, Illustrator, 3D Mockup', img:A('assets/covers/project-7-execution.svg'),
    challenge:'Delivering a turnkey trade-show pavilion and retail branding kit where digital guidelines had to become physical architecture, backlit acrylic signage and large-format wall graphics.',
    solution:'Engineered full-scale structural production drawings, Pantone-matched environmental prints and supervised on-site fabrication for a flawless opening day.', palette:['#181817','#E6E2DA','#C98A4B','#3A3835'] },
  { id:8, title:'Corporate Event & POSM Production Kit', sub:'POSM counter display, standee, shelf wobblers, lanyards & event kit', cat:'EXECUTiON', year:'2026', scope:'Corporate branding & print execution', tools:'CorelDRAW, Illustrator, Print Production', img:A('assets/covers/project-8-print-posm.svg'),
    challenge:'Coordinating 25+ physical brand touchpoints — from rigid welcome kits and woven lanyards to acrylic wayfinding — under a tight event deadline.',
    solution:'Created unified master artwork templates, verified Pantone proofs across substrates and delivered A-to-Z print production.', palette:['#1F2421','#D8C9B8','#C84B31','#F4F1EA'] }
];

const pillars = [
  { key:'ADVERTiSiNG', letters:'H · N · O · S · W', img:A('assets/storyboard/scene-1-advertising.svg'), desc:'Hoardings, neon and outdoor media, signage systems and window displays that make a brand readable from the street.', del:['Hoardings','Neon & LED','Outdoor media','Signage','Window display'] },
  { key:'BRANDiNG', letters:'B · L · V · Z', img:A('assets/storyboard/scene-2-branding.svg'), desc:'Brand identity, logo systems, visiting cards and stationery, guidelines, and zonal rollouts that keep every location on-brand.', del:['Logo systems','Identity','Stationery','Zonal rollouts'] },
  { key:'CREATiVE', letters:'C · U · X', img:A('assets/storyboard/scene-3-creative.svg'), desc:'Campaign ideas, key visuals, user-experience flows and immersive experience design for retail, events and digital.', del:['Campaigns','Key visuals','UX flows','Experience design'] },
  { key:'DESiGNiNG', letters:'A · D · G · M · P · T', img:A('assets/storyboard/scene-4-design.svg'), desc:'Production artwork, graphic design, typography, packaging dielines and 3D mockup visualisation — vector-level precision in every file.', del:['Artworking','Graphic design','Typography','Packaging','3D mockups'] },
  { key:'EXECUTiON', letters:'E · F · I · J · K · Q · R · Y', img:A('assets/storyboard/scene-5-execution.svg'), desc:'Recce, fabrication, job production, kiosks, installation and quality control — design carried all the way to the site.', del:['Recce','Fabrication','Job production','Kiosks','Installation','Quality control'] }
];

const az = [
  ['A','ArtWORKing','DESiGNiNG','atoz-A-artworking','Production artwork built in CorelDRAW: CMYK files, vector clean-up, registration and print-ready master files.'],
  ['B','Branding','BRANDiNG','atoz-B-branding','Brand strategy, identity systems, stationery and the guidelines that hold a brand together.'],
  ['C','Creative','CREATiVE','atoz-C-creative','From idea to key visual: concepts, illustration and campaign creative with one clear focal point.'],
  ['D','Designing','DESiGNiNG','atoz-D-designing','Layouts, grids and construction drawings: design that fabricators can build without guessing.'],
  ['E','Execution','EXECUTiON','atoz-E-execution','Turnkey execution and on-site supervision, measured, levelled and handed over finished.'],
  ['F','Fabrication','EXECUTiON','atoz-F-fabrication','CNC and laser-ready DXF files, fabrication drawings and vendor coordination.'],
  ['G','Graphic Design','DESiGNiNG','atoz-G-graphic-design','Colour systems, print collateral, brochures and catalogues with a clear hierarchy.'],
  ['H','Hoarding','ADVERTiSiNG','atoz-H-hoarding','City-scale hoardings and billboards designed to read from the road.'],
  ['I','Installation','EXECUTiON','atoz-I-installation','Facade signage, 3D letters and panels installed safely and exactly to the drawing.'],
  ['J','Job Production','EXECUTiON','atoz-J-job-production','Wide-format printing and production runs, tracked on a job ticket at every stage from proof to packed delivery.'],
  ['K','Kiosk','EXECUTiON','atoz-K-kiosk','Retail kiosks, counters and activation units: structure, branding and build.'],
  ['L','Logo','BRANDiNG','atoz-L-logo','Logo design and redesign, constructed on geometry and tested at every size.'],
  ['M','Mockup','DESiGNiNG','atoz-M-mockup','Flat artwork turned into a 3D mockup of the shopfront, pack or product, shown to the client before anything is made.'],
  ['N','Neon','ADVERTiSiNG','atoz-N-neon','Neon and LED-neon signs on a backing board with the transformer, built to glow at night and look good by day.'],
  ['O','Outdoor','ADVERTiSiNG','atoz-O-outdoor','Bus shelters, unipoles and street media planned for visibility and permissions.'],
  ['P','Packaging','DESiGNiNG','atoz-P-packaging','Dielines, boxes, pouches and labels delivered with finish specs, not just a render.'],
  ['Q','Quality Control','EXECUTiON','atoz-Q-quality-control','CMYK proofs, colour checks and QA checklists before anything ships.'],
  ['R','Recce','EXECUTiON','atoz-R-recce','Site survey and measurement, so every sign and display fits the real wall.'],
  ['S','Signage','ADVERTiSiNG','atoz-S-signage','Signage systems and wayfinding: fascia, blade, directional and safety signs.'],
  ['T','Typography','DESiGNiNG','atoz-T-typography','Type systems with a clear scale, leading and kerning, set on a baseline grid.'],
  ['U','User Experience','CREATiVE','atoz-U-user-experience','Interface flows, wireframes and web assets that are easy to use.'],
  ['V','Visiting Card','BRANDiNG','atoz-V-visiting-card','Visiting cards and stationery: the first impression, held in the hand.'],
  ['W','Window Display','ADVERTiSiNG','atoz-W-window-display','Window displays and in-shop visual merchandising that stop the walk.'],
  ['X','X-Perience Design','CREATiVE','atoz-X-experience-design','Walk-through event and exhibition experiences: photo-op arches, interactive floors and lighting.'],
  ['Y','Yard','EXECUTiON','atoz-Y-yard','Fabrication yard coordination: materials, sheets and dispatch managed.'],
  ['Z','Zonal Branding','BRANDiNG','atoz-Z-zonal-branding','Zone-by-zone brand rollouts across cities, with pan-India vendor network.']
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
  <article class="panel${i === 0 ? ' on' : ''}" tabindex="0" role="button" aria-expanded="${i === 0}">
    <img src="${p.img}" alt="" loading="lazy" decoding="async">
    <span class="num">${pad(i + 1)}</span>
    <span class="vt">${p.key}</span>
    <div class="body">
      <h3>${p.key}</h3>
      <p>${p.desc}</p>
      <div class="del">${p.del.map(d => `<span>${d}</span>`).join('')}</div>
      <div class="lt">${p.letters}</div>
    </div>
  </article>`).join('');
const panels = $$('.panel', acc);
const setPanel = el => panels.forEach(p => { const on = p === el; p.classList.toggle('on', on); p.setAttribute('aria-expanded', on); });
panels.forEach(p => {
  p.addEventListener('click', () => setPanel(p));
  p.addEventListener('focus', () => setPanel(p));
  if (fine) p.addEventListener('mouseenter', () => setPanel(p));
  p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPanel(p); } });
});

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
  $('#deepNote').innerHTML = `<b>On cream</b> the accent deepens to ${deep} &mdash; ${ratio(deep, PAPER).toFixed(1)}:1, ${grade(ratio(deep, PAPER))}.`;
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
