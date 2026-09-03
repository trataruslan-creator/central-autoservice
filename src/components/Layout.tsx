import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LightTrails from "./LightTrails";
import { LogoMark, IconTelegram, IconVk, IconYoutube, IconSteering } from "./Icons";
import { seasonInfo } from "../lib/drive";

const NAV = [
  { to: "/", label: "Главная", end: true },
  { to: "/tours", label: "Экспедиции" },
  { to: "/calendar", label: "Сезон-2026" },
  { to: "/about", label: "Гараж" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
        scrolled ? "border-b border-line bg-night-950/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <LogoMark className="h-8 w-8 text-amberstar transition-transform duration-500 group-hover:rotate-[18deg]" />
          <span className="font-display text-sm tracking-[0.32em] text-star">АПЕКС</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end as boolean | undefined}
              className={({ isActive }) =>
                `relative font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-amberstar" : "text-dim hover:text-star"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1 w-1 rounded-full bg-amberstar transition-all duration-300 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                  {n.label}
                </span>
              )}
            </NavLink>
          ))}
          <Link
            to="/booking"
            className="group relative overflow-hidden border border-amberstar/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-amberstar transition-colors duration-300 hover:text-night-950"
          >
            <span className="absolute inset-0 -translate-x-full bg-amberstar transition-transform duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative">В колонну</span>
          </Link>
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={`h-px w-6 bg-star transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-star transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        className={`overflow-hidden border-b border-line bg-night-950/95 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {[...NAV, { to: "/booking", label: "В колонну", end: false }].map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `border-l-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  isActive ? "border-amberstar text-amberstar" : "border-transparent text-dim hover:text-star"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const season = seasonInfo(new Date());
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-line bg-night-950">
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <LogoMark className="h-9 w-9 text-amberstar" />
              <span className="font-display text-base tracking-[0.32em]">АПЕКС</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dim">
              Клуб автомобильных экспедиций. Возим людей туда, где дорога — это событие, а не способ добраться, — с 2016 года.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: <IconTelegram className="h-4 w-4" />, label: "Telegram", href: "https://t.me/apex_drive" },
                { icon: <IconVk className="h-4 w-4" />, label: "VK", href: "https://vk.com/apex_drive" },
                { icon: <IconYoutube className="h-4 w-4" />, label: "YouTube", href: "https://youtube.com/@apex_drive" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-line text-dim transition-all duration-300 hover:-translate-y-1 hover:border-amberstar/60 hover:text-amberstar"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Навигация</p>
            <ul className="mt-5 space-y-3">
              {[...NAV, { to: "/booking", label: "Бронирование", end: false }].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="group flex items-center gap-2 text-sm text-dim transition-colors hover:text-star">
                    <span className="h-px w-3 bg-faint transition-all duration-300 group-hover:w-5 group-hover:bg-amberstar" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Связь</p>
            <ul className="mt-5 space-y-3 text-sm text-dim">
              <li>
                <a href="tel:+79280001408" className="transition-colors hover:text-star">+7 928 000-14-08</a>
              </li>
              <li>
                <a href="mailto:drive@apex.club" className="transition-colors hover:text-star">drive@apex.club</a>
              </li>
              <li>
                <a href="https://t.me/apex_drive" target="_blank" rel="noreferrer" className="transition-colors hover:text-star">
                  @apex_drive
                </a>
              </li>
              <li className="pt-2 font-mono text-xs text-faint">Отвечаем за 2 часа — даже в перевальную ночь</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Базы клуба</p>
            <ul className="mt-5 space-y-2 font-mono text-xs leading-relaxed text-dim">
              <li>Архыз · плато Шон-Хорук, 2100 м</li>
              <li>Москва · Moscow Raceway, бокс 14</li>
              <li>Иркутск · лёд Малого моря</li>
              <li>43.6983° с.ш. · 41.4789° в.д.</li>
            </ul>
            <div className="mt-6 flex items-center gap-3 border border-line bg-night-900/60 p-3">
              <IconSteering className="h-7 w-7 shrink-0 text-amberstar" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Сейчас на дорогах</p>
                <p className="text-xs text-star">{season.name} · {season.label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="text-outline whitespace-nowrap text-center font-display text-[19vw] leading-[0.85]">АПЕКС</p>
      </div>

      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-faint lg:px-8">
          <span>© 2016–2026 · Апекс, клуб автомобильных экспедиций</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-nebula" />
            18 машин на ходу · техничка на связи
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-night-950 text-star">
      {/* ambient layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(1100px_700px_at_82%_-10%,rgba(242,163,60,0.09),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_-10%_45%,rgba(226,89,63,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_115%,rgba(156,196,242,0.06),transparent_60%)]" />
      </div>
      <LightTrails />
      <div className="noise pointer-events-none fixed inset-0 z-[1] opacity-[0.05]" />

      <Header />
      <main key={location.pathname} className="relative z-10 anim-fadeup">
        {children}
      </main>
      <Footer />
    </div>
  );
}
