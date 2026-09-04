</main>

<footer class="site-foot">
    <div class="wrap">
        <div class="foot-grid">
            <div>
                <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
                    <?php aps_icon('logo'); ?>
                    <span><b>Центральный</b></span>
                </a>
                <p class="about">Условия и качество ремонта на уровне официального дилера — по цене гаражного сервиса. Работаем с 2016 года.</p>
                <div class="soc">
                    <a href="<?php echo esc_attr(APS_MAX); ?>" target="_blank" rel="noreferrer" aria-label="MAX"><?php aps_icon('max'); ?></a>
                    <a href="<?php echo esc_attr(APS_PHONE_TEL); ?>" aria-label="Телефон"><?php aps_icon('phone'); ?></a>
                    <a href="<?php echo esc_attr(APS_MAPS_URL); ?>" target="_blank" rel="noreferrer" aria-label="Яндекс Карты"><?php aps_icon('pin'); ?></a>
                </div>
            </div>

            <div class="foot-col">
                <h4>Разделы</h4>
                <ul>
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">Главная</a></li>
                    <li><a href="<?php echo esc_url(home_url('/uslugi/')); ?>">Услуги и цены</a></li>
                    <li><a href="<?php echo esc_url(home_url('/preimushchestva/')); ?>">Почему мы</a></li>
                    <li><a href="<?php echo esc_url(home_url('/kontakty/')); ?>">Контакты</a></li>
                    <li><button data-booking>Записаться</button></li>
                </ul>
            </div>

            <div class="foot-col">
                <h4>Режим работы</h4>
                <ul>
                    <li class="hrs"><span>Пн — Сб</span><b>9:00–21:00</b></li>
                    <li class="hrs"><span>Воскресенье</span><b>9:00–18:00</b></li>
                </ul>
                <a class="tel" href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php echo esc_html(APS_PHONE_DISPLAY); ?></a>
            </div>

            <div class="foot-col">
                <h4>Как нас найти</h4>
                <ul>
                    <li class="addr-line"><?php aps_icon('pin'); ?><span><?php echo esc_html(APS_ADDRESS); ?></span></li>
                    <li class="addr-line"><?php aps_icon('clock'); ?><span>5 минут от Истры, парковка у ворот</span></li>
                </ul>
                <a class="map-btn" href="<?php echo esc_attr(APS_MAPS_URL); ?>" target="_blank" rel="noreferrer">
                    Построить маршрут <?php aps_icon('arrow'); ?>
                </a>
            </div>
        </div>
    </div>

    <div class="foot-bottom">
        <div class="wrap in">
            <span>© 2016–<?php echo date('Y'); ?> · Автосервис «Центральный» · Истра</span>
            <span class="live"><i></i>видеонаблюдение ремзоны — онлайн</span>
        </div>
    </div>
</footer>

<!-- Мобильная панель действий -->
<div class="mbar">
    <a href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php aps_icon('phone'); ?><span>Позвонить</span></a>
    <a class="mid" href="<?php echo esc_attr(APS_MAX); ?>" target="_blank" rel="noreferrer"><?php aps_icon('max'); ?><span>MAX</span></a>
    <button class="go" data-booking><?php aps_icon('check'); ?><span>Записаться</span></button>
</div>

<!-- Модалка записи -->
<div class="modal" id="booking-modal" hidden role="dialog" aria-modal="true" aria-label="Запись на сервис">
    <button class="bg" data-close aria-label="Закрыть"></button>
    <div class="modal-box">
        <div class="hazard"></div>
        <div class="modal-head">
            <span>Запись на сервис · ответим за 15 минут</span>
            <button class="modal-x" data-close aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
            <form class="aps-form" data-form="booking" novalidate>
                <div class="field">
                    <label for="m-name">Ваше имя *</label>
                    <input id="m-name" name="name" placeholder="Иван" autocomplete="name">
                    <p class="fmsg" hidden></p>
                </div>
                <div class="field">
                    <label for="m-phone">Телефон *</label>
                    <input id="m-phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" autocomplete="tel">
                    <p class="fmsg" hidden></p>
                </div>
                <div class="f2">
                    <div class="field">
                        <label for="m-brand">Марка авто</label>
                        <select id="m-brand" name="brand">
                            <option value="">Не знаю / другое</option>
                            <?php foreach (APS_BRANDS as $b) : ?>
                                <option><?php echo esc_html($b); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="field">
                        <label for="m-service">Услуга</label>
                        <select id="m-service" name="service">
                            <option value="">Подскажете по телефону</option>
                            <?php foreach (APS_SERVICES as $s) : ?>
                                <option value="<?php echo esc_attr($s['id']); ?>"><?php echo esc_html($s['title']); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="field">
                    <label for="m-comment">Что беспокоит в машине?</label>
                    <textarea id="m-comment" name="comment" rows="2" placeholder="Стук спереди на кочках, горит чек…"></textarea>
                </div>
                <div class="field">
                    <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;text-transform:none;letter-spacing:normal;font-family:var(--fb);font-size:12px;line-height:1.5;color:var(--mutd)">
                        <input type="checkbox" name="agree" style="width:16px;height:16px;margin-top:2px;accent-color:var(--amber)">
                        <span>Согласен на обработку персональных данных. Никакого спама — только звонок мастера-приёмщика.</span>
                    </label>
                    <p class="fmsg" hidden></p>
                </div>
                <button type="submit" class="btn btn-amber">Перезвоните мне <?php aps_icon('arrow', 'arw'); ?></button>
                <p class="modal-foot-link">или сразу: <a href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php echo esc_html(APS_PHONE_DISPLAY); ?></a></p>
            </form>

            <div class="form-ok" data-ok hidden>
                <span class="ok"><?php aps_icon('check'); ?></span>
                <h3>Заявка принята</h3>
                <p class="num">№ <span data-order></span></p>
                <p>Мастер-приёмщик перезвонит в течение 15 минут в рабочее время и согласует удобное окно.</p>
                <button type="button" data-reset>Понятно</button>
            </div>
        </div>
    </div>
</div>

<script>
window.APS_DATA = <?php echo wp_json_encode(aps_js_data()); ?>;
</script>
<?php wp_footer(); ?>
</body>
</html>
