import { useState } from "react";
import { Link } from "react-router-dom";
import JobBoard from "../components/JobBoard";
import Estimator from "../components/Estimator";
import { Reveal, MaskLines, ScrambleText, useCountUp, usePageTitle } from "../components/Reveal";
import { useBooking } from "../components/Layout";
import {
  ArrowUpRight, IconAutoElectric, IconCamera, IconCheck, IconDoc, IconPhone, IconPin, IconShield,
  IconWash, IconMax, SERVICE_ICON,
} from "../components/Icons";
import { BRANDS, COMPARE, PARTNERS, PHONE_DISPLAY, PHONE_TEL, REVIEWS, SERVICES, STATS, MAX_LINK } from "../lib/data";
import { fmtPrice } from "../lib/util";

function BrandTicker() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-linedark bg-ink-950/70">
      {[false, true].map((rev, row) => (
        <div key={row} className={`ticker ${rev ? "ticker-rev" : ""} border-b border-linedark/60 last:border-b-0`}>
          <div className="ticker-track" style={{ animationDuration: rev ? "58s" : "46s" }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1 || undefined}>
                {BRANDS.slice(row ? 25 : 0, row ? undefined : 25).map((b) => (
                  <span key={b + dup} className="flex items-center gap-3 whitespace-nowrap px-6 py-3 font-display text-sm uppercase tracking-[0.14em] text-mutd">
                    <span className="h-1 w-1 bg-amber" />
                    {b}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({ value, suffix, label, note, delay }: { value: number; suffix: string; label: string; note: string; delay: number }) {
  const { ref, val } = useCountUp(value, 1500);
  return (
    <Reveal delay={delay} className="group card-hover border-l-2 border-linedark pl-5 transition-colors duration-500 hover:border-amber">
      <p className="font-display text-3xl font-semibold text-star lg:text-4xl">
        <span ref={ref}>{new Intl.NumberFormat("ru-RU").format(val)}</span>
        {suffix && <span className="text-amber">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm font-semibold text-star">{label}</p>
      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mutd">{note}</p>
    </Reveal>
  );
}

export default function Home() {
  usePageTitle("Автосервис «Центральный» в Истре — качество дилера, цена гаража");
  const { openBooking } = useBooking();
  const [reviewIdx, setReviewIdx] = useState(0);
  const popular = SERVICES.filter((s) => s.popular).slice(0, 6);
  const review = REVIEWS[reviewIdx];

  return (
    <>
      {/* ---------- открытие: ремзона ---------- */}
      <section className="relative mx-auto max-w-7xl px-4 pt-28 sm:px-5 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
              <span className="hazard inline-block h-2.5 w-10" />
              <ScrambleText text="Автосервис · Истра, д. Высоково" />
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.3rem,6.2vw,4.6rem)] font-semibold uppercase leading-[1.02] tracking-tight">
              <MaskLines
                lines={[
                  <span key="1">Качество дилера.</span>,
                  <span key="2">Цена — <span className="text-amber">гаража.</span></span>,
                  <span key="3">Честность — наша.</span>,
                ]}
              />
            </h1>
            <Reveal delay={420} className="mt-7 max-w-xl">
              <p className="text-sm leading-relaxed text-mutd lg:text-base">
                Диагностика на дилерских сканерах, сход-развал на стенде 2024 года, сроки — в акте под подпись,
                а ремзона — под камерами, которые видно из зоны ожидания. 51 марка, от Lada до Zeekr.
              </p>
            </Reveal>
            <Reveal delay={540} className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => openBooking()}
                className="group flex items-center gap-3 bg-amber px-7 py-4 font-display text-base font-semibold uppercase tracking-[0.06em] text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_rgba(245,165,36,0.5)]"
              >
                Записаться на сервис
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href={PHONE_TEL}
                className="flex items-center gap-3 border border-linedark px-7 py-4 font-mono text-sm text-star transition-all duration-300 hover:border-amber hover:text-amber"
              >
                <IconPhone className="h-4 w-4" />
                {PHONE_DISPLAY}
              </a>
            </Reveal>
            <Reveal delay={660} className="mt-10 flex flex-wrap gap-2.5">
              {["Автоэлектрик · 4500 ₽/час", "Сход-развал 3D · 2024", "Видеонаблюдение ремзоны", "Акт со сроком выдачи"].map((c) => (
                <span key={c} className="flex items-center gap-2 border border-linedark bg-ink-950/50 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-mutd">
                  <IconCheck className="h-3.5 w-3.5 text-go" />
                  {c}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={300}>
            <JobBoard />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {STATS.map((s, i) => (
            <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} note={s.note} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* ---------- марки ---------- */}
      <div className="mt-16">
        <BrandTicker />
      </div>

      {/* ---------- услуги: ведомость ---------- */}
      <section className="mt-20 bg-paper text-inktext">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber2">
                <ScrambleText text="Прайс-ведомость · 13 видов работ" />
              </p>
              <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
                <MaskLines lines={[<span key="1">С чем приезжают</span>, <span key="2">чаще всего</span>]} />
              </h2>
            </div>
            <Link to="/uslugi" className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mut transition-colors hover:text-inktext">
              Все услуги и цены
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="mt-12">
            {popular.map((s, i) => {
              const Ico = SERVICE_ICON[s.id];
              return (
                <Reveal key={s.id} delay={i * 60}>
                  <button
                    onClick={() => openBooking(s.id)}
                    className="group grid w-full grid-cols-[44px_1fr_auto] items-center gap-4 border-t border-ink-950/10 py-5 text-left transition-all duration-500 last:border-b hover:bg-card hover:px-4 hover:shadow-lg hover:shadow-ink-950/5 sm:grid-cols-[56px_1.2fr_1fr_auto] sm:gap-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center border border-ink-950/15 text-inktext transition-all duration-300 group-hover:border-amber2 group-hover:bg-amber2 group-hover:text-paper group-hover:scale-110">
                      {Ico && <Ico className="h-5 w-5" />}
                    </span>
                    <span>
                      <span className="font-display text-lg font-medium uppercase tracking-wide lg:text-xl">{s.title}</span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-mut">{s.time}</span>
                    </span>
                    <span className="hidden max-w-xs text-sm leading-relaxed text-mut sm:block">{s.short}</span>
                    <span className="text-right">
                      <span className="block font-display text-lg font-semibold text-inktext lg:text-xl">{fmtPrice(s.priceFrom)}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mut">{s.priceNote ?? "от · с запчастями уточним"}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200} className="mt-10 flex flex-wrap items-center justify-between gap-4 border border-ink-950/10 bg-card px-6 py-5">
            <p className="max-w-xl text-sm leading-relaxed text-mut">
              Не нашли свою работу? Позвоните — скажем цену по телефону за пару минут, а не «посмотрим, перезвоним».
            </p>
            <a href={PHONE_TEL} className="flex items-center gap-2 font-display text-base font-semibold uppercase tracking-wide text-amber2 transition-colors hover:text-inktext">
              {PHONE_DISPLAY}
              <IconPhone className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------- калькулятор ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
        <Estimator />
      </section>

      {/* ---------- дилер vs гараж ---------- */}
      <section className="bg-paper text-inktext">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber2">
              <ScrambleText text="Главный вопрос автовладельца" />
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Дилер дорого.</span>, <span key="2">В гараже — страшно.</span>, <span key="3" className="text-amber2">Есть третий вариант.</span>]} />
            </h2>
          </div>

          <Reveal delay={150} className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-[22%] border-b-2 border-ink-950/20 pb-4 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-mut">Критерий</th>
                  <th className="border-b-2 border-ink-950/20 pb-4 pl-4 text-left font-display text-base font-medium uppercase tracking-wide">Официальный дилер</th>
                  <th className="border-b-2 border-ink-950/20 pb-4 pl-4 text-left font-display text-base font-medium uppercase tracking-wide">Гараж у дома</th>
                  <th className="relative border-b-2 border-amber2 pb-4 pl-4 text-left font-display text-base font-semibold uppercase tracking-wide text-amber2">
                    «Центральный»
                    <span className="hazard absolute -top-1 left-0 h-1 w-24" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r, i) => (
                  <tr key={r.criterion} className={`group transition-colors hover:bg-card ${i % 2 ? "bg-card/60" : ""}`}>
                    <td className="border-b border-ink-950/8 py-4 pr-4 font-mono text-[10px] uppercase tracking-[0.14em] text-mut">{r.criterion}</td>
                    <td className="border-b border-ink-950/8 py-4 pl-4 text-mut">{r.dealer}</td>
                    <td className="border-b border-ink-950/8 py-4 pl-4 text-mut">{r.garage}</td>
                    <td className="border-b border-ink-950/8 bg-amber/10 py-4 pl-4 font-semibold text-inktext transition-colors group-hover:bg-amber/15">{r.central}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ---------- предложения ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
          <ScrambleText text="Спецпредложения сервиса" />
        </p>
        <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
          <MaskLines lines={[<span key="1">Не только ремонт</span>]} />
        </h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="group card-hover flex h-full flex-col border border-linedark bg-ink-950/70 transition-all duration-500 hover:border-amber/60">
              <div className="hazard h-1.5" />
              <div className="flex flex-1 flex-col p-7">
                <IconAutoElectric className="h-8 w-8 text-amber transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-xl font-medium uppercase leading-snug">Автоэлектрик — оплата по нормо-часу</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                  Штатный автоэлектрик: диагностика, поиск утечек, установка сигнализаций и допоборудования. Платите за фактическое время — 4500 ₽ за нормо-час, счётчик при вас.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-linedark pt-5">
                  <span className="font-display text-lg font-semibold text-amber">{fmtPrice(4500)} / час</span>
                  <button onClick={() => openBooking("autoelectric")} className="font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-colors hover:text-amber">записаться →</button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="group card-hover flex h-full flex-col border border-linedark bg-ink-950/70 transition-all duration-500 hover:border-steel/60">
              <div className="h-1.5 bg-steel" />
              <div className="flex flex-1 flex-col p-7">
                <IconWash className="h-8 w-8 text-steel transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-xl font-medium uppercase leading-snug">Автомагазин: запчасти под заказ</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                  Оригиналы и проверенные аналоги по доступным ценам. Привозим за 1–3 дня, ставим здесь же — гарантия и на деталь, и на работу.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-linedark pt-5">
                  <span className="font-display text-lg font-semibold text-steel">1–3 дня</span>
                  <a href={MAX_LINK} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-colors hover:text-steel">заказать в MAX →</a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="group card-hover flex h-full flex-col border border-linedark bg-ink-950/70 transition-all duration-500 hover:border-go/60">
              <div className="h-1.5 bg-go" />
              <div className="flex flex-1 flex-col p-7">
                <IconDoc className="h-8 w-8 text-go transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-5 font-display text-xl font-medium uppercase leading-snug">Обслуживание автопарков для юрлиц</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                  Договор, безнал, закрывающие документы, приоритетная запись и персональный менеджер. Ваш парк в одном месте — с отчётами по каждой машине.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-linedark pt-5">
                  <span className="font-display text-lg font-semibold text-go">договор + НДС</span>
                  <button onClick={() => openBooking()} className="font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-colors hover:text-go">обсудить →</button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- прозрачность ---------- */}
      <section className="border-y border-linedark bg-ink-950/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-5 lg:grid-cols-3 lg:px-8">
          {[
            { icon: IconCamera, title: "Ремзона под камерами", text: "Смотрите за ремонтом из тёплой зоны ожидания на большом экране — или по фотоотчёту в MAX. Скрывать нам нечего, буквально." },
            { icon: IconDoc, title: "Акт со сроком выдачи", text: "При приёмке фиксируем работы, запчасти и дату выдачи под подпись. Опоздали по своей вине — скидка 10% на работу." },
            { icon: IconShield, title: "Гарантия до 12 месяцев", text: "От 6 месяцев на все работы, до 12 — на капремонт двигателя и КПП. Условия прописаны в заказ-наряде, а не «на словах»." },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 100} className="group">
              <div className="flex h-14 w-14 items-center justify-center border border-linedark text-amber transition-all duration-500 group-hover:bg-amber group-hover:text-ink-950 group-hover:scale-110 group-hover:rotate-3">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium uppercase transition-colors duration-300 group-hover:text-amber">{b.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-mutd">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- отзывы ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
              <ScrambleText text="Отзывы клиентов · без купюр" />
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Что говорят те,</span>, <span key="2">кто уже приезжал</span>]} />
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setReviewIdx((reviewIdx - 1 + REVIEWS.length) % REVIEWS.length)}
              aria-label="Предыдущий отзыв"
              className="flex h-12 w-12 items-center justify-center border border-linedark text-mutd transition-all hover:border-amber hover:text-amber"
            >
              <ArrowUpRight className="h-4 w-4 rotate-[225deg]" />
            </button>
            <button
              onClick={() => setReviewIdx((reviewIdx + 1) % REVIEWS.length)}
              aria-label="Следующий отзыв"
              className="flex h-12 w-12 items-center justify-center border border-linedark text-mutd transition-all hover:border-amber hover:text-amber"
            >
              <ArrowUpRight className="h-4 w-4 rotate-45" />
            </button>
          </div>
        </div>

        <div key={reviewIdx} className="anim-fadeup mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <figure className="border border-linedark bg-ink-950/70 p-8 lg:p-10">
            <div className="flex gap-1 text-amber" aria-label="Оценка 5 из 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" /></svg>
              ))}
            </div>
            <blockquote className="mt-6 font-display text-xl font-normal leading-relaxed text-star lg:text-2xl">
              «{review.text}»
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-linedark pt-6">
              <span className="flex h-11 w-11 items-center justify-center bg-amber font-display text-lg font-semibold text-ink-950">
                {review.name[0]}
              </span>
              <span>
                <span className="block text-sm font-semibold">{review.name}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-mutd">{review.car} · {review.service}</span>
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-3">
            {REVIEWS.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setReviewIdx(i)}
                className={`flex items-center justify-between gap-4 border px-5 py-4 text-left transition-all duration-300 ${
                  i === reviewIdx ? "border-amber bg-amber/10" : "border-linedark hover:border-mutd"
                }`}
              >
                <span>
                  <span className={`block text-sm font-semibold ${i === reviewIdx ? "text-amber" : "text-star"}`}>{r.name}</span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-mutd">{r.car}</span>
                </span>
                <span className={`font-display text-lg ${i === reviewIdx ? "text-amber" : "text-linedark"}`}>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- партнёры + призыв ---------- */}
      <section className="border-t border-linedark bg-ink-950/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
            <ScrambleText text="Партнёры клуба «Центральный»" />
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {PARTNERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 100}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-start justify-between gap-6 border border-linedark bg-ink-900/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-amber/60"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">{p.tag}</span>
                    <h3 className="mt-2 font-display text-xl font-medium uppercase">{p.name}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-mutd">{p.desc}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-mutd transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber" />
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative mt-16 overflow-hidden border border-amber/40 bg-ink-900/80 px-8 py-14 lg:px-14">
            <svg viewBox="0 0 600 120" className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full opacity-20" aria-hidden="true">
              <path d="M-10 110 C 120 100, 160 60, 260 55 S 460 60, 610 10" fill="none" stroke="#f5a524" strokeWidth="2" className="dashline" />
            </svg>
            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber">
                  <ScrambleText text="Машина сама не починится" />
                </p>
                <h2 className="mt-4 font-display text-2xl font-semibold uppercase leading-tight lg:text-4xl">
                  Запишитесь сейчас —
                  <br />
                  диагностикой займёмся мы
                </h2>
                <p className="mt-4 flex items-center gap-2 text-sm text-mutd">
                  <IconPin className="h-4 w-4 text-amber" />
                  Истринский р-н, д. Высоково, ул. Центральная, 13
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => openBooking()}
                  className="group flex items-center justify-center gap-3 bg-amber px-8 py-5 font-display text-base font-semibold uppercase tracking-[0.06em] text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_rgba(245,165,36,0.5)]"
                >
                  Записаться
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <a
                  href={MAX_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 border border-go/60 px-8 py-5 font-mono text-sm text-go transition-all duration-300 hover:bg-go hover:text-ink-950"
                >
                  <IconMax className="h-4 w-4" />
                  Написать в MAX
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
