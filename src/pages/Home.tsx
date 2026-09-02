import { useState } from "react";
import { Link } from "react-router-dom";
import { MaskLines, Reveal, ScrambleText, useCountUp, usePageTitle } from "../components/Reveal";
import { MoonDisc, ArrowUpRight, GlyphBand, GlyphSpiral, GlyphRings, GlyphNebula, GlyphGlow, GlyphMeteor } from "../components/Icons";
import Ticker from "../components/Ticker";
import { darkQuality, moonPhase, nextNewMoon, ruDate, fmtPrice } from "../lib/astro";
import { SKY_EVENTS, SKY_OBJECTS, STATS, TOURS, type SkyObject } from "../lib/data";
import { MILKYWAY_IMG } from "../lib/images";

const OBJECT_ICONS: Record<SkyObject["icon"], typeof GlyphBand> = {
  band: GlyphBand,
  spiral: GlyphSpiral,
  rings: GlyphRings,
  nebula: GlyphNebula,
  glow: GlyphGlow,
  meteor: GlyphMeteor,
};

const TONE_TEXT: Record<string, string> = {
  nebula: "text-nebula",
  amberstar: "text-amberstar",
  flare: "text-flare",
};

function StatBlock({ value, suffix, label, note, decimals = 0, delay }: { value: number; suffix: string; label: string; note: string; decimals?: number; delay: number }) {
  const { ref, val } = useCountUp(value, 1600, decimals);
  const shown = decimals > 0 ? val.toFixed(decimals).replace(".", ",") : new Intl.NumberFormat("ru-RU").format(val);
  return (
    <Reveal delay={delay} className="group border border-line bg-night-900/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-amberstar/50 hover:bg-night-850">
      <p className="font-display text-4xl font-bold text-star transition-colors duration-500 group-hover:text-amberstar lg:text-5xl">
        <span ref={ref}>{shown}</span>
        <span className="text-2xl text-amberstar">{suffix}</span>
      </p>
      <p className="mt-4 text-sm font-semibold text-star">{label}</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{note}</p>
    </Reveal>
  );
}

export default function Home() {
  usePageTitle("Пульсар — астроэкспедиции и звёздное небо");
  const today = new Date();
  const mp = moonPhase(today);
  const quality = darkQuality(mp.illum);
  const newMoon = nextNewMoon(today);
  const [activeObj, setActiveObj] = useState<SkyObject>(SKY_OBJECTS[0]);
  const ActiveIcon = OBJECT_ICONS[activeObj.icon];

  const upcoming = [...TOURS].sort((a, b) => a.startISO.localeCompare(b.startISO)).slice(0, 4);
  const tickerItems = SKY_EVENTS.filter((e) => e.visibility >= 4).map((e) => `${e.dateLabel} — ${e.title}`);

  return (
    <>
      {/* ---------- opening ---------- */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-36 lg:px-8">
          <div className="grid items-end gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute h-2 w-2 rounded-full bg-nebula" />
                  <span className="h-2 w-2 rounded-full bg-nebula" />
                </span>
                <ScrambleText text="Обсерватория «Пульсар» · Архыз · Бортль 2" delay={200} />
              </p>

              <h1 className="mt-8 font-display text-[clamp(2.3rem,6.2vw,5.2rem)] font-bold uppercase leading-[1.05] tracking-tight">
                <MaskLines
                  delay={300}
                  lines={[
                    <span key="1">Там, где гаснет</span>,
                    <span key="2">город, —</span>,
                    <span key="3" className="text-amberstar">начинается небо</span>,
                  ]}
                />
              </h1>

              <Reveal delay={750} className="mt-8 max-w-xl">
                <p className="text-base leading-relaxed text-dim lg:text-lg">
                  Экспедиции на плато Шон-Хорук, где SQM&nbsp;21.9 и 214 ясных ночей в году. Телескопы, лекции у костра
                  и Млечный Путь, который видно невооружённым глазом — от новичка до астрофотографа.
                </p>
              </Reveal>

              <Reveal delay={900} className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/tours"
                  className="group flex items-center gap-3 bg-amberstar px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] font-semibold text-night-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(244,198,109,0.55)]"
                >
                  Выбрать экспедицию
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to="/calendar"
                  className="border border-line px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-dim transition-all duration-300 hover:border-nebula/60 hover:text-nebula"
                >
                  Календарь неба 2026
                </Link>
              </Reveal>

              <Reveal delay={1050} className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                <span>Ближайшее новолуние — <span className="text-star">{ruDate(newMoon)}</span></span>
                <span>Персеиды + новолуние — <span className="text-amberstar">12–13 августа</span></span>
              </Reveal>
            </div>

            {/* live sky panel */}
            <Reveal delay={600}>
              <div className="relative border border-line bg-night-900/70 p-7 backdrop-blur-sm">
                <span className="absolute -top-px left-8 h-px w-16 bg-amberstar" />
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-faint">Сейчас над хребтом</p>
                <div className="mt-6 flex items-center gap-5">
                  <MoonDisc phase={mp.phase} size={84} className="float-y shrink-0" />
                  <div>
                    <p className="font-display text-xl font-bold">{mp.name}</p>
                    <p className="mt-1 font-mono text-xs text-dim">освещённость {(mp.illum * 100).toFixed(0)}%</p>
                  </div>
                </div>
                <div className="mt-6 h-1.5 w-full overflow-hidden bg-night-800">
                  <div className="h-full bg-gradient-to-r from-amberstar/70 to-amberstar transition-all duration-1000" style={{ width: `${Math.max(3, mp.illum * 100)}%` }} />
                </div>
                <div className="mt-6 space-y-4 border-t border-line pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm text-dim">Видимость глубокого неба</span>
                    <span className={`font-mono text-xs uppercase tracking-[0.14em] ${TONE_TEXT[quality.tone]}`}>{quality.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-faint">{quality.note}</p>
                  <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                    {[
                      ["SQM", "21.9"],
                      ["Бортль", "2"],
                      ["Высота", "2100 м"],
                    ].map(([k, v]) => (
                      <div key={k} className="border border-line bg-night-950/60 py-3">
                        <p className="font-display text-base font-bold text-star">{v}</p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{k}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">листайте</span>
          <div className="h-12 w-px overflow-hidden bg-line">
            <div className="scroll-cue h-full w-full bg-amberstar" />
          </div>
        </div>
      </section>

      <Ticker items={tickerItems} />

      {/* ---------- dark stats ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="01 · Почему темнота — ресурс" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Тьма —</span>, <span key="2">самый дефицитный</span>, <span key="3">ресурс планеты</span>]} />
            </h2>
            <Reveal delay={200} className="mt-7 max-w-md space-y-4 text-sm leading-relaxed text-dim">
              <p>
                Треть человечества не видела Млечный Путь ни разу. В России зон уровня Бортль 2 — меньше десятка,
                и наша площадка на Шон-Хоруке — одна из них.
              </p>
              <p>
                Мы держим её тёмной: ни одного фонаря без красного фильтра, генераторы за гребнем,
                а до ближайшего города — 90 минут серпантина.
              </p>
            </Reveal>
            <Reveal delay={300} className="mt-8">
              <Link to="/about" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-amberstar">
                Как мы нашли это небо
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {STATS.map((s, i) => (
              <StatBlock key={s.label} {...s} delay={i * 90} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- nearest expeditions ---------- */}
      <section className="border-y border-line bg-night-900/40">
        <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
                <ScrambleText text="02 · Ближайшие экспедиции" />
              </p>
              <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
                <MaskLines lines={[<span key="1">Небо уже</span>, <span key="2" className="text-amberstar">расписано</span>]} />
              </h2>
            </div>
            <Link to="/tours" className="group mb-1 inline-flex items-center gap-2 border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim transition-all duration-300 hover:border-amberstar/60 hover:text-amberstar">
              Все 7 экспедиций
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-14">
            {upcoming.map((t, i) => (
              <Reveal key={t.id} delay={i * 80}>
                <Link
                  to="/tours"
                  className="group grid grid-cols-[72px_1fr] items-center gap-5 border-t border-line py-7 transition-colors duration-300 last:border-b hover:bg-night-850/70 sm:grid-cols-[90px_1fr_auto] sm:gap-8 lg:px-4"
                >
                  <div className="text-center">
                    <p className="font-display text-3xl font-bold text-star transition-colors duration-300 group-hover:text-amberstar">{t.dayNum}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-faint">{t.monthShort}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold leading-snug lg:text-lg">{t.title}</p>
                    <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                      {t.location} · {t.days} дн · {t.format}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-end">
                    <p className="font-display text-lg font-bold text-star">{fmtPrice(t.price)}</p>
                    <span className={`flex h-10 w-10 items-center justify-center border border-line transition-all duration-300 group-hover:border-amberstar group-hover:bg-amberstar group-hover:text-night-950 ${""}`}>
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sky objects ---------- */}
      <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
          <ScrambleText text="03 · Каталог ночи" />
        </p>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
          <MaskLines lines={[<span key="1">Что вы увидите</span>, <span key="2">в первый же вечер</span>]} />
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            {SKY_OBJECTS.map((o) => (
              <button
                key={o.id}
                onMouseEnter={() => setActiveObj(o)}
                onFocus={() => setActiveObj(o)}
                onClick={() => setActiveObj(o)}
                className={`group flex w-full items-center justify-between gap-4 border-t border-line px-2 py-5 text-left transition-all duration-300 last:border-b ${
                  activeObj.id === o.id ? "bg-night-850/80" : "hover:bg-night-900/60"
                }`}
              >
                <span className="flex items-center gap-4">
                  <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeObj.id === o.id ? "bg-amberstar" : "bg-line"}`} />
                  <span className={`font-display text-sm font-semibold transition-colors duration-300 lg:text-base ${activeObj.id === o.id ? "text-amberstar" : "text-star"}`}>
                    {o.name}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{o.magnitude}</span>
              </button>
            ))}
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              * список меняется от сезона — в январе вместо Ориона царствует Юпитер
            </p>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <div key={activeObj.id} className="anim-fadeup border border-line bg-night-900/70 p-8 lg:p-10">
              <div className="flex items-start justify-between gap-6">
                <ActiveIcon className="h-16 w-16 text-amberstar lg:h-20 lg:w-20" />
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">сейчас: {activeObj.best}</p>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold lg:text-2xl">{activeObj.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-nebula">{activeObj.magnitude}</p>
              <p className="mt-5 text-sm leading-relaxed text-dim lg:text-base">{activeObj.desc}</p>
              <div className="mt-8 flex gap-2">
                {SKY_OBJECTS.map((o) => (
                  <button
                    key={o.id}
                    aria-label={o.name}
                    onClick={() => setActiveObj(o)}
                    className={`h-1 flex-1 transition-all duration-300 ${activeObj.id === o.id ? "bg-amberstar" : "bg-line hover:bg-faint"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- panorama ---------- */}
      <section className="relative">
        <Reveal className="kenburns relative h-[64vh] overflow-hidden lg:h-[76vh]">
          <img src={MILKYWAY_IMG} alt="Ядро Млечного Пути над хребтами Архыза" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-night-950/40" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-7xl px-5 pb-14 lg:px-8">
              <blockquote className="max-w-2xl">
                <p className="font-display text-xl font-semibold leading-snug lg:text-3xl">
                  «Выключите фонарик. Дайте глазам десять минут — и небо станет трёхмерным. Так работает тьма.»
                </p>
                <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-dim">
                  — Анна Ветрова, астроном «Пульсара»
                </footer>
              </blockquote>
            </div>
          </div>
        </Reveal>
        <p className="border-b border-line py-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          Панорама 240° · снято с площадки базы · июль 2025 · выдержка 20 с · f/1.8 · ISO 3200
        </p>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-28 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-bold uppercase leading-[1.05]">
            <MaskLines lines={[<span key="1">Поехали смотреть</span>, <span key="2" className="text-nebula">вверх?</span>]} />
          </h2>
          <div className="flex flex-col gap-4">
            <p className="max-w-sm text-sm leading-relaxed text-dim">
              Места на август разбирают к маю, на Геминиды — к сентябрю. Бронь занимает две минуты, предоплата — только за месяц до заезда.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="group flex items-center gap-3 bg-amberstar px-7 py-4 font-mono text-[12px] uppercase tracking-[0.18em] font-semibold text-night-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(244,198,109,0.55)]"
              >
                Забронировать место
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/tours"
                className="border border-line px-7 py-4 text-center font-mono text-[12px] uppercase tracking-[0.18em] text-dim transition-all duration-300 hover:border-nebula/60 hover:text-nebula"
              >
                Смотреть маршруты
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
