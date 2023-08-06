<?php
/*
Template Name: 取扱い商品 しまあじ
*/
?>

<?php include 'head.php';?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <ol class="c-breadCrumbs">
        <li>
          <a href="/">TOP</a>
        </li>
        <li>
          <a href="/products/">取り扱い商品</a>
        </li>
        <li>
          <a href="<?php echo get_the_permalink();?>"><?php the_title(); ?></a>
        </li>
      </ol>
      <div class="c-headingWrap--subPage">
        <h2 class="c-heading--subPageTop">三ツ星しまあじ</h2>
        <p class="c-heading--subPageTopEn">Striped jack</p>
      </div>
      <div class="c-productItem__fv">
        <img src="<?php echo IMAGES_DIR; ?>/stripedjack_fv.png" alt="三ツ星しまあじ メインビジュアル">
        <p>三代目柿内水産の養殖技術で丁寧に育てた三ツ星しまあじは、旨味成分のアミノ酸「アラニン」が一般的なしまあじと比べ10倍含まれており、爽やかな甘みが特徴です。</p>
      </div>
      <div class="c-productLineup">
        <h3 class="c-heading--middle">商品一覧</h3>
        <p class="c-heading--middleEn">Product lineup</p>
        <ul class="c-productLineup__list">
          <li>
            <div class="c-productLineup__name">
              <p>ラウンド（丸一匹）</p>
              <p>Round</p>
            </div>
            <div class="c-productLineup__img">
              <img src="<?php echo IMAGES_DIR; ?>/stripedjack_round.png" alt="極上三ツ星かんぱち ラウンド">
            </div>
            <p class="c-productLineup__text">水揚げされた「三ツ星しまあじ」を丸ごとお届け。お刺身やカルパッチョ、火入れした料理まで、三ツ星の魅力を余すことなくご堪能いただけます。</p>
          </li>
          <li>
            <div class="c-productLineup__name">
              <p>フィーレ（三枚おろし）</p>
              <p>Filet</p>
            </div>
            <div class="c-productLineup__img">
              <img src="<?php echo IMAGES_DIR; ?>/stripedjack_filet.png" alt="極上三ツ星かんぱち フィーレ">
            </div>
            <p class="c-productLineup__text">
              頭と内臓を取り除き、三枚におろした状態。手軽にお刺身にすることができ、カマもついているので、塩焼きや煮つけなどにもお使いいただけます。真空包装してお届けします。</p>
          </li>
        </ul>
      </div>
      <div class="c-cooking">
        <h3 class="c-heading--middle">調理例</h3>
        <p class="c-heading--middleEn">Cooking example</p>
        <!-- swiper cookingArea -->
        <div class="c-swiper c-cooking__swiper">
          <div class="swiper-container slider2">
            <ul class="c-swiper__wrapper swiper-wrapper">
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_stripedjack_1.png" alt="三ツ星しまあじ 調理例1">
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_stripedjack_2.png" alt="三ツ星しまあじとは 調理例2">
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_stripedjack_3.png" alt="三ツ星しまあじとは 調理例3">
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_stripedjack_4.png" alt="三ツ星しまあじとは 調理例4">
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_stripedjack_5.png" alt="三ツ星しまあじとは 調理例5">
              </li>
            </ul>
          </div>
          <div class="c-swiper__pagination swiper-pagination-cooking"></div>
        </div>
      </div>
      <section class="c-productItem__chart">
        <h3 class="c-heading--middle">三ツ星のおいしさ</h3>
        <p class="c-heading--middleEn">Deliciousness</p>
        <div class="c-productItem__chartDetail single">
          <div class="c-productItem__graphWrap">
            <img src="<?php echo IMAGES_DIR; ?>/stripedjack_deli_graph.svg" alt="三ツ星の美味しさ グラフ">
          </div>
        </div>
      </section>
      <?php get_template_part('parts/inquiryBlock');?>
      <div>
        <h3 class="c-heading--middle">関連商品</h3>
        <p class="c-heading--middleEn">Related products</p>
        <ul class="c-productsList itemPage">
          <li class="theBestAmberjack">
            <a href="/products/the-best-amberjack/">
              <img class="theBestAmberjack" src="<?php echo IMAGES_DIR; ?>/item_thebestamberjack.png" alt="極上 三ツ星かんぱち">
              <div class="c-productsList__textWrap">
                <p class="c-productsList__text">極上 三ツ星かんぱち</p>
                <p class="c-productsList__textEn">The best amberjack</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <ul class="c-breadCrumbs">
        <li>
          <a href="/">TOP</a>
        </li>
        <li>
          <a href="/products/">取り扱い商品</a>
        </li>
        <li>
          <a href="<?php echo get_the_permalink();?>"><?php the_title(); ?></a>
        </li>
      </ul>
    </main>
    <?php include 'footer.php'; ?>