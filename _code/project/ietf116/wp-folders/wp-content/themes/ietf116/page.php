<?php include 'head.php'; ?>
<body>
  <?php get_template_part('parts/tagscript');?>
  <div class="c-contentsBg">
    <?php include 'header.php'; ?>
    <main class="p-sub__main">
      <div class="p-sub__fv js-fv-area">
        <div class="p-sub__fvImg">
          <img class="is-pc" src="<?php echo IMAGES_DIR; ?>/sub_fv_pc.webp" alt="sub fv pc">
          <img class="is-sp" src="<?php echo IMAGES_DIR; ?>/sub_fv_sp.webp" alt="sub fv sp">
        </div>
        <div class="p-sub__fvLogo">
          <img src="<?php echo IMAGES_DIR; ?>/common/logo.svg" alt="IETF116 YOKOHAMA LOGO">
        </div>
      </div>
      <?php the_content(); ?>
      <?php get_template_part('parts/bottomCommon'); ?>
    </main>
    <?php include 'footer.php'; ?>