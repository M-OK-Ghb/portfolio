<?php
/*
Template Name: CONTACT
*/
?>
<?php include 'head.php'; ?>
<body>
  <?php include 'parts/ga.php'; ?>
  <div class="c-bg">
    <?php include 'header.php'; ?>
    <main class="l-main">
      <?php get_template_part('parts/subPageFv');?>
      <div class="p-sub__contentsWrap">
        <section class="c-section">
            <div class="c-headingWrap --h1">
              <h1 class="c-heading --h1">
                <span class="c-heading__text">Contact Us</span>
              </h1>
              <div class="c-heading__lineArea">
                <div class="c-heading__lineWrap js-heading-line">
                  <span class="c-heading__line first"></span>
                  <span class="c-heading__line second"></span>
                  <span class="c-heading__line third"></span>
                </div>
              </div>
            </div>
            <div class="c-contentsWrap">
              <div class="p-contact__area">
                <ul class="c-info__list">
                  <li class="c-text">Please use the following inquiry form to contact APRIM 2023 LOC. Please note that it may take about one week to answer.</li>
                </ul>
                <div class="c-textArea">
                  <h3 class="c-heading --h3">About the privacy policy</h3>
                  <p class="c-text">Information provided will not be used for any purpose other than replying to inquiries.</p>
                </div>
                <h3 class="p-contact__note">
                  <img src="<?php echo IMAGES_DIR; ?>/contact_note.svg" alt="✴︎ = required">
                </h3>
                <div class="p-contact__itemWrap">
                  <?php the_content(); ?>
                </div>
              </div>
            </div>
          </section>
      </div>
    </main>
    <?php include 'footer.php'; ?>