<?php include 'head.php'; ?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/breadCrumbs');?>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop">取り扱い商品</h2>
          <p class="c-heading--subPageTopEn">Products</p>
        </div>
        <div class="p-products">
          <div class="p-products__textWrap">
            <p>ミシュラン三ツ星レストラン御用達のオリジナルブランド「極上
              三ツ星かんぱち」をはじめ、代々受け継がれてきた三代目柿内水産の技術を生かして育てた、自慢の鮮魚をご堪能ください。フィーレから加工品まで取り揃えています。</p>
          </div>
          <div class="p-products__listWrap">
            <ul class="c-productsList">
              <li class="theBestAmberjack">
                <a href="/products/the-best-amberjack/">
                  <img class="theBestAmberjack" src="<?php echo IMAGES_DIR; ?>/item_thebestamberjack.png" alt="極上 三ツ星かんぱち">
                  <div class="c-productsList__textWrap">
                    <p class="c-productsList__text">極上 三ツ星かんぱち</p>
                    <p class="c-productsList__textEn">The best amberjack</p>
                  </div>
                </a>
              </li>
              <li class="stripedJack">
                <a href="/products/striped-jack/">
                  <img class="stripedJack" src="<?php echo IMAGES_DIR; ?>/item_stripedjack.png" alt="三ツ星しまあじ">
                  <div class="c-productsList__textWrap">
                    <p class="c-productsList__text">三ツ星しまあじ</p>
                    <p class="c-productsList__textEn">Striped jack</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <?php get_template_part('parts/inquiryBlock');?>
      <?php get_template_part('parts/breadCrumbs');?>
    </main>
    <?php include 'footer.php'; ?>