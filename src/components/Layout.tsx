import { createContext, useCallback, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import WorkshopDust from "./WorkshopDust";
import { LogoMark, IconPhone, IconWhatsApp, IconCheck, IconPin, IconClock, ArrowUpRight } from "./Icons";
import { ADDRESS, BRANDS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, SERVICES, WHATSAPP } from "../lib/data";
import { openState } from "../lib/util";

/* ---------------- контекст записи ---------------- */

interface BookingCtx {
  openBooking: (service?: string) => void;
}
const Booking = createContext<BookingCtx>({ openBooking: () => {} });
export const useBooking = () => useContext(Booking);

const NAV = [
  { to: "/", label: "Главная", end: true },
  { to: "/uslugi", label: "Услуги и цены" },
  { to: "/preimushchestva", label: "Почему мы" },
  { to: "/kontakty", label: "Контакты" },
];

/* ---------------- модалка записи ---------------- */

function BookingModal({ open, service, onClose }: { open: boolean; service: string; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", brand: "", service, comment: "", agree: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, service }));
      setStatus("idle");
    }
  }, [open, service]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Как к вам обращаться?";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Введите телефон полностью";
    if (!form.agree) e.agree = "Нужно согласие на обработку данных";
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Запись на сервис">
      <button className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} aria-label="Закрыть" />
      <div className="anim-fadeup relative max-h-[92vh] w-full max-w-lg overflow-y-auto border border-linedark bg-ink-900 shadow-2xl shadow-black/50">
        <div className="hazard h-1.5" />
        <div className="flex items-center justify-between border-b border-linedark px-6 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mutd">Запись на сервис · ответим за 15 минут</p>
          <button onClick={onClose} aria-label="Закрыть" className="relative h-8 w-8 text-mutd transition-colors hover:text-amber">
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </button>
        </div>

        {status === "done" ? (
          <div className="anim-fadeup px-6 py-12 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-go text-go">
              <IconCheck className="h-8 w-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold uppercase tracking-wide">Заявка принята</h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-go">№ {orderId}</p>
            <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-mutd">
              Мастер-приёмщик перезвонит в течение 15 минут в рабочее время и согласует удобное окно.
            </p>
            <button onClick={onClose} className="mt-8 border border-linedark px-7 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mutd transition-colors hover:border-amber hover:text-amber">
              Понятно
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4 px-6 py-6">
            <div>
              <label htmlFor="bk-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Ваше имя *</label>
              <input id="bk-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Иван" className={inputCls(errors.name)} />
              {errors.name && <p className="mt-1.5 text-xs text-warn">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="bk-phone" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Телефон *</label>
              <input id="bk-phone" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+7 (___) ___-__-__" className={inputCls(errors.phone)} />
              {errors.phone && <p className="mt-1.5 text-xs text-warn">{errors.phone}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-brand" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Марка авто</label>
                <select id="bk-brand" value={form.brand} onChange={(e) => set("brand", e.target.value)} className={`${inputCls()} ${form.brand ? "text-star" : "text-mutd/70"}`}>
                  <option value="">Не знаю / другое</option>
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bk-service" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Услуга</label>
                <select id="bk-service" value={form.service} onChange={(e) => set("service", e.target.value)} className={`${inputCls()} ${form.service ? "text-star" : "text-mutd/70"}`}>
                  <option value="">Подскажете по телефону</option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="bk-comment" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Что беспокоит в машине?</label>
              <textarea id="bk-comment" rows={2} value={form.comment} onChange={(e) => set("comment", e.target.value)} placeholder="Стук спереди на кочках, горит чек…" className={`${inputCls()} resize-none`} />
            </div>
            <label className={`flex cursor-pointer items-start gap-3 border px-4 py-3 text-xs leading-relaxed transition-colors ${errors.agree ? "border-warn/70" : "border-linedark"} text-mutd`}>
              <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} className="mt-0.5 h-4 w-4 accent-amber" />
              <span>
                Согласен на обработку персональных данных. Никакого спама — только звонок мастера-приёмщика.
                {errors.agree && <span className="mt-1 block text-warn">{errors.agree}</span>}
              </span>
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex w-full items-center justify-center gap-3 bg-amber px-7 py-4 font-display text-base font-semibold uppercase tracking-[0.08em] text-ink-950 transition-all duration-300 hover:bg-amber2 disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <span className="spin-slow h-4 w-4 rounded-full border-2 border-ink-950/30 border-t-ink-950" style={{ animationDuration: "0.8s" }} />
                  Отправляем…
                </>
              ) : (
                <>
                  Перезвоните мне
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-mutd/70">
              или сразу: <a href={PHONE_TEL} className="text-amber hover:underline">{PHONE_DISPLAY}</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------- «на карту» ---------------- */

function ToMapLink() {
  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-colors duration-300 hover:text-amber"
      aria-label="Показать на карте"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <span className="anim-pingot absolute inset-0 rounded-full" aria-hidden="true" />
        <IconPin className="anim-pin h-4 w-4 text-amber" />
      </span>
      <span className="relative">
        на карту
        <svg
          className="absolute -bottom-1 left-0 h-[3px] w-full overflow-visible text-amber"
          viewBox="0 0 60 3"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 1.5h60" fill="none" stroke="currentColor" strokeWidth="1.5" className="tomap-line" opacity="0.55" />
        </svg>
      </span>
      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/* ---------------- шапка ---------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openBooking } = useBooking();
  const os = openState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-linedark bg-ink-900/90 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* строка адреса */}
      <div
        className={`overflow-hidden border-b transition-all duration-500 ${
          scrolled ? "max-h-0 border-transparent opacity-0" : "max-h-12 border-linedark/60 bg-ink-950/80 opacity-100 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-5 lg:px-8">
          <p className="flex min-w-0 items-center gap-2 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-mutd">
            <IconPin className="h-3.5 w-3.5 shrink-0 text-amber" />
            <span className="truncate">
              <span className="hidden md:inline">{ADDRESS}</span>
              <span className="md:hidden">Истра · Высоково · Центральная, 13</span>
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <p className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mutd lg:flex">
              <IconClock className="h-3.5 w-3.5 text-amber" />
              сегодня 9:00–21:00
            </p>
            <ToMapLink />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-5 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <LogoMark className="h-9 w-9 text-amber transition-transform duration-500 group-hover:rotate-[30deg]" />
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold uppercase tracking-[0.14em] text-star">Центральный</span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.28em] text-mutd">автосервис · Истра</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end as boolean | undefined}
              className={({ isActive }) =>
                `relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-amber" : "text-mutd hover:text-star"}`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  <span className={`h-1 w-1 bg-amber transition-all duration-300 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} />
                  {n.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={PHONE_TEL} className="group hidden items-center gap-2.5 lg:flex">
            <span className="flex h-10 w-10 items-center justify-center border border-linedark text-mutd transition-all duration-300 group-hover:border-amber group-hover:text-amber">
              <IconPhone className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block font-mono text-sm font-medium text-star transition-colors group-hover:text-amber">{PHONE_DISPLAY}</span>
              <span className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${os.open ? "text-go" : "text-warn"}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                {os.open ? "сейчас открыто" : "сейчас закрыто"}
              </span>
            </span>
          </a>
          <button
            onClick={() => openBooking()}
            className="group relative hidden overflow-hidden border border-amber px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-amber transition-colors duration-300 hover:text-ink-950 sm:block"
          >
            <span className="absolute inset-0 -translate-x-full bg-amber transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative">Записаться</span>
          </button>
          <button className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Закрыть меню" : "Открыть меню"}>
            <span className={`h-px w-6 bg-star transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-star transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-b border-linedark bg-ink-900/95 backdrop-blur-md transition-[max-height,opacity] duration-500 xl:hidden ${open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end as boolean | undefined}
              className={({ isActive }) =>
                `border-l-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors ${isActive ? "border-amber text-amber" : "border-transparent text-mutd hover:text-star"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <button onClick={() => { setOpen(false); openBooking(); }} className="mt-2 border-l-2 border-amber bg-amber/10 px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-amber">
            Записаться на сервис
          </button>
          <a href={PHONE_TEL} className="flex items-center gap-2 px-4 py-3 font-mono text-xs text-star">
            <IconPhone className="h-3.5 w-3.5 text-amber" /> {PHONE_DISPLAY}
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- мобильная панель действий ---------------- */

function MobileActionBar() {
  const { openBooking } = useBooking();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-linedark bg-ink-950/95 backdrop-blur-md lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="grid grid-cols-3">
        <a href={PHONE_TEL} className="flex flex-col items-center gap-1 py-3 text-mutd transition-colors active:text-amber">
          <IconPhone className="h-5 w-5" />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em]">Позвонить</span>
        </a>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 border-x border-linedark py-3 text-mutd transition-colors active:text-go">
          <IconWhatsApp className="h-5 w-5" />
          <span className="font-mono text-[9px] uppercase tracking-[0.14em]">WhatsApp</span>
        </a>
        <button onClick={() => openBooking()} className="flex flex-col items-center gap-1 bg-amber py-3 text-ink-950 transition-colors active:bg-amber2">
          <IconCheck className="h-5 w-5" />
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]">Записаться</span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- футер ---------------- */

function Footer() {
  const { openBooking } = useBooking();
  return (
    <footer className="relative z-10 mt-0 overflow-hidden border-t border-linedark bg-ink-950 pb-14 lg:pb-0">
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9 text-amber" />
              <span className="font-display text-lg font-semibold uppercase tracking-[0.14em]">Центральный</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mutd">
              Условия и качество ремонта на уровне официального дилера — по цене гаражного сервиса. Работаем с 2016 года.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center border border-linedark text-mutd transition-all duration-300 hover:-translate-y-1 hover:border-go hover:text-go">
                <IconWhatsApp className="h-4 w-4" />
              </a>
              <a href={PHONE_TEL} aria-label="Телефон" className="flex h-10 w-10 items-center justify-center border border-linedark text-mutd transition-all duration-300 hover:-translate-y-1 hover:border-amber hover:text-amber">
                <IconPhone className="h-4 w-4" />
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" aria-label="Яндекс Карты" className="flex h-10 w-10 items-center justify-center border border-linedark text-mutd transition-all duration-300 hover:-translate-y-1 hover:border-steel hover:text-steel">
                <IconPin className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-mutd/70">Разделы</p>
            <ul className="mt-5 space-y-3">
              {[...NAV, { to: "#", label: "Записаться", end: false }].map((n) =>
                n.to === "#" ? (
                  <li key="bk">
                    <button onClick={() => openBooking()} className="group flex items-center gap-2 text-sm text-mutd transition-colors hover:text-star">
                      <span className="h-px w-3 bg-mutd/50 transition-all duration-300 group-hover:w-5 group-hover:bg-amber" />
                      {n.label}
                    </button>
                  </li>
                ) : (
                  <li key={n.to}>
                    <Link to={n.to} className="group flex items-center gap-2 text-sm text-mutd transition-colors hover:text-star">
                      <span className="h-px w-3 bg-mutd/50 transition-all duration-300 group-hover:w-5 group-hover:bg-amber" />
                      {n.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-mutd/70">Режим работы</p>
            <ul className="mt-5 space-y-2 text-sm text-mutd">
              <li className="flex justify-between gap-4"><span>Пн — Сб</span><span className="font-mono text-star">9:00–21:00</span></li>
              <li className="flex justify-between gap-4"><span>Воскресенье</span><span className="font-mono text-star">9:00–18:00</span></li>
              <li className="pt-2">
                <a href={PHONE_TEL} className="font-mono text-base text-amber transition-colors hover:text-amber2">{PHONE_DISPLAY}</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-mutd/70">Как нас найти</p>
            <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-mutd">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              {ADDRESS}
            </p>
            <p className="mt-3 flex items-start gap-2.5 text-sm text-mutd">
              <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              5 минут от Истры, парковка у ворот
            </p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="group mt-5 inline-flex items-center gap-2 border border-linedark px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mutd transition-all duration-300 hover:border-steel hover:text-steel">
              Построить маршрут
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-linedark">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-mutd/60 lg:px-8">
          <span>© 2016–2026 · Автосервис «Центральный» · Истра</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-go" />
            видеонаблюдение ремзоны — онлайн
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- каркас ---------------- */

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [modal, setModal] = useState<{ open: boolean; service: string }>({ open: false, service: "" });

  const openBooking = useCallback((service?: string) => {
    setModal({ open: true, service: service ?? "" });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <Booking.Provider value={{ openBooking }}>
      <div className="relative min-h-screen overflow-x-clip bg-ink-900 text-star">
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="blueprint absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_85%_-5%,rgba(245,165,36,0.09),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_600px_at_-10%_40%,rgba(127,176,214,0.07),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_110%,rgba(47,191,143,0.05),transparent_60%)]" />
        </div>
        <WorkshopDust />
        <div className="noise pointer-events-none fixed inset-0 z-[1] opacity-[0.045]" />

        <Header />
        <main key={location.pathname} className="anim-fadeup relative z-10 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <BookingModal open={modal.open} service={modal.service} onClose={() => setModal((m) => ({ ...m, open: false }))} />
      </div>
    </Booking.Provider>
  );
}
