// ハンバーガーメニュー
$(document).ready(function(){
	$("header .button a").click(function(){
		$("header .overlay").fadeToggle(200);
		$(this).toggleClass('btn-open').toggleClass('btn-close');
	});
});
$('#header-group-nav .overlay').on('click', function(){
	$("header .overlay").fadeToggle(200);
	$("header .button a").toggleClass('btn-open').toggleClass('btn-close');
	open = false;
});

$(function () {
    var over_flg = false;
	$('.dd-hook').click(function() {
		$(this).next('.dd-content').slideToggle('fast');
	});
	$('.dd-hook,.dd-content').hover(function(){
		over_flg = true;
	}, function(){
		over_flg = false;
	});
	$('body').click(function() {
		if (over_flg == false) {
		$('.dd-content').slideUp('fast');
		}
	});
});


// Slick スライダー
$(function(){
	$('.slider').slick({
		autoplay:true,
		autoplaySpeed:5000,
		dots:false,
		speed:1500,
		slidesToShow:1,
		asNavFor:'.slider-text',
		prevArrow:'<div class="prev"></div>',
		nextArrow:'<div class="next"></div>'
	});

	$('.slider-text').slick({
		asNavFor:'.slider',
		arrows:false,
		slidesToShow:1,
		slidesToScroll:1
	}); 
});


// モーダルウインドウ Movie
$(function(){
	$('.js-modal-close').on('click',function(){
		$('.js-modal').fadeOut();
		return false;
	});
});

// 毎回ムービーを表示する場合はコメントアウトする
$(function(){
	$(".modal").show();
	$.cookie('btnFlg') == 'on'?$(".modal").hide():$(".modal").show();
	$(".modal .modal-content button").click(function(){
		$(".modal").fadeOut();
		$.cookie('btnFlg', 'on', { expires: 30,path: '/' }); // 30日間表示しない
	});
});


// 先頭へ移動するボタン
function getScrolled() {
 return ( window.pageYOffset !== undefined ) ? window.pageYOffset: document.documentElement.scrollTop;
}
var topButton = document.getElementById( 'page-top' );
// window.onscroll = function() {
//   ( getScrolled() > 500 ) ? topButton.classList.add( 'fade-in' ): topButton.classList.remove( 'fade-in' );
// };
function scrollToTop() {
  var scrolled = getScrolled();
  window.scrollTo( 0, Math.floor( scrolled / 2 ) );
  if ( scrolled > 0 ) {
    window.setTimeout( scrollToTop, 30 );
  }
};
// topButton.onclick = function() {
//   scrollToTop();
// };


// アニメーション
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});