import { Reveal, MaskLines, ScrambleText, usePageTitle } from "../components/Reveal";
import { useBooking } from "../components/Layout";
import {
  ArrowUpRight, IconCamera, IconCheck, IconDiag, IconDoc, IconGauge, IconShield, IconWrench, IconAlignment,
} from "../components/Icons";
import { PROCESS } from "../lib/data";
import { ALIGNMENT_IMG, WORKSHOP_IMG } from "../lib/images";

const EQUIPMENT = [
  { icon: IconAlignment, name: "Стенд сход-развала 3D", spec: "оборудование 2024 года · точность до 0.01°" },
  { icon: IconDiag, name: "Дилерские сканеры", spec: "по 60+ параметрам, отчёт распечатываем" },
  { icon: IconGauge, name: "Тормозной стенд", spec: "проверка усилий по осям, нужно для ГОСТа" },
  { icon: IconWrench, name: "4 подъёмника", spec: "до 5 тонн — берём и легковые, и коммерческие" },
];

export default function Why() {
  usePageTitle("Почему мы — Автосервис «Центральный», Истра");
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
            <img src={WORKSHOP_IMG} alt="Ремзона автосервиса: машина на подъёмнике" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mutd">ремзона · пост №2 · камера 03</p>
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-go">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-ring absolute h-full w-full rounded-full bg-go" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-go" />
                </span>
                rec
              </span>
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

      {/* прозрачность */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-5 lg:px-8 lg:py-24">
        <div className="grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <div className="group flex h-full flex-col border border-linedark bg-ink-950/70 p-8 transition-all duration-500 hover:border-amber/60 lg:p-10">
              <div className="flex items-center justify-between">
                <IconCamera className="h-9 w-9 text-amber" />
                <span className="stamp px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-go">онлайн 24/7</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium uppercase leading-snug lg:text-3xl">Видеонаблюдение в ремзоне</h3>
              <p className="mt-4 max-w-2xl flex-1 text-sm leading-relaxed text-mutd lg:text-base">
                Над каждым постом — камера. Сидите в тёплой зоне ожидания с кофе и смотрите на большом экране,
                как разбирают именно вашу машину. Уезжаете — пришлём фотоотчёт ключевых этапов в MAX.
                «Доверяй, но проверяй» — здесь работает в прямом смысле.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-linedark pt-6">
                {["8 камер в ремзоне", "экран в зоне ожидания", "фотоотчёт в MAX"].map((x) => (
                  <p key={x} className="flex items-start gap-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-mutd">
                    <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-go" />
                    {x}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={100}>
              <div className="flex flex-1 flex-col border border-linedark bg-ink-950/70 p-8 transition-all duration-500 hover:border-go/60">
                <IconDoc className="h-8 w-8 text-go" />
                <h3 className="mt-5 font-display text-xl font-medium uppercase">Сроки — в акте</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                  Дата выдачи фиксируется при приёмке под подпись. Опоздали по своей вине — минус 10% от стоимости работ.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex flex-1 flex-col border border-linedark bg-ink-950/70 p-8 transition-all duration-500 hover:border-steel/60">
                <IconShield className="h-8 w-8 text-steel" />
                <h3 className="mt-5 font-display text-xl font-medium uppercase">Гарантия до 12 мес.</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mutd">
                  От 6 месяцев на работы, до 12 — на капремонт. Показываем заменённые детали при выдаче.
                </p>
              </div>
            </Reveal>
          </div>
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
