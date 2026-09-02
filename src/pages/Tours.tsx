import { useState } from "react";
import { Link } from "react-router-dom";
import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { ArrowUpRight, IconCheck, IconPin } from "../components/Icons";
import { TOURS, type Tour, type TourFormat } from "../lib/data";
import { fmtPrice } from "../lib/astro";
import { OBSERVER_IMG } from "../lib/images";

const FILTERS: Array<TourFormat | "Все"> = ["Все", "Наблюдения", "Фототур", "Треккинг"];

const ACCENT_BAR: Record<Tour["accent"], string> = {
  amberstar: "bg-amberstar",
  nebula: "bg-nebula",
  skyc: "bg-skyc",
};

const ACCENT_TEXT: Record<Tour["accent"], string> = {
  amberstar: "text-amberstar",
  nebula: "text-nebula",
  skyc: "text-skyc",
};

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  const label = level === 1 ? "легко" : level === 2 ? "средне" : "сложно";
  return (
    <span className="flex items-center gap-1.5" title={`Сложность: ${label}`}>
      {[1, 2, 3].map((i) => (
        <span key={i} className={`vd ${i <= level ? "bg-amberstar" : "bg-line"}`} />
      ))}
      <span className="ml-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{label}</span>
    </span>
  );
}

function TourCard({ tour, delay, wide }: { tour: Tour; delay: number; wide?: boolean }) {
  const filling = tour.spotsTotal - tour.spotsLeft;
  const scarce = tour.spotsLeft <= 4;
  return (
    <Reveal delay={delay} className={wide ? "lg:col-span-2" : ""}>
      <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-night-900/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-amberstar/40 hover:bg-night-850 hover:shadow-[0_24px_60px_-30px_rgba(6,10,23,0.9)]">
        <span className={`absolute inset-y-0 left-0 w-[3px] ${ACCENT_BAR[tour.accent]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`} />

        <div className={`grid gap-8 p-7 lg:p-9 ${wide ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-4xl font-bold leading-none text-star transition-colors duration-300 group-hover:text-amberstar">
                  {tour.dayNum}
                  <span className="ml-2 align-middle font-mono text-[11px] uppercase tracking-[0.26em] text-faint">{tour.monthShort} 2026</span>
                </p>
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  <IconPin className="h-3.5 w-3.5 text-nebula" />
                  {tour.location}
                </p>
              </div>
              {tour.featured && (
                <span className="shrink-0 border border-amberstar/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amberstar">
                  ★ хит сезона
                </span>
              )}
            </div>

            <h3 className="mt-5 font-display text-xl font-bold leading-snug lg:text-2xl">{tour.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-dim">{tour.blurb}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{tour.format}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{tour.days} дня/ночей</span>
              <DifficultyDots level={tour.difficulty} />
            </div>

            <ul className="mt-5 grid gap-2 text-sm text-dim sm:grid-cols-1">
              {tour.includes.map((inc) => (
                <li key={inc} className="flex items-center gap-2.5">
                  <IconCheck className={`h-3.5 w-3.5 shrink-0 ${ACCENT_TEXT[tour.accent]}`} />
                  {inc}
                </li>
              ))}
            </ul>
          </div>

          <div className={`flex flex-col justify-between gap-6 ${wide ? "border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" : "mt-auto border-t border-line pt-6"}`}>
            {wide && (
              <div className="hidden lg:block">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Почему разбирают</p>
                <p className="mt-3 text-sm leading-relaxed text-dim">
                  Максимум Персеид 2026 совпадает с новолунием — небо будет абсолютно тёмным. Такое сочетание
                  случается раз в несколько лет: в прошлый раз в 2021-м места закончились за три недели.
                </p>
              </div>
            )}
            <div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">за место</p>
                  <p className="font-display text-2xl font-bold lg:text-3xl">{fmtPrice(tour.price)}</p>
                </div>
                <Link
                  to={`/booking?tour=${tour.id}`}
                  className="group/btn flex items-center gap-2 border border-line px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-star transition-all duration-300 hover:border-amberstar hover:bg-amberstar hover:text-night-950"
                >
                  Забронировать
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </Link>
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className={scarce ? "text-ember" : "text-faint"}>
                    {scarce ? (
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="pulse-ring absolute h-1.5 w-1.5 rounded-full bg-ember" />
                          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                        </span>
                        осталось {tour.spotsLeft} мест
                      </span>
                    ) : (
                      `свободно ${tour.spotsLeft} из ${tour.spotsTotal}`
                    )}
                  </span>
                  <span className="text-faint">{Math.round((filling / tour.spotsTotal) * 100)}% набрано</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden bg-night-800">
                  <div className={`h-full transition-all duration-700 ${scarce ? "bg-ember" : ACCENT_BAR[tour.accent]}`} style={{ width: `${(filling / tour.spotsTotal) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Tours() {
  usePageTitle("Экспедиции 2026 — Пульсар");
  const [filter, setFilter] = useState<TourFormat | "Все">("Все");
  const sorted = [...TOURS].sort((a, b) => a.startISO.localeCompare(b.startISO));
  const visible = filter === "Все" ? sorted : sorted.filter((t) => t.format === filter);

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
            <ScrambleText text="Сезон 2026 · 7 экспедиций · 14 инструментов" />
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <MaskLines lines={[<span key="1">Семь способов</span>, <span key="2">встретить</span>, <span key="3" className="text-amberstar">настоящую темноту</span>]} />
          </h1>
          <Reveal delay={300} className="mt-7 max-w-xl">
            <p className="text-sm leading-relaxed text-dim lg:text-base">
              От семейных выходных до зимних экспедиций на Байкал. В каждом заезде — телескопы, лектор и горячий чай
              в неограниченном количестве. Небо гарантировать не можем, но возвращаем деньги, если оно закрыто все ночи.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="kenburns relative mt-14 h-[34vh] overflow-hidden border border-line lg:h-[44vh]">
          <img src={OBSERVER_IMG} alt="Наблюдения у телескопа на площадке базы" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-transparent to-night-950/30" />
          <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim lg:left-8">
            Ночь Персеид · площадка базы · август 2025
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {FILTERS.map((f) => {
            const count = f === "Все" ? sorted.length : sorted.filter((t) => t.format === f).length;
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  active
                    ? "border-amberstar bg-amberstar font-semibold text-night-950"
                    : "border-line text-dim hover:border-amberstar/50 hover:text-star"
                }`}
              >
                {f} <span className={active ? "opacity-70" : "text-faint"}>· {count}</span>
              </button>
            );
          })}
          <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.16em] text-faint md:block">
            показано: {visible.length}
          </span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {visible.map((t, i) => (
            <TourCard key={t.id} tour={t} delay={(i % 2) * 90} wide={t.featured && filter === "Все"} />
          ))}
        </div>

        <Reveal className="mt-16 border border-line bg-night-900/60 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="font-display text-xl font-bold lg:text-2xl">Не нашли свои даты?</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
                Собираем индивидуальные заезды для компаний от 6 человек: клубы, школы, съёмочные группы.
                Выбираем окно новолуния под вас и открываем базу целиком.
              </p>
            </div>
            <Link
              to="/booking"
              className="group flex w-fit items-center gap-3 border border-amberstar/60 px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-amberstar transition-all duration-300 hover:bg-amberstar hover:text-night-950"
            >
              Обсудить свой заезд
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
