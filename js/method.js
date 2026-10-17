/* ArtViSiON — chapter 05, Method.
   1. The fourteen chapter tabs: click, keyboard, deep link, prev/next steps.
   2. The retail-branding band: two shopfront lines running in opposite
      directions, draggable, surging with the page scroll, static on
      reduced-motion / reduced-data.                                    */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const rdata = matchMedia('(prefers-reduced-data: reduce)').matches;
/* same asset resolver as app.js — lets the single-file build swap in data URIs */
const A = p => { const u = (window.__ASSETS && window.__ASSETS[p]) || p; return /^assets\//.test(u) ? u + '?v=20261005retail1' : u; };

/* ================================================================= 1. tabs */
(() => {
  const list = $('#tabs');
  const tabs = $$('#tabs .tab');
  if (!list || !tabs.length) return;
  const panels = tabs.map(t => document.getElementById(t.dataset.t));
  const wrap = list.closest('.tabs-wrap');
  const hint = $('.tabs-hint');
  const total = tabs.length;

  const countOf = i => { const c = $('i', tabs[i]); return c ? c.textContent.trim() : ''; };
  const labelOf = i => tabs[i].textContent.replace(/\s+/g, ' ').trim().replace(/\s*\d+\s*$/, '');

  /* the hint line doubles as a position readout */
  const setHint = i => {
    if (!hint) return;
    hint.innerHTML = 'Showing <b>' + labelOf(i) + '</b> &middot; ' + countOf(i) +
      ' rules &middot; ' + total + ' chapters in all';
  };

  /* keep the active tab inside the row without moving the page */
  const reveal = i => {
    const t = tabs[i], r = t.getBoundingClientRect(), l = list.getBoundingClientRect();
    if (r.left < l.left + 8) list.scrollLeft -= (l.left + 8 - r.left);
    else if (r.right > l.right - 8) list.scrollLeft += (r.right - l.right + 8);
  };

  /* edge fades appear only while the row can actually scroll */
  const fades = () => {
    if (!wrap) return;
    wrap.classList.toggle('can-l', list.scrollLeft > 4);
    wrap.classList.toggle('can-r', list.scrollLeft + list.clientWidth < list.scrollWidth - 4);
  };
  list.addEventListener('scroll', fades, { passive: true });
  addEventListener('resize', fades, { passive: true });

  const show = (i, opts = {}) => {
    if (i < 0 || i >= total) return;
    tabs.forEach((t, k) => {
      const on = k === i, p = panels[k];
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      t.setAttribute('aria-controls', t.dataset.t);
      if (p) { p.hidden = !on; p.classList.toggle('on', on); }
    });
    setHint(i);
    if (opts.focus) tabs[i].focus();
    if (opts.scroll !== false) reveal(i);
    requestAnimationFrame(fades);
    if (opts.url !== false) { try { history.replaceState(null, '', '#' + tabs[i].dataset.t); } catch (e) {} }
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    /* tabs must not re-trigger the anchor handler in app.js */
    t.addEventListener('keydown', e => {
      let n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % total;
      else if (e.key === 'ArrowLeft') n = (i - 1 + total) % total;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = total - 1;
      if (n === null) return;
      e.preventDefault();
      show(n, { focus: true });
    });
  });

  /* previous / next chapter buttons at the foot of every panel */
  const navH = ($('.nav') ? $('.nav').offsetHeight : 64) + 20;
  $$('.tstep').forEach(b => b.addEventListener('click', () => {
    const k = tabs.findIndex(t => t.dataset.t === b.dataset.t);
    if (k < 0) return;
    show(k);
    const p = panels[k];
    if (!p) return;
    const top = p.getBoundingClientRect().top + scrollY - navH - 12;
    scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* deep link: …/index.html#t-art opens the art-theory chapter */
  const fromHash = tabs.findIndex(t => '#' + t.dataset.t === location.hash);
  const first = tabs.findIndex(t => t.classList.contains('on'));
  show(fromHash > -1 ? fromHash : (first > -1 ? first : 0), { url: false });
  addEventListener('hashchange', () => {
    const k = tabs.findIndex(t => '#' + t.dataset.t === location.hash);
    if (k > -1) show(k);
  });
})();

/* ================================================================== 2. band */
/* Two lines of shopfronts, opposite directions, draggable. Click any shopfront
   and the artwork opens at full size with its philosophy, theory, rules,
   build spec and fitting sequence. */
(() => {
  const wrap = $('#brandwall');
  const stage = $('#bwStage');
  if (!wrap || !stage) return;

  /* order matches assets/brands/bw-01 … bw-24 */
  const SHOPS = [
    { n:'Nokia', t:'Mobile brand store \u00b7 fascia box, cladding, phone wall',
      intro:'A deep blue clad fascia you can read from the far end of the mall corridor. Behind the glass, the phone wall does the arguing.',
      phil:'The name is the promise. Everything behind the glass is the proof.',
      theory:'One blue, one yellow-white, one type family \u2014 held for two decades so a corner shop can afford the same face as a flagship.',
      r:['Fascia letters sized for 20 m, not for the laptop.','Logo centred on the sign box, never on a cladding joint.','Strip light sits outside the reflection line of the glazing.','Glazing film stops at 900 mm; above that, clear glass.'],
      s:[['Fascia','14\u2032 \u00d7 2\u20326\u2033 ACP sign box, 3 mm skin'],['Cladding','ACP on MS sub-frame, 8 mm joints on grid'],['Glazing','12 mm toughened, film to 900 mm'],['Interior','Phone wall, back-wall logo, counter, poster set'],['Lighting','LED modules at 120 lm/W, driver loaded to 80 %'],['Fixing','Rivets to sub-frame \u2014 nothing through the printed face']] },
    { n:'Microsoft', t:'Software store-in-store \u00b7 backlit sign box',
      intro:'A dark fascia with a bright four-square mark: the only saturated colour in the elevation, and the only thing that has to be right.',
      phil:'Four squares, four colours, no gradients \u2014 a mark that survives being printed 60 mm wide.',
      theory:'On a dark ground the logo carries the contrast; the wordmark stays quiet in regular weight beside it.',
      r:['Mark kept square \u2014 never stretched to fill the fascia.','Product tiles lit from below so screens read as screens.','Back-wall name repeated inside, one step smaller.','White balance checked on site: the mark must stay neutral.'],
      s:[['Fascia','13\u2032 \u00d7 2\u20326\u2033 ACP box, matte black skin'],['Cladding','ACP panels, concealed joints on the grid'],['Glazing','Clear toughened, frameless butt joints'],['Interior','Device wall, demo counter, back-wall logo'],['Lighting','Edge-lit box, 6500 K, no hot spots'],['Fixing','Sub-frame anchored to slab; panels riveted from behind']] },
    { n:'Sony', t:'Electronics store \u00b7 night storefront',
      intro:'Black fascia, white letters, tungsten interiors: the shop is designed to be seen at nine at night, not at noon.',
      phil:'One black, one white, one warm interior \u2014 the contrast is the sign.',
      theory:'A dark ground makes a thin wordmark read like a light box without adding light.',
      r:['Wide letter-spacing on the wordmark; never letterspaced twice.','Interior colour temperature held near 3000 K.','Product shelves glow, the ceiling does not.','Black skin matte \u2014 gloss would mirror the street.'],
      s:[['Fascia','13\u2032 \u00d7 2\u20326\u2033 ACP box, matte black'],['Cladding','Dark ACP on MS frame'],['Glazing','Clear toughened, black mullions'],['Interior','Product shelves, wall TVs, rear logo'],['Lighting','Warm interior plus a cool shelf wash'],['Fixing','Concealed fixings; returns folded, not cut']] },
    { n:'Samsung', t:'Mobile brand store \u00b7 glass doors and cladding',
      intro:'A full blue fascia over a wide glass line: the shop reads as one blue band with the product wall floating inside it.',
      phil:'Blue is the wall; the product is the picture hanging on it.',
      theory:'Colour on the fascia, glass below, no third element to dilute it.',
      r:['Fascia colour matched to the Pantone on a 1:1 sample strip.','Mullion centred on the door joint only.','Product grid on a 40 mm module.','Night shot taken before handover and compared with the mockup.'],
      s:[['Fascia','16\u2032 \u00d7 3\u2032 ACP sign box, blue skin'],['Cladding','ACP return to the side wall, level datum shared'],['Glazing','12 mm toughened with a central door mullion'],['Interior','Device wall, back-wall logo, cash counter'],['Lighting','Backlit box plus interior LED panels'],['Fixing','Chemical anchors in the slab, rivets on the frame']] },
    { n:'Xiaomi', t:'Mobile brand store \u00b7 orange fascia at night',
      intro:'Black cladding, orange block mark, warm interior: the store stays legible when every other shop on the row has closed.',
      phil:'Orange is a signal, not a decoration \u2014 it appears once, on the fascia.',
      theory:'A saturated block against near-black reads at speed, from a moving car.',
      r:['Block mark square; corner radius equal on all four sides.','Interior left warm on purpose \u2014 closed, but alive.','Cladding joints kept off the logo centre line.','No second orange anywhere in the elevation.'],
      s:[['Fascia','14\u2032 \u00d7 2\u20326\u2033 ACP box, black with orange mark'],['Cladding','Black ACP, 8 mm shadow joints'],['Glazing','Toughened clear, slim mullions'],['Interior','Device wall, accessory shelves, counter LED'],['Lighting','Warm interior wash retained after hours'],['Fixing','Rivets on frame; edge returns folded']] },
    { n:'OPPO', t:'Mobile brand store \u00b7 green identity',
      intro:'Green fascia, green wall band, green counter block: a single colour used at three intensities so the shop reads as one object.',
      phil:'One colour, three weights \u2014 recognise the brand before you read the name.',
      theory:'Tint the fascia, band the wall, spot the counter; the eye assembles a system from repetition.',
      r:['Green matched on the real cladding material, not on screen.','Wall band aligned to the fascia centre line.','Counter block in solid green, never tinted.','Glazing kept clear to let the green band read through.'],
      s:[['Fascia','13\u2032 \u00d7 2\u20326\u2033 ACP box, green skin'],['Cladding','ACP with the green band as a separate panel run'],['Glazing','Clear toughened, anodised mullions'],['Interior','Device wall, poster set, cash counter'],['Lighting','Interior panels plus a fascia edge glow'],['Fixing','Sub-frame first, panels hung and levelled']] },
    { n:'realme', t:'Mobile brand store \u00b7 yellow fascia',
      intro:'A yellow sign box with black type: the brightest fascia on the row, and the cheapest thing in the shop to keep clean.',
      phil:'Colour is borrowed from the brand, size is borrowed from the street.',
      theory:'Yellow forces black type \u2014 contrast decides the pairing, not taste.',
      r:['Black type on yellow only; never white on this yellow.','Fascia box deeper than the cladding so it throws a shadow.','Interior posters kept to one accent colour.','Side elevation repeats the fascia at half height.'],
      s:[['Fascia','13\u2032 \u00d7 2\u20326\u2033 ACP box, yellow skin'],['Cladding','Cream ACP, joints on the grid'],['Glazing','Clear toughened with corner siliconed'],['Interior','Device wall, posters, counter block'],['Lighting','Even interior wash, minimal fascia glare'],['Fixing','VHB tape and silicone on glass; rivets on panel']] },
    { n:'Intel', t:'Electronics counter \u00b7 instore branding',
      intro:'Not a shopfront but a system inside one: counter block, standee, wall decal and a shelf-edge run for the badge.',
      phil:'A component brand does not need a shop; it needs real estate on somebody else\u2019s counter.',
      theory:'The mark goes where the decision is made \u2014 at the shelf, at eye height, at the price strip.',
      r:['Counter block sized to the badge, not to the counter.','Standee placed at the till, facing the queue.','Shelf talkers aligned to product fronts.','Every placement 1:1 proofed before release.'],
      s:[['Counter','Branded block on the counter, satin laminate'],['Standee','Roll-up banner, 1:1 artwork proofed'],['Wall','Vinyl wall decal, cast film for curves'],['Shelf','Shelf talkers and price strips'],['Print','UV flatbed on rigid board, CMYK'],['Fixing','No fixing through any printed face']] },
    { n:'SBI', t:'Bank branch \u00b7 fascia, ATM shroud, wayfinding',
      intro:'A navy fascia over a glass line, with the token machine, queue rail and ATM shroud all speaking the same blue.',
      phil:'Trust is a colour held steady for fifty years and applied to a hundred squares a year.',
      theory:'Institutional type is small, letterspaced and never clever \u2014 the wayfinding is the design.',
      r:['Logo disc and wordmark locked together; never separate them.','ATM shroud carries the mark plus one line of type only.','Queue rail set at 900 mm; token machine on the left.','Rates board kept out of the fascia line of sight.'],
      s:[['Fascia','18\u2032 \u00d7 3\u2032 sign box with logo disc and ATM panel'],['Cladding','ACP with a transom band across the glazing'],['Glazing','Toughened, teller glass inside'],['Interior','Teller counters, token machine, queue rail, ATM'],['Lighting','Even interior panels, backlit fascia letters'],['Fixing','Sub-frame to slab; letters studded, never glued']] },
    { n:'AU Bank', t:'Bank branch \u00b7 plum fascia, orange mark',
      intro:'Plum cladding with an orange disc: a small bank buying recognition with one strong pairing instead of a big fascia.',
      phil:'A small brand buys memory with repetition, not with size.',
      theory:'Two colours, far apart on the wheel, used in a fixed ratio: 90 % plum, 10 % orange.',
      r:['Orange used once \u2014 on the disc. Everything else is plum.','Disc size fixed; it does not scale with the fascia.','Three-line lockup kept inside the box, never clipped.','Interior signage repeated in the same ratio.'],
      s:[['Fascia','16\u2032 \u00d7 3\u2032 ACP box, plum skin'],['Cladding','Plum ACP, orange accent band at the transom'],['Glazing','Clear toughened, printed rate panels'],['Interior','Teller row, counters, poster board'],['Lighting','Warm interior, cool fascia'],['Fixing','Rivets on the sub-frame, sealed returns']] },
    { n:'TATA Indicash', t:'Payments branch \u00b7 cladding and cash counter',
      intro:'Navy cladding with an orange italic lockup: the branch has to look like a bank and work like a service counter.',
      phil:'A service point is judged by how fast the queue moves, not by how the fascia looks.',
      theory:'Two-entry counter layout, one poster wall, and a fascia that signals the category in one glance.',
      r:['Counter height 900 mm with a knee recess.','Poster wall behind the customer, not behind the staff.','Fascia letters daylight-legible; no thin scripts.','Cash counter sightline kept clear of the glare.'],
      s:[['Fascia','16\u2032 \u00d7 3\u2032 ACP box with italic wordmark'],['Cladding','Navy ACP, joint pattern aligned to the doors'],['Glazing','Toughened with a service hatch cut'],['Interior','Cash counters, poster wall, token machine'],['Lighting','Counter downlights plus a fascia wash'],['Fixing','Frame-in-frame fixings; no through-fixing on the face']] },
    { n:'Philips', t:'Electronics store \u00b7 blue fascia and wall signs',
      intro:'Blue fascia, shield mark, and a wall-sign run that carries the same blue past the shopfront into the aisles.',
      phil:'A health and electronics brand lives on the wall sign \u2014 the fascia only introduces it.',
      theory:'One mark, one blue, repeated at every decision point: entrance, aisle, shelf.',
      r:['Shield reproduced 1:1 from the master file, never redrawn.','Wall signs at eye height, right of the entrance.','Blue used at 100 %; tints only in illustrations.','Shelf-edge branding ends where the next brand begins.'],
      s:[['Fascia','14\u2032 \u00d7 2\u20326\u2033 ACP box, blue with shield'],['Cladding','ACP with a wall-sign run'],['Glazing','Clear toughened with printed health graphics'],['Interior','Display wall, service counter, aisle signs'],['Lighting','Backlit box with an even diffuser'],['Fixing','Studded acrylic letters; panels riveted to frame']] },
    { n:'Havells', t:'Electrical goods shop \u00b7 rack branding',
      intro:'A red fascia over pale racking: the brand lives on the shelf edge, where the electrician actually decides.',
      phil:'Trade branding is won at the shelf edge, not on the fascia.',
      theory:'Shelf talkers, price rails and a repeated red block make the range findable in three seconds.',
      r:['Shelf strip light above every run; nothing in the shadow.','Price rail in brand red, aligned to the shelf front.','Product grouped by family, never by size.','Back wall carries the name once, at the top.'],
      s:[['Rack','Powder-coated gondola, 3 shelf runs'],['Shelf','Shelf talkers, price rails, strip lighting'],['Fascia','14\u2032 \u00d7 2\u20326\u2033 ACP box, red'],['Interior','Rack walls, counter, back-wall logo'],['Lighting','LED strips above every shelf line'],['Fixing','Brackets to the wall, no freestanding display']] },
    { n:'KEI', t:'Wires and cables \u00b7 display counter shop',
      intro:'A blue fascia with a black italic wordmark, over a shop whose product is heavy, coiled and stacked.',
      phil:'Heavy product needs a light drawing: show the coil, price the drum, keep the floor clear.',
      theory:'Category colour on the fascia, product photography behind it, nothing else competing.',
      r:['Coil wall stacked by size, labels facing out.','Counter set square to the door so the queue never blocks it.','Standee at the entrance, right-hand side.','Weight checked before fixing anything to a display wall.'],
      s:[['Fascia','13\u2032 \u00d7 2\u20326\u2033 ACP box, blue with italic wordmark'],['Cladding','ACP with a lit counter fascia'],['Glazing','Clear toughened, sliding entry'],['Interior','Coil wall, display counter, standee'],['Lighting','Cool interior wash, 4000 K'],['Fixing','Load-bearing brackets; product weight calculated first']] },
    { n:'Hair', t:'Unisex salon \u00b7 fascia and vitrine',
      intro:'Black fascia, warm interior, mirrors on the back wall: the front elevation is a window into the room you are buying.',
      phil:'A salon sells a room, so the room has to be visible from the pavement.',
      theory:'Warm interior light against a black fascia \u2014 the shop becomes the display.',
      r:['Mirror wall kept at 1.2 m centres, lit from both sides.','Interior warm at 3000 K; the fascia stays neutral.','Vitrine kept clear \u2014 no posters at eye height.','Chair layout planned before the mirror run is fixed.'],
      s:[['Fascia','12\u2032 \u00d7 2\u2032 ACP box, matte black'],['Cladding','Reclaimed-look panel, warm neutral'],['Glazing','Clear toughened, one full-height pane'],['Interior','Mirror run, chairs, dryer points, wash counter'],['Lighting','Warm interior plus mirror-side lights'],['Fixing','Concealed brackets; nothing visible from outside']] },
    { n:'Pepsi', t:'Sign box storefront \u00b7 cooler wall',
      intro:'Navy fascia, roundel, and a wall of cold cabinets: the product is the advertising, backlit from inside.',
      phil:'When the product is bright, the shop should be quiet.',
      theory:'Navy grounds the roundel; the coolers supply the only warm light in the elevation.',
      r:['Roundel reproduced on the master proportions, never squashed.','Cooler glass kept free of decals above shelf three.','Fascia box lit evenly; no visible diode dots.','Door handles at 900 mm, aligned across the run.'],
      s:[['Fascia','15\u2032 \u00d7 2\u20326\u2033 ACP box, navy with roundel'],['Cladding','ACP surround, return to the side wall'],['Glazing','Clear toughened, aluminium framing'],['Interior','Cooler wall, shelf runs, counter'],['Lighting','Internal cooler lights plus backlit fascia'],['Fixing','Coolers levelled on a plinth; fascia on sub-frame']] },
    { n:'Mountain Dew', t:'Beverage storefront \u00b7 brand wall',
      intro:'A green fascia with a lime splash, over a wall of cans arranged so the colour repeats from shelf to sign.',
      phil:'One shape, one colour, repeated until it becomes the shop.',
      theory:'The splash sits on the fascia; the shelf repeats the green at four heights.',
      r:['Splash mark used once at full size; shelf repeats at small.','Can wall colour-blocked, never scattered.','Shelf rail in lime; everything else green.','Freezer doors on a 600 mm module.'],
      s:[['Fascia','15\u2032 \u00d7 2\u20326\u2033 ACP box, green with splash mark'],['Cladding','Green ACP band over a neutral surround'],['Glazing','Clear toughened with a decal band'],['Interior','Can wall, shelf runs, chiller, counter'],['Lighting','Fascia box plus interior shelf strips'],['Fixing','Frame fixings; decals applied to a cleaned face']] },
    { n:'SOM', t:'Distillery outlet \u00b7 dark cladding',
      intro:'Black cladding, gold line-work, low lighting: the shopfront is deliberately dark so the bottles glow.',
      phil:'Darkness is a material. Use it and the product becomes the light.',
      theory:'Gold on black, warm lamps, and shelves that recede \u2014 nothing competes with the bottle.',
      r:['Shelves lit individually; the ceiling stays dim.','Gold used for line-work only, never for fills.','Bottles backlit at the label height.','Counter in dark timber, no gloss.'],
      s:[['Fascia','13\u2032 \u00d7 2\u20326\u2033 ACP box, black with gold line-work'],['Cladding','Dark ACP, matte, concealed joints'],['Glazing','Tinted toughened, bronze mullions'],['Interior','Bottle shelves, barrel plinth, tasting counter'],['Lighting','Shelf-level warm lamps, low ambient'],['Fixing','Concealed brackets; gold trim as an applied profile']] },
    { n:'Castrol', t:'Lubricant shop \u00b7 fascia and window decal',
      intro:'A green fascia, a red lozenge, and a window that carries the same red as a price flash.',
      phil:'Two colours doing two jobs: green for the name, red for the offer.',
      theory:'The wordmark holds the fascia; the offer is temporary and allowed to shout.',
      r:['Offer sticker replaced quarterly; never printed on the fascia.','Lozenge reproduced on master proportions.','Shelf rails in green, price flashes in red.','Floor kept clear for the drum stack.'],
      s:[['Fascia','15\u2032 \u00d7 2\u20326\u2033 ACP box, green with red lozenge'],['Cladding','Green ACP with a service band'],['Glazing','Clear toughened with a printed decal'],['Interior','Shelf runs, drum stack, service counter'],['Lighting','Cool interior plus a fascia edge glow'],['Fixing','Sub-frame with a gasket under every panel']] },
    { n:'TVS Tyres', t:'Tyre service shop \u00b7 fascia and totem',
      intro:'A blue fascia, a roundel, and a bay that has to stay legible with a truck parked in front of it.',
      phil:'Service branding has to survive dirt, glare and a vehicle blocking half the sign.',
      theory:'Bold mark, short name, high fascia \u2014 the message is read at a glance from the road.',
      r:['Fascia set above the bay opening, clear of the vehicle line.','Totem positioned at the entry turn, not on the footpath.','Poster set inside, at customer eye height.','Consumables labelled by size, facing out.'],
      s:[['Fascia','16\u2032 \u00d7 3\u2032 ACP box, blue with roundel'],['Cladding','ACP around the bay opening, angle-cut returns'],['Glazing','Toughened clear, wire-mesh lower panels'],['Interior','Tyre wall, service counter, poster set'],['Lighting','High-bay lighting plus a lit fascia'],['Fixing','Heavy-duty anchors; bay opening framed in MS']] },
    { n:'Pantaloons', t:'Fashion store \u00b7 mall elevation and vitrine',
      intro:'A teal fascia across a wide mall front, with three mannequins and a glass line that never breaks.',
      phil:'Retail fashion sells the outfit, not the shop \u2014 so the elevation stays a frame.',
      theory:'One fascia colour, one glazed line, and a window that changes every three weeks.',
      r:['Glass line unbroken; mullions on a single grid.','Mannequins lit at 30\u00b0 from above and left.','Fascia name repeated on the interior back wall.','Window scheme planned before the rail layout.'],
      s:[['Fascia','20\u2032 \u00d7 3\u2032 ACP box, teal with a light tagline'],['Cladding','ACP returns, joint pattern on the mall grid'],['Glazing','12 mm toughened, slim mullions, glass doors'],['Interior','Mannequin plinth, rails, fold tables, counter'],['Lighting','Track spots on the window, wash on the walls'],['Fixing','Mall-approved anchor method; no drilling after hours']] },
    { n:'American Eagle', t:'Fashion store \u00b7 sign box and window',
      intro:'Black fascia, white eagle, and a window of hung garments that reads as a striped pattern from the corridor.',
      phil:'A symbol does the work; the type is only there to confirm it.',
      theory:'Escaped symbols read quicker than wordmarks \u2014 hang the product to echo the mark.',
      r:['Eagle mark kept at the brand proportion, never redrawn.','Garments hung at even centres, labels hidden.','Window glass kept free of decals.','Fascia letterspacing fixed; never stretched to fit.'],
      s:[['Fascia','14\u2032 \u00d7 2\u20326\u2033 ACP box, black with mark'],['Cladding','Black ACP, matte, concealed joints'],['Glazing','Clear toughened, frameless where allowed'],['Interior','Hang rail, fold table, mannequins, counter'],['Lighting','Neutral 4000 K; no colour drift on denim'],['Fixing','Concealed brackets; glass clamped, not drilled']] },
    { n:'Van Heusen', t:'Formalwear store \u00b7 clad fascia and glass line',
      intro:'Charcoal fascia with a thin white monogram: the shop keeps the tailoring language and drops the noise.',
      phil:'Formalwear is bought on restraint \u2014 the elevation should behave like the garment.',
      theory:'Serif wordmark, wide tracking, muted ground: the storefront equivalent of a good suit.',
      r:['Serif wordmark letterspaced once, never bolder.','Window kept to two garments, both pressed.','Interior signage in the same muted palette.','Monogram used small, on glass, in white.'],
      s:[['Fascia','14\u2032 \u00d7 2\u20326\u2033 ACP box, charcoal with white wordmark'],['Cladding','ACP with a stone-texture band at the sill'],['Glazing','Clear toughened, slim dark mullions'],['Interior','Hang rails, fold tables, mirror, counter'],['Lighting','Warm 3000 K with narrow-beam window spots'],['Fixing','Concealed fixings; sill band as an applied profile']] },
    { n:'ISKCON', t:'Temple front \u00b7 cladding and welcome arch',
      intro:'Maroon cladding, a gold lotus and a warm interior: an institution that has to read as both a brand and a doorway.',
      phil:'Welcome is the identity \u2014 the elevation should look like an open door.',
      theory:'Maroon and gold, low warm light, and an arch that frames the entrance instead of advertising it.',
      r:['Lotus mark centred over the entrance axis.','Lamps lit every evening; never left to flicker.','Signage in two languages, same weight.','Counter and book display kept clear of the worship path.'],
      s:[['Fascia','18\u2032 \u00d7 3\u2032 ACP box, maroon with lotus'],['Cladding','Maroon ACP panel with a gold datum line'],['Glazing','Clear toughened, brass mullions'],['Interior','Arch, altar, lamp row, book and gift counter'],['Lighting','Warm interior, oil-lamp points at the counter'],['Fixing','Anchors sized for wind load on the open side']] }
  ];

  const GATES = ['Recce and mark datum','Fix sub-frame to wall','Hang clad panels, check level',
                 'Set letters and modules','Power, test, second-check','Clean, shoot, hand over'];
  const BASE = 'bw-';

  const LINES = [
    { line: 'a', el: $('#bwRowA'), track: $('#bwTrackA'), dir: -1, base: 46, x: 0, period: 1, slow: false, throw: 0 },
    { line: 'b', el: $('#bwRowB'), track: $('#bwTrackB'), dir: 1, base: 38, x: 0, period: 1, slow: false, throw: 0 }
  ].filter(r => r.el && r.track);

  const sheet = $('#bwSheet');
  if (sheet) { sheet.setAttribute('tabindex', '-1'); sheet.setAttribute('aria-labelledby', 'bwSheetName'); }
  const still = reduce || rdata;
  if (still) wrap.classList.add('reduce');
  if (!sheet) stage.setAttribute('aria-hidden', 'true');

  const slugOf = i => BASE + String(i + 1).padStart(2, '0') + '-' +
    ['nokia','microsoft','sony','samsung','xiaomi','oppo','realme','intel','sbi','au-bank','tata-indicash','philips',
     'havells','kei','hair-salon','pepsi','mountain-dew','som','castrol','tvs-tyres','pantaloons','american-eagle',
     'van-heusen','iskcon'][i];

  const tileHTML = i => {
    const s = SHOPS[i];
    return '<button type="button" class="bw-tile" data-i="' + i + '" aria-controls="bwSheet" aria-label="' + s.n + ' \u2014 open artwork detail">' +
      '<img src="' + A('assets/brands/' + slugOf(i) + '.svg') + '" width="520" height="400" loading="lazy" ' +
      'decoding="async" draggable="false" alt="">' +
      '</button>'; 
  };
  const oneSet = line => {
    const from = line === 'a' ? 0 : 12;
    return [...Array(12)].map((_, k) => tileHTML(from + k)).join('');
  };

  const gapPx = () => { const g = parseFloat(getComputedStyle(LINES[0].track).columnGap); return isNaN(g) ? 18 : g; };
  const wrapX = (v, p) => { v = v % p; if (v > 0) v -= p; return v; };
  const paint = r => { r.track.style.transform = 'translate3d(' + r.x.toFixed(2) + 'px,0,0)'; };

  const fill = row => {
    const html = oneSet(row.line);
    row.track.innerHTML = html;
    const setW = row.track.scrollWidth + gapPx();
    row.period = setW || 1;
    const copies = Math.max(2, Math.min(6, Math.ceil((innerWidth * 2) / row.period) + 1));
    row.track.innerHTML = html.repeat(still ? Math.max(2, copies - 1) : copies);
    /* only the first set of each line is a real tab stop; the repeats are copies */
    [...row.track.children].forEach((el, k) => {
      if (k >= 12) { el.tabIndex = -1; el.setAttribute('aria-hidden', 'true'); }
      else el.tabIndex = 0;
    });
    row.x = wrapX(row.x, row.period);
    paint(row);
  };
  LINES.forEach(fill);

  /* the accessible alternative: the same 24 shopfronts as a plain list,
     generated from the same data the band uses, so the two can never drift */
  const list = $('#bwList');
  if (list) list.innerHTML = SHOPS.map((s, k) =>
    '<li><b>' + ('0' + (k + 1)).slice(-2) + ' ' + s.n + '</b> \u2014 ' + s.t + '</li>').join('');

  if (still) LINES.forEach((row, k) => {
    row.el.tabIndex = 0;
    row.el.setAttribute('role', 'group');
    row.el.setAttribute('aria-label', 'Shopfronts, line ' + (k + 1) + ' of 2 \u2014 scroll sideways, then open any shopfront for detail');
  });

  /* ---------------------------------------------------------- detail sheet */
  const el = id => document.getElementById(id);
  let openIdx = -1;
  const label = i => String(i + 1).padStart(2, '0') + ' / 24';

  const openSheet = (i, scroll = true) => {
    if (!sheet || !SHOPS[i]) return;
    const s = SHOPS[i];
    el('bwSheetNo').textContent = label(i);
    el('bwSheetName').textContent = s.n;
    el('bwSheetSub').textContent = s.t;
    el('bwSheetIntro').textContent = s.intro;
    el('bwSheetPhil').textContent = s.phil;
    el('bwSheetTheory').textContent = s.theory;
    el('bwSheetRules').innerHTML = s.r.map(r => '<li>' + r + '</li>').join('');
    el('bwSheetSpec').innerHTML = s.s.map(([k, v]) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('');
    el('bwSheetGates').innerHTML = GATES.map((g, k) => '<li><b>' + (k + 1) + '</b>' + g + '</li>').join('');
    const img = el('bwSheetImg');
    img.src = A('assets/brands/' + slugOf(i) + '.svg');
    img.alt = s.n + ' \u2014 retail branding artwork: ' + s.t;
    el('bwSheetCap').textContent = 'Front elevation \u00b7 fascia, cladding and glazing construction';
    sheet.hidden = false;
    openIdx = i;
    wrap.classList.add('is-open');
    /* the sheet is a region: move focus into it so screen readers land here,
       then give focus back to the shopfront that opened it */
    requestAnimationFrame(() => { try { sheet.focus({ preventScroll: true }); } catch (e) {} });
    if (scroll) {
      const navH = ($('.nav') ? $('.nav').offsetHeight : 64) + 40;
      const top = sheet.getBoundingClientRect().top + scrollY - navH;
      scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
    }
  };
  const closeSheet = () => {
    if (!sheet || openIdx < 0) return;
    const back = $('.bw-tile[data-i="' + openIdx + '"]');
    sheet.hidden = true;
    openIdx = -1;
    wrap.classList.remove('is-open');
    if (back && document.activeElement !== back) {
      try { back.focus({ preventScroll: true }); } catch (e) {}
    }
  };
  if (sheet) {
    const closeBtn = $('#bwClose');
    if (closeBtn) closeBtn.addEventListener('click', closeSheet);
    addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
  }

  /* --------------------------------------------------------------- motion */
  let on = true, drag = null, sv = 0, lastY = scrollY, last = performance.now(), moved = false;
  new IntersectionObserver(es => { on = es[0].isIntersecting; }, { rootMargin: '240px 0px' }).observe(stage);

  const tick = now => {
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    if (on && !document.hidden) {
      const dy = scrollY - lastY; lastY = scrollY;
      sv += (dy / dt / 60 - sv) * 0.12;
      const surge = 1 + Math.min(2.2, Math.abs(sv) / 16);
      for (const row of LINES) {
        if (drag && drag.row === row) continue;
        row.x += (row.dir * row.base * (row.slow ? 0.28 : 1) * surge + row.throw) * dt;
        row.throw *= Math.pow(0.9, dt * 60);
        if (row.throw < 1 && row.throw > -1) row.throw = 0;
        row.x = wrapX(row.x, row.period);
        paint(row);
      }
    } else { lastY = scrollY; }
    requestAnimationFrame(tick);
  };

  if (!still) {
    LINES.forEach(row => {
      row.el.addEventListener('pointerenter', () => { row.slow = true; });
      row.el.addEventListener('pointerleave', () => { if (!drag || drag.row !== row) row.slow = false; });
    });
    stage.setAttribute('data-cursor', 'Drag');
    stage.addEventListener('pointerdown', e => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const el2 = e.target.closest && e.target.closest('.bw-row');
      const row = el2 && LINES.find(r => r.el === el2);
      if (!row) return;
      drag = { row, startX: e.clientX, base: row.x, vel: 0, lastX: e.clientX, lastT: performance.now(), id: e.pointerId };
      moved = false;
      row.throw = 0;
      if (el2.setPointerCapture) { try { el2.setPointerCapture(e.pointerId); } catch (err) {} }
    });
    addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      if (!moved && Math.abs(dx) > 6) { moved = true; wrap.classList.add('is-drag'); }
      if (!moved) return;
      const row = drag.row, now = performance.now(), dt = Math.max(1, now - drag.lastT) / 1000;
      drag.vel = drag.vel * 0.6 + ((e.clientX - drag.lastX) / dt) * 0.4;
      drag.lastX = e.clientX; drag.lastT = now;
      row.x = wrapX(drag.base + dx, row.period);
      paint(row);
      e.preventDefault();
    }, { passive: false });
    const end = () => {
      if (!drag) return;
      const row = drag.row;
      if (moved) row.throw = Math.max(-2400, Math.min(2400, drag.vel * 0.75));
      row.slow = false;
      wrap.classList.remove('is-drag');
      drag = null;
      setTimeout(() => { moved = false; }, 0);
    };
    addEventListener('pointerup', end);
    addEventListener('pointercancel', end);
    addEventListener('blur', end);
    last = performance.now();
    requestAnimationFrame(tick);
  }

  /* click a shopfront: open its detail (a drag must not count as a click) */
  stage.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('.bw-tile');
    if (!b || moved) return;
    const i = +b.dataset.i;
    if (i === openIdx) { closeSheet(); return; }
    openSheet(i);
  });

  let rt = 0;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => LINES.forEach(fill), 180); }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => LINES.forEach(fill));
})();
})();
