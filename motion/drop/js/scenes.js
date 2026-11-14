// «Лёгкие деньги». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const TIM = { hair: '#2a1b19', top: '#c94a3a', top2: '#a83c2e' };
  const tim = (id, mood) => C.boy(Object.assign({ id, mood }, TIM));
  const bubble = (id, tag, text, x, y, tailX = 60, tagColor = '#7b4dff', extra = '') =>
    `<div class="bub" id="${id}" style="left:${x}px;top:${y}px;${extra}"><span class="tag" style="background:${tagColor}">${tag}</span>${text}<i class="tail" style="left:${tailX}px"></i></div>`;
  const hands = `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f7d5bd" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f7d5bd" ${st}/>
    ${R(140, 1820, 800, 120, '#c94a3a', st)}`;
  const phoneBg = (c1, c2, extra = '') => `${R(0, 0, 1080, 1920, c1)}<circle cx="540" cy="900" r="700" fill="${c2}"/><g transform="translate(190 150)">${C.phone(700, 1440, '#eef1f7')}</g>${hands}${extra}`;
  const scr = (id, inner, bg = '#eef1f7') => `<div class="scr" id="${id}" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:${bg}">${inner}</div>`;
  const redv = `<rect class="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>`;
  const boss = `<div class="ava" style="background:#211d2b;color:#7CFF9B">$</div>`;

  /* ---------- S1. Тимур, 15 ---------- */
  $('#s1').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#232a45')}
    <g transform="translate(600 230)">${R(0, 0, 380, 300, '#3a4570', `${st} rx="10"`)}<text x="190" y="170" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="64" fill="#9db8d9">GAME</text></g>
    <circle id="glow1" cx="540" cy="1000" r="380" fill="#6fb3ff" opacity=".2"/>
    ${at(540, 900, 1.25, tim('t1', 'neutral'))}
    ${R(-20, 1330, 1120, 610, '#4a3a35', st)}
    <g transform="translate(540 1330)">${R(-80, -150, 160, 300, '#1b1a22', `${st} rx="26"`)}${R(-68, -138, 136, 276, '#bfe0ff', 'rx="18"')}</g>`)
    + `<div class="pill abs" id="age" style="left:110px;top:300px;background:#fff;color:#211d2b;border:6px solid #211d2b;font-size:54px;transform:rotate(-4deg)">ТИМУР, 15</div>`;

  /* ---------- S2. Объявление в телеграме ---------- */
  $('#s2').innerHTML = svg(phoneBg('#14233a', '#1d3352')) + scr('scr2', `
      <div class="bar"><span>19:12</span><span>LTE 80%</span></div>
      <div class="head">${boss}<div><div class="ttl">Работа для своих</div><div class="sub">12 480 подписчиков</div></div></div>
      <div id="post" style="margin:26px;background:#fff;border-radius:30px;padding:30px;box-shadow:0 3px 0 #d4d9e3">
        <div style="font:900 50px/1.05 Rubik">ПОДРАБОТКА<br>ДЛЯ ПОДРОСТКОВ</div>
        <div style="font:900 84px/1 Rubik;color:#27C46B;margin-top:18px">3 000 ₽</div>
        <div style="font:700 40px/1.2 Onest">за 5 минут</div>
        <div style="font:500 32px/1.4 Onest;color:#6a7385;margin-top:14px">• без опыта • с 14 лет<br>• только телефон и карта</div>
        <div style="margin-top:22px;height:96px;border-radius:24px;background:#2f5bea;color:#fff;font:800 40px/96px Rubik;text-align:center">Написать менеджеру</div></div>
      <div class="msg" id="mgr" style="top:900px;left:26px;max-width:560px;box-shadow:0 0 0 5px #2f5bea"><b style="color:#2f5bea">Менеджер</b>Нужны только данные твоей карты: номер и срок 🙂</div>`);

  /* ---------- S3. Согласие и +140 000 ---------- */
  $('#s3').innerHTML = svg(phoneBg('#0f2a22', '#123a2c')) + scr('scr3', `
      <div style="padding:130px 50px 0">
        <div class="msg" id="ok3" style="position:relative;left:auto;margin-left:auto;background:#d9f7e3;border-radius:30px 30px 8px 30px;font:700 40px/1.2 Onest;width:fit-content">Ок, давай 👍</div>
        <div style="font:700 34px/1 Onest;opacity:.6;margin-top:70px">Моя карта •• 0715</div>
        <div style="font:500 34px/1 Onest;margin-top:30px;opacity:.6">Баланс</div>
        <div style="font:900 96px/1.1 Rubik;margin-top:8px;white-space:nowrap"><span id="bal3">140 000</span> ₽</div>
        <div id="in3" style="margin-top:40px;background:#fff;border-radius:30px;padding:30px;box-shadow:0 0 0 6px #27C46B">
          <div style="font:700 32px/1.2 Onest;opacity:.6">Сегодня, 21:04</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
            <div style="font:700 34px/1.2 Onest">Поступление<br><span style="font-weight:500;opacity:.6">от: В. П. С.</span></div>
            <div style="font:900 46px/1 Rubik;color:#1c8a4a;white-space:nowrap">+140 000 ₽</div></div></div>
      </div>`);

  /* ---------- S4. «Переведи на три номера» ---------- */
  $('#s4').innerHTML = svg(phoneBg('#14233a', '#1d3352')) + scr('scr4', `
      <div class="bar"><span>21:06</span><span>LTE 78%</span></div>
      <div class="head">${boss}<div><div class="ttl">Менеджер</div><div class="sub">в сети</div></div></div>
      <div class="msg" id="m41" style="top:200px;max-width:560px;font:700 38px/1.25 Onest">Переведи на эти три номера. 3 000 оставь себе 💸</div>
      <div class="msg" id="m42" style="top:380px;max-width:560px;font:700 36px/1.5 Rubik;letter-spacing:.02em">
        ${['2200 •••• 1184', '2202 •••• 9930', '5536 •••• 4207'].map((n, i) => `<div class="tr" style="display:flex;justify-content:space-between;gap:30px">${n}<span style="color:#E5304A">−45 667</span></div>`).join('')}</div>
      <div id="sent4" style="position:absolute;left:26px;right:26px;top:680px;background:#fff;border-radius:30px;padding:26px 30px;box-shadow:0 3px 0 #d4d9e3">
        <div style="font:700 34px/1 Onest;opacity:.6">Баланс</div><div style="font:900 90px/1.1 Rubik;margin-top:8px;white-space:nowrap"><span id="bal4">140 000</span> ₽</div></div>`);

  /* ---------- S5. «Это же просто деньги» ---------- */
  $('#s5').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#1d3352')}<circle cx="540" cy="1000" r="560" fill="#27C46B" opacity=".14"/>
    ${at(540, 900, 1.25, tim('t5', 'grin'))}
    ${R(-20, 1330, 1120, 610, '#4a3a35', st)}`)
    + `<div id="coins" class="abs" style="inset:0">${[[120, 520, -10], [800, 460, 8], [90, 1520, 6], [790, 1560, -6]].map(([x, y, r]) => `<div class="abs cn" style="left:${x}px;top:${y}px;transform:rotate(${r}deg);background:#7CFF9B;color:#08130e;border:6px solid #211d2b;border-radius:20px;padding:12px 22px;font:900 54px/1 Rubik;white-space:nowrap">+3 000 ₽</div>`).join('')}</div>`;

  /* ---------- S6. Карта заблокирована ---------- */
  $('#s6').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#e9edf3')}
    <g transform="translate(540 880) rotate(-6)"><g id="card6">
      ${R(-330, -205, 660, 410, '#2f5bea', `${st} rx="40"`)}
      ${R(-260, -120, 110, 80, '#f2c94c', `${st} stroke-width="4" rx="14"`)}
      <text x="-260" y="60" font-family="Rubik" font-weight="700" font-size="54" fill="#fff" letter-spacing="4">•••• 0715</text>
      <text x="-260" y="140" font-family="Onest" font-weight="600" font-size="40" fill="#cfe0ff">TIMUR K.</text>
    </g></g>
    <g id="lock6" transform="translate(540 1200)"><g id="lk">
      <path d="M-70,-40 L-70,-110 Q-70,-180 0,-180 Q70,-180 70,-110 L70,-40" fill="none" ${st} stroke-width="26"/>
      <path d="M-70,-40 L-70,-110 Q-70,-180 0,-180 Q70,-180 70,-110 L70,-40" fill="none" stroke="#c3c8d2" stroke-width="12"/>
      ${R(-120, -50, 240, 200, '#E5304A', `${st} rx="30"`)}<circle cx="0" cy="40" r="26" fill="#211d2b"/></g></g>`)
    + `<div class="stamp" id="blk" style="left:140px;top:500px;font-size:84px">ЗАБЛОКИРОВАНА</div>`;

  /* ---------- S7. Кабинет директора ---------- */
  $('#s7').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#d7e6dc')}${R(0, 1500, 1080, 420, '#b9a690', st)}
    <g transform="translate(250 300)">${R(0, 0, 580, 1210, '#3a2f48', st)}
      <g id="door7">${R(0, 0, 580, 1210, '#7a5238', st)}${R(60, 80, 460, 480, '#6c472f', `${st} stroke-width="5" rx="8"`)}${R(60, 640, 460, 480, '#6c472f', `${st} stroke-width="5" rx="8"`)}<circle cx="520" cy="620" r="24" fill="#c9a24a" ${st}/></g></g>
    ${R(380, 180, 320, 90, '#f2c94c', `${st} rx="12"`)}<text x="540" y="245" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="52" fill="${K}">ДИРЕКТОР</text>
    <g id="cops" opacity="0">${at(400, 820, .85, C.man({ id: 'p1', mood: 'firm' }))}${at(700, 840, .85, C.man({ id: 'p2', mood: 'neutral', top: '#34425f' }))}</g>`);

  /* ---------- S8. «Твоя карта участвовала…» ---------- */
  $('#s8').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#cfe0d6')}
    ${at(330, 980, 1.05, C.man({ id: 'p8', mood: 'firm' }))}
    ${at(820, 1100, .85, tim('t8', 'sad'))}
    ${R(-20, 1420, 1120, 520, '#8a5a3c', st)}`)
    + bubble('b8', 'ПОЛИЦИЯ', 'Твоя карта участвовала<br>в мошенничестве.', 80, 300, 160, '#2c3a5c')
    + `<div class="card" id="vic" style="left:520px;top:600px;width:420px;background:#fff;transform:rotate(3deg);padding:24px 28px">
        <div style="font:700 32px/1.2 Onest;color:#6a7385">Потерпевшая</div>
        <div style="font:900 46px/1.1 Rubik;color:#211d2b;margin-top:6px">пенсионерка,<br>78 лет</div>
        <div style="font:700 34px/1.2 Onest;color:#E5304A;margin-top:10px">все сбережения</div></div>`;

  /* ---------- S9. Угроза «работодателя» ---------- */
  $('#s9').innerHTML = svg(phoneBg('#2a0f18', '#3a1420', redv)) + scr('scr9', `
      <div class="bar"><span>11:20</span><span>LTE 41%</span></div>
      <div class="head">${boss}<div><div class="ttl">Менеджер</div><div class="sub">в сети</div></div></div>
      <div id="typ9" style="position:absolute;left:40px;top:230px;font:900 50px/1 Rubik;color:#9aa3b5;letter-spacing:.2em">•••</div>
      <div class="msg" id="th1" style="top:220px;font:800 46px/1.15 Rubik;box-shadow:0 0 0 6px #E5304A">Скажешь про нас —<br>пожалеешь.</div>
      <div class="msg" id="th2" style="top:420px;padding:14px">
        <svg width="460" height="300" viewBox="0 0 460 300" style="display:block;border-radius:18px">
          <rect width="460" height="300" fill="#8a96a8"/>${R(40, 40, 380, 260, '#c9b49a', `stroke="${K}" stroke-width="5"`)}
          ${R(170, 130, 120, 170, '#5b4636', `stroke="${K}" stroke-width="5"`)}${R(150, 70, 160, 46, '#2f5bea', `stroke="${K}" stroke-width="4" rx="6"`)}
          <text x="230" y="104" text-anchor="middle" font-family="Rubik" font-weight="800" font-size="30" fill="#fff">подъезд 3</text>
          ${R(70, 70, 60, 60, '#bfe0ff', `stroke="${K}" stroke-width="4"`)}${R(330, 70, 60, 60, '#bfe0ff', `stroke="${K}" stroke-width="4"`)}</svg>
        <div style="font:700 34px/1.3 Onest;padding:10px 6px 0">знакомый подъезд? 🙂</div></div>`);

  /* ---------- S10. Выбор ---------- */
  $('#s10').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2a3156')}<circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, tim('t10', 'worried'))}`) + `
    <div class="pill" id="q10" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#2F5BEA"><span class="n">1</span><h3 style="font-size:50px">Рассказать полиции</h3><p>всё, как было</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#E5304A"><span class="n">2</span><h3 style="font-size:50px">Промолчать</h3><p>они знают, где ты живёшь</p></div>
    <div class="pill" id="cm10" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S11. Финал ---------- */
  $('#s11').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="rule" style="left:110px;top:300px;width:760px;text-align:center">
      <div style="font:900 88px/1 Rubik;color:#FFD23F">ТВОЯ КАРТА —<br>ТОЛЬКО ТВОЯ</div>
      <div style="font:600 44px/1.25 Onest;margin-top:20px;color:#dfe4f0">«лёгкие деньги» за карту —<br>это помощь мошенникам</div></div>
    <div class="abs" id="help" style="left:110px;top:740px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:500 46px/1.2 Onest;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:22px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div>
      <div style="font:500 44px/1.25 Onest;margin-top:20px;color:#9fb">бесплатно · анонимно</div></div>
    <div class="abs" id="part2" style="left:50%;top:1130px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
