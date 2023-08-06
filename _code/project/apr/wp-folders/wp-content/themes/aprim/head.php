<?php
  $SITE_URL = esc_url(home_url( '/' ));
  if(is_front_page()) {
    $PAGE_TITLE = 'The Asia-Pacific Regional IAU Meeting 2023 (APRIM 2023)';
    $CONTENTS_TYPE = 'website';
    $DESCRIPTION = MetaDesc();
  } else {
    $PAGE_TITLE = get_the_title() . ' - ' . 'APRIM 2023';
    $CONTENTS_TYPE = 'article';
    $DESCRIPTION = MetaDesc();
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $PAGE_TITLE; ?></title>
  <meta name="description" content="<?php echo $DESCRIPTION; ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="format-detection" content="telephone=no">
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-5Q9VN4N');</script>
  <!-- End Google Tag Manager -->
  <meta property="og:title" content="<?php echo $PAGE_TITLE; ?>">
  <meta property="og:description" content="<?php echo $DESCRIPTION; ?>">
  <meta property="og:type" content="<?php echo $CONTENTS_TYPE; ?>">
  <meta property="og:image" content="<?php echo $SITE_URL.'ogp.png'; ?>">
  <meta property="og:url" content="<?php echo get_the_permalink();?>">
  <meta property="og:locale" content="en_US">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="stylesheet" href="<?php echo THEME_DIR; ?>/css/style.css">
  <?php wp_head(); ?>
</head>