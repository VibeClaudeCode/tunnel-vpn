// Ролик 2 «Бесплатный скин». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const bubble = (id, tag, text, x, y, tailX = 60, tagColor = '#7b4dff', extra = '') =>
    `<div class="bub" id="${id}" style="left:${x}px;top:${y}px;${extra}"><span class="tag" style="background:${tagColor}">${tag}</span>${text}<i class="tail" style="left:${tailX}px"></i></div>`;
  const hands = (sk = '#f2c9ad') => `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="${sk}" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="${sk}" ${st}/>
    ${R(140, 1820, 800, 120, '#3f8f6b', st)}`;
  const phoneBg = (c1, c2) => `${R(0, 0, 1080, 1920, c1)}<circle cx="540" cy="900" r="700" fill="${c2}"/><g transform="translate(190 150)">${C.phone(700, 1440, '#101426')}</g>${hands()}`;
  const scr = (id, inner, bg = '#101426', color = '#fff') => `<div class="scr" id="${id}" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:${bg};color:${color}">${inner}</div>`;
  const dragon = `<svg width="360" height="300" viewBox="0 0 360 300">
      <defs><radialGradient id="dg" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#ffe27a"/><stop offset=".5" stop-color="#ff8a2a"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient></defs>
      <circle cx="180" cy="150" r="150" fill="url(#dg)" opacity=".7"/>
      <path d="M60,200 L230,60 L270,70 L280,110 L110,240 Z" fill="#c7d2e6" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M110,240 L80,270 L60,250 L90,220Z" fill="#7a3b4f" stroke="${K}" stroke-width="7" stroke-linejoin="round"/>
      <path d="M95,175 L140,215 L118,232 L74,195Z" fill="#ff5a1f" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M150,150 Q200,90 250,80 Q215,120 160,170Z" fill="#ff8a2a" opacity=".9"/>
      <path d="M180,128 l20,-40 l8,30 l26,-24 l-6,34" fill="none" stroke="#ffe27a" stroke-width="7" stroke-linejoin="round"/></svg>`;

  /* ---------- S1. Ночь, кровать, 23:40 ---------- */
  $('#s1').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#161c36')}
    <g transform="translate(560 220)">${R(0, 0, 400, 520, '#0d1226', `${st} rx="10"`)}
      <circle cx="120" cy="140" r="60" fill="#fff4c9"/><circle cx="148" cy="122" r="54" fill="#0d1226"/>
      <circle cx="300" cy="90" r="5" fill="#fff"/><circle cx="260" cy="330" r="4" fill="#fff"/><circle cx="80" cy="400" r="4" fill="#fff"/>
      <path d="M200,0 L200,520 M0,260 L400,260" ${st}/></g>
    <g id="clock" transform="translate(110 300)">${R(0, 0, 330, 150, '#121218', `${st} rx="22"`)}
      <text x="165" y="110" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="104" fill="#ff3b4e" style="filter:drop-shadow(0 0 12px #ff3b4e)">23:40</text></g>
    ${R(-20, 1180, 1120, 760, '#2b3566', st)}
    <path d="M-20,1180 Q300,1120 1100,1200" fill="none" stroke="#3a4680" stroke-width="14"/>
    <circle id="glow1" cx="540" cy="1000" r="380" fill="#6fb3ff" opacity=".22"/>
    ${at(540, 900, 1.25, C.boy({ id: 'b1', mood: 'neutral' }))}
    <path d="M-20,1300 Q300,1240 540,1320 Q800,1240 1100,1300 L1100,1940 L-20,1940Z" fill="#5468b8" ${st}/>
    <g transform="translate(540 1330)"><g id="ph1">${R(-80, -150, 160, 300, '#1b1a22', `${st} rx="26"`)}${R(-68, -138, 136, 276, '#bfe0ff', 'rx="18"')}</g></g>
  `) + `<div class="notif abs" id="n1" data-small style="left:150px;top:560px;width:780px;background:#fff;box-shadow:0 0 0 7px #FFD23F">
      <b style="color:#2f5bea">🎮 Подарки игроков</b>Ты выиграл скин «Огненный дракон»!</div>`;

  /* ---------- S2. Экран «Поздравляем!» ---------- */
  $('#s2').innerHTML = svg(phoneBg('#141a33', '#1f2650')) + scr('scr2', `
      <div style="text-align:center;padding-top:110px">
        <div style="font:900 64px/1 Rubik;color:#FFD23F;letter-spacing:.02em">ПОЗДРАВЛЯЕМ!</div>
        <div style="font:600 34px/1.3 Onest;margin-top:14px;opacity:.85">ты выиграл редкий скин</div>
        <div id="drg" style="margin:30px auto 0;width:360px">${dragon}</div>
        <div style="font:800 46px/1.1 Rubik;margin-top:10px">«Огненный дракон»</div>
        <div style="font:900 96px/1 Rubik;color:#7CFF9B;margin-top:22px"><span id="cnt40">40 000</span> ₽</div>
        <div id="form" style="margin:40px 50px 0;text-align:left">
          <div style="font:700 32px/1.2 Onest;margin-bottom:14px">Подтверди карту, чтобы забрать:</div>
          <div style="height:86px;border-radius:18px;background:#1d2440;border:3px solid #3a4680;font:600 36px/86px Onest;color:#6c789d;padding-left:24px">Номер карты</div></div>
        <div id="btn2" style="margin:34px 50px 0;height:110px;border-radius:26px;background:#27C46B;color:#08130e;font:900 52px/110px Rubik;border:6px solid #211d2b">ЗАБРАТЬ</div>
      </div>`);

  /* ---------- S3. Мамина сумка, карта ---------- */
  $('#s3').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#1b2140')}
    <path d="M700,0 L1080,0 L1080,1920 L820,1920Z" fill="#2a3158"/>
    ${R(-20, 1500, 1120, 440, '#2c2a3e', st)}
    <g id="cardg" transform="translate(540 1140)"><g id="card">
      ${R(-260, -160, 520, 320, '#2f5bea', `${st} rx="34"`)}
      <path d="M-260,40 Q0,-40 260,60 L260,126 Q260,160 226,160 L-226,160 Q-260,160 -260,126Z" fill="#2449c4"/>
      ${R(-200, -90, 90, 66, '#f2c94c', `${st} stroke-width="4" rx="12"`)}
      <text x="-200" y="50" font-family="Rubik" font-weight="700" font-size="44" fill="#fff" letter-spacing="4">2202 •••• •••• 4471</text>
      <text x="-200" y="120" font-family="Onest" font-weight="600" font-size="34" fill="#cfe0ff">OLGA PETROVA</text>
      <text x="230" y="-100" text-anchor="end" font-family="Rubik" font-weight="900" font-size="44" fill="#fff">БАНК</text>
    </g></g>
    <g transform="translate(200 1020)">
      ${R(0, 140, 700, 400, '#8e4a3a', `${st} rx="40"`)}
      <path d="M140,160 Q140,-20 350,-20 Q560,-20 560,160" fill="none" ${st} stroke-width="22"/>
      <path d="M140,160 Q140,-20 350,-20 Q560,-20 560,160" fill="none" stroke="#6e3326" stroke-width="10"/>
      ${R(40, 140, 620, 70, '#a35a48', st)}
      <circle cx="350" cy="250" r="22" fill="#f2c94c" ${st}/>
    </g>
    <path id="hand3" d="M600,1920 Q620,1560 700,1400 Q760,1330 820,1380 Q860,1440 820,1560 L820,1920Z" fill="#f7d5bd" ${st}/>
    ${R(580, 1820, 260, 120, '#3f8f6b', st)}
  `) + `<div class="pill abs" id="tag3" style="left:150px;top:520px;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:48px">мамина сумка</div>`;

  /* ---------- S4. Ввод цифр и код из СМС ---------- */
  $('#s4').innerHTML = svg(phoneBg('#141a33', '#1f2650')) + scr('scr4', `
      <div style="padding:130px 50px 0">
        <div style="font:800 50px/1.1 Rubik">Подтверждение</div>
        <div style="font:500 32px/1.3 Onest;opacity:.7;margin-top:10px">получение приза · шаг 2 из 2</div>
        <div style="margin-top:50px;font:700 30px/1 Onest;opacity:.8">Номер карты</div>
        <div id="cardnum" style="margin-top:14px;height:96px;border-radius:18px;background:#1d2440;border:3px solid #3a4680;font:700 46px/96px Rubik;padding-left:24px;letter-spacing:.04em;white-space:nowrap">2202 4510 8833 4471</div>
        <div style="margin-top:40px;font:700 30px/1 Onest;opacity:.8">Код из СМС</div>
        <div id="code" style="display:flex;gap:18px;margin-top:14px">${'4817'.split('').map(d => `<div style="width:110px;height:130px;border-radius:20px;background:#1d2440;border:3px solid #3a4680;font:900 80px/130px Rubik;text-align:center"><span class="cd">${d}</span></div>`).join('')}</div>
      </div>`) + `<div class="notif abs" id="sms4" data-small style="left:230px;top:210px;width:620px;background:#fff">
      <b style="color:#211d2b">СМС · Банк</b>Код: 4817. Никому не сообщайте этот код.</div>`;

  /* ---------- S5. Списание ---------- */
  $('#s5').innerHTML = svg(phoneBg('#2a0f18', '#3a1420')) + scr('scr5', `
      <div style="padding:130px 50px 0;color:#211d2b">
        <div style="font:700 34px/1 Onest;opacity:.6">Карта •• 4471</div>
        <div style="font:500 34px/1 Onest;margin-top:40px;opacity:.6">Баланс</div>
        <div style="font:900 110px/1.1 Rubik;margin-top:8px"><span id="bal">31 240</span> ₽</div>
        <div id="op5" style="margin-top:60px;background:#fff;border-radius:30px;padding:30px;box-shadow:0 0 0 6px #E5304A">
          <div style="font:700 32px/1.2 Onest;opacity:.6">Сегодня, 23:43</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
            <div style="font:700 38px/1.2 Onest">Перевод<br><span style="font-weight:500;opacity:.6">GIFT-SKINS</span></div>
            <div style="font:900 54px/1 Rubik;color:#E5304A;white-space:nowrap">−28 000 ₽</div></div></div>
      </div>`, '#f3f4f8', '#211d2b');

  /* ---------- S5b. Лицо крупно ---------- */
  $('#s5b').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#0e1226')}
    <circle cx="540" cy="1000" r="560" fill="#6fb3ff" opacity=".18"/>
    ${at(540, 860, 2.1, C.boy({ id: 'b5', mood: 'shock' }))}
  `) + `<div class="abs" id="sal" style="left:50%;top:330px;transform:translateX(-50%) rotate(-4deg);background:#FFD23F;color:#211d2b;border:7px solid #211d2b;border-radius:22px;padding:16px 30px;font:900 56px/1.05 Rubik;text-align:center;white-space:nowrap">= мамина зарплата<br>за 2 недели</div>`;

  /* ---------- S6. Угроза ---------- */
  $('#s6').innerHTML = svg(phoneBg('#0b0e1c', '#16183a') + `<rect id="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>`) + scr('scr6', `
      <div class="head" style="background:#fff;color:#211d2b"><span style="font:700 50px/1 Onest;color:#2f5bea">‹</span><div class="ava" style="background:#27C46B">ПИ</div>
        <div><div class="ttl">Подарки игроков <span style="display:inline-block;width:34px;height:34px;border-radius:50%;background:#2f5bea;vertical-align:middle"></span></div><div class="sub">был(а) только что</div></div></div>
      <div class="msg" style="top:200px;background:#fff;color:#211d2b">Спасибо! Приз будет начислен в течение часа 🎁</div>
      <div class="msg" id="th1" style="top:360px;background:#fff;color:#211d2b;font:800 44px/1.15 Rubik;box-shadow:0 0 0 6px #E5304A">Ещё один код.<br>Или мы напишем твоей маме.</div>
      <div class="msg" id="th2" style="top:590px;background:#fff;color:#211d2b;padding:14px">
        <div style="display:flex;align-items:center;gap:18px">
          <svg width="120" height="120" viewBox="-160 -200 320 320" style="border-radius:50%;background:#bfe0ff;border:4px solid #211d2b">${C.mom({ id: 'mav', mood: 'neutral', body: false, hair: '#3b2a26' })}</svg>
          <div style="font:700 34px/1.25 Onest">Ольга Петрова<br><span style="font-weight:500;opacity:.6">это же твоя мама?</span></div></div></div>
      <div id="typ6" style="position:absolute;left:40px;top:800px;font:900 50px/1 Rubik;color:#9aa3b5;letter-spacing:.2em">•••</div>`, '#e9ecf3', '#211d2b');

  /* ---------- S7. Ванная в темноте ---------- */
  $('#s7').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#121a2a')}
    ${[...Array(10)].map((_, i) => `<path d="M0,${200 + i * 120} L1080,${200 + i * 120}" stroke="#17213a" stroke-width="5"/>`).join('')}
    ${[...Array(9)].map((_, i) => `<path d="M${i * 120},0 L${i * 120},1300" stroke="#17213a" stroke-width="5"/>`).join('')}
    <path d="M600,980 L1100,980 L1100,1500 Q1100,1600 1000,1600 L700,1600 Q600,1600 600,1500Z" fill="#cfd8e6" ${st}/>
    ${R(580, 950, 540, 60, '#e9eef5', `${st} rx="20"`)}
    ${R(-20, 1300, 1120, 640, '#1c2438', st)}
    <circle id="glow7" cx="380" cy="1000" r="330" fill="#6fb3ff" opacity=".22"/>
    ${at(360, 880, 1.0, C.boy({ id: 'b7', mood: 'sad' }))}
    <path d="M150,1430 Q170,1210 330,1220 Q420,1230 430,1330 Q560,1210 640,1300 Q700,1400 600,1520 L200,1560Z" fill="#2c3550" ${st}/>
    <g transform="translate(380 1250)">${R(-55, -95, 110, 190, '#1b1a22', `${st} rx="20"`)}${R(-45, -85, 90, 170, '#bfe0ff', 'rx="14"')}</g>
    ${R(-20, 1850, 1120, 20, '#ffe39a', 'opacity=".25"')}
  `);

  /* ---------- S8. Дверь, стук ---------- */
  $('#s8').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#121a2a')}
    <g id="door">${R(170, 160, 740, 1640, '#5b4636', st)}
      ${R(240, 260, 600, 620, '#4e3c2e', `${st} stroke-width="5" rx="10"`)}${R(240, 960, 600, 720, '#4e3c2e', `${st} stroke-width="5" rx="10"`)}
      <circle cx="820" cy="980" r="26" fill="#c9a24a" ${st}/></g>
    <path d="M170,1800 L910,1800 L1080,1920 L0,1920Z" fill="#ffe39a" opacity=".55"/>
    <path id="shadow8" d="M380,1800 L560,1800 L620,1920 L330,1920Z" fill="#121a2a" opacity=".85"/>
    ${R(170, 1792, 740, 14, '#ffe39a')}
  `) + `<div class="abs" id="knock" style="inset:0;pointer-events:none">
      <div class="pill abs kn" style="left:560px;top:620px;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:58px">тук</div>
      <div class="pill abs kn" style="left:300px;top:760px;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:58px">тук</div>
      <div class="pill abs kn" style="left:620px;top:900px;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:58px">тук</div></div>`
    + bubble('b8', 'МАМА · за дверью', 'Лёш… у меня<br>с карты что-то<br>списали', 170, 300, 120, '#e5743c', 'border-style:dashed');

  /* ---------- S9. Выбор ---------- */
  $('#s9').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#2a3156')}
    <circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, C.boy({ id: 'b9', mood: 'worried' }))}
  `) + `<div class="pill" id="q9" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#2F5BEA"><span class="n">1</span><h3>Сказать<br>правду</h3><p>мама узнает, что это ты</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#E5304A"><span class="n">2</span><h3>Отпра&shy;вить код</h3><p>может, отстанут?..</p></div>
    <div class="pill" id="cm9" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S10. Финал ---------- */
  $('#s10').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="rule" style="left:110px;top:330px;width:760px;text-align:center">
      <div style="font:900 96px/1 Rubik;color:#FFD23F">КОД ИЗ СМС —<br>НИКОМУ</div>
      <div style="font:600 44px/1.25 Onest;margin-top:20px;color:#dfe4f0">даже «поддержке игры»<br>и «банку»</div></div>
    <div class="abs" id="help" style="left:110px;top:730px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:40px 40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:700 46px/1.2 Onest;color:#9fe8bf">Попал в беду — позвони</div>
      <div style="font:500 44px/1.2 Onest;margin-top:14px;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:22px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div>
      <div style="font:500 44px/1.25 Onest;margin-top:20px;color:#9fb">бесплатно · анонимно</div></div>
    <div class="abs" id="part2" style="left:50%;top:1140px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
