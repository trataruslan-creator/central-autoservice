import { useMemo, useState } from "react";
import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { MoonDisc } from "../components/Icons";
import { SKY_EVENTS, EVENT_TYPE_LABEL, type EventType } from "../lib/data";
import { darkQuality, moonPhase, MONTHS_SHORT, ruDate } from "../lib/astro";

const TYPE_FILTERS: Array<EventType | "all"> = ["all", "meteors", "planet", "eclipse"];

const TYPE_CHIP: Record<EventType, string> = {
  meteors: "border-amberstar/50 text-amberstar",
  planet: "border-skyc/50 text-skyc",
  eclipse: "border-flare/50 text-flare",
  moon: "border-nebula/50 text-nebula",
};

const MONTHS_FULL = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

function Visibility({ n }: { n: number }) {
  return (
    <span className="flex items-center gap-1" title={`Видимость из России: ${n}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`vd ${i <= n ? "bg-amberstar" : "bg-line"}`} />
      ))}
    </span>
  );
}

function MoonLab() {
  const [value, setValue] = useState(() => new Date().toISOString().slice(0, 10));
  const date = useMemo(() => {
    const d = new Date(value + "T12:00:00Z");
    return isNaN(d.getTime()) ? new Date() : d;
  }, [value]);
  const mp = moonPhase(date);
  const q = darkQuality(mp.illum);
  const toneClass = q.tone === "nebula" ? "border-nebula/50 text-nebula" : q.tone === "amberstar" ? "border-amberstar/50 text-amberstar" : "border-flare/50 text-flare";

  return (
    <Reveal className="border border-line bg-night-900/70 p-7 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">Лунный калькулятор</p>
        <input
          type="date"
          value={value}
          onChange={(e) => e.target.value && setValue(e.target.value)}
          className="border border-line bg-night-950 px-4 py-2 font-mono text-xs text-star outline-none transition-colors focus:border-amberstar/60 [color-scheme:dark]"
          aria-label="Выберите дату"
        />
      </div>
      <div className="mt-7 grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="flex items-center gap-5">
          <MoonDisc phase={mp.phase} size={92} className="float-y shrink-0" />
          <div>
            <p className="font-display text-lg font-bold lg:text-xl">{mp.name}</p>
            <p className="mt-1 font-mono text-xs text-dim">{ruDate(date, { day: "numeric", month: "long", year: "numeric" })}</p>
            <p className="mt-1 font-mono text-xs text-faint">освещённость диска {(mp.illum * 100).toFixed(0)}%</p>
          </div>
        </div>
        <div className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] ${toneClass}`}>
              тёмное небо: {q.label}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {mp.illum < 0.35 ? "луна не помешает" : mp.illum < 0.65 ? "луна терпимая" : "луна яркая"}
            </span>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-dim">{q.note}.</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Совет: планируйте наблюдения в окно ±4 дня вокруг новолуния
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function CalendarPage() {
  usePageTitle("Календарь неба 2026 — Пульсар");
  const [type, setType] = useState<EventType | "all">("all");

  const filtered = SKY_EVENTS.filter((e) => type === "all" || e.type === type);
  const months = [...new Set(filtered.map((e) => e.monthIdx))].sort((a, b) => a - b);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
            <ScrambleText text="Календарь неба · 13 событий · все даты проверены" />
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <MaskLines lines={[<span key="1">2026: год, когда</span>, <span key="2">небо</span>, <span key="3" className="text-amberstar">расщедрилось</span>]} />
          </h1>
          <Reveal delay={300} className="mt-7 max-w-xl">
            <p className="text-sm leading-relaxed text-dim lg:text-base">
              Полное солнечное затмение, два лунных, противостояния Юпитера и Сатурна — и Персеиды ровно в новолуние.
              Под каждое событие из этого списка у нас есть заезд или свободная площадка.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <MoonLab />
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
            видимость указана для средней полосы России
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
                  .map((e, i) => {
                    const emp = moonPhase(new Date(e.iso));
                    return (
                      <Reveal key={e.id} delay={i * 70}>
                        <div className="group grid grid-cols-[64px_1fr] items-center gap-5 border-t border-line py-6 transition-all duration-300 last:border-b hover:bg-night-900/60 sm:grid-cols-[84px_56px_1fr_auto] sm:gap-7 lg:px-4">
                          <div>
                            <p className="font-display text-2xl font-bold text-star transition-colors duration-300 group-hover:text-amberstar">{e.dayNum}</p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">{MONTHS_SHORT[e.monthIdx]}</p>
                          </div>
                          <div className="hidden sm:block" title={`Луна: ${emp.name}`}>
                            <MoonDisc phase={emp.phase} size={36} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-display text-base font-semibold lg:text-lg">{e.title}</h3>
                              {e.meta && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-nebula">{e.meta}</span>}
                              <span className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] ${TYPE_CHIP[e.type]}`}>
                                {EVENT_TYPE_LABEL[e.type]}
                              </span>
                            </div>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-dim">{e.desc}</p>
                          </div>
                          <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end sm:justify-center">
                            <Visibility n={e.visibility} />
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">видимость</span>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-6 border border-line bg-night-900/60 p-8 md:grid-cols-3 lg:p-10">
          {[
            ["ZHR", "зенитное часовое число: сколько метеоров увидел бы наблюдатель при идеальных условиях"],
            ["ᵐ", "звёздная величина: чем меньше, тем ярче. Юпитер в противостоянии — −2.7, предел глаза — +6.5"],
            ["SQM", "яркость фона неба в звёздных величинах на квадратную секунду дуги. 21.9 — почти предел"],
          ].map(([term, def]) => (
            <div key={term} className="flex gap-4">
              <span className="font-display text-xl font-bold text-amberstar">{term}</span>
              <p className="text-sm leading-relaxed text-dim">{def}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
