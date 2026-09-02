export default function Ticker({ items }: { items: string[] }) {
  return (
    <div className="ticker relative z-10 overflow-hidden border-y border-line bg-night-900/70">
      <div className="ticker-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <span
                key={i}
                className="flex items-center gap-3 whitespace-nowrap px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-dim"
              >
                <svg viewBox="0 0 8 8" className="h-2 w-2 shrink-0" aria-hidden="true">
                  <path d="M4 0l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#f4c66d" />
                </svg>
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
