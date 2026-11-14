M.start(({ tl, D }) => {
  const q = s => document.querySelector(s);
  M.grain(0.07);

  const cuts = [['#s1', 0], ['#s2', 4.7, 'zoom'], ['#s3', 9.4, 'push-up'], ['#s4', 15.5, 'zoom'], ['#s5', 19.4, 'zoom'],
    ['#s6', 22.7, 'cut'], ['#s7', 26.4, 'zoom'], ['#s8', 28.7, 'slide-left'], ['#s9', 32.5, 'zoom'],
    ['#s10', 42.0, 'bars-up', { colors: ['#E5304A', '#211d2b', '#27C46B'] }]];
  M.seq(cuts);
  cuts.forEach(([sel, t0], i) => {
    const t1 = i + 1 < cuts.length ? cuts[i + 1][1] : D, cam = q(sel + ' .cam');
    if (!cam) return;
    tl.fromTo(cam, { scale: 1.1, svgOrigin: '540 900' }, { scale: 1.0, duration: 0.9, ease: 'expo.out' }, Math.max(0, t0 - 0.2));
    tl.to(cam, { scale: 1.06, duration: Math.max(0.5, t1 - t0 - 0.7), ease: 'sine.inOut' }, t0 + 0.7);
  });

  M.captions(VO, { into: '#cap', mode: 'pop', max: 20, offset: 0.3, hold: 0.25, upper: true, sfx: false });
  const HL = ['СТО', 'ТЫСЯЧ', 'ШЕСТНАДЦАТЫЙ', 'ВЕТЕР', 'ИГРУШЕЧНЫЙ', 'ТРИ', 'ПРОЦЕНТА', 'ЛЕГЕНДОЙ', 'МАМЕ', 'ТЫ?'];
  const HR = ['КРАЮ', 'ХЛОПОК', 'ЗАКРЫЛСЯ', 'МОКРЫЙ', 'МЕТАЛЛ'];
  document.querySelectorAll('#cap span').forEach(sp => {
    const w = sp.textContent.replace(/[.,!:—\s«»]+/g, '');
    if (HL.includes(w) || HL.includes(sp.textContent)) sp.classList.add('hl');
    if (HR.includes(w)) sp.classList.add('hr');
  });

  const chars = { e3: 1.1, g3: 0.6, e2: 0.3, g2: 1.4, e4: 0.8, g8: 2.1, e8: 0.5, e9: 0.2 };
  const look = {
    e2: [[0, 14, -6]], g2: [[0, -14, 0]], e3: [[0, 0, 14]], g3: [[0, -6, 14]],
    e4: [[0, 0, 14], [17.0, -10, 16]],
    g8: [[0, 16, -4]], e8: [[0, -16, 2], [30.0, -16, 2], [30.4, 0, 12]],
    e9: [[0, 0, 4], [32.9, -16, -4], [35.0, 16, -4], [37.7, 0, 4]],
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
    q('#wind').setAttribute('transform', `translate(${((t * 160) % 300 - 150).toFixed(1)} 0)`);
    q('#rec').style.opacity = Math.floor(t * 2) % 2 ? 0.2 : 1;
    q('#batf').style.opacity = Math.floor(t * 3) % 2 ? 0.25 : 1;
    // Гоша смеётся: подпрыгивает
    const g8 = q('#g8'); if (g8) g8.setAttribute('transform', `translate(0 ${(t > 28.9 && t < 32.5 ? -Math.abs(Math.sin(t * 14)) * 10 : 0).toFixed(1)})`);
  });

  // S1
  M.count('#cntv', { from: 0, to: 100000, at: 0.3, dur: 1.1 });
  M.shake('#views', { at: 1.45, amp: 8, dur: 0.25 });
  // S2
  tl.fromTo('#num16', { scale: 0.3, autoAlpha: 0, svgOrigin: '880 430' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2.4)' }, 8.15);
  M.hit(8.3, 's');
  // S3
  M.sfx('sweep', 11.2, { gain: -2 });
  M.sfx('whoosh', 12.2, { gain: -4 });
  // S4
  tl.fromTo('#b4', { scale: 0.3, autoAlpha: 0, transformOrigin: '30% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 15.85);
  M.sfx('pop', 15.85);
  tl.to('#eg4', { x: 60, y: 30, duration: 0.8, ease: 'power2.inOut' }, 16.9);
  tl.to('#eg4', { x: 110, y: 50, duration: 0.6, ease: 'power2.inOut' }, 18.3);
  // S5
  tl.to('#foot', { x: 50, rotation: 4, svgOrigin: '380 1000', duration: 0.18, ease: 'power3.in' }, 22.0);
  tl.to('#foot', { x: 30, rotation: 2, svgOrigin: '380 1000', duration: 0.3, ease: 'back.out(2)' }, 22.18);
  M.hit(22.1, 'm'); M.shake('#s5 .cam', { at: 22.1, amp: 10, dur: 0.3 });
  // S6
  tl.fromTo('#lid6', { scaleY: 1 }, { scaleY: -0.25, svgOrigin: '150 0', duration: 0.3, ease: 'power4.in' }, 23.4);
  tl.fromTo('#bang', { opacity: 1 }, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 23.7);
  M.hit(23.7, 'l'); M.shake('#s6 .cam', { at: 23.7, amp: 14, dur: 0.4 });
  tl.fromTo('#cls', { scale: 2.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.28, ease: 'power4.in' }, 25.05);
  M.sfx('thud', 25.33);
  // S7
  M.ticks(26.9, { n: 3, gap: 0.5, name: 'blip', rise: false });
  M.sfx('downer', 27.6);
  // S8
  tl.fromTo('#b8', { scale: 0.3, autoAlpha: 0, transformOrigin: '30% 110%' }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'back.out(2)' }, 29.95);
  M.sfx('pop', 29.95);
  // S9
  M.show('#q9', { at: 32.6, in: 'drop' });
  tl.fromTo('#c1', { x: -600, rotation: -10 }, { x: 0, rotation: -3, duration: 0.7, ease: 'expo.out' }, 32.7);
  tl.fromTo('#c2', { x: 600, rotation: 10 }, { x: 0, rotation: 3, duration: 0.7, ease: 'expo.out' }, 34.8);
  M.sfx('whoosh', 32.6); M.sfx('hit', 33.05); M.sfx('whoosh', 34.7); M.sfx('hit', 35.15);
  M.float('#c1, #c2', { y: 10, rot: 1, period: 3 });
  M.show('#cm9', { at: 39.0, in: 'pop' });
  // S10
  M.show('#rule', { at: 42.25, in: 'rise' });
  M.show('#help', { at: 42.9, in: 'rise' });
  tl.fromTo('#num', { scale: 0.6 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 43.5);
  tl.fromTo('#part2', { scale: 3, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power4.in' }, 44.6);
  M.hit(44.9, 'l'); M.shake('#part2', { at: 44.9, amp: 12, dur: 0.35 });
});
