import { useMemo, useState } from "react";
import Estimator from "../components/Estimator";
import { Reveal, MaskLines, ScrambleText, usePageTitle } from "../components/Reveal";
import { useBooking } from "../components/Layout";
import { ArrowUpRight, IconCheck, IconChevron, SERVICE_ICON } from "../components/Icons";
import { CAT_LABEL, FAQS, SERVICES, type ServiceCat } from "../lib/data";
import { fmtPrice } from "../lib/util";

const CATS: Array<ServiceCat | "all"> = ["all", "diagnostic", "to", "suspension", "engine", "brakes", "electric", "body", "prepare"];

function ServiceRow({ id }: { id: string }) {
  const s = SERVICES.find((x) => x.id === id)!;
  const [open, setOpen] = useState(false);
  const { openBooking } = useBooking();
  const Ico = SERVICE_ICON[s.id];

  return (
    <div className={`border-t border-ink-950/10 transition-colors last:border-b ${open ? "bg-card" : "hover:bg-card/70"}`}>
      <button onClick={() => setOpen(!open)} className="grid w-full grid-cols-[44px_1fr_auto_24px] items-center gap-4 px-1 py-5 text-left sm:grid-cols-[56px_1.2fr_auto_auto_28px] sm:gap-6 sm:px-4" aria-expanded={open}>
        <span className={`flex h-11 w-11 items-center justify-center border transition-all duration-300 ${open ? "border-amber2 bg-amber2 text-paper" : "border-ink-950/15 text-inktext"}`}>
          {Ico && <Ico className="h-5 w-5" />}
        </span>
        <span>
          <span className="font-display text-lg font-medium uppercase tracking-wide lg:text-xl">{s.title}</span>
          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-mut">
            {CAT_LABEL[s.cat]} · {s.time}
          </span>
        </span>
        <span className="hidden max-w-sm text-sm leading-relaxed text-mut sm:block">{s.short}</span>
        <span className="text-right">
          <span className="block font-display text-lg font-semibold lg:text-xl">{fmtPrice(s.priceFrom)}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-mut">{s.priceNote ?? "от"}</span>
        </span>
        <IconChevron className={`h-4 w-4 text-mut transition-transform duration-300 ${open ? "rotate-90 text-amber2" : ""}`} />
      </button>

      <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="grid gap-8 px-1 pb-7 pt-2 sm:grid-cols-[1.2fr_0.8fr] sm:px-4 sm:pl-[92px]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mut">Что входит</p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-inktext">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-go" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-4 border border-ink-950/10 bg-paper p-5">
              <p className="text-sm leading-relaxed text-mut">
                Точная смета — после диагностики, фиксируется в акте. Запчасти: оригинал или проверенный аналог, на ваш выбор.
              </p>
              <button
                onClick={() => openBooking(s.id)}
                className="group flex items-center gap-2 bg-amber2 px-6 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.06em] text-paper transition-all duration-300 hover:bg-ink-950"
              >
                Записаться на эту работу
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a, open, onToggle, idx }: { q: string; a: string; open: boolean; onToggle: () => void; idx: number }) {
  return (
    <div className={`border transition-colors duration-300 ${open ? "border-amber/50 bg-ink-950/70" : "border-linedark hover:border-mutd"}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left" aria-expanded={open}>
        <span className="flex items-baseline gap-4">
          <span className={`font-mono text-xs ${open ? "text-amber" : "text-mutd"}`}>{String(idx + 1).padStart(2, "0")}</span>
          <span className="font-display text-base font-medium uppercase tracking-wide lg:text-lg">{q}</span>
        </span>
        <span className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-amber" : ""}`}>
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-6 pl-[4.2rem] text-sm leading-relaxed text-mutd">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  usePageTitle("Услуги и цены — Автосервис «Центральный», Истра");
  const [cat, setCat] = useState<ServiceCat | "all">("all");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter(
      (s) => (cat === "all" || s.cat === cat) && (!q || s.title.toLowerCase().includes(q) || s.short.toLowerCase().includes(q))
    );
  }, [cat, query]);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-5 lg:px-8 lg:pt-36">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
            <span className="hazard inline-block h-2.5 w-10" />
            <ScrambleText text="Прайс-ведомость · цены «от» · без звёздочек" />
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.1rem,5.5vw,4.2rem)] font-semibold uppercase leading-[1.04] tracking-tight">
            <MaskLines lines={[<span key="1">Услуги и цены:</span>, <span key="2">всё, что можно</span>, <span key="3" className="text-amber">сделать с машиной</span>]} />
          </h1>
          <Reveal delay={300} className="mt-7 max-w-xl">
            <p className="text-sm leading-relaxed text-mutd lg:text-base">
              Каждая строка раскрывается: что входит, сколько идёт по времени и от какой цены.
              Точную смету зафиксируем в акте до начала работ.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-12 flex flex-col gap-4">
          <div className="relative max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти работу: «тормоза», «масло», «развал»…"
              className="w-full border border-linedark bg-ink-950 px-4 py-3.5 pr-10 text-sm text-star outline-none transition-colors placeholder:text-mutd/60 focus:border-amber"
              aria-label="Поиск по услугам"
            />
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mutd" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CATS.map((c) => {
              const active = cat === c;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
                    active ? "border-amber bg-amber font-semibold text-ink-950" : "border-linedark text-mutd hover:border-amber/50 hover:text-star"
                  }`}
                >
                  {c === "all" ? "Все работы" : CAT_LABEL[c]}
                </button>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="bg-paper pb-20 pt-12 text-inktext">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div className="mb-4 flex items-baseline justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mut">
              Найдено: <span className="text-inktext">{filtered.length}</span>
            </p>
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-mut sm:block">цены — от, с работой</p>
          </div>

          {filtered.length ? (
            <div>
              {filtered.map((s) => (
                <ServiceRow key={s.id} id={s.id} />
              ))}
            </div>
          ) : (
            <div className="border border-ink-950/10 bg-card px-8 py-16 text-center">
              <p className="font-display text-2xl font-medium uppercase">По запросу «{query}» ничего не нашлось</p>
              <p className="mt-3 text-sm text-mut">Позвоните — почти наверняка мы это делаем, просто называется иначе.</p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8">
        <Estimator />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
              <ScrambleText text="Спрашивают перед записью" />
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.4rem]">
              <MaskLines lines={[<span key="1">Вопросы, которые</span>, <span key="2">задают чаще всего</span>]} />
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mutd">
              Не нашли ответа — напишите в MAX, мастер-приёмщик отвечает лично, без «ваш звонок очень важен для нас».
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <Faq q={f.q} a={f.a} idx={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
