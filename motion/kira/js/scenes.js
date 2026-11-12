// Вёрстка сцен. Каждая сцена: <svg class="art"> с фоном и персонажами + HTML-слой для интерфейсов и пузырей.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner, cls = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath ${cls}">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const bubble = (id, tag, text, x, y, tailX = 60, tagColor = '#7b4dff') =>
    `<div class="bub" id="${id}" style="left:${x}px;top:${y}px"><span class="tag" style="background:${tagColor}">${tag}</span>${text}<i class="tail" style="left:${tailX}px"></i></div>`;
  const laugh = (s = 60) => `<svg width="${s}" height="${s}" viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#FFD23F" stroke="${K}" stroke-width="4"/>
    <path d="M14,24 Q20,16 26,24 M34,24 Q40,16 46,24" fill="none" stroke="${K}" stroke-width="4" stroke-linecap="round"/>
    <path d="M14,33 Q30,56 46,33Z" fill="#7a2d35" stroke="${K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M10,30 q-6,6 -2,12 M50,30 q6,6 2,12" fill="#6cc4ff" stroke="${K}" stroke-width="2"/></svg>`;
  const kid = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})" opacity=".9">
    <path d="M-120,300 Q-120,170 0,160 Q120,170 120,300Z" fill="${c}" ${st}/>
    <circle cx="0" cy="40" r="105" fill="#d9b7a0" ${st}/>
    <path d="M-105,30 Q-100,-75 0,-70 Q100,-75 105,30 Q60,-20 0,-20 Q-60,-20 -105,30Z" fill="#4b3a33" ${st}/>
    <path d="M-50,40 Q-35,28 -20,40 M20,40 Q35,28 50,40" fill="none" ${st} stroke-width="8"/>
    <path d="M-40,80 Q0,130 40,80Z" fill="#7a2d35" ${st} stroke-width="6"/></g>`;

  /* ---------- S1. Комната ночью, 21:00 ---------- */
  $('#s1').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#273055')}
    ${R(0, 1180, 1080, 740, '#1f2746')}
    <g transform="translate(80 230)">
      ${R(0, 0, 460, 560, '#0f1630', `${st} rx="10"`)}
      <circle cx="320" cy="150" r="70" fill="#fff4c9"/><circle cx="350" cy="130" r="62" fill="#0f1630"/>
      <circle cx="90" cy="110" r="5" fill="#fff"/><circle cx="170" cy="250" r="4" fill="#fff"/><circle cx="380" cy="360" r="5" fill="#fff"/><circle cx="110" cy="420" r="3" fill="#fff"/>
      <path d="M230,0 L230,560 M0,280 L460,280" ${st}/>
      <path d="M-40,-20 Q40,250 -10,600 L-60,600 L-60,-20Z" fill="#7a3b4f" ${st}/>
      <path d="M500,-20 Q420,250 470,600 L520,600 L520,-20Z" fill="#7a3b4f" ${st}/>
      ${R(-70, -40, 600, 30, '#5b2d3c', `${st} rx="12"`)}
    </g>
    <g id="clock" transform="translate(640 330)">
      ${R(0, 0, 330, 150, '#121218', `${st} rx="22"`)}
      <text x="165" y="110" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="104" fill="#ff3b4e" style="filter:drop-shadow(0 0 12px #ff3b4e)">21:00</text>
    </g>
    <path id="lampLight" d="M880,640 L620,1360 L1080,1360 L1080,800Z" fill="#ffd36b" opacity=".18"/>
    <g transform="translate(860 560)"><path d="M-70,80 L70,80 L40,0 L-40,0Z" fill="#f2c94c" ${st}/><path d="M0,80 L20,180" ${st}/></g>
    ${at(500, 900, 1.35, C.kira({ id: 'k1', mood: 'sad' }))}
    ${R(-20, 1340, 1120, 70, '#8a5a3c', st)}
    ${R(-20, 1410, 1120, 520, '#6e4630', st)}
    <path d="M60,1500 L1020,1500 M60,1640 L1020,1640" stroke="#5a3826" stroke-width="8"/>
    <g id="ph1g" transform="translate(760 1335)"><g id="ph1">
      <ellipse id="ph1glow" cx="0" cy="0" rx="200" ry="70" fill="#7fb6ff" opacity="0"/>
      ${R(-120, -30, 240, 60, '#1b1a22', `${st} rx="20"`)}
      ${R(-104, -22, 208, 44, '#2a3350', 'rx="12" id="ph1scr"')}
      <g id="buzz" opacity="0" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round">
        <path d="M-160,-40 q-20,40 0,80 M-190,-60 q-30,60 0,120 M160,-40 q20,40 0,80 M190,-60 q30,60 0,120"/></g>
    </g></g>
  `);

  /* ---------- S2–S3. Чат «Кира-шоу» в руках ---------- */
  $('#s2').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#1d2238')}
    <circle cx="540" cy="900" r="700" fill="#2a3158"/>
    <g id="ph2" transform="translate(190 150)">${C.phone(700, 1440, '#eef1f7')}</g>
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f2c9ad" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f2c9ad" ${st}/>
    ${R(140, 1820, 800, 120, '#2f3d6b', st)}
  `) + `<div class="scr" id="scr2" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px">
      <div class="bar"><span>21:00</span><span>LTE 37%</span></div>
      <div class="head"><span style="font:700 50px/1 var(--font-text);color:#2f5bea">‹</span><div class="ava">КШ</div>
        <div><div class="ttl">Кира-шоу 🤡</div><div class="sub"><span id="cnt43">43</span> участника</div></div></div>
      <div class="msg" id="m1" style="top:250px"><b style="color:#e5304a">Дима</b>ну что, начинаем?)</div>
      <div class="msg" id="m2" style="top:370px"><b style="color:#2f9e5b">Лера</b>ахахах она опять одна сидит</div>
      <div class="msg" id="m3" style="top:490px;padding:12px">
        <b style="color:#8e5bff;padding:0 10px">Артём · фото</b>
        <svg width="440" height="300" viewBox="0 30 490 340" style="display:block;border-radius:20px">
          <rect width="490" height="370" fill="#bcd6c6"/><rect y="250" width="490" height="120" fill="#a0846b"/>
          <g transform="translate(245 170) scale(.5)">${C.kira({ id: 'kp', mood: 'sad' })}</g>
          <rect y="250" width="490" height="120" fill="#b59575" stroke="${K}" stroke-width="5"/>
          <rect x="150" y="268" width="190" height="70" rx="12" fill="#e9e3d8" stroke="${K}" stroke-width="4"/>
          <rect width="490" height="370" fill="none" stroke="${K}" stroke-width="6"/>
          <rect width="490" height="370" fill="#fff" opacity=".08"/>
        </svg>
        <div id="cens" style="display:flex;gap:10px;padding:14px 10px 4px"><i style="width:120px;height:34px;background:#1b1d26;border-radius:6px"></i><i style="width:90px;height:34px;background:#1b1d26;border-radius:6px"></i><i style="width:150px;height:34px;background:#1b1d26;border-radius:6px"></i></div>
      </div>
      <div style="position:absolute;left:0;right:0;bottom:0;height:130px;background:#fff;border-top:2px solid #dde2ea;display:flex;align-items:center;padding:0 30px;gap:20px"><div style="flex:1;height:72px;border-radius:36px;background:#eef1f7;font:500 30px/72px Onest;color:#9aa3b5;padding-left:28px">Сообщение</div><div style="width:72px;height:72px;border-radius:50%;background:#2f5bea"></div></div>
      <div class="react" id="rx" style="left:330px;top:830px">${laugh(64)}<span id="cnt112">112</span></div>
    </div>
    <div class="stamp" id="stamp7" style="left:180px;top:700px">7 «Б»</div>
    <div id="lol" class="abs" style="inset:0">${[[110, 520], [860, 440], [920, 1010], [80, 1180], [870, 1420], [150, 820]].map(([x, y], i) => `<div class="abs lolf" style="left:${x}px;top:${y}px;transform:rotate(${(i % 2 ? 1 : -1) * 14}deg)">${laugh(110)}</div>`).join('')}</div>`;

  /* ---------- S4. Столовая ---------- */
  $('#s4').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#cfe3d6')}
    ${[...Array(12)].map((_, i) => `<path d="M0,${i * 110} L1080,${i * 110}" stroke="#b8d1c2" stroke-width="5"/>`).join('')}
    ${R(0, 1100, 1080, 820, '#9bb9a8')}
    ${R(620, 260, 420, 300, '#f7f1e3', `${st} rx="10"`)}
    <text data-small x="830" y="350" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="56" fill="${K}">СТОЛОВАЯ</text>
    <text data-small x="830" y="430" text-anchor="middle" font-family="Onest" font-weight="500" font-size="38" fill="#5b6b78">обед 11:40–12:20</text>
    ${kid(160, 620, .62, '#5a7bd8')}${kid(330, 660, .55, '#d86a5a')}${kid(900, 700, .6, '#7a5ad8')}
    ${R(-20, 880, 1120, 40, '#7b8f84', st)}
    ${at(540, 930, 1.15, C.kira({ id: 'k4', mood: 'sad' }))}
    ${R(-20, 1330, 1120, 80, '#d8c3a2', st)}
    ${R(-20, 1410, 1120, 520, '#c2a985', st)}
    <g transform="translate(540 1335)"><g id="tray">
      ${R(-260, -40, 520, 80, '#e46a4a', `${st} rx="16"`)}
      <ellipse cx="-120" cy="-30" rx="110" ry="40" fill="#fff" ${st}/><ellipse cx="-120" cy="-34" rx="80" ry="24" fill="#e2a64a"/>
      ${R(20, -70, 90, 60, '#e9d3a5', `${st} rx="14"`)}
      ${R(160, -130, 70, 120, '#f3a0b0', `${st} rx="10"`)}
    </g></g>
  `) + `<div id="haha" class="abs" style="inset:0">
      <div class="pill abs" style="left:60px;top:470px;background:#fff;color:#211d2b;border:5px solid #211d2b">ха-ха</div>
      <div class="pill abs" style="left:780px;top:560px;background:#fff;color:#211d2b;border:5px solid #211d2b">смотри, ест</div></div>`;

  /* ---------- S5. Кухня: мама и Кира ---------- */
  $('#s5').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#f3e1c4')}
    ${[...Array(9)].map((_, i) => `<path d="M${i * 130},0 L${i * 130},1920" stroke="#ead2ad" stroke-width="40"/>`).join('')}
    <g transform="translate(380 200)">${R(0, 0, 320, 320, '#bfe3ff', `${st} rx="8"`)}<path d="M160,0 L160,320 M0,160 L320,160" ${st}/></g>
    <path d="M540,0 L540,120" ${st}/><path d="M440,200 Q540,90 640,200Z" fill="#e5304a" ${st}/>
    ${R(860, 330, 260, 1000, '#ffffff', `${st} rx="24"`)}<path d="M860,700 L1120,700 M890,520 L890,640 M890,760 L890,900" ${st}/>
    ${at(290, 920, 1.0, C.mom({ id: 'm5', mood: 'worried' }))}
    ${at(790, 980, .92, C.kira({ id: 'k5', mood: 'neutral' }))}
    ${R(-20, 1350, 1120, 80, '#ffffff', st)}${R(-20, 1430, 1120, 500, '#e7d2b7', st)}
    <path d="M-20,1390 L1100,1390" stroke="#e5304a" stroke-width="18" stroke-dasharray="40 40"/>
    <g transform="translate(300 1330)"><path d="M-60,0 L-50,-90 L50,-90 L60,0Z" fill="#fff" ${st}/><path d="M50,-70 q50,10 40,40 q-10,20 -45,15" fill="none" ${st}/></g>
  `) + bubble('b5a', 'МАМА', 'Как дела?', 90, 380, 120, '#e5743c') + bubble('b5b', 'КИРА', 'Нормально.', 520, 520, 220, '#2f5bea');

  /* ---------- S6. Телефон экраном вниз ---------- */
  $('#s6').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#f3e1c4')}
    ${at(250, 470, .85, C.mom({ id: 'm6', mood: 'worried' }))}
    ${R(-20, 820, 1120, 1120, '#c98d5a', st)}
    ${[...Array(6)].map((_, i) => `<path d="M-20,${960 + i * 170} L1100,${960 + i * 170}" stroke="#b07646" stroke-width="7"/>`).join('')}
    <g transform="translate(600 1300)"><g id="ph6g"><g id="ph6">
      ${R(-170, -330, 340, 660, '#1b1a22', `${st} rx="50"`)}
      <g id="ph6front">${R(-150, -310, 300, 620, '#2a3360', 'rx="38"')}
        <rect x="-120" y="-200" width="240" height="90" rx="20" fill="#fff" opacity=".85"/>
        <rect x="-120" y="-90" width="240" height="90" rx="20" fill="#fff" opacity=".7"/>
        <text x="0" y="-240" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="60" fill="#fff">21:47</text></g>
      <g id="ph6back" opacity="0">${R(-150, -310, 300, 620, '#e9e4ee', 'rx="38"')}
        ${R(-130, -290, 120, 160, '#1b1a22', `rx="30"`)}<circle cx="-100" cy="-250" r="24" fill="#3b3f55"/><circle cx="-45" cy="-180" r="24" fill="#3b3f55"/>
        <circle cx="0" cy="40" r="44" fill="none" stroke="#bdb6c8" stroke-width="8"/></g>
    </g></g></g>
    <path d="M760,1920 Q720,1650 820,1520 Q900,1440 960,1520 Q1000,1700 1000,1920Z" fill="#f7d5bd" ${st} id="hand6"/>
    ${R(760, 1840, 260, 100, '#2f3d6b', st)}
  `);

  /* ---------- S7. Ночь, кровать, телефон вибрирует ---------- */
  $('#s7').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#121830')}
    <path d="M0,300 L380,300 L700,1920 L0,1920Z" fill="#2c3c78" opacity=".35"/>
    ${R(-20, 1050, 820, 900, '#3b4a86', st)}
    <path d="M-40,880 Q200,760 520,840 Q560,900 520,960 L-40,1000Z" fill="#e8ecf7" ${st}/>
    <g transform="translate(260 880) scale(.9)"><g class="breath">${C.kira({ id: 'k7', mood: 'worried', body: false })}</g></g>
    <path d="M-40,1060 Q300,980 820,1080 L820,1940 L-40,1940Z" fill="#5468b8" ${st}/>
    <path d="M60,1200 Q300,1150 600,1220 M40,1400 Q300,1340 700,1430" fill="none" stroke="#4357a0" stroke-width="12"/>
    ${R(760, 1100, 340, 840, '#6e4630', st)}${R(740, 1080, 380, 60, '#8a5a3c', st)}
    <g id="ph7g" transform="translate(910 1060)"><g id="ph7">
      <ellipse id="ph7glow" cx="0" cy="10" rx="210" ry="60" fill="#8ec2ff" opacity="0"/>
      ${R(-120, -26, 240, 52, '#e9e4ee', `${st} rx="18"`)}
      <g id="buzz7" opacity="0" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M-150,-30 q-20,30 0,60 M150,-30 q20,30 0,60 M-180,-50 q-30,50 0,100 M180,-50 q30,50 0,100"/></g>
    </g></g>
  `) + `<div id="badge" class="abs" style="left:820px;top:880px;min-width:160px;height:120px;border-radius:60px;background:#e5304a;border:7px solid #211d2b;color:#fff;font:900 76px/106px Rubik;text-align:center;padding:0 22px"><span id="cnt200">200</span></div>`;

  /* ---------- S8. Экран: сообщение с незнакомого номера ---------- */
  $('#s8').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#0b0e1c')}
    <g transform="translate(130 120)">${C.phone(820, 1640, '#141a33')}</g>
    <path d="M90,1920 Q80,1560 190,1440 Q250,1400 270,1500 L270,1920Z" fill="#f2c9ad" ${st}/>
    <path d="M990,1920 Q1000,1560 890,1440 Q830,1400 810,1500 L810,1920Z" fill="#f2c9ad" ${st}/>
    <rect id="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>
  `) + `<div id="lock" class="abs" style="left:170px;top:160px;width:740px;height:1560px;color:#fff;text-align:center">
      <div style="font:600 40px/1 Onest;margin-top:110px;opacity:.8">среда, 14 ноября</div>
      <div style="font:800 210px/1 Rubik;margin-top:10px">02:47</div></div>
    <div class="notif" data-small id="n1" style="left:170px;width:740px;top:500px;opacity:.55"><b>Кира-шоу 🤡</b>Лера: завтра в столовой, все смотрим 😂</div>
    <div class="notif" data-small id="n2" style="left:170px;width:740px;top:650px;opacity:.55"><b>Кира-шоу 🤡</b>Дима: 📸 Фото</div>
    <div class="notif" data-small id="n3" style="left:170px;width:740px;top:820px;background:#fff;box-shadow:0 0 0 7px #e5304a">
      <b style="color:#e5304a">Неизвестный номер</b><span style="color:#6a7385">+7 9•• •••-••-••</span>
      <div id="typing" style="margin-top:14px;font:900 50px/1 Rubik;color:#9aa3b5;letter-spacing:.2em">•••</div>
      <div id="threat" style="margin-top:6px;font:800 64px/1.05 Rubik;color:#211d2b">Завтра будет смешнее.</div></div>`;

  /* ---------- S9. Утро, мама в дверях ---------- */
  $('#s9').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#e7eef5')}
    <path d="M0,0 L420,0 L1080,900 L1080,1300Z" fill="#fff6d6" opacity=".55"/>
    ${R(170, 260, 740, 1500, '#c4a27e', st)}${R(220, 310, 640, 1450, '#3a2f48', '')}
    ${R(-20, 1700, 1120, 260, '#b9c6d6', st)}
    ${at(540, 860, 1.35, C.mom({ id: 'm9', mood: 'firm' }))}
    <g transform="translate(860 300) rotate(8)">${R(0, 0, 230, 1480, '#d9b88f', st)}<circle cx="40" cy="760" r="20" fill="#f2c94c" ${st}/></g>
  `) + bubble('b9', 'МАМА', 'Кира… что<br>с телефоном?', 330, 300, 120, '#e5743c');

  /* ---------- S10. Выбор ---------- */
  $('#s10').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#2a3156')}
    <circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, C.kira({ id: 'k10', mood: 'worried' }))}
  `) + `<div class="pill" id="q10" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#2F5BEA"><span class="n">1</span><h3>Сказать<br>правду</h3><p>мама пойдёт в школу… а вдруг станет хуже?</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#E5304A"><span class="n">2</span><h3>Промол&shy;чать</h3><p>снова «нормально»… а завтра — смешнее</p></div>
    <div class="pill" id="cm10" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S11. Финальная плашка ---------- */
  $('#s11').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="help" style="left:110px;top:400px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:56px 40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:700 46px/1.2 Onest;letter-spacing:.06em;color:#9fe8bf">ЕСЛИ ТЕБЯ ТРАВЯТ</div>
      <div style="font:900 84px/1.05 Rubik;margin-top:12px">ЭТО НЕ НОРМА</div>
      <div style="font:500 46px/1.2 Onest;margin-top:26px;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:24px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div>
      <div style="font:500 44px/1.25 Onest;margin-top:24px;color:#9fb">бесплатно · анонимно<br>круглосуточно</div></div>
    <div class="abs" id="part2" style="left:50%;top:1110px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
