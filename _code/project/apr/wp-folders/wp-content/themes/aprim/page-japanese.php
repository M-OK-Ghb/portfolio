<?php
/*
Template Name: JAPANESE
*/
?>
<?php include 'head.php'; ?>
<body>
  <?php include 'parts/ga.php'; ?>
  <script>
    document.documentElement.lang = "ja";
  </script>
  <div class="c-bg">
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/subPageFv');?>
      <div class="p-sub__contentsWrap">
        <?php the_content(); ?>
      </div>
    </main>
    <?php include 'footer.php'; ?>