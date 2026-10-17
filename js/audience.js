/* ============================================================
   Audience analysis — public mirror of /AV/dashboard.html
   Sample preview dataset (same shape as the dashboard's offline
   demo fallback): KPIs · 7-day traffic · sources · pages ·
   locations · devices · live stream.
   ============================================================ */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var root = document.getElementById('audience');
  if (!root) return;

  /* ---------------- demo sessions (48) ---------------- */
  /* day = days-ago bucket 0..6 · off = minutes ago · dur = seconds */
  var S = [
    /* day0 */ ['Bhopal','India','Mobile','Chrome','Android','google','organic',['/','#mockups','#work'],940,1,0,6,'lead'],
    ['Indore','India','Desktop','Chrome','Windows','direct','none',['/','#work','#contact'],1420,1,18,'-','card'],
    ['Delhi','India','Mobile','Chrome','Android','instagram','social',['/','#mockups'],520,1,26,'-','-'],
    ['Mumbai','India','Desktop','Safari','macOS','google','organic',['/','#work','#pillars','#method'],2210,1,34,'-','-'],
    ['Pune','India','Mobile','Safari','iOS','instagram','social',['/','#mockups','#work'],760,1,49,'-','wa'],
    ['Dubai','United Arab Emirates','Tablet','Safari','iOS','direct','none',['/','#atoz'],1180,0,55,'-','-'],
    ['Bhopal','India','Mobile','Chrome','Android','google','organic',['/','#mockups'],430,1,64,'-','-'],
    ['Bangalore','India','Desktop','Firefox','Windows','facebook','social',['/','#work'],1650,0,77,'-','-'],
    ['London','United Kingdom','Desktop','Chrome','Windows','google','organic',['/','#method','#contact'],1900,0,88,'-','card'],
    ['Indore','India','Mobile','Chrome','Android','whatsapp','referral',['/','#contact'],300,0,95,'-','wa'],
    /* day1 */ ['Bhopal','India','Desktop','Edge','Windows','google','organic',['/','#pillars','#work'],1330,0,24*60+30,'-','-'],
    ['Hyderabad','India','Mobile','Chrome','Android','instagram','social',['/','#mockups'],640,0,24*60+55,'-','-'],
    ['Kolkata','India','Desktop','Chrome','Windows','direct','none',['/','#work'],1510,0,24*60+70,'-','lead'],
    ['Chennai','India','Mobile','Safari','iOS','google','organic',['/','#atoz','#method'],880,0,24*60+95,'-','-'],
    ['Gurugram','India','Desktop','Chrome','macOS','linkedin','referral',['/','#contact','#work'],1120,0,24*60+120,'-','card'],
    ['Jaipur','India','Mobile','Chrome','Android','google','organic',['/','#mockups','#mockups'],560,0,24*60+140,'-','-'],
    ['Pune','India','Tablet','Safari','iOS','direct','none',['/'],700,0,24*60+165,'-','-'],
    ['Mumbai','India','Desktop','Chrome','Windows','instagram','social',['/','#work','#pillars'],1740,0,24*60+190,'-','-'],
    /* day2 */ ['Bhopal','India','Mobile','Chrome','Android','google','organic',['/','#work'],990,0,48*60+25,'-','-'],
    ['Indore','India','Desktop','Chrome','Windows','direct','none',['/','#mockups','#contact'],1280,0,48*60+48,'-','wa'],
    ['Ahmedabad','India','Mobile','Chrome','Android','facebook','social',['/','#atoz'],470,0,48*60+70,'-','-'],
    ['Delhi','India','Desktop','Safari','macOS','google','organic',['/','#method'],1600,0,48*60+95,'-','-'],
    ['Kochi','India','Mobile','Safari','iOS','instagram','social',['/','#mockups'],610,0,48*60+115,'-','-'],
    ['Dubai','United Arab Emirates','Desktop','Chrome','Windows','direct','none',['/','#work','#contact'],1350,0,48*60+150,'-','lead'],
    ['Lucknow','India','Mobile','Chrome','Android','google','organic',['/'],340,0,48*60+175,'-','-'],
    ['Nagpur','India','Desktop','Edge','Windows','referral','referral',['/','#pillars','#work'],1060,0,48*60+205,'-','-'],
    /* day3 */ ['Bhopal','India','Desktop','Chrome','Windows','instagram','social',['/','#mockups','#work'],1480,0,72*60+30,'-','-'],
    ['Surat','India','Mobile','Chrome','Android','google','organic',['/','#work'],720,0,72*60+52,'-','-'],
    ['Chandigarh','India','Tablet','Safari','iOS','direct','none',['/','#method'],840,0,72*60+80,'-','-'],
    ['Mumbai','India','Mobile','Chrome','Android','whatsapp','referral',['/','#contact'],390,0,72*60+105,'-','wa'],
    ['Pune','India','Desktop','Firefox','Windows','google','organic',['/','#atoz','#pillars'],1570,0,72*60+135,'-','-'],
    ['Patna','India','Mobile','Chrome','Android','facebook','social',['/','#mockups'],540,0,72*60+160,'-','-'],
    ['Kolkata','India','Desktop','Chrome','macOS','direct','none',['/','#work','#contact'],1240,0,72*60+190,'-','card'],
    /* day4 */ ['Indore','India','Mobile','Chrome','Android','google','organic',['/','#mockups'],660,0,96*60+35,'-','-'],
    ['Delhi','India','Desktop','Chrome','Windows','instagram','social',['/','#work'],1390,0,96*60+60,'-','-'],
    ['Bhopal','India','Mobile','Safari','iOS','direct','none',['/','#pillars'],770,0,96*60+90,'-','-'],
    ['Hyderabad','India','Desktop','Chrome','Windows','google','organic',['/','#method','#contact'],1680,0,96*60+120,'-','lead'],
    ['Nashik','India','Mobile','Chrome','Android','facebook','social',['/'],420,0,96*60+150,'-','-'],
    ['Gurugram','India','Desktop','Edge','Windows','linkedin','referral',['/','#work','#atoz'],1150,0,96*60+185,'-','-'],
    /* day5 */ ['Bhopal','India','Desktop','Chrome','Windows','google','organic',['/','#mockups','#work'],1530,0,120*60+40,'-','-'],
    ['Jaipur','India','Mobile','Chrome','Android','instagram','social',['/','#mockups'],590,0,120*60+72,'-','-'],
    ['Coimbatore','India','Mobile','Safari','iOS','direct','none',['/'],480,0,120*60+100,'-','-'],
    ['Mumbai','India','Desktop','Safari','macOS','google','organic',['/','#pillars','#method'],1820,0,120*60+140,'-','-'],
    ['Rajkot','India','Mobile','Chrome','Android','facebook','social',['/','#contact'],360,0,120*60+175,'-','wa'],
    /* day6 */ ['Indore','India','Desktop','Chrome','Windows','direct','none',['/','#work'],1260,0,144*60+45,'-','-'],
    ['Delhi','India','Mobile','Chrome','Android','google','organic',['/','#atoz'],700,0,144*60+85,'-','-'],
    ['Bangalore','India','Desktop','Chrome','macOS','instagram','social',['/','#mockups','#work'],1610,0,144*60+130,'-','card'],
    ['Bhopal','India','Mobile','Chrome','Android','google','organic',['/','#method'],530,0,144*60+180,'-','-'],
    ['Manila','Philippines','Desktop','Firefox','Windows','direct','none',['/','#work','#contact'],1090,0,144*60+220,'-','-']
  ];
  var sessions = S.map(function (r, i) {
    return {
      id: 'v' + i, city: r[0], country: r[1], device: r[2], browser: r[3], os: r[4],
      source: r[5], medium: r[6], pages: r[7], dur: r[8], active: !!r[9], off: r[10],
      visitor: (r[11] === '-' || r[11] === undefined) ? 'u' + i : 'u' + r[11],
      kind: r[12],
      day: Math.min(6, Math.floor(+r[10] / (24 * 60)))
    };
  });

  var uniq = {}, pv = 0, leads = 0, dur = 0, activeNow = 0;
  sessions.forEach(function (s) {
    uniq[s.visitor] = 1; pv += s.pages.length; dur += s.dur;
    if (s.active) activeNow++;
    if (s.kind !== '-') leads++;
  });

  /* ---------------- KPIs ---------------- */
  var kpis = [
    [activeNow, 'Active now', 'live'],
    [sessions.length, 'Sessions · 7d', '+12%'],
    [Object.keys(uniq).length, 'Unique visitors', '+9%'],
    [Math.round(dur / sessions.length), 'Avg session (sec)', '+4%'],
    [pv, 'Page views', '+15%'],
    [leads, 'Leads · cards + WA', '+3']
  ];
  var fmt = function (n) { return n.toLocaleString('en-IN'); };
  var hhmm = function (sec) { return Math.floor(sec / 60) + 'm ' + (sec % 60) + 's'; };
  var kp = $('#auKpis');
  kp.innerHTML = kpis.map(function (k) {
    var val = k[0] === Math.round(dur / sessions.length) ? hhmm(k[0]) : fmt(k[0]);
    var extra = k[2] === 'live' ? '<em>now</em>' : '<em>' + k[2] + '</em>';
    return '<div class="au-kpi"><b>' + val + extra + '</b><span>' + k[1] + '</span></div>';
  }).join('');

  /* ---------------- 7-day area chart ---------------- */
  var days = [0, 0, 0, 0, 0, 0, 0], views = [0, 0, 0, 0, 0, 0, 0];
  sessions.forEach(function (s) { days[s.day]++; views[s.day] += s.pages.length; });
  var dLab = ['6d', '5d', '4d', '3d', '2d', 'Yday', 'Today'];
  var W = 640, H = 210, padL = 34, padB = 30, padT = 14;
  var maxV = Math.max.apply(null, views) + 2;
  var xOf = function (i) { return padL + i * (W - padL - 14) / 6; };
  var yOf = function (v) { return padT + (1 - v / maxV) * (H - padT - padB); };
  var line = function (arr) { return arr.map(function (v, i) { return (i ? 'L' : 'M') + xOf(i).toFixed(1) + ' ' + yOf(v).toFixed(1); }).join(' '); };
  var area = line(views) + ' L' + xOf(6) + ' ' + yOf(0) + ' L' + xOf(0) + ' ' + yOf(0) + ' Z';
  var grid = '';
  for (var g = 0; g <= 3; g++) {
    var yy = yOf(maxV * g / 3);
    grid += '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (W - 12) + '" y2="' + yy.toFixed(1) + '" stroke="#EDE8DE" stroke-width="1"/>';
    grid += '<text x="' + (padL - 8) + '" y="' + (yy + 4).toFixed(1) + '" text-anchor="end" font-size="10" fill="#9A94A0">' + Math.round(maxV * g / 3) + '</text>';
  }
  var dots = views.map(function (v, i) {
    return '<circle cx="' + xOf(i).toFixed(1) + '" cy="' + yOf(v).toFixed(1) + '" r="4.5" fill="#E5322D" stroke="#fff" stroke-width="2"/>' +
      '<text x="' + xOf(i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" font-size="10" fill="#8b8694">' + dLab[i] + '</text>';
  }).join('');
  $('#auTrend').innerHTML =
    '<svg class="au-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Page views last 7 days">' +
    '<defs><linearGradient id="auFill" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#E5322D" stop-opacity=".34"/><stop offset="100%" stop-color="#E5322D" stop-opacity="0"/>' +
    '</linearGradient></defs>' + grid +
    '<path d="' + area + '" fill="url(#auFill)"/>' +
    '<path d="' + line(views) + '" fill="none" stroke="#E5322D" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="' + line(days) + '" fill="none" stroke="#17131A" stroke-width="2" stroke-dasharray="5 5" stroke-linecap="round"/>' +
    dots + '</svg>' +
    '<div class="au-legend"><span><i style="background:#E5322D"></i>Page views</span><span><i style="background:#17131A"></i>Sessions</span></div>';

  /* ---------------- traffic sources donut ---------------- */
  var src = {};
  sessions.forEach(function (s) { src[s.source] = (src[s.source] || 0) + 1; });
  var srcK = Object.keys(src).sort(function (a, b) { return src[b] - src[a]; });
  var cols = ['#E5322D', '#17131A', '#FFC24A', '#FF7A3D', '#8A1E3F', '#C9C3BA'];
  var total = sessions.length, r = 66, cxc = 90, cyc = 90, circ = 2 * Math.PI * r, acc = 0, segs = '';
  srcK.forEach(function (k, i) {
    var frac = src[k] / total;
    segs += '<circle cx="' + cxc + '" cy="' + cyc + '" r="' + r + '" fill="none" stroke="' + cols[i % cols.length] + '" stroke-width="26"' +
      ' stroke-dasharray="' + (frac * circ).toFixed(1) + ' ' + (circ - frac * circ).toFixed(1) + '"' +
      ' stroke-dashoffset="' + (-acc * circ).toFixed(1) + '" transform="rotate(-90 ' + cxc + ' ' + cyc + ')"><title>' + k + ' ' + Math.round(frac * 100) + '%</title></circle>';
    acc += frac;
  });
  $('#auSources').innerHTML =
    '<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">' +
    '<svg class="au-donut" width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Traffic sources">' +
    segs + '<text x="90" y="84" text-anchor="middle" font-size="26" font-weight="700" fill="#17131A">' + total + '</text>' +
    '<text x="90" y="104" text-anchor="middle" font-size="9.5" letter-spacing="1.4" fill="#9A94A0">SESSIONS</text></svg>' +
    '<div class="au-legend" style="flex-direction:column;gap:9px;margin:0">' +
    srcK.map(function (k, i) {
      return '<span><i style="background:' + cols[i % cols.length] + '"></i>' + k + ' · ' + Math.round(src[k] / total * 100) + '%</span>';
    }).join('') + '</div></div>';

  /* ---------------- top pages ---------------- */
  var pg = {};
  sessions.forEach(function (s) { s.pages.forEach(function (p) { pg[p] = (pg[p] || 0) + 1; }); });
  var pgK = Object.keys(pg).sort(function (a, b) { return pg[b] - pg[a]; }).slice(0, 7);
  var pgMax = pg[pgK[0]] || 1;
  $('#auPages').innerHTML = '<div class="au-bars">' + pgK.map(function (k) {
    return '<div class="au-bar"><span>' + (k === '/' ? '/ (home)' : k) + '</span>' +
      '<div class="au-track"><div class="au-fill" data-w="' + Math.round(pg[k] / pgMax * 100) + '"></div></div>' +
      '<b>' + pg[k] + '</b></div>';
  }).join('') + '</div>';

  /* ---------------- locations ---------------- */
  var loc = {};
  sessions.forEach(function (s) { var k = s.city + ' · ' + s.country; loc[k] = (loc[k] || 0) + 1; });
  var locK = Object.keys(loc).sort(function (a, b) { return loc[b] - loc[a]; }).slice(0, 8);
  $('#auLoc').innerHTML = '<ul class="au-loc">' + locK.map(function (k, i) {
    var p = k.split(' · ');
    return '<li><i>#' + (i + 1) + '</i><em>' + p[0] + '</em><span style="color:#9A94A0;font-size:11.5px">' + p[1] + '</span><b>' + loc[k] + '</b></li>';
  }).join('') + '</ul>';

  /* ---------------- devices ---------------- */
  var dev = {};
  sessions.forEach(function (s) { dev[s.device] = (dev[s.device] || 0) + 1; });
  var devK = Object.keys(dev).sort(function (a, b) { return dev[b] - dev[a]; });
  var dTotal = sessions.length, dR = 56, dCirc = 2 * Math.PI * dR, dAcc = 0, dSegs = '';
  devK.forEach(function (k, i) {
    var frac = dev[k] / dTotal;
    dSegs += '<circle cx="70" cy="70" r="' + dR + '" fill="none" stroke="' + cols[i % cols.length] + '" stroke-width="20"' +
      ' stroke-dasharray="' + (frac * dCirc).toFixed(1) + ' ' + (dCirc - frac * dCirc).toFixed(1) + '"' +
      ' stroke-dashoffset="' + (-dAcc * dCirc).toFixed(1) + '" transform="rotate(-90 70 70)"><title>' + k + '</title></circle>';
    dAcc += frac;
  });
  $('#auDevices').innerHTML =
    '<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">' +
    '<svg class="au-donut" width="140" height="140" viewBox="0 0 140 140" role="img" aria-label="Devices">' + dSegs +
    '<text x="70" y="66" text-anchor="middle" font-size="20" font-weight="700" fill="#17131A">' + Math.round(dev[devK[0]] / dTotal * 100) + '%</text>' +
    '<text x="70" y="84" text-anchor="middle" font-size="8.5" letter-spacing="1.2" fill="#9A94A0">' + devK[0].toUpperCase() + '</text></svg>' +
    '<div class="au-legend" style="flex-direction:column;gap:9px;margin:0">' +
    devK.map(function (k, i) {
      return '<span><i style="background:' + cols[i % cols.length] + '"></i>' + k + ' · ' + dev[k] + '</span>';
    }).join('') + '</div></div>';

  /* ---------------- live event stream ---------------- */
  var evColors = { start: '#17131A', view: '#E5322D', lead: '#FFC24A', wa: '#FF7A3D' };
  var evLabel = { start: 'Session start', view: 'Page view', lead: 'Lead submitted', wa: 'WhatsApp click' };
  var stream = $('#auStream');
  function evTime(offMin) {
    var d = new Date(Date.now() - offMin * 60000);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
  function evItem(s, i) {
    var type = s.kind === 'card' ? 'lead' : s.kind === 'wa' ? 'wa' : (i % 2 ? 'view' : 'start');
    var detail = type === 'view' ? s.pages[s.pages.length - 1]
      : type === 'lead' ? 'Digital card · ' + s.city
      : type === 'wa' ? 'wa.me/919009001551' : s.city + ' · ' + s.device;
    return '<li><time>' + evTime(s.off) + '</time><span class="au-dot" style="background:' + evColors[type] + '"></span>' +
      '<b>' + evLabel[type] + '</b><span>' + detail + '</span></li>';
  }
  var evs = sessions.slice().sort(function (a, b) { return a.off - b.off; }).slice(0, 16);
  stream.innerHTML = evs.map(evItem).join('');

  /* gentle live tick — demo clock */
  var tickPool = sessions.filter(function (s) { return !s.active; }).slice(0, 10), tp = 0;
  setInterval(function () {
    if (!stream || document.hidden) return;
    var s = tickPool[tp++ % tickPool.length];
    var li = document.createElement('li');
    li.innerHTML = '<time>' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) +
      '</time><span class="au-dot" style="background:#E5322D"></span><b>Page view</b><span>' +
      s.pages[Math.floor(Math.random() * s.pages.length)] + ' · ' + s.city + '</span>';
    li.style.opacity = '0';
    stream.insertBefore(li, stream.firstChild);
    requestAnimationFrame(function () { li.style.transition = 'opacity .6s'; li.style.opacity = '1'; });
    while (stream.children.length > 18) stream.removeChild(stream.lastChild);
  }, 6500);

  /* animate bar fills when visible */
  var fills = root.querySelectorAll('.au-fill');
  var showBars = function () {
    fills.forEach(function (f) { f.style.width = f.getAttribute('data-w') + '%'; });
  };
  if ('IntersectionObserver' in window) {
    var o = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { showBars(); o.disconnect(); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    o.observe(root);
  } else showBars();
})();
