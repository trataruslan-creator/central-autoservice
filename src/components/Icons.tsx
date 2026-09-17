import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (p: P): P => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...p,
});

/* ---------- логотип: гайка с гаечным ключом ---------- */
export function LogoMark(p: P) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...p}>
      <path d="M20 3l14 8v16L20 37 6 27V11z" fill="currentColor" opacity="0.14" />
      <path d="M20 3l14 8v16L20 37 6 27V11z" stroke="currentColor" strokeWidth="2" />
      <path
        d="M25.5 14.5a4.5 4.5 0 0 1-6 5.6l-4.6 4.6a1.9 1.9 0 0 1-2.7-2.7l4.6-4.6a4.5 4.5 0 0 1 5.6-6l-2.6 2.6 3.1 3.1z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- услуги ---------- */
export function IconDiag(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M7 8h4M7 11h7M15 8h2" />
      <path d="M9 16v2.5A2.5 2.5 0 0 0 11.5 21h1A2.5 2.5 0 0 0 15 18.5V16" />
    </svg>
  );
}
export function IconOil(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5s-5.5 6.2-5.5 10a5.5 5.5 0 0 0 11 0c0-3.8-5.5-10-5.5-10z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  );
}
export function IconAlignment(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22" />
      <path d="M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" opacity="0.6" />
    </svg>
  );
}
export function IconSuspension(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 2v3M12 19v3" />
      <path d="M7 5h10" />
      <path d="M8.5 7l7 1.6-7 1.7 7 1.7-7 1.7 7 1.6" />
      <path d="M7 17h10" />
    </svg>
  );
}
export function IconSteering(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M3.5 12h6.3M14.2 12h6.3M12 14.2V20.5" />
    </svg>
  );
}
export function IconEngine(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M7 7V5h4v2M9 5V3.5" />
      <path d="M5 9H3v6h2M21 10h-1.5l-2-2h-5L10 10.5V16l2.5 2H17l2-2h2z" />
      <path d="M12.5 12.5h3M12.5 15h3" opacity="0.6" />
    </svg>
  );
}
export function IconGearbox(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M6 8v8M12 8v8M18 8v5.5a2.5 2.5 0 0 1-2.5 2.5H14" />
    </svg>
  );
}
export function IconBrake(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.2" />
      <circle cx="12" cy="6.6" r="0.4" fill="currentColor" />
      <circle cx="16.7" cy="9.3" r="0.4" fill="currentColor" />
      <circle cx="16.7" cy="14.7" r="0.4" fill="currentColor" />
      <circle cx="12" cy="17.4" r="0.4" fill="currentColor" />
      <circle cx="7.3" cy="14.7" r="0.4" fill="currentColor" />
      <circle cx="7.3" cy="9.3" r="0.4" fill="currentColor" />
      <path d="M20.5 6.5l1.5-2" opacity="0.6" />
    </svg>
  );
}
export function IconExhaust(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M3 15h6l2-3h5a3 3 0 0 1 3 3v1H3z" />
      <path d="M6.5 8.5c1-.8 2-.8 3 0s2 .8 3 0M15 5.5c.8-.6 1.6-.6 2.4 0" opacity="0.7" />
    </svg>
  );
}
export function IconBolt(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M13 2 5 13h5l-1.5 9L18 10h-5.5z" />
    </svg>
  );
}
export function IconWash(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 14l1.6-4.2A2 2 0 0 1 7.5 8.5h9a2 2 0 0 1 1.9 1.3L20 14" />
      <path d="M3 14h18v4h-2.2M5.2 18H3v-4" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="16.5" cy="18" r="1.8" />
      <path d="M12 3v1.5M9 4.5l.7 1.2M15 4.5l-.7 1.2" opacity="0.7" />
    </svg>
  );
}
export function IconTire(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 7.5V4M16 10l2.9-2M16 14l2.9 2M12 16.5V20M8 14l-2.9 2M8 10l-2.9-2" opacity="0.7" />
    </svg>
  );
}
export function IconChecklist(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M8.5 8l1.2 1.2L12 7M8.5 13l1.2 1.2L12 12M8.5 17.5h7" />
      <path d="M14.5 8h1.5M14.5 13h1.5" opacity="0.6" />
    </svg>
  );
}
export function IconAutoElectric(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 16l1.5-4.2A2 2 0 0 1 7.4 10.5h9.2a2 2 0 0 1 1.9 1.3L20 16" />
      <path d="M3 16h18v3.5h-2M5 19.5H3V16" />
      <circle cx="7.3" cy="19.5" r="1.7" />
      <circle cx="16.7" cy="19.5" r="1.7" />
      <path d="M12.5 2.5 9.5 7h2.2l-1.2 3.5L14 6h-2.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconPresale(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 15l1.4-3.8A2 2 0 0 1 7.3 10h6.9a2 2 0 0 1 1.9 1.4L17 15" />
      <path d="M3 15h18v3.5h-2M5 18.5H3V15" />
      <circle cx="7.2" cy="18.5" r="1.7" />
      <circle cx="16.8" cy="18.5" r="1.7" />
      <path d="M18.5 4.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L16 6.5l1.5-.5z" />
    </svg>
  );
}

export const SERVICE_ICON: Record<string, (p: P) => React.JSX.Element> = {
  diag: IconDiag,
  to: IconOil,
  razval: IconAlignment,
  suspension: IconSuspension,
  steering: IconSteering,
  engine: IconEngine,
  transmission: IconGearbox,
  brakes: IconBrake,
  exhaust: IconExhaust,
  electric: IconBolt,
  wash: IconWash,
  tires: IconTire,
  autoelectric: IconAutoElectric,
  presale: IconPresale,
};

/* ---------- UI ---------- */
export function IconPhone(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 5.6A1.5 1.5 0 0 1 5 4z" />
    </svg>
  );
}
export function IconMax(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5c4.7 0 8.5 3.2 8.5 7.2s-3.8 7.2-8.5 7.2c-.9 0-1.8-.1-2.6-.4L4.5 19l1-3.3c-1.2-1.2-2-2.9-2-5 0-4 3.8-7.2 8.5-7.2z" />
      <path d="M8 13.5v-4l2.4 2.6L12.8 9.5l1.2 1.4v2.6" strokeWidth="1.5" />
    </svg>
  );
}
export function IconWhatsApp(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5z" />
      <path d="M9 8.8c-.3 1.8 2.4 5.4 5.5 5.9l1-1.4-1.8-1-.8.6c-.9-.4-1.7-1.3-2-2.2l.7-.7-.9-1.9z" />
    </svg>
  );
}
export function ArrowUpRight(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15" />
    </svg>
  );
}
export function IconCheck(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4.5 12.5 10 18 19.5 7" />
    </svg>
  );
}
export function IconClock(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}
export function IconPin(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </svg>
  );
}
export function IconCamera(p: P) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="6.5" width="13" height="11" rx="1.5" />
      <path d="M16 10.5 21 8v8l-5-2.5" />
      <circle cx="9.5" cy="12" r="2.6" />
    </svg>
  );
}
export function IconDoc(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </svg>
  );
}
export function IconShield(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M12 3 5 5.5v6c0 4.5 3 7.6 7 9.5 4-1.9 7-5 7-9.5v-6z" />
      <path d="M9 11.5l2 2 4-4.5" />
    </svg>
  );
}
export function IconWrench(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M14.5 6.5a4.5 4.5 0 0 1 5.6-4.4l-3 3 .8 3 3 .8 3-3v.1a4.5 4.5 0 0 1-5.9 4.1l-8 8a2 2 0 1 1-2.8-2.8l8-8z" transform="scale(0.82) translate(1.5,2)" />
    </svg>
  );
}
export function IconGauge(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M4 17.5a8.5 8.5 0 1 1 16 0" />
      <path d="M12 13.5 15.5 9" />
      <circle cx="12" cy="14.5" r="1.4" />
    </svg>
  );
}
export function IconRoute(p: P) {
  return (
    <svg {...base(p)}>
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="18" cy="5.5" r="2" />
      <path d="M8 18.5h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" strokeDasharray="3.5 3" />
    </svg>
  );
}
export function IconChevron(p: P) {
  return (
    <svg {...base(p)}>
      <path d="M8 5l7 7-7 7" />
    </svg>
  );
}

export function IconStar(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
