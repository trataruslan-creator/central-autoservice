<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Автосервис «Центральный» в Истре — качество официального дилера по цене гаражного сервиса. Диагностика, ТО, сход-развал 3D, ремонт двигателя и ходовой. <?php echo esc_attr(APS_ADDRESS); ?>">
<meta name="theme-color" content="#12171e">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="bg-glow" aria-hidden="true"></div>
<div class="noise" aria-hidden="true"></div>

<header class="site-head" id="site-head">
    <div class="head-in">
        <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
            <?php aps_icon('logo'); ?>
            <span><b>Центральный</b><small>автосервис · Истра</small></span>
        </a>

        <nav class="nav" aria-label="Главное меню">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="<?php echo is_front_page() ? 'cur' : ''; ?>">Главная</a>
            <a href="<?php echo esc_url(home_url('/uslugi/')); ?>" class="<?php echo is_page('uslugi') ? 'cur' : ''; ?>">Услуги и цены</a>
            <a href="<?php echo esc_url(home_url('/preimushchestva/')); ?>" class="<?php echo is_page('preimushchestva') ? 'cur' : ''; ?>">Почему мы</a>
            <a href="<?php echo esc_url(home_url('/kontakty/')); ?>" class="<?php echo is_page('kontakty') ? 'cur' : ''; ?>">Контакты</a>
        </nav>

        <div class="head-actions">
            <a class="head-phone" href="<?php echo esc_attr(APS_PHONE_TEL); ?>">
                <span class="pi"><?php aps_icon('phone'); ?></span>
                <span>
                    <b><?php echo esc_html(APS_PHONE_DISPLAY); ?></b>
                    <small class="status-line"><span class="dot"><i></i></span><span class="status-text">…</span></small>
                </span>
            </a>
            <button class="head-cta" data-booking><i></i><span>Записаться</span></button>
            <button class="burger" id="burger" aria-label="Меню" aria-expanded="false"><span></span><span></span></button>
        </div>
    </div>

    <nav class="mnav" id="mnav" aria-label="Мобильное меню">
        <a href="<?php echo esc_url(home_url('/')); ?>">Главная</a>
        <a href="<?php echo esc_url(home_url('/uslugi/')); ?>">Услуги и цены</a>
        <a href="<?php echo esc_url(home_url('/preimushchestva/')); ?>">Почему мы</a>
        <a href="<?php echo esc_url(home_url('/kontakty/')); ?>">Контакты</a>
        <button class="bk" data-booking>Записаться на сервис</button>
        <a href="<?php echo esc_attr(APS_PHONE_TEL); ?>"><?php echo esc_html(APS_PHONE_DISPLAY); ?></a>
    </nav>
</header>

<main id="main">
