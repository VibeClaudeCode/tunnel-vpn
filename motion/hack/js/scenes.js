// «Голосуй за меня». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const POL = { hair: '#8a4a2a', hair2: '#6e3a20', jacket: '#2aa198', hoodie: true, tail: true };
  const ANYA = { hair: '#f0cf7a', hair2: '#d4b05a', jacket: '#9b6bb0', hoodie: true };
  const pol = (id, mood) => C.kira(Object.assign({ id, mood }, POL));
  const anya = (id, mood) => C.kira(Object.assign({ id, mood }, ANYA));
  const hands = (c = '#2aa198') => `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f7d5bd" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f7d5bd" ${st}/>
    ${R(140, 1820, 800, 120, c, st)}`;
  const phoneBg = (c1, c2, extra = '', hc) => `${R(0, 0, 1080, 1920, c1)}<circle cx="540" cy="900" r="700" fill="${c2}"/><g transform="translate(190 150)">${C.phone(700, 1440, '#eef1f7')}</g>${hands(hc)}${extra}`;
  const scr = (id, inner, bg = '#eef1f7') => `<div class="scr" id="${id}" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:${bg}">${inner}</div>`;
  const redv = `<rect class="redv" x="0" y="0" width="1080" height="1920" fill="url(#rv)" opacity="0"/>
    <defs><radialGradient id="rv"><stop offset=".55" stop-color="#e5304a" stop-opacity="0"/><stop offset="1" stop-color="#e5304a" stop-opacity=".7"/></radialGradient></defs>`;
  let avn = 0;
  const avaSvg = (opts, s = 96, bg = '#bfe0ff') => `<svg width="${s}" height="${s}" viewBox="-160 -190 320 320" style="border-radius:50%;background:${bg};border:4px solid #211d2b;flex:none">${C.kira(Object.assign({ id: 'av' + (avn++), mood: 'neutral', body: false }, opts))}</svg>`;
  const momAva = (s = 96, opts = {}) => `<svg width="${s}" height="${s}" viewBox="-160 -200 320 320" style="border-radius:50%;background:#ffd9c2;border:4px solid #211d2b;flex:none">${C.mom(Object.assign({ id: 'av' + (avn++), mood: 'neutral', body: false }, opts))}</svg>`;
  const heart = (s = 30, c = '#ffb800') => `<svg width="${s}" height="${s}" viewBox="0 0 40 40" style="vertical-align:-5px"><path d="M20,35 L6,21 Q-1,13 6,7 Q13,2 20,10 Q27,2 34,7 Q41,13 34,21Z" fill="${c}" stroke="#211d2b" stroke-width="3"/></svg>`;

  /* ---------- S1. Полина, вечер ---------- */
  $('#s1').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#cfe9e3')}
    ${[...Array(8)].map((_, i) => `<circle cx="${100 + (i % 4) * 280}" cy="${200 + Math.floor(i / 4) * 300}" r="18" fill="#b6ddd4"/>`).join('')}
    <g transform="translate(640 250)">${R(0, 0, 340, 380, '#fff', `${st} rx="10"`)}${R(30, 30, 280, 220, '#ffd36b', 'rx="6"')}<circle cx="120" cy="140" r="50" fill="#ff8a5a"/><path d="M30,250 L140,160 L220,220 L310,140 L310,250Z" fill="#2aa198"/></g>
    <circle id="glow1" cx="540" cy="1000" r="380" fill="#6fb3ff" opacity=".18"/>
    ${at(540, 900, 1.25, pol('p1', 'neutral'))}
    ${R(-20, 1330, 1120, 610, '#b07a5a', st)}
    <g transform="translate(540 1330)">${R(-80, -150, 160, 300, '#1b1a22', `${st} rx="26"`)}${R(-68, -138, 136, 276, '#bfe0ff', 'rx="18"')}</g>`)
    + `<div class="notif abs" id="n1" data-small style="left:130px;width:820px;top:420px;background:#fff;display:flex;gap:20px;align-items:center;box-shadow:0 0 0 6px #ffb800">
      ${avaSvg(ANYA, 90)}<div><b style="color:#211d2b">Аня ${heart()} лучшая</b><span style="font:700 40px/1.2 Onest">Полин, помоги пожалуйста 🥺</span></div></div>`;

  /* ---------- S2. Чат с Аней: конкурс ---------- */
  $('#s2').innerHTML = svg(phoneBg('#1c3b39', '#24504c')) + scr('scr2', `
      <div class="bar"><span>20:41</span><span>LTE 66%</span></div>
      <div class="head">${avaSvg(ANYA, 96)}<div><div class="ttl">Аня ${heart(34)}</div><div class="sub">в сети</div></div></div>
      <div class="msg" id="a21" style="top:200px;max-width:560px;font:700 40px/1.25 Onest">Проголосуй за меня в конкурсе!! 🥺</div>
      <div class="msg" id="a22" style="top:340px;max-width:560px;padding:16px">
        <div style="border-radius:20px;overflow:hidden;border:3px solid #dfe3ea">
          <div style="height:200px;background:linear-gradient(135deg,#ffb800,#ff5a8a);display:grid;place-items:center;font:900 54px/1 Rubik;color:#fff">КОНКУРС</div>
          <div style="padding:16px 18px;font:700 32px/1.25 Onest">«Лучший рисунок 2026»<br><span style="font-weight:500;color:#6a7385">голосование · vote-konkurs.ru</span></div></div></div>
      <div class="msg" id="a23" style="top:740px;max-width:560px;font:700 40px/1.25 Onest;box-shadow:0 0 0 5px #ffb800">Там нужен код из СМС, пришли мне 🙏</div>`);

  /* ---------- S3. Код ---------- */
  $('#s3').innerHTML = svg(phoneBg('#1c3b39', '#24504c')) + scr('scr3', `
      <div class="bar"><span>20:42</span><span>LTE 66%</span></div>
      <div class="head">${avaSvg(ANYA, 96)}<div><div class="ttl">Аня ${heart(34)}</div><div class="sub">в сети</div></div></div>
      <div class="msg" id="me3" style="top:260px;left:auto;right:26px;background:#d9f7e3;border-radius:30px 30px 8px 30px;font:900 90px/1 Rubik;letter-spacing:.08em">5521</div>
      <div class="msg" id="th3" style="top:440px;font:700 40px/1.25 Onest">спасиибо!! ${heart(36, '#ff5a8a')}</div>`)
    + `<div class="notif abs" id="sms3" data-small style="left:230px;top:210px;width:620px;background:#fff">
        <b style="color:#211d2b">СМС · Соцсеть</b>Код для <u id="u3">входа в аккаунт</u>: 5521. Никому не сообщайте.</div>`;

  /* ---------- S4. Выкинуло из аккаунта ---------- */
  $('#s4').innerHTML = svg(phoneBg('#2a2440', '#3a3258')) + scr('scr4', `
      <div style="padding:160px 50px 0;text-align:center">
        <div id="out4" style="font:900 56px/1.1 Rubik;color:#211d2b">Вы вышли<br>из аккаунта</div>
        <div style="font:500 32px/1.3 Onest;color:#6a7385;margin-top:14px">вход выполнен на другом устройстве</div>
        <div style="margin-top:70px;text-align:left;font:700 30px/1 Onest;color:#6a7385">Пароль</div>
        <div id="pw4" style="margin-top:14px;height:100px;border-radius:20px;background:#fff;border:4px solid #dfe3ea;font:900 60px/100px Rubik;padding-left:26px;text-align:left;letter-spacing:.2em">••••••••</div>
        <div id="err4" style="margin-top:20px;font:800 38px/1.2 Onest;color:#E5304A">Неверный пароль</div>
      </div>`);

  /* ---------- S5. Аню взломали вчера ---------- */
  $('#s5').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#efe2f5')}
    ${at(540, 960, 1.3, anya('a5', 'shock'))}
    ${R(-20, 1360, 1120, 580, '#9b6bb0', st)}`)
    + `<div class="card" id="log5" style="left:130px;top:300px;width:740px;background:#fff;transform:rotate(-2deg);padding:26px 30px">
        <div style="font:800 40px/1.2 Rubik;color:#211d2b">Аккаунт Ани</div>
        <div style="font:600 34px/1.35 Onest;color:#6a7385;margin-top:8px">вчера, 22:14 · вход с нового устройства<br>город: неизвестно</div></div>
      <div class="stamp" id="hk5" style="left:240px;top:580px;font-size:96px">ВЗЛОМАН</div>`;

  /* ---------- S6. Со страницы Полины пишут всем ---------- */
  const row = (id, a, name, txt) => `<div class="row" id="${id}" style="display:flex;align-items:center;gap:22px;padding:20px 30px;background:#fff;border-bottom:2px solid #e3e7ee">
      ${a}<div style="flex:1;min-width:0"><div style="font:800 40px/1.1 Rubik;white-space:nowrap">${name}</div><div style="font:500 30px/1.3 Onest;color:#6a7385;white-space:nowrap;overflow:hidden">${txt}</div></div>
      <div class="sent" style="font:800 28px/1 Onest;color:#fff;background:#E5304A;border-radius:14px;padding:8px 12px">отпр.</div></div>`;
  $('#s6').innerHTML = svg(phoneBg('#2a0f18', '#3a1420', redv)) + scr('scr6', `
      <div class="bar"><span>20:46</span><span>LTE 64%</span></div>
      <div style="padding:30px 36px 6px;font:800 50px/1.1 Rubik">Отправленные</div>
      <div style="padding:0 36px 20px;font:600 30px/1.2 Onest;color:#E5304A">со страницы Полины · не она</div>
      ${row('r4', `<div class="ava" style="background:#f2994a">Д</div>`, 'Даша', 'Полина: скинь код из смс…')}
      ${row('r1', `<div class="ava" style="background:#2f9e5b">7А</div>`, '7 «А» класс', 'Полина: ребят, займите до завтра…')}
      ${row('r2', `<div class="ava" style="background:#7b5ab0">МИ</div>`, 'Мария Ивановна', 'Полина: здравствуйте, срочно нужна…')}
      ${row('r3', momAva(96), 'Мама', 'Полина: мам, срочно переведи…')}`);

  /* ---------- S7. Телефон мамы ---------- */
  $('#s7').innerHTML = svg(phoneBg('#f3e1c4', '#ead2ad', '', '#c9786a')) + scr('scr7', `
      <div class="bar"><span>20:47</span><span>LTE 90%</span></div>
      <div class="head">${avaSvg(POL, 96)}<div><div class="ttl">Полина 🌸</div><div class="sub">дочь</div></div></div>
      <div class="msg" id="m71" style="top:220px;max-width:560px;font:800 44px/1.2 Rubik;box-shadow:0 0 0 6px #E5304A">Мам, срочно переведи <span id="sum7" style="color:#E5304A">15 000</span>. Потом объясню</div>
      <div class="msg" id="m72" style="top:470px;max-width:560px;font:700 38px/1.4 Rubik">2200 •••• 7741<br><span style="font:500 30px/1 Onest;color:#6a7385">это карта подруги</span></div>`)
    + `<div class="pill abs" id="tag7" style="left:50%;top:60px;transform:translateX(-50%);background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:46px">телефон мамы</div>`;

  /* ---------- S8. Мама звонит, Полина не берёт ---------- */
  $('#s8').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#20283f')}
    ${at(540, 900, 1.25, pol('p8', 'sad'))}
    ${R(-20, 1330, 1120, 610, '#3b4a86', st)}<path d="M-20,1360 Q300,1300 1100,1380" fill="none" stroke="#4d5ea0" stroke-width="16"/>`)
    + `<div class="abs" id="call8" style="left:240px;top:1420px;width:600px;background:#141a33;border:7px solid #211d2b;border-radius:40px;padding:26px 30px;color:#fff;display:flex;align-items:center;gap:24px">
        ${momAva(110)}<div style="flex:1"><div style="font:800 46px/1.1 Rubik">Мама</div><div style="font:500 30px/1.2 Onest;opacity:.7">входящий звонок…</div></div>
        <div style="width:90px;height:90px;border-radius:50%;background:#E5304A;border:5px solid #fff"></div></div>
      <div class="pill abs" id="miss8" style="left:50%;top:300px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;font-size:52px">пропущенный (4)</div>`;

  /* ---------- S9. Бабушка ---------- */
  $('#s9').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#efe6d6')}
    ${[...Array(6)].map((_, i) => `<path d="M0,${300 + i * 140} Q540,${260 + i * 140} 1080,${300 + i * 140}" fill="none" stroke="#e3d6bf" stroke-width="22"/>`).join('')}
    ${at(330, 980, 1.0, C.mom({ id: 'g9', mood: 'worried', hair: '#d8d3cc', top: '#8e6bb0', glasses: true }))}
    ${R(-20, 1420, 1120, 520, '#b98a5a', st)}
    <g transform="translate(760 1220) rotate(8)"><g id="gph">${R(-150, -280, 300, 560, '#1b1a22', `${st} rx="40"`)}${R(-132, -262, 264, 524, '#eef1f7', 'rx="28"')}</g></g>`)
    + `<div class="abs" id="gm9" data-small style="left:650px;top:990px;width:240px;transform:rotate(8deg);font:800 30px/1.2 Rubik;color:#211d2b">
        <div style="font:700 22px/1 Onest;color:#6a7385;margin-bottom:8px">Внучка Полина</div>
        <div style="background:#fff;border-radius:16px;padding:10px 12px;box-shadow:0 0 0 4px #E5304A">Бабуль, срочно нужны деньги. Маме не говори 🙏</div></div>
      <div class="pill abs" id="tag9" style="left:80px;top:300px;background:#fff;color:#211d2b;border:5px solid #211d2b;font-size:50px;transform:rotate(-3deg)">бабушка, 74</div>`;

  /* ---------- S10. Выбор ---------- */
  $('#s10').innerHTML = svg(`${R(0, 0, 1080, 1920, '#2a3156')}<circle cx="540" cy="1100" r="620" fill="#343c69"/>
    ${at(540, 960, 1.3, pol('p10', 'worried'))}`) + `
    <div class="pill" id="q10" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#2F5BEA"><span class="n">1</span><h3 style="font-size:54px">Позвонить маме</h3><p>и признаться прямо сейчас</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#E5304A"><span class="n">2</span><h3 style="font-size:54px">Вернуть самой</h3><p>пока никто не перевёл</p></div>
    <div class="pill" id="cm10" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S11. Финал ---------- */
  $('#s11').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="rule" style="left:110px;top:280px;width:760px;text-align:center">
      <div style="font:900 84px/1.02 Rubik;color:#FFD23F">КОД ИЗ СМС —<br>НИКОМУ</div>
      <div style="font:600 44px/1.25 Onest;margin-top:20px;color:#dfe4f0">даже лучшей подруге.<br>Взломали — сразу скажи<br>родным: «это не я»</div></div>
    <div class="abs" id="help" style="left:110px;top:800px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:36px 40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:500 46px/1.2 Onest;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:22px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div></div>
    <div class="abs" id="part2" style="left:50%;top:1130px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
