// «Он всегда знал, где она». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const SONYA = { hair: '#e8c27a', hair2: '#c9a25a', jacket: '#e88aa8', hoodie: true, tail: true };
  const DASHA = { hair: '#b8492f', hair2: '#8e3622', jacket: '#4f9ed8', hoodie: true };
  const MAX = { hair: '#1f1a1a', top: '#2a2a33', top2: '#1e1e26' };
  const sonya = (id, mood) => C.kira(Object.assign({ id, mood }, SONYA));
  const hands = `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f7d5bd" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f7d5bd" ${st}/>
    ${R(140, 1820, 800, 120, '#e88aa8', st)}`;
  const phoneBg = (c1, c2) => `${R(0, 0, 1080, 1920, c1)}<circle cx="540" cy="900" r="700" fill="${c2}"/><g transform="translate(190 150)">${C.phone(700, 1440, '#eef1f7')}</g>${hands}`;
  const scr = (id, inner, bg = '#eef1f7') => `<div class="scr" id="${id}" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:${bg}">${inner}</div>`;
  const heart = (s = 40, c = '#E5304A') => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" style="vertical-align:-6px"><path d="M20,35 L6,21 Q-1,13 6,7 Q13,2 20,10 Q27,2 34,7 Q41,13 34,21Z" fill="${c}" stroke="#211d2b" stroke-width="3"/></svg>`;
  let avaN = 0;
  const maxAva = (s = 96) => `<svg width="${s}" height="${s}" viewBox="-160 -190 320 320" style="border-radius:50%;background:#9db8d9;border:4px solid #211d2b;flex:none">${C.boy(Object.assign({ id: 'mx' + (avaN++), mood: 'neutral', body: false }, MAX))}</svg>`;
  const notif = (id, text, top, extra = '') => `<div class="notif abs" id="${id}" data-small style="left:130px;width:820px;top:${top}px;background:#fff;display:flex;gap:20px;align-items:center;${extra}">
      ${maxAva(90)}<div><b style="color:#211d2b">Макс ${heart(28)}</b><span style="font:700 40px/1.2 Onest">${text}</span></div></div>`;
  const pin = `<g><path d="M0,0 C-70,-70 -70,-160 0,-160 C70,-160 70,-70 0,0Z" fill="#E5304A" ${st}/><circle cx="0" cy="-105" r="38" fill="#fff" ${st} stroke-width="5"/><text x="0" y="-92" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="40" fill="${K}">С</text></g>`;

  /* ---------- S1. Карта ---------- */
  const map = `
    ${R(0, 0, 1080, 1920, '#e9efe6')}
    ${R(80, 160, 300, 260, '#cfe6c4', 'rx="30"')}${R(640, 1100, 360, 300, '#cfe6c4', 'rx="30"')}
    <path d="M700,0 Q760,600 1080,760 L1080,960 Q700,780 560,0Z" fill="#bfe0ff"/>
    <g fill="none" stroke="#fff" stroke-linecap="round"><path d="M-20,520 L1100,600 M-20,1000 L1100,940 M-20,1500 L1100,1560 M300,-20 L240,1940 M760,-20 L820,1940" stroke-width="58"/>
      <path d="M-20,760 L1100,780 M-20,1260 L1100,1240 M520,-20 L540,1940" stroke-width="30"/></g>
    ${[[110, 650, 140, 300], [420, 650, 80, 300], [600, 650, 120, 240], [110, 1060, 140, 160], [600, 1300, 140, 160], [880, 640, 160, 240], [380, 1060, 120, 380], [110, 1600, 400, 240], [880, 1650, 160, 200]].map(([x, y, w, h]) => R(x, y, w, h, '#dfe3dc', 'rx="16"')).join('')}`;
  $('#s1').innerHTML = svg(`${map}
    <path id="trail" d="M260,1700 L250,1250 L540,1250 L530,1000 L810,950 L790,600" fill="none" stroke="#E5304A" stroke-width="12" stroke-dasharray="4 26" stroke-linecap="round"/>
    <g id="pinmove"><circle id="ring1" cx="0" cy="0" r="40" fill="none" stroke="#E5304A" stroke-width="8" opacity="0"/>${pin}</g>`) + `
    <div class="pill abs" id="watch" style="left:50%;top:300px;transform:translateX(-50%);display:flex;gap:16px;align-items:center;background:#fff;color:#211d2b;border:6px solid #211d2b;font-size:46px">
      <svg width="56" height="40" viewBox="0 0 56 40"><path d="M2,20 Q28,-8 54,20 Q28,48 2,20Z" fill="#fff" stroke="#211d2b" stroke-width="4"/><circle cx="28" cy="20" r="10" fill="#211d2b"/></svg>Макс видит: Соня</div>
    <div class="pill abs" id="upd" style="left:50%;top:420px;transform:translateX(-50%);background:#E5304A;font-size:36px">обновлено только что</div>`;

  /* ---------- S2. У Даши ---------- */
  $('#s2').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#f6e4ef')}
    ${[...Array(10)].map((_, i) => `<circle cx="${80 + (i % 5) * 230}" cy="${180 + Math.floor(i / 5) * 260}" r="16" fill="#efc9de"/>`).join('')}
    ${R(620, 260, 360, 260, '#ffffff', `${st} rx="12"`)}<text x="800" y="410" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="80" fill="#d4467a">best friends</text>
    ${at(290, 980, .9, C.kira(Object.assign({ id: 'd2', mood: 'neutral' }, DASHA)))}
    ${at(770, 1000, .95, sonya('s2', 'neutral'))}
    ${R(-20, 1330, 1120, 610, '#a56bb0', st)}<path d="M-20,1400 Q540,1340 1100,1400" fill="none" stroke="#8d579a" stroke-width="16"/>
    <g transform="translate(800 1300) rotate(10)">${R(-60, -110, 120, 220, '#1b1a22', `${st} rx="22"`)}${R(-50, -100, 100, 200, '#bfe0ff', 'rx="14"')}</g>`)
    + notif('n2', 'Ты у Даши? Передай привет 🙂', 420);

  /* ---------- S3. Бассейн ---------- */
  $('#s3').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#d9f0f7')}
    ${[...Array(16)].map((_, i) => `<path d="M0,${i * 90} L1080,${i * 90}" stroke="#c3e3ee" stroke-width="5"/>`).join('')}${[...Array(12)].map((_, i) => `<path d="M${i * 90},0 L${i * 90},1300" stroke="#c3e3ee" stroke-width="5"/>`).join('')}
    ${at(540, 960, 1.15, sonya('s3', 'worried'))}
    <path d="M-20,1300 Q200,1260 400,1300 T800,1300 T1100,1300 L1100,1940 L-20,1940Z" fill="#3ab0e2" ${st}/>
    <path id="wave" d="M-20,1380 Q200,1340 400,1380 T800,1380 T1200,1380" fill="none" stroke="#9fe0fa" stroke-width="14"/>
    <path d="M-20,1520 Q200,1480 400,1520 T800,1520 T1200,1520" fill="none" stroke="#7fd0f2" stroke-width="12"/>
    ${R(-20, 1250, 1120, 50, '#ffffff', st)}`)
    + notif('n3', 'Почему ты в бассейне?<br>Ты же сказала — дома.', 330);

  /* ---------- S4. «Это любовь» ---------- */
  $('#s4').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#ffd9e6')}<circle cx="540" cy="1000" r="600" fill="#ffc6da"/>
    ${at(540, 1000, 1.2, sonya('s4', 'neutral'))}
    <g id="thought"><circle cx="760" cy="700" r="22" fill="#fff" ${st} stroke-width="5"/><circle cx="820" cy="610" r="34" fill="#fff" ${st} stroke-width="5"/>
      <ellipse cx="760" cy="400" rx="230" ry="190" fill="#fff" ${st}/></g>`)
    + `<div class="abs" id="maxph" style="left:590px;top:250px;width:340px;text-align:center">${maxAva(200)}<div style="font:900 50px/1 Rubik;color:#211d2b;margin-top:10px">Макс ${heart(42)}</div></div>
    <div id="hearts" class="abs" style="inset:0">${[[120, 520, 90], [260, 300, 60], [90, 900, 70], [900, 980, 80], [180, 1480, 60], [860, 1500, 90]].map(([x, y, s]) => `<div class="abs hh" style="left:${x}px;top:${y}px">${heart(s, '#ff5a8a')}</div>`).join('')}</div>`;

  /* ---------- S5. Настройки ---------- */
  const srow = (id, icon, c, name, extra = '') => `<div class="srow" id="${id}" style="display:flex;align-items:center;gap:22px;padding:24px 30px;background:#fff;border-bottom:2px solid #e3e7ee;font:600 40px/1 Onest;${extra}">
      <div style="width:70px;height:70px;border-radius:18px;background:${c};display:grid;place-items:center;color:#fff;font:900 36px/1 Rubik">${icon}</div><span style="flex:1">${name}</span><span style="color:#9aa3b5">›</span></div>`;
  $('#s5').innerHTML = svg(phoneBg('#2a1f3a', '#3a2c52')) + scr('scr5', `
      <div class="bar"><span>21:48</span><span>LTE 62%</span></div>
      <div style="padding:30px 36px 20px;font:800 56px/1 Rubik">Настройки</div>
      ${srow('q1', 'W', '#2f5bea', 'Wi-Fi')}${srow('q2', 'З', '#E5304A', 'Звуки')}${srow('q3', 'К', '#6a7385', 'Конфиденциальность')}${srow('q4', 'Г', '#27C46B', 'Геолокация')}${srow('q5', 'А', '#f2994a', 'Аккаунты')}`)
    + `<svg class="abs" id="dhand" viewBox="0 0 400 400" style="left:640px;top:1160px;width:400px;height:400px"><path d="M120,400 Q90,250 160,180 Q200,140 240,170 L300,120 Q330,100 345,130 L280,220 Q330,300 300,400Z" fill="#f7d5bd" stroke="#211d2b" stroke-width="7" stroke-linejoin="round"/><rect x="100" y="360" width="240" height="60" fill="#4f9ed8" stroke="#211d2b" stroke-width="7"/></svg>`;

  /* ---------- S6. Доступ: всегда, с 1 сентября ---------- */
  $('#s6').innerHTML = svg(phoneBg('#2a1f3a', '#3a2c52')) + scr('scr6', `
      <div class="bar"><span>21:49</span><span>LTE 62%</span></div>
      <div style="padding:30px 36px 6px;font:800 50px/1.1 Rubik">Геолокация</div>
      <div style="padding:0 36px 20px;font:500 30px/1.3 Onest;color:#6a7385">Кто видит, где ты сейчас</div>
      <div id="acc" style="margin:0 24px;background:#fff;border-radius:28px;padding:24px;display:flex;gap:20px;align-items:center;box-shadow:0 0 0 6px #E5304A">
        ${maxAva(110)}<div style="flex:1"><div style="font:800 44px/1.1 Rubik">Макс ${heart(32)}</div>
        <div style="font:600 32px/1.3 Onest;color:#6a7385">доступ: <b id="alw" style="color:#E5304A">всегда</b></div>
        <div style="font:600 32px/1.3 Onest;color:#6a7385">с <b id="sep" style="color:#E5304A">01.09</b></div></div></div>
      <div style="padding:30px 36px 10px;font:800 38px/1 Rubik">История перемещений</div>
      <div id="hist">${[['08:12', 'Школа'], ['15:40', 'Бассейн «Волна»'], ['17:05', 'ул. Лесная, 8 · Даша'], ['19:30', 'Дом']].map(([t, p]) => `<div class="hi" style="display:flex;gap:22px;padding:16px 36px;font:600 34px/1.2 Onest"><span style="color:#E5304A;font-weight:800;width:110px">${t}</span>${p}</div>`).join('')}</div>`);

  /* ---------- S7. Выключить ---------- */
  $('#s7').innerHTML = svg(phoneBg('#1d2238', '#2a3158')) + scr('scr7', `
      <div class="bar"><span>21:59</span><span>LTE 61%</span></div>
      <div style="padding:30px 36px 20px;font:800 50px/1.1 Rubik">Доступ для «Макс»</div>
      <div style="margin:0 24px;background:#fff;border-radius:28px;padding:30px;display:flex;align-items:center;justify-content:space-between;font:700 42px/1.2 Onest">
        Делиться геопозицией
        <div id="tgl" style="position:relative;width:150px;height:84px;border-radius:42px;background:#27C46B;border:4px solid #211d2b;flex:none">
          <div id="knob" style="position:absolute;top:6px;left:72px;width:64px;height:64px;border-radius:50%;background:#fff;border:4px solid #211d2b"></div></div></div>
      <div id="off7" style="margin:30px 36px;font:700 36px/1.3 Onest;color:#6a7385">Макс больше не видит, где ты</div>`)
    + `<div class="abs" id="clk7" style="left:50%;top:220px;transform:translateX(-50%);background:#121218;border:7px solid #211d2b;border-radius:24px;padding:14px 34px;font:800 100px/1 Rubik;color:#ff3b4e;text-shadow:0 0 14px #ff3b4e">22:00</div>`;

  /* ---------- S8. «Что ты скрываешь?» ---------- */
  $('#s8').innerHTML = svg(phoneBg('#2a0f18', '#3a1420') + `<rect id="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>`) + scr('scr8', `
      <div class="bar"><span>22:01</span><span>LTE 61%</span></div>
      <div class="head">${maxAva(96)}<div><div class="ttl">Макс ${heart(32)}</div><div class="sub" style="color:#2f5bea">печатает…</div></div></div>
      <div class="msg" id="m81" style="top:200px;font:800 42px/1.2 Rubik">Ты что, выключила?</div>
      <div class="msg" id="m82" style="top:320px;font:800 42px/1.2 Rubik;box-shadow:0 0 0 6px #E5304A">Что ты скрываешь?</div>
      ${['Соня', '??', 'ответь', 'я жду', 'СОНЯ', '???'].map((t, i) => `<div class="msg spam" style="top:${450 + i * 105}px;left:${30 + (i % 2) * 40}px;font:700 36px/1.2 Onest">${t}</div>`).join('')}`);

  /* ---------- S9. Домофон ---------- */
  $('#s9').innerHTML = svg(`<g id="z9">
    ${R(0, 0, 1080, 1920, '#1c2236')}
    ${R(-20, 1500, 1120, 440, '#2a2f45', st)}
    <g transform="translate(160 160)">${R(0, 0, 330, 1360, '#5b4636', st)}<circle cx="290" cy="700" r="22" fill="#c9a24a" ${st}/></g>
    <g transform="translate(560 420)"><g id="icom">
      ${R(0, 0, 420, 760, '#e4e7ee', `${st} rx="40"`)}
      ${R(40, 50, 340, 280, '#0d1117', `${st} rx="20"`)}
      <clipPath id="scrclip"><rect x="40" y="50" width="340" height="280" rx="20"/></clipPath>
      <g clip-path="url(#scrclip)"><g transform="translate(210 230) scale(.62)"><g class="breath">${C.boy(Object.assign({ id: 'm9', mood: 'firm' }, MAX))}</g></g></g>
      ${R(40, 50, 340, 280, 'none', `${st} rx="20"`)}
      <circle id="led" cx="210" cy="400" r="24" fill="#27C46B" ${st} stroke-width="5"/>
      ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle cx="${110 + c * 100}" cy="${500 + r * 80}" r="28" fill="#fff" ${st} stroke-width="5"/>`).join('')).join('')}
    </g></g>
    <g id="rings" fill="none" stroke="#FFD23F" stroke-width="10" stroke-linecap="round" opacity="0"><path d="M530,520 q-40,80 0,160 M500,480 q-60,120 0,240 M1010,520 q40,80 0,160 M1040,480 q60,120 0,240"/></g></g>`)
    + `<div class="abs" id="clk9" style="left:120px;top:200px;background:#121218;border:6px solid #211d2b;border-radius:20px;padding:10px 26px;font:800 74px/1 Rubik;color:#ff3b4e">22:05</div>`;

  /* ---------- S10. Выбор ---------- */
  $('#s10').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2a3156')}<circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, sonya('s10', 'worried'))}`) + `
    <div class="pill" id="q10" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#2F5BEA"><span class="n">1</span><h3>Открыть</h3><p>и поговорить — он же просто переживает?</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#E5304A"><span class="n">2</span><h3 style="font-size:56px">Не<br>открывать</h3><p>и рассказать родителям</p></div>
    <div class="pill" id="cm10" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S11. Финал ---------- */
  $('#s11').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="rule" style="left:110px;top:300px;width:760px;text-align:center">
      <div style="font:900 92px/1 Rubik;color:#FFD23F">КОНТРОЛЬ —<br>НЕ ЛЮБОВЬ</div>
      <div style="font:600 44px/1.25 Onest;margin-top:20px;color:#dfe4f0">проверь, кто видит<br>твою геолокацию</div></div>
    <div class="abs" id="help" style="left:110px;top:720px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:500 46px/1.2 Onest;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:22px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div>
      <div style="font:500 44px/1.25 Onest;margin-top:20px;color:#9fb">бесплатно · анонимно</div></div>
    <div class="abs" id="part2" style="left:50%;top:1110px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
