<?php
/**
 * Базовый шаблон (запасной): выводит контент страницы или записи.
 */
get_header(); ?>

<section class="wrap" style="padding-top:150px;padding-bottom:96px;max-width:860px">
    <?php while (have_posts()) : the_post(); ?>
        <h1 class="title" style="font-size:clamp(30px,5vw,52px)"><?php the_title(); ?></h1>
        <div style="margin-top:32px;font-size:16px;line-height:1.75;color:var(--mutd)">
            <?php the_content(); ?>
        </div>
    <?php endwhile; ?>
</section>

<?php get_footer(); ?>
