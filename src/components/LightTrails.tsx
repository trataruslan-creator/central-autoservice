import { useEffect, useRef } from "react";

interface Streak {
  x: number;
  y: number;
  len: number;
  speed: number;
  dir: 1 | -1;
  layer: number;
  color: string;
  alpha: number;
}

const HEAD = ["255,238,205", "255,214,150", "255,246,226"];
const TAIL = ["226,89,63", "239,143,128"];

export default function LightTrails() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let streaks: Streak[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const makeStreak = (randomX: boolean): Streak => {
      const layerRoll = Math.random();
      const layer = layerRoll < 0.45 ? 0 : layerRoll < 0.8 ? 1 : 2;
      const dir: 1 | -1 = Math.random() < 0.55 ? 1 : -1;
      const palette = dir === 1 ? HEAD : TAIL;
      const speedBase = layer === 0 ? 0.35 : layer === 1 ? 0.8 : 1.7;
      return {
        x: randomX ? Math.random() * (w + 600) - 300 : dir === 1 ? -200 - Math.random() * 300 : w + 200 + Math.random() * 300,
        y: h * (0.12 + Math.random() * 0.8),
        len: 40 + Math.random() * (layer === 2 ? 190 : 90),
        speed: (speedBase + Math.random() * speedBase) * (reduced ? 0 : 1),
        dir,
        layer,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: layer === 0 ? 0.05 + Math.random() * 0.08 : layer === 1 ? 0.1 + Math.random() * 0.14 : 0.2 + Math.random() * 0.2,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 26000));
      streaks = Array.from({ length: count }, () => makeStreak(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;

      for (const s of streaks) {
        if (!reduced) {
          s.x += s.speed * s.dir;
          if (s.dir === 1 && s.x - s.len > w + 60) Object.assign(s, makeStreak(false));
          if (s.dir === -1 && s.x + s.len < -60) Object.assign(s, makeStreak(false));
        }
        const par = s.layer === 0 ? 0.03 : s.layer === 1 ? 0.07 : 0.12;
        const y = s.y - (scroll * par) % (h + 200);

        const headX = s.x;
        const tailX = s.x - s.len * s.dir;
        const grad = ctx.createLinearGradient(headX, y, tailX, y);
        grad.addColorStop(0, `rgba(${s.color},${s.alpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(${s.color},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.layer === 2 ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(headX, y);
        ctx.lineTo(tailX, y);
        ctx.stroke();

        if (s.layer === 2) {
          ctx.fillStyle = `rgba(${s.color},${(s.alpha * 0.9).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(headX, y, 1.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
