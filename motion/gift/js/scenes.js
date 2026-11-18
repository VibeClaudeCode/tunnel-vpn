// «Наш секрет». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const MAR = { hair: '#1f2440', hair2: '#151a33', jacket: '#f2c94c', hoodie: true };
  const mar = (id, mood) => C.kira(Object.assign({ id, mood }, MAR));
  const hands = (c = '#f2c94c') => `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f7d5bd" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f7d5bd" ${st}/>
    ${R(140, 1820, 800, 120, c, st)}`;
  const phoneBg = (c1, c2, extra = '') => `${R(0, 0, 1080, 1920, c1)}<circle cx="540" cy="900" r="700" fill="${c2}"/><g transform="translate(190 150)">${C.phone(700, 1440, '#eef1f7')}</g>${hands()}${extra}`;
  const scr = (id, inner, bg = '#eef1f7') => `<div class="scr" id="${id}" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:${bg}">${inner}</div>`;
  const redv = `<rect class="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>`;
  let avn = 0;
  // аватар «Димы»: рисованный аниме-мальчик; под ним — серый силуэт (кто на самом деле — неизвестно)
  const dimaAva = (s = 96, cls = '') => `<div class="dav ${cls}" style="position:relative;width:${s}px;height:${s}px;flex:none">
      <svg class="sil" width="${s}" height="${s}" viewBox="-160 -190 320 320" style="position:absolute;inset:0;border-radius:50%;background:#3a3f55;border:4px solid #211d2b"><circle cx="0" cy="-30" r="90" fill="#1e2233"/><path d="M-150,140 Q-140,40 0,40 Q140,40 150,140Z" fill="#1e2233"/><text x="0" y="0" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="120" fill="#6a7385">?</text></svg>
      <svg class="cute" width="${s}" height="${s}" viewBox="-160 -190 320 320" style="position:absolute;inset:0;border-radius:50%;background:#c9d8ff;border:4px solid #211d2b">${C.boy({ id: 'dv' + (avn++), mood: 'neutral', body: false, hair: '#6b8cff' })}</svg></div>`;
  const heart = (s = 30, c = '#ff5a8a') => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" style="vertical-align:-5px"><path d="M20,35 L6,21 Q-1,13 6,7 Q13,2 20,10 Q27,2 34,7 Q41,13 34,21Z" fill="${c}" stroke="#211d2b" stroke-width="3"/></svg>`;
  const eye = `<svg width="46" height="34" viewBox="0 0 56 40" style="vertical-align:-6px"><path d="M2,20 Q28,-8 54,20 Q28,48 2,20Z" fill="#fff" stroke="#211d2b" stroke-width="4"/><circle cx="28" cy="20" r="10" fill="#211d2b"/></svg>`;

  /* ---------- S1–S3. Стрим: Марина рисует, чат, донат ---------- */
  const room = (mid) => `${R(0, 0, 1080, 1920, '#2d2350')}
    ${[...Array(9)].map((_, i) => `<circle cx="${80 + (i % 3) * 360}" cy="${260 + Math.floor(i / 3) * 300}" r="8" fill="#ff9ad5" opacity=".7"/>`).join('')}
    <path d="M0,240 Q540,330 1080,240" fill="none" stroke="#ffd36b" stroke-width="6"/>${[...Array(9)].map((_, i) => `<circle cx="${60 + i * 120}" cy="${255 + Math.sin(i) * 20 + 30}" r="14" fill="#ffd36b" opacity=".9"/>`).join('')}
    ${at(540, 930, 1.25, mar(mid, 'neutral'))}
    ${R(-20, 1330, 1120, 610, '#8a5a3c', st)}
    <g transform="translate(540 1330) rotate(-4)">${R(-300, -40, 600, 240, '#fff', st)}<path d="M-240,40 Q-120,-20 0,60 T240,40" fill="none" stroke="#ff5a8a" stroke-width="12" stroke-linecap="round"/><circle cx="-150" cy="120" r="40" fill="#6fb3ff" ${st} stroke-width="5"/></g>
    ${[['#ff5a8a', -40], ['#27C46B', -10], ['#2f5bea', 20]].map(([c, r], i) => `<g transform="translate(${820 + i * 50} 1420) rotate(${r})">${R(-14, -110, 28, 200, c, `${st} rx="10"`)}</g>`).join('')}`;
  $('#s1').innerHTML = svg(room('m1')) + `
    <div class="abs" style="left:60px;top:300px;display:flex;gap:16px;align-items:center">
      <div class="pill" style="position:static;background:#E5304A;font-size:44px"><i style="display:inline-block;width:26px;height:26px;border-radius:50%;background:#fff;margin-right:12px"></i>LIVE</div>
      <div class="pill" id="viewers" style="position:static;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:44px">${eye} <span id="cntv">7</span></div></div>
    <div class="pill abs" id="age" style="right:70px;top:440px;background:#FFD23F;color:#211d2b;border:5px solid #211d2b;font-size:48px;transform:rotate(4deg)">Марина, 13</div>`;

  $('#s2').innerHTML = svg(room('m2')) + `
    <div class="abs" id="chat2" data-small style="left:50px;top:300px;width:600px;background:rgba(15,12,30,.88);border:5px solid #211d2b;border-radius:30px;padding:24px;color:#fff">
      <div style="font:800 34px/1 Rubik;opacity:.7;margin-bottom:14px">Чат стрима · 7 зрителей</div>
      ${[['katya_art', '#9fe8bf', 'привет))'], ['дима_15', '#8fb0ff', 'ты рисуешь лучше всех ✨'], ['дима_15', '#8fb0ff', 'шедевр как всегда 😍'], ['дима_15', '#8fb0ff', 'жду каждый твой стрим']].map(([n, c, t], i) =>
        `<div class="cl" style="font:600 36px/1.3 Onest;margin-top:8px"><b style="color:${c}">${n}:</b> ${t}</div>`).join('')}</div>`;

  $('#s3').innerHTML = svg(room('m3')) + `
    <div class="abs" id="don3" style="left:110px;top:300px;width:780px;text-align:center;background:linear-gradient(135deg,#8e5bff,#ff5a8a);border:8px solid #211d2b;border-radius:40px;padding:36px;color:#fff;box-shadow:0 14px 0 rgba(0,0,0,.3)">
      <div style="font:700 40px/1 Onest;opacity:.9">дима_15 задонатил</div>
      <div style="font:900 130px/1.05 Rubik;margin-top:10px;text-shadow:0 6px 0 #211d2b"><span id="cnt5">5 000</span> ₽</div>
      <div id="don3m" style="font:700 44px/1.2 Onest;margin-top:10px">«На новые маркеры ${heart(40)}»</div></div>
    <div id="coins3" class="abs" style="inset:0">${[[80, 820], [880, 760], [140, 1540], [860, 1560], [470, 1720]].map(([x, y]) => `<div class="abs cn" style="left:${x}px;top:${y}px;width:90px;height:90px;border-radius:50%;background:#ffd36b;border:6px solid #211d2b;font:900 52px/78px Rubik;color:#211d2b;text-align:center">₽</div>`).join('')}</div>`;

  /* ---------- S4. Посылка ---------- */
  $('#s4').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#e7dccb')}${R(0, 1400, 1080, 520, '#b9a690', st)}
    <g transform="translate(140 220)">${R(0, 0, 420, 1180, '#7a5238', st)}<circle cx="370" cy="620" r="22" fill="#c9a24a" ${st}/></g>
    <g transform="translate(640 1180)"><g id="box4">
      <g id="tab4"><g transform="translate(0 -40)">${R(-190, -260, 380, 270, '#1b1a22', `${st} rx="24"`)}${R(-170, -240, 340, 230, '#bfe0ff', 'rx="12"')}<path d="M-120,-80 Q-40,-180 40,-100 T150,-140" fill="none" stroke="#ff5a8a" stroke-width="10" stroke-linecap="round"/></g></g>
      <path d="M-260,0 L260,0 L240,300 L-240,300Z" fill="#c9915a" ${st}/>
      <path d="M-260,0 L-300,-60 L-40,-60 L0,0Z" fill="#d9a46b" ${st} id="flapL"/><path d="M260,0 L300,-60 L40,-60 L0,0Z" fill="#d9a46b" ${st} id="flapR"/>
      <path d="M-30,0 L30,0 L30,300 L-30,300Z" fill="#e8c27a" opacity=".8"/>
    </g></g>`)
    + `<div class="abs" id="lbl4" style="left:560px;top:1300px;width:420px;background:#fff;border:5px solid #211d2b;border-radius:16px;padding:16px 20px;transform:rotate(-4deg)">
        <div style="font:700 26px/1.2 Onest;color:#6a7385">Получатель:</div>
        <div style="font:800 34px/1.25 Onest;color:#211d2b">Марина К.<br><span id="addr4">ул. Садовая, 12, кв. 45</span></div></div>
      <div class="pill abs" id="tag4" style="left:120px;top:300px;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:46px;transform:rotate(-3deg)">от: дима_15</div>`;

  /* ---------- S5. «Откуда он знает адрес?» ---------- */
  $('#s5').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2d2350')}<circle cx="540" cy="1000" r="560" fill="#8e5bff" opacity=".18"/>
    ${at(540, 900, 2.0, mar('m5', 'worried'))}`)
    + `<div class="abs" id="th5" style="left:160px;top:250px;width:700px;text-align:center;background:#fff;color:#211d2b;border:7px solid #211d2b;border-radius:60px;padding:30px;font:900 62px/1.1 Rubik">Откуда он знает<br>мой адрес?</div>`;

  /* ---------- S6. Личные сообщения ---------- */
  $('#s6').innerHTML = svg(phoneBg('#1a1430', '#261d48', redv)) + scr('scr6', `
      <div class="bar"><span>22:31</span><span>LTE 58%</span></div>
      <div class="head">${dimaAva(96, 'd6')}<div><div class="ttl">дима_15</div><div class="sub">в сети</div></div></div>
      <div class="msg" id="d61" style="top:200px;max-width:560px;font:700 40px/1.25 Onest">Давай встретимся 🙂</div>
      <div class="msg" id="d62" style="top:330px;max-width:560px;font:700 40px/1.25 Onest">Только родителям не говори — они не поймут</div>
      <div class="msg" id="d63" style="top:530px;max-width:560px;font:800 48px/1.15 Rubik;box-shadow:0 0 0 6px #E5304A">Это будет наш секрет 🤫</div>`);

  /* ---------- S7. Выбор ---------- */
  $('#s7').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2a3156')}<circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, mar('m7', 'worried'))}`) + `
    <div class="pill" id="q7" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#E5304A"><span class="n">1</span><h3 style="font-size:54px">Пойти на встречу</h3><p>он же такой добрый</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#2F5BEA"><span class="n">2</span><h3 style="font-size:54px">Показать маме</h3><p>и потерять того, кто в неё верит?</p></div>
    <div class="pill" id="cm7" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S8. Финал ---------- */
  $('#s8').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="rule" style="left:110px;top:260px;width:760px;text-align:center">
      <div style="font:900 74px/1.05 Rubik;color:#FFD23F">«НАШ СЕКРЕТ»<br>ОТ РОДИТЕЛЕЙ —<br>ЭТО ОПАСНО</div>
      <div style="font:600 44px/1.25 Onest;margin-top:20px;color:#dfe4f0">ты не знаешь, кто<br>по ту сторону экрана</div></div>
    <div class="abs" id="help" style="left:110px;top:800px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:36px 40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:500 46px/1.2 Onest;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:22px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div></div>
    <div class="abs" id="part2" style="left:50%;top:1130px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
