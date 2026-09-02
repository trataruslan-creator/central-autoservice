import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { GUIDES, GEAR, MILESTONES, type Guide } from "../lib/data";
import { ORION_IMG } from "../lib/images";

function Constellation({ guide }: { guide: Guide }) {
  const d = guide.lines
    .map(([a, b]) => `M ${guide.points[a][0]} ${guide.points[a][1]} L ${guide.points[b][0]} ${guide.points[b][1]}`)
    .join(" ");
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
      <path d={d} fill="none" stroke={guide.hue} strokeWidth="1.2" opacity="0.55" className="constellation-path" style={{ strokeDasharray: 600 }} />
      {guide.points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={guide.hue} opacity="0.1" />
          <circle cx={x} cy={y} r="2.1" fill={guide.hue} />
        </g>
      ))}
    </svg>
  );
}

export default function About() {
  usePageTitle("Обсерватория — Пульсар");

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
            <ScrambleText text="Обсерватория «Пульсар» · основана в 2019" />
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <MaskLines lines={[<span key="1">Мы построили дом</span>, <span key="2">в самом тёмном месте,</span>, <span key="3" className="text-amberstar">какое нашли</span>]} />
          </h1>
          <Reveal delay={300} className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-dim lg:text-base">
            <p>
              Всё началось с багажника: два телескопа, шесть друзей и первое в жизни ядро Галактики над Архызом.
              Утром половина не хотела уезжать. Через два года мы арендовали плато, поставили купол и решили,
              что тьма — это не отсутствие света, а присутствие неба.
            </p>
            <p>
              Сегодня «Пульсар» — это база на 2100 м, парк из 14 инструментов, четыре гида и правило,
              которое не нарушалось ни разу: на площадке темнее, чем в ваших глазах через десять минут после заката.
            </p>
          </Reveal>
        </div>
      </section>

      {/* timeline */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
          <ScrambleText text="Хроника · 2019 → 2026" />
        </p>
        <div className="mt-10 border-l border-line">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 80} className="group relative pb-10 pl-8 last:pb-0 lg:pl-12">
              <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-amberstar bg-night-950 transition-all duration-300 group-hover:bg-amberstar group-hover:shadow-[0_0_16px_rgba(244,198,109,0.6)]" />
              <p className="font-display text-2xl font-bold text-amberstar lg:text-3xl">{m.year}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-dim lg:text-base">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* guides */}
      <section className="border-y border-line bg-night-900/40">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Команда · четыре созвездия" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Люди, которые</span>, <span key="2">покажут небо</span>]} />
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-dim">
              У каждого гида — своё созвездие на эмблеме. Наведите курсор: линии прочертятся заново,
              как в первый вечер на площадке.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {GUIDES.map((g, i) => (
              <Reveal key={g.id} delay={(i % 2) * 100}>
                <article className="group h-full border border-line bg-night-900/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-line hover:bg-night-850 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <Constellation guide={g} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">0{i + 1} / 04</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold lg:text-xl">{g.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: g.hue }}>
                    {g.role}
                  </p>
                  <p className="mt-4 border-l-2 pl-4 text-sm italic leading-relaxed text-dim" style={{ borderColor: g.hue + "66" }}>
                    «{g.quote}»
                  </p>
                  <ul className="mt-5 space-y-1.5">
                    {g.creds.map((c) => (
                      <li key={c} className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                        <span className="h-px w-3" style={{ background: g.hue }} />
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* orion + gear */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="kenburns relative h-[42vh] overflow-hidden border border-line lg:h-[56vh]">
            <img src={ORION_IMG} alt="Туманность Ориона, снятая в телескоп базы" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              M42 · добсониан 12″ + ASI533MC · 90×30 с · Мария Лапина
            </p>
          </Reveal>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Инструменты · 14 единиц" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.4rem]">
              <MaskLines lines={[<span key="1">Парк телескопов,</span>, <span key="2">который не снился</span>, <span key="3">городским планетариям</span>]} />
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-dim">
              Всё, что перечислено ниже, ждёт вас на площадке. Трогать можно, наводить — нужно,
              гид поможет поймать объект в окуляр.
            </p>
          </div>
        </div>

        <div className="mt-14">
          {GEAR.map((g, i) => (
            <Reveal key={g.name} delay={i * 60}>
              <div className="group grid grid-cols-[40px_1fr] items-baseline gap-5 border-t border-line py-5 transition-colors duration-300 last:border-b hover:bg-night-900/60 sm:grid-cols-[60px_1fr_auto] lg:px-4">
                <span className="font-mono text-xs text-faint transition-colors duration-300 group-hover:text-amberstar">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold lg:text-base">{g.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-dim sm:text-sm">{g.purpose}</p>
                </div>
                <span className="col-span-2 font-mono text-[11px] uppercase tracking-[0.14em] text-nebula sm:col-span-1">{g.spec}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* principles */}
      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <Reveal className="border border-line bg-night-900/60 p-8 lg:p-12">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Тьма важнее комфорта",
                d: "Красные фонари, экранированные окна базы и ни одного прожектора. Небо — главный интерьер.",
              },
              {
                t: "Никто не уходит без окуляра",
                d: "Группа не больше 16 человек на 14 инструментов. У каждого гостя — своё небо и свой гид на связи.",
              },
              {
                t: "Погода — не приговор",
                d: "Резервные сутки, три метеомодели и возврат 100%, если небо закрыто все ночи. За семь лет возвратов было четыре.",
              },
            ].map((p, i) => (
              <div key={p.t} className="group">
                <p className="font-display text-4xl font-bold text-line transition-colors duration-500 group-hover:text-amberstar/60">0{i + 1}</p>
                <h3 className="mt-4 font-display text-base font-bold lg:text-lg">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{p.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
