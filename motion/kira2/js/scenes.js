// «Кира-шоу. Часть 2: сказать правду». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner, id = '') => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath" ${id ? `id="${id}"` : ''}>${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const bubble = (id, tag, text, x, y, tailX = 60, tagColor = '#7b4dff') =>
    `<div class="bub" id="${id}" style="left:${x}px;top:${y}px"><span class="tag" style="background:${tagColor}">${tag}</span>${text}<i class="tail" style="left:${tailX}px"></i></div>`;
  const hands = `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f7d5bd" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f7d5bd" ${st}/>
    ${R(140, 1820, 800, 120, '#2f3d6b', st)}`;
  const phoneBg = (c1, c2) => `${R(0, 0, 1080, 1920, c1)}<circle cx="540" cy="900" r="700" fill="${c2}"/><g transform="translate(190 150)">${C.phone(700, 1440, '#eef1f7')}</g>${hands}`;
  const scr = (id, inner, bg = '#eef1f7') => `<div class="scr" id="${id}" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:${bg}">${inner}</div>`;
  const ava = (txt, c) => `<div class="ava" style="background:${c}">${txt}</div>`;
  const heart = (s = 40, c = '#E5304A') => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" style="vertical-align:-6px"><path d="M20,35 L6,21 Q-1,13 6,7 Q13,2 20,10 Q27,2 34,7 Q41,13 34,21Z" fill="${c}" stroke="#211d2b" stroke-width="3"/></svg>`;
  const kitchenNight = `
    ${R(0, 0, 1080, 1920, '#3a3550')}
    ${[...Array(9)].map((_, i) => `<path d="M${i * 130},0 L${i * 130},1920" stroke="#34304a" stroke-width="40"/>`).join('')}
    <g transform="translate(380 200)">${R(0, 0, 320, 320, '#0f1630', `${st} rx="8"`)}<circle cx="230" cy="90" r="40" fill="#fff4c9"/><path d="M160,0 L160,320 M0,160 L320,160" ${st}/></g>
    <path d="M540,0 L540,120" ${st}/><path d="M440,200 Q540,90 640,200Z" fill="#e5304a" ${st}/>
    <path d="M440,200 L300,1350 L780,1350 L640,200Z" fill="#ffd36b" opacity=".12"/>`;

  /* ---------- S0. «Вы выбрали» ---------- */
  $('#s0').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2a3156')}<circle cx="540" cy="1000" r="640" fill="#343c69"/>`) + `
    <div class="pill abs" id="p2" style="left:50%;top:300px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;border:6px solid #fff;font-size:64px;padding:16px 36px">ЧАСТЬ 2</div>
    <div class="card" id="c0" style="left:240px;top:520px;width:520px;background:#2F5BEA"><span class="n">1</span><h3>Сказать<br>правду</h3><p>мама пойдёт в школу</p></div>
    <div class="stamp" id="st0" style="left:170px;top:930px;font-size:84px;border-width:10px;color:#27C46B;border-color:#27C46B;background:rgba(10,30,20,.85)">ВЫ ВЫБРАЛИ</div>
    ${[['1', 120, 450, -8], ['1!!!', 820, 420, 10], ['конечно 1', 90, 1440, 6], ['1, пусть знает', 560, 1560, -6], ['1 💯', 160, 1600, 4], ['только 1', 720, 1420, -4]].map(([t, x, y, r]) =>
      `<div class="abs cm" style="left:${x}px;top:${y}px;transform:rotate(${r}deg);background:#fff;color:#211d2b;border:5px solid #211d2b;border-radius:26px 26px 26px 6px;padding:12px 22px;font:800 40px/1 Rubik;white-space:nowrap">${t}</div>`).join('')}`;

  /* ---------- S1. Кухня ночью: телефон маме ---------- */
  $('#s1').innerHTML = svg(`
    ${kitchenNight}
    <g id="clk1" transform="translate(800 330)">${R(0, 0, 220, 110, '#121218', `${st} rx="18"`)}
      <text id="clkt" x="110" y="80" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="70" fill="#ff3b4e">21:10</text></g>
    ${at(300, 920, 1.0, C.mom({ id: 'm1', mood: 'worried' }))}
    ${at(790, 980, .92, C.kira({ id: 'k1', mood: 'sad' }))}
    ${R(-20, 1350, 1120, 80, '#ffffff', st)}${R(-20, 1430, 1120, 500, '#d9c4a8', st)}
    <path d="M-20,1390 L1100,1390" stroke="#e5304a" stroke-width="18" stroke-dasharray="40 40"/>
    <g transform="translate(700 1250)"><g id="ph1">${R(-60, -110, 120, 220, '#1b1a22', `${st} rx="22"`)}${R(-50, -100, 100, 200, '#bfe0ff', 'rx="14"')}</g></g>
  `);

  /* ---------- S2. Скриншоты ---------- */
  $('#s2').innerHTML = svg(phoneBg('#1d2238', '#2a3158')) + scr('scr2', `
      <div class="bar"><span>21:24</span><span>LTE 31%</span></div>
      <div style="padding:30px 36px 10px;font:800 46px/1.1 Rubik">Скриншоты · <span id="cnt47">47</span></div>
      <div id="grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:10px 30px">
        ${[...Array(24)].map((_, i) => `<div class="th" style="height:200px;border-radius:12px;background:#fff;border:3px solid #d4d9e3;padding:12px;display:flex;flex-direction:column;gap:8px">
          <i style="height:16px;width:${50 + (i * 37) % 40}%;background:${['#e5304a', '#2f9e5b', '#8e5bff'][i % 3]};border-radius:4px;opacity:.6"></i>
          <i style="height:26px;width:${60 + (i * 23) % 35}%;background:#dfe3ea;border-radius:8px"></i>
          <i style="height:26px;width:${40 + (i * 13) % 50}%;background:#dfe3ea;border-radius:8px"></i>
          <i style="height:60px;width:80%;background:#bcd6c6;border-radius:8px"></i></div>`).join('')}
      </div>`) + `<div id="flash" class="abs" style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:#fff;opacity:0"></div>`;

  /* ---------- S3. Школа, утро ---------- */
  $('#s3').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#bfe3ff')}
    <circle cx="880" cy="200" r="90" fill="#fff1a8"/>
    ${R(60, 330, 960, 900, '#e9b48a', st)}
    ${R(330, 260, 420, 110, '#f7f1e3', `${st} rx="14"`)}
    <text x="540" y="340" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="64" fill="${K}">ШКОЛА №17</text>
    ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => R(120 + c * 230, 430 + r * 230, 150, 160, '#bfe3ff', `${st} rx="8"`)).join('')).join('')}
    ${R(430, 1000, 220, 230, '#7a4b33', st)}
    ${R(-20, 1220, 1120, 720, '#9aa6b5', st)}
    <path d="M-20,1500 L1100,1500" stroke="#8793a3" stroke-width="10"/>
    <g id="walk">${at(330, 1140, .95, C.mom({ id: 'm3', mood: 'firm' }))}${at(740, 1220, .85, C.kira({ id: 'k3', mood: 'neutral' }))}</g>
  `);

  /* ---------- S4. Кабинет: классная ---------- */
  const office = (id, extra = '') => `
    ${R(0, 0, 1080, 1920, '#d7e6dc')}
    ${R(80, 220, 920, 520, '#2f5a45', `${st} rx="10"`)}
    <text x="540" y="430" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="110" fill="#f3efe6" opacity=".85">Классный час</text>
    <path d="M200,560 L460,560 M600,560 L880,560" stroke="#f3efe6" stroke-width="6" opacity=".5"/>
    ${at(540, 1000, 1.15, C.mom({ id, mood: 'neutral', hair: '#b9b4ad', top: '#7b5ab0', glasses: true }), id + '-b')}
    ${R(-20, 1300, 1120, 80, '#a77450', st)}${R(-20, 1380, 1120, 560, '#8a5a3c', st)}
    ${R(120, 1220, 200, 90, '#e5304a', `${st} rx="8"`)}${R(140, 1150, 180, 76, '#2f5bea', `${st} rx="8"`)}
    ${extra}`;
  $('#s4').innerHTML = svg(office('t4', `<g transform="translate(780 1260) rotate(-8)">${R(-70, -120, 140, 240, '#1b1a22', `${st} rx="22"`)}${R(-60, -110, 120, 220, '#eef1f7', 'rx="14"')}</g>`))
    + bubble('b4', 'КЛАССНАЯ', 'Это просто дети.<br>Они шутят.', 210, 300, 260, '#7b5ab0');

  /* ---------- S5. Распечатки ---------- */
  $('#s5').innerHTML = svg(office('t5') + `
    <g id="papers">${[0, 1, 2, 3, 4].map(i => `<g transform="translate(${560 + i * 14} ${1330 - i * 8}) rotate(${-10 + i * 5})"><g class="sheet">
      ${R(-200, -120, 400, 250, '#ffffff', st)}
      ${R(-170, -95, 160, 18, '#e5304a', 'rx="4" opacity=".6"')}${R(-170, -60, 300, 26, '#dfe3ea', 'rx="8"')}${R(-170, -20, 220, 26, '#dfe3ea', 'rx="8"')}${R(-170, 20, 260, 70, '#bcd6c6', 'rx="8"')}</g></g>`).join('')}</g>
    <path d="M-60,1920 Q-40,1500 120,1380 Q240,1320 300,1420 L330,1920Z" fill="#c9786a" ${st}/>
    <path d="M250,1430 Q330,1340 420,1360 Q470,1390 430,1440 Q380,1480 300,1480Z" fill="#f3cdb2" ${st}/>
  `) + bubble('b5', 'МАМА', 'Тогда покажем<br>директору.<br>И полиции.', 120, 300, 120, '#e5743c');

  /* ---------- S6. Список чатов: «Кира-шоу» удалён ---------- */
  const row = (id, a, name, txt, extra = '') => `<div class="row" id="${id}" style="display:flex;align-items:center;gap:22px;padding:20px 30px;background:#fff;border-bottom:2px solid #e3e7ee;position:relative;${extra}">
      ${a}<div style="flex:1;min-width:0"><div style="font:800 40px/1.1 Rubik;white-space:nowrap">${name}</div><div style="font:500 30px/1.3 Onest;color:#6a7385;white-space:nowrap;overflow:hidden">${txt}</div></div></div>`;
  $('#s6').innerHTML = svg(phoneBg('#1d2238', '#2a3158')) + scr('scr6', `
      <div class="bar"><span>12:40</span><span>LTE 54%</span></div>
      <div style="padding:30px 36px 20px;font:800 56px/1 Rubik">Чаты</div>
      ${row('r1', ava('КШ', '#8e5bff'), 'Кира-шоу 🤡', 'Дима: она точно нажаловалась…').replace('</div></div></div>', '</div></div><div id="del" style="position:absolute;inset:0;background:#E5304A;color:#fff;display:flex;align-items:center;justify-content:center;font:900 52px/1 Rubik">ЧАТ УДАЛЁН</div></div>')}
      ${row('r2', ava('М', '#e5743c'), 'Мама', 'Я рядом. Всё правильно сделала')}
      ${row('r3', ava('А', '#e8a0b4'), 'Алина ' + heart(34), 'ты как? 🥺')}
      ${row('r4', ava('7Б', '#2f9e5b'), '7 «Б» (учебный)', 'Завтра контрольная по алгебре')}
`);

  /* ---------- S7. Комната, снова 21:00 ---------- */
  $('#s7').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#273055')}${R(0, 1180, 1080, 740, '#1f2746')}
    <g transform="translate(80 230)">${R(0, 0, 460, 560, '#0f1630', `${st} rx="10"`)}
      <circle cx="320" cy="150" r="70" fill="#fff4c9"/><circle cx="350" cy="130" r="62" fill="#0f1630"/>
      <path d="M230,0 L230,560 M0,280 L460,280" ${st}/>
      <path d="M-40,-20 Q40,250 -10,600 L-60,600 L-60,-20Z" fill="#7a3b4f" ${st}/><path d="M500,-20 Q420,250 470,600 L520,600 L520,-20Z" fill="#7a3b4f" ${st}/></g>
    <g id="clock" transform="translate(640 330)">${R(0, 0, 330, 150, '#121218', `${st} rx="22"`)}
      <text x="165" y="110" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="104" fill="#ff3b4e" style="filter:drop-shadow(0 0 12px #ff3b4e)">21:00</text></g>
    ${at(500, 900, 1.35, C.kira({ id: 'k7', mood: 'worried' }))}
    ${R(-20, 1340, 1120, 70, '#8a5a3c', st)}${R(-20, 1410, 1120, 520, '#6e4630', st)}
    <g transform="translate(760 1335)"><g id="ph7">
      <ellipse id="ph7glow" cx="0" cy="0" rx="200" ry="70" fill="#ff8a9a" opacity="0"/>
      ${R(-120, -30, 240, 60, '#1b1a22', `${st} rx="20"`)}${R(-104, -22, 208, 44, '#ffb3bf', 'rx="12"')}
      <g id="buzz7" opacity="0" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><path d="M-160,-40 q-20,40 0,80 M-190,-60 q-30,60 0,120 M160,-40 q20,40 0,80 M190,-60 q30,60 0,120"/></g>
    </g></g>`);

  /* ---------- S8. Новый чат ---------- */
  $('#s8').innerHTML = svg(phoneBg('#2a0f18', '#3a1420') + `<rect id="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>`) + scr('scr8', `
      <div class="bar"><span>21:00</span><span>LTE 37%</span></div>
      <div class="head"><span style="font:700 50px/1 Onest;color:#2f5bea">‹</span>${ava('КС', '#E5304A')}
        <div><div class="ttl">Кира-стукачка 🐀</div><div class="sub"><span id="cnt43">43</span> участника</div></div></div>
      <div style="text-align:center;margin-top:30px"><span id="sys8" style="display:inline-block;background:#dfe3ea;color:#6a7385;border-radius:20px;padding:10px 22px;font:600 28px/1 Onest">Алина создала чат</span></div>
      <div class="msg" id="am" style="top:330px;display:flex;gap:16px;align-items:flex-start;max-width:560px">
        <div style="width:80px;height:80px;border-radius:50%;background:#e8a0b4;border:4px solid #211d2b;flex:none;display:grid;place-items:center;font:900 36px/1 Rubik;color:#fff">А</div>
        <div><b style="color:#d4467a">Алина ${heart(26)}</b><span style="font:700 40px/1.2 Onest">сорри. так надо.</span></div></div>`);

  /* ---------- S8b. Лицо Киры ---------- */
  $('#s8b').innerHTML = svg(`${R(0, 0, 1080, 1920, '#140e1e')}<circle cx="540" cy="1000" r="560" fill="#ff8a9a" opacity=".16"/>
    ${at(540, 860, 2.1, C.kira({ id: 'k8', mood: 'shock' }))}`)
    + `<div class="abs" id="bf" style="left:50%;top:300px;transform:translateX(-50%) rotate(-4deg);background:#fff;color:#211d2b;border:7px solid #211d2b;border-radius:22px;padding:16px 30px;font:900 56px/1.05 Rubik;white-space:nowrap">Алина ${heart(48)} лучшая подруга</div>`;

  /* ---------- S9. Выбор ---------- */
  $('#s9').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2a3156')}<circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, C.kira({ id: 'k9', mood: 'worried' }))}`) + `
    <div class="pill" id="q9" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО СДЕЛАЕТ КИРА?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#d4467a"><span class="n">1</span><h3>Написать<br>Алине</h3><p>вдруг её заставили?</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#2F5BEA"><span class="n">2</span><h3>Снова<br>к маме</h3><p>а если станет только хуже?</p></div>
    <div class="pill" id="cm9" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S10. Финал ---------- */
  $('#s10').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="help" style="left:110px;top:400px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:56px 40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:700 46px/1.2 Onest;letter-spacing:.06em;color:#9fe8bf">РАССКАЗАТЬ — ЭТО НЕ СТУКАЧЕСТВО</div>
      <div style="font:900 84px/1.05 Rubik;margin-top:12px">ЭТО ЗАЩИТА</div>
      <div style="font:500 46px/1.2 Onest;margin-top:26px;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:24px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div>
      <div style="font:500 44px/1.25 Onest;margin-top:24px;color:#9fb">бесплатно · анонимно<br>круглосуточно</div></div>
    <div class="abs" id="part3" style="left:50%;top:1110px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 3</div>`;
})();
