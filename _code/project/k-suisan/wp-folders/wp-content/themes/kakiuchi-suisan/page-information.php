<?php include 'head.php'; ?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/breadCrumbs');?>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop">お知らせ</h2>
          <p class="c-heading--subPageTopEn">information</p>
        </div>
        <div class="p-information">
            <?php
              // Pickup & 最優先 に選択された項目を確認する
              $argsPickUpTop = array(
                'posts_per_page' => 1,
                'meta_query' => [
                  'relation' => 'AND',
                  [
                    'key'     => 'pickup_content',
                    'value'   => 'pickup'
                  ],
                  [
                    'key'     => 'pickup_top_content',
                    'value'   => 'pickup_top'
                  ]
                ]
              );

              $datasPickUpTop = get_posts($argsPickUpTop);
              
              // Pickupの内、最新3件表示
              $argsPickUp = array(
                'posts_per_page'   => 3,
                'meta_key' => 'pickup_content',
                'meta_value' => 'pickup'
              );

              $datasPickUp = get_posts($argsPickUp);

              if($datasPickUpTop):
            ?>
            <div class="p-information__pickUp">
              <h3 class="c-heading--middle">ピックアップ</h3>
              <ul class="p-information__pickUpList">
                <?php
                  $idTOP = '';
                  foreach($datasPickUpTop as $post):
                    setup_postdata( $post );
                    $cat = get_the_category();
                    $cat_name = $cat[0]->cat_name;
                    $cat_slug = $cat[0]->category_nicename;
                    $idTOP = $post->ID;
                ?>
                <li class="p-information__pickUpItem">
                  <a href="<?php the_permalink(); ?>">
                    <div class="p-information__pickUpImg">
                      <?php if ( has_post_thumbnail() ) { ?>
                      <img src="<?php the_post_thumbnail_url(); ?>" alt="" width="310" height="220" loading="lazy">
                      <?php } else { ?>
                      <img src="<?php echo IMAGES_DIR; ?>/pickup_noimage.png" alt="柿内水産 ピックアップ デフォルトイメージ" width="310" height="220" loading="lazy">
                      <?php } ?>
                    </div>
                    <div class="p-information__pickUpLabel">
                      <span class="p-information__pickUpDate"><?php echo get_the_date('Y/m/d'); ?></span>
                      <span class="c-label <?php echo $cat_slug; ?>"><?php echo $cat_name; ?></span>
                    </div>
                    <p class="p-information__pickUpTitle"><?php the_title(); ?></p>
                  </a>
                </li>
                <?php
                  endforeach;
                ?>
                <?php
                  $counter = 0;
                  foreach($datasPickUp as $post):
                    setup_postdata( $post );
                    $cat = get_the_category();
                    $cat_name = $cat[0]->cat_name;
                    $cat_slug = $cat[0]->category_nicename;
                    $id = $post->ID;
                    if($id == $idTOP) {
                      continue;
                    } else if($counter > 1) {
                      break;
                    }
                ?>

                <li class="p-information__pickUpItem">
                  <a href="<?php the_permalink(); ?>">
                    <div class="p-information__pickUpImg">
                      <?php if ( has_post_thumbnail() ) { ?>
                      <img src="<?php the_post_thumbnail_url(); ?>" alt="" width="310" height="220" loading="lazy">
                      <?php } else { ?>
                      <img src="<?php echo IMAGES_DIR; ?>/pickup_noimage.png" alt="柿内水産 ピックアップ デフォルトイメージ" width="310" height="220" loading="lazy">
                      <?php } ?>
                    </div>
                    <div class="p-information__pickUpLabel">
                      <span class="p-information__pickUpDate"><?php echo get_the_date('Y/m/d'); ?></span>
                      <span class="c-label <?php echo $cat_slug; ?>"><?php echo $cat_name; ?></span>
                    </div>
                    <p class="p-information__pickUpTitle"><?php the_title(); ?></p>
                  </a>
                </li>
                <?php
                  $counter++;
                  endforeach;
                  wp_reset_postdata();
                ?>
              </ul>
            </div>
            <?php
              elseif($datasPickUp):
            ?>
            <div class="p-information__pickUp">
              <h3 class="c-heading--middle">ピックアップ</h3>
              <ul class="p-information__pickUpList">
                <?php
                  foreach($datasPickUp as $post):
                    setup_postdata( $post );
                    $cat = get_the_category();
                    $cat_name = $cat[0]->cat_name;
                    $cat_slug = $cat[0]->category_nicename;
                ?>
                <li class="p-information__pickUpItem">
                  <a href="<?php the_permalink(); ?>">
                    <div class="p-information__pickUpImg">
                      <?php if ( has_post_thumbnail( )) { ?>
                      <img src="<?php the_post_thumbnail_url(); ?>" alt="" width="310" height="220" loading="lazy">
                      <?php } else { ?>
                      <img src="<?php echo IMAGES_DIR; ?>/pickup_noimage.png" alt="柿内水産 ピックアップ デフォルトイメージ" width="310" height="220" loading="lazy">
                      <?php } ?>
                    </div>
                    <div class="p-information__pickUpLabel">
                      <span class="p-information__pickUpDate"><?php echo get_the_date('Y/m/d'); ?></span>
                      <span class="c-label <?php echo $cat_slug; ?>"><?php echo $cat_name; ?></span>
                    </div>
                    <p class="p-information__pickUpTitle"><?php the_title(); ?></p>
                  </a>
                </li>
                <?php
                  endforeach;
                ?>
              </ul>
            </div>
            <?php
              endif;
              wp_reset_postdata();
            ?>

          <?php get_template_part('parts/categoryLinks');?>
          <div class="p-information__linkArea">
            <!--表示件数はjsで制御-->
            <ul class="c-infoArticle" id="js-articleWrap">
              <?php
                $args = array(
                  'posts_per_page'   => -1
                );
      
                $datas = get_posts($args);
                if ($datas):
                  foreach ( $datas as $post ):
                    setup_postdata( $post );
                    $cat = get_the_category();
                    $cat_name = $cat[0]->cat_name;
                    $cat_slug = $cat[0]->category_nicename;
              ?>
              <li class="is-link-hide">
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
            <div class="p-information__moreBtnWrap">
              <div class="c-button--moreInfo">
                <button type="button" id="js-article-moreBtn">さらに読み込む</button>
              </div>
            </div>
          </div>
          <div class="p-information__bottom">
            <?php get_template_part('parts/categoryLinks');?>
          </div>
          <?php get_template_part('parts/relatedLinks');?>
        </div>
      </div>
      <?php get_template_part('parts/inquiryBlock');?>
      <?php get_template_part('parts/breadCrumbs');?>
    </main>
    <?php include 'footer.php'; ?>