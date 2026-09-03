import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { ArrowUpRight, IconPin, IconSteering, IconUsers } from "../components/Icons";
import { TOURS, type Tour, type TourFormat } from "../lib/data";
import { fmtPrice } from "../lib/drive";
import { ICE_IMG } from "../lib/images";

const FORMATS: Array<TourFormat | "Все"> = ["Все", "Экспедиция", "Трек-день", "Зимний драйв"];

const DIFF_LABEL: Record<1 | 2 | 3, string> = {
  1: "асфальт",
  2: "микст",
  3: "хард",
};

function TourCard({ t, delay }: { t: Tour; delay: number }) {
  const soldPct = Math.round(((t.spotsTotal - t.spotsLeft) / t.spotsTotal) * 100);
  const hot = t.spotsLeft <= 4;
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`group flex h-full flex-col border bg-night-900/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-night-850 lg:p-8 ${
          hot ? "border-ember/40 hover:border-ember/70" : "border-line hover:border-amberstar/50"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`border px-3 py-2 text-center ${t.accent === "nebula" ? "border-nebula/40" : t.accent === "skyc" ? "border-skyc/40" : "border-amberstar/40"}`}>
              <p className={`font-display text-xl leading-none ${t.accent === "nebula" ? "text-nebula" : t.accent === "skyc" ? "text-skyc" : "text-amberstar"}`}>
                {t.dayNum}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">{t.monthShort}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{t.dateLabel}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-nebula">{t.days} {t.days === 1 ? "день" : "дн"} · {t.format}</p>
            </div>
          </div>
          {hot && (
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
            </span>
          )}
        </div>

        <h3 className="mt-6 font-display text-lg font-semibold leading-snug lg:text-xl">{t.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-dim">
          <IconPin className="h-3.5 w-3.5 shrink-0 text-nebula" />
          {t.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-dim">{t.blurb}</p>

        <ul className="mt-5 space-y-1.5">
          {t.includes.map((inc) => (
            <li key={inc} className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
              <span className="h-px w-3 bg-amberstar" />
              {inc}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="font-display text-2xl text-star">{fmtPrice(t.price)}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">с человека</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5">
                {[1, 2, 3].map((d) => (
                  <span key={d} className={`vd ${d <= t.difficulty ? "bg-amberstar" : "bg-line"}`} />
                ))}
              </div>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">{DIFF_LABEL[t.difficulty]}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-1 flex-1 bg-line">
              <div className={`h-full transition-all duration-700 ${hot ? "bg-ember" : "bg-amberstar"}`} style={{ width: `${soldPct}%` }} />
            </div>
            <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${hot ? "text-ember" : "text-faint"}`}>
              {hot ? `осталось ${t.spotsLeft}!` : `${t.spotsLeft} из ${t.spotsTotal} мест`}
            </span>
          </div>

          <Link
            to={`/booking?tour=${t.id}`}
            className={`mt-6 flex items-center justify-center gap-3 border py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
              hot
                ? "border-ember/60 text-ember hover:bg-ember hover:text-night-950"
                : "border-amberstar/60 text-amberstar hover:bg-amberstar hover:text-night-950"
            }`}
          >
            <IconSteering className="h-4 w-4" />
            Забронировать место
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export default function Tours() {
  usePageTitle("Экспедиции — Апекс");
  const [format, setFormat] = useState<TourFormat | "Все">("Все");

  const filtered = useMemo(
    () => [...TOURS].sort((a, b) => a.startISO.localeCompare(b.startISO)).filter((t) => format === "Все" || t.format === format),
    [format]
  );

  const minPrice = Math.min(...TOURS.map((t) => t.price));

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Семь маршрутов · сезон 2026 · от «Нивы» до Cayman" />
            </p>
            <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
              <MaskLines lines={[<span key="1">Семь дорог,</span>, <span key="2">которые</span>, <span key="3" className="text-amberstar">меняют водителя</span>]} />
            </h1>
            <Reveal delay={300} className="mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-dim lg:text-base">
              <p>
                Каждый маршрут проверен колёсами флота: мы знаем, где на серпантине падает солнце,
                где лёд прозрачнее, а где после дождя лучше объехать по старой дороге.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                Свой автомобиль — можно · топливо и ночёвки — в цене · от {fmtPrice(minPrice)}
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="kenburns relative h-[38vh] overflow-hidden border border-line lg:h-[52vh]">
            <img src={ICE_IMG} alt="Внедорожники клуба на льду Байкала" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Малое море · лёд 1.2 м · февраль
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {FORMATS.map((f) => {
            const count = f === "Все" ? TOURS.length : TOURS.filter((t) => t.format === f).length;
            const active = format === f;
            return (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  active ? "border-amberstar bg-amberstar font-semibold text-night-950" : "border-line text-dim hover:border-amberstar/50 hover:text-star"
                }`}
              >
                {f} <span className={active ? "opacity-60" : "text-faint"}>· {count}</span>
              </button>
            );
          })}
          <span className="ml-auto hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint md:flex">
            <IconUsers className="h-4 w-4" />
            колонны до 6 машин
          </span>
        </div>

        <div key={format} className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t, i) => (
            <TourCard key={t.id} t={t} delay={(i % 3) * 90} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">
        <Reveal className="grid gap-8 border border-line bg-night-900/60 p-8 md:grid-cols-3 lg:p-10">
          {[
            ["Как устроена колонна", "Головная машина со штурманом задаёт темп, замыкающая — следит, чтобы никто не отстал. Рация в каждом экипаже, перекличка каждые 20 минут."],
            ["Что если не моя машина?", "Флот из 18 машин клуба: от «Нивы» для бездорожья до Cayman S для трека. Бронь машины включена в цену экспедиции."],
            ["А если погода подведёт?", "У каждого заезда есть резервные сутки. Если маршрут закрыт полностью — перенос на любые даты или возврат 100%."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="font-display text-base font-bold lg:text-lg">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{d}</p>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
