<?php include 'head.php'; ?>
<body>
  <?php get_template_part('parts/tagscript');?>
  <div class="c-contentsBg">
    <?php include 'header.php'; ?>
    <main class="p-sub__main">
      <div class="p-sub__fv js-fv-area">
        <div class="p-sub__fvImg">
          <img class="is-pc" src="<?php echo IMAGES_DIR; ?>/sub_fv_pc.webp" alt="sub fv pc">
          <img class="is-sp" src="<?php echo IMAGES_DIR; ?>/sub_fv_sp.webp" alt="sub fv sp">
        </div>
        <div class="p-sub__fvLogo">
          <img src="<?php echo IMAGES_DIR; ?>/common/logo.svg" alt="IETF116 YOKOHAMA LOGO">
        </div>
      </div>
      <section class="c-section">
        <h1 class="c-section__heading js-topLevel-heading">NEWS</h1>
        <div class="c-section__contentsArea">
          <?php the_content(); ?>
          <?php
            $prev_post = get_previous_post();
            if( !empty( $prev_post ) ) {
              $prevUrl = get_permalink( $prev_post->ID );
            }

            $next_post = get_next_post();
            if( !empty( $next_post ) ) {
              $nextUrl = get_permalink( $next_post->ID );
            }
          ?>
          <?php if (get_previous_post() && get_next_post()):?>
          <div class="c-linkWrap double">
            <div class="c-link left">
              <a href="<?php echo $prevUrl; ?>">
                <div class="c-link__inner">
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
                  <span class="c-link__text">BACK</span>
                </div>
              </a>
            </div>
            <div class="c-link right">
              <a href="<?php echo $nextUrl; ?>">
                <div class="c-link__inner">
                  <span class="c-link__text">NEXT</span>
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
              </a>
            </div>
          </div>
          <?php elseif(get_previous_post()): ?>
            <div class="c-linkWrap left">
              <div class="c-link left">
                <a href="<?php echo $prevUrl; ?>">
                  <div class="c-link__inner">
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
                    <span class="c-link__text">BACK</span>
                  </div>
                </a>
              </div>
            </div>
          <?php elseif(get_next_post()): ?>
            <div class="c-linkWrap right">
              <div class="c-link right">
                <a href="<?php echo $nextUrl; ?>">
                  <div class="c-link__inner">
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
                    <span class="c-link__text">NEXT</span>
                  </div>
                </a>
              </div>
            </div>
          <?php endif; ?>
          <div class="c-buttonWrap center">
            <a href="/" class="c-button">GO BACK TOP</a>
          </div>
        </div>
      </section>
      <?php get_template_part('parts/bottomCommon'); ?>
    </main>
    <?php include 'footer.php'; ?>