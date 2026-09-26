import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 130,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.2);
  return (
    <span ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            className={`block transition-transform duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              shown ? "translate-y-0" : "translate-y-[112%]"
            } ${lineClassName}`}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {l}
          </span>
        </span>
      ))}
    </span>
  );
}

const GLYPHS = "✦◇·:∗АВДЖЛПРСТУЦШ0123456789";

export function ScrambleText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const { ref, shown } = useInView<HTMLSpanElement>(0.3);
  const [out, setOut] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    if (!shown || done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let raf = 0;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start - delay;
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      frame++;
      const reveal = Math.floor(t / 42);
      const s = text
        .split("")
        .map((ch, i) => {
          if (ch === " " || ch === "·" || i < reveal) return ch;
          return GLYPHS[(i * 7 + frame * 5) % GLYPHS.length];
        })
        .join("");
      setOut(s);
      if (reveal <= text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setOut(text);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, text, delay]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

export function useCountUp(target: number, duration = 1500, decimals = 0) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setVal(target);
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(parseFloat((target * eased).toFixed(decimals)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, decimals]);
  return { ref, val };
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
