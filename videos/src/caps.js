// Общие приёмы серии «Выжить вопреки»: перекрёстная проявка сцен и короткие субтитры.
function xfade(tl, S, D, dur = 0.2) {
  S.forEach(([sel, t], i) => {
    const el = document.querySelector(sel); el.style.zIndex = 10 + i;
    const end = i + 1 < S.length ? S[i + 1][1] : D + 1;
    if (i === 0) tl.set(el, { autoAlpha: 1 }, 0);
    else { tl.set(el, { autoAlpha: 0 }, 0); tl.to(el, { autoAlpha: 1, duration: dur, ease: 'power1.inOut' }, t - dur / 2); }
    // старая сцена уходит под новой, когда новая уже непрозрачная
    if (i + 1 < S.length) tl.to(el, { autoAlpha: 0, duration: dur, ease: 'power1.inOut' }, end - dur / 2);
  });
}

// Субтитры: 1–2 слова на экран, смена мгновенная (как в референсе), ключевое слово цветом.
function captions(words, keys, o = {}) {
  const maxW = o.maxWords || 2, maxC = o.maxChars || 13;
  const norm = w => w.toLowerCase().replace(/[«»"]/g, '');
  const cls = w => { const n = norm(w); for (const k of ['k1', 'k2', 'k3', 'k4']) if ((keys[k] || []).some(x => norm(x) === n)) return k;
    return /^\d/.test(n) ? 'k1' : ''; };
  // склеиваем «-то», «-ый» с предыдущим словом
  const W = []; words.forEach(w => { if (/^-/.test(w.w) && W.length) { W[W.length - 1].w += w.w; W[W.length - 1].e = w.e; } else W.push({ ...w }); });
  const G = []; let g = [];
  const flush = () => { if (g.length) G.push(g); g = []; };
  W.forEach((w, i) => {
    const prev = g[g.length - 1];
    const short = x => x.w.replace(/[^\p{L}\d]/gu, '').length <= 2 && !/\d/.test(x.w);
    const len = g.map(x => x.w).join(' ').length + w.w.length + 1;
    const one = prev && prev.w.replace(/[^\p{L}\d]/gu, '').length <= 1 && !/\d/.test(prev.w);
    const cont = prev && (one || ((short(prev) || g.length < maxW) && len <= maxC && !/[.,?!:;…—]$/.test(prev.w) && w.s - prev.e < 0.25));
    const startsShort = short(w) && prev && !short(prev) && !/\d/.test(w.w);
    if (!cont || startsShort) flush();
    g.push(w);
  });
  flush();
  const cap = document.querySelector(o.into || '#cap');
  const html = G.map(g => g.map(w => { const c = cls(w.w); const txt = w.w.replace(/[.,?!:;…]+$/, '').replace(/[«»]/g, '');
    return c ? `<span class="${c}">${txt}</span>` : txt; }).join(' '));
  const T = G.map((g, i) => [g[0].s - 0.05, Math.min(g[g.length - 1].e + 0.35, i + 1 < G.length ? G[i + 1][0].s - 0.05 : 1e9)]);
  let cur = -2;
  M.onFrame(t => { let k = -1; for (let i = 0; i < T.length; i++) if (t >= T[i][0] && t < T[i][1]) { k = i; break; }
    if (k !== cur) { cur = k; cap.innerHTML = k < 0 ? '' : html[k]; } });
  return G;
}

// Мелкие помощники для SVG-сцен
const NS = 'http://www.w3.org/2000/svg';
function mk(parent, tag, attrs) { const p = typeof parent === 'string' ? document.querySelector(parent) : parent;
  const c = document.createElementNS(NS, tag); for (const k in attrs) c.setAttribute(k, attrs[k]); p.appendChild(c); return c; }
function stars(sel, R, n = 90) { for (let i = 0; i < n; i++) mk(sel, 'circle', { cx: R() * 1080, cy: R() * 1920, r: .8 + R() * 2.2, opacity: .3 + R() * .7 }); }
function burst(tl, sel, R, x, y, t, o = {}) {   // осколки/брызги из точки
  for (let i = 0; i < (o.n || 14); i++) { const c = mk(sel, o.tag || 'rect', o.tag === 'circle' ? { r: 4 + R() * 8, cx: x, cy: y, opacity: 0 } : { width: 8 + R() * 16, height: 6 + R() * 10, x, y, opacity: 0 });
    const a = (o.a0 ?? 0) + R() * (o.span ?? 6.28), d = (o.d || 200) + R() * (o.d || 200);
    const k = o.tag === 'circle' ? ['cx', 'cy'] : ['x', 'y'];
    tl.fromTo(c, { attr: { [k[0]]: x, [k[1]]: y }, opacity: 1 }, { attr: { [k[0]]: x + Math.cos(a) * d, [k[1]]: y + Math.sin(a) * d * (o.sy || 1) }, opacity: 0, duration: o.dur || 1.3, ease: 'expo.out' }, t + R() * 0.08); }
}
function drift(tl, list) { list.forEach(([s, a, b, k]) => { gsap.set(s, { transformOrigin: '50% 60%' }); tl.fromTo(s, { scale: 1 }, { scale: k || 1.07, duration: b - a, ease: 'none' }, a); }); }
