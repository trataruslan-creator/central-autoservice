import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { TEAM, FLEET, MILESTONES, type Member } from "../lib/data";
import { GARAGE_IMG } from "../lib/images";

function RouteScheme({ member }: { member: Member }) {
  const d = member.lines
    .map(([a, b]) => `M ${member.points[a][0]} ${member.points[a][1]} L ${member.points[b][0]} ${member.points[b][1]}`)
    .join(" ");
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
      <path d={d} fill="none" stroke={member.hue} strokeWidth="1.2" opacity="0.55" className="constellation-path" style={{ strokeDasharray: 600 }} />
      {member.points.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill={member.hue} opacity="0.1" />
          <circle cx={x} cy={y} r="2.1" fill={member.hue} />
        </g>
      ))}
    </svg>
  );
}

export default function About() {
  usePageTitle("Гараж «Апекс» — о клубе");

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
            <ScrambleText text="Гараж «Апекс» · основан в 2016" />
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <MaskLines lines={[<span key="1">Мы построили гараж</span>, <span key="2">в самом начале</span>, <span key="3" className="text-amberstar">лучших дорог страны</span>]} />
          </h1>
          <Reveal delay={300} className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-dim lg:text-base">
            <p>
              Всё началось с багажников: три машины, один маршрут «до перевала и обратно» и обещание, данное
              на смотровой площадке. Через три года у клуба был свой гараж, через шесть — флот из восемнадцати машин
              и правило, которое не нарушалось ни разу: колонна приходит на финиш в полном составе.
            </p>
            <p>
              Сегодня «Апекс» — это база у подножия хребта, боксы с подготовленными машинами, четыре гида
              и карта, на которой красным отмечены не пробки, а места, где обязательно нужно остановиться.
            </p>
          </Reveal>
        </div>
      </section>

      {/* хроника */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
          <ScrambleText text="Хроника · 2016 → 2026" />
        </p>
        <div className="mt-10 border-l border-line">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 80} className="group relative pb-10 pl-8 last:pb-0 lg:pl-12">
              <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-amberstar bg-night-950 transition-all duration-300 group-hover:bg-amberstar group-hover:shadow-[0_0_16px_rgba(242,163,60,0.6)]" />
              <p className="font-display text-2xl font-bold text-amberstar lg:text-3xl">{m.year}</p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-dim lg:text-base">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* команда */}
      <section className="border-y border-line bg-night-900/40">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Команда · четыре штурмана" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Люди, которые</span>, <span key="2">ведут колонну</span>]} />
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-dim">
              У каждого — своя схема маршрута на эмблеме. Наведите курсор: линия прочертится заново,
              как перед стартом, когда пальцем ведёшь по карте.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {TEAM.map((g, i) => (
              <Reveal key={g.id} delay={(i % 2) * 100}>
                <article className="group h-full border border-line bg-night-900/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-line hover:bg-night-850 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <RouteScheme member={g} />
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

      {/* гараж + флот */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="kenburns relative h-[42vh] overflow-hidden border border-line lg:h-[56vh]">
            <img src={GARAGE_IMG} alt="Гараж клуба «Апекс» ночью" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-dim">
              Бокс №1 · 23:40 · машина к заезду готова
            </p>
          </Reveal>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Флот · 18 машин" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.4rem]">
              <MaskLines lines={[<span key="1">Парк машин,</span>, <span key="2">которому доверяют</span>, <span key="3">перевалы</span>]} />
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-dim">
              Ниже — машины, которые чаще всего просят гости. Каждая проходит полное ТО перед заездом
              и возвращается в гараж с запиской механика, а не с «вроде всё нормально».
            </p>
          </div>
        </div>

        <div className="mt-14">
          {FLEET.map((g, i) => (
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

      {/* принципы */}
      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <Reveal className="border border-line bg-night-900/60 p-8 lg:p-12">
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                t: "Безопасность раньше скорости",
                d: "Шлемы на треке, колонна с ограничением по темпу и ни одного «догоним на прямике». Адреналин — дозированно, как топливо.",
              },
              {
                t: "Никто не остаётся на обочине",
                d: "Замыкающая машина и техничка с запчастями. За десять лет ни один экипаж не ночевал у трассы — максимум час у костра.",
              },
              {
                t: "Погода — не приговор",
                d: "Резервные сутки у каждого заезда и три источника прогноза. Если маршрут закрыт полностью — возврат 100% или перенос.",
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
