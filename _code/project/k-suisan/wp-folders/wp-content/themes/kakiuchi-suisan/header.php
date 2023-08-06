<header class="l-header" id="js-header">
  <h1 class="l-header__heading">
    <a href="/">
      <img src="<?php echo IMAGES_DIR; ?>/site_logo.svg" alt="三代目 柿内水産" loading="eager">
    </a>
  </h1>
  <nav class="l-header__nav" id="js-global-menu">
    <ul class="l-header__globalMenu">
      <li>
        <?php if(is_page('the-best-amberjack') || is_parent_slug() === 'the-best-amberjack') { ?>
          <a id="js-link-amberjack" class="is-current" href="/the-best-amberjack/">極上 三ツ星かんぱちとは</a>
        <?php } else { ?>
          <a id="js-link-amberjack" href="/the-best-amberjack/">極上 三ツ星かんぱちとは</a>
        <?php } ?>
      </li>
      <li>
        <?php if(is_page('products') || is_parent_slug() === 'products') { ?>
          <a id="js-link-products" class="is-current" href="/products/">取り扱い商品</a>
        <?php } else { ?>
          <a id="js-link-products" href="/products/">取り扱い商品</a>
        <?php } ?>
      </li>
      <li>
        <?php if(is_page('information') || is_parent_slug() === 'information') { ?>
          <a id="js-link-information" class="is-current" href="/information/">お知らせ</a>
        <?php } else { ?>
          <a id="js-link-information" href="/information/">お知らせ</a>
        <?php } ?>
      </li>
      <li>
        <?php if(is_page('history')) { ?>
          <a class="is-current" href="/history/">柿内水産の歴史</a>
        <?php } else { ?>
          <a href="/history/">柿内水産の歴史</a>
        <?php } ?>        
      </li>
      <li>
        <?php if(is_page('company')) { ?>
          <a class="is-current" href="/company/">会社情報</a>
        <?php } else { ?>
          <a href="/company/">会社情報</a>
        <?php } ?>
      </li>
    </ul>
    <dl class="l-header__inquiryArea">
      <dt>仕入れ、ご購入についてはこちらから</dt>
      <dd>        
        <div class="c-button--inquiry w160">
          <a href="/inquiry/">
            <span class="c-button--inquiry__iconWrap">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.393 21">
                <g data-name="Icon feather-mail" transform="translate(0.696 0.5)">
                  <path d="M5.5,6h20A2.507,2.507,0,0,1,28,8.5v15A2.507,2.507,0,0,1,25.5,26H5.5A2.507,2.507,0,0,1,3,23.5V8.5A2.507,2.507,0,0,1,5.5,6Z" transform="translate(-3 -6)" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M28,9,15.5,17.75,3,9" transform="translate(-3 -6.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
            </span>
            <span class="c-button--inquiry__text">お問い合わせ</span>
          </a>
        </div>
      </dd>
    </dl>
  </nav>
  <div class="l-header__menuBtnWrap">
    <button class="l-header__menuBtn" id="js-menu-trigger">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>