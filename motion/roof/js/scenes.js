// «Крыша». Вёрстка сцен.
(() => {
  const K = C.K, st = C.st, $ = s => document.querySelector(s);
  const svg = (inner) => `<svg class="art" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice"><g class="cam">${inner}</g></svg>`;
  const at = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="breath">${inner}</g></g>`;
  const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
  const EGOR = { hair: '#7d5330', top: '#3e6fd1', top2: '#335fb8' };
  const GOSHA = { hair: '#e0b04a', top: '#f08a2a', top2: '#d27420' };
  const egor = (id, mood) => C.boy(Object.assign({ id, mood }, EGOR));
  const gosha = (id, mood) => C.boy(Object.assign({ id, mood }, GOSHA));
  const bubble = (id, tag, text, x, y, tailX = 60, tagColor = '#7b4dff') =>
    `<div class="bub" id="${id}" style="left:${x}px;top:${y}px"><span class="tag" style="background:${tagColor}">${tag}</span>${text}<i class="tail" style="left:${tailX}px"></i></div>`;
  const hands = (c = '#f08a2a') => `
    <path d="M150,1750 Q130,1400 230,1260 Q290,1200 320,1300 L330,1700 Q330,1900 150,1920Z" fill="#f7d5bd" ${st}/>
    <path d="M930,1750 Q950,1380 860,1250 Q810,1210 790,1300 L770,1700 Q770,1900 930,1920Z" fill="#f7d5bd" ${st}/>
    ${R(140, 1820, 800, 120, c, st)}`;
  // ночной город: ряды домов с окнами (детерминированно)
  const city = (y0, scale = 1, n = 14, seed = 1) => {
    let r = seed, out = '';
    const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (let i = 0; i < n; i++) {
      const w = (60 + rnd() * 70) * scale, h = (180 + rnd() * 380) * scale, x = i * 1080 / n - 20 + rnd() * 20;
      out += R(x, y0 - h, w, h + 2000, ['#1b2140', '#20274a', '#171c36'][i % 3], `stroke="${K}" stroke-width="3"`);
      for (let yy = y0 - h + 20 * scale; yy < y0 + 600; yy += 34 * scale) for (let xx = x + 10 * scale; xx < x + w - 14 * scale; xx += 24 * scale)
        if (rnd() > 0.62) out += R(xx.toFixed(0), yy.toFixed(0), (10 * scale).toFixed(0), (14 * scale).toFixed(0), rnd() > 0.5 ? '#ffd36b' : '#ffe9a8', 'opacity=".85"');
    }
    return out;
  };
  const sky = `${R(0, 0, 1080, 1920, '#0b1028')}<circle cx="840" cy="260" r="70" fill="#fff4c9"/><circle cx="868" cy="242" r="62" fill="#0b1028"/>
    ${[[120, 180], [300, 320], [520, 140], [700, 400], [960, 520], [80, 520], [420, 560]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`).join('')}`;

  /* ---------- S1. Ролик Гоши: 100 000 просмотров ---------- */
  $('#s1').innerHTML = svg(`${R(0, 0, 1080, 1920, '#1d1f2e')}<circle cx="540" cy="900" r="700" fill="#2a2d44"/>
    <g transform="translate(190 150)">${C.phone(700, 1440, '#000')}</g>${hands()}`)
    + `<div class="scr" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:#000">
        <svg viewBox="0 0 630 1370" style="position:absolute;inset:0;width:100%;height:100%">${sky.replace('1080', '630')}${city(1000, .7, 9, 3)}
          <path d="M0,1000 L630,1000 L630,1370 L0,1370Z" fill="#2c3550" stroke="${K}" stroke-width="5"/>
          <g transform="translate(330 900) scale(.55)">${C.boy(Object.assign({ id: 'g1', mood: 'grin' }, GOSHA))}</g></svg>
        <div style="position:absolute;right:20px;top:560px;display:flex;flex-direction:column;gap:34px;align-items:center;color:#fff;font:800 30px/1 Rubik">
          <div style="text-align:center"><svg width="80" height="76" viewBox="0 0 40 38"><path d="M20,35 L6,21 Q-1,13 6,7 Q13,2 20,10 Q27,2 34,7 Q41,13 34,21Z" fill="#ff3b5c" stroke="#fff" stroke-width="2"/></svg><div>24K</div></div>
          <div style="text-align:center"><svg width="70" height="70" viewBox="0 0 40 40"><path d="M6,8 L34,8 L34,28 L18,28 L10,35 L10,28 L6,28Z" fill="#fff"/></svg><div>1.2K</div></div></div>
        <div style="position:absolute;left:30px;bottom:60px;color:#fff;font:700 32px/1.3 Onest">@gosha.roof<br><span style="font-weight:500">16 этаж без страховки 😎 #крыша</span></div></div>
      <div class="abs" id="views" style="left:50%;top:330px;transform:translateX(-50%);background:#fff;color:#211d2b;border:7px solid #211d2b;border-radius:24px;padding:14px 30px;font:900 70px/1 Rubik;white-space:nowrap"><svg width="70" height="50" viewBox="0 0 56 40" style="vertical-align:-4px"><path d="M2,20 Q28,-8 54,20 Q28,48 2,20Z" fill="#fff" stroke="#211d2b" stroke-width="4"/><circle cx="28" cy="20" r="10" fill="#211d2b"/></svg> <span id="cntv">100 000</span></div>`;

  /* ---------- S2. Подъезд, 16 этаж ---------- */
  $('#s2').innerHTML = svg(`
    ${R(0, 0, 1080, 1920, '#3b4a52')}${R(0, 0, 1080, 980, '#56707a')}
    <path d="M0,980 L1080,980" ${st}/>
    <g id="num16" transform="translate(760 330)">${R(0, 0, 240, 200, '#f2c94c', `${st} rx="16"`)}<text x="120" y="160" text-anchor="middle" font-family="Rubik" font-weight="900" font-size="150" fill="${K}">16</text></g>
    <path d="M-20,1500 L300,1500 L300,1400 L560,1400 L560,1300 L820,1300 L820,1200 L1100,1200 L1100,1940 L-20,1940Z" fill="#7d8a90" ${st}/>
    <path d="M60,700 L1060,260" stroke="#2c3438" stroke-width="16" stroke-linecap="round"/>
    <circle cx="300" cy="120" r="40" fill="#fff7c2" opacity=".9"/><path d="M300,160 L120,1500 L480,1500Z" fill="#fff7c2" opacity=".12"/>
    ${at(330, 980, .95, egor('e2', 'neutral'))}${at(760, 900, .95, gosha('g2', 'grin'))}`);

  /* ---------- S3. Крыша, город внизу ---------- */
  $('#s3').innerHTML = svg(`${sky}<g id="city3">${city(1250, 1, 14, 7)}</g>
    <path d="M-20,1250 L1100,1250 L1100,1940 L-20,1940Z" fill="#2c3550" ${st}/>
    <path d="M-20,1250 L1100,1250" stroke="#4b5675" stroke-width="16"/>
    <g transform="translate(120 1350)" id="hatch3"><path d="M0,0 L260,0 L260,60 L0,60Z" fill="#59647f" ${st}/><g id="lid3"><path d="M0,0 L260,0 L250,-200 L10,-200Z" fill="#7a869f" ${st}/></g></g>
    <path d="M850,1250 L850,880 M790,960 L910,960 M810,900 L890,900" ${st} stroke-width="10"/>
    ${at(480, 960, .8, egor('e3', 'worried'))}${at(800, 940, .8, gosha('g3', 'grin'))}
    <g transform="translate(880 1180) rotate(-14)">${R(-50, -90, 100, 180, '#1b1a22', `${st} rx="18"`)}${R(-42, -82, 84, 164, '#bfe0ff', 'rx="12"')}</g>
    ${R(-20, 1280, 1120, 70, '#3a4566', st)}
    <g id="wind" fill="none" stroke="#9db8d9" stroke-width="8" stroke-linecap="round" opacity=".7">
      <path d="M100,520 q120,-30 240,0 t240,0"/><path d="M500,640 q120,-30 240,0 t240,0"/><path d="M60,760 q100,-24 200,0"/></g>`);

  /* ---------- S4. Гоша снимает: «Ближе к краю» ---------- */
  $('#s4').innerHTML = svg(`${R(0, 0, 1080, 1920, '#121524')}<g transform="translate(190 150)">${C.phone(700, 1440, '#000')}</g>${hands()}`)
    + `<div class="scr" id="scr4" data-small style="left:225px;top:185px;width:630px;height:1370px;border-radius:70px;background:#000">
        <svg viewBox="0 0 630 1370" style="position:absolute;inset:0;width:100%;height:100%">${sky}<g transform="translate(0 260)">${city(900, .8, 10, 11)}</g>
          <path d="M0,1100 L630,1060 L630,1370 L0,1370Z" fill="#2c3550" stroke="${K}" stroke-width="5"/>
          <g id="eg4"><g transform="translate(300 900) scale(.62)"><g class="breath">${egor('e4', 'worried')}</g></g></g>
          <path d="M0,1100 L630,1060" stroke="#E5304A" stroke-width="6" stroke-dasharray="16 12"/></svg>
        <div style="position:absolute;left:30px;top:40px;display:flex;gap:12px;align-items:center;color:#fff;font:800 34px/1 Rubik"><i id="rec" style="width:28px;height:28px;border-radius:50%;background:#ff3b4e"></i>REC 00:12</div></div>`
    + bubble('b4', 'ГОША', 'Ближе к краю.<br>Ещё…', 120, 300, 200, '#f08a2a');

  /* ---------- S5. Нога на мокром металле ---------- */
  $('#s5').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0b1028')}
    <g transform="translate(0 700) scale(.5)">${city(1700, .6, 30, 19)}</g>
    <path d="M-20,1000 L700,1000 L700,1940 L-20,1940Z" fill="#59647f" ${st}/>
    <path d="M-20,1000 L700,1000" stroke="#9db8d9" stroke-width="10" opacity=".7"/>
    ${[[120, 1060], [320, 1120], [520, 1050], [200, 1260], [600, 1300]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="10" fill="#9fd3ff" opacity=".8"/>`).join('')}
    <g id="foot"><path d="M140,700 L330,700 L340,960 Q560,960 640,1000 L640,1060 L120,1060 Z" fill="#3e6fd1" ${st}/>
      <path d="M120,1000 L640,1000 L640,1060 L120,1060Z" fill="#fff" ${st}/>
      <path d="M380,975 L400,1000 M440,975 L460,1000 M500,980 L520,1000" ${st} stroke-width="5"/></g>`);

  /* ---------- S6. Люк захлопнулся ---------- */
  $('#s6').innerHTML = svg(`${sky}${city(1250, 1, 14, 7)}
    <path d="M-20,1250 L1100,1250 L1100,1940 L-20,1940Z" fill="#2c3550" ${st}/>
    <g transform="translate(400 1400)"><path d="M0,0 L300,0 L300,70 L0,70Z" fill="#59647f" ${st}/>
      <g id="lid6"><path d="M0,0 L300,0 L290,-240 L10,-240Z" fill="#7a869f" ${st}/><circle cx="150" cy="-60" r="16" fill="#c9a24a" ${st}/></g></g>
    <g id="bang" opacity="0" fill="none" stroke="#FFD23F" stroke-width="12" stroke-linecap="round"><path d="M360,1330 l-80,-40 M550,1290 l0,-90 M740,1330 l80,-40 M380,1450 l-90,20 M720,1450 l90,20"/></g>`)
    + `<div class="stamp" id="cls" style="left:150px;top:520px;font-size:80px">ЛЮК ЗАКРЫТ</div>`;

  /* ---------- S7. 3 % зарядки ---------- */
  $('#s7').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0b0e1c')}<g transform="translate(190 150)">${C.phone(700, 1440, '#141a33')}</g>${hands('#3e6fd1')}`)
    + `<div class="abs" style="left:225px;top:185px;width:630px;height:1370px;text-align:center;color:#fff">
        <div style="font:600 40px/1 Onest;margin-top:120px;opacity:.8">суббота, 23:47</div>
        <div id="bat" style="margin:180px auto 0;width:360px;height:180px;border:12px solid #fff;border-radius:34px;position:relative">
          <i id="batf" style="position:absolute;left:10px;top:10px;bottom:10px;width:16px;border-radius:10px;background:#ff3b4e"></i>
          <i style="position:absolute;right:-40px;top:50px;width:28px;height:60px;border-radius:0 14px 14px 0;background:#fff"></i></div>
        <div style="font:900 180px/1 Rubik;color:#ff3b4e;margin-top:40px">3%</div>
        <div style="font:600 40px/1.2 Onest;opacity:.8;margin-top:10px">Низкий заряд</div></div>`;

  /* ---------- S8. Гоша смеётся ---------- */
  $('#s8').innerHTML = svg(`${sky}${city(1250, 1, 14, 5)}
    <path d="M-20,1250 L1100,1250 L1100,1940 L-20,1940Z" fill="#2c3550" ${st}/>
    ${at(300, 960, 1.0, gosha('g8', 'grin'))}${at(800, 1020, .9, egor('e8', 'worried'))}`)
    + bubble('b8', 'ГОША', 'Сначала снимем.<br>Потом разберёмся 😂', 70, 360, 180, '#f08a2a');

  /* ---------- S9. Выбор ---------- */
  $('#s9').innerHTML = svg(`${sky}${city(1350, 1, 14, 9)}<circle cx="540" cy="1100" r="620" fill="#343c69" opacity=".55"/>
    ${at(540, 960, 1.3, egor('e9', 'worried'))}`) + `
    <div class="pill" id="q9" style="left:50%;top:300px;transform:translateX(-50%);font-size:48px;border:5px solid #fff">ЧТО ТЫ СДЕЛАЕШЬ?</div>
    <div class="card" id="c1" style="left:36px;top:420px;width:400px;background:#E5304A"><span class="n">1</span><h3 style="font-size:54px">Сделать кадр</h3><p>и стать легендой?</p></div>
    <div class="card" id="c2" style="left:556px;top:470px;width:400px;background:#2F5BEA"><span class="n">2</span><h3 style="font-size:54px">Позвонить маме</h3><p>и стать посмешищем?</p></div>
    <div class="pill" id="cm9" style="left:50%;top:1500px;transform:translateX(-50%);background:#FFD23F;color:#211d2b;border:6px solid #211d2b">пиши 1 или 2 в комментах</div>`;

  /* ---------- S10. Финал ---------- */
  $('#s10').innerHTML = svg(`${R(0, 0, 1080, 1920, '#0d1117')}`) + `
    <div class="abs" id="rule" style="left:110px;top:300px;width:760px;text-align:center">
      <div style="font:900 84px/1.02 Rubik;color:#FFD23F">НИ ОДИН ЛАЙК<br>НЕ СТОИТ ЖИЗНИ</div>
      <div style="font:600 44px/1.25 Onest;margin-top:20px;color:#dfe4f0">в опасности — сразу звони <b style="color:#fff">112</b></div></div>
    <div class="abs" id="help" style="left:110px;top:720px;width:760px;background:#0f2a22;border:6px solid #27C46B;border-radius:40px;padding:40px;text-align:center;box-shadow:0 0 80px rgba(39,196,107,.25)">
      <div style="font:500 46px/1.2 Onest;color:#cfe">Детский телефон доверия</div>
      <div id="num" style="display:inline-block;margin-top:22px;background:#27C46B;color:#08130e;border-radius:24px;padding:18px 30px;font:900 70px/1 Rubik">8-800-2000-122</div>
      <div style="font:500 44px/1.25 Onest;margin-top:20px;color:#9fb">бесплатно · анонимно</div></div>
    <div class="abs" id="part2" style="left:50%;top:1110px;transform:translateX(-50%) rotate(-3deg);background:#E5304A;color:#fff;border:7px solid #fff;border-radius:22px;padding:22px 50px;font:900 104px/1 Rubik;white-space:nowrap">ЧАСТЬ 2</div>`;
})();
