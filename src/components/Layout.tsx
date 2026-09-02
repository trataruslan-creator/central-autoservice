import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Starfield from "./Starfield";
import { PulsarLogo, MoonDisc, IconTelegram, IconVk, IconYoutube } from "./Icons";
import { moonPhase } from "../lib/astro";

const NAV = [
  { to: "/", label: "Главная", end: true },
  { to: "/tours", label: "Экспедиции" },
  { to: "/calendar", label: "Календарь неба" },
  { to: "/about", label: "Обсерватория" },
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
          <PulsarLogo className="h-8 w-8 transition-transform duration-500 group-hover:rotate-90" />
          <span className="font-display text-sm font-bold tracking-[0.32em] text-star">
            ПУЛЬСАР
          </span>
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
            <span className="relative">Забронировать</span>
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
          {[...NAV, { to: "/booking", label: "Забронировать", end: false }].map((n) => (
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
  const mp = moonPhase(new Date());
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-line bg-night-950">
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <PulsarLogo className="h-9 w-9" />
              <span className="font-display text-base font-bold tracking-[0.32em]">ПУЛЬСАР</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-dim">
              Астроэкспедиции в горы Кавказа. Возим людей туда, где небо снова становится объёмным, — с 2019 года.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: <IconTelegram className="h-4 w-4" />, label: "Telegram", href: "https://t.me/pulsar_sky" },
                { icon: <IconVk className="h-4 w-4" />, label: "VK", href: "https://vk.com/pulsar_sky" },
                { icon: <IconYoutube className="h-4 w-4" />, label: "YouTube", href: "https://youtube.com/@pulsar_sky" },
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
                <a href="mailto:hello@pulsar.sky" className="transition-colors hover:text-star">hello@pulsar.sky</a>
              </li>
              <li>
                <a href="https://t.me/pulsar_sky" target="_blank" rel="noreferrer" className="transition-colors hover:text-star">
                  @pulsar_sky
                </a>
              </li>
              <li className="pt-2 font-mono text-xs text-faint">Отвечаем в течение 2 часов, даже ночью — мы не спим</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">Координаты</p>
            <ul className="mt-5 space-y-2 font-mono text-xs leading-relaxed text-dim">
              <li>43.6983° с.ш.</li>
              <li>41.4789° в.д.</li>
              <li>2 100 м · плато Шон-Хорук</li>
              <li>Бортль 2 · SQM 21.9</li>
            </ul>
            <div className="mt-6 flex items-center gap-3 border border-line bg-night-900/60 p-3">
              <MoonDisc phase={mp.phase} size={30} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Сейчас в небе</p>
                <p className="text-xs text-star">{mp.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="text-outline whitespace-nowrap text-center font-display text-[18vw] font-bold leading-[0.85]">
          ПУЛЬСАР
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint md:flex-row lg:px-8">
          <p>© 2019–2026 обсерватория «Пульсар»</p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute h-2 w-2 rounded-full bg-nebula" />
              <span className="h-2 w-2 rounded-full bg-nebula" />
            </span>
            телескопы развёрнуты · небо открыто
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="transition-colors hover:text-amberstar"
          >
            наверх ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen">
      <Starfield />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(1100px 700px at 82% -10%, rgba(37,58,110,0.5), transparent 65%), radial-gradient(900px 620px at -12% 30%, rgba(24,66,74,0.42), transparent 62%), radial-gradient(760px 540px at 55% 118%, rgba(96,62,26,0.3), transparent 60%), linear-gradient(180deg, rgba(6,10,23,0) 0%, rgba(6,10,23,0.55) 100%)",
        }}
      />
      <div className="noise pointer-events-none fixed inset-0 z-[60] opacity-[0.05]" aria-hidden="true" />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
