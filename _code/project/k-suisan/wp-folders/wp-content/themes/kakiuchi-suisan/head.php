<?php
  $SITE_URL = esc_url(home_url( '/' ));
  if(is_front_page()) {
    $PAGE_TITLE = '柿内水産';
    $CONTENTS_TYPE = 'website';
    $DESCRIPTION = '柿内水産の公式サイトです。オリジナルブランド「極上 三ツ星かんぱち」を代表とした鮮魚の卸売や加工品まで、さまざまな商品を取り扱っております。';
  } else {
    $PAGE_TITLE = get_the_title() . ' - ' . '柿内水産';
    $CONTENTS_TYPE = 'article';
    $DESCRIPTION = MetaDesc();
  }
?>

<?php
  if(is_single()) {
    $CAT = get_the_category();
    $CAT_NAME = $CAT[0]->cat_name;
    $CAT_SLUG = $CAT[0]->category_nicename;
  }
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $PAGE_TITLE; ?></title>
  <meta name="description" content="<?php echo $DESCRIPTION; ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="format-detection" content="telephone=no">
  <meta property="og:title" content="<?php echo $PAGE_TITLE; ?>">
  <meta property="og:description" content="<?php echo $DESCRIPTION; ?>">
  <meta property="og:type" content="<?php echo $CONTENTS_TYPE; ?>">
  <meta property="og:image" content="<?php echo $SITE_URL.'ogp.png'; ?>">
  <meta property="og:url" content="<?php echo get_the_permalink();?>">
  <meta property="og:locale" content="ja_JP">
  <meta name="twitter:card" content="">
  <meta name="twitter:title" content="<?php echo $PAGE_TITLE; ?>">
  <meta name="twitter:description" content="<?php echo $DESCRIPTION; ?>">
  <meta name="twitter:image" content="<?php echo $SITE_URL.'ogp.png'; ?>">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="stylesheet" href="<?php echo THEME_DIR; ?>/css/swiper.min.css">
  <link rel="stylesheet" href="<?php echo THEME_DIR; ?>/css/style.css">
  <?php if(is_single()) { ?>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "item": {
            "name": "HOME",
            "@id": "<?php echo $SITE_URL; ?>"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "name": "お知らせ",
            "@id": "<?php echo $SITE_URL.'information/'; ?>"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "name": "<?php echo $CAT_NAME; ?>",
            "@id": "<?php echo $SITE_URL.'information/'.$CAT_SLUG.'/'; ?>"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "name": "<?php the_title(); ?>",
            "@id": "<?php echo get_the_permalink(); ?>"
          }
        }
      ]
    }
  </script>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Article",
      "mainEntityOfPage":{
        "@type":"WebPage",
        "@id":"<?php the_permalink(); ?>"
      },
      "headline":"<?php the_title(); ?>",
      "image": [
        "<?php echo $SITE_URL.'ogp.png'; ?>"
      ],
      "datePublished": "<?php echo get_date_from_gmt(get_post_time('c', true), 'c');?>",
      "dateModified": "<?php echo get_date_from_gmt(get_post_modified_time('c', true), 'c');?>",
      "author": {
        "@type": "Organization",
        "name": "柿内水産"
      },
      "publisher": {
        "@type": "Organization",
        "name": "柿内水産",
        "logo": {
          "@type": "ImageObject",
          "url": "<?php echo $SITE_URL.'favicon.ico'; ?>"
        }
      },
      "description": "<?php echo get_the_excerpt(); ?>"
    }
  </script>
  <?php } else if (is_home() || is_front_page()) { ?>
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "website",
      "headline": "柿内水産",
      "description": "柿内水産の公式サイトです。オリジナルブランド「極上 三ツ星かんぱち」を代表とした鮮魚の卸売や加工品まで、さまざまな商品を取り扱っております。",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "<?php echo $SITE_URL; ?>"
      },
      "image": {
        "@type": "ImageObject",
        "url": "<?php echo $SITE_URL.'ogp.png'; ?>"
      }
    }
  </script>
  <?php } ?>
  <?php wp_head(); ?>
</head>