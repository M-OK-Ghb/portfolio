<?php include 'head.php'; ?>
<body>
  <?php include 'parts/ga.php'; ?>
  <div class="c-bg">
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/subPageFv');?>
      <div class="p-sub__contentsWrap">
        <?php the_content(); ?>
      </div>
    </main>
    <?php include 'footer.php'; ?>