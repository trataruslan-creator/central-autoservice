<?php get_header(); ?>

<!-- ================= ОБЛОЖКА ================= -->
<div class="cover-scene" id="cover" aria-label="Стартовая страница">
    <div class="cover-page" id="cover-page">
        <div class="cover-face">
            <div class="blueprint" style="position:absolute;inset:0"></div>
            <div style="position:absolute;inset:0;background:radial-gradient(800px 520px at 80% -10%,rgba(245,165,36,.12),transparent 60%),radial-gradient(700px 500px at -10% 100%,rgba(127,176,214,.08),transparent 60%);pointer-events:none"></div>
            <div style="position:absolute;inset:0 auto 0 right;width:64px;background:linear-gradient(to left,rgba(0,0,0,.4),transparent);pointer-events:none"></div>
            <div class="hazard" style="height:8px;flex:none"></div>

            <div class="wrap" style="flex:1;display:flex;flex-direction:column;overflow-y:auto;padding-top:40px;padding-bottom:28px;position:relative">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
                    <div style="display:flex;align-items:center;gap:16px">
                        <div class="cover-logo">
                            <svg class="ring spin-slow" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                                <circle cx="50" cy="50" r="47" stroke="currentColor" stroke-width="1.5" stroke-dasharray="6 8"/>
                            </svg>
                            <?php aps_icon('logo'); ?>
                        </div>
                        <div>
                            <p class="mono" style="font-size:10px;text-transform:uppercase;letter-spacing:.32em;color:var(--mutd)">автосервис · Истра</p>
                            <p style="margin-top:4px;font-family:var(--fd);font-weight:600;font-size:20px;text-transform:uppercase;letter-spacing:.08em">Центральный</p>
                        </div>
                    </div>
                    <a class="head-phone" style="display:inline-flex" href="<?php echo esc_attr(APS_PHONE_TEL); ?>">
                        <span class="pi"><?php aps_icon('phone'); ?></span>
                        <span><b><?php echo esc_html(APS_PHONE_DISPLAY); ?></b></span>
                    </a>
                </div>

                <div style="margin-top:52px">
                    <h1 class="title" style="font-size:clamp(42px,9vw,102px)">
                        <span class="anim-fadeup" style="display:block">Ваша машина</span>
                        <span class="anim-fadeup acc" style="display:block;animation-delay:.12s">в надёжных</span>
                        <span class="anim-fadeup" style="display:block;animation-delay:.24s">руках</span>
                    </h1>
                    <p class="anim-fadeup" style="animation-delay:.36s;margin-top:24px;max-width:460px;font-size:15px;line-height:1.65;color:var(--mutd)">
                        Качество официального дилера — по цене гаражного сервиса. Диагностика, ремонт, ТО
                        и сход-развал на стенде 2024 года.
                    </p>
                </div>

                <div class="anim-fadeup" style="animation-delay:.48s;margin-top:auto;padding-top:40px;display:grid;gap:12px" >
                    <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px;border:1px solid var(--line);background:rgba(18,23,30,.7);padding:16px 20px">
                        <span class="c-status status-line"><span class="dot"><i></i></span><span class="status-text">…</span></span>
                        <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px">
                            <?php aps_icon('clock'); ?> Пн–Сб 9:00–21:00 · Вс 9:00–18:00
                        </span>
                    </div>
                    <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;border:1px solid var(--line);background:rgba(18,23,30,.7);padding:16px 20px">
                        <span style="display:inline-flex;align-items:center;gap:8px;font-size:14px">
                            <?php aps_icon('pin'); ?> <?php echo esc_html(APS_ADDRESS); ?>
                        </span>
                        <a class="map-btn" style="margin-top:0" href="<?php echo esc_attr(APS_MAPS_URL); ?>" target="_blank" rel="noreferrer">
                            <?php aps_icon('route'); ?> Показать на карте Яндекс <?php aps_icon('arrow'); ?>
                        </a>
                    </div>
                </div>
            </div>

            <div style="flex:none;border-top:1px solid var(--line);background:rgba(13,17,23,.9);padding:18px 0">
                <div class="wrap" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px">
                    <p class="mono" style="font-size:10px;text-transform:uppercase;letter-spacing:.22em;color:var(--mutd)">
                        листайте — внутри цены, услуги и честный сервис
                    </p>
                    <button class="btn-enter" id="cover-enter">
                        <span data-label>В сервис</span> <?php aps_icon('arrow', 'arw'); ?>
                    </button>
                </div>
            </div>

            <div id="cover-stamp" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;pointer-events:none">
                <span class="stamp-big">Поехали!</span>
            </div>
        </div>

        <div class="cover-back">
            <div class="wm"><span>Центральный</span></div>
            <div class="hazard" style="position:absolute;top:0;left:0;right:0;height:8px;opacity:.6"></div>
            <div class="hazard" style="position:absolute;bottom:0;left:0;right:0;height:8px;opacity:.6"></div>
            <p class="mono" style="position:absolute;bottom:30px;left:50%;transform:translateX(-50%);font-size:10px;text-transform:uppercase;letter-spacing:.3em;color:rgba(22,28,35,.3);white-space:nowrap">
                автосервис · д. Высоково · ул. Центральная, 13
            </p>
        </div>
    </div>
</div>

<!-- ================= ГЛАВНАЯ ================= -->
<section class="wrap" style="padding-top:130px">
    <div style="display:grid;gap:48px;align-items:center" class="hero-grid">
        <div>
            <p class="eyebrow scr" data-text="Автосервис · Истра, д. Высоково">Автосервис · Истра, д. Высоково</p>
            <h1 class="title mask-only" data-reveal style="margin-top:24px;font-size:clamp(36px,6.2vw,74px)">
                <span class="mline"><span>Качество дилера.</span></span>
                <span class="mline"><span>Цена — <span class="acc">гаража.</span></span></span>
                <span class="mline"><span>Честность — наша.</span></span>
            </h1>
            <div data-reveal style="margin-top:28px;max-width:600px">
                <p style="font-size:15px;line-height:1.65;color:var(--mutd)">
                    Диагностика на дилерских сканерах, сход-развал на стенде 2024 года, сроки — в акте под подпись,
                    а ремзона — под камерами, которые видно из зоны ожидания. 51 марка, от Lada до Zeekr.
                </p>
            </div>
            <div data-reveal style="margin-top:36px;display:flex;flex-wrap:wrap;gap:16px">
                <button class="btn btn-amber" data-booking>Записаться на сервис <?php aps_icon('arrow','arw'); ?></button>
                <a class="btn btn-ghost" href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php aps_icon('phone'); ?> <?php echo esc_html(APS_PHONE_DISPLAY); ?></a>
            </div>
            <div data-reveal style="margin-top:40px;display:flex;flex-wrap:wrap;gap:10px">
                <?php foreach (array('Техосмотр по ГОСТу','Сход-развал 3D · 2024','Видеонаблюдение ремзоны','Акт со сроком выдачи') as $chip) : ?>
                    <span style="display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);background:rgba(13,17,23,.5);padding:9px 14px;font-family:var(--fm);font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:var(--mutd)">
                        <?php aps_icon('check'); ?><?php echo esc_html($chip); ?>
                    </span>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <!-- табло ремзоны -->
    <div data-reveal style="margin-top:56px;max-width:760px">
        <div class="board" id="board">
            <div class="hazard"></div>
            <div class="board-head">
                <span class="t"><span class="dot go"><i></i></span>Ремзона · сейчас в работе</span>
                <span class="cam">камеры онлайн</span>
            </div>
            <div id="board-rows">
                <?php foreach (APS_JOBS as $i => $j) : ?>
                    <div class="board-row" data-i="<?php echo (int) $i; ?>">
                        <div style="min-width:0">
                            <p class="car"><?php echo esc_html($j['car']); ?></p>
                            <p class="job"><?php echo esc_html($j['job']); ?></p>
                        </div>
                        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
                            <span class="st st-<?php echo (int) $j['stage']; ?>"><?php echo esc_html(APS_STAGES[$j['stage']]); ?></span>
                            <span class="prog"><i class="<?php echo $j['stage'] === 3 ? 'done' : 'run'; ?>"></i></span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="board-foot">
                <span>обновлено только что</span>
                <span class="dots"><i></i><i></i><i></i></span>
            </div>
        </div>
    </div>

    <!-- счётчики -->
    <div class="stats">
        <?php foreach (APS_STATS as $i => $s) : ?>
            <div class="stat" data-reveal>
                <b><span class="cnt" data-to="<?php echo (int) $s['value']; ?>">0</span><?php if ($s['suffix']) : ?><em><?php echo esc_html($s['suffix']); ?></em><?php endif; ?></b>
                <p><?php echo esc_html($s['label']); ?></p>
                <small><?php echo esc_html($s['note']); ?></small>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- бегущие марки -->
<div style="margin-top:64px">
    <?php for ($row = 0; $row < 2; $row++) : $slice = array_slice(APS_BRANDS, $row ? 25 : 0, $row ? null : 25); ?>
        <div class="ticker <?php echo $row ? 'rev' : ''; ?>">
            <div class="ticker-track">
                <?php for ($d = 0; $d < 2; $d++) : foreach ($slice as $b) : ?>
                    <span><?php echo esc_html($b); ?></span>
                <?php endforeach; endfor; ?>
            </div>
        </div>
    <?php endfor; ?>
</div>

<!-- популярные услуги -->
<section class="sec-light">
    <div class="wrap sec" style="padding-top:80px;padding-bottom:80px">
        <div class="sec-head">
            <div>
                <p class="eyebrow scr" data-text="Прайс-ведомость · 14 видов работ">Прайс-ведомость · 14 видов работ</p>
                <h2 class="title mask-only" data-reveal>
                    <span class="mline"><span>С чем приезжают</span></span>
                    <span class="mline"><span>чаще всего</span></span>
                </h2>
            </div>
            <a class="link-more" href="<?php echo esc_url(home_url('/uslugi/')); ?>">Все услуги и цены <?php aps_icon('arrow'); ?></a>
        </div>

        <div>
            <?php foreach (APS_SERVICES as $s) : if (!$s['pop']) continue; ?>
                <button class="svc" data-booking data-service="<?php echo esc_attr($s['id']); ?>" data-reveal>
                    <span class="svc-ico"><?php aps_icon($s['icon']); ?></span>
                    <span>
                        <span class="svc-name"><?php echo esc_html($s['title']); ?></span>
                        <span class="svc-time"><?php echo esc_html($s['time']); ?></span>
                    </span>
                    <span class="svc-short"><?php echo esc_html($s['short']); ?></span>
                    <span class="svc-price"><b><?php echo aps_price($s['price']); ?></b><small>от · с запчастями уточним</small></span>
                </button>
            <?php endforeach; ?>
        </div>

        <div class="svc-note" data-reveal>
            <p>Не нашли свою работу? Позвоните — скажем цену по телефону за пару минут, а не «посмотрим, перезвоним».</p>
            <a href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php echo esc_html(APS_PHONE_DISPLAY); ?> <?php aps_icon('phone'); ?></a>
        </div>
    </div>
</section>

<!-- калькулятор -->
<section class="wrap sec">
    <?php get_template_part('partials/estimator'); ?>
</section>

<!-- сравнение -->
<section class="sec-light">
    <div class="wrap sec" style="padding-top:80px;padding-bottom:80px">
        <div style="max-width:640px">
            <p class="eyebrow scr" data-text="Главный вопрос автовладельца">Главный вопрос автовладельца</p>
            <h2 class="title mask-only" data-reveal style="margin-top:18px">
                <span class="mline"><span>Дилер дорого.</span></span>
                <span class="mline"><span>В гараже — страшно.</span></span>
                <span class="mline" style="color:var(--amber2)"><span>Есть третий вариант.</span></span>
            </h2>
        </div>
        <div class="cmp-wrap" data-reveal style="margin-top:48px">
            <table class="cmp">
                <thead>
                    <tr>
                        <th class="crit">Критерий</th>
                        <th class="name">Официальный дилер</th>
                        <th class="name">Гараж у дома</th>
                        <th class="name hl">«Центральный»</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach (APS_COMPARE as $r) : ?>
                        <tr>
                            <td class="crit"><?php echo esc_html($r['crit']); ?></td>
                            <td><?php echo esc_html($r['dealer']); ?></td>
                            <td><?php echo esc_html($r['garage']); ?></td>
                            <td class="hl"><?php echo esc_html($r['central']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</section>

<!-- предложения -->
<section class="wrap sec">
    <p class="eyebrow scr" data-text="Спецпредложения сервиса">Спецпредложения сервиса</p>
    <h2 class="title mask-only" data-reveal style="margin-top:18px;font-size:clamp(26px,4vw,42px)">
        <span class="mline"><span>Не только ремонт</span></span>
    </h2>
    <div class="offers" style="margin-top:44px">
        <div class="offer o-amber" data-reveal>
            <div class="bar"></div>
            <div class="in">
                <?php aps_icon('checklist', 'big'); ?>
                <h3>Подготовка к техосмотру по ГОСТу</h3>
                <p>Пройдём с вами весь чек-лист: свет, тормоза, рулевое, выхлоп. Устраняем замечания на месте — диагностическую карту получаете с первого раза.</p>
                <div class="foot"><b>от <?php echo aps_price(3500); ?></b><button data-booking data-service="gost">записаться →</button></div>
            </div>
        </div>
        <div class="offer o-steel" data-reveal>
            <div class="bar"></div>
            <div class="in">
                <?php aps_icon('wash', 'big'); ?>
                <h3>Автомагазин: запчасти под заказ</h3>
                <p>Оригиналы и проверенные аналоги по доступным ценам. Привозим за 1–3 дня, ставим здесь же — гарантия и на деталь, и на работу.</p>
                <div class="foot"><b>1–3 дня</b><a href="<?php echo esc_attr(APS_WHATSAPP); ?>" target="_blank" rel="noreferrer">заказать в whatsapp →</a></div>
            </div>
        </div>
        <div class="offer o-go" data-reveal>
            <div class="bar"></div>
            <div class="in">
                <?php aps_icon('doc', 'big'); ?>
                <h3>Обслуживание автопарков для юрлиц</h3>
                <p>Договор, безнал, закрывающие документы, приоритетная запись и персональный менеджер. Ваш парк в одном месте — с отчётами по каждой машине.</p>
                <div class="foot"><b>договор + НДС</b><button data-booking>обсудить →</button></div>
            </div>
        </div>
    </div>
</section>

<!-- прозрачность -->
<section class="sec-darker">
    <div class="wrap sec promises" style="padding-top:80px;padding-bottom:80px">
        <?php
        $promises = array(
            array('icon'=>'camera','t'=>'Ремзона под камерами','x'=>'Смотрите за ремонтом из тёплой зоны ожидания на большом экране — или по фотоотчёту в WhatsApp. Скрывать нам нечего, буквально.'),
            array('icon'=>'doc','t'=>'Акт со сроком выдачи','x'=>'При приёмке фиксируем работы, запчасти и дату выдачи под подпись. Опоздали по своей вине — скидка 10% на работу.'),
            array('icon'=>'shield','t'=>'Гарантия до 12 месяцев','x'=>'От 6 месяцев на все работы, до 12 — на капремонт двигателя и КПП. Условия прописаны в заказ-наряде, а не «на словах».'),
        );
        foreach ($promises as $p) : ?>
            <div class="promise" data-reveal>
                <span class="pi"><?php aps_icon($p['icon']); ?></span>
                <h3><?php echo esc_html($p['t']); ?></h3>
                <p><?php echo esc_html($p['x']); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- отзывы -->
<section class="wrap sec">
    <div class="sec-head">
        <div>
            <p class="eyebrow scr" data-text="Отзывы клиентов · без купюр">Отзывы клиентов · без купюр</p>
            <h2 class="title mask-only" data-reveal>
                <span class="mline"><span>Что говорят те,</span></span>
                <span class="mline"><span>кто уже приезжал</span></span>
            </h2>
        </div>
        <div class="rev-nav">
            <button id="rev-prev" aria-label="Предыдущий отзыв"><?php aps_icon('arrow'); ?></button>
            <button id="rev-next" aria-label="Следующий отзыв"><?php aps_icon('arrow'); ?></button>
        </div>
    </div>

    <div class="rev-grid" data-reveal>
        <figure class="rev-main" id="rev-main">
            <?php foreach (APS_REVIEWS as $i => $r) : ?>
                <div class="rev-slide <?php echo $i === 0 ? 'active' : ''; ?>" data-i="<?php echo (int) $i; ?>">
                    <div class="rev-stars"><?php for ($k = 0; $k < 5; $k++) aps_icon('star'); ?></div>
                    <blockquote>«<?php echo esc_html($r['text']); ?>»</blockquote>
                    <figcaption class="rev-who">
                        <span class="rev-ava"><?php echo esc_html(mb_substr($r['name'], 0, 1)); ?></span>
                        <span><b><?php echo esc_html($r['name']); ?></b><small><?php echo esc_html($r['car']); ?> · <?php echo esc_html($r['service']); ?></small></span>
                    </figcaption>
                </div>
            <?php endforeach; ?>
        </figure>
        <div class="rev-thumbs" id="rev-thumbs">
            <?php foreach (APS_REVIEWS as $i => $r) : ?>
                <button class="rev-thumb <?php echo $i === 0 ? 'on' : ''; ?>" data-i="<?php echo (int) $i; ?>">
                    <span><b><?php echo esc_html($r['name']); ?></b><small><?php echo esc_html($r['car']); ?></small></span>
                    <span class="n"><?php echo str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT); ?></span>
                </button>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- партнёры + призыв -->
<section class="sec-darker" style="border-bottom:0">
    <div class="wrap sec">
        <p class="eyebrow scr" data-text="Партнёры «Центрального»">Партнёры «Центрального»</p>
        <div class="partners" style="margin-top:36px">
            <?php foreach (APS_PARTNERS as $p) : ?>
                <a class="partner" data-reveal href="<?php echo esc_url($p['url']); ?>" target="_blank" rel="noreferrer">
                    <span>
                        <small><?php echo esc_html($p['tag']); ?></small>
                        <h3><?php echo esc_html($p['name']); ?></h3>
                        <p><?php echo esc_html($p['desc']); ?></p>
                    </span>
                    <?php aps_icon('arrow'); ?>
                </a>
            <?php endforeach; ?>
        </div>

        <div class="cta-band" data-reveal>
            <svg class="deco" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
                <path d="M-10 110 C 120 100, 160 60, 260 55 S 460 60, 610 10" fill="none" stroke="#f5a524" stroke-width="2" class="dashline"/>
            </svg>
            <div class="in">
                <div>
                    <p class="eyebrow scr" data-text="Машина сама не починится">Машина сама не починится</p>
                    <h2 class="title" style="margin-top:16px">Запишитесь сейчас —<br>диагностикой займёмся мы</h2>
                    <p class="addr"><?php aps_icon('pin'); ?> <?php echo esc_html(APS_ADDRESS); ?></p>
                </div>
                <div class="cta-btns">
                    <button class="btn btn-amber" data-booking>Записаться <?php aps_icon('arrow','arw'); ?></button>
                    <a class="btn btn-go" href="<?php echo esc_attr(APS_WHATSAPP); ?>" target="_blank" rel="noreferrer"><?php aps_icon('whatsapp'); ?> Написать в WhatsApp</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>
