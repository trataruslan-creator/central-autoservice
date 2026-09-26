import { useMemo, useState } from "react";
import { BRANDS, SERVICES, brandFactor } from "../lib/data";
import { fmtPrice } from "../lib/util";
import { useCountUp } from "./Reveal";
import { useBooking } from "./Layout";
import { IconGauge, ArrowUpRight } from "./Icons";

function Result({ value, label }: { value: number; label: string }) {
  const { ref, val } = useCountUp(value, 900);
  return (
    <div className="text-center">
      <p className="font-display text-2xl font-semibold text-amber tabular-nums lg:text-3xl">
        <span ref={ref}>{fmtPrice(val)}</span>
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mutd">{label}</p>
    </div>
  );
}

export default function Estimator() {
  const [brand, setBrand] = useState<string>("Kia");
  const [serviceId, setServiceId] = useState<string>("to");
  const { openBooking } = useBooking();

  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0], [serviceId]);
  const factor = brandFactor(brand);
  const low = Math.round((service.priceFrom * factor) / 100) * 100;
  const high = Math.round((service.priceFrom * factor * 1.35) / 100) * 100;

  const selectCls =
    "w-full appearance-none border border-linedark bg-ink-950 px-4 py-3.5 pr-10 text-sm text-star outline-none transition-colors duration-300 focus:border-amber";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
      <div className="flex flex-col justify-center">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
          <IconGauge className="h-4 w-4" />
          Калькулятор «на глазок»
        </p>
        <h3 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-4xl">
          Сколько это стоит —<br />
          <span className="text-amber">честно, до визита</span>
        </h3>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-mutd">
          Выберите марку и работу — покажем вилку цены для вашей машины. Точную смету зафиксируем в акте
          после диагностики: ни рублём больше согласованного.
        </p>
        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="est-brand" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Марка автомобиля</label>
            <div className="relative">
              <select id="est-brand" value={brand} onChange={(e) => setBrand(e.target.value)} className={selectCls}>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-mutd">
                <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="est-service" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-mutd">Какая работа нужна</label>
            <div className="relative">
              <select id="est-service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={selectCls}>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-mutd">
                <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border border-linedark bg-ink-950/80">
        <div className="hazard h-1.5" />
        <div className="flex items-center justify-between border-b border-linedark px-6 py-3.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mutd">Предварительная смета</span>
          <span className="stamp px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-amber">без накруток</span>
        </div>
        <div key={`${brand}-${serviceId}`} className="anim-fadeup px-6 py-8">
          <p className="font-display text-lg font-medium uppercase tracking-wide text-star">
            {brand} · {service.title}
          </p>
          <div className="mt-7 grid grid-cols-2 gap-6 border-t border-linedark pt-7">
            <Result value={low} label="от — если всё просто" />
            <Result value={high} label="до — реалистичный верх" />
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-linedark pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mutd">
            <span>⏱ {service.time}</span>
            <span>запчасти: на выбор — оригинал / аналог</span>
          </div>
          <button
            onClick={() => openBooking(serviceId)}
            className="group mt-7 flex w-full items-center justify-center gap-3 bg-amber px-6 py-4 font-display text-base font-semibold uppercase tracking-[0.06em] text-ink-950 transition-all duration-300 hover:bg-amber2"
          >
            Записаться на {service.cat === "diagnostic" ? "диагностику" : "ремонт"}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-mutd/70">
            при ремонте у нас диагностика — бесплатно
          </p>
        </div>
      </div>
    </div>
  );
}
