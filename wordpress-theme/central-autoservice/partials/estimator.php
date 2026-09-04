<?php
/**
 * Калькулятор стоимости «на глазок»
 */
?>
<div class="est">
    <div>
        <p class="eyebrow" style="color:var(--steel)"><?php aps_icon('gauge'); ?>&nbsp; Калькулятор «на глазок»</p>
        <h2 class="title">Сколько это стоит —<br><span class="acc">честно, до визита</span></h2>
        <p>Выберите марку и работу — покажем вилку цены для вашей машины. Точную смету зафиксируем в акте
        после диагностики: ни рублём больше согласованного.</p>
        <div class="est-form">
            <div>
                <label for="est-brand">Марка автомобиля</label>
                <span class="selwrap">
                    <select id="est-brand">
                        <?php foreach (APS_BRANDS as $i => $b) : ?>
                            <option <?php echo $b === 'Kia' ? 'selected' : ''; ?>><?php echo esc_html($b); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <svg viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                </span>
            </div>
            <div>
                <label for="est-service">Какая работа нужна</label>
                <span class="selwrap">
                    <select id="est-service">
                        <?php foreach (APS_SERVICES as $s) : ?>
                            <option value="<?php echo esc_attr($s['id']); ?>" data-time="<?php echo esc_attr($s['time']); ?>" data-title="<?php echo esc_attr($s['title']); ?>" <?php echo $s['id'] === 'to' ? 'selected' : ''; ?>><?php echo esc_html($s['title']); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <svg viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
                </span>
            </div>
        </div>
    </div>

    <div class="est-result">
        <div class="hazard"></div>
        <div class="est-head">
            <span>Предварительная смета</span>
            <span class="stamp">без накруток</span>
        </div>
        <div class="est-body" id="est-body">
            <p class="est-title" id="est-name">Kia · Техническое обслуживание</p>
            <div class="est-nums">
                <div><b id="est-low">0 ₽</b><small>от — если всё просто</small></div>
                <div><b id="est-high">0 ₽</b><small>до — реалистичный верх</small></div>
            </div>
            <div class="est-meta">
                <span>⏱ <span id="est-time">1,5–2 часа</span></span>
                <span>запчасти: на выбор — оригинал / аналог</span>
            </div>
            <button class="btn btn-amber" id="est-cta" data-booking data-service="to">Записаться на ремонт <?php aps_icon('arrow','arw'); ?></button>
            <p class="est-fine">при ремонте у нас диагностика — бесплатно</p>
        </div>
    </div>
</div>
