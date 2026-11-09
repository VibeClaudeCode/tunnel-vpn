#!/usr/bin/env python3
# banner.py <main.mp4> <words.json> <banner.mov> <out.mp4> [--first 15] [--tail 15]
# Вставляет рекламный баннер дважды: на 0:15 итогового ролика и когда до конца остаётся --tail секунд.
# Пока играет баннер, ролик стоит на стоп-кадре (затемнён), звук — звук баннера.
# Точку паузы берём в ближайшей паузе речи, чтобы не резать слово.
import json, subprocess, sys, argparse, os
ap = argparse.ArgumentParser(); ap.add_argument('main'); ap.add_argument('words'); ap.add_argument('banner'); ap.add_argument('out')
ap.add_argument('--first', type=float, default=15.0); ap.add_argument('--tail', type=float, default=15.0); o = ap.parse_args()
dur = lambda f: float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))
M, B = dur(o.main), dur(o.banner)
if o.words.endswith(('.mp3', '.wav')):   # паузы прямо по звуку голоса
    import re
    log = subprocess.run(['ffmpeg', '-i', o.words, '-af', 'silencedetect=noise=-38dB:d=0.2', '-f', 'null', '-'], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]; en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    gaps = [((a + b) / 2, b - a) for a, b in zip(st, en)]
else:
    W = json.load(open(o.words)); W = W.get('words', W) if isinstance(W, dict) else W
    gaps = [((a['e'] + b['s']) / 2, b['s'] - a['e']) for a, b in zip(W, W[1:]) if b['s'] - a['e'] >= 0.15]
def near(t): return min(gaps, key=lambda g: abs(g[0] - t))[0]
t1 = near(o.first)                         # 1-й баннер: итоговое время = основному (до него ничего не вставлено)
# 2-й баннер стартует, когда до конца итогового ролика остаётся tail секунд: F - tail = t2 + B, F = M + 2B → t2 = M + B - tail
t2 = near(M + B - o.tail)
t1, t2 = round(t1 * 30) / 30, round(t2 * 30) / 30
F = M + 2 * B
print(f'основной {M:.2f} с, баннер {B:.2f} с, итог {F:.2f} с; пауза 1 на {t1:.2f} с, пауза 2 на {t2:.2f} с (итог {t2 + B:.2f} с, до конца {F - t2 - B:.2f} с)')
Wd = int(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width','-of','csv=p=0',o.main])); bw = Wd  # во всю ширину кадра, по центру
fc = (
  f"[0:v]split=3[v0][v1][v2];[0:a]asplit=3[a0][a1][a2];"
  f"[v0]trim=0:{t1},setpts=PTS-STARTPTS[p0];[a0]atrim=0:{t1},asetpts=PTS-STARTPTS[q0];"
  f"[v1]trim={t1}:{t2},setpts=PTS-STARTPTS[p1];[a1]atrim={t1}:{t2},asetpts=PTS-STARTPTS[q1];"
  f"[v2]trim={t2},setpts=PTS-STARTPTS[p2];[a2]atrim={t2},asetpts=PTS-STARTPTS[q2];"
  f"[1:v]scale={bw}:-1,format=yuva420p,split=2[b1][b2];[1:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[ba1][ba2];"
)
for k, t in ((1, t1), (2, t2)):
    fc += (f"[{k+1}:v]loop=loop=-1:size=1:start=0,trim=0:{B},setpts=PTS-STARTPTS,fps=30,eq=brightness=-0.22:saturation=0.6,gblur=sigma=6[f{k}];"
           f"[f{k}][b{k}]overlay=(W-w)/2:(H-h)/2:shortest=1,format=yuv420p,trim=0:{B},setpts=PTS-STARTPTS[F{k}];")
fc += "[q0]aformat=sample_rates=48000:channel_layouts=stereo[r0];[q1]aformat=sample_rates=48000:channel_layouts=stereo[r1];[q2]aformat=sample_rates=48000:channel_layouts=stereo[r2];"
fc += "[ba1]apad=whole_dur=%.3f[c1];[ba2]apad=whole_dur=%.3f[c2];" % (B, B)
fc += "[p0][r0][F1][c1][p1][r1][F2][c2][p2][r2]concat=n=5:v=1:a=1[v][a]"
tmp = o.out + '.f%d.png'
for k, t in ((1, t1), (2, t2)):
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t - 1/30:.3f}', '-i', o.main, '-frames:v', '1', tmp % k], check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', o.main, '-i', o.banner, '-i', tmp % 1, '-i', tmp % 2, '-filter_complex', fc,
                '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30',
                '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', o.out], check=True)
for k in (1, 2): os.remove(tmp % k)
print('ГОТОВО', o.out, f'{dur(o.out):.2f} с')
