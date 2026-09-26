import { Reveal, MaskLines, ScrambleText, usePageTitle } from "../components/Reveal";
import { useBooking } from "../components/Layout";
import {
  ArrowUpRight, IconCheck, IconDiag, IconDoc, IconGauge, IconShield, IconWrench, IconAlignment,
} from "../components/Icons";
import { PROCESS } from "../lib/data";
import { ALIGNMENT_IMG, WORKSHOP_IMG, SERVICE_3D_1, SERVICE_3D_2, SERVICE_3D_3 } from "../lib/images";

const EQUIPMENT = [
  { icon: IconAlignment, name: "Стенд сход-развала 3D", spec: "оборудование 2024 года · точность до 0.01°" },
  { icon: IconDiag, name: "Дилерские сканеры", spec: "по 60+ параметрам, отчёт распечатываем" },
  { icon: IconGauge, name: "Тормозной стенд", spec: "проверка усилий по осям, нужно для ГОСТа" },
  { icon: IconWrench, name: "4 подъёмника", spec: "до 5 тонн — берём и легковые, и коммерческие" },
];

export default function Why() {
  usePageTitle("Почему мы — Автосервис «Центральный» в Истре | Ремонт авто с гарантией");
  const { openBooking } = useBooking();

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-28 sm:px-5 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
              <span className="hazard inline-block h-2.5 w-10" />
              <ScrambleText text="Почему «Центральный» · с 2016 года" />
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,5.5vw,4.2rem)] font-semibold uppercase leading-[1.04] tracking-tight">
              <MaskLines lines={[<span key="1">Мы собрали сервис,</span>, <span key="2">в который не страшно</span>, <span key="3" className="text-amber">отдать ключи</span>]} />
            </h1>
            <Reveal delay={300} className="mt-7 max-w-xl space-y-4 text-sm leading-relaxed text-mutd lg:text-base">
              <p>
                Автовладельцы Истры годами выбирали между двумя крайностями: дилер с ценником «как крыло от самолёта»
                и гараж, где «мастер дядя Витя, гарантия — рукопожатие». Мы построили третье.
              </p>
              <p>
                Современное оборудование и регламенты дилера, цены разумного сервиса и одно правило,
                которое не нарушалось ни разу: <span className="font-semibold text-star">клиент всегда понимает, за что платит</span>.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="kenburns relative h-[38vh] overflow-hidden border border-linedark lg:h-[54vh]">
            <img src={WORKSHOP_IMG} alt="Современный автосервис в Истре: профессиональное оборудование для ремонта автомобилей" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mutd">автосервис «Центральный» · Истра</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* процесс */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
            <ScrambleText text="Как проходит визит · 5 шагов" />
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
            <MaskLines lines={[<span key="1">От заезда до выдачи —</span>, <span key="2">по полочкам</span>]} />
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-linedark lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 110} className="group relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-linedark bg-ink-900 font-display text-lg font-semibold text-amber transition-all duration-500 group-hover:bg-amber group-hover:text-ink-950">
                  {p.step}
                </div>
                <h3 className="mt-5 font-display text-lg font-medium uppercase tracking-wide">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mutd">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* оборудование */}
      <section className="bg-paper text-inktext">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-5 lg:grid-cols-2 lg:px-8 lg:py-24">
          <Reveal className="kenburns relative order-2 h-[38vh] overflow-hidden border border-ink-950/15 lg:order-1 lg:h-[52vh]">
            <img src={ALIGNMENT_IMG} alt="Стенд сход-развала 3D с мишенями на колёсах" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-5 bg-ink-950/85 px-4 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber">стенд 3D · установлен в 2024</p>
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-amber2">
              <ScrambleText text="Оборудование · не «на глаз»" />
            </p>
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
              <MaskLines lines={[<span key="1">Железо, которому</span>, <span key="2">можно доверить</span>, <span key="3" className="text-amber2">свою машину</span>]} />
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mut">
              Мы принципиально обновляем парк оборудования: в 2024 поставили новый стенд сход-развала —
              теперь геометрию выставляем с точностью, которой позавидует иной дилер.
            </p>
            <div className="mt-9 space-y-4">
              {EQUIPMENT.map((e, i) => (
                <Reveal key={e.name} delay={i * 80}>
                  <div className="group flex items-center gap-5 border border-ink-950/10 bg-card px-5 py-4 transition-all duration-300 hover:border-amber2/60">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-950/15 text-inktext transition-colors duration-300 group-hover:border-amber2 group-hover:text-amber2">
                      <e.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-base font-medium uppercase tracking-wide">{e.name}</span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-mut">{e.spec}</span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3D-иллюстрации сервиса */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
            <ScrambleText text="Современный автосервис · технологии будущего" />
          </p>
          <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight lg:text-[2.6rem]">
            <MaskLines lines={[<span key="1">Оборудование,</span>, <span key="2">которому доверяют</span>]} />
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <div className="group card-hover relative overflow-hidden border border-linedark bg-ink-950/70">
              <div className="aspect-square overflow-hidden">
                <img src={SERVICE_3D_1} alt="Современный автосервис с подъёмником" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium uppercase text-amber">Профессиональный подъёмник</h3>
                <p className="mt-2 text-sm leading-relaxed text-mutd">Гидравлический подъёмник грузоподъёмностью до 5 тонн для легковых и коммерческих автомобилей</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="group card-hover relative overflow-hidden border border-linedark bg-ink-950/70">
              <div className="aspect-square overflow-hidden">
                <img src={SERVICE_3D_2} alt="Диагностическое оборудование" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium uppercase text-amber">Компьютерная диагностика</h3>
                <p className="mt-2 text-sm leading-relaxed text-mutd">Дилерские сканеры для точной диагностики всех систем автомобиля</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="group card-hover relative overflow-hidden border border-linedark bg-ink-950/70">
              <div className="aspect-square overflow-hidden">
                <img src={SERVICE_3D_3} alt="Профессиональные инструменты" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium uppercase text-amber">Профессиональный инструмент</h3>
                <p className="mt-2 text-sm leading-relaxed text-mutd">Полный набор инструментов для качественного ремонта любой сложности</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col border border-linedark bg-ink-950/70 p-8 transition-all duration-500 hover:border-amber/60">
              <IconDoc className="h-8 w-8 text-go" />
              <h3 className="mt-5 font-display text-xl font-medium uppercase">Прозрачность работ</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                Фотоотчёт каждого этапа ремонта в MAX. Вы всегда знаете, что происходит с вашим автомобилем.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col border border-linedark bg-ink-950/70 p-8 transition-all duration-500 hover:border-go/60">
              <IconDoc className="h-8 w-8 text-go" />
              <h3 className="mt-5 font-display text-xl font-medium uppercase">Сроки — в акте</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                Дата выдачи фиксируется при приёмке под подпись. Опоздали по своей вине — минус 10% от стоимости работ.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="flex h-full flex-col border border-linedark bg-ink-950/70 p-8 transition-all duration-500 hover:border-steel/60">
              <IconShield className="h-8 w-8 text-steel" />
              <h3 className="mt-5 font-display text-xl font-medium uppercase">Гарантия до 12 мес.</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                От 6 месяцев на работы, до 12 — на капремонт. Показываем заменённые детали при выдаче.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* B2B */}
      <section className="border-t border-linedark bg-ink-950/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 py-16 sm:px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-steel">
              <ScrambleText text="Организациям и юрлицам" />
            </p>
            <h2 className="mt-5 font-display text-2xl font-semibold uppercase leading-tight lg:text-4xl">
              Ваш автопарк — в одних руках
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mutd">
              Договор, безналичный расчёт, закрывающие документы, приоритетная запись и отчёты по каждой машине.
              Приезжайте на аудит парка — бесплатно покажем, где вы переплачиваете.
            </p>
          </div>
          <button
            onClick={() => openBooking()}
            className="group flex items-center gap-3 bg-amber px-8 py-5 font-display text-base font-semibold uppercase tracking-[0.06em] text-ink-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-12px_rgba(245,165,36,0.5)]"
          >
            Заявка на сотрудничество
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </section>
    </>
  );
}
