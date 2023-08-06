<?php include 'head.php'; ?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/breadCrumbs');?>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop">極上 三ツ星かんぱちとは</h2>
          <p class="c-heading--subPageTopEn">The best amberjack</p>
        </div>
        <div class="p-amberjack">
          <!-- swiper -->
          <div class="c-swiper p-amberjack__top">
            <div class="swiper-container slider1">
              <ul class="c-swiper__wrapper swiper-wrapper">
                <li class="swiper-slide">
                  <img src="<?php echo IMAGES_DIR; ?>/amberjack_top_1.png" alt="極上 三ツ星かんぱちとは 1">
                </li>
                <li class="swiper-slide">
                  <img src="<?php echo IMAGES_DIR; ?>/amberjack_top_2.png" alt="極上 三ツ星かんぱちとは 2">
                </li>
                <li class="swiper-slide">
                  <img src="<?php echo IMAGES_DIR; ?>/amberjack_top_3.png" alt="極上 三ツ星かんぱちとは 3">
                </li>
                <li class="swiper-slide">
                  <img src="<?php echo IMAGES_DIR; ?>/amberjack_top_4.png" alt="極上 三ツ星かんぱちとは 4">
                </li>
                <li class="swiper-slide">
                  <img src="<?php echo IMAGES_DIR; ?>/amberjack_top_5.png" alt="極上 三ツ星かんぱちとは 5">
                </li>
                <li class="swiper-slide">
                  <img src="<?php echo IMAGES_DIR; ?>/amberjack_top_6.png" alt="極上 三ツ星かんぱちとは 6">
                </li>
              </ul>
            </div>
            <div class="c-swiper__pagination swiper-pagination"></div>
          </div>
          <div class="p-amberjack__feature">
            <div class="p-amberjack__logo">
              <img src="<?php echo IMAGES_DIR; ?>/kanpachi_logo.svg" alt="極上 三ツ星かんぱち ロゴ">
            </div>
            <ol class="p-amberjack__featureList">
              <li>
                <h3>一、圧倒的な味と香り</h3>
                <p>天然モノのような爽やかな香りに加え、甘みや旨味が一般的なかんぱち（文科省基準）に比べ数倍から数十倍あります。</p>
              </li>
              <li>
                <h3>二、漁場の良さ</h3>
                <p>漁場は、天然のプランクトンを運ぶ黒潮が絶えない錦江湾。暖海域を好むかんぱちの養殖に最適な環境で育てています。</p>
              </li>
              <li>
                <h3>三、エサと手間ひま</h3>
                <p>栄養バランスに優れたみずみずしい生餌ベースのエサを使用しており、従来の固形飼料（EP）に比べ3倍の手間をかけています。</p>
              </li>
            </ol>
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
                <p class="c-productLineup__text">頭と内臓を取り除き、三枚におろした状態。手軽にお刺身にすることができ、カマもついているので、塩焼きや煮つけにも最適です。真空包装されています。
                </p>
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
        </div>
      </div>
      <?php get_template_part('parts/inquiryBlock');?>
      <?php get_template_part('parts/breadCrumbs');?>
    </main>
    <?php include 'footer.php'; ?>