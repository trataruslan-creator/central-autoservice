import { useEffect, useState } from "react";
import { LogoMark, IconClock, IconPin, IconRoute, IconPhone, ArrowUpRight } from "./Icons";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "../lib/data";
import { WORKSHOP_IMG } from "../lib/images";
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
  const [flipping, setFlipping] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const os = openState();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const go = () => {
    if (flipping) return;
    setFlipping(true);
    onEnter();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onDone, reduced ? 220 : 1100);
  };

  return (
    <div className="cover-scene fixed inset-0 z-[100]" aria-hidden={flipping}>
      <div className={`cover-page absolute inset-0 ${flipping ? "flip" : ""}`}>
        {/* ---------- лицевая сторона ---------- */}
        <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#2e3238]">
          <img src={WORKSHOP_IMG} alt="" className="cover-photo" />
          <div className="cover-veil" />
          <span className="cover-ghost">ЦЕНТРАЛЬНЫЙ</span>

          <div className="relative flex flex-1 flex-col overflow-y-auto">
            {/* шапка */}
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 pt-9 sm:px-10">
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
                className="hidden items-center gap-2.5 border border-star/20 bg-black/25 px-4 py-2.5 font-mono text-xs text-star backdrop-blur-sm transition-colors duration-300 hover:border-amber hover:text-amber sm:flex"
              >
                <IconPhone className="h-3.5 w-3.5" />
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* заголовок */}
            <div className="mx-auto mt-10 w-full max-w-6xl px-6 sm:mt-14 sm:px-10">
              <h1 className="font-display text-[clamp(2.4rem,8vw,5.6rem)] font-semibold uppercase leading-[0.98] tracking-tight text-star">
                <span className="anim-fadeup block" style={{ animationDelay: "80ms" }}>Качество дилера.</span>
                <span className="anim-fadeup block text-amber" style={{ animationDelay: "220ms" }}>Цена — гаража.</span>
              </h1>
            </div>

            {/* билет: адрес · режим · сейчас */}
            <div className="mx-auto mt-auto w-full max-w-6xl px-6 pb-8 pt-10 sm:px-10">
              <div className="anim-fadeup grid gap-px overflow-hidden border border-star/15 bg-star/15 backdrop-blur-sm sm:grid-cols-3" style={{ animationDelay: "380ms" }}>
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
                  <p className="text-sm leading-snug text-star">Пн–Сб · 9:00–21:00</p>
                  <p className="text-sm leading-snug text-star/80">Вс · 9:00–18:00</p>
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
          </div>

          {/* нижняя панель с кнопкой */}
          <div className="relative shrink-0 border-t border-star/10 bg-black/45 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-star/45 sm:text-left">
                листайте — внутри цены, услуги и живая ремзона
              </p>
              <button
                onClick={go}
                className={`group relative flex items-center justify-center gap-3 overflow-hidden bg-amber px-12 py-4 font-display text-lg font-semibold uppercase tracking-[0.08em] text-ink-950 transition-all duration-300 sm:py-[18px] ${
                  flipping ? "anim-rev cursor-default" : "hover:-translate-y-0.5 hover:bg-amber2 hover:shadow-[0_18px_50px_-12px_rgba(245,165,36,0.65)]"
                }`}
              >
                <span className="hazard absolute inset-y-0 left-0 w-2" />
                {flipping ? "Поехали!" : "В сервис"}
                <ArrowUpRight className={`h-5 w-5 transition-transform duration-300 ${flipping ? "rotate-90" : "group-hover:rotate-45"}`} />
              </button>
            </div>
          </div>

          {/* штамп при перелистывании */}
          {flipping && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="anim-stamp border-4 border-amber px-8 py-4 font-display text-4xl font-semibold uppercase tracking-[0.12em] text-amber sm:text-6xl" style={{ boxShadow: "0 0 70px rgba(245,165,36,0.3)" }}>
                Поехали!
              </p>
            </div>
          )}
        </div>

        {/* ---------- оборот страницы ---------- */}
        <div className="absolute inset-0 overflow-hidden bg-paper">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="rotate-[-8deg] text-center font-display text-[13vw] font-semibold uppercase leading-[0.9] text-inktext/5">Центральный</p>
          </div>
          <div className="hazard pointer-events-none absolute inset-x-0 top-0 h-2 opacity-60" />
          <div className="hazard pointer-events-none absolute inset-x-0 bottom-0 h-2 opacity-60" />
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-inktext/30">
            автосервис · д. Высоково · ул. Центральная, 13
          </p>
        </div>
      </div>
    </div>
  );
}
