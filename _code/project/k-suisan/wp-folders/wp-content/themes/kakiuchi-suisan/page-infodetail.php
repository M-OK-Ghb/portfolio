<?php
/*
Template Name: お知らせカテゴリー別ページ
*/
?>
<?php include 'head.php'; ?>
<body id="js-infoDetail-page">
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <ol class="c-breadCrumbs <?php echo get_post_field( 'post_name', get_the_ID() );?>">
        <li>
          <a href="/">TOP</a>
        </li>
        <li>
          <a href="/information/">お知らせ</a>
        </li>
        <li>
          <a href="<?php echo get_the_permalink();?>"><?php the_title(); ?></a>
        </li>
      </ol>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop">お知らせ</h2>
          <p class="c-heading--subPageTopEn">information</p>
        </div>
        <div class="p-information">
        <?php get_template_part('parts/categoryLinks');?>
          <div class="p-information__linkArea">
            <!--表示件数はjsで制御-->
            <ul class="c-infoArticle" id="js-articleWrap">
              <?php
                global $post;
                $slug = $post->post_name;
                $args = array(
                  'posts_per_page'   => -1,
                  'category_name' => $slug
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
      <ul class="c-breadCrumbs <?php echo get_post_field( 'post_name', get_the_ID() );?>">
        <li>
          <a href="/">TOP</a>
        </li>
        <li>
          <a href="/information/">お知らせ</a>
        </li>
        <li>
          <span><?php the_title(); ?></span>
        </li>
      </ul>
    </main>
    <?php include 'footer.php'; ?>