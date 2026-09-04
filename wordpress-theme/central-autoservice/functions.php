<?php
/**
 * Тема «Центральный» — автосервис (Истра)
 * Без jQuery: все интерактивы на нативном JS (assets/js/theme.js).
 */

if (!defined('ABSPATH')) exit;

/* ============================================================
   НАСТРОЙКИ СЕРВИСА — измените под себя
   ============================================================ */
define('APS_PHONE_DISPLAY', '+7 (950) 599-83-83');
define('APS_PHONE_TEL',     'tel:+79505998383');
define('APS_MAX',           'https://max.ru/+79505998383');
define('APS_ADDRESS',       'Истринский р-н, д. Высоково, ул. Центральная, 13');
define('APS_MAPS_URL',      'https://yandex.ru/maps/-/CHQHM4nV');
define('APS_COORDS',        '55.906026, 36.936802');

require get_template_directory() . '/inc/data.php';

/* ============================================================
   Базовая настройка темы
   ============================================================ */
function aps_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));
    register_nav_menus(array('primary' => __('Главное меню', 'central')));
}
add_action('after_setup_theme', 'aps_setup');

function aps_scripts() {
    wp_enqueue_style(
        'aps-fonts',
        'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap',
        array(),
        null
    );
    wp_enqueue_style('aps-style', get_stylesheet_uri(), array(), wp_get_theme()->get('Version'));
    wp_enqueue_script('aps-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), wp_get_theme()->get('Version'), true);
}
add_action('wp_enqueue_scripts', 'aps_scripts');

/* Фавиконка */
function aps_favicon() {
    echo '<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'%3E%3Cpath d=\'M16 3l11 6.5v13L16 29 5 22.5v-13z\' fill=\'%23f5a524\'/%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'5.5\' fill=\'%2312171e\'/%3E%3Ccircle cx=\'16\' cy=\'16\' r=\'2\' fill=\'%23f5a524\'/%3E%3C/svg%3E">' . "\n";
}
add_action('wp_head', 'aps_favicon');

/* Форматирование цены: 4 500 ₽ */
function aps_price($n) {
    return number_format((float) $n, 0, ',', ' ') . ' ₽';
}

/* ============================================================
   Иконки (inline SVG, без внешних библиотек)
   ============================================================ */
function aps_svg($name) {
    $icons = array(
        'phone'     => '<path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 5.6A1.5 1.5 0 0 1 5 4z"/>',
        'max'       => '<path d="M12 3.5c4.7 0 8.5 3.2 8.5 7.2s-3.8 7.2-8.5 7.2c-.9 0-1.8-.1-2.6-.4L4.5 19l1-3.3c-1.2-1.2-2-2.9-2-5 0-4 3.8-7.2 8.5-7.2z"/><path d="M8 13.5v-4l2.4 2.6 2.4-2.6 1.2 1.4v2.6"/>',
        'pin'       => '<path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
        'clock'     => '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/>',
        'route'     => '<circle cx="6" cy="18.5" r="2"/><circle cx="18" cy="5.5" r="2"/><path d="M8 18.5h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" stroke-dasharray="3.5 3"/>',
        'arrow'     => '<path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15"/>',
        'check'     => '<path d="M4.5 12.5 10 18 19.5 7"/>',
        'camera'    => '<rect x="3" y="6.5" width="13" height="11" rx="1.5"/><path d="M16 10.5 21 8v8l-5-2.5"/><circle cx="9.5" cy="12" r="2.6"/>',
        'doc'       => '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 8.5h2"/>',
        'shield'    => '<path d="M12 3 5 5.5v6c0 4.5 3 7.6 7 9.5 4-1.9 7-5 7-9.5v-6z"/><path d="M9 11.5l2 2 4-4.5"/>',
        'wrench'    => '<path d="M14.7 6.2a4 4 0 0 1 4.9-3.8l-2.6 2.6.7 2.6 2.6.7 2.6-2.6a4 4 0 0 1-5.2 4.9l-7.3 7.3a1.8 1.8 0 1 1-2.5-2.5l7.3-7.3z" transform="scale(0.86) translate(1.4,1.6)"/>',
        'gauge'     => '<path d="M4 17.5a8.5 8.5 0 1 1 16 0"/><path d="M12 13.5 15.5 9"/><circle cx="12" cy="14.5" r="1.4"/>',
        'alignment' => '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22"/><path d="M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" opacity="0.6"/>',
        'diag'      => '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M7 8h4M7 11h7M15 8h2"/><path d="M9 16v2.5A2.5 2.5 0 0 0 11.5 21h1A2.5 2.5 0 0 0 15 18.5V16"/>',
        'oil'       => '<path d="M12 3.5s-5.5 6.2-5.5 10a5.5 5.5 0 0 0 11 0c0-3.8-5.5-10-5.5-10z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.5"/>',
        'suspension'=> '<path d="M12 2v3M12 19v3M7 5h10M7 17h10"/><path d="M8.5 7l7 1.6-7 1.7 7 1.7-7 1.7 7 1.6"/>',
        'steering'  => '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="M3.5 12h6.3M14.2 12h6.3M12 14.2V20.5"/>',
        'engine'    => '<path d="M7 7V5h4v2M9 5V3.5"/><path d="M5 9H3v6h2M21 10h-1.5l-2-2h-5L10 10.5V16l2.5 2H17l2-2h2z"/><path d="M12.5 12.5h3M12.5 15h3" opacity="0.6"/>',
        'gearbox'   => '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v8M12 8v8M18 8v5.5a2.5 2.5 0 0 1-2.5 2.5H14"/>',
        'brake'     => '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="6.6" r="0.5" fill="currentColor"/><circle cx="16.7" cy="9.3" r="0.5" fill="currentColor"/><circle cx="16.7" cy="14.7" r="0.5" fill="currentColor"/><circle cx="12" cy="17.4" r="0.5" fill="currentColor"/><circle cx="7.3" cy="14.7" r="0.5" fill="currentColor"/><circle cx="7.3" cy="9.3" r="0.5" fill="currentColor"/>',
        'exhaust'   => '<path d="M3 15h6l2-3h5a3 3 0 0 1 3 3v1H3z"/><path d="M6.5 8.5c1-.8 2-.8 3 0s2 .8 3 0M15 5.5c.8-.6 1.6-.6 2.4 0" opacity="0.7"/>',
        'bolt'      => '<path d="M13 2 5 13h5l-1.5 9L18 10h-5.5z"/>',
        'wash'      => '<path d="M4 14l1.6-4.2A2 2 0 0 1 7.5 8.5h9a2 2 0 0 1 1.9 1.3L20 14"/><path d="M3 14h18v4h-2.2M5.2 18H3v-4"/><circle cx="7.5" cy="18" r="1.8"/><circle cx="16.5" cy="18" r="1.8"/><path d="M12 3v1.5M9 4.5l.7 1.2M15 4.5l-.7 1.2" opacity="0.7"/>',
        'tire'      => '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 7.5V4M16 10l2.9-2M16 14l2.9 2M12 16.5V20M8 14l-2.9 2M8 10l-2.9-2" opacity="0.7"/>',
        'checklist' => '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M8.5 8l1.2 1.2L12 7M8.5 13l1.2 1.2L12 12M8.5 17.5h7M14.5 8h1.5M14.5 13h1.5"/>',
        'presale'   => '<path d="M4 15l1.4-3.8A2 2 0 0 1 7.3 10h6.9a2 2 0 0 1 1.9 1.4L17 15"/><path d="M3 15h18v3.5h-2M5 18.5H3V15"/><circle cx="7.2" cy="18.5" r="1.7"/><circle cx="16.8" cy="18.5" r="1.7"/><path d="M18.5 4.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L16 6.5l1.5-.5z"/>',
        'star'      => '<path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" fill="currentColor" stroke="none"/>',
        'logo'      => '<path d="M20 3l14 8v16L20 37 6 27V11z" fill="currentColor" opacity="0.14"/><path d="M20 3l14 8v16L20 37 6 27V11z"/><path d="M25.5 14.5a4.5 4.5 0 0 1-6 5.6l-4.6 4.6a1.9 1.9 0 0 1-2.7-2.7l4.6-4.6a4.5 4.5 0 0 1 5.6-6l-2.6 2.6 3.1 3.1z"/>',
    );
    $inner = isset($icons[$name]) ? $icons[$name] : '';
    $vb = ($name === 'logo') ? '0 0 40 40' : '0 0 24 24';
    return '<svg viewBox="' . $vb . '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $inner . '</svg>';
}

function aps_icon($name, $cls = '') {
    $svg = aps_svg($name);
    if ($cls !== '') {
        $svg = str_replace('<svg ', '<svg class="' . esc_attr($cls) . '" ', $svg);
    }
    echo $svg;
}

/* Данные для JS (калькулятор, режим работы) */
function aps_js_data() {
    $services = array();
    foreach (APS_SERVICES as $s) {
        $services[$s['id']] = $s['price'];
    }
    $hours = array();
    foreach (APS_HOURS as $d => $h) {
        $hours[(string) $d] = $h[2]; // «9-21»
    }
    return array(
        'services' => $services,
        'premium'  => APS_PREMIUM,
        'budget'   => APS_BUDGET,
        'hours'    => $hours,
    );
}
