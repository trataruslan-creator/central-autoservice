import { useState, useEffect } from "react";
import { LogoMark, IconClock, IconPin, IconRoute, IconPhone, ArrowUpRight } from "./Icons";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "../lib/data";
import { openState, pad } from "../lib/util";

const SITE_LOGO = "https://central-autoservice.ru/img/logo.svg";

function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-xl font-medium tabular-nums text-star sm:text-2xl">
      {pad(now.getHours())}:{pad(now.getMinutes())}
      <span className="text-amber">:{pad(now.getSeconds())}</span>
    </span>
  );
}

export default function Cover({ onEnter, onDone }: { onEnter: () => void; onDone: () => void }) {
  const [opening, setOpening] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const os = openState();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const go = () => {
    if (opening) return;
    setOpening(true);
    onEnter();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onDone, reduced ? 300 : 1300);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden={opening}>
      {/* Занавеска - левая половина */}
      <div className={`curtain-left ${opening ? "open" : ""}`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-amber">
            <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
        </div>
      </div>

      {/* Занавеска - правая половина */}
      <div className={`curtain-right ${opening ? "open" : ""}`}>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full text-amber">
            <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
        </div>
      </div>

      {/* Контент занавески */}
      <div className={`curtain-content ${opening ? "hidden" : ""}`}>
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-ink-950 via-ink-900 to-ink-950">
          {/* Фоновые декоративные элементы */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="anim-float absolute -left-20 top-20 h-96 w-96 rounded-full bg-amber/5 blur-3xl" />
            <div className="anim-float absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-steel/5 blur-3xl" style={{ animationDelay: "2s" }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,165,36,0.03),transparent_70%)]" />
          </div>

          {/* Шапка */}
          <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pt-9 sm:px-10">
            <div className="flex items-center gap-4">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
                <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full text-amber/45" style={{ animationDuration: "28s" }} aria-hidden="true">
                  <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
                </svg>
                {logoFailed ? (
                  <LogoMark className="h-12 w-12 text-amber sm:h-14 sm:w-14" />
                ) : (
                  <img
                    src={SITE_LOGO}
                    alt="Логотип автосервиса «Центральный»"
                    className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                    onError={() => setLogoFailed(true)}
                  />
                )}
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-star/60 sm:text-[11px]">автосервис · Истра</p>
                <p className="mt-1 font-display text-lg font-semibold uppercase tracking-[0.1em] text-star sm:text-xl">Центральный</p>
              </div>
            </div>
            <a
              href={PHONE_TEL}
              className="hidden items-center gap-2.5 border border-star/20 bg-black/25 px-4 py-2.5 font-mono text-xs text-star backdrop-blur-sm transition-all duration-300 hover:border-amber hover:text-amber sm:flex"
            >
              <IconPhone className="h-3.5 w-3.5" />
              {PHONE_DISPLAY}
            </a>
          </div>

          {/* Основной контент */}
          <div className="relative z-10 mx-auto mt-10 flex flex-1 w-full max-w-6xl flex-col px-6 sm:mt-14 sm:px-10">
            <h1 className="font-display text-[clamp(2.4rem,8vw,5.6rem)] font-semibold uppercase leading-[0.98] tracking-tight text-star">
              <span className="anim-fade-in-up block" style={{ animationDelay: "0.2s" }}>Качество дилера.</span>
              <span className="anim-fade-in-up block text-amber" style={{ animationDelay: "0.4s" }}>Цена — гаража.</span>
            </h1>

            {/* Билет с информацией */}
            <div className="anim-fade-in-up mt-auto grid gap-px overflow-hidden border border-star/15 bg-star/15 backdrop-blur-sm sm:grid-cols-3 pb-8 pt-10" style={{ animationDelay: "0.6s" }}>
              <div className="flex flex-col gap-2 bg-[#24272c]/90 px-6 py-5">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-star/50">
                  <IconPin className="h-3.5 w-3.5 text-amber" /> Адрес
                </span>
                <p className="text-sm leading-snug text-star">{ADDRESS}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-1 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel transition-colors duration-300 hover:text-amber"
                >
                  <IconRoute className="h-3.5 w-3.5" />
                  Показать на карте Яндекс
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <div className="flex flex-col gap-2 bg-[#24272c]/90 px-6 py-5">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-star/50">
                  <IconClock className="h-3.5 w-3.5 text-amber" /> Время работы
                </span>
                <p className="text-sm leading-snug text-star">Пн–Сб · 9:00–20:00</p>
                <p className="text-sm leading-snug text-star/80">Вс · выходной</p>
              </div>

              <div className="flex flex-col gap-2 bg-[#24272c]/90 px-6 py-5">
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-star/50">
                  <span className={`relative flex h-2 w-2`}>
                    <span className={`pulse-ring absolute h-full w-full rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                    <span className={`relative h-2 w-2 rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                  </span>
                  Сейчас в сервисе · онлайн
                </span>
                <LiveClock />
                <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${os.open ? "text-go" : "text-warn"}`}>
                  {os.label}
                </p>
              </div>
            </div>
          </div>

          {/* Нижняя кнопка */}
          <div className="relative z-10 shrink-0 border-t border-star/10 bg-black/45 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-star/45 sm:text-left">
                нажмите кнопку — и добро пожаловать
              </p>
              <button
                onClick={go}
                className="group relative flex items-center justify-center gap-3 overflow-hidden bg-amber px-12 py-4 font-display text-lg font-semibold uppercase tracking-[0.08em] text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber2 hover:shadow-[0_18px_50px_-12px_rgba(245,165,36,0.65)] sm:py-[18px]"
              >
                <span className="hazard absolute inset-y-0 left-0 w-2" />
                В сервис
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
