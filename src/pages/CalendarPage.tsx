import { useMemo, useState } from "react";
import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { GaugeDisc, IconPin } from "../components/Icons";
import { EVENTS, EVENT_TYPE_LABEL, type EventType } from "../lib/data";
import { CITIES, routeInfo, seasonInfo, fmtKm, fmtPrice, MONTHS_SHORT } from "../lib/drive";

const TYPE_FILTERS: Array<EventType | "all"> = ["all", "track", "ice", "rally", "classic"];

const TYPE_CHIP: Record<EventType, string> = {
  track: "border-skyc/50 text-skyc",
  ice: "border-nebula/50 text-nebula",
  rally: "border-amberstar/50 text-amberstar",
  classic: "border-flare/50 text-flare",
};

const MONTHS_FULL = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

function Rating({ n, label }: { n: number; label: string }) {
  return (
    <span className="flex items-center gap-1" title={`${label}: ${n}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`vd ${i <= n ? "bg-amberstar" : "bg-line"}`} />
      ))}
    </span>
  );
}

function RouteLab() {
  const [from, setFrom] = useState("msk");
  const [to, setTo] = useState("mvody");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const fromCity = CITIES.find((c) => c.id === from) ?? CITIES[0];
  const toCity = CITIES.find((c) => c.id === to) ?? CITIES[4];
  const swapped = from === to;

  const info = useMemo(
    () => routeInfo(fromCity, swapped ? CITIES.find((c) => c.id === "sochi") ?? toCity : toCity),
    [fromCity, toCity, swapped]
  );

  const season = seasonInfo(new Date(date + "T12:00:00Z"));
  const toneClass =
    season.tone === "nebula"
      ? "border-nebula/50 text-nebula"
      : season.tone === "amberstar"
        ? "border-amberstar/50 text-amberstar"
        : season.tone === "skyc"
          ? "border-skyc/50 text-skyc"
          : "border-flare/50 text-flare";

  const gaugeValue = Math.min(1, Math.log10(Math.max(info.km, 40) / 40) / Math.log10(9000 / 40));

  return (
    <Reveal className="border border-line bg-night-900/70 p-7 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">Калькулятор маршрута</p>
        <input
          type="date"
          value={date}
          onChange={(e) => e.target.value && setDate(e.target.value)}
          className="border border-line bg-night-950 px-4 py-2 font-mono text-xs text-star outline-none transition-colors focus:border-amberstar/60 [color-scheme:dark]"
          aria-label="Дата выезда"
        />
      </div>

      <div className="mt-7 grid gap-6 md:grid-cols-2">
        {[
          { label: "Откуда", value: from, set: setFrom, other: to },
          { label: "Куда", value: to, set: setTo, other: from },
        ].map((f) => (
          <div key={f.label}>
            <label className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
              <IconPin className="h-3.5 w-3.5 text-amberstar" />
              {f.label}
            </label>
            <div className="relative">
              <select
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
                className="w-full appearance-none border border-line bg-night-950 px-4 py-3 pr-10 text-sm text-star outline-none transition-colors focus:border-amberstar/60"
              >
                {CITIES.map((c) => (
                  <option key={c.id} value={c.id} disabled={c.id === f.other}>
                    {c.name}
                  </option>
                ))}
              </select>
              <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-faint">
                <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-8 border-t border-line pt-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <div className="flex flex-col items-center">
          <GaugeDisc value={gaugeValue} size={132} />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">индекс дальности</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          {[
            { v: fmtKm(info.km), l: "по дорогам" },
            { v: `${Math.floor(info.hours)} ч`, l: "чистого хода" },
            { v: `${info.days} ${info.days === 1 ? "день" : "дн"}`, l: "с ночёвками" },
            { v: `~${info.fuel} л`, l: `топлива · ${fmtPrice(info.fuelCost)}` },
          ].map((x) => (
            <div key={x.l}>
              <p className="font-display text-xl text-star lg:text-2xl">{x.v}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{x.l}</p>
            </div>
          ))}
        </div>

        <div className="lg:max-w-xs">
          <span className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] ${toneClass}`}>
            {season.name} · {season.label}
          </span>
          <p className="mt-4 text-sm leading-relaxed text-dim">{season.note}.</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function CalendarPage() {
  usePageTitle("Сезон-2026 — Апекс");
  const [type, setType] = useState<EventType | "all">("all");

  const filtered = EVENTS.filter((e) => type === "all" || e.type === type);
  const months = [...new Set(filtered.map((e) => e.monthIdx))].sort((a, b) => a - b);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
            <ScrambleText text="Календарь сезона · 13 событий · лёд, трасса, ралли, классика" />
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <MaskLines lines={[<span key="1">2026: год, когда</span>, <span key="2">руль не остынет</span>, <span key="3" className="text-amberstar">ни на месяц</span>]} />
          </h1>
          <Reveal delay={300} className="mt-7 max-w-xl">
            <p className="text-sm leading-relaxed text-dim lg:text-base">
              Ледовая гонка на Байкале, этап RDS, «Шёлковый путь» и золотые серпантины Кавказа.
              Под каждое событие календаря у клуба есть заезд, машина или место в паддоке.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <RouteLab />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {TYPE_FILTERS.map((f) => {
            const active = type === f;
            return (
              <button
                key={f}
                onClick={() => setType(f)}
                className={`border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  active ? "border-amberstar bg-amberstar font-semibold text-night-950" : "border-line text-dim hover:border-amberstar/50 hover:text-star"
                }`}
              >
                {f === "all" ? "Все события" : EVENT_TYPE_LABEL[f]}
              </button>
            );
          })}
          <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.16em] text-faint md:block">
            зрелищность — по пятибалльной шкале клуба
          </span>
        </div>

        <div className="mt-12 space-y-16">
          {months.map((mIdx) => (
            <div key={mIdx}>
              <Reveal className="mb-6 flex items-baseline gap-5">
                <h2 className="font-display text-2xl font-bold uppercase text-star lg:text-3xl">{MONTHS_FULL[mIdx]}</h2>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">2026</span>
              </Reveal>
              <div>
                {filtered
                  .filter((e) => e.monthIdx === mIdx)
                  .map((e, i) => (
                    <Reveal key={e.id} delay={i * 70}>
                      <div className="group grid grid-cols-[64px_1fr] items-center gap-5 border-t border-line py-6 transition-all duration-300 last:border-b hover:bg-night-900/60 sm:grid-cols-[84px_1fr_auto] sm:gap-7 lg:px-4">
                        <div>
                          <p className="font-display text-2xl font-bold text-star transition-colors duration-300 group-hover:text-amberstar">{e.dayNum}</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">{MONTHS_SHORT[e.monthIdx]}</p>
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="font-display text-base font-semibold lg:text-lg">{e.title}</h3>
                            {e.meta && (
                              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-nebula">
                                <IconPin className="h-3 w-3" />
                                {e.meta}
                              </span>
                            )}
                            <span className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] ${TYPE_CHIP[e.type]}`}>
                              {EVENT_TYPE_LABEL[e.type]}
                            </span>
                          </div>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-dim">{e.desc}</p>
                        </div>
                        <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end sm:justify-center">
                          <Rating n={e.visibility} label="Зрелищность" />
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">зрелищность</span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-6 border border-line bg-night-900/60 p-8 md:grid-cols-3 lg:p-10">
          {[
            ["Чекпоинт", "контрольная точка маршрута с отметкой времени. В фоторалли побеждает не скорость, а лучшая карточка с точки"],
            ["Зрелищность 5/5", "события, после которых в клуб приходят новые люди. Лёд Байкала и перевальный сезон — как раз из таких"],
            ["Резервные сутки", "у каждого выезда клуба есть запасной день: дороги в горах живут по своим правилам, и мы к этому готовы"],
          ].map(([term, def]) => (
            <div key={term} className="flex gap-4">
              <span className="font-display text-xl font-bold text-amberstar whitespace-nowrap">{term.split(" ")[0]}</span>
              <p className="text-sm leading-relaxed text-dim">{def}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
