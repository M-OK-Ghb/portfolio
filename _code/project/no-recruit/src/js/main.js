(function(){
  // Common
  const globalMenu = document.getElementById('js-global-menu');
  const globalBtn = document.getElementById('js-menu-trigger');
  const globalFirstLink = document.querySelectorAll('.js-first-link');
  const globalSecondTrigger = document.querySelectorAll('.js-header-second-trigger');
  const globalSecondMenu = document.querySelectorAll('.js-header-second-menu');
  const scrollTopBtn = document.querySelectorAll('.js-scrollTop-btn');
  const breakPoint = 961;
  const entryTrigger = document.getElementById('js-header-entry-trigger');
  const entryList = document.getElementById('js-header-entry-list');
  // MovieModal
  const modalOpenBtn = document.getElementsByClassName('js-modalOpenBtn');
  const modalCloseBtn = document.getElementsByClassName('js-modalCloseBtn');
  const modalWrap = document.getElementById('js-modalWrap');
  const modalContent = document.getElementsByClassName('js-modalContent');

  // TOP
  const fvCatchCopy = document.getElementById('js-top-catch');
  const fvSlide = document.querySelectorAll('.js-fv-slider');
  const newsList = document.getElementById('js-news-list');
  const newsMoreBtn = document.getElementById('js-news-moreBtn');
  const topSwiper = document.getElementById('js-top-swiper');

  // SUB
  const fvTitleSub = document.querySelectorAll('.js-sub-titleTop');
  const subFvImg = document.querySelectorAll('.js-sub-fvImg');

  // CULTURE
  const cultureSwiper = document.querySelectorAll('.js-culture-swiper');

  // PEOPLE
  const peopleMain = document.getElementById('js-people-main');

  // WORK
  const tabTrigger = document.querySelectorAll('.js-tab-trigger');

  window.addEventListener('DOMContentLoaded', initSet);
  window.addEventListener('load', loadSet);
  window.addEventListener('scroll', scrollSet);

  function initSet() {
    globalMenuSet();
    topSwiperSet();
    newsListSet();
    newsListShowHide();
    movieModalSet();
    scrollTopSet();
    cultureSwiperSet();
    accordionSet();
    peopleDetailShow();
    tabMenuSet();
    hashScroll();
  }

  function loadSet() {
    catchCopyAnimation();
    topFvImgShow();
    subTitleShow();
    subFvImgShow();
  }

  function scrollSet() {
    scrollFadeIn();
    scrollShowBtn();
  }

  function globalMenuSet() {
    globalBtn.addEventListener('click', ()=> {
      document.body.classList.toggle('is-open');
      globalBtn.classList.toggle('is-open');
      globalMenu.classList.toggle('is-open');
    });

    for(let i = 0 ; i < globalSecondTrigger.length; i++) {
      globalSecondTrigger[i].addEventListener('click', ()=> {
        globalSecondMenu[i].classList.toggle('is-open');
        globalSecondTrigger[i].classList.toggle('is-open');
      });
    }

    for(let i = 0 ; i < globalFirstLink.length; i++) {
      globalFirstLink[i].addEventListener('click', (e)=> {
        if(window.innerWidth < breakPoint) {
          e.preventDefault();  
          globalSecondMenu[i].classList.toggle('is-open');
          globalSecondTrigger[i].classList.toggle('is-open');
        } else {
          return;
        }
      })
    }

    entryTrigger.addEventListener('click', ()=> {
      entryTrigger.classList.toggle('is-open');
      entryList.classList.toggle('is-open');
      setTimeout(() => {
        entryList.classList.toggle('is-show');
      }, 100);
    });
  }

  function topSwiperSet() {
    if(!topSwiper) { return };
    const topPageSwiper = new Swiper('.swiper', {
      loop: true,
      // 1枚目センター
      centeredSlides: true,
      spaceBetween: 20,
      slidesPerView: 1.5,
      breakpoints: {
        961: {
          spaceBetween: 40,
          slidesPerView: 4,
        }
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  function cultureSwiperSet() {
    if(!cultureSwiper[0]) { return };
    const cultureSwiperFirst = new Swiper('.swiper-culture-first', {
      loop: true,
      // 1枚目センター
      centeredSlides: true,
      spaceBetween: 20,
      slidesPerView: 1.25,
      breakpoints: {
        961: {
          spaceBetween: 50,
          slidesPerView: 2.05
        }
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });

    const cultureSwiperSecond = new Swiper('.swiper-culture-second', {
      loop: true,
      // 1枚目センター
      centeredSlides: true,
      spaceBetween: 20,
      slidesPerView: 1.25,
      breakpoints: {
        961: {
          spaceBetween: 50,
          slidesPerView: 2.05
        }
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }

  function catchCopyAnimation() {
    if(!fvCatchCopy) { return };
    setTimeout(() => {
      fvCatchCopy.classList.add('is-start');
      setTimeout(() => {
        fvCatchCopy.classList.add('is-fadeInShape');
      }, 1000);
    }, 300);
  }

  function topFvImgShow() {
    if(!fvSlide[0]) { return };
    for( let i = 0 ; i < fvSlide.length; i++ ) {
      let childCount = fvSlide[i].childElementCount;
      for(let j = 0 ; j < childCount; j++ ) {
        fvSlide[i].children[j].classList.add('is-show');
      }
    }
  }

  function subTitleShow() {
    if(!fvTitleSub[0]) { return };
    fvTitleSub[0].classList.add('is-show');
  }

  function subFvImgShow() {
    if(!subFvImg[0]) { return };
    subFvImg[0].classList.add('is-show');
  }

  function peopleDetailShow() {
    if(!peopleMain) { return };
    peopleMain.classList.add('is-show');
  }

  function scrollFadeIn() {
    let element = document.querySelectorAll('.js-scrollFadeIn');
    if(!element[0]) { return };
    let scrollY = window.pageYOffset;
    let windowH = window.innerHeight;
    // 表示タイミングの位置調整
    let showTiming = 100;
    for(let i=0; i < element.length; i++) {
      let elemClientRect = element[i].getBoundingClientRect();
      let elemY = scrollY + elemClientRect.top;
      if(scrollY > elemY - windowH + showTiming) {
        element[i].classList.add("is-show");
      }
    }
  }

  function newsListSet() {
    if(!newsList) { return };
    const newsListCount = newsList.children.length;
    // 初期表示3件
    const showCount = 3;
    if(newsListCount <= showCount) {
      for(let i = 0; i < newsListCount; i++) {
        newsList.children[i].classList.remove('is-link-hide');
      }
      newsMoreBtn.classList.add('is-link-hide');
    } else {
      for(let i = 0; i < showCount; i++) {
        newsList.children[i].classList.remove('is-link-hide');
      }
    }
  }

  function newsListShowHide() {
    if(!newsMoreBtn) { return };
    newsMoreBtn.addEventListener('click', ()=> {
      const isHideCount = document.querySelectorAll('.is-link-hide');
      // 追加表示件数
      const showCount = 3;
      if(isHideCount.length > showCount) {
        for(let i = 0; i < showCount; i++) {
          isHideCount[i].classList.remove('is-link-hide');
        }
      } else {
        for(let i = 0; i < isHideCount.length; i++) {
          isHideCount[i].classList.remove('is-link-hide');
        }
        newsMoreBtn.classList.add('is-link-hide');
      }
    });
  }

  function movieModalSet() {
    // Youtube 埋め込みURL
    let iframesSalesSrc = 'https://www.youtube.com/embed/OzRTL1nKsi4';
    let iframesSeSrc = 'https://www.youtube.com/embed/dvezrjeFDC4';
    if( modalOpenBtn.length === 1 ) {
      // 1つの時SEか営業か分岐
      const jobtypeFlag = document.getElementById('js-jobtype-detail');
      let iframes = document.getElementsByClassName('js-iframe');
      if(jobtypeFlag.classList.contains('--sales')) {
        modalOpenBtn[0].addEventListener('click', (e)=> {
          modalWrap.classList.add('is-show');
          modalContent[0].classList.add('is-show');
          document.body.classList.add('is-modal-open');
          iframes[0].setAttribute('src', iframesSalesSrc);
        });

        modalCloseBtn[0].addEventListener('click', (e)=> {
          modalWrap.classList.remove('is-show');
          modalContent[0].classList.remove('is-show');
          document.body.classList.remove('is-modal-open');
          iframes[0].setAttribute('src', '');
        });

        modalWrap.addEventListener('click', (e)=> {
          if(e.target.closest('#js-videoWrap') === null) {
            modalWrap.classList.remove('is-show');
            modalContent[0].classList.remove('is-show');
            document.body.classList.remove('is-modal-open');
            iframes[0].setAttribute('src', '');
          }
        });
      } else {
        modalOpenBtn[0].addEventListener('click', (e)=> {
          modalWrap.classList.add('is-show');
          modalContent[0].classList.add('is-show');
          document.body.classList.add('is-modal-open');
          iframes[0].setAttribute('src', iframesSeSrc);
        });

        modalCloseBtn[0].addEventListener('click', (e)=> {
          modalWrap.classList.remove('is-show');
          modalContent[0].classList.remove('is-show');
          document.body.classList.remove('is-modal-open');
          iframes[0].setAttribute('src', '');
        });

        modalWrap.addEventListener('click', (e)=> {
          if(e.target.closest('#js-videoWrap') === null) {
            modalWrap.classList.remove('is-show');
            modalContent[0].classList.remove('is-show');
            document.body.classList.remove('is-modal-open');
            iframes[0].setAttribute('src', '');
          }
        });
      }
    } else if( modalOpenBtn.length === 2 ) {
      let iframes = document.getElementsByClassName('js-iframe');
      /* 再生停止処理のため、各ifrmaeのSrcを保存 */
      for(let i=0; i < modalOpenBtn.length; i++) {
        modalOpenBtn[i].addEventListener('click', (e)=> {
          modalWrap.classList.add('is-show');
          modalContent[i].classList.add('is-show');
          document.body.classList.add('is-modal-open');
  
          if(i === 0)  {
            iframes[i].setAttribute('src', iframesSalesSrc);
          } else {
            iframes[i].setAttribute('src', iframesSeSrc);
          }
        });
  
        modalCloseBtn[i].addEventListener('click', (e)=> {
          modalWrap.classList.remove('is-show');
          modalContent[i].classList.remove('is-show');
          document.body.classList.remove('is-modal-open');
          iframes[i].setAttribute('src', '');
        });
  
        modalWrap.addEventListener('click', (e)=> {
          if(e.target.closest('#js-videoWrap') === null) {
            modalWrap.classList.remove('is-show');
            modalContent[i].classList.remove('is-show');
            document.body.classList.remove('is-modal-open');
            iframes[i].setAttribute('src', '');
          }
        });
      }
    }
  }

  function scrollTopSet() {
    if(!scrollTopBtn[0]) { return };
    let scrollY = 0;
    for(let i = 0 ; i < scrollTopBtn.length; i++) {
      scrollTopBtn[i].addEventListener('click', ()=> {
        scrollY = window.pageYOffset;
        smoothScroll()
      });

      function smoothScroll() {
        scrollY = scrollY - 200;
        scrollTo(0, scrollY);
        if(scrollY < 0 ) {
          return;
        } else {
          setTimeout(() => {
            smoothScroll()
          }, 30);
        }
      }
    }
  }

  function scrollShowBtn() {
    if(!scrollTopBtn[0]) { return };
    let wh = window.innerHeight;
    let targetPos = wh * 0.75;
    if(targetPos < window.pageYOffset) {
      scrollTopBtn[0].classList.add('is-show');
    } else {
      scrollTopBtn[0].classList.remove('is-show');
    }
  }

  // FAQ-PAGE Accordion
  function accordionSet() {
    const faqTrigger = document.querySelectorAll(".js-faq-menuTrigger");
    const faqAnswer = document.querySelectorAll(".js-faq-answer");
    if(!faqTrigger) return;
    for(let i=0; i < faqTrigger.length; i++) {
      faqTrigger[i].addEventListener('click', function() {
        this.classList.toggle('is-open');
        faqAnswer[i].classList.toggle('is-open');
      });
    }
  }

  // WorkPage Tab
  function tabMenuSet() {
    if(!tabTrigger[0]) { return };
    const contents = document.querySelectorAll('.js-schedule-block');
    const triggerWrap = document.querySelectorAll('.js-tab-triggerWrap');
    const genreChangeBtn = document.querySelectorAll('.js-genreChange');
    const scheduleAll = document.getElementById('js-schedule');

    triggerWrap[0].classList.add('is-active');
    tabTrigger[0].classList.add('is-active');
    contents[0].classList.add('is-active');

    tabTrigger[0].addEventListener('click', ()=> {
      tabTrigger[0].classList.add('is-active');
      triggerWrap[0].classList.add('is-active');
      contents[0].classList.add('is-active');

      tabTrigger[1].classList.remove('is-active');
      triggerWrap[1].classList.remove('is-active');
      contents[1].classList.remove('is-active');

      scheduleAll.classList.remove('is-right');
    });

    tabTrigger[1].addEventListener('click', ()=> {
      tabTrigger[0].classList.remove('is-active');
      triggerWrap[0].classList.remove('is-active');
      contents[0].classList.remove('is-active');

      tabTrigger[1].classList.add('is-active');
      triggerWrap[1].classList.add('is-active');
      contents[1].classList.add('is-active');

      scheduleAll.classList.add('is-right');
    });

    genreChangeBtn[0].addEventListener('click', ()=> {
      tabTrigger[0].classList.remove('is-active');
      triggerWrap[0].classList.remove('is-active');
      contents[0].classList.remove('is-active');

      tabTrigger[1].classList.add('is-active');
      triggerWrap[1].classList.add('is-active');
      contents[1].classList.add('is-active');

      scheduleAll.classList.add('is-right');

      let scrollY = window.pageYOffset;

      smoothScroll();
      function smoothScroll() {
        scrollY = scrollY - 200;
        scrollTo(500, scrollY);
        if(scrollY < 500 ) {
          return;
        } else {
          setTimeout(() => {
            smoothScroll()
          }, 30);
        }
      }
    });

    genreChangeBtn[1].addEventListener('click', ()=> {
      tabTrigger[0].classList.add('is-active');
      triggerWrap[0].classList.add('is-active');
      contents[0].classList.add('is-active');

      tabTrigger[1].classList.remove('is-active');
      triggerWrap[1].classList.remove('is-active');
      contents[1].classList.remove('is-active');

      scheduleAll.classList.remove('is-right');

      let scrollY = window.pageYOffset;

      smoothScroll();
      function smoothScroll() {
        scrollY = scrollY - 200;
        scrollTo(500, scrollY);
        if(scrollY < 500 ) {
          return;
        } else {
          setTimeout(() => {
            smoothScroll()
          }, 30);
        }
      }
    });
  }

  // hash scroll
  function hashScroll() {
    let urlHash = location.hash;
    if(!urlHash) { return };
    window.scrollTo(0,0);
    setTimeout(() => {
      let urlHashCustom = String('js-' + location.hash.slice(1));
      let target = document.getElementById(urlHashCustom);
      if(!target) { return };
      let positionY = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: positionY,
        behavior: "smooth"
      });
    }, 500);
  }
}());