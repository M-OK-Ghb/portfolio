<?php
/*
Template Name: HOME
*/
?>

<?php include 'head.php'; ?>
<body class="p-top__body js-top-body">
  <?php get_template_part('parts/tagscript');?>
  <div class="c-contentsBg">
    <?php include 'header.php'; ?>
    <main class="p-top__main">
      <div class="p-top__fv js-fv-area">
        <div class="p-top__fvImg" id="js-top-fvImg">
          <img class="is-pc" src="<?php echo IMAGES_DIR; ?>/top_fv_pc.webp" alt="top fv pc">
          <img class="is-sp" src="<?php echo IMAGES_DIR; ?>/top_fv_sp.webp" alt="top fv sp">
        </div>
        <div class="p-top__fvLogo">
          <img src="<?php echo IMAGES_DIR; ?>/common/logo.svg" alt="IETF116 YOKOHAMA LOGO">
        </div>
        <div class="p-top__scrollSign">
          <img src="<?php echo IMAGES_DIR; ?>/top_scroll_down.svg" alt="● SCROLL DOWN ---">
        </div>
      </div>
      <?php get_template_part('parts/news');?>
      <?php the_content(); ?>
      <?php get_template_part('parts/bottomCommon'); ?>
    </main>
    <?php include 'footer.php'; ?>