<?php include 'head.php'; ?>
<body id="js-top" class="js-wpFlag">
  <div class="p-top" id="js-top-content">
    <?php include 'header.php'; ?>
    <main class="p-top__main">
      <div class="p-top__mv">
        <div class="p-top__mvImg">
          <img src="" alt="トップページ メインビジュアル" id="js-top-mv" loading="eager">
        </div>
        <div class="p-top__mvMessage">
          <h2>1945年創業。<br class="is-sp">三代目の技術と錦江湾が育てる<br class="is-sp">極上の魚。</h2>
        </div>
        <div class="p-top__mvLogo">
          <img src="<?php echo IMAGES_DIR; ?>/fv_title.svg" alt="三代目 柿内水産 KAKIUCHI FISHRIES COMPANY 03rd Generation" loading="eager">
        </div>
      </div>
      <div class="p-top__slideTop">
        <?php
          $slidePage = get_page_by_path('top_slide_edit');
          $slideId = $slidePage->ID;

          $get_field_1 = get_field('top_slide_1', $slideId);
          $get_field_2 = get_field('top_slide_2', $slideId);
          $get_field_3 = get_field('top_slide_3', $slideId);
          $get_field_4 = get_field('top_slide_4', $slideId);
          $get_field_5 = get_field('top_slide_5', $slideId);
          $get_field_6 = get_field('top_slide_6', $slideId);
          $get_field_7 = get_field('top_slide_7', $slideId);
          $get_field_8 = get_field('top_slide_8', $slideId);

          // スライド6枚までは必須
          $must_slide_1 = $get_field_1['url'];
          $must_slide_2 = $get_field_2['url'];
          $must_slide_3 = $get_field_3['url'];
          $must_slide_4 = $get_field_4['url'];
          $must_slide_5 = $get_field_5['url'];
          $must_slide_6 = $get_field_6['url'];
          
          // スライド7枚目・8枚目は選択
          $select_slide_7 = $get_field_7['url'];
          $select_slide_8 = $get_field_8['url'];
        ?>
        <ul class="p-top__slideItemWrap first">
          <li>
            <img src="<?php echo $must_slide_1; ?>" alt="top slide 1" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_2; ?>" alt="top slide 2" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_3; ?>" alt="top slide 3" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_4; ?>" alt="top slide 4" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_5; ?>" alt="top slide 5" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_6; ?>" alt="top slide 6" loading="eager" width="400" height="225">
          </li>
          <?php if($select_slide_7) { ?>
          <li>
            <img src="<?php echo $select_slide_7; ?>" alt="top slide 7" loading="eager" width="400" height="225">
          </li>
          <?php }; ?>
          <?php if($select_slide_8) { ?>
          <li>
            <img src="<?php echo $select_slide_8; ?>" alt="top slide 8" loading="eager" width="400" height="225">
          </li>
          <?php }; ?>
        </ul>
        <ul class="p-top__slideItemWrap second">
          <li>
            <img src="<?php echo $must_slide_1; ?>" alt="top slide 1" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_2; ?>" alt="top slide 2" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_3; ?>" alt="top slide 3" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_4; ?>" alt="top slide 4" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_5; ?>" alt="top slide 5" loading="eager" width="400" height="225">
          </li>
          <li>
            <img src="<?php echo $must_slide_6; ?>" alt="top slide 6" loading="eager" width="400" height="225">
          </li>
          <?php if($select_slide_7) { ?>
          <li>
            <img src="<?php echo $select_slide_7; ?>" alt="top slide 7" loading="eager" width="400" height="225">
          </li>
          <?php }; ?>
          <?php if($select_slide_8) { ?>
          <li>
            <img src="<?php echo $select_slide_8; ?>" alt="top slide 8" loading="eager" width="400" height="225">
          </li>
          <?php }; ?>
        </ul>
      </div>
      <div class="p-top__amberjack">
        <div class="p-top__amberjackInner">
          <div class="p-top__amberjackLogo">
            <img src="<?php echo IMAGES_DIR; ?>/kanpachi_logo.svg" alt="極上 三ツ星かんぱち ロゴ" loading="lazy">
          </div>
          <div class="p-top__amberjackText">
            <p>通常の3倍の手間ひまをかけて育てた、一般的なかんぱちの数倍から十数倍の甘みと旨味を持つ極上のかんぱち。<br>その味わい深さが認められ、ミシュラン三ツ星のレストランなどでお取り扱いいただいております。</p>
            <div class="p-top__btnWrap amberjack">
              <div class="c-button--subPageLink">
                <a href="/the-best-amberjack/">極上 三ツ星かんぱちとは</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-top__products">
        <div class="p-top__productsInner">
          <h3 class="c-heading--middle">取り扱い商品</h3>
          <p class="c-heading--middle__brush">
            <img src="<?php echo IMAGES_DIR; ?>/heading_brush.svg" alt="ブラシ" loading="lazy">
          </p>
          <p class="p-top__productsText">
            「極上 三ツ星かんぱち」をはじめ、天然の海の生け簀で育てた鮮魚の卸売や加工食品など、<br>三代目柿内水産が自信を持ってお勧めする商品をご紹介します。
          </p>
          <div class="p-top__productsListWrap">
            <ul class="c-productsList">
              <li class="theBestAmberjack">
                <a href="/products/the-best-amberjack/">
                  <img class="theBestAmberjack" src="<?php echo IMAGES_DIR; ?>/item_thebestamberjack.png" alt="極上 三ツ星かんぱち" loading="lazy">
                  <div class="c-productsList__textWrap">
                    <p class="c-productsList__text">極上 三ツ星かんぱち</p>
                    <p class="c-productsList__textEn">The best amberjack</p>
                  </div>
                </a>
              </li>
              <li class="stripedJack">
                <a href="/products/striped-jack/">
                  <img class="stripedJack" src="<?php echo IMAGES_DIR; ?>/item_stripedjack.png" alt="三ツ星しまあじ" loading="lazy">
                  <div class="c-productsList__textWrap">
                    <p class="c-productsList__text">三ツ星しまあじ</p>
                    <p class="c-productsList__textEn">Striped jack</p>
                  </div>
                </a>
              </li>
            </ul>
            <div class="p-top__btnWrap products">
              <div class="c-button--subPageLink">
                <a href="/products/">商品一覧</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-top__info">
        <div class="p-top__infoInner">
          <h3 class="c-heading--middle">お知らせ</h3>
          <p class="c-heading--middle__brush">
            <img src="<?php echo IMAGES_DIR; ?>/heading_brush.svg" alt="ブラシ" loading="lazy">
          </p>
          <div class="p-top__infoArticleWrap">
            <ul class="c-infoArticle">
              <?php
                $args = array(
                  'posts_per_page'   => 5
                );

                $datas = get_posts($args);
                if ($datas):
                  foreach ( $datas as $post ): 
                    setup_postdata( $post );
                    $cat = get_the_category();
                    $cat_name = $cat[0]->cat_name;
                    $cat_slug = $cat[0]->category_nicename;
              ?>
              <li>
                <a href="<?php the_permalink(); ?>">
                  <dl>
                    <dt><?php echo get_the_date('Y/m/d'); ?></dt>
                    <dd>
                      <span class="c-label <?php echo $cat_slug; ?>"><?php echo $cat_name; ?></span>
                    </dd>
                  </dl>
                  <p><?php the_title(); ?></p>
                </a>
              </li>
              <?php
                endforeach; 
                else:
              ?>
                <li class="itemNone">
                  <p>該当のカテゴリーの記事は見つかりませんでした。</p>
                </li>
              <?php
                endif;
                wp_reset_postdata();
              ?>
            </ul>
          </div>
          <div class="p-top__btnWrap info">
            <div class="c-button--subPageLink">
              <a href="/information/">お知らせ一覧</a>
            </div>
          </div>
        </div>
      </div>
      <div class="p-top__history" id="js-bg-off-target">
        <h3 class="c-heading--middle">柿内水産の歴史</h3>
        <p class="c-heading--middle__brush">
          <img src="<?php echo IMAGES_DIR; ?>/heading_brush.svg" alt="ブラシ">
        </p>
        <div class="p-top__historySlide">
          <div class="p-top__historySlideList">
            <ul class="p-top__slideItemWrap--history">
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_1.png" alt="history slide 1" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_2.png" alt="history slide 2" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_3.png" alt="history slide 3" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_4.png" alt="history slide 4" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_5.png" alt="history slide 5" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_6.png" alt="history slide 6" loading="eager" width="680" height="410">
              </li>
            </ul>
            <ul class="p-top__slideItemWrap--history second">
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_1.png" alt="history slide 1" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_2.png" alt="history slide 2" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_3.png" alt="history slide 3" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_4.png" alt="history slide 4" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_5.png" alt="history slide 5" loading="eager" width="680" height="410">
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/slide_history_6.png" alt="history slide 6" loading="eager" width="680" height="410">
              </li>
            </ul>
          </div>
          <div class="p-top__historySlideText">
            <div class="p-top__historySlideInner">
              <p>年間約20万尾を水揚げする柿内水産。<br>その歴史は、75年前、初代・柿内盛吉が一艘の木船で<br class="is-pc">海へ漕ぎだしたことからはじまりました。</p>
              <div class="p-top__btnWrap history">
                <div class="c-button--subPageLink">
                  <a href="/history/">柿内水産の歴史</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-top__aboutGround">
          <h3 class="c-heading--middle mini">国内最大級のかんぱち水揚げ量。<br>私たちの漁場「錦江湾」について。</h3>
          <p class="c-heading--middle__brush shortSize">
            <img src="<?php echo IMAGES_DIR; ?>/heading_brush.svg" alt="ブラシ" loading="lazy">
          </p>
          <div class="p-top__aboutBottom">
            <div class="p-top__groundImg">
              <img src="<?php echo IMAGES_DIR; ?>/kinkowan_map.png" alt="錦江湾" loading="lazy">
            </div>
            <div class="p-top__groundText">
              <p>日本で最も古いかんぱち養殖の歴史を持つ鹿児島・錦江湾は、通年絶えず黒潮が流れ込み、プランクトンが豊富で良質な漁場です。</p>
              <p>潮流が早く身の引き締まった魚が育つため、暖流魚であるかんぱちをおいしく育てるのにこの上ないポテンシャルを秘めています。</p>
              <p>全国シェア50％以上のかんぱちが水揚げされる、このかんぱち大国・錦江湾で、私たちの「極上 三ツ星かんぱち」は育っています。</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    <?php include 'footer.php'; ?>