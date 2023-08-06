<?php include 'head.php'; ?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/breadCrumbs');?>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop"><?php the_title(); ?></h2>
          <!-- <p class="c-heading--subPageTopEn">Products</p> -->
        </div>
        <div class="p-page__contentWrap">
          <?php the_content(); ?>
        </div>
      </div>
      <?php get_template_part('parts/inquiryBlock');?>
    </main>
    <?php include 'footer.php'; ?>