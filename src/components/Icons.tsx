type IconProps = { className?: string };

export function LogoMark({ className = "h-7 w-7" }: IconProps) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <path d="M5 25V15.5C5 9 10 4 16.5 4H23" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M10.5 25v-8.5c0-3.6 2.9-6.5 6.5-6.5H23" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.45" strokeLinecap="round" />
      <circle cx="24" cy="4" r="2.6" fill="#e2593f" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function IconPin({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.5s-6.5-5-6.5-10.2A6.5 6.5 0 0112 4.8a6.5 6.5 0 016.5 6.5C18.5 16.5 12 21.5 12 21.5z" />
      <circle cx="12" cy="11.3" r="2.3" />
    </svg>
  );
}

export function IconUsers({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.4 2.8-5.2 5.5-5.2s4.9 1.8 5.5 5.2" />
      <circle cx="16.8" cy="9.2" r="2.4" />
      <path d="M15.6 14.6c2.4.2 4.2 1.9 4.8 4.6" />
    </svg>
  );
}

export function IconSteering({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M3.6 10.8c2.7-1.2 14.1-1.2 16.8 0M12 14.6V20.5M9.6 13.6l-5.2 3.6M14.4 13.6l5.2 3.6" />
    </svg>
  );
}

export function IconCheck({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 12.5l5 5L19.5 6.5" />
    </svg>
  );
}

export function IconTelegram({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.7 4.1L2.9 11.4c-.9.4-.9 1.6.1 1.9l4.8 1.5 1.8 5.6c.3.8 1.3 1 1.9.4l2.6-2.5 4.9 3.6c.7.5 1.7.1 1.9-.8l2.3-15.7c.2-1-.8-1.7-1.5-1.3zM9.4 14.4l8.4-7.6c.3-.3.7.1.4.4l-6.9 6.7-.3 3.2-1.6-2.7z" />
    </svg>
  );
}

export function IconVk({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.8 17.5c-5.6 0-8.8-3.9-9-10.2h2.9c.1 4.7 2.2 6.7 3.8 7.1V7.3h2.7v4.1c1.6-.2 3.3-2 3.9-4.1h2.7c-.4 2.6-2.3 4.4-3.6 5.1 1.3.6 3.5 2.1 4.3 5.1h-3c-.6-2-2.2-3.6-4.3-3.8v3.8h-.4z" />
    </svg>
  );
}

export function IconYoutube({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12s0-3.3-.4-4.9c-.2-.9-.9-1.6-1.8-1.8C18.2 4.8 12 4.8 12 4.8s-6.2 0-7.8.5c-.9.2-1.6.9-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.9c.2.9.9 1.6 1.8 1.8 1.6.5 7.8.5 7.8.5s6.2 0 7.8-.5c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.9.4-4.9zM9.8 15.3V8.7L15.5 12l-5.7 3.3z" />
    </svg>
  );
}

export function IconMinus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

export function IconPlus({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ---------------- спидометр ---------------- */

function pt(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function arcPath(cx: number, cy: number, r: number, fromDeg: number, toDeg: number) {
  const [x1, y1] = pt(cx, cy, r, fromDeg);
  const [x2, y2] = pt(cx, cy, r, toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

export function GaugeDisc({
  value,
  size = 92,
  tone = "#f2a33c",
}: {
  value: number; // 0..1
  size?: number;
  tone?: string;
}) {
  const v = Math.max(0, Math.min(1, value));
  const angle = -120 + v * 240;
  const ticks = Array.from({ length: 9 }, (_, i) => -120 + i * 30);
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }} aria-hidden="true">
      <path d={arcPath(50, 54, 40, -120, 120)} fill="none" stroke="#2b2e39" strokeWidth="7" strokeLinecap="round" />
      {v > 0.01 && (
        <path d={arcPath(50, 54, 40, -120, angle)} fill="none" stroke={tone} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
      )}
      {ticks.map((t) => {
        const [x1, y1] = pt(50, 54, 31, t);
        const [x2, y2] = pt(50, 54, 27, t);
        return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666d7d" strokeWidth="1.6" strokeLinecap="round" />;
      })}
      <g className="gauge-needle" style={{ transform: `rotate(${angle}deg)`, transformOrigin: "50px 54px" }}>
        <line x1="50" y1="54" x2="50" y2="26" stroke={tone} strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="54" r="4.5" fill="#17181e" stroke={tone} strokeWidth="2" />
      <circle cx="50" cy="54" r="1.4" fill={tone} />
    </svg>
  );
}

/* ---------------- пиктограммы маршрутов ---------------- */

export function ObjectIcon({ kind, className = "h-10 w-10" }: { kind: string; className?: string }) {
  switch (kind) {
    case "pass":
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 40L16 14l7 12 5-8 16 22H4z" opacity="0.9" />
          <path d="M10 40c6-2 8-8 12-8s6 5 12 5" opacity="0.5" />
          <circle cx="38" cy="10" r="3" fill="currentColor" stroke="none" opacity="0.7" />
        </svg>
      );
    case "hairpin":
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 6v22a10 10 0 0020 0V16" />
          <path d="M32 20v-4M32 16l-4 4M32 16l4 4" opacity="0.85" />
          <path d="M18 6v20a4 4 0 008 0V16" opacity="0.45" />
        </svg>
      );
    case "ice":
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 30L20 12l14 8 8 12-12 8-16-2z" />
          <path d="M20 12l4 10-8 6M24 22l10 2M24 22l-4 14" opacity="0.6" />
          <path d="M34 20l6-6" opacity="0.6" />
        </svg>
      );
    case "offroad":
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 38c5-6 3-10 8-14s3-10 8-14" />
          <path d="M18 40c5-6 3-10 8-14s3-10 8-14" opacity="0.55" />
          <circle cx="36" cy="36" r="6" />
          <circle cx="36" cy="36" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "circuit":
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 8h20a6 6 0 016 6v6c0 4-3 5-6 7s-6 3-6 7a6 6 0 01-6 6H14a6 6 0 01-6-6V14a6 6 0 016-6z" />
          <path d="M16 20l4 4-4 4" opacity="0.6" />
          <circle cx="32" cy="30" r="2" fill="currentColor" stroke="none" opacity="0.8" />
        </svg>
      );
    case "night":
      return (
        <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 40h32" />
          <path d="M12 34l6-10h8l6 10H12z" />
          <path d="M20 24v-4M18 34h8" opacity="0.6" />
          <path d="M30 22l10-6M31 27l11-2" opacity="0.85" />
          <circle cx="10" cy="12" r="1.4" fill="currentColor" stroke="none" opacity="0.5" />
          <circle cx="40" cy="10" r="1" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
      );
    default:
      return null;
  }
}
