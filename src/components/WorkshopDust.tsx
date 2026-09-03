import { useEffect, useRef } from "react";

interface Mote {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  tw: number;
  ph: number;
}

export default function WorkshopDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let motes: Mote[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 22000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 2,
        r: 0.6 + Math.random() * 1.6,
        vy: 0.08 + Math.random() * 0.22,
        vx: -0.05 + Math.random() * 0.14,
        a: 0.05 + Math.random() * 0.16,
        tw: 0.5 + Math.random() * 1.4,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const period = h + 40;
      for (const m of motes) {
        if (!reduced) {
          m.y += m.vy;
          m.x += m.vx + Math.sin((t / 4000) + m.ph) * 0.06;
          if (m.y > h + 20) {
            m.y = -20;
            m.x = Math.random() * w;
          }
          if (m.x > w + 20) m.x = -20;
          if (m.x < -20) m.x = w + 20;
        }
        const y = ((m.y + window.scrollY * 0.05) % period + period) % period - 20;
        const alpha = reduced ? m.a : m.a * (0.6 + 0.4 * Math.sin((t / 1000) * m.tw + m.ph));
        ctx.fillStyle = `rgba(238,242,246,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, y, m.r, 0, Math.PI * 2);
        ctx.fill();
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
