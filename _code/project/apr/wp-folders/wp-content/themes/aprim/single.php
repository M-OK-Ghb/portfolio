<?php include 'head.php'; ?>
<body>
  <?php include 'parts/ga.php'; ?>
  <div class="c-bg">
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/subPageFv');?>
      <div class="p-sub__contentsWrap">
        <section class="c-section">
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
          <div class="c-contentsWrap">
            <div class="c-textArea singleTop">
              <h2 class="c-heading --h2"><?php the_title();?></h2>
            </div>
            <?php the_content(); ?>
            <?php if (get_previous_post() || get_next_post()):?>
            <div class="c-textArea">
              <div class="c-articleLinkArea">
                <?php if (get_previous_post()):?>
                <div class="c-articleLinkWrap back">
                  <div class="c-articleLink back">
                    <?php previous_post_link('%link', 'Back Link');?>
                  </div>
                </div>
                <?php endif; ?>
                <?php if (get_next_post()):?>
                <div class="c-articleLinkWrap next">
                  <div class="c-articleLink next">
                    <?php next_post_link('%link', 'Next Link'); ?>
                  </div>
                </div>
                <?php endif; ?>
              </div>
            </div>
            <?php endif; ?>
            <div class="c-btnWrap center">
              <a href="/#top-information" class="p-contact__submitBtn c-btn">BACK TO TOP</a>
            </div>
          </div>
        </section>
      </div>
    </main>
    <?php include 'footer.php'; ?>