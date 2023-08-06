<?php
/*
Template Name: HOME
*/
?>

<?php include 'head.php'; ?>
<body id="js-top-body">
  <?php include 'parts/ga.php'; ?>
  <div class="p-top__container c-bg">
    <?php include 'header.php'; ?>
    <main class="l-main">
      <div class="p-top__fv c-bgBlurWrap js-logoShow-target">
        <div class="c-bgBlur"></div>
        <div class="p-top__fvImg">
          <img src="<?php echo IMAGES_DIR; ?>/common/main_visual.webp" alt="key visual" loading="eager">
        </div>
        <div class="p-top__logoArea">
          <img src="<?php echo IMAGES_DIR; ?>/common/logo_white.png" alt="APRIM Logo" loading="eager" id="js-fv-logo">
          <p id="js-fv-message">Aug.07-11.2023</p>
        </div>
        <p class="c-fvCopy top"><span>Starscape photo:</span><br class="is-sp"> Yasuhiko ENDO</p>
        <div class="p-top__fvScroll">
          <p class="p-top__fvScrollText">SCROLL</p>
          <div class="p-top__bgAnimationWrap">
            <div class="p-top__bgBlur fvBottom"></div>
            <div class="p-top__fvScrollImg">
              <img src="<?php echo IMAGES_DIR; ?>/common/scroll_sign.png" alt="stars illustration" loading="eager">
            </div>
          </div>
        </div>
      </div>
      <div class="p-top__contentsWrap">
        <div class="p-top__bgBlur contentsTop"></div>
        <?php the_content(); ?>
      </div>
    </main>
    <?php include 'footer.php'; ?>