import { useEffect, useMemo, useState } from "react";
import { SEED_JOBS, STAGES, type Job } from "../lib/data";

const STAGE_STYLE = [
  "border-steel/50 text-steel",
  "border-amber/50 text-amber",
  "border-amber/50 text-amber",
  "border-go/60 text-go",
];

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>(() => SEED_JOBS.slice(0, 5));
  const [tick, setTick] = useState(0);
  const reduced = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setJobs((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const next = [...prev];
        const job = next[idx];
        if (job.stage >= 3) {
          const pool = SEED_JOBS.filter((j) => !prev.some((p) => p.id === j.id));
          const fresh = pool.length ? pool[Math.floor(Math.random() * pool.length)] : SEED_JOBS[Math.floor(Math.random() * SEED_JOBS.length)];
          next[idx] = { ...fresh, stage: 0 };
        } else {
          next[idx] = { ...job, stage: job.stage + 1 };
        }
        return next;
      });
      setTick((t) => t + 1);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div className="relative border border-linedark bg-ink-950/80 backdrop-blur-sm">
      <div className="hazard h-1.5" />
      <div className="flex items-center justify-between border-b border-linedark px-5 py-3.5">
        <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-mutd">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-go" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-go" />
          </span>
          Ремзона · сейчас в работе
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mutd/70">камеры онлайн</span>
      </div>

      <ul className="divide-y divide-linedark">
        {jobs.map((j, i) => (
          <li key={j.id} className="anim-jobin grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-3.5" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-star">{j.car}</p>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-mutd">{j.job}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${STAGE_STYLE[j.stage]}`}>
                {STAGES[j.stage]}
              </span>
              <span className="h-1 w-20 overflow-hidden rounded-full bg-ink-800">
                <span
                  key={`${j.id}-${j.stage}-${tick}`}
                  className={`block h-full rounded-full ${j.stage === 3 ? "bg-go" : "bg-amber"} anim-sweep`}
                  style={j.stage === 3 ? { width: "100%", animation: "none" } : { animationDuration: "3.1s" }}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t border-linedark px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mutd/70">обновлено только что</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-steel" style={{ animationDelay: "0.3s" }} />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-go" style={{ animationDelay: "0.6s" }} />
        </span>
      </div>
    </div>
  );
}
