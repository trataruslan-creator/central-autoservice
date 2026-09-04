<?php
/**
 * Template Name: Контакты
 */
get_header();
$today = (int) date('w');
?>

<section class="wrap" style="padding-top:130px">
    <div style="max-width:760px">
        <p class="eyebrow scr" data-text="Контакты · Истра, 5 минут от города">Контакты · Истра, 5 минут от города</p>
        <h1 class="title mask-only" data-reveal style="margin-top:24px;font-size:clamp(34px,5.5vw,62px)">
            <span class="mline"><span>Заезжайте —</span></span>
            <span class="mline"><span>мы на <span class="acc">Центральной</span></span></span>
        </h1>
    </div>

    <div class="c-grid">
        <!-- статус -->
        <div class="c-card" data-reveal>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px">
                <span class="lbl">Сейчас в сервисе</span>
                <span class="c-status status-line"><span class="dot"><i></i></span><span class="status-text">…</span></span>
            </div>
            <p class="clock" data-clock>--:--<em>:--</em></p>
            <p class="mono" data-status-label style="margin-top:8px;font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--mutd)">…</p>
            <div class="c-btns">
                <a class="c-btn tel" href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php aps_icon('phone'); ?><b><?php echo esc_html(APS_PHONE_DISPLAY); ?></b></a>
                <a class="c-btn wa" href="<?php echo esc_attr(APS_MAX); ?>" target="_blank" rel="noreferrer"><?php aps_icon('max'); ?><b>MAX</b></a>
            </div>
        </div>

        <!-- адрес -->
        <div class="c-card" data-reveal>
            <span class="lbl"><?php aps_icon('pin'); ?> Адрес</span>
            <p class="addr"><?php echo esc_html(APS_ADDRESS); ?></p>
            <p class="note">Ориентир: въезд в деревню Высоково, серое здание с оранжевой полосой. Парковка у ворот — бесплатная.</p>
            <a class="map-btn" href="<?php echo esc_attr(APS_MAPS_URL); ?>" target="_blank" rel="noreferrer">
                Построить маршрут <?php aps_icon('arrow'); ?>
            </a>
        </div>

        <!-- режим -->
        <div class="c-card" data-reveal>
            <span class="lbl"><?php aps_icon('clock'); ?> Режим работы</span>
            <ul style="margin-top:16px">
                <?php foreach (array(1,2,3,4,5,6,0) as $d) : $h = APS_HOURS[$d]; ?>
                    <li class="row <?php echo $d === $today ? 'today' : ''; ?>">
                        <span><?php echo esc_html($h[0]); ?><?php echo $d === $today ? ' · сегодня' : ''; ?></span>
                        <b><?php echo esc_html($h[1]); ?></b>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</section>

<!-- карта + форма -->
<section class="wrap" style="padding:64px 20px">
    <div class="k2">
        <div>
            <div class="map-card" data-reveal>
                <div class="blueprint" style="position:absolute;inset:0"></div>
                <svg class="map" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <path d="M-10 320 C 90 300, 130 260, 200 250 S 330 240, 380 190 S 430 110, 510 80" fill="none" stroke="#2b3644" stroke-width="14" stroke-linecap="round"/>
                    <path d="M-10 320 C 90 300, 130 260, 200 250 S 330 240, 380 190 S 430 110, 510 80" fill="none" stroke="#f5a524" stroke-width="1.6" class="dashline" opacity="0.8"/>
                    <path d="M40 60 L 130 130 L 120 230" fill="none" stroke="#2b3644" stroke-width="8" stroke-linecap="round"/>
                    <path d="M330 360 L 340 280 L 380 190" fill="none" stroke="#2b3644" stroke-width="8" stroke-linecap="round"/>
                    <circle cx="380" cy="190" r="26" fill="none" stroke="#f5a524" stroke-width="1.5" opacity="0.35"/>
                    <circle cx="380" cy="190" r="12" fill="#f5a524" opacity="0.18"/>
                    <circle cx="380" cy="190" r="5" fill="#f5a524"/>
                    <text x="380" y="150" text-anchor="middle" fill="#8b98a7" font-size="11" font-family="JetBrains Mono, monospace" letter-spacing="2">ЦЕНТРАЛЬНАЯ, 13</text>
                    <text x="60" y="42" fill="#55616e" font-size="10" font-family="JetBrains Mono, monospace" letter-spacing="2">← ИСТРА, 5 МИН</text>
                    <text x="290" y="382" fill="#55616e" font-size="10" font-family="JetBrains Mono, monospace" letter-spacing="2">НОВОРИЖСКОЕ Ш. →</text>
                </svg>
                <div class="foot">
                    <span class="coords"><?php echo esc_html(APS_COORDS); ?></span>
                    <a class="map-cta" href="<?php echo esc_attr(APS_MAPS_URL); ?>" target="_blank" rel="noreferrer">
                        <?php aps_icon('route'); ?> Открыть в Яндекс Картах
                    </a>
                </div>
            </div>

            <div class="routes">
                <div class="route" data-reveal>
                    <?php aps_icon('route'); ?>
                    <p><b>Из Истры:</b> по Волоколамскому шоссе в сторону Высоково, 5 минут, указатель на сервис.</p>
                </div>
                <div class="route" data-reveal>
                    <?php aps_icon('camera'); ?>
                    <p><b>С Новорижского:</b> съезд на Истру, дальше по указателям «д. Высоково».</p>
                </div>
            </div>
        </div>

        <div data-reveal>
            <div class="form-card" data-formwrap>
                <p class="eyebrow scr" data-text="Запись на визит">Запись на визит</p>
                <h2 class="title">Забронируйте окно в ремзоне</h2>
                <form class="aps-form" data-form="contact" novalidate style="margin-top:28px">
                    <div class="f2">
                        <div class="field">
                            <label for="c-name">Имя *</label>
                            <input id="c-name" name="name" placeholder="Иван" autocomplete="name">
                            <p class="fmsg" hidden></p>
                        </div>
                        <div class="field">
                            <label for="c-phone">Телефон *</label>
                            <input id="c-phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel">
                            <p class="fmsg" hidden></p>
                        </div>
                    </div>
                    <div class="f2">
                        <div class="field">
                            <label for="c-brand">Марка</label>
                            <select id="c-brand" name="brand">
                                <option value="">Не знаю</option>
                                <?php foreach (APS_BRANDS as $b) : ?><option><?php echo esc_html($b); ?></option><?php endforeach; ?>
                            </select>
                        </div>
                        <div class="field">
                            <label for="c-service">Услуга</label>
                            <select id="c-service" name="service">
                                <option value="">Подскажете по телефону</option>
                                <?php foreach (APS_SERVICES as $s) : ?>
                                    <option value="<?php echo esc_attr($s['id']); ?>"><?php echo esc_html($s['title']); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                    <div class="field">
                        <label for="c-comment">Что с машиной?</label>
                        <textarea id="c-comment" name="comment" rows="3" placeholder="Опишите симптомы: стук, скрип, горит лампочка…"></textarea>
                    </div>
                    <button type="submit" class="btn btn-amber">Записаться <?php aps_icon('arrow','arw'); ?></button>
                    <p class="fine">нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
                </form>
            </div>

            <div class="form-ok" data-ok hidden style="min-height:420px">
                <span class="ok"><?php aps_icon('check'); ?></span>
                <h3>Заявка принята</h3>
                <p class="num">№ <span data-order></span></p>
                <p>Перезвоним в течение 15 минут в рабочее время и подберём удобное окно заезда.</p>
                <button type="button" data-reset>Отправить ещё одну</button>
            </div>
        </div>
    </div>
</section>

<!-- быстрый призыв -->
<section class="wrap" style="padding-bottom:40px">
    <div data-reveal style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;border:1px solid var(--line);background:rgba(13,17,23,.7);padding:32px">
        <div>
            <p style="font-family:var(--fd);font-weight:500;font-size:22px;text-transform:uppercase">Срочный вопрос по машине?</p>
            <p style="margin-top:6px;font-size:14px;color:var(--mutd)">Мастер-приёмщик на связи в рабочее время — без роботов и очередей.</p>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px">
            <a class="btn btn-ghost" style="border-color:rgba(245,165,36,.6);color:var(--amber)" href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php aps_icon('phone'); ?> <?php echo esc_html(APS_PHONE_DISPLAY); ?></a>
            <button class="btn btn-ghost" data-booking>Заказать звонок</button>
        </div>
    </div>
</section>

<?php get_footer(); ?>
