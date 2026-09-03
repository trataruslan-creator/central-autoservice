import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Ticker from "../components/Ticker";
import { Reveal, MaskLines, ScrambleText, useCountUp, usePageTitle } from "../components/Reveal";
import { ArrowUpRight, ObjectIcon, IconPin, IconSteering, IconUsers } from "../components/Icons";
import { EVENTS, HIGHLIGHTS, STATS, TOURS, type Highlight } from "../lib/data";
import { fmtPrice, pad, seasonInfo } from "../lib/drive";
import { SERPENTINE_IMG } from "../lib/images";

const TICKER = [
  "Moscow Raceway: сухо · асфальт +18°C",
  "Ближайший заезд — 14 августа, Архыз",
  "Baikal Ice Cup: открыта регистрация",
  "Флот на ходу: 18 из 18 машин",
  "Новичкам — контраварийный курс в подарок",
  "4 июля едем смотреть «Шёлковый путь»",
  "Сентябрь: золотые серпантины Кавказа",
];

function Stat({ value, suffix, label, note, delay }: { value: number; suffix: string; label: string; note: string; delay: number }) {
  const { ref, val } = useCountUp(value, 1600);
  return (
    <Reveal delay={delay} className="group border-l-2 border-line pl-6 transition-colors duration-500 hover:border-amberstar">
      <p className="font-display text-4xl font-bold text-star lg:text-5xl">
        <span ref={ref}>{new Intl.NumberFormat("ru-RU").format(val)}</span>
        {suffix && <span className="text-amberstar">{suffix}</span>}
      </p>
      <p className="mt-3 text-sm font-semibold text-star">{label}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">{note}</p>
    </Reveal>
  );
}

function LivePanel() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const next = useMemo(() => {
    const sorted = [...TOURS].sort((a, b) => a.startISO.localeCompare(b.startISO));
    return sorted.find((t) => new Date(t.startISO).getTime() > now.getTime());
  }, [now]);

  const season = seasonInfo(now);
  let diff = next ? Math.max(0, new Date(next.startISO).getTime() - now.getTime()) : 0;
  const d = Math.floor(diff / 86_400_000);
  diff -= d * 86_400_000;
  const h = Math.floor(diff / 3_600_000);
  diff -= h * 3_600_000;
  const m = Math.floor(diff / 60_000);
  const s = Math.floor((diff - m * 60_000) / 1000);

  return (
    <div className="anim-fadeup relative border border-line bg-night-900/70 backdrop-blur-sm" style={{ animationDelay: "350ms" }}>
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-dim">
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-nebula" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-nebula" />
          </span>
          Сейчас в клубе
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          {season.name} · {season.label}
        </span>
      </div>

      <div className="grid gap-6 p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Местное время базы</p>
            <p className="mt-1 font-display text-3xl tabular-nums text-star lg:text-4xl">
              {pad(now.getHours())}:{pad(now.getMinutes())}
              <span className="text-amberstar">:{pad(now.getSeconds())}</span>
            </p>
          </div>
          <IconSteering className="spin-slow h-10 w-10 text-line" />
        </div>

        <div className="border-t border-line pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">До ближайшего заезда</p>
          {next ? (
            <>
              <p className="mt-2 font-display text-2xl tabular-nums text-amberstar lg:text-3xl">
                {d} дн {pad(h)}:{pad(m)}:{pad(s)}
              </p>
              <p className="mt-2 text-sm text-dim">
                {next.title} · {next.location}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-dim">Заезды сезона-2026 стартовали — смотрите календарь</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-line pt-5">
          <div>
            <p className="font-display text-2xl text-star">{TOURS.length}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">заездов в сезоне</p>
          </div>
          <div>
            <p className="font-display text-2xl text-star">{EVENTS.length}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">событий в календаре</p>
          </div>
        </div>

        <Link
          to="/booking"
          className="group flex items-center justify-between border border-line bg-night-950/60 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-star transition-all duration-300 hover:border-amberstar/60 hover:text-amberstar"
        >
          Занять место в колонне
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </div>
  );
}

function HighlightObject({ o }: { o: Highlight }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="min-h-[280px]">
        <ObjectIcon kind={o.icon} className="h-16 w-16 text-amberstar" />
        <h3 className="mt-6 font-display text-2xl font-bold text-star lg:text-4xl">{o.name}</h3>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <span className="border border-nebula/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-nebula">нужно: {o.need}</span>
          <span className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{o.best}</span>
        </div>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-dim lg:text-base">{o.desc}</p>
      </div>
      <div className="relative overflow-hidden border border-line bg-night-900/50">
        <svg viewBox="0 0 400 280" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="roadg" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#f2a33c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e2593f" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path d="M-10 250 C 80 240, 90 190, 150 170 S 260 150, 290 110 S 330 40, 410 20" fill="none" stroke="#2b2e39" strokeWidth="26" strokeLinecap="round" />
          <path d="M-10 250 C 80 240, 90 190, 150 170 S 260 150, 290 110 S 330 40, 410 20" fill="none" stroke="url(#roadg)" strokeWidth="2.4" className="dashline" />
          <circle cx="150" cy="170" r="4" fill="#f2a33c" />
          <circle cx="290" cy="110" r="4" fill="#e2593f" />
          <text x="150" y="196" textAnchor="middle" fill="#666d7d" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2">ЧЕКПОИНТ 1</text>
          <text x="290" y="90" textAnchor="middle" fill="#666d7d" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2">ЧЕКПОИНТ 2</text>
        </svg>
        <div className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          0{HIGHLIGHTS.findIndex((x) => x.id === o.id) + 1} / 0{HIGHLIGHTS.length}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  usePageTitle("Апекс — клуб автомобильных экспедиций");
  const [active, setActive] = useState(HIGHLIGHTS[0].id);
  const current = HIGHLIGHTS.find((o) => o.id === active) ?? HIGHLIGHTS[0];

  const upcoming = useMemo(() => [...TOURS].sort((a, b) => a.startISO.localeCompare(b.startISO)).slice(0, 3), []);

  return (
    <>
      {/* ---------- открытие: дорога ---------- */}
      <section className="relative mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Клуб автомобильных экспедиций · с 2016 года" />
            </p>
            <h1 className="mt-7 font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[1.04] tracking-tight">
              <MaskLines
                lines={[
                  <span key="1">Дорога —</span>,
                  <span key="2">это не путь,</span>,
                  <span key="3" className="text-amberstar">это событие</span>,
                ]}
              />
            </h1>
            <Reveal delay={420} className="mt-8 max-w-xl">
              <p className="text-sm leading-relaxed text-dim lg:text-base">
                Серпантины Кавказа, лёд Байкала и большие кольца страны. Флот из 18 машин, гиды-штурманы по рации
                и техничка, которая ещё ни разу не понадобилась — но всегда едет с нами.
              </p>
            </Reveal>
            <Reveal delay={540} className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/tours"
                className="group flex items-center gap-3 bg-amberstar px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] font-semibold text-night-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_rgba(242,163,60,0.55)]"
              >
                Выбрать экспедицию
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/calendar"
                className="border border-line px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-dim transition-all duration-300 hover:border-amberstar/60 hover:text-star"
              >
                Календарь сезона
              </Link>
            </Reveal>
          </div>
          <LivePanel />
        </div>

        <div className="mt-16 flex items-center gap-4 lg:mt-20">
          <span className="h-14 w-px overflow-hidden bg-line">
            <span className="scroll-cue block h-full w-px bg-amberstar" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">листайте — дальше маршрут</span>
        </div>
      </section>

      {/* ---------- тикер ---------- */}
      <div className="mt-14">
        <Ticker items={TICKER} />
      </div>

      {/* ---------- счётчики ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Stat key={s.label} value={s.value} suffix={"suffix" in s ? s.suffix : ""} label={s.label} note={s.note} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* ---------- ближайшие заезды ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Ближайшие заезды" />
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Куда едем</span>, <span key="2" className="text-amberstar">в этот раз</span>]} />
            </h2>
          </div>
          <Link to="/tours" className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-amberstar">
            Все экспедиции
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {upcoming.map((t, i) => {
            const soldPct = Math.round(((t.spotsTotal - t.spotsLeft) / t.spotsTotal) * 100);
            return (
              <Reveal key={t.id} delay={i * 110}>
                <Link
                  to={`/booking?tour=${t.id}`}
                  className="group flex h-full flex-col border border-line bg-night-900/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-amberstar/50 hover:bg-night-850"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-display text-3xl font-bold text-amberstar">{t.dayNum}</p>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.24em] text-faint">{t.monthShort} 2026</p>
                    </div>
                    <span className="border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                      {t.format}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-amberstar">
                    {t.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-dim">
                    <IconPin className="h-3.5 w-3.5 shrink-0 text-nebula" />
                    {t.location}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-5">
                    <span className="font-display text-lg text-star">{fmtPrice(t.price)}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">осталось {t.spotsLeft} мест</span>
                  </div>
                  <div className="mt-3 h-1 w-full bg-line">
                    <div
                      className={`h-full transition-all duration-700 ${t.spotsLeft <= 4 ? "bg-ember" : "bg-amberstar"}`}
                      style={{ width: `${soldPct}%` }}
                    />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- что ждёт на маршруте ---------- */}
      <section className="mt-24 border-y border-line bg-night-900/40">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Шесть причин завести мотор" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Что вас ждёт</span>, <span key="2">на маршруте</span>]} />
            </h2>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {HIGHLIGHTS.map((o) => (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                className={`border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                  active === o.id
                    ? "border-amberstar bg-amberstar font-semibold text-night-950"
                    : "border-line text-dim hover:border-amberstar/50 hover:text-star"
                }`}
              >
                {o.name.split(",")[0]}
              </button>
            ))}
          </div>

          <div key={current.id} className="anim-fadeup mt-10">
            <HighlightObject o={current} />
          </div>
        </div>
      </section>

      {/* ---------- панорама ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="kenburns relative h-[46vh] overflow-hidden border border-line lg:h-[60vh]">
            <img src={SERPENTINE_IMG} alt="Серпантин на перевал Пхия в золотой час" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Перевал Пхия · 2100 м · золотой час
            </p>
          </Reveal>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Философия клуба" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Можно доехать.</span>, <span key="2">А можно —</span>, <span key="3" className="text-amberstar">приехать</span>]} />
            </h2>
            <Reveal delay={200} className="mt-7 space-y-4 text-sm leading-relaxed text-dim lg:text-base">
              <p>
                Навигатор проложит маршрут быстрее. Мы проложим — красивее: через перевал, где ловится радио
                только на серпантине, через паром, который ходит дважды в день, через двор, где пахнет шашлыком.
              </p>
              <p>
                Каждая экспедиция «Апекса» собирается как маршрут ралли: чекпоинты, легенда, резерв по топливу
                и обязательная точка, где все выйдут из машин молча.
              </p>
            </Reveal>
            <Reveal delay={320} className="mt-8 flex items-center gap-5">
              <IconUsers className="h-8 w-8 text-amberstar" />
              <p className="max-w-sm text-sm text-dim">
                Колонна до шести машин, рация в каждой, штурман на головной. Свой автомобиль — тоже в строю.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- призыв ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-4 lg:px-8">
        <Reveal className="relative overflow-hidden border border-amberstar/40 bg-night-900/70 px-8 py-14 lg:px-14">
          <svg viewBox="0 0 600 120" className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full opacity-20" aria-hidden="true">
            <path d="M-10 110 C 120 100, 160 60, 260 55 S 460 60, 610 10" fill="none" stroke="#f2a33c" strokeWidth="2" className="dashline" />
          </svg>
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amberstar">
                <ScrambleText text="Клуб открыт для новых экипажей" />
              </p>
              <h2 className="mt-5 font-display text-2xl font-bold uppercase leading-tight lg:text-4xl">
                Свободные места тают быстрее,
                <br />
                чем резина на треке
              </h2>
            </div>
            <Link
              to="/booking"
              className="group flex items-center gap-3 bg-amberstar px-8 py-5 font-mono text-[12px] uppercase tracking-[0.18em] font-semibold text-night-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_rgba(242,163,60,0.55)]"
            >
              Забронировать место
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
