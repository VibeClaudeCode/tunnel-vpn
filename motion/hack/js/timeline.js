M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  const cuts = [['#s1', 0], ['#s2', 3.0, 'zoom'], ['#s3', 6.6, 'slide-left'], ['#s4', 9.55, 'cut'], ['#s5', 13.3, 'push-left'],
    ['#s6', 16.0, 'push-up'], ['#s7', 21.2, 'zoom'], ['#s8', 24.45, 'slide-left'], ['#s9', 27.8, 'push-left'], ['#s10', 30.0, 'zoom'],
    ['#s11', 39.0, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.3, hold: 0.25, upper: true, sfx: false });
  const HL = ['КОД', 'АНЯ', 'ВЧЕРА', 'ВСЕМ', 'КЛАССУ', 'УЧИТЕЛЯМ', 'МАМЕ', 'ПЯТНАДЦАТЬ', 'ТЫСЯЧ', 'СТЫДНО', 'ТЫ?'];
  const HR = ['ВЗЛОМАЛИ', 'БАБУШКЕ', 'МОШЕННИКИ'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!?:—\s«»]+/g, '');
    if (HL.includes(w) || HL.includes(sp.textContent)) sp.classList.add('hl');
    if (HR.includes(w)) sp.classList.add('hr');
  });

  const chars = { p1: 0.3, a5: 1.2, p8: 0.7, g9: 2.0, p10: 0.2 };
  const look = {
    p1: [[0, 0, 14]], a5: [[0, 0, 0], [14.6, -8, 6]],
    p8: [[0, 14, 14], [25.0, 14, 14], [25.6, -14, 10]],
    g9: [[0, 16, 10]],
    p10: [[0, 0, 4], [30.4, -16, -4], [33.2, 16, -4], [36.0, 0, 4]],
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
      e.style.transform = `scaleY(${bl.toFixed(3)})`;
      const [dx, dy] = pupil(id, t), p = document.getElementById(id + '-pup');
      if (p) p.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    }
    q('#glow1').setAttribute('opacity', (0.16 + 0.05 * Math.sin(t * 7)).toFixed(3));
    // входящий звонок: карточка дрожит пачками
    const c8 = q('#call8'), on = t > 24.7 && t < 27.8 && Math.sin((t - 24.7) * Math.PI / 0.7) > 0;
    c8.style.translate = on ? `${(Math.sin(t * 90) * 6).toFixed(1)}px 0` : '0 0';
  });

  // S1
  tl.fromTo('#n1', { y: -260, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 1.0);
  M.sfx('ding', 1.0, { gain: -3 });
  // S2
  tl.set(['#a21', '#a22', '#a23'], { autoAlpha: 0 }, 0);
  tl.fromTo('#a21', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 3.2);
  tl.fromTo('#a22', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out' }, 4.0);
  tl.fromTo('#a23', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 5.3);
  M.sfx('pop', 3.2); M.sfx('pop', 4.0, { rate: 0.9 }); M.sfx('pop', 5.3, { rate: 1.1 });
  // S3
  tl.fromTo('#sms3', { y: -220, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out' }, 6.75);
  M.sfx('ding', 6.75, { gain: -4 });
  tl.set(['#me3', '#th3'], { autoAlpha: 0 }, 0);
  tl.fromTo('#me3', { autoAlpha: 0, scale: 0.6, transformOrigin: '100% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 7.35);
  M.ticks(7.0, { n: 4, gap: 0.08, name: 'key' }); M.sfx('swish', 7.4);
  tl.fromTo('#th3', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 8.7);
  M.sfx('pop', 8.7);
  tl.fromTo('#u3', { backgroundColor: 'rgba(229,48,74,0)' }, { backgroundColor: 'rgba(229,48,74,.25)', duration: 0.3 }, 8.9);
  // S4
  tl.fromTo('#out4', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2.4)' }, 9.7);
  M.hit(9.75, 'm');
  tl.set('#err4', { autoAlpha: 0 }, 0);
  [12.35, 12.85].forEach(t => { M.shake('#pw4', { at: t, amp: 14, dur: 0.3 }); M.sfx('blip', t, { gain: 2 }); });
  tl.to('#pw4', { borderColor: '#E5304A', duration: 0.1 }, 12.35);
  tl.to('#err4', { autoAlpha: 1, duration: 0.15 }, 12.35);
  // S5
  M.show('#log5', { at: 13.45, in: 'drop' });
  tl.fromTo('#hk5', { scale: 2.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power4.in' }, 14.4);
  M.hit(14.68, 'm'); M.shake('#hk5', { at: 14.68, amp: 10, dur: 0.3 });
  // S6
  tl.set(['#r1', '#r2', '#r3', '#r4'], { autoAlpha: 0 }, 0);
  [[17.6, '#r4'], [18.94, '#r1'], [19.68, '#r2'], [20.6, '#r3']].forEach(([t, r]) => {
    tl.fromTo(r, { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, duration: 0.35, ease: 'expo.out' }, t); M.sfx('swipe', t);
  });
  M.hit(20.62, 'm');
  tl.to('#s6 .redv', { opacity: 0.9, duration: 0.25 }, 20.65); tl.to('#s6 .redv', { opacity: 0.35, duration: 0.6 }, 20.9);
  // S7
  tl.set(['#m71', '#m72'], { autoAlpha: 0 }, 0);
  tl.fromTo('#m71', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 21.4);
  M.sfx('ding', 21.4, { gain: -3 });
  tl.fromTo('#sum7', { scale: 1 }, { scale: 1.3, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 22.55);
  M.sfx('thock', 22.55);
  tl.fromTo('#m72', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'expo.out' }, 23.5);
  M.show('#tag7', { at: 21.4, in: 'drop' });
  // S8
  M.show('#call8', { at: 24.6, in: 'rise' });
  M.ticks(24.75, { n: 6, gap: 0.12, name: 'blip', rise: false }); M.ticks(26.15, { n: 6, gap: 0.12, name: 'blip', rise: false });
  tl.fromTo('#miss8', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(2.6)' }, 26.9);
  M.sfx('thud', 26.95);
  // S9
  M.show('#tag9', { at: 27.95, in: 'pop' });
  tl.fromTo('#gm9', { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 28.3);
  M.hit(29.22, 'l'); M.shake('#gm9', { at: 29.25, amp: 8, dur: 0.3 });
  // S10
  M.show('#q10', { at: 30.1, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 30.2);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 33.0);
  M.sfx('whoosh', 30.1); M.sfx('hit', 30.55); M.sfx('whoosh', 32.9); M.sfx('hit', 33.35);
  tl.to('#c1', { scale: 0.94, opacity: 0.75, duration: 0.4, ease: 'power2.out' }, 33.0);
  tl.to('#c1', { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 36.0);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm10', { at: 37.3, in: 'pop' });
  // S11
  M.show('#rule', { at: 39.25, in: 'rise' });
  M.show('#help', { at: 39.9, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 40.5);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 41.6);
  M.hit(41.9, 'l'); M.shake('#part2', { at: 41.9, amp: 12, dur: 0.35 });
});
