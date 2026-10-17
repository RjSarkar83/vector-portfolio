/* ============================================================
   AV Mockup Library — 158 scenes · category chips · liquid popup
   ============================================================ */
(function () {
  'use strict';
  var DATA = window.MOCKUPS || [];
  if (!DATA.length) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var ASSET = 'assets/mockups/';

  /* ---- gooey filter (liquid blobs) ---- */
  var svgNS = 'http://www.w3.org/2000/svg';
  var defsSvg = document.createElementNS(svgNS, 'svg');
  defsSvg.setAttribute('aria-hidden', 'true');
  defsSvg.setAttribute('width', '0'); defsSvg.setAttribute('height', '0');
  defsSvg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  defsSvg.innerHTML = '<filter id="liquidx">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="26" result="b"/>' +
    '<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -14" result="g"/>' +
    '<feBlend in="SourceGraphic" in2="g"/></filter>';
  document.body.appendChild(defsSvg);

  /* ---- categories from data (keep guide order) ---- */
  var cats = [];
  DATA.forEach(function (m) { if (cats.indexOf(m.cat) < 0) cats.push(m.cat); });
  var active = 'All';

  /* ---- section head: count + chips ---- */
  var chipWrap = document.getElementById('mkChips');
  if (chipWrap) {
    var mkChip = function (label, n) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'chip' + (label === active ? ' on' : '');
      b.textContent = label + (n ? ' · ' + n : '');
      b.addEventListener('click', function () {
        active = label;
        Array.prototype.forEach.call(chipWrap.children, function (c) { c.classList.toggle('on', c === b); });
        render();
      });
      return b;
    };
    chipWrap.appendChild(mkChip('All · ' + DATA.length));
    cats.forEach(function (c) {
      chipWrap.appendChild(mkChip(c, DATA.filter(function (m) { return m.cat === c; }).length));
    });
  }

  /* ---- reveal helper (cards are injected → observe ourselves) ---- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -6% 0px' }) : null;

  /* SVG thumbnails are <object>s so their eye script runs; load them as they approach the viewport */
  var lazySVG = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { var o = e.target; o.setAttribute('data', o.getAttribute('data-src')); lazySVG.unobserve(o); } });
  }, { rootMargin: '300px 0px' }) : null;

  /* Eyes follow the pointer across the whole page, including over the SVG objects */
  function eachSVG(fn) {
    var objs = document.querySelectorAll('object.mk-svg, #mkvImg');
    for (var i = 0; i < objs.length; i++) {
      var w = objs[i].contentWindow;
      if (w && typeof w.avLook === 'function') fn(objs[i], w);
    }
  }
  var lookRaf = 0, lookPt = null;
  window.avLookAll = function (x, y, fromEl) {
    if (fromEl) { var fr = fromEl.getBoundingClientRect(); x += fr.left; y += fr.top; }
    lookPt = [x, y];
    if (lookRaf) return;
    lookRaf = requestAnimationFrame(function () {
      lookRaf = 0;
      var px = lookPt[0], py = lookPt[1];
      eachSVG(function (o, w) { var r = o.getBoundingClientRect(); w.avLook(px - r.left, py - r.top); });
    });
  };
  window.addEventListener('pointermove', function (e) { window.avLookAll(e.clientX, e.clientY, null); }, { passive: true });

  var grid = document.getElementById('mkGrid');
  var shown = [];

  function icon(name) {
    if (name === 'dl') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16"/></svg>';
    if (name === 'left') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>';
    if (name === 'right') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 5l7 7-7 7"/></svg>';
    if (name === 'x') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    if (name === 'ext') return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 4h6v6M20 4l-9 9M10 6H5a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-5"/></svg>';
    return '';
  }

  function render() {
    shown = DATA.filter(function (m) { return active === 'All' || m.cat === active; });
    grid.innerHTML = '';
    if (!shown.length) { grid.innerHTML = '<p class="mk-empty">Nothing in this category yet.</p>'; return; }
    var frag = document.createDocumentFragment();
    shown.forEach(function (m, idx) {
      var card = document.createElement('article');
      card.className = 'mk-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', m.n + ' — open mockup');
      card.innerHTML =
        '<div class="mk-ph">' +
          '<object class="mk-svg" type="image/svg+xml" data-src="' + ASSET + m.f + '" aria-label="' + m.n.replace(/"/g, '&quot;') + ' — AV multicolour mockup"></object>' +
        '</div>' +
        '<div class="mk-body">' +
          '<div class="mk-cat">' + m.cat + '</div>' +
          '<div class="mk-name">' + m.n + '</div>' +
          '<div class="mk-row"><span class="mk-mat">' + (m.spec[1] || m.spec[0]) + '</span>' +
          '<a class="mk-dl" href="' + ASSET + m.f + '" download title="Download SVG" aria-label="Download ' + m.n.replace(/"/g, '&quot;') + '">' + icon('dl') + '</a></div>' +
        '</div>';
      card.addEventListener('click', function (e) {
        if (e.target.closest('.mk-dl')) return;   /* download button wins */
        open(idx, card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(idx, card); }
      });
      if (io) io.observe(card); else card.classList.add('in');
      var so = card.querySelector('object.mk-svg');
      if (so) { if (lazySVG) lazySVG.observe(so); else so.setAttribute('data', so.getAttribute('data-src')); }
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  /* ---------------- liquid popup ---------------- */
  var pop = document.getElementById('mkv');
  if (!pop) return;
  var popImg = $('#mkvImg', pop), popCat = $('#mkvCat', pop), popTitle = $('#mkvTitle', pop),
      popSpecs = $('#mkvSpecs', pop), popPrompt = $('#mkvPrompt', pop), popPos = $('#mkvPos', pop),
      popDl = $('#mkvDl', pop), popBadge = $('#mkvBadge', pop);
  var cur = -1, lastFocus = null, isOpen = false;

  function fill(i) {
    var m = shown[i];
    if (!m) return;
    cur = i;
    popImg.setAttribute('data', ASSET + m.f);
    popImg.setAttribute('aria-label', m.n + ' — AV mockup preview');
    popCat.textContent = m.cat;
    popTitle.textContent = m.n;
    popBadge.textContent = m.fam.toUpperCase() + (m.v ? ' / ' + m.v : '');
    popSpecs.innerHTML =
      '<div><dt>Size</dt><dd>' + (m.spec[0] || '—') + '</dd></div>' +
      '<div><dt>Material</dt><dd>' + (m.spec[1] || '—') + '</dd></div>' +
      '<div><dt>Lighting</dt><dd>' + (m.spec[2] || '—') + '</dd></div>' +
      '<div><dt>Camera view</dt><dd>' + (m.spec[3] || '—') + '</dd></div>' +
      '<div style="grid-column:1/-1"><dt>Key elements</dt><dd>' + (m.spec[4] || '—') + '</dd></div>';
    popPrompt.innerHTML = '<b>AI PROMPT</b>Minimal flat vector ' + m.cat + ' mockup: ' + m.n +
      '. Size ' + m.spec[0] + '. Material: ' + m.spec[1] + '. Lighting: ' + m.spec[2] +
      '. Camera: ' + m.spec[3] + '. Key elements: ' + m.spec[4] +
      '. Multicolour palette: coral, teal, mustard, navy, soft grey. Plain white background, no gradients, no text in artwork, blank panel for logo placement.';
    popDl.href = ASSET + m.f;
    popDl.setAttribute('download', m.f);
    popPos.textContent = (i + 1) + ' / ' + shown.length;
  }

  function open(i, card) {
    lastFocus = document.activeElement;
    fill(i);
    pop.classList.add('on');
    document.body.classList.add('mkv-lock');
    isOpen = true;
    /* FLIP: card grows out of the thumbnail */
    var shell = $('.mkv-card', pop);
    shell.classList.add('no-anim');
    var ph = card && card.querySelector('.mk-ph');
    if (ph) {
      try {
        var a = ph.getBoundingClientRect();
        requestAnimationFrame(function () {
          var b = shell.getBoundingClientRect();
          if (b.width > 0 && b.height > 0 && a.width > 0) {
            var sx = Math.min(1.4, a.width / b.width), sy = Math.min(1.4, a.height / b.height);
            var dx = (a.left + a.width / 2) - (b.left + b.width / 2);
            var dy = (a.top + a.height / 2) - (b.top + b.height / 2);
            shell.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(' + Math.max(.35, (sx + sy) / 2) + ')';
            shell.style.opacity = '.4';
            requestAnimationFrame(function () {
              shell.classList.remove('no-anim');
              shell.style.transition = 'transform .65s cubic-bezier(.16,.84,.28,1), opacity .45s ease';
              shell.style.transform = 'none';
              shell.style.opacity = '1';
            });
          } else { shell.classList.remove('no-anim'); }
        });
      } catch (err) { shell.classList.remove('no-anim'); }
    } else { shell.classList.remove('no-anim'); }
    requestAnimationFrame(function () { pop.classList.add('in'); });
    $('#mkvClose', pop).focus({ preventScroll: true });
  }

  function close() {
    pop.classList.remove('in');
    isOpen = false;
    document.body.classList.remove('mkv-lock');
    setTimeout(function () {
      if (!isOpen) { pop.classList.remove('on'); popImg.removeAttribute('data'); }
    }, 420);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function step(d) { if (!shown.length) return; fill((cur + d + shown.length) % shown.length); }

  $('#mkvClose', pop).addEventListener('click', close);
  $('#mkvPrev', pop).addEventListener('click', function () { step(-1); });
  $('#mkvNext', pop).addEventListener('click', function () { step(1); });
  $('.mkv-veil', pop).addEventListener('click', close);
  pop.addEventListener('click', function (e) {
    if (e.target.closest('.mkv-shell') && !e.target.closest('.mkv-card') && isOpen) close();
  });
  addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'Tab') {
      var f = pop.querySelectorAll('button, a[href]');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, true);

  render();
})();
