import { useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MaskLines, Reveal, ScrambleText, usePageTitle } from "../components/Reveal";
import { ArrowUpRight, IconCheck, IconMinus, IconPlus, IconPin, IconTelescope, IconUsers } from "../components/Icons";
import { FAQS, TOURS } from "../lib/data";
import { fmtPrice } from "../lib/astro";

const LEVELS = [
  { id: "first", label: "Первый раз смотрю в телескоп" },
  { id: "amateur", label: "Любитель, знаю пару созвездий" },
  { id: "pro", label: "Астрофотограф / со своим железом" },
];

function Faq({ q, a, open, onToggle, idx }: { q: string; a: string; open: boolean; onToggle: () => void; idx: number }) {
  return (
    <div className={`border transition-colors duration-300 ${open ? "border-amberstar/50 bg-night-900/70" : "border-line hover:border-faint"}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left" aria-expanded={open}>
        <span className="flex items-baseline gap-4">
          <span className={`font-mono text-xs transition-colors ${open ? "text-amberstar" : "text-faint"}`}>{String(idx + 1).padStart(2, "0")}</span>
          <span className="font-display text-sm font-semibold lg:text-base">{q}</span>
        </span>
        <span className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-6 pl-[4.4rem] text-sm leading-relaxed text-dim">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Booking() {
  usePageTitle("Бронирование — Пульсар");
  const [params] = useSearchParams();
  const initialTour = useMemo(() => {
    const t = params.get("tour");
    return t && TOURS.some((x) => x.id === t) ? t : "";
  }, [params]);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    tour: initialTour,
    people: 2,
    level: "first",
    comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [appId, setAppId] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const chosen = TOURS.find((t) => t.id === form.tour);

  const set = (k: keyof typeof form, v: string | number) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Как к вам обращаться?";
    const c = form.contact.trim();
    const okEmail = /^[\w.+-]+@[\w-]+\.[\w.]{2,}$/.test(c);
    const okTg = /^@?[a-zA-Z0-9_]{5,}$/.test(c);
    const okPhone = c.replace(/\D/g, "").length >= 10;
    if (!okEmail && !okTg && !okPhone) e.contact = "Нужен email, @телеграм или телефон";
    if (!form.tour) e.tour = "Выберите экспедицию или «свои даты»";
    return e;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    window.setTimeout(() => {
      setAppId(`PSR-2026-${String(Math.floor(1000 + Math.random() * 9000))}`);
      setStatus("done");
    }, 900);
  };

  const inputCls = (err?: string) =>
    `w-full border bg-night-950 px-4 py-3.5 text-sm text-star outline-none transition-colors duration-300 placeholder:text-faint focus:border-amberstar/70 ${
      err ? "border-flare/70" : "border-line"
    }`;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
            <ScrambleText text="Бронирование · ответим за 2 часа" />
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.1rem,5.5vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-tight">
            <MaskLines lines={[<span key="1">Застолбите</span>, <span key="2">свой кусок</span>, <span key="3" className="text-amberstar">Млечного Пути</span>]} />
          </h1>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* aside */}
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="border border-line bg-night-900/70 p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Как это работает</p>
              <ol className="mt-5 space-y-5">
                {[
                  ["Заявка", "Вы оставляете контакты и пожелания — это ни к чему не обязывает"],
                  ["Подтверждение", "Гид связывается за 2 часа, отвечает на вопросы и держит место 3 дня"],
                  ["Предоплата", "30% за месяц до заезда. Если небо закрыто все ночи — вернём всё"],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="font-display text-xl font-bold text-amberstar">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold">{t}</p>
                      <p className="mt-1 text-xs leading-relaxed text-dim">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={100} className="border border-line bg-night-900/70 p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Уже входит в цену</p>
              <ul className="mt-5 space-y-2.5 text-sm text-dim">
                {["Телескопы и бинокли на площадке", "Лектор и ночной гид", "Трансфер от Минеральных Вод", "Питание и горячие напитки всю ночь"].map((x) => (
                  <li key={x} className="flex items-center gap-3">
                    <IconCheck className="h-4 w-4 shrink-0 text-nebula" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>

            {chosen && (
              <Reveal delay={150} className="anim-fadeup border border-amberstar/40 bg-night-900/80 p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amberstar">Ваш выбор</p>
                <p className="mt-3 font-display text-base font-bold">{chosen.title}</p>
                <div className="mt-4 space-y-2 font-mono text-xs text-dim">
                  <p className="flex items-center gap-2"><IconPin className="h-3.5 w-3.5 text-nebula" />{chosen.location}</p>
                  <p className="flex items-center gap-2"><IconTelescope className="h-3.5 w-3.5 text-nebula" />{chosen.dateLabel} · {chosen.days} дн</p>
                  <p className="flex items-center gap-2"><IconUsers className="h-3.5 w-3.5 text-nebula" />осталось {chosen.spotsLeft} мест · {fmtPrice(chosen.price)}/чел</p>
                </div>
              </Reveal>
            )}
          </div>

          {/* form */}
          <Reveal delay={100}>
            {status === "done" ? (
              <div className="anim-fadeup border border-nebula/50 bg-night-900/80 p-8 lg:p-12">
                <span className="flex h-14 w-14 items-center justify-center border border-nebula text-nebula">
                  <IconCheck className="h-7 w-7" />
                </span>
                <h2 className="mt-7 font-display text-2xl font-bold lg:text-3xl">Заявка принята</h2>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-nebula">№ {appId}</p>
                <div className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                  {[
                    ["Гость", form.name],
                    ["Связь", form.contact],
                    ["Экспедиция", chosen ? chosen.title : "Обсудим свои даты"],
                    ["Состав", `${form.people} чел · ${LEVELS.find((l) => l.id === form.level)?.label.toLowerCase()}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-wrap justify-between gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">{k}</span>
                      <span className="text-star">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-sm leading-relaxed text-dim">
                  Гид напишет вам в течение двух часов. А пока — загляните в{" "}
                  <Link to="/calendar" className="text-amberstar underline-offset-4 transition-colors hover:text-star hover:underline">календарь неба</Link>
                  : вдруг захочется приехать дважды.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", contact: "", tour: "", people: 2, level: "first", comment: "" });
                  }}
                  className="mt-8 border border-line px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-dim transition-all duration-300 hover:border-amberstar/60 hover:text-amberstar"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="border border-line bg-night-900/70 p-7 lg:p-9">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Ваше имя *</label>
                    <input id="bk-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Как вас зовут" className={inputCls(errors.name)} />
                    {errors.name && <p className="mt-2 text-xs text-flare">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="bk-contact" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Email, @telegram или телефон *</label>
                    <input id="bk-contact" value={form.contact} onChange={(e) => set("contact", e.target.value)} placeholder="@stargazer" className={inputCls(errors.contact)} />
                    {errors.contact && <p className="mt-2 text-xs text-flare">{errors.contact}</p>}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="bk-tour" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Экспедиция *</label>
                  <div className="relative">
                    <select id="bk-tour" value={form.tour} onChange={(e) => set("tour", e.target.value)} className={`${inputCls(errors.tour)} appearance-none pr-10 ${form.tour ? "text-star" : "text-faint"}`}>
                      <option value="" disabled>Выберите заезд</option>
                      {[...TOURS].sort((a, b) => a.startISO.localeCompare(b.startISO)).map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.dateLabel} — {t.title} · {fmtPrice(t.price)}
                        </option>
                      ))}
                      <option value="custom">Свои даты / индивидуальная группа</option>
                    </select>
                    <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-faint">
                      <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  {errors.tour && <p className="mt-2 text-xs text-flare">{errors.tour}</p>}
                  {form.tour === "custom" && (
                    <p className="mt-2 text-xs text-nebula">Расскажите в комментарии, какие даты и сколько вас — подберём окно новолуния.</p>
                  )}
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Сколько вас</span>
                    <div className="flex items-center border border-line bg-night-950">
                      <button type="button" aria-label="Меньше" onClick={() => set("people", Math.max(1, form.people - 1))} className="flex h-12 w-12 items-center justify-center text-dim transition-colors hover:text-amberstar disabled:opacity-30" disabled={form.people <= 1}>
                        <IconMinus className="h-4 w-4" />
                      </button>
                      <span className="flex-1 text-center font-display text-lg font-bold">{form.people}</span>
                      <button type="button" aria-label="Больше" onClick={() => set("people", Math.min(12, form.people + 1))} className="flex h-12 w-12 items-center justify-center text-dim transition-colors hover:text-amberstar disabled:opacity-30" disabled={form.people >= 12}>
                        <IconPlus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Ориентир по цене</span>
                    <div className="flex h-12 items-center border border-line bg-night-950 px-4">
                      {chosen ? (
                        <span className="font-display text-base font-bold text-amberstar">{fmtPrice(chosen.price * form.people)} <span className="font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-faint">/ {form.people} чел</span></span>
                      ) : (
                        <span className="font-mono text-xs text-faint">выберите заезд — посчитаем</span>
                      )}
                    </div>
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Ваш опыт</legend>
                  <div className="grid gap-2.5">
                    {LEVELS.map((l) => (
                      <label key={l.id} className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-all duration-300 ${form.level === l.id ? "border-amberstar/60 bg-night-850 text-star" : "border-line text-dim hover:border-faint"}`}>
                        <input type="radio" name="level" value={l.id} checked={form.level === l.id} onChange={() => set("level", l.id)} className="sr-only" />
                        <span className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${form.level === l.id ? "border-amberstar" : "border-faint"}`}>
                          {form.level === l.id && <span className="h-1.5 w-1.5 rounded-full bg-amberstar" />}
                        </span>
                        {l.label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <label htmlFor="bk-comment" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Комментарий</label>
                  <textarea id="bk-comment" value={form.comment} onChange={(e) => set("comment", e.target.value)} rows={3} placeholder="Дети, оборудование, вопросы — всё сюда" className={`${inputCls()} resize-none`} />
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                    Заявка бесплатна · место держим 3 дня
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center gap-3 bg-amberstar px-8 py-4 font-mono text-[12px] uppercase tracking-[0.18em] font-semibold text-night-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_rgba(244,198,109,0.55)] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="spin-slow h-4 w-4 rounded-full border-2 border-night-950/30 border-t-night-950" />
                        Отправляем…
                      </>
                    ) : (
                      <>
                        Отправить заявку
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-nebula">
              <ScrambleText text="Частые вопросы" />
            </p>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight lg:text-[2.4rem]">
              <MaskLines lines={[<span key="1">Спрашивают</span>, <span key="2">перед первой ночью</span>]} />
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-dim">
              Не нашли ответ — напишите в телеграм{" "}
              <a href="https://t.me/pulsar_sky" target="_blank" rel="noreferrer" className="text-amberstar underline-offset-4 hover:underline">@pulsar_sky</a>,
              дежурный гид на связи круглосуточно.
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
