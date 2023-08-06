<header class="l-header" id="js-header">
  <div class="l-header__inner">
    <div class="l-header__logo" id="js-header-logo">
      <a href="/">
        <img src="<?php echo IMAGES_DIR; ?>/common/logo_white.png" alt="APRIM2023" loading="lazy">
      </a>
    </div>
    <nav class="l-header__navArea">
      <?php
        echo str_replace('sub-menu', 'l-header__secondMenu js-second-menu', wp_nav_menu(array(
            'menu'  => 'Global Header Menu',
            'container' => '',
            'before' => '',
            'after' => '',
            'menu_id' => 'js-menu',
            'menu_class' => 'l-header__menu',
            'echo' => false,
            'walker'  => new custom_walker_side_menu
          ))
        );
      ?>
    </nav>
    <div class="l-header__btnWrap">
      <button class="l-header__menuOpenBtn" id="js-menu-btn">
        <span class="l-header__line"></span>
        <span class="l-header__line"></span>
        <span class="l-header__line"></span>
      </button>
    </div>
  </div>
</header>