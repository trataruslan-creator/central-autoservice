import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function PulsarLogo(props: P) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      <circle cx="16" cy="16" r="3.2" fill="#f4c66d" />
      <circle cx="16" cy="16" r="3.2" fill="none" stroke="#f4c66d" strokeWidth="1" className="pulse-ring" style={{ transformOrigin: "center" }} />
      <path d="M4 16a12 12 0 0 1 24 0" stroke="#79cfc3" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      <path d="M7.5 16a8.5 8.5 0 0 1 17 0" stroke="#9cc4f2" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
      <path d="M2 22.5c4-2 6.5-2.5 10-2.5M20 20c3.5 0 6 .5 10 2.5" stroke="#5d6891" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="25.5" cy="8" r="1" fill="#eaeefb" />
      <circle cx="7" cy="7" r="0.8" fill="#eaeefb" opacity="0.7" />
    </svg>
  );
}

export function ArrowUpRight(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15" />
    </svg>
  );
}

export function IconPlus(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconMinus(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconCheck(props: P) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 12.5 5 5L19.5 7" />
    </svg>
  );
}

export function IconPin(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.4-6.5-10a6.5 6.5 0 0 1 13 0c0 4.6-6.5 10-6.5 10Z" />
      <circle cx="12" cy="10.6" r="2.2" />
    </svg>
  );
}

export function IconUsers(props: P) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.4 2.7-5.2 5.5-5.2s4.9 1.8 5.5 5.2" />
      <path d="M15.5 5.4a3.2 3.2 0 0 1 0 5.9M17.4 15.2c1.7.8 2.8 2.4 3.1 4.8" />
    </svg>
  );
}

export function IconCalendar(props: P) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 2.8V6M16 2.8V6" />
      <circle cx="8" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconTelescope(props: P) {
  return (
    <svg {...base(props)}>
      <path d="m3.5 13.5 14-8 2.6 4.6-14 8z" />
      <path d="m17.5 5.5 2.6 4.6M10.5 17.5 8 21.5M13 16.5l2.5 5" />
      <circle cx="12" cy="15.5" r="1.4" />
    </svg>
  );
}

export function IconComet(props: P) {
  return (
    <svg {...base(props)}>
      <circle cx="17" cy="7" r="3.4" />
      <path d="M13.8 9.6 3 20M15.5 10.4 7.5 17.5M12.4 8.4 4 12.5" />
    </svg>
  );
}

/* --- sky objects glyphs --- */

export function GlyphBand(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 17C7 8 15 4.5 21.5 5.5" />
      <path d="M2.5 20.5C8 12 16 8.5 21.5 9.5" opacity="0.55" />
      <circle cx="8" cy="12.4" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="13" cy="9.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="7.4" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="15.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphSpiral(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M12 12c0-2 2.4-2.6 3.6-1 1.4 1.8.4 4.4-2 5-3 .8-5.9-1.6-5.6-4.9.4-3.9 4.5-6 8-4.4 4.3 1.9 5.4 7.4 2.3 11" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="5.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="19" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphRings(props: P) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4.6" />
      <path d="M3 14.8c-1-.9-.4-2.5 2.4-3.4M21 9.2c1 .9.4 2.5-2.4 3.4" />
      <ellipse cx="12" cy="12" rx="10" ry="3.6" transform="rotate(-16 12 12)" />
    </svg>
  );
}

export function GlyphNebula(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M7 15c-2.6-3.2-1-7.6 3-8.6 1.6-2.6 5.8-2.4 7 .3 3 0 5 3.4 3.6 6.2.8 2.8-1.6 5.6-4.4 5.3-1.6 1.8-4.6 1.8-6.2.1-1.6.5-2.8-.2-3-3.3Z" />
      <circle cx="11" cy="11" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="13.4" cy="10.4" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="12.2" cy="12.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphGlow(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M12 20 8.5 4h7L12 20Z" />
      <path d="M9.5 15.5h5" opacity="0.5" />
      <circle cx="5" cy="7" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="19" cy="9" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="18" cy="16" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GlyphMeteor(props: P) {
  return (
    <svg {...base(props)}>
      <circle cx="17.5" cy="6.5" r="2.6" />
      <path d="M15 9 4.5 19.5M16.2 10.4l-6.5 6.5M13.2 8 7 10.5" />
      <circle cx="8" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* --- socials --- */

export function IconTelegram(props: P) {
  return (
    <svg {...base(props)}>
      <path d="m21 4.5-3.2 15c-.2.8-.7 1-1.4.6l-4.5-3.3-2.2 2.1c-.2.3-.5.4-.8.4l.3-4.6L17.6 7c.4-.3-.1-.5-.6-.2L6.8 13.4l-4.4-1.4c-1-.3-1-1 .2-1.4L19.6 3.2c.8-.3 1.6.2 1.4 1.3Z" />
    </svg>
  );
}

export function IconVk(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 6.5h3l3 8 3-8h3l-4.6 11h-2.8L2.5 6.5Z" />
      <path d="M13.5 17.5c4.5 0 7.5-3.5 8-11h-3c-.4 5.5-2.4 8.4-5 8.6v2.4Z" />
    </svg>
  );
}

export function IconYoutube(props: P) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="6" width="19" height="12.5" rx="3.5" />
      <path d="m10.2 9.5 5 2.75-5 2.75Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* --- dynamic moon disc --- */

export function MoonDisc({ phase, size = 44, className }: { phase: number; size?: number; className?: string }) {
  const c = size / 2;
  const r = c - 1.5;
  const sweepPhase = phase <= 0.5 ? phase : 1 - phase;
  const rx = Math.abs(r * Math.cos(2 * Math.PI * sweepPhase));
  const waxing = phase <= 0.5;
  const crescent = sweepPhase < 0.25;
  const halfSweep = waxing ? 1 : 0;
  const ellipseSweep = waxing ? (crescent ? 0 : 1) : crescent ? 1 : 0;
  const d = `M ${c} ${c - r} A ${r} ${r} 0 0 ${halfSweep} ${c} ${c + r} A ${rx.toFixed(2)} ${r} 0 0 ${ellipseSweep} ${c} ${c - r} Z`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden="true">
      <circle cx={c} cy={c} r={r} fill="#151d3a" stroke="#33406e" strokeWidth="1" />
      <path d={d} fill="#f2e7c9" />
      <circle cx={c} cy={c} r={r} fill="none" stroke="#f2e7c9" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}
