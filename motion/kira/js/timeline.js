M.start(({ tl, D }) => {
  const O = 0.3;
  M.grain(0.07);                                   // голос стоит с 0,3 с
  const q = s => document.querySelector(s);
  const ease = { in: 'expo.out', out: 'power3.in' };

  // ---- сцены и стыки ----
  const cuts = [['#s1', 0], ['#s2', 4.3, 'zoom'], ['#s4', 15.1, 'push-left'], ['#s5', 18.35, 'slide-left'], ['#s6', 22.6, 'push-up'],
    ['#s7', 26.6, 'wipe-down'], ['#s8', 30.8, 'zoom'], ['#s9', 34.7, 'push-left'], ['#s10', 38.55, 'zoom'], ['#s11', 47.3, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);

  // ---- камера: каждая сцена входит лёгким «толчком» и потом медленно наезжает ----
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  // ---- субтитры ----
  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: O, hold: 0.25, upper: true, sfx: false });
  const HL = ['«КИРА-ШОУ»', 'СОРОК', 'ТРИ', '«Б»', 'СТО', 'ДВЕНАДЦАТЬ', 'СОВСЕМ', '«НОРМАЛЬНО»', 'ВНИЗ', 'ДВЕСТИ', 'ТЫ?', 'ПРАВДУ'];
  const HR = ['«ЗАВТРА', 'БУДЕТ', 'СМЕШНЕЕ»'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!?]+$/, '');
    if (HL.includes(sp.textContent) || HL.includes(w)) sp.classList.add('hl');
    if (HR.includes(sp.textContent) || HR.includes(w)) sp.classList.add('hr');
  });

  // ---- жизнь персонажей: дыхание, моргание, взгляд ----
  const chars = { k1: 0.3, k4: 1.1, k5: 0.7, m5: 2.1, m6: 0.4, k7: 1.6, m9: 0.9, k10: 0.2, kp: 5 };
  const look = {                                    // [время, dx, dy] — зрачки
    k1: [[0, 0, 4], [2.9, 0, 4], [3.2, 14, 10]],
    k4: [[0, 0, 8], [16.6, -10, 8], [17.4, 0, 12]],
    k5: [[0, -6, 2], [21.6, -14, 0], [22.2, 0, 8]],
    m5: [[0, 10, 0], [19.4, 12, 2]],
    m6: [[0, 8, 4], [24.3, 8, 4], [24.8, 14, 14]],
    k7: [[0, 0, -6], [27.4, 0, -6], [27.8, 14, 0], [29.6, 14, 0], [30.2, 0, -6]],
    m9: [[0, 0, 4], [36.6, 6, 10]],
    k10: [[0, 0, 4], [38.9, -16, -4], [42.9, 16, -4], [44.7, 0, 4]],
  };
  const sm = x => x * x * (3 - 2 * x);
  const pupil = (id, t) => {
    const ks = look[id]; if (!ks) return [0, 0];
    let a = ks[0], b = ks[0];
    for (let i = 0; i < ks.length; i++) { if (ks[i][0] <= t) { a = ks[i]; b = ks[i + 1] || ks[i]; } }
    const u = b === a ? 0 : sm(Math.min(1, (t - a[0]) / Math.max(0.01, Math.min(0.3, b[0] - a[0]))));
    // переход за 0,3 с от момента b[0]-0.3 до b[0]
    const v = b === a ? 0 : sm(Math.max(0, Math.min(1, (t - (b[0] - 0.3)) / 0.3)));
    return [a[1] + (b[1] - a[1]) * v, a[2] + (b[2] - a[2]) * v];
  };
  const breaths = [...document.querySelectorAll('.breath')];
  M.onFrame(t => {
    breaths.forEach((g, i) => g.setAttribute('transform', `translate(0 ${(Math.sin(t * 2.1 + i) * 4).toFixed(2)})`));
    for (const id in chars) {
      const e = document.getElementById(id + '-eyes'); if (!e) continue;
      const ph = (t + chars[id]) % 3.4, bl = ph < 0.14 ? 1 - Math.sin(ph / 0.14 * Math.PI) * 0.92 : 1;
      e.style.transform = `scaleY(${bl.toFixed(3)})`;
      const [dx, dy] = pupil(id, t); const p = document.getElementById(id + '-pup');
      if (p) p.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    }
    // вибрация телефона: S1 (2,96–4,3), S7 (26,84–30,8)
    const vib = (sel, a, b) => { const el = q(sel); if (!el) return 0; const on = t > a && t < b ? Math.max(0, Math.sin((t - a) * Math.PI / 0.9)) : 0;   // пачки по 0,9 с
      const k = on > 0.15 ? 1 : 0; el.setAttribute('transform', `translate(${(k * Math.sin(t * 95) * 7).toFixed(2)} 0) rotate(${(k * Math.sin(t * 71) * 1.5).toFixed(2)})`); return k; };
    const v1 = vib('#ph1', 2.96, 4.4), v7 = vib('#ph7', 26.84, 30.8);
    q('#ph1glow').setAttribute('opacity', (t > 2.96 && t < 4.4 ? 0.55 : 0)); q('#buzz').setAttribute('opacity', v1 * 0.9);
    q('#ph1scr').setAttribute('fill', t > 2.96 ? '#9cc6ff' : '#2a3350');
    q('#ph7glow').setAttribute('opacity', (t > 26.84 && t < 30.8 ? 0.35 + 0.25 * Math.abs(Math.sin(t * 3)) : 0)); q('#buzz7').setAttribute('opacity', v7 * 0.9);
  });

  // ---- звук вибрации: пачки низких ударов ----
  const buzz = (a, b) => { for (let t = a; t < b - 0.3; t += 0.9) M.ticks(t, { n: 6, gap: 0.07, name: 'thud', rise: false }); };
  buzz(2.96, 4.4); buzz(26.84, 30.8);

  // ===== S1 =====
  tl.fromTo('#clock', { scale: 0.4, autoAlpha: 0, svgOrigin: '805 405' }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.2)' }, 1.7);
  M.sfx('thock', 1.86);
  M.hit(2.96, 'm');

  // ===== S2–S3: чат =====
  M.show('#m1', { at: 4.6, in: 'pop' }); M.show('#m2', { at: 5.2, in: 'pop' });
  M.count('#cnt43', { from: 0, to: 43, at: 6.3, dur: 0.9 });
  tl.fromTo('#stamp7', { scale: 2.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power4.in' }, 7.85);
  M.shake('#scr2', { at: 8.13, amp: 14, dur: 0.3 }); M.hit(8.13, 'm');
  tl.to('#stamp7', { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power3.in' }, 9.0);
  M.show('#m3', { at: 9.3, in: 'rise' });
  tl.fromTo('#cens i', { scaleX: 0, transformOrigin: '0 50%' }, { scaleX: 1, duration: 0.25, stagger: 0.12, ease: 'power3.out' }, 11.7);
  M.sfx('scratch', 11.7);
  tl.fromTo('#rx', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2.5)' }, 12.9);
  M.count('#cnt112', { from: 0, to: 112, at: 12.95, dur: 1.4 });
  tl.fromTo('.lolf', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(2.4)', stagger: 0.12 }, 13.2);
  M.float('.lolf', { y: 14, x: 8, rot: 6, period: 1.6 });
  tl.to('.lolf', { scale: 0, autoAlpha: 0, duration: 0.25, ease: 'power3.in', stagger: 0.04 }, 14.75);

  // ===== S4: столовая =====
  M.show('#haha .pill', { at: 15.7, in: 'pop', stagger: 0.35 });
  M.float('#haha .pill', { y: 10, x: 4, rot: 3, period: 2.2 });
  tl.to('#tray', { x: 900, rotation: 8, duration: 0.55, ease: 'power3.in' }, 17.55);
  M.sfx('whoosh', 17.55); M.sfx('thud', 18.05);

  // ===== S5: кухня =====
  tl.fromTo('#b5a', { scale: 0.3, autoAlpha: 0, transformOrigin: '20% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 19.6);
  M.sfx('pop', 19.6);
  tl.fromTo('#b5b', { scale: 0.3, autoAlpha: 0, transformOrigin: '40% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 21.95);
  M.sfx('pop', 21.95, { rate: 0.8 });

  // ===== S6: телефон экраном вниз =====
  tl.fromTo('#ph6g', { y: 500 }, { y: 0, duration: 0.7, ease: 'expo.out' }, 22.7);
  tl.fromTo('#hand6', { y: 500 }, { y: 0, duration: 0.7, ease: 'expo.out' }, 22.7);
  tl.to('#ph6', { scaleX: 0, duration: 0.22, ease: 'power2.in', svgOrigin: '0 0' }, 24.6);
  tl.set('#ph6front', { autoAlpha: 0 }, 24.82); tl.set('#ph6back', { autoAlpha: 1 }, 24.82);
  tl.to('#ph6', { scaleX: 1, duration: 0.35, ease: 'back.out(1.6)', svgOrigin: '0 0' }, 24.82);
  M.sfx('thock', 25.1);
  tl.to('#hand6', { y: 520, duration: 0.5, ease: 'power3.in' }, 25.3);
  M.draw.circle({ x: 410, y: 950, w: 380, h: 700 }, { at: 25.6, color: '#E5304A', width: 12, host: '#s6' });

  // ===== S7: ночь =====
  tl.fromTo('#badge', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2.6)' }, 29.4);
  M.count('#cnt200', { from: 1, to: 200, at: 29.45, dur: 1.0 });
  M.shake('#badge', { at: 30.45, amp: 10, dur: 0.3 });

  // ===== S8: незнакомый номер =====
  M.show('#n1', { at: 30.9, in: 'drop' }); M.show('#n2', { at: 31.05, in: 'drop' });
  tl.fromTo('#n3', { y: -160, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 31.4);
  M.sfx('ding', 31.4, { gain: -4 });
  tl.set('#threat', { autoAlpha: 0 }, 0);
  tl.fromTo('#typing', { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.3, repeat: 4, yoyo: true, ease: 'sine.inOut' }, 31.9);
  tl.to('#typing', { autoAlpha: 0, height: 0, marginTop: 0, duration: 0.2 }, 33.15);
  M.text('#threat', { at: 33.22, in: 'type', cps: 30, cursor: false });
  tl.set('#threat', { autoAlpha: 1 }, 33.22);
  M.hit(33.24, 'l');
  M.shake('#n3', { at: 33.6, amp: 12, dur: 0.4 });
  tl.to('#redv', { opacity: 1, duration: 0.25, ease: 'power2.out' }, 33.3);
  tl.to('#redv', { opacity: 0.45, duration: 1.0, ease: 'sine.out' }, 33.6);

  // ===== S9: мама в дверях =====
  tl.fromTo('#b9', { scale: 0.3, autoAlpha: 0, transformOrigin: '20% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 36.75);
  M.sfx('pop', 36.75, { rate: 0.85 });

  // ===== S10: выбор =====
  M.show('#q10', { at: 38.7, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 38.75);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 42.95);
  M.sfx('whoosh', 38.6); M.sfx('hit', 39.1); M.sfx('whoosh', 42.8); M.sfx('hit', 43.3);
  tl.to('#c1', { scale: 0.94, opacity: 0.75, duration: 0.4, ease: 'power2.out' }, 42.95);
  tl.to('#c1', { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 44.6);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm10', { at: 45.8, in: 'pop' });

  // ===== S11: финал =====
  M.show('#help', { at: 47.45, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 48.4);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 50.3);
  M.hit(50.6, 'l'); M.shake('#part2', { at: 50.6, amp: 12, dur: 0.35 });
});
