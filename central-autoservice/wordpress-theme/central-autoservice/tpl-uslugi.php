<?php
/**
 * Template Name: Услуги и цены
 */
get_header(); ?>

<section class="wrap" style="padding-top:130px">
    <div style="max-width:760px">
        <p class="eyebrow scr" data-text="Прайс-ведомость · все работы и цены">Прайс-ведомость · все работы и цены</p>
        <h1 class="title mask-only" data-reveal style="margin-top:24px;font-size:clamp(34px,6vw,64px)">
            <span class="mline"><span>Услуги и цены —</span></span>
            <span class="mline"><span class="acc">как на ладони</span></span>
        </h1>
        <p data-reveal style="margin-top:24px;max-width:600px;font-size:15px;line-height:1.65;color:var(--mutd)">
            Честные «от» за работу. Запчасти — на выбор: оригинал или проверенный аналог.
            Точную смету зафиксируем в акте до начала ремонта.
        </p>
    </div>
</section>

<section class="wrap" style="padding:56px 20px 0">
    <div class="filters" data-reveal>
        <button class="fbtn on" data-cat="all">Все</button>
        <?php foreach (APS_CATS as $key => $label) : ?>
            <button class="fbtn" data-cat="<?php echo esc_attr($key); ?>"><?php echo esc_html($label); ?></button>
        <?php endforeach; ?>
        <span class="search">
            <input type="search" id="svc-search" placeholder="Найти услугу…" aria-label="Поиск услуги">
        </span>
    </div>

    <div id="svc-list">
        <?php foreach (APS_SERVICES as $s) : ?>
            <div class="svc-row-x" data-cat="<?php echo esc_attr($s['cat']); ?>" data-title="<?php echo esc_attr(mb_strtolower($s['title'])); ?>" data-reveal>
                <button class="svc svc-toggle" aria-expanded="false">
                    <span class="svc-ico"><?php aps_icon($s['icon']); ?></span>
                    <span>
                        <span class="svc-name" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
                            <?php echo esc_html($s['title']); ?>
                            <?php if ($s['pop']) : ?><span class="badge-pop">популярно</span><?php endif; ?>
                        </span>
                        <span class="svc-time"><?php echo esc_html($s['time']); ?> · <?php echo esc_html(APS_CATS[$s['cat']]); ?></span>
                    </span>
                    <span class="svc-price"><b><?php echo aps_price($s['price']); ?></b><small><?php echo esc_html($s['note'] ?? 'от · работа'); ?></small></span>
                </button>
                <div class="svc-x-body">
                    <div class="svc-x-inner">
                        <div>
                            <div>
                                <p style="font-size:14px;line-height:1.6;color:var(--mutd);margin-bottom:16px"><?php echo esc_html($s['short']); ?></p>
                                <ul class="svc-inc">
                                    <?php foreach ($s['inc'] as $inc) : ?>
                                        <li><?php aps_icon('check'); ?> <?php echo esc_html($inc); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                            <button class="btn btn-amber" data-booking data-service="<?php echo esc_attr($s['id']); ?>" style="white-space:nowrap">
                                Записаться на эту работу <?php aps_icon('arrow','arw'); ?>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<section class="wrap sec">
    <?php get_template_part('partials/estimator'); ?>
</section>

<section class="wrap" style="padding-bottom:96px">
    <div style="max-width:560px;margin-bottom:40px">
        <p class="eyebrow scr" data-text="Частые вопросы">Частые вопросы</p>
        <h2 class="title mask-only" data-reveal style="margin-top:18px">
            <span class="mline"><span>Спрашивают</span></span>
            <span class="mline"><span>перед визитом</span></span>
        </h2>
    </div>
    <div style="max-width:860px">
        <?php foreach (APS_FAQS as $i => $f) : ?>
            <div class="faq-item <?php echo $i === 0 ? 'open' : ''; ?>" data-reveal>
                <button class="faq-q" aria-expanded="<?php echo $i === 0 ? 'true' : 'false'; ?>">
                    <span style="display:flex;align-items:center;min-width:0">
                        <span class="qn"><?php echo str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT); ?></span>
                        <span class="qt"><?php echo esc_html($f['q']); ?></span>
                    </span>
                    <span class="pl"></span>
                </button>
                <div class="faq-a"><div><p><?php echo esc_html($f['a']); ?></p></div></div>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<?php get_footer(); ?>
