<?php
  global $post;
  $args = array(
    'post_type' => 'post',
    'posts_per_page' => -1
  );
  $posts = get_posts($args);
  if ($posts):
?>

<section class="c-section">
  <h1 class="c-section__heading js-topLevel-heading">NEWS</h1>
  <div class="c-section__contentsArea">
    <div class="c-section__contentWrap">
      <ul class="c-section__newsList top">
        <?php
          foreach($posts as $post): setup_postdata($post);
        ?>
        <li class="c-section__newsItem">
          <a href="<?php the_permalink(); ?>">
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
            <dl class="c-section__newsItemInner">
              <dt><?php echo $MONTH_ABBREVIATION; ?> <?php echo $DAY; ?>,<?php echo $YEAR; ?></dt>
              <dd>
                <div class="c-section__newsItemText">
                  <p><?php the_title(); ?></p>
                  <span class="c-link__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <g transform="translate(-1015 -5276)">
                        <g transform="translate(1015 5276)" stroke-width="1">
                          <circle cx="12" cy="12" r="12" stroke="none" />
                          <circle cx="12" cy="12" r="11.5" fill="none" />
                        </g>
                        <path d="M-1975.62,1090.283l2.667,3-2.667,3" transform="translate(3001.12 4195.217)" fill="none"
                          stroke-linecap="round" stroke-width="1" />
                      </g>
                    </svg>
                  </span>
                </div>
              </dd>
            </dl>
          </a>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</section>
<?php endif; ?>
<?php wp_reset_postdata(); ?>