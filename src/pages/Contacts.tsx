import { useEffect, useState, type FormEvent } from "react";
import { Reveal, MaskLines, ScrambleText, usePageTitle } from "../components/Reveal";
import { useBooking } from "../components/Layout";
import { ArrowUpRight, IconCamera, IconCheck, IconClock, IconPhone, IconPin, IconRoute, IconMax } from "../components/Icons";
import { ADDRESS, BRANDS, COORDS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, SERVICES, MAX_LINK } from "../lib/data";
import { DAY_NAMES, hoursFor, openState, pad } from "../lib/util";

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="font-display text-3xl font-semibold tabular-nums text-star lg:text-4xl">
      {pad(now.getHours())}:{pad(now.getMinutes())}
      <span className="text-amber">:{pad(now.getSeconds())}</span>
    </p>
  );
}

export default function Contacts() {
  usePageTitle("Контакты — Автосервис «Центральный», Истра");
  const { openBooking } = useBooking();
  const os = openState();
  const today = new Date().getDay();

  const [form, setForm] = useState({ name: "", phone: "", brand: "", service: "", comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [orderId, setOrderId] = useState("");

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Как к вам обращаться?";
    if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Введите телефон полностью";
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    window.setTimeout(() => {
      setOrderId(`ЗН-${Math.floor(1000 + Math.random() * 9000)}`);
      setStatus("done");
    }, 900);
  };

  const inputCls = (err?: string) =>
    `w-full border bg-ink-950 px-4 py-3.5 text-sm text-star outline-none transition-colors duration-300 placeholder:text-mutd/60 focus:border-amber ${
      err ? "border-warn/70" : "border-linedark"
    }`;

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-5 lg:px-8 lg:pt-36">
        <div className="max-w-3xl">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
            <span className="hazard inline-block h-2.5 w-10" />
            <ScrambleText text="Контакты · Истра, 5 минут от города" />
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.1rem,5.5vw,4.2rem)] font-semibold uppercase leading-[1.04] tracking-tight">
            <MaskLines lines={[<span key="1">Заезжайте —</span>, <span key="2">мы на <span className="text-amber">Центральной</span></span>]} />
          </h1>
        </div>

        {/* статус-панель */}
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <Reveal className="border border-linedark bg-ink-950/80 p-7">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mutd">Сейчас в сервисе</p>
              <span className={`flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${os.open ? "border-go/60 text-go" : "border-warn/60 text-warn"}`}>
                <span className={`relative flex h-1.5 w-1.5`}>
                  <span className={`pulse-ring absolute h-full w-full rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                  <span className={`relative h-1.5 w-1.5 rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                </span>
                {os.open ? "открыто" : "закрыто"}
              </span>
            </div>
            <div className="mt-4"><Clock /></div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mutd">{os.label}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-linedark pt-5">
              <a href={PHONE_TEL} className="group flex items-center gap-3 border border-linedark px-4 py-3.5 transition-all duration-300 hover:border-amber">
                <IconPhone className="h-4 w-4 text-amber" />
                <span className="font-mono text-xs text-star transition-colors group-hover:text-amber">{PHONE_DISPLAY}</span>
              </a>
              <a href={MAX_LINK} target="_blank" rel="noreferrer" className="group flex items-center gap-3 border border-linedark px-4 py-3.5 transition-all duration-300 hover:border-go">
                <IconMax className="h-4 w-4 text-go" />
                <span className="font-mono text-xs text-star transition-colors group-hover:text-go">MAX</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="border border-linedark bg-ink-950/80 p-7">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mutd">
              <IconPin className="h-3.5 w-3.5 text-amber" /> Адрес
            </p>
            <p className="mt-4 font-display text-lg font-medium uppercase leading-snug lg:text-xl">{ADDRESS}</p>
            <p className="mt-3 text-sm leading-relaxed text-mutd">Ориентир: въезд в деревню Высоково, серое здание с оранжевой полосой. Парковка у ворот — бесплатная.</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="group mt-5 inline-flex items-center gap-2 border border-linedark px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-all duration-300 hover:border-steel hover:text-steel"
            >
              Построить маршрут
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <Reveal delay={200} className="border border-linedark bg-ink-950/80 p-7">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mutd">
              <IconClock className="h-3.5 w-3.5 text-amber" /> Режим работы
            </p>
            <ul className="mt-4 space-y-1.5">
              {DAY_NAMES.map((d, i) => {
                const isToday = i === today;
                return (
                  <li key={d} className={`flex items-center justify-between px-2 py-1 ${isToday ? "bg-amber/10" : ""}`}>
                    <span className={`text-sm ${isToday ? "font-semibold text-amber" : "text-mutd"}`}>
                      {d}
                      {isToday && <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em]">· сегодня</span>}
                    </span>
                    <span className={`font-mono text-xs ${isToday ? "text-amber" : hoursFor(i) === "выходной" ? "text-warn" : "text-star"}`}>{hoursFor(i)}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* карта + форма */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal className="relative h-[320px] overflow-hidden border border-linedark bg-ink-950 lg:h-full lg:min-h-[480px]">
              <div className="blueprint absolute inset-0" />
              <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <path d="M-10 320 C 90 300, 130 260, 200 250 S 330 240, 380 190 S 430 110, 510 80" fill="none" stroke="#2b3644" strokeWidth="14" strokeLinecap="round" />
                <path d="M-10 320 C 90 300, 130 260, 200 250 S 330 240, 380 190 S 430 110, 510 80" fill="none" stroke="#f5a524" strokeWidth="1.6" className="dashline" opacity="0.8" />
                <path d="M40 60 L 130 130 L 120 230" fill="none" stroke="#2b3644" strokeWidth="8" strokeLinecap="round" />
                <path d="M330 360 L 340 280 L 380 190" fill="none" stroke="#2b3644" strokeWidth="8" strokeLinecap="round" />
                <g>
                  <circle cx="380" cy="190" r="26" fill="none" stroke="#f5a524" strokeWidth="1.5" opacity="0.35" />
                  <circle cx="380" cy="190" r="12" fill="#f5a524" opacity="0.18" />
                  <circle cx="380" cy="190" r="5" fill="#f5a524" />
                </g>
                <text x="380" y="150" textAnchor="middle" fill="#8b98a7" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">ЦЕНТРАЛЬНАЯ, 13</text>
                <text x="60" y="42" fill="#55616e" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">← ИСТРА, 5 МИН</text>
                <text x="300" y="382" fill="#55616e" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">НОВОРИЖСКОЕ Ш. →</text>
              </svg>
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mutd">{COORDS}</p>
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-amber px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-amber2">
                  <IconRoute className="h-4 w-4" />
                  Открыть в Яндекс Картах
                </a>
              </div>
            </Reveal>

            <Reveal delay={150} className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 border border-linedark bg-ink-950/70 p-5">
                <IconRoute className="h-5 w-5 shrink-0 text-amber" />
                <p className="text-sm leading-relaxed text-mutd">
                  <span className="font-semibold text-star">Из Истры:</span> по Волоколамскому шоссе в сторону Высоково, 5 минут, указатель на сервис.
                </p>
              </div>
              <div className="flex items-start gap-4 border border-linedark bg-ink-950/70 p-5">
                <IconCamera className="h-5 w-5 shrink-0 text-amber" />
                <p className="text-sm leading-relaxed text-mutd">
                  <span className="font-semibold text-star">С Новорижского:</span> съезд на Истру, дальше по указателям «д. Высоково».
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            {status === "done" ? (
              <div className="anim-fadeup flex h-full flex-col items-center justify-center border border-go/50 bg-ink-950/80 p-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center border-2 border-go text-go">
                  <IconCheck className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold uppercase">Заявка {orderId} принята</h3>
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-mutd">
                  Перезвоним в течение 15 минут в рабочее время и подберём удобное окно заезда.
                </p>
                <button onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", brand: "", service: "", comment: "" }); }} className="mt-8 border border-linedark px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-colors hover:border-amber hover:text-amber">
                  Отправить ещё одну
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="h-full border border-linedark bg-ink-950/80 p-7 lg:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel">Запись на визит</p>
                <h2 className="mt-3 font-display text-2xl font-semibold uppercase lg:text-3xl">Забронируйте окно в ремзоне</h2>
                <div className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mutd">Имя *</label>
                      <input id="ct-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Иван" className={inputCls(errors.name)} />
                      {errors.name && <p className="mt-1.5 text-xs text-warn">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="ct-phone" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mutd">Телефон *</label>
                      <input id="ct-phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+7 (___) ___-__-__" className={inputCls(errors.phone)} />
                      {errors.phone && <p className="mt-1.5 text-xs text-warn">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-brand" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mutd">Марка</label>
                      <select id="ct-brand" value={form.brand} onChange={(e) => set("brand", e.target.value)} className={`${inputCls()} ${form.brand ? "text-star" : "text-mutd/70"}`}>
                        <option value="">Не знаю</option>
                        {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ct-service" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mutd">Услуга</label>
                      <select id="ct-service" value={form.service} onChange={(e) => set("service", e.target.value)} className={`${inputCls()} ${form.service ? "text-star" : "text-mutd/70"}`}>
                        <option value="">Подскажете по телефону</option>
                        {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ct-comment" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-mutd">Что с машиной?</label>
                    <textarea id="ct-comment" rows={3} value={form.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Опишите симптомы: стук, скрип, горит лампочка…" className={`${inputCls()} resize-none`} />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex w-full items-center justify-center gap-3 bg-amber px-7 py-4 font-display text-base font-semibold uppercase tracking-[0.06em] text-ink-950 transition-all duration-300 hover:bg-amber2 disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="spin-slow h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950" style={{ animationDuration: "0.8s" }} />
                        Отправляем…
                      </>
                    ) : (
                      <>
                        Записаться
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-mutd/70">
                    нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* быстрый призыв */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-6 border border-linedark bg-ink-950/70 px-8 py-8">
          <div>
            <p className="font-display text-xl font-medium uppercase lg:text-2xl">Срочный вопрос по машине?</p>
            <p className="mt-1 text-sm text-mutd">Мастер-приёмщик на связи в рабочее время — без роботов и очередей.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={PHONE_TEL} className="flex items-center gap-2.5 border border-amber px-6 py-3.5 font-mono text-sm text-amber transition-all duration-300 hover:bg-amber hover:text-ink-950">
              <IconPhone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
            <button onClick={() => openBooking()} className="border border-linedark px-6 py-3.5 font-mono text-sm text-mutd transition-all duration-300 hover:border-amber hover:text-amber">
              Заказать звонок
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
