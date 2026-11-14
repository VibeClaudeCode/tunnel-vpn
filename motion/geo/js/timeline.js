M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  const cuts = [['#s1', 0], ['#s2', 3.6, 'zoom'], ['#s3', 7.7, 'push-left'], ['#s4', 10.6, 'zoom'], ['#s5', 14.0, 'slide-left'],
    ['#s6', 18.2, 'push-up'], ['#s7', 22.7, 'cut'], ['#s8', 25.6, 'zoom'], ['#s9', 29.1, 'wipe-down'], ['#s10', 32.5, 'zoom'],
    ['#s11', 40.0, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  // ---- субтитры ----
  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.3, hold: 0.25, upper: true, sfx: false });
  const HL = ['ВСЕГДА', 'ДАШИ?', 'БАССЕЙНЕ?', 'ЛЮБОВЬ', 'ГЕОЛОКАЦИЯ', 'ОДНОГО', 'ПЕРВОГО', 'СЕНТЯБРЯ', 'ДЕСЯТЬ', 'ТЫ?', 'РОДИТЕЛЯМ'];
  const HR = ['СКРЫВАЕШЬ?»', 'МАКС'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!]+$/, '');
    if (HL.includes(sp.textContent) || HL.includes(w)) sp.classList.add('hl');
    if (HR.includes(sp.textContent) || HR.includes(w)) sp.classList.add('hr');
  });

  // ---- жизнь персонажей ----
  const chars = { s2: 0.3, d2: 1.6, s3: 0.9, s4: 2.2, m9: 0.5, s10: 0.2 };
  const look = {
    s2: [[0, -12, 2], [4.0, -12, 2], [4.3, 6, 14]],
    d2: [[0, 14, 2]],
    s3: [[0, 0, 4], [8.2, -10, -8]],
    s4: [[0, 14, -10]],
    m9: [[0, 0, 4], [31.3, 0, 0]],
    s10: [[0, 0, 4], [33.0, -16, -4], [34.6, 16, -4], [36.9, 0, 4]],
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
  // метка на карте едет по маршруту
  const trail = q('#trail'), L = trail.getTotalLength(), pm = q('#pinmove');
  M.onFrame(t => {
    breaths.forEach((g, i) => g.setAttribute('transform', `translate(0 ${(Math.sin(t * 2.1 + i) * 4).toFixed(2)})`));
    for (const id in chars) {
      const e = document.getElementById(id + '-eyes'); if (!e) continue;
      const ph = (t + chars[id]) % 3.4, bl = ph < 0.14 ? 1 - Math.sin(ph / 0.14 * Math.PI) * 0.92 : 1;
      e.style.transform = `scaleY(${bl.toFixed(3)})`;
      const [dx, dy] = pupil(id, t), p = document.getElementById(id + '-pup');
      if (p) p.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    }
    const u = gsap.parseEase('power2.inOut')(Math.max(0, Math.min(1, t / 2.8))), pt = trail.getPointAtLength(L * u);
    pm.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    trail.style.strokeDashoffset = 0; trail.setAttribute('stroke-dasharray', `4 26`);
    trail.style.clipPath = `inset(${(pt.y - 40).toFixed(0)}px 0 0 0)`;
    // наезд на экран домофона: масштаб вокруг точки (770, 610)
    const z = 1 + 0.8 * gsap.parseEase('power3.inOut')(Math.max(0, Math.min(1, (t - 31.3) / 0.9)));
    q('#z9').setAttribute('transform', `translate(${(770 * (1 - z)).toFixed(1)} ${(610 * (1 - z)).toFixed(1)}) scale(${z.toFixed(4)})`);
    // волна в бассейне
    const wv = q('#wave'); if (wv) wv.setAttribute('transform', `translate(${(Math.sin(t * 1.6) * 40).toFixed(1)} 0)`);
  });

  // ===== S1: карта =====
  M.show('#watch', { at: 0.2, in: 'drop' });
  tl.fromTo('#ring1', { attr: { r: 40 }, opacity: 0.9 }, { attr: { r: 160 }, opacity: 0, duration: 0.8, ease: 'power2.out', repeat: 1 }, 2.9);
  M.sfx('bubble', 2.92); M.hit(3.0, 's');
  M.show('#upd', { at: 3.0, in: 'pop' });

  // ===== S2: у Даши =====
  tl.fromTo('#n2', { y: -240, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 4.0);
  M.sfx('ding', 4.0, { gain: -3 });
  M.shake('#n2', { at: 6.2, amp: 6, dur: 0.3 });

  // ===== S3: бассейн =====
  tl.fromTo('#n3', { y: -240, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 8.05);
  M.sfx('ding', 8.05, { gain: -3 }); M.sfx('thud', 9.4);

  // ===== S4: «это любовь» =====
  tl.fromTo('#thought', { scale: 0, svgOrigin: '780 700' }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 10.85);
  tl.fromTo('#maxph', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)' }, 11.1);
  tl.fromTo('#hearts .hh', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(3)', stagger: 0.1 }, 11.9);
  M.ticks(11.9, { n: 6, gap: 0.1, name: 'pop' }); M.sfx('shimmer', 12.0);
  M.float('#hearts .hh', { y: 16, rot: 8, period: 2.2 });
  tl.to('#hearts .hh', { scale: 0, autoAlpha: 0, duration: 0.25, ease: 'power3.in', stagger: 0.04 }, 13.7);

  // ===== S5: Даша берёт телефон, настройки =====
  tl.fromTo('#dhand', { x: 400, y: 300 }, { x: 0, y: 0, duration: 0.5, ease: 'expo.out' }, 14.1);
  M.sfx('swish', 14.1);
  tl.to('#dhand', { x: 400, y: 300, duration: 0.4, ease: 'power3.in' }, 15.6);
  tl.to('#q3', { backgroundColor: '#dfe7ff', duration: 0.2 }, 16.35); M.sfx('tap', 16.4);
  tl.to('#q4', { backgroundColor: '#ffe1e5', duration: 0.2 }, 17.3); M.sfx('tap', 17.35);
  tl.to('#q4', { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, 17.3);

  // ===== S6: доступ =====
  M.show('#acc', { at: 18.35, in: 'pop' });
  tl.fromTo('#alw', { scale: 1 }, { scale: 1.5, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 20.45);
  M.hit(20.46, 'm'); M.shake('#acc', { at: 20.5, amp: 10, dur: 0.3 });
  tl.fromTo('#sep', { scale: 1 }, { scale: 1.5, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 21.5);
  M.sfx('thock', 21.5);
  M.show('#hist .hi', { at: 21.0, in: 'slide', stagger: 0.18 });

  // ===== S7: выключатель =====
  tl.to('#knob', { left: 6, duration: 0.3, ease: 'back.out(2)' }, 23.25);
  tl.to('#tgl', { backgroundColor: '#c3c8d2', duration: 0.3 }, 23.25);
  M.sfx('tap', 23.3); M.sfx('swipe', 23.3);
  M.show('#off7', { at: 23.7, in: 'rise' });
  tl.fromTo('#clk7', { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2.2)' }, 24.7);
  M.sfx('thock', 24.85);

  // ===== S8: «Что ты скрываешь?» =====
  tl.set(['#m81', '#m82'], { autoAlpha: 0 }, 0);
  tl.fromTo('#m81', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 26.75);
  M.sfx('pop', 26.75);
  tl.fromTo('#m82', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 28.05);
  M.hit(28.1, 'm');
  tl.to('#redv', { opacity: 1, duration: 0.25 }, 28.1); tl.to('#redv', { opacity: 0.4, duration: 0.6 }, 28.35);
  tl.fromTo('#scr8 .spam', { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 0.2, ease: 'expo.out', stagger: 0.11 }, 28.4);
  M.ticks(28.4, { n: 6, gap: 0.11, name: 'blip' });

  // ===== S9: домофон =====
  tl.fromTo('#clk9', { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2.2)' }, 29.3);
  M.sfx('thock', 29.45);
  tl.fromTo('#rings', { opacity: 0 }, { opacity: 1, duration: 0.12, yoyo: true, repeat: 7, ease: 'none' }, 30.45);
  M.ticks(30.45, { n: 8, gap: 0.12, name: 'blip', rise: false });
  tl.fromTo('#icom', { x: 0 }, { x: 8, duration: 0.06, yoyo: true, repeat: 9 }, 30.45);
  
  M.hit(31.64, 'l');

  // ===== S10: выбор =====
  M.show('#q10', { at: 32.6, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 32.7);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 34.4);
  M.sfx('whoosh', 32.6); M.sfx('hit', 33.05); M.sfx('whoosh', 34.3); M.sfx('hit', 34.75);
  tl.to('#c1', { scale: 0.94, opacity: 0.75, duration: 0.4, ease: 'power2.out' }, 34.4);
  tl.to('#c1', { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 36.9);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm10', { at: 38.1, in: 'pop' });

  // ===== S11: финал =====
  M.show('#rule', { at: 40.25, in: 'rise' });
  M.show('#help', { at: 40.9, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 41.5);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 42.6);
  M.hit(42.9, 'l'); M.shake('#part2', { at: 42.9, amp: 12, dur: 0.35 });
});
