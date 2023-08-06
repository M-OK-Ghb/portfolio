<?php include 'head.php';?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/breadCrumbs');?>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop">お問合せ</h2>
          <p class="c-heading--subPageTopEn">inquiry</p>
        </div>
        <div class="p-inquiry">
          <p class="p-inquiry__text">柿内水産有限会社のお問合せページです。鮮魚の卸売、加工品の販売など、個人・企業にかかわらずお気軽にお問合せください。</p>
          <?php the_content(); ?>
        </div>
      </div>
      <?php get_template_part('parts/breadCrumbs');?>
    </main>
    <?php include 'footer.php'; ?>