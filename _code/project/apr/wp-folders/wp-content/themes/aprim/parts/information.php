<?php
  global $post;
  $args = array(
    'post_type' => 'post',
    'posts_per_page' => -1
  );
  $posts = get_posts($args);
  if ($posts):
?>
<section class="c-section" id="top-information">
  <div class="c-headingWrap --h1">
    <h1 class="c-heading --h1">
      <span class="c-heading__text">News</span>
    </h1>
    <div class="c-heading__lineArea">
      <div class="c-heading__lineWrap js-heading-line">
        <span class="c-heading__line first"></span>
        <span class="c-heading__line second"></span>
        <span class="c-heading__line third"></span>
      </div>
    </div>
  </div>
  <div class="c-contentsWrap rightShort information">
    <ul class="c-info__list" id="js-scroll-list">
      <?php
        foreach($posts as $post): setup_postdata($post);
      ?>
      <li>
        <a href="<?php the_permalink(); ?>" class="c-info__item">
          <div class="c-info__itemInner">
		    <?php
			  $YEAR = get_the_date('Y');
			  $MONTH = get_the_date('n');
			  $DAY = get_the_date('d');
			  
			  $MONTH_NAME_ARR = [
			    'Jan.',
          'Feb.',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug.',
          'Sep.',
          'Oct.',
          'Nov.',
          'Dec.'
			  ];
			  
			  $MONTH_ABBREVIATION = $MONTH_NAME_ARR[$MONTH - 1];
			?>
            <span class="c-info__date"><?php echo $MONTH_ABBREVIATION; ?> <?php echo $DAY; ?>,<?php echo $YEAR; ?></span>
            <span class="c-info__title"><?php the_title(); ?></span>
          </div>
        </a>
      </li>
      <?php endforeach; ?>
    </ul>
    <div class="c-info__border" id="js-scroll-border"></div>
  </div>
</section>
<?php endif; ?>
<?php wp_reset_postdata(); ?>