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

// Gutenberg 削除
add_filter('use_block_editor_for_post', '__return_false', 10);

// Gutenberg用Css削除
function disable_gutenberg_css() {
  wp_dequeue_style('wp-block-library');
}
add_action( 'wp_enqueue_scripts', 'disable_gutenberg_css',1000);

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

// サムネイル表示
add_theme_support('post-thumbnails');

// ショートコード追加
function Include_my_php($params = array()) {
  extract(shortcode_atts(array(
      'file' => 'default'
  ), $params));
  ob_start();
  include(get_theme_root() . '/' . get_template() . "/$file.php");
  return ob_get_clean();
}

add_shortcode('myphp', 'Include_my_php');

// 自動Pタグ削除
add_action('init', function() {
  remove_filter('the_excerpt', 'wpautop');
  remove_filter('the_content', 'wpautop');
});

add_filter('tiny_mce_before_init', function($init) {
  $init['wpautop'] = false;
  $init[‘apply_source_formatting’] = true;
  return $init;
});

?>