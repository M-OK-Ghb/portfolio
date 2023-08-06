<?php include 'head.php'; ?>
<body>
  <div>
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/breadCrumbs');?>
      <div class="l-main__contentInner">
        <div class="c-headingWrap--subPage">
          <h2 class="c-heading--subPageTop">会社情報</h2>
          <p class="c-heading--subPageTopEn">company</p>
        </div>
        <div class="p-companyContent">
          <div class="p-companyTable">
            <dl>
              <dt>会社名</dt>
              <dd>柿内水産 有限会社</dd>
            </dl>
            <dl>
              <dt>代表取締役</dt>
              <dd>柿内輝盛</dd>
            </dl>
            <dl>
              <dt>会社所在地</dt>
              <dd>〒893-0053　<br class="is-sp">鹿児島県 鹿屋市 浜田町 204</dd>
            </dl>
            <dl>
              <dt>事業内容</dt>
              <dd>かんぱち、しまあじの養殖</dd>
            </dl>
            <dl>
              <dt>イケスの許可枠</dt>
              <dd>74台</dd>
            </dl>
            <dl>
              <dt>所属漁協</dt>
              <dd>鹿屋市漁業協同組合</dd>
            </dl>
            <dl>
              <dt>年間水揚げ量</dt>
              <dd>
                <ul class="p-companyTable__detailList">
                  <li>・かんぱち 20万尾</li>
                  <li>・しまあじ 2万尾</li>
                </ul>
              </dd>
            </dl>
            <dl>
              <dt>主要取引先</dt>
              <dd>
                <ul class="p-companyTable__detailList">
                  <li>・株式会社アスカ</li>
                  <li>・株式会社アプロジャパン</li>
                  <li>・鹿屋市漁業協同組合</li>
                  <li>・三重県漁業協同連合会</li>
                  <li>・株式会社ヨンキュウ</li>
                  <li>・株式会社ＺＥＮ風土　ほか</li>
                  <li>※五十音順</li>
                </ul>
              </dd>
            </dl>
          </div>
          <div class="p-companyPerson">
            <h3 class="c-heading--middle">三代目柿内水産 柿内三兄弟</h3>
            <div class="p-companyPerson__mvWrap">
              <img src="<?php echo IMAGES_DIR; ?>/kakiuchi_brothers.png" alt="三代目柿内水産 柿内三兄弟">
              <p>三代目柿内水産を率いるのは、創業者である初代・柿内盛吉の孫にあたる柿内家の三兄弟。</p>
              <p>長男・洋一、次男・幸洋、三男・忠洋の3人が力を合わせ、「極上 三ツ星かんぱち」をはじめとした、天然モノの味を凌ぐ養殖漁業に挑戦し続けている。</p>
            </div>
            <ul class="p-companyPerson__brothersList">
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/kakiuchi_yoichi.png" alt="柿内 洋一">
                <p>柿内 洋一</p>
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/kakiuchi_yukihiro.png" alt="柿内 幸洋">
                <p>柿内 幸洋</p>
              </li>
              <li>
                <img src="<?php echo IMAGES_DIR; ?>/kakiuchi_tadahiro.png" alt="柿内 忠洋">
                <p>柿内 忠洋</p>
              </li>
            </ul>
          </div>
          <?php get_template_part('parts/relatedLinks');?>
        </div>
      </div>
      <?php get_template_part('parts/inquiryBlock');?>
      <?php get_template_part('parts/breadCrumbs');?>
    </main>
    <?php include 'footer.php'; ?>