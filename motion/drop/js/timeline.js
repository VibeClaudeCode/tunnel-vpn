M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  const cuts = [['#s1', 0], ['#s2', 3.6, 'zoom'], ['#s3', 10.0, 'slide-left'], ['#s4', 13.6, 'push-up'], ['#s5', 18.5, 'zoom'],
    ['#s6', 21.0, 'cut'], ['#s7', 22.85, 'push-left'], ['#s8', 26.35, 'zoom'], ['#s9', 31.0, 'push-up'], ['#s10', 36.5, 'zoom'],
    ['#s11', 46.0, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.3, hold: 0.25, upper: true, sfx: false });
  const HL = ['ПЯТНАДЦАТЬ', 'ТРИ', 'ТЫСЯЧИ', 'ПЯТЬ', 'КАРТЫ', 'СТО', 'СОРОК', 'ЧУЖИЕ', 'ЗАБЛОКИРОВАНА', 'ФОРМЕ', 'ТЫ?', 'ПОЛИЦИИ'];
  const HR = ['«СКАЖЕШЬ', 'ПРО', 'НАС', 'ПОЖАЛЕЕШЬ»', 'МОШЕННИЧЕСТВЕ'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!:—\s]+$/, '');
    if (HL.includes(w)) sp.classList.add('hl');
    if (HR.includes(w)) sp.classList.add('hr');
  });

  const chars = { t1: 0.3, t5: 1.4, p1: 0.8, p2: 2.1, p8: 0.5, t8: 1.7, t10: 0.2 };
  const look = {
    t1: [[0, 0, 14]],
    t5: [[0, 10, 0]],
    p1: [[0, 8, 6]], p2: [[0, -8, 6]],
    p8: [[0, 18, 4]],
    t8: [[0, -16, 0], [28.9, -16, 0], [29.3, 0, 10]],
    t10: [[0, 0, 4], [36.9, -16, -4], [38.1, 16, -4], [41.2, 0, 4]],
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
    q('#glow1').setAttribute('opacity', (0.18 + 0.05 * Math.sin(t * 7)).toFixed(3));
  });

  // S1
  tl.fromTo('#age', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2.4)' }, 0.55);
  M.sfx('pop', 0.55);
  // S2
  tl.fromTo('#post', { y: 120, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 3.85);
  M.sfx('swish', 3.85); M.sfx('chime', 5.3, { gain: -5 });
  tl.fromTo('#mgr', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 7.0);
  M.sfx('ding', 7.0, { gain: -4 });
  // S3
  tl.fromTo('#ok3', { autoAlpha: 0, scale: 0.6, transformOrigin: '100% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 10.2);
  M.sfx('pop', 10.2);
  M.show('#in3', { at: 12.2, in: 'rise' });
  M.count('#bal3', { from: 0, to: 140000, at: 12.45, dur: 0.75 });
  M.hit(12.9, 'm');
  // S4
  tl.set(['#m41', '#m42'], { autoAlpha: 0 }, 0);
  tl.fromTo('#m41', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 13.8);
  tl.fromTo('#m42', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'expo.out' }, 14.6);
  M.sfx('ding', 13.8, { gain: -4 });
  tl.fromTo('#m42 .tr', { backgroundColor: 'rgba(229,48,74,0)' }, { backgroundColor: 'rgba(229,48,74,.15)', duration: 0.2, stagger: 0.45 }, 16.1);
  M.count('#bal4', { from: 140000, to: 3000, at: 16.1, dur: 1.2, sfx: false });
  [16.1, 16.55, 17.0].forEach(t => M.sfx('swipe', t));
  // S5
  tl.fromTo('#coins .cn', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.35, ease: 'back.out(2.6)', stagger: 0.12 }, 18.75);
  M.ticks(18.75, { n: 4, gap: 0.12, name: 'pop' });
  M.float('#coins .cn', { y: 12, rot: 4, period: 2 });
  // S6
  tl.fromTo('#lk', { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)' }, 21.3);
  tl.fromTo('#blk', { scale: 2.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power4.in' }, 21.7);
  M.hit(21.98, 'm'); M.shake('#blk', { at: 21.98, amp: 10, dur: 0.3 });
  // S7
  tl.to('#door7', { scaleX: 0.12, transformOrigin: '0% 50%', duration: 0.6, ease: 'power3.inOut' }, 25.0);
  M.sfx('whoosh', 25.0);
  tl.fromTo('#cops', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 25.25);
  M.hit(25.45, 'm');
  // S8
  tl.fromTo('#b8', { scale: 0.3, autoAlpha: 0, transformOrigin: '20% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 26.5);
  M.sfx('pop', 26.5, { rate: 0.85 });
  tl.fromTo('#vic', { x: 500, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' }, 28.85);
  M.sfx('swish', 28.85); M.sfx('thud', 29.4);
  // S9
  M.shake('#scr9', { at: 31.1, amp: 10, dur: 0.9 });
  M.ticks(31.1, { n: 8, gap: 0.08, name: 'thud', rise: false });
  tl.set(['#th1', '#th2'], { autoAlpha: 0 }, 0);
  tl.fromTo('#typ9', { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.3, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 32.0);
  tl.to('#typ9', { autoAlpha: 0, duration: 0.15 }, 33.2);
  tl.fromTo('#th1', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 33.3);
  M.sfx('ding', 33.3, { gain: -4 });
  M.hit(34.4, 'l');
  tl.to('#s9 .redv', { opacity: 1, duration: 0.25 }, 34.45); tl.to('#s9 .redv', { opacity: 0.4, duration: 0.8 }, 34.7);
  tl.fromTo('#th2', { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out' }, 35.5);
  M.sfx('pop', 35.5, { rate: 0.8 });
  // S10
  M.show('#q10', { at: 36.6, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 36.7);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 37.9);
  M.sfx('whoosh', 36.6); M.sfx('hit', 37.05); M.sfx('whoosh', 37.8); M.sfx('hit', 38.25);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm10', { at: 42.5, in: 'pop' });
  // S11
  M.show('#rule', { at: 46.25, in: 'rise' });
  M.show('#help', { at: 46.9, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 47.5);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 48.6);
  M.hit(48.9, 'l'); M.shake('#part2', { at: 48.9, amp: 12, dur: 0.35 });
});
