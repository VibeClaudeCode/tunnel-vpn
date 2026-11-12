M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  // ---- сцены ----
  const cuts = [['#s1', 0], ['#s2', 3.0, 'zoom'], ['#s3', 7.35, 'push-left'], ['#s4', 8.85, 'zoom'], ['#s5', 11.55, 'slide-left'],
    ['#s5b', 14.6, 'zoom'], ['#s6', 16.9, 'push-up'], ['#s7', 21.45, 'cut'], ['#s8', 24.0, 'push-left'], ['#s9', 28.1, 'zoom'],
    ['#s10', 36.6, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  // ---- субтитры ----
  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.3, hold: 0.25, upper: true, sfx: false });
  const HL = ['СОРОК', 'ТЫСЯЧ»', 'МАМИНУ', 'ДВАДЦАТЬ', 'ВОСЕМЬ', 'ТЫСЯЧ', 'ДВЕ', 'НЕДЕЛИ', 'ТЫ?', 'ПРАВДУ', 'ВЫКЛЮЧЕННЫМ', 'СВЕТОМ'];
  const HR = ['«ЕЩЁ', 'ОДИН', 'КОД', 'ИЛИ', 'МЫ', 'НАПИШЕМ', 'ТВОЕЙ', 'МАМЕ»'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!?]+$/, ''), g = sp.closest('.mo-capl').textContent;
    if (HL.includes(sp.textContent) || HL.includes(w)) sp.classList.add('hl');
    if (/«ЕЩЁ|НАПИШЕМ/.test(g) && HR.includes(w)) sp.classList.add("hr");
  });

  // ---- жизнь персонажей ----
  const chars = { b1: 0.3, b5: 1.1, b7: 0.7, b9: 0.2, mav: 2 };
  const look = {
    b1: [[0, 0, 14]],
    b5: [[0, 0, 0], [15.6, 0, 0], [15.9, -6, 4], [16.3, 6, 4]],
    b7: [[0, 0, 14], [24.3, 0, 14], [24.6, -16, 0]],
    b9: [[0, 0, 4], [28.6, -16, -4], [31.5, 16, -4], [34.6, 0, 4]],
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
  M.onFrame(t => {
    breaths.forEach((g, i) => g.setAttribute('transform', `translate(0 ${(Math.sin(t * 2.1 + i) * 4).toFixed(2)})`));
    for (const id in chars) {
      const e = document.getElementById(id + '-eyes'); if (!e) continue;
      const ph = (t + chars[id]) % 3.4, bl = ph < 0.14 ? 1 - Math.sin(ph / 0.14 * Math.PI) * 0.92 : 1;
      e.style.transform = `scaleY(${bl.toFixed(3)})` + (id === 'b5' ? ' scale(1.05)' : '');
      const [dx, dy] = pupil(id, t), p = document.getElementById(id + '-pup');
      if (p) p.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    }
    const fl = 0.18 + 0.05 * Math.sin(t * 7) + 0.03 * Math.sin(t * 17);   // мерцание света от экрана
    ['#glow1', '#glow7'].forEach(s => q(s) && q(s).setAttribute('opacity', fl.toFixed(3)));
  });

  // ===== S1 =====
  tl.fromTo('#clock', { scale: 0.4, autoAlpha: 0, svgOrigin: '275 375' }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2.2)' }, 0.55);
  M.sfx('thock', 0.75);
  tl.fromTo('#n1', { y: -260, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 2.2);
  M.sfx('ding', 2.25, { gain: -3 });

  // ===== S2 =====
  tl.fromTo('#drg', { scale: 0, rotation: -30, autoAlpha: 0 }, { scale: 1, rotation: 0, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.8)' }, 3.2);
  M.sfx('shimmer', 3.3);
  M.float('#drg', { y: 12, rot: 3, period: 2.4 });
  M.count('#cnt40', { from: 0, to: 40000, at: 4.05, dur: 0.85 });
  tl.fromTo('#form', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 5.35);
  tl.fromTo('#btn2', { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(2.4)' }, 5.9);
  tl.to('#btn2', { scale: 1.07, duration: 0.25, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 6.4);
  M.sfx('pop', 5.9);

  // ===== S3: мамина карта =====
  tl.fromTo('#card', { y: 300 }, { y: 0, duration: 0.8, ease: 'expo.out' }, 7.6);
  tl.fromTo('#hand3', { y: 600 }, { y: 0, duration: 0.6, ease: 'expo.out' }, 7.45);
  M.sfx('swish', 7.6);
  M.show('#tag3', { at: 7.8, in: 'pop' });

  // ===== S4: цифры и код =====
  M.text('#cardnum', { at: 9.2, in: 'type', cps: 16, cursor: false });
  tl.fromTo('#sms4', { y: -220, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' }, 10.3);
  M.sfx('ding', 10.32, { gain: -4 });
  tl.fromTo('#code .cd', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.25, ease: 'back.out(2.6)', stagger: 0.16 }, 10.75);
  M.ticks(10.75, { n: 4, gap: 0.16, name: 'key' });

  // ===== S5: списание =====
  M.show('#op5', { at: 11.95, in: 'rise' });
  M.count('#bal', { from: 31240, to: 3240, at: 12.5, dur: 0.95, sfx: false });
  M.ticks(12.5, { n: 10, gap: 0.08, name: 'tick', rise: false });
  M.hit(13.3, 'm');
  M.shake('#scr5', { at: 13.35, amp: 14, dur: 0.35 });

  // ===== S5b: лицо =====
  tl.fromTo('#sal', { scale: 2.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 14.95);
  M.sfx('thud', 15.25);

  // ===== S6: угроза =====
  tl.set('#th1', { autoAlpha: 0 }, 0); tl.set('#th2', { autoAlpha: 0 }, 0);
  tl.fromTo('#typ6', { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.3, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 17.3);
  tl.to('#typ6', { autoAlpha: 0, duration: 0.15 }, 18.4);
  tl.fromTo('#th1', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 18.5);
  M.hit(18.56, 'l');
  M.shake('#scr6', { at: 18.9, amp: 12, dur: 0.4 });
  tl.to('#redv', { opacity: 1, duration: 0.25, ease: 'power2.out' }, 18.6);
  tl.to('#redv', { opacity: 0.45, duration: 1.0, ease: 'sine.out' }, 18.9);
  tl.fromTo('#th2', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out' }, 20.6);
  M.sfx('pop', 20.6, { rate: 0.8 });

  // ===== S8: стук =====
  [24.5, 24.78, 25.05].forEach((t, i) => {
    tl.fromTo('#door', { x: 0 }, { x: 10, duration: 0.05, ease: 'power2.out', yoyo: true, repeat: 1 }, t);
    M.sfx('thud', t, { gain: 2 }); M.sfx('thock', t, { gain: -4 });
    tl.fromTo(document.querySelectorAll('#knock .kn')[i], { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.2, ease: 'back.out(3)' }, t);
  });
  tl.to('#knock .kn', { autoAlpha: 0, scale: 0.8, duration: 0.2, ease: 'power3.in', stagger: 0.04 }, 25.3);
  tl.fromTo('#shadow8', { x: -120 }, { x: 0, duration: 1.2, ease: 'sine.inOut' }, 24.1);
  tl.fromTo('#b8', { scale: 0.3, autoAlpha: 0, transformOrigin: '20% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 25.4);
  M.sfx('pop', 25.4, { rate: 0.85 });

  // ===== S9: выбор =====
  M.show('#q9', { at: 28.2, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 28.35);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 31.25);
  M.sfx('whoosh', 28.2); M.sfx('hit', 28.7); M.sfx('whoosh', 31.1); M.sfx('hit', 31.6);
  tl.to('#c1', { scale: 0.94, opacity: 0.75, duration: 0.4, ease: 'power2.out' }, 31.25);
  tl.to('#c1', { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 34.4);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm9', { at: 35.6, in: 'pop' });

  // ===== S10: финал =====
  M.show('#rule', { at: 36.85, in: 'rise' });
  M.show('#help', { at: 37.6, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 38.2);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 40.0);
  M.hit(40.3, 'l'); M.shake('#part2', { at: 40.3, amp: 12, dur: 0.35 });
});
