M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  const cuts = [['#s1', 0], ['#s2', 5.2, 'cut'], ['#s3', 10.1, 'zoom'], ['#s4', 13.1, 'push-left'], ['#s5', 18.0, 'zoom'],
    ['#s6', 22.3, 'push-up'], ['#s7', 29.0, 'zoom'], ['#s8', 38.5, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.3, hold: 0.25, upper: true, sfx: false });
  const HL = ['ТРИНАДЦАТЬ', 'СЕМЬ', 'ДИМА', 'КАЖДЫЙ', 'ПЯТЬ', 'ТЫСЯЧ', 'ПЛАНШЕТ', 'АДРЕС', 'ДОБРЫЙ', 'МАМЕ', 'ТЫ?'];
  const HR = ['ДАВАЙ', 'ВСТРЕТИМСЯ', 'РОДИТЕЛЯМ', 'НЕ', 'ГОВОРИ', 'НАШ', 'СЕКРЕТ'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!?:—\s«»]+/g, ''), g = sp.closest('.mo-capl').textContent;
    if (HL.includes(w) || HL.includes(sp.textContent)) sp.classList.add('hl');
    if (/ВСТРЕТИМСЯ|РОДИТЕЛЯМ|СЕКРЕТ/.test(g) && HR.includes(w)) sp.classList.add('hr');
  });

  const chars = { m1: 0.3, m2: 1.1, m3: 2.0, m5: 0.6, m7: 0.2 };
  const look = {
    m1: [[0, 0, 14]], m2: [[0, -12, 6]], m3: [[0, 0, -10]],
    m5: [[0, 0, -10], [20.9, 0, -10], [21.3, 8, 10]],
    m7: [[0, 0, 4], [29.4, -16, -4], [31.3, 16, -4], [35.6, 0, 4]],
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
  const cute = q('#scr6 .d6 .cute');
  M.onFrame(t => {
    breaths.forEach((g, i) => g.setAttribute('transform', `translate(0 ${(Math.sin(t * 2.1 + i) * 4).toFixed(2)})`));
    for (const id in chars) {
      const e = document.getElementById(id + '-eyes'); if (!e) continue;
      const ph = (t + chars[id]) % 3.4, bl = ph < 0.14 ? 1 - Math.sin(ph / 0.14 * Math.PI) * 0.92 : 1;
      e.style.transform = `scaleY(${bl.toFixed(3)})`;
      const [dx, dy] = pupil(id, t), p = document.getElementById(id + '-pup');
      if (p) p.setAttribute('transform', `translate(${dx.toFixed(2)} ${dy.toFixed(2)})`);
    }
    // аватар «Димы» мигает и на миг показывает серый силуэт
    const f = Math.floor(t * 30);
    cute.style.opacity = (t > 28.1 && t < 28.9 && f % 4 < 2) ? 0 : 1;
  });

  // S1
  M.show('#age', { at: 0.4, in: 'pop' });
  tl.fromTo('#viewers', { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 3.8);
  M.sfx('tick', 3.8);
  // S2
  M.show('#chat2', { at: 5.25, in: 'rise' });
  tl.set('#chat2 .cl', { autoAlpha: 0 }, 0);
  [5.5, 6.0, 7.2, 8.6].forEach((t, i) => { tl.fromTo(document.querySelectorAll('#chat2 .cl')[i], { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.3, ease: 'expo.out' }, t); M.sfx('pop', t, { rate: 0.9 + i * 0.08 }); });
  // S3
  tl.fromTo('#don3', { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.8)' }, 10.3);
  M.count('#cnt5', { from: 0, to: 5000, at: 10.8, dur: 0.6 });
  M.hit(11.05, 'm');
  tl.fromTo('#coins3 .cn', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'back.out(2.6)', stagger: 0.08 }, 11.1);
  M.float('#coins3 .cn', { y: 14, rot: 10, period: 1.8 });
  tl.fromTo('#don3m', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'expo.out' }, 12.3);
  M.sfx('chime', 12.4, { gain: -4 });
  // S4
  tl.fromTo('#box4', { y: -900 }, { y: 0, duration: 0.5, ease: 'power3.in' }, 13.25);
  M.sfx('thud', 13.75); M.shake('#s4 .cam', { at: 13.75, amp: 8, dur: 0.25 });
  M.show('#tag4', { at: 13.9, in: 'pop' });
  tl.to('#flapL', { rotation: -60, svgOrigin: '-260 0', duration: 0.35, ease: 'back.out(2)' }, 14.6);
  tl.to('#flapR', { rotation: 60, svgOrigin: '260 0', duration: 0.35, ease: 'back.out(2)' }, 14.6);
  tl.fromTo('#tab4', { y: 150 }, { y: -170, duration: 0.6, ease: 'back.out(1.6)' }, 15.0);
  M.sfx('shimmer', 15.1);
  M.show('#lbl4', { at: 16.3, in: 'rise' });
  tl.fromTo('#addr4', { backgroundColor: 'rgba(229,48,74,0)' }, { backgroundColor: 'rgba(229,48,74,.3)', duration: 0.3 }, 16.9);
  M.sfx('thock', 16.9);
  // S5
  tl.fromTo('#th5', { scale: 0.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 18.2);
  M.sfx('pop', 18.2);
  tl.to('#th5', { scale: 0, autoAlpha: 0, duration: 0.35, ease: 'back.in(2)' }, 21.0);
  M.sfx('bubble', 21.0);
  // S6
  tl.set(['#d61', '#d62', '#d63'], { autoAlpha: 0 }, 0);
  [['#d61', 23.8], ['#d62', 25.0]].forEach(([s, t]) => { tl.fromTo(s, { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, t); M.sfx('ding', t, { gain: -5 }); });
  tl.fromTo('#d63', { autoAlpha: 0, scale: 0.6, transformOrigin: '0% 100%' }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 27.45);
  M.hit(27.6, 'l');
  tl.to('#s6 .redv', { opacity: 1, duration: 0.25 }, 27.6); tl.to('#s6 .redv', { opacity: 0.4, duration: 0.8 }, 27.85);
  M.ticks(28.1, { n: 6, gap: 0.13, name: 'glitch', rise: false });
  // S7
  M.show('#q7', { at: 29.1, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 29.2);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 31.1);
  M.sfx('whoosh', 29.1); M.sfx('hit', 29.55); M.sfx('whoosh', 31.0); M.sfx('hit', 31.45);
  tl.to('#c1', { scale: 0.94, opacity: 0.75, duration: 0.4, ease: 'power2.out' }, 31.1);
  tl.to('#c1', { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, 35.6);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm7', { at: 36.8, in: 'pop' });
  // S8
  M.show('#rule', { at: 38.75, in: 'rise' });
  M.show('#help', { at: 39.4, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 40.0);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 41.1);
  M.hit(41.4, 'l'); M.shake('#part2', { at: 41.4, amp: 12, dur: 0.35 });
});
