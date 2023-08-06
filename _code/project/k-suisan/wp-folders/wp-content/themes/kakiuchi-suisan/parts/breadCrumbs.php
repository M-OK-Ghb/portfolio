<ol class="c-breadCrumbs <?php echo get_post_field( 'post_name', get_the_ID() );?>">
  <li>
    <a href="/">TOP</a>
  </li>
  <li>
    <a href="<?php echo get_the_permalink();?>"><?php the_title(); ?></a>
  </li>
</ol>