M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  const cuts = [['#s0', 0], ['#s1', 3.0, 'zoom'], ['#s2', 9.55, 'zoom'], ['#s3', 12.7, 'push-left'], ['#s4', 15.3, 'slide-left'],
    ['#s5', 20.25, 'cut'], ['#s6', 24.8, 'push-up'], ['#s7', 27.6, 'wipe-down'], ['#s8', 31.1, 'zoom'], ['#s8b', 35.85, 'zoom'],
    ['#s9', 37.45, 'zoom'], ['#s10', 44.0, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  // ---- субтитры ----
  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.6, hold: 0.25, upper: true, sfx: false });
  const HL = ['ПРАВДУ', 'ДЕСЯТЬ', 'МИНУТ', 'СОРОК', 'СЕМЬ', 'ВМЕСТЕ', 'ДИРЕКТОРУ', 'ПОЛИЦИИ»', 'ИСЧЕЗАЕТ', 'ДЕВЯТЬ', 'КИРА?'];
  const HR = ['«КИРА-СТУКАЧКА»', 'АЛИНЫ', 'ЛУЧШЕЙ', 'ПОДРУГИ'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!]+$/, '');
    if (HL.includes(sp.textContent) || HL.includes(w)) sp.classList.add('hl');
    if (HR.includes(sp.textContent) || HR.includes(w)) sp.classList.add('hr');
  });

  // ---- жизнь персонажей ----
  const chars = { m1: 0.3, k1: 1.4, m3: 0.9, k3: 2.2, t4: 0.5, t5: 1.7, k7: 0.8, k8: 2.6, k9: 0.2 };
  const look = {
    m1: [[0, 18, 0], [4.5, 18, 0], [5.0, 8, 14]],
    k1: [[0, -12, 6], [4.6, -12, 6], [5.2, -16, 2]],
    m3: [[0, 10, 0]], k3: [[0, -10, 0]],
    t4: [[0, 10, 12], [17.6, 0, 2]],
    t5: [[0, -12, 4], [23.6, -12, 4], [23.9, -16, -2]],
    k7: [[0, 0, 4], [30.0, 0, 4], [30.4, 14, 10]],
    k8: [[0, 0, 0], [36.5, -4, 2]],
    k9: [[0, 0, 4], [38.0, -16, -4], [38.9, 16, -4], [40.0, 0, 4]],
  };
  const sm = x => x * x * (3 - 2 * x);
  const pupil = (id, t) => {
    const ks = look[id]; if (!ks) return [0, 0];
    let a = ks[0], b = ks[0];
    for (let i = 0; i < ks.length; i++) if (ks[i][0] <= t) { a = ks[i]; b = ks[i + 1] || ks[i]; }
    const v = b === a ? 0 : sm(Math.max(0, Math.min(1, (t - (b[0] - 0.3)) / 0.3)));
    return [a[1] + (b[1] - a[1]) * v, a[2] + (b[2] - a[2]) * v];
  };
  const breaths = [...document.querySelectorAll('.breath')];
  const clkt = q('#clkt');
  M.onFrame(t => {
    breaths.forEach((g, i) => g.setAttribute('transform', `translate(0 ${(Math.sin(t * 2.1 + i) * 4).toFixed(2)})`));
    for (const id in chars) {
      const e = document.getElementById(id + '-eyes'); if (!e) continue;
      const ph = (t + chars[id]) % 3.4, bl = ph < 0.14 ? 1 - Math.sin(ph / 0.14 * Math.PI) * 0.92 : 1;
      e.style.transform = `scaleY(${bl.toFixed(3)})`;
      const [dx, dy] = pupil(id, t), p = document.getElementById(id + '-pup');
      if (p) p.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    }
    // часы на кухне: 21:10 → 21:20 за «десять минут»
    const m = 10 + Math.round(Math.max(0, Math.min(1, (Math.floor(t * 30) / 30 - 7.1) / 1.2)) * 10);
    clkt.textContent = `21:${String(m).padStart(2, '0')}`;
    // вибрация в S7
    const ph7 = q('#ph7'), a = 30.24, b = 31.1, on = t > a && t < b ? 1 : 0;
    ph7.setAttribute('transform', `translate(${(on * Math.sin(t * 95) * 7).toFixed(2)} 0) rotate(${(on * Math.sin(t * 71) * 1.5).toFixed(2)})`);
    q('#ph7glow').setAttribute('opacity', on * 0.55); q('#buzz7').setAttribute('opacity', on * 0.9);
  });
  M.ticks(30.24, { n: 6, gap: 0.07, name: 'thud', rise: false });

  // ===== S0: «Вы выбрали» =====
  tl.fromTo('#p2', { y: -40 }, { y: 0, duration: 0.6, ease: 'expo.out' }, 0);
  tl.fromTo('#c0', { scale: 1.35, rotation: -10 }, { scale: 1, rotation: -3, duration: 0.7, ease: 'expo.out' }, 0);
  M.sfx('hit', 0.05);
  tl.fromTo('#st0', { scale: 2.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power4.in' }, 1.45);
  M.hit(1.73, 'm'); M.shake('#c0', { at: 1.73, amp: 12, dur: 0.3 });
  tl.fromTo('.cm', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'back.out(2.6)', stagger: 0.12 }, 1.95);
  M.ticks(1.95, { n: 6, gap: 0.12, name: 'pop' });
  M.float('.cm', { y: 8, x: 4, rot: 2, period: 2 });

  // ===== S1: телефон маме =====
  tl.to('#ph1', { x: -400, y: -40, rotation: -12, duration: 0.8, ease: 'power3.inOut' }, 3.9);
  M.sfx('swish', 4.0);
  tl.fromTo('#clk1', { scale: 1 }, { scale: 1.15, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out', svgOrigin: '910 385' }, 7.1);
  M.ticks(7.1, { n: 10, gap: 0.12, name: 'tick', rise: false });

  // ===== S2: скриншоты =====
  tl.fromTo('#grid .th', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.25, ease: 'back.out(2)', stagger: 0.045 }, 10.25);
  M.count('#cnt47', { from: 0, to: 47, at: 10.3, dur: 1.4, sfx: false });
  [10.36, 10.62, 10.88, 11.14, 11.4].forEach(t => { tl.fromTo('#flash', { opacity: 0.85 }, { opacity: 0, duration: 0.16, ease: 'power2.out' }, t); M.sfx('tap', t, { gain: 2 }); });
  M.sfx('chime', 11.7, { gain: -4 });

  // ===== S3: школа =====
  tl.fromTo('#walk', { x: -140 }, { x: 70, duration: 2.8, ease: 'sine.inOut' }, 12.7);

  // ===== S4: классная =====
  tl.fromTo('#t4', { y: 0 }, { y: -20, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 16.85);
  tl.fromTo('#b4', { scale: 0.3, autoAlpha: 0, transformOrigin: '60% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 18.0);
  M.sfx('pop', 18.0, { rate: 0.9 });

  // ===== S5: распечатки =====
  tl.fromTo('#papers .sheet', { y: -1100, autoAlpha: 1 }, { y: 0, duration: 0.45, ease: 'power3.in', stagger: 0.09 }, 20.35);
  M.sfx('swish', 20.4); M.ticks(20.8, { n: 5, gap: 0.09, name: 'thud', rise: false }); M.sfx('thock', 21.2);
  tl.fromTo('#b5', { scale: 0.3, autoAlpha: 0, transformOrigin: '20% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 22.3);
  M.sfx('pop', 22.3, { rate: 0.85 });
  M.hit(24.04, 'm'); M.shake('#b5', { at: 24.04, amp: 10, dur: 0.3 });

  // ===== S6: чат удалён =====
  tl.set('#del', { autoAlpha: 0 }, 0);
  tl.fromTo('#del', { autoAlpha: 1, clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.45, ease: 'expo.out' }, 26.4);
  M.sfx('swipe', 26.4); M.sfx('thud', 26.75);
  tl.to('#r1', { autoAlpha: 0, x: -200, duration: 0.35, ease: 'power3.in' }, 27.0);
  tl.to(['#r2', '#r3', '#r4'], { y: -128, duration: 0.5, ease: 'expo.out' }, 27.25);

  // ===== S7: снова 21:00 =====
  tl.fromTo('#clock', { scale: 0.4, autoAlpha: 0, svgOrigin: '805 405' }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.2)' }, 28.85);
  M.sfx('thock', 29.05);

  // ===== S8: «Кира-стукачка» =====
  M.count('#cnt43', { from: 0, to: 43, at: 32.2, dur: 0.9, sfx: false }); M.ticks(32.2, { n: 8, gap: 0.1, name: 'tick' });
  M.show('#sys8', { at: 33.1, in: 'pop' });
  tl.fromTo('#am', { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 33.9);
  M.sfx('ding', 33.9, { gain: -3 });
  M.hit(34.75, 'l'); M.shake('#scr8', { at: 34.8, amp: 12, dur: 0.4 });
  tl.to('#redv', { opacity: 1, duration: 0.25, ease: 'power2.out' }, 34.8);
  tl.to('#redv', { opacity: 0.45, duration: 0.8, ease: 'sine.out' }, 35.05);

  // ===== S8b: лицо =====
  tl.fromTo('#bf', { scale: 2.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 36.05);
  M.sfx('thud', 36.35);

  // ===== S9: выбор =====
  M.show('#q9', { at: 37.55, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 37.7);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 38.6);
  M.sfx('whoosh', 37.6); M.sfx('hit', 38.05); M.sfx('whoosh', 38.5); M.sfx('hit', 38.95);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm9', { at: 40.3, in: 'pop' });

  // ===== S10: финал =====
  M.show('#help', { at: 44.2, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 44.9);
  tl.fromTo('#part3', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 46.2);
  M.hit(46.5, 'l'); M.shake('#part3', { at: 46.5, amp: 12, dur: 0.35 });
});
