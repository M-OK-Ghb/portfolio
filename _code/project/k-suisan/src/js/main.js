(function(){
  // Common
  const header = document.getElementById('js-header');
  const spMenuTrigger = document.getElementById('js-menu-trigger');
  const globalMenu = document.getElementById('js-global-menu');
  const breakPoint = 960;
  const isTop = (window.document.body.id === 'js-top');
  const isArticle = (window.document.body.id === 'js-article-page');
  const isItemAmberjack = (window.document.body.id === 'js-item-amberjack');
  const isInformation = (window.document.body.id === 'js-infoDetail-page');
  const amberjackLink = document.getElementById('js-link-amberjack');
  const infoLink = document.getElementById('js-link-information');
  const productsLink = document.getElementById('js-link-products');

  // TOP-PAGE
  const topContent = document.getElementById('js-top-content');
  const topMv = document.getElementById('js-top-mv');
  const bgOffTarget = document.getElementById('js-bg-off-target');
  // Information moreBtn
  const articleWrap = document.getElementById('js-articleWrap');
  const moreBtn = document.getElementById('js-article-moreBtn');

  window.addEventListener('DOMContentLoaded', domContentLoadedSet);
  window.addEventListener('load', loadSet);
  window.addEventListener('scroll', scrollSet);

  function domContentLoadedSet() {
    menuOpenClose();
    topFvImgSet();
    swiperSet();
    articleLinkSet();
    showMoreBtn();
    currentAdjust();
  }

  function loadSet() {
    topMvAnimation()
  }

  function scrollSet() {
    topBgSet()
  }

  // Common Open-Close SP
  function menuOpenClose() {
    spMenuTrigger.addEventListener('click', ()=> {
      spMenuTrigger.classList.toggle('is-open');
      globalMenu.classList.toggle('is-open');
      header.classList.toggle('is-open');
      document.body.classList.toggle('is-open');
    });
  }

  // TOP-PAGE FV画像のランダム出力
  function topFvImgSet() {
    if(isTop) {
      const fvAry = [
        "top_key_1.webp",
        "top_key_2.webp",
        "top_key_3.webp",
        "top_key_4.webp"
      ];

      // local(ortestup)とwp環境でpathを変更
      let commonPath;
      if (window.document.body.classList.contains('js-wpFlag')) {
        commonPath = "/wp-content/themes/kakiuchi-suisan/images/";
      } else {
        commonPath = "./images/";
      }
      const srcGet = fvAry[Math.floor(Math.random() * fvAry.length)];
      const srcSet = commonPath + srcGet;
      topMv.setAttribute('src', srcSet);
      topContent.classList.add('is-show');
    } else {
      return;
    }
  }

  function topMvAnimation() {
    if(isTop) {
      topMv.classList.add('is-animation');
    } else {
      return;
    }
  }

  // TOP-PAGE 背景画像をFV画像描写後スクロール時に設置
  function topBgSet() {
    if(!isTop) { return };

    let scroll_y = window.scrollY;
    let position_y = bgOffTarget.getBoundingClientRect().top + window.pageYOffset;
    if(position_y < scroll_y && topContent.classList.contains('is-bgSet')) {
      topContent.classList.remove('is-bgSet');
    } else if(position_y > scroll_y && !topContent.classList.contains('is-bgSet')) {
      topContent.classList.add('is-bgSet');
    } else {
      return;
    }
  }

  // Swiper
  function swiperSet() {
    // AmberJack-Page FV用Swiper
    let slider1 = new Swiper ('.slider1', {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 1.25,
      centeredSlides: true,
      breakpoints: {
        960: {
          spaceBetween: 20,
          slidesPerView: 2,
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  
    // Cooking用Swiper
    let slider2 = new Swiper ('.slider2', {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 1.25,
      centeredSlides: true,
      breakpoints: {
        960: {
          spaceBetween: 20,
          slidesPerView: 2.75,
        }
      },
      pagination: {
        el: '.swiper-pagination-cooking',
        clickable: true
      }
    });
  }

  // Information Page
  // article初期表示
  function articleLinkSet() {
    if(!articleWrap) { return };
    const articleCount = articleWrap.children.length;
    // 最大件数8
    const showCount = 8;
    if(articleCount < showCount) {
      for(let i = 0; i < articleCount; i++) {
        articleWrap.children[i].classList.remove('is-link-hide');
      }
      moreBtn.classList.add('is-link-hide');
    } else {
      for(let i = 0; i < showCount; i++) {
        articleWrap.children[i].classList.remove('is-link-hide');
      }
    }
  }

  // もっと見るボタン(8件)
  function showMoreBtn() {
    if(!moreBtn) { return };
    moreBtn.addEventListener('click', ()=> {
      const isHideCount = document.querySelectorAll('.is-link-hide');
      // 追加表示件数
      const showCount = 8;
      if(isHideCount.length > showCount) {
        for(let i = 0; i < showCount; i++) {
          isHideCount[i].classList.remove('is-link-hide');
        }
      } else {
        for(let i = 0; i < isHideCount.length; i++) {
          isHideCount[i].classList.remove('is-link-hide');
        }
        moreBtn.classList.add('is-link-hide');
      }
    });
  }

  // header current 調整
  function currentAdjust() {
    if(isArticle) {
      infoLink.classList.add('is-current');
    } else if(isItemAmberjack) {
      amberjackLink.classList.remove('is-current');
    } else if(isInformation){
      productsLink.classList.remove('is-current');
    } else {
      return;
    }
  }
}());