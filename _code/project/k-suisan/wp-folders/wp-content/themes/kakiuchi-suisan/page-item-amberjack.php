<?php
/*
Template Name: 取扱い商品 かんぱち
*/
?>

<?php include 'head.php';?>
<body id="js-item-amberjack">
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
        <h2 class="c-heading--subPageTop">極上 三ツ星かんぱち</h2>
        <p class="c-heading--subPageTopEn">The best amberjack</p>
      </div>
      <div class="c-productItem__fv">
        <img src="<?php echo IMAGES_DIR; ?>/amberjack_fv.png" alt="極上 三ツ星かんぱち メインビジュアル">
        <p>三代目柿内水産のオリジナルブランド「極上 三ツ星かんぱち」は、通常の3倍の手間ひまをかけ育てることで、一般的なかんぱちの数倍から十数倍の甘みと旨味を引き出した極上のかんぱちです。</p>
        <p>その深い美味しさはプロのシェフたちにも認められており、ミシュラン三ツ星レストランなど、高名な料理店でも多数お取り扱いいただいております。</p>
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
              <img src="<?php echo IMAGES_DIR; ?>/amberjack_round.png" alt="極上三ツ星かんぱち ラウンド">
            </div>
            <p class="c-productLineup__text">
              水揚げされた「三ツ星かんぱち」を丸ごとお届け。お刺身はもちろん、かぶとの煮つけや焼き・揚げなど、三ツ星の魅力を余すことなくご堪能いただけます。料理店や大宴会に。</p>
          </li>
          <li>
            <div class="c-productLineup__name">
              <p>フィーレ（三枚おろし）</p>
              <p>Filet</p>
            </div>
            <div class="c-productLineup__img">
              <img src="<?php echo IMAGES_DIR; ?>/amberjack_filet.png" alt="極上三ツ星かんぱち フィーレ">
            </div>
            <p class="c-productLineup__text">頭と内臓を取り除き、三枚におろした状態。手軽にお刺身にすることができ、カマもついているので、塩焼きや煮つけにも最適です。真空包装されています。</p>
          </li>
          <li>
            <div class="c-productLineup__name">
              <p>ロイン（柵）</p>
              <p>Loin</p>
            </div>
            <div class="c-productLineup__img">
              <img src="<?php echo IMAGES_DIR; ?>/amberjack_loin.png" alt="極上三ツ星かんぱち ロイン">
            </div>
            <p class="c-productLineup__text">
              骨・皮をすべて取り除き、いわゆる「柵」にした状態。脂乗りの強い腹側と、新鮮なかんぱちならではの血合の旨味が楽しめる背側に分かれており、使い勝手がよいです。</p>
          </li>
          <li>
            <div class="c-productLineup__name">
              <p>熟成の刺身「かんぱち」（三ツ星かんぱち使用）</p>
              <p>Aged Sashimi 「Kanpachi」</p>
            </div>
            <div class="c-productLineup__img">
              <img src="<?php echo IMAGES_DIR; ?>/amberjack_aged.png" alt="極上三ツ星かんぱち 熟成">
            </div>
            <p class="c-productLineup__text">鹿児島の食の新しい魅力を探求するフードブランド「ROOTS
              FOOD」による商品。独自技術で魚を熟成させる「鹿児島で生まれた熟成の刺身シリーズ」の、三ツ星かんぱちバージョンです。とろけるような旨味を、ご自宅でどうぞ。</p>
          </li>
          <li>
            <div class="c-productLineup__name">
              <p>料亭監修！三ツ星かんぱち贈答用セット</p>
              <p>Gift Set</p>
            </div>
            <div class="c-productLineup__img">
              <img src="<?php echo IMAGES_DIR; ?>/amberjack_gift.png" alt="極上三ツ星かんぱち 贈答用セット">
            </div>
            <p class="c-productLineup__text">
              三ツ星かんぱちの「刺身」、「若狭スモーク」、「オリーブオイルレモン風味」、「鹿児島西京焼き」、「丼用漬け」、「時雨煮」、「黒山椒煮」の7種類が入った、ギフトセットです。</p>
          </li>
        </ul>
      </div>
      <div class="c-cooking">
        <h3 class="c-heading--middle">調理例</h3>
        <p class="c-heading--middleEn">Cooking example</p>
        <!--Swiper cooking-->
        <div class="c-swiper c-cooking__swiper">
          <div class="swiper-container slider2">
            <ul class="c-swiper__wrapper swiper-wrapper">
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_amberjack_1.png" alt="極上 三ツ星かんぱち 調理例1">
                <!-- <p>料理1</p> -->
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_amberjack_2.png" alt="極上 三ツ星かんぱちとは 調理例2">
                <!-- <p>料理2</p> -->
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_amberjack_3.png" alt="極上 三ツ星かんぱちとは 調理例3">
                <!-- <p>料理3</p> -->
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_amberjack_4.png" alt="極上 三ツ星かんぱちとは 調理例4">
                <!-- <p>料理4</p> -->
              </li>
              <li class="swiper-slide">
                <img src="<?php echo IMAGES_DIR; ?>/cooking_amberjack_5.png" alt="極上 三ツ星かんぱちとは 調理例5">
                <!-- <p>料理5</p> -->
              </li>
            </ul>
          </div>
          <div class="c-swiper__pagination swiper-pagination-cooking"></div>
        </div>
      </div>
      <section class="c-productItem__chart">
        <h3 class="c-heading--middle">三ツ星のおいしさ</h3>
        <p class="c-heading--middleEn">Deliciousness</p>
        <div class="c-productItem__chartDetail">
          <div class="c-productItem__graphWrap">
            <img src="<?php echo IMAGES_DIR; ?>/amberjack_deli_graph.svg" alt="三ツ星の美味しさ グラフ">
          </div>
          <div class="c-productItem__textInfo">
            <h4>甘みと旨味、ここに極まる</h4>
            <p>通常の3倍の手間ひまをかけ育てることで、一般的なかんぱちの数倍から十数倍の甘みと旨味を持つ極上のかんぱちとなります。</p>
            <p>その味わい深さが認められ、国内のミシュラン三ツ星のレストランなどでお取り扱いいただいています。</p>
          </div>
        </div>
      </section>
      <?php get_template_part('parts/inquiryBlock');?>
      <div>
        <h3 class="c-heading--middle">関連商品</h3>
        <p class="c-heading--middleEn">Related products</p>
        <ul class="c-productsList itemPage">
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