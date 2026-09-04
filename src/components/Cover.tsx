import { useEffect, useState } from "react";
import { LogoMark, IconClock, IconPin, IconRoute, IconPhone, ArrowUpRight } from "./Icons";
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "../lib/data";
import { openState } from "../lib/util";

const SITE_LOGO = "https://central-autoservice.ru/img/logo.svg";

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
    window.setTimeout(onDone, reduced ? 220 : 1080);
  };

  return (
    <div className="cover-scene fixed inset-0 z-[100]" aria-hidden={flipping}>
      <div className={`cover-page absolute inset-0 ${flipping ? "flip" : ""}`}>
        {/* ---------- лицевая сторона обложки ---------- */}
        <div className="cover-face absolute inset-0 flex flex-col overflow-hidden bg-ink-950 text-star">
          {/* фон */}
          <div className="blueprint pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_520px_at_80%_-10%,rgba(245,165,36,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_500px_at_-10%_100%,rgba(127,176,214,0.08),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />
          <div className="hazard h-2 shrink-0" />

          <div className="relative flex flex-1 flex-col overflow-y-auto">
            {/* шапка обложки */}
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-8 pt-10 sm:px-10 lg:pt-14">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
                    <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full text-amber/40" style={{ animationDuration: "26s" }} aria-hidden="true">
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
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-mutd sm:text-[11px]">автосервис · Истра</p>
                    <p className="mt-1 font-display text-lg font-semibold uppercase tracking-[0.08em] sm:text-xl">Центральный</p>
                  </div>
                </div>
                <a
                  href={PHONE_TEL}
                  className="hidden items-center gap-2.5 border border-linedark px-4 py-2.5 font-mono text-xs text-star transition-colors duration-300 hover:border-amber hover:text-amber sm:flex"
                >
                  <IconPhone className="h-3.5 w-3.5" />
                  {PHONE_DISPLAY}
                </a>
              </div>

              {/* большой заголовок */}
              <div className="mt-10 sm:mt-14">
                <h1 className="font-display text-[clamp(2.6rem,9vw,6.4rem)] font-semibold uppercase leading-[0.95] tracking-tight">
                  <span className="anim-fadeup block" style={{ animationDelay: "80ms" }}>Ваша машина</span>
                  <span className="anim-fadeup block text-amber" style={{ animationDelay: "200ms" }}>в надёжных</span>
                  <span className="anim-fadeup block" style={{ animationDelay: "320ms" }}>руках</span>
                </h1>
                <p className="anim-fadeup mt-6 max-w-md text-sm leading-relaxed text-mutd sm:text-base" style={{ animationDelay: "440ms" }}>
                  Качество официального дилера — по цене гаражного сервиса. Диагностика, ремонт, ТО и сход-развал
                  на стенде 2024 года.
                </p>
              </div>

              {/* режим и адрес */}
              <div className="anim-fadeup mt-auto grid gap-3 pt-10 sm:grid-cols-2" style={{ animationDelay: "540ms" }}>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border border-linedark bg-ink-900/70 px-5 py-4">
                  <span className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] ${os.open ? "text-go" : "text-warn"}`}>
                    <span className="relative flex h-2 w-2">
                      <span className={`pulse-ring absolute h-full w-full rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                      <span className={`relative h-2 w-2 rounded-full ${os.open ? "bg-go" : "bg-warn"}`} />
                    </span>
                    {os.open ? "сейчас открыто" : "сейчас закрыто"}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-star">
                    <IconClock className="h-4 w-4 text-amber" />
                    Пн–Сб 9:00–21:00 · Вс 9:00–18:00
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border border-linedark bg-ink-900/70 px-5 py-4">
                  <span className="flex items-center gap-2 text-sm text-star">
                    <IconPin className="h-4 w-4 shrink-0 text-amber" />
                    {ADDRESS}
                  </span>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 border border-steel/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-steel transition-all duration-300 hover:bg-steel hover:text-ink-950"
                  >
                    <IconRoute className="h-3.5 w-3.5" />
                    Показать на карте Яндекс
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* нижняя кнопка */}
            <div className="relative shrink-0 border-t border-linedark bg-ink-950/90 px-6 py-5 sm:px-10">
              <div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-mutd sm:text-left">
                  листайте — внутри цены, услуги и честный сервис
                </p>
                <button
                  onClick={go}
                  className={`group relative flex items-center justify-center gap-3 overflow-hidden bg-amber px-10 py-4.5 font-display text-lg font-semibold uppercase tracking-[0.08em] text-ink-950 transition-all duration-300 sm:py-4 ${
                    flipping ? "anim-rev cursor-default" : "hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-12px_rgba(245,165,36,0.6)]"
                  }`}
                >
                  <span className="hazard absolute inset-y-0 left-0 w-2" />
                  {flipping ? "Поехали!" : "В сервис"}
                  <ArrowUpRight className={`h-5 w-5 transition-transform duration-300 ${flipping ? "rotate-90" : "group-hover:rotate-45"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* штамп «ПОЕХАЛИ!» в момент перелистывания */}
          {flipping && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="anim-stamp border-4 border-amber px-8 py-4 font-display text-4xl font-semibold uppercase tracking-[0.12em] text-amber sm:text-6xl" style={{ boxShadow: "0 0 60px rgba(245,165,36,0.25)" }}>
                Поехали!
              </p>
            </div>
          )}
        </div>

        {/* ---------- оборот страницы ---------- */}
        <div className="cover-back absolute inset-0 overflow-hidden bg-paper">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="rotate-[-8deg] text-center font-display text-[13vw] font-semibold uppercase leading-[0.9] text-ink-950/6">
              Центральный
            </p>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-2 hazard opacity-60" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 hazard opacity-60" />
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-950/30">
            автосервис · д. Высоково · ул. Центральная, 13
          </p>
        </div>
      </div>
    </div>
  );
}
