<?php include 'head.php'; ?>
<body id="js-article-page">
  <div>
    <?php include 'header.php'; ?>
    <?php $cat = get_the_category(); ?>
    <?php $cat_name = $cat[0]->cat_name; ?>
    <?php $cat_slug = $cat[0]->category_nicename; ?>
    <main class="l-main">
      <ol class="c-breadCrumbs <?php echo get_post_field( 'post_name', get_the_ID() );?>">
        <li>
          <a href="/">TOP</a>
        </li>
        <li>
          <a href="/information/">お知らせ</a>
        </li>
        <li>
          <a href="/information/<?php echo $cat_slug; ?>/"><?php echo $cat_name; ?></a>
        </li>
        <li>
          <a href="<?php echo get_the_permalink();?>"><?php the_title(); ?></a>
        </li>
      </ol>
      <div class="c-article">
        <dl class="c-article__date">
          <dt><?php echo get_the_date('Y/m/d'); ?></dt>
          <dd>
            <span class="c-label <?php echo $cat_slug; ?>"><?php echo $cat_name; ?></span>
          </dd>
        </dl>
        <section class="c-article__content">
          <h2 class="c-article__heading"><?php the_title(); ?></h2>
          <div class="c-article__field">
            <?php the_content(); ?>
          </div>
        </section>
        <?php get_template_part('parts/relatedLinks');?>
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
          <a href="/information/<?php echo $cat_slug; ?>/"><?php echo $cat_name; ?></a>
        </li>
        <li>
          <a href="<?php echo get_the_permalink();?>"><?php the_title(); ?></a>
        </li>
      </ul>
    </main>
    <?php include 'footer.php'; ?>