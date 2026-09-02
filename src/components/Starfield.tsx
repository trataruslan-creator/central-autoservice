import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  amp: number;
  speed: number;
  phase: number;
  layer: number;
  hue: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

const COLORS = ["242,236,218", "212,226,255", "255,222,176", "186,238,228"];

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let nextMeteor = performance.now() + 2600;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(440, Math.floor((w * h) / 3600));
      stars = Array.from({ length: count }, () => {
        const roll = Math.random();
        const layer = roll < 0.5 ? 0 : roll < 0.82 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * 4000,
          r: layer === 2 ? 1.1 + Math.random() * 1 : 0.4 + Math.random() * 0.75,
          base: 0.22 + Math.random() * 0.5,
          amp: reduced ? 0 : 0.12 + Math.random() * 0.3,
          speed: 0.4 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          layer,
          hue: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
      });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      const period = h + 320;

      for (const s of stars) {
        const par = s.layer === 0 ? 0.045 : s.layer === 1 ? 0.1 : 0.17;
        let y = (s.y - scroll * par) % period;
        if (y < 0) y += period;
        y -= 160;
        if (y < -10 || y > h + 10) continue;
        const a = Math.max(0.05, s.base + s.amp * Math.sin((t / 1000) * s.speed + s.phase));
        ctx.fillStyle = `rgba(${s.hue},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.layer === 2) {
          ctx.fillStyle = `rgba(${s.hue},${(a * 0.14).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(s.x, y, s.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) {
        if (t > nextMeteor) {
          nextMeteor = t + 3800 + Math.random() * 5200;
          meteors.push({
            x: w * (0.25 + Math.random() * 0.6),
            y: h * Math.random() * 0.35,
            vx: -(6 + Math.random() * 3.4),
            vy: 3 + Math.random() * 2,
            life: 0,
            max: 55 + Math.random() * 30,
          });
        }
        meteors = meteors.filter((m) => m.life < m.max && m.x > -120 && m.y < h + 120);
        for (const m of meteors) {
          m.x += m.vx;
          m.y += m.vy;
          m.life++;
          const p = m.life / m.max;
          const a = p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8;
          const tailX = m.x - m.vx * 7;
          const tailY = m.y - m.vy * 7;
          const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          grad.addColorStop(0, `rgba(242,236,218,${(0.9 * a).toFixed(3)})`);
          grad.addColorStop(1, "rgba(242,236,218,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
