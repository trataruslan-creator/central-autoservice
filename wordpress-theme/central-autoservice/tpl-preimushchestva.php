<?php
/**
 * Template Name: Почему мы
 */
get_header(); ?>

<section class="wrap" style="padding-top:130px">
    <div class="split">
        <div>
            <p class="eyebrow scr" data-text="Почему «Центральный» · с 2016 года">Почему «Центральный» · с 2016 года</p>
            <h1 class="title mask-only" data-reveal style="margin-top:24px;font-size:clamp(34px,5.5vw,62px)">
                <span class="mline"><span>Мы собрали сервис,</span></span>
                <span class="mline"><span>в который не страшно</span></span>
                <span class="mline"><span class="acc">отдать ключи</span></span>
            </h1>
            <div data-reveal style="margin-top:28px;max-width:560px;display:grid;gap:16px;font-size:15px;line-height:1.65;color:var(--mutd)">
                <p>Автовладельцы Истры годами выбирали между двумя крайностями: дилер с ценником «как крыло от самолёта»
                и гараж, где «мастер дядя Витя, гарантия — рукопожатие». Мы построили третье.</p>
                <p>Современное оборудование и регламенты дилера, цены разумного сервиса и одно правило,
                которое не нарушалось ни разу: <b style="color:var(--star)">клиент всегда понимает, за что платит</b>.</p>
            </div>
        </div>
        <figure class="kb-box kenburns" data-reveal>
            <img src="<?php echo esc_url(APS_IMG_WORKSHOP); ?>" alt="Ремзона автосервиса: машина на подъёмнике">
            <div class="veil"></div>
            <figcaption>
                <span>ремзона · пост №2 · камера 03</span>
                <span class="rec"><span class="dot go"><i></i></span>rec</span>
            </figcaption>
        </figure>
    </div>
</section>

<!-- процесс -->
<section class="wrap sec">
    <div style="max-width:640px">
        <p class="eyebrow scr" data-text="Как проходит визит · 5 шагов">Как проходит визит · 5 шагов</p>
        <h2 class="title mask-only" data-reveal style="margin-top:18px">
            <span class="mline"><span>От заезда до выдачи —</span></span>
            <span class="mline"><span>по полочкам</span></span>
        </h2>
    </div>
    <div class="steps" style="margin-top:56px">
        <?php foreach (APS_PROCESS as $i => $p) : ?>
            <div class="step" data-reveal>
                <span class="num"><?php echo esc_html($p['num']); ?></span>
                <h3><?php echo esc_html($p['title']); ?></h3>
                <p><?php echo esc_html($p['text']); ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- оборудование -->
<section class="sec-light">
    <div class="wrap sec split" style="padding-top:80px;padding-bottom:80px">
        <figure class="kb-box kenburns light" data-reveal>
            <img src="<?php echo esc_url(APS_IMG_ALIGNMENT); ?>" alt="Стенд сход-развала 3D с мишенями на колёсах">
            <span class="tag">стенд 3D · установлен в 2024</span>
        </figure>
        <div>
            <p class="eyebrow scr" data-text="Оборудование · не «на глаз»">Оборудование · не «на глаз»</p>
            <h2 class="title mask-only" data-reveal style="margin-top:18px">
                <span class="mline"><span>Железо, которому</span></span>
                <span class="mline"><span>можно доверить</span></span>
                <span class="mline" style="color:var(--amber2)"><span>свою машину</span></span>
            </h2>
            <p data-reveal style="margin-top:24px;max-width:460px;font-size:14px;line-height:1.65;color:var(--mut)">
                Мы принципиально обновляем парк оборудования: в 2024 поставили новый стенд сход-развала —
                теперь геометрию выставляем с точностью, которой позавидует иной дилер.
            </p>
            <div class="eq">
                <?php foreach (APS_EQUIPMENT as $e) : ?>
                    <div class="eq-row" data-reveal>
                        <span class="ei"><?php aps_icon($e['icon']); ?></span>
                        <span><b><?php echo esc_html($e['name']); ?></b><small><?php echo esc_html($e['spec']); ?></small></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<!-- прозрачность -->
<section class="wrap sec">
    <div class="wide-card">
        <div class="card-big" data-reveal>
            <div class="row1">
                <?php aps_icon('camera', 'big'); ?>
                <span class="stamp">онлайн 24/7</span>
            </div>
            <h3>Видеонаблюдение в ремзоне</h3>
            <p>Над каждым постом — камера. Сидите в тёплой зоне ожидания с кофе и смотрите на большом экране,
            как разбирают именно вашу машину. Уезжаете — пришлём фотоотчёт ключевых этапов в WhatsApp.
            «Доверяй, но проверяй» — здесь работает в прямом смысле.</p>
            <div class="mini3">
                <span><?php aps_icon('check'); ?> 8 камер в ремзоне</span>
                <span><?php aps_icon('check'); ?> экран в зоне ожидания</span>
                <span><?php aps_icon('check'); ?> фотоотчёт в whatsapp</span>
            </div>
        </div>
        <div class="col-stack">
            <div class="card-sm" data-reveal>
                <?php aps_icon('doc'); ?>
                <h3>Сроки — в акте</h3>
                <p>Дата выдачи фиксируется при приёмке под подпись. Опоздали по своей вине — минус 10% от стоимости работ.</p>
            </div>
            <div class="card-sm steel" data-reveal>
                <?php aps_icon('shield'); ?>
                <h3>Гарантия до 12 мес.</h3>
                <p>От 6 месяцев на работы, до 12 — на капремонт. Показываем заменённые детали при выдаче.</p>
            </div>
        </div>
    </div>
</section>

<!-- B2B -->
<section class="sec-darker" style="border-bottom:0">
    <div class="wrap b2b">
        <div style="max-width:640px">
            <p class="eyebrow scr" data-text="Организациям и юрлицам">Организациям и юрлицам</p>
            <h2>Ваш автопарк — в одних руках</h2>
            <p>Договор, безналичный расчёт, закрывающие документы, приоритетная запись и отчёты по каждой машине.
            Приезжайте на аудит парка — бесплатно покажем, где вы переплачиваете.</p>
        </div>
        <button class="btn btn-amber" data-booking>Заявка на сотрудничество <?php aps_icon('arrow','arw'); ?></button>
    </div>
</section>

<?php get_footer(); ?>
