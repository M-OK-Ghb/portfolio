<?php

/*定数*/
define('THEME_DIR', get_template_directory_uri());
define('IMAGES_DIR', get_template_directory_uri() . '/images');

/*不要なwp_head削除*/
remove_action('wp_head', 'feed_links', 2);
remove_action('wp_head', 'feed_links_extra', 3);
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles', 10);
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_filter( 'wp_robots', 'wp_robots_max_image_preview_large' );

add_filter( 'show_admin_bar', '__return_false' );

function remove_recent_comments_style() { global $wp_widget_factory; remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) ); }
add_action( 'widgets_init', 'remove_recent_comments_style' );

function remove_recent_comment_css() {
    global $wp_widget_factory;
    remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action( 'widgets_init', 'remove_recent_comment_css');

function remove_my_global_styles() {
	wp_dequeue_style( 'global-styles' );
}

add_action( 'wp_enqueue_scripts', 'remove_my_global_styles' );

// 固定ページのみGutenberg非表示
// function hide_block_editor( $use_block_editor, $post_type ) {
//   if ( $post_type === 'page' ) return false;
//   return $use_block_editor;
// }

// add_filter( 'use_block_editor_for_post_type', 'hide_block_editor', 10, 10 );

// Description
add_action('admin_menu', 'add_custom_fields');
add_action('save_post', 'save_custom_fields');

// 記事ページと固定ページでカスタムフィールドを表示
function add_custom_fields() {
  add_meta_box( 'my_sectionid', 'ページの説明（description）', 'my_custom_fields', 'post');
  add_meta_box( 'my_sectionid', 'ページの説明（description）', 'my_custom_fields', 'page');
}
function my_custom_fields() {
  global $post;
  $description = get_post_meta($post->ID,'description',true);
  echo '<p>ページの説明（description）160文字以内<br>';
  echo '<input type="text" style="width: 600px;height: 40px;" name="description" value="'.esc_html($description).'" maxlength="160"></p>';
}

// カスタムフィールドの値を保存
function save_custom_fields( $post_id ) {
  if(!empty($_POST['description'])){
    update_post_meta($post_id, 'description', $_POST['description'] );
  }else{
    delete_post_meta($post_id, 'description');
  }
}
function MetaDesc() {
  // カスタムフィールドの値を読み込む
  $custom = get_post_custom();
  if(!empty( $custom['description'][0])) {
    $description = $custom['description'][0];
  }
  if(is_home()){// トップページ
    return $description;
  }elseif(is_single()){// 記事ページ
    return $description;
  }elseif(is_page()){// 固定ページ
    return $description;
  }elseif(is_archive()){// 記事ページ
    return $description;
  };
}

function load_contactform7(){
  if(!is_page('inquiry') )
  {
    wp_dequeue_script('contact-form-7');
    wp_dequeue_style('contact-form-7');
  }
}
add_action( 'wp_enqueue_scripts', 'load_contactform7' );

add_filter( 'wpcf7_validate_email', 'wpcf7_text_validation_filter_extend', 11, 2 );
add_filter( 'wpcf7_validate_email*', 'wpcf7_text_validation_filter_extend', 11, 2 );
function wpcf7_text_validation_filter_extend( $result, $tag ) {
global $my_email_confirm;
$tag = new WPCF7_Shortcode( $tag );
$name = $tag->name;
$value = isset( $_POST[$name] )
? trim( wp_unslash( strtr( (string) $_POST[$name], "\n", " " ) ) )
: '';
if ($name == "your-email"){
$my_email_confirm=$value;
}
if ($name == "your-email_confirm" && $my_email_confirm != $value){
$result->invalidate( $tag,"確認用のメールアドレスが一致していません");
}

return $result;
}

// Gutenberg 削除
add_filter('use_block_editor_for_post', '__return_false', 10);

// 投稿ページ Shortcode
function img_caption_text($atts) {
	return "<span class='c-article__imgCaption'>".$atts['text']."</span>";
}

add_shortcode('画像キャプション', 'img_caption_text');

function the_term_block($atts) {
	return "<div class='c-article__descriptionBlock'><h4>".$atts['title']."</h4><p>".$atts['text']."</p></div>";
}

add_shortcode('用語ブロック', 'the_term_block');

function internal_link_block($atts) {
	return "<div class='c-article__link icon-arrow'><a href=".$atts['link']."><span>".$atts['text']."</span></a></div>";
}

add_shortcode('内部リンクブロック', 'internal_link_block');

function external_link_block($atts) {
	return "<div class='c-article__link icon-external'><a href=".$atts['link']." target='_blank'><span>".$atts['text']."</span></a></div>";
}

add_shortcode('外部リンクブロック', 'external_link_block');

function img_double($atts) {
	return "<div class='c-article__imgDouble'><div class='c-article__imgDoubleItem'><img src=".$atts["src1"]." alt=".$atts["name1"]."></div><div class='c-article__imgDoubleItem'><img src=".$atts["src2"]." alt=".$atts["name2"]."></div></div>";
}

add_shortcode('画像ダブル', 'img_double');

function my_tiny_mce_before_init( $init_array ) {
  $init_array['valid_elements']          = '*[*]';
  $init_array['extended_valid_elements'] = '*[*]';

  return $init_array;
}
add_filter( 'tiny_mce_before_init' , 'my_tiny_mce_before_init' );

// グロナビ カレント設定(微調整はjsにて対応)
function is_parent_slug() {
  global $post;
  if ($post->post_parent) {
      $post_data = get_post($post->post_parent);
      return $post_data->post_name;
  }
}

// パンくずリスト生成(singleページのパンくずのみ、head内に記載)
function json_breadcrumb() {
 
  if( is_admin() || is_home() || is_front_page() || is_single()){ return; }
 
  $position  = 1;
  $query_obj = get_queried_object();
  $permalink = ( empty($_SERVER["HTTPS"] ) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
 
  $json_breadcrumb = array(
    "@context"        => "http://schema.org",
    "@type"           => "BreadcrumbList",
    "name"            => "パンくずリスト",
    "itemListElement" => array(
      array(
        "@type"    => "ListItem",
        "position" => $position++,
        "item"     => array(
          "name" => "HOME",
          "@id"  => esc_url( home_url('/') ),
        )
      ),
    ),
  );
 
  if( is_page() ) {
 
    $ancestors   = get_ancestors( $query_obj->ID, 'page' );
    $ancestors_r = array_reverse($ancestors);
    if ( count( $ancestors_r ) != 0 ) {
      foreach ($ancestors_r as $key => $ancestor_id) {
        $ancestor_obj = get_post($ancestor_id);
        $json_breadcrumb['itemListElement'][] = array(
          "@type"    => "ListItem",
          "position" => $position++,
          "item"     => array(
            "name" => esc_html($ancestor_obj->post_title),
            "@id"  => esc_url( get_the_permalink($ancestor_obj->ID) ),
          )
        );
      }
    }
    $json_breadcrumb['itemListElement'][] = array(
      "@type"    => "ListItem",
      "position" => $position++,
      "item"     => array(
        "name" => esc_html($query_obj->post_title),
        "@id"  => esc_url($permalink),
      )
    );
 
  } elseif( is_post_type_archive() ) {
 
    $json_breadcrumb['itemListElement'][] = array(
      "@type"    => "ListItem",
      "position" => $position++,
      "item"     => array(
        "name" => $query_obj->label,
        "@id"  => esc_url( get_post_type_archive_link( $query_obj->name ) ),
      )
    );
 
  } elseif( is_tax() || is_category() ) {
 
    if ( !is_category() ) {
      $post_type = get_taxonomy( $query_obj->taxonomy )->object_type[0];
      $pt_obj    = get_post_type_object( $post_type );
      $json_breadcrumb['itemListElement'][] = array(
        "@type"    => "ListItem",
        "position" => $position++,
        "item"     => array(
          "name" => $pt_obj->label,
          "@id"  => esc_url( get_post_type_archive_link($pt_obj->name) ),
        )
      );
    }
 
    $ancestors   = get_ancestors( $query_obj->term_id, $query_obj->taxonomy );
    $ancestors_r = array_reverse($ancestors);
    foreach ($ancestors_r as $key => $ancestor_id) {
      $json_breadcrumb['itemListElement'][] = array(
        "@type"    => "ListItem",
        "position" => $position++,
        "item"     => array(
          "name" => esc_html( get_cat_name($ancestor_id) ),
          "@id"  => esc_url( get_term_link($ancestor_id, $query_obj->taxonomy) ),
        )
      );
    }
 
    $json_breadcrumb['itemListElement'][] = array(
      "@type"    => "ListItem",
      "position" => $position++,
      "item"     => array(
        "name" => esc_html( $query_obj->name ),
        "@id"  => esc_url( get_term_link($query_obj) ),
      )
    );
 
  } elseif( is_404() ) {
 
    $json_breadcrumb['itemListElement'][] = array(
      "@type"    => "ListItem",
      "position" => $position++,
      "item"     => array(
        "name" => "404 Not found",
        "@id"  => esc_url($permalink),
      )
    );
 
  } elseif( is_search() ) {
 
    $json_breadcrumb['itemListElement'][] = array(
      "@type"    => "ListItem",
      "position" => $position++,
      "item"     => array(
        "name" => "「" . get_search_query(). "」の検索結果",
        "@id"  => esc_url($permalink),
      )
    );
 
  }
 
  echo '<script type="application/ld+json">'.json_encode( $json_breadcrumb, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ).'</script>';
}
 
add_action( 'wp_head', 'json_breadcrumb' );


// widget追加
function my_theme_widgets_init() {
  register_sidebar( array(
    'name' => 'Main Sidebar',
    'id' => 'main-sidebar',
  ) );
}
add_action( 'widgets_init', 'my_theme_widgets_init' );

// Block Editor false
add_filter( 'use_widgets_block_editor', '__return_false' );

// 記事のピックアップ機能追加
function add_pickup_setting_fields() {
	add_meta_box( 'pickup_setting', 'ピックアップ機能', 'insert_pickup_setting_fields', 'post', 'normal', 'high');
}
add_action('admin_menu', 'add_pickup_setting_fields');

function insert_pickup_setting_fields() {
	global $post;
	if( get_post_meta($post->ID,'pickup_content',true) == "pickup" ) {
		$pickup_content_check = "checked";
	}
	echo '<p class="meta-options"><label><input type="checkbox" name="pickup_content" value="pickup" '.$pickup_content_check.' >ピックアップ記事として登録</label></p>';
}

// ピックアップ カスタムフィールドの値を保存
function save_pickup_setting_fields( $post_id ) {
	if(!empty($_POST['pickup_content'])){
		update_post_meta($post_id, 'pickup_content', $_POST['pickup_content'] );
	} else {
		delete_post_meta($post_id, 'pickup_content');
	}
}
add_action('save_post', 'save_pickup_setting_fields');

// 投稿一覧にピックアップの項目を追加
function add_cf_posts_columns( $columns ) {
  $columns['pickup'] = 'ピックアップ';
  return $columns;
}
function cf_posts_custom_column( $column_name, $post_id ) {
  if ( $column_name == 'pickup' ) {
    $cf_data = get_post_meta( $post_id , 'pickup_content' , true );
    echo ( $cf_data ) ? '選択中' : '-';
  }
}
add_filter( 'manage_posts_columns', 'add_cf_posts_columns' );
add_action( 'manage_posts_custom_column', 'cf_posts_custom_column', 10, 2 );

// 記事のピックアップの中で最優先表示する機能を追加
function add_pickup_top_setting_fields() {
	add_meta_box( 'pickup_top_setting', '最優先表示', 'insert_pickup_top_setting_fields', 'post', 'normal', 'high');
}
add_action('admin_menu', 'add_pickup_top_setting_fields');

function insert_pickup_top_setting_fields() {
	global $post;
	if( get_post_meta($post->ID,'pickup_top_content',true) == "pickup_top" ) {
		$pickup_top_content_check = "checked";
	}
	echo '<p class="meta-options"><label><input type="checkbox" name="pickup_top_content" value="pickup_top" '.$pickup_top_content_check.' >ピックアップ最優先記事として登録</label></p>';
}

function save_pickup_top_setting_fields( $post_id ) {
	if(!empty($_POST['pickup_top_content'])){
		update_post_meta($post_id, 'pickup_top_content', $_POST['pickup_top_content'] );
	} else {
		delete_post_meta($post_id, 'pickup_top_content');
	}
}
add_action('save_post', 'save_pickup_top_setting_fields');

function add_cf_posts_columns_topadd( $columns ) {
  $columns['pickup_top'] = '最優先表示';
  return $columns;
}
function cf_posts_custom_column_topadd( $column_name, $post_id ) {
  if ( $column_name == 'pickup_top' ) {
    $cf_data = get_post_meta( $post_id , 'pickup_top_content' , true );
    echo ( $cf_data ) ? '選択中' : '-';
  }
}
add_filter( 'manage_posts_columns', 'add_cf_posts_columns_topadd' );
add_action( 'manage_posts_custom_column', 'cf_posts_custom_column_topadd', 10, 2 );

// 投稿一覧のカラム順を制御
function posts_columns_sort($columns){
  $sort_number = array(
      'cb'             => 0,
      'title'          => 1,
      'categories'     => 2,
      'pickup'         => 3,
      'pickup_top'     => 4,
      'tags'           => 5,
      'author'         => 6,
      'date'           => 7
  );

  $sort = array();
  foreach($columns as $key => $value){
      $sort[] = $sort_number[$key];
  }
  array_multisort($sort, $columns);

  return $columns;
}
add_filter('manage_posts_columns', 'posts_columns_sort');

// サムネイル登録
add_theme_support('post-thumbnails');
?>