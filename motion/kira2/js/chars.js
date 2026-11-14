// Персонажи и предметы в плоском стиле с толстым контуром. Всё — строки SVG, анимация — через атрибуты по t.
window.C = (() => {
  const K = '#211d2b', SW = 7;
  const st = `stroke="${K}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`;
  // Голова: центр (0,0). opts: hair, skin, mood ('sad'|'neutral'|'worried'|'firm'), id
  function eyes(id, mood) {
    const brow = {
      sad: ['M-78,-52 Q-55,-66 -26,-58', 'M26,-58 Q55,-66 78,-52'],
      worried: ['M-80,-44 Q-58,-70 -24,-64', 'M24,-64 Q58,-70 80,-44'],
      neutral: ['M-78,-58 Q-52,-68 -24,-60', 'M24,-60 Q52,-68 78,-58'],
      firm: ['M-80,-64 Q-52,-58 -22,-50', 'M22,-50 Q52,-58 80,-64'],
      shock: ['M-80,-70 Q-52,-90 -24,-78', 'M24,-78 Q52,-90 80,-70'],
    }[mood];
    return `
    <g class="brows">${brow.map(d => `<path d="${d}" fill="none" ${st} stroke-width="9"/>`).join('')}</g>
    <g id="${id}-eyes" class="eyes" style="transform-box:fill-box;transform-origin:center">
      <ellipse cx="-50" cy="-12" rx="27" ry="31" fill="#fff" ${st} stroke-width="5"/>
      <ellipse cx="50" cy="-12" rx="27" ry="31" fill="#fff" ${st} stroke-width="5"/>
      <g id="${id}-pup"><circle cx="-46" cy="-6" r="14" fill="${K}"/><circle cx="54" cy="-6" r="14" fill="${K}"/>
      <circle cx="-41" cy="-12" r="5" fill="#fff"/><circle cx="59" cy="-12" r="5" fill="#fff"/></g>
    </g>`;
  }
  function mouth(mood) {
    return {
      sad: `<path d="M-20,66 Q0,54 20,66" fill="none" ${st} stroke-width="6"/>`,
      worried: `<path d="M-18,64 Q0,56 18,64 Q0,72 -18,64Z" fill="#7a2d35" ${st} stroke-width="5"/>`,
      neutral: `<path d="M-16,62 L16,62" fill="none" ${st} stroke-width="6"/>`,
      firm: `<path d="M-22,62 Q0,58 22,62" fill="none" ${st} stroke-width="6"/>`,
      shock: `<ellipse cx="0" cy="70" rx="20" ry="26" fill="#7a2d35" ${st} stroke-width="5"/>`,
    }[mood];
  }
  function kira({ id = 'k', mood = 'sad', body = true } = {}) {
    const hair = '#3a2724', hair2 = '#2a1b19', skin = '#f7d5bd';
    return `<g id="${id}">
      ${body ? `<g class="body">
        <path d="M-150,330 Q-150,190 -60,165 L60,165 Q150,190 150,330 L150,420 L-150,420Z" fill="#2f3d6b" ${st}/>
        <path d="M-58,165 L0,240 L58,165Z" fill="#fff" ${st} stroke-width="6"/>
        <path d="M-10,200 L10,200 L18,300 L0,322 L-18,300Z" fill="#b8323f" ${st} stroke-width="5"/>
        <path d="M-60,166 L-28,250 L-70,250Z" fill="#26325a" ${st} stroke-width="5"/>
        <path d="M60,166 L28,250 L70,250Z" fill="#26325a" ${st} stroke-width="5"/>
        <circle cx="-95" cy="250" r="16" fill="#f2c94c" ${st} stroke-width="4"/>
        <rect x="-34" y="110" width="68" height="70" rx="20" fill="${skin}" ${st}/>
      </g>` : ''}
      <g id="${id}-head" class="head">
        <path d="M-150,-30 Q-160,-170 0,-175 Q160,-170 150,-30 L158,120 Q120,150 80,120 L-80,120 Q-120,150 -158,120Z" fill="${hair2}" ${st}/>
        <ellipse cx="-118" cy="10" rx="20" ry="26" fill="${skin}" ${st} stroke-width="5"/>
        <ellipse cx="118" cy="10" rx="20" ry="26" fill="${skin}" ${st} stroke-width="5"/>
        <ellipse cx="0" cy="0" rx="118" ry="130" fill="${skin}" ${st}/>
        <ellipse cx="-72" cy="40" rx="20" ry="11" fill="#f19a9a" opacity=".55"/>
        <ellipse cx="72" cy="40" rx="20" ry="11" fill="#f19a9a" opacity=".55"/>
        ${eyes(id, mood)}
        <path d="M-6,22 Q2,34 -8,40" fill="none" ${st} stroke-width="5"/>
        <g class="mouth">${mouth(mood)}</g>
        <path d="M-128,-20 Q-140,-150 0,-150 Q140,-150 128,-20 Q100,-90 40,-92 Q50,-70 30,-56 Q20,-90 -30,-92 Q-60,-60 -90,-50 Q-80,-80 -110,-60Z" fill="${hair}" ${st}/>
        <rect x="58" y="-108" width="46" height="16" rx="8" fill="#f2c94c" ${st} stroke-width="4" transform="rotate(-18 81 -100)"/>
      </g>
    </g>`;
  }
  function mom({ id = 'm', mood = 'worried', body = true, hair = '#8a5a3c', top = '#c9786a', glasses = false } = {}) {
    const skin = '#f3cdb2';
    return `<g id="${id}">
      ${body ? `<g class="body">
        <path d="M-170,340 Q-170,200 -70,170 L70,170 Q170,200 170,340 L170,700 L-170,700Z" fill="${top}" ${st}/>
        <path d="M-50,170 Q0,230 50,170" fill="#efe3d3" ${st} stroke-width="6"/>
        <path d="M-70,172 L-40,420 M70,172 L40,420" ${st} stroke-width="5" fill="none"/>
        <circle cx="-30" cy="300" r="7" fill="${K}"/><circle cx="-34" cy="360" r="7" fill="${K}"/>
        <rect x="-36" y="110" width="72" height="72" rx="20" fill="${skin}" ${st}/>
      </g>` : ''}
      <g id="${id}-head" class="head">
        <circle cx="0" cy="-150" r="62" fill="${hair}" ${st}/>
        <ellipse cx="-120" cy="10" rx="20" ry="26" fill="${skin}" ${st} stroke-width="5"/>
        <ellipse cx="120" cy="10" rx="20" ry="26" fill="${skin}" ${st} stroke-width="5"/>
        <ellipse cx="0" cy="0" rx="120" ry="135" fill="${skin}" ${st}/>
        <ellipse cx="-74" cy="44" rx="18" ry="10" fill="#e98f86" opacity=".45"/>
        <ellipse cx="74" cy="44" rx="18" ry="10" fill="#e98f86" opacity=".45"/>
        ${eyes(id, mood)}
        <path d="M-6,22 Q4,36 -8,42" fill="none" ${st} stroke-width="5"/>
        <g class="mouth">${mouth(mood)}</g>
        <path d="M-126,-10 Q-130,-140 0,-142 Q130,-140 126,-10 Q90,-110 0,-106 Q-90,-110 -126,-10Z" fill="${hair}" ${st}/>
        <path d="M-60,-130 Q0,-100 60,-132" fill="none" stroke="#6e4630" stroke-width="5"/>
        ${glasses ? `<g fill="none" ${st} stroke-width="7"><circle cx="-50" cy="-10" r="44"/><circle cx="50" cy="-10" r="44"/><path d="M-6,-14 Q0,-22 6,-14 M-94,-16 L-118,-24 M94,-16 L118,-24"/></g>` : ''}
      </g>
    </g>`;
  }
  // Телефон: x,y — верхний левый угол, w×h. screen — HTML внутри foreignObject не нужен: рисуем SVG
  function phone(w = 300, h = 600, screen = '#1a1c24') {
    return `<rect x="0" y="0" width="${w}" height="${h}" rx="${w * 0.14}" fill="#1b1a22" ${st}/>
      <rect x="${w * 0.05}" y="${w * 0.05}" width="${w * 0.9}" height="${h - w * 0.1}" rx="${w * 0.1}" fill="${screen}"/>
      <rect x="${w * 0.38}" y="${w * 0.08}" width="${w * 0.24}" height="${w * 0.06}" rx="${w * 0.03}" fill="#0b0b10"/>`;
  }
  function boy({ id = 'b', mood = 'sad', body = true } = {}) {
    const hair = '#9a6a3f', hair2 = '#7d5330', skin = '#f7d5bd';
    return `<g id="${id}">
      ${body ? `<g class="body">
        <path d="M-160,330 Q-160,190 -60,160 L60,160 Q160,190 160,330 L160,420 L-160,420Z" fill="#3f8f6b" ${st}/>
        <path d="M-90,168 Q0,250 90,168 Q60,140 0,150 Q-60,140 -90,168Z" fill="#357a5b" ${st} stroke-width="6"/>
        <path d="M-30,215 L-36,300 M30,215 L36,300" ${st} stroke-width="5" fill="none"/>
        <circle cx="-36" cy="306" r="7" fill="#fff" ${st} stroke-width="3"/><circle cx="36" cy="306" r="7" fill="#fff" ${st} stroke-width="3"/>
        <path d="M-70,340 L70,340 L60,410 L-60,410Z" fill="#357a5b" ${st} stroke-width="5"/>
        <rect x="-32" y="110" width="64" height="60" rx="20" fill="${skin}" ${st}/>
      </g>` : ''}
      <g id="${id}-head" class="head">
        <ellipse cx="-118" cy="10" rx="20" ry="26" fill="${skin}" ${st} stroke-width="5"/>
        <ellipse cx="118" cy="10" rx="20" ry="26" fill="${skin}" ${st} stroke-width="5"/>
        <ellipse cx="0" cy="0" rx="116" ry="128" fill="${skin}" ${st}/>
        <circle cx="-60" cy="44" r="4" fill="#c98a6a"/><circle cx="-72" cy="52" r="4" fill="#c98a6a"/><circle cx="62" cy="44" r="4" fill="#c98a6a"/><circle cx="74" cy="52" r="4" fill="#c98a6a"/>
        ${eyes(id, mood)}
        <path d="M-6,22 Q2,34 -8,40" fill="none" ${st} stroke-width="5"/>
        <g class="mouth">${mouth(mood)}</g>
        <path d="M-122,-10 Q-150,-120 -60,-150 Q-40,-190 20,-165 Q60,-195 90,-150 Q150,-130 122,-10 Q110,-70 80,-80 L70,-60 Q40,-90 10,-78 L0,-56 Q-30,-90 -60,-72 L-70,-50 Q-100,-70 -122,-10Z" fill="${hair}" ${st}/>
        <path d="M10,-160 Q30,-205 60,-200" fill="none" ${st} stroke-width="6"/>
      </g>
    </g>`;
  }
  return { kira, mom, boy, phone, K, st };
})();
