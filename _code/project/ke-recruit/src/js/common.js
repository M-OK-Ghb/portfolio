(function () {
  // Common
  const body = document.getElementsByTagName('body')[0];
  const bodyW = window.innerWidth;
  const spPoint = 640;
  const tbPoint = 980;
  const globalMenuOpenBtn = document.getElementById('js-menu-open');
  const globalMenuCloseBtn = document.getElementById('js-menu-close');
  const globalMenu = document.getElementById('js-global-menu');
  // SmoothScroll
  const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
  const urlHash = location.hash;
  // MovieModal
  const modalOpenBtn = document.getElementsByClassName('js-modalOpenBtn');
  const modalCloseBtn = document.getElementsByClassName('js-modalCloseBtn');
  const modalWrap = document.getElementById('js-modalWrap');
  const modalContent = document.getElementsByClassName('js-modalContent');
  // TopPage
  const topHeader = document.getElementById('js-top-header');
  const targetTop = document.getElementById('js-main-content');
  const breakPointSize = 980;

  window.addEventListener('DOMContentLoaded', domContentLoadedSet);
  window.addEventListener('load', loadSet);
  window.addEventListener('scroll', scrollFadeIn);

  function loadSet() {
    subPageFadeIn();
    subPageHeadingAnimation();
    loadingFadeIn();
    loadingFloatFadeIn();
    smoothScrollTransition();
  }

  function domContentLoadedSet() {
    globalMenuSet();
    movieModal();
    accordionSet();
    smoothScroll();
    pageCheck();
  }

  function pageCheck() {
    if(body.getAttribute("data-page") === "top") {
      console.log('top-page-set');
      loadingCheck();
      positionSet();
      window.addEventListener('scroll', function() {
        headerStateSet();
      });
      window.addEventListener('resize', positionSet);
      // TOP-PAGE SLIDER SWIPER ver5
      let mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 16,
        slidesPerView: 2,
        breakpoints: {
          980: {
            slidesPerView: 3,
            spaceBetween: 100
          }
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    } else if(body.getAttribute("data-page") === "culture-environment") {
      console.log('culture-environment-set');
      // ENVIRONMENT-PAGE SLIDER SWIPER ver5
      let mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 20,
        slidesPerView: 1.2,
        breakpoints: {
          980: {
            slidesPerView: 1.8,
            spaceBetween: 120
          }
        },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      });
    } else {
      console.log('subpage-set');
    }
  }

  // TOP-PAGE Loading localstorage 60min
  function loadingCheck() {
    let storageFlag = localStorage.getItem("msdataloading");
    if(storageFlag) {
      let nowTime = new Date();
      let nowTimeMs = nowTime.getTime();
      let beforeTimeMs = Number(storageFlag);
      let timeHours = 1;
      // ms → hour
      let timeRange = 1*1000*60*60*timeHours;
      let timeFlag = Boolean(nowTimeMs - beforeTimeMs > timeRange);
      if(timeFlag) {
        localStrageSet();
        body.style.opacity = 1;
      } else {
        loadingHide();
      }
    } else {
      localStrageSet();
      body.style.opacity = 1;
    }
  }

  function localStrageSet() {
    let latestTime = new Date();
    let latestTimeMs = String(latestTime.getTime());
    localStorage.setItem('msdataloading', latestTimeMs);
  }

  function loadingHide() {
    const loadingContent = document.getElementById('js-loading');
    loadingContent.style.display = "none";

    setTimeout(function(){
      body.classList.add('is-show-subpage');
    },500);
  }


  // TOP-PAGE FadeIn Header
  function headerStateSet() {
    let targetPosition = targetTop.offsetTop;
    if(deviceWidthCheck()) {
      if(window.pageYOffset > targetPosition) {
        topHeader.classList.add('is-fadeIn');
      } else {
        topHeader.classList.remove('is-fadeIn');
      }
    }
  }

  // TOP-PAGE Catch Position Set
  function positionSet() {
    const topCatch = document.getElementById('js-top-catch');
    const topMain = document.getElementById('js-top-main');
    if(!deviceWidthCheck()) {
      let catchHeight = topCatch.clientHeight;
      let mainHeight = topMain.clientHeight;
      let absoluteTop = (mainHeight / 2 - catchHeight / 2) + "px";
      topCatch.style.top = absoluteTop;
    } else {
      // PCの固定サイズ
      topCatch.style.top = "28px";
    }
  }

  function deviceWidthCheck() {
    let w = window.innerWidth;
    if( w > breakPointSize ) {
      return true;
    }
  }

  // Body FadeIn
  function subPageFadeIn() {
    // TOPは_loading.ejsのためreturn
    if(body.getAttribute("data-page") === "top") {
      return;
    } else {
      body.classList.add('is-show-subpage');
    }
  }

  // GlobalMenuSp
  function globalMenuSet() {
    const triggerClass = 'is-menu-open';
    globalMenuOpenBtn.addEventListener('click', () => {
      globalMenu.classList.add(triggerClass);
      globalMenuCloseBtn.classList.add(triggerClass);
      body.classList.add(triggerClass);
    });
  
    globalMenuCloseBtn.addEventListener('click', () => {
      globalMenu.classList.remove(triggerClass);
      globalMenuCloseBtn.classList.remove(triggerClass);
      body.classList.remove(triggerClass);
    });
  }


  // 同一ページ内 SmoothScroll
  function smoothScroll() {
    for (let i = 0; i < smoothScrollTrigger.length; i++){
      smoothScrollTrigger[i].addEventListener('click', (e) => {
        e.preventDefault();
        let href = smoothScrollTrigger[i].getAttribute('href');
        let targetElement = document.getElementById(href.replace('#', ''));
        const rect = targetElement.getBoundingClientRect().top;
        const offset = window.pageYOffset;
        // PC
        let gap = 250;
        if( bodyW < spPoint ) {
          // SP
          gap = 100;
        } else if ( bodyW < tbPoint ) {
          // Tablet
          gap = 140;
        }
        const target = rect + offset - gap ;
        window.scrollTo({
          top: target,
          behavior: 'smooth',
        });
      });
    }
  }

  // Page遷移時 SmoothScroll
  function smoothScrollTransition() {
    if(urlHash) {
      setTimeout(function(){
        window.scrollTo({top:0});
      }, 0);

      setTimeout(function (){
        const urlTarget = document.getElementById(urlHash.replace('#', ''));
        // PC
        let heightGap = 250;
        if( bodyW < spPoint ) {
          // SP
          heightGap = 120;
        } else if ( bodyW < tbPoint ) {
          // Tablet
          heightGap = 180;
        }
        let urlPosition = window.pageYOffset + urlTarget.getBoundingClientRect().top - heightGap;
        window.scroll({
          top: urlPosition,
          behavior: 'smooth'
        });
      },800);
    }
  }

  // SubPage タイトルアニメーション
  function subPageHeadingAnimation() {
    const heading = document.getElementsByClassName('js-subpage-titleAnimation');
    if(!heading) return;

    setTimeout(function (){
      for(let i=0; i < heading.length; i++) {
        heading[i].innerHTML = wrapCharSpan(heading[i].textContent);
        heading[i].classList.add('is-show');
        Array.from(heading[i].children).forEach((char, index) => {
          window.setTimeout(function () {
            char.classList.add('is-show');
          }, 50*index );
        });
      }
    },800);

    // 文字列を1文字ずつ分割
    function wrapCharSpan(str) {
      return [...str].map(char => `<span>${char}</span>`).join('');
    }
  }

  function loadingFadeIn() {
    let element = document.getElementsByClassName('js-loadFadeIn');
    if(!element) return;
    setTimeout(function (){
      for(let i=0; i < element.length; i++) {
        element[i].classList.add('is-show');
      }
    },500);
  }

  function loadingFloatFadeIn() {
    let element = document.getElementsByClassName('js-loadFloatFadeIn');
    if(!element) return;
    for(let i=0; i < element.length; i++) {
      element[i].classList.add('is-show');
    }
  }

  function scrollFadeIn() {
    let element = document.getElementsByClassName('js-scrollFloatFadeIn');
    if(!element) return;

    let scrollY = window.pageYOffset;
    let windowH = window.innerHeight;
    // 表示タイミングの位置調整
    let showTiming = 150;
    for(let i=0; i < element.length; i++) {
      let elemClientRect = element[i].getBoundingClientRect();
      let elemY = scrollY + elemClientRect.top;
      if(scrollY > elemY - windowH + showTiming) {
        element[i].classList.add("is-show");
      }
    }
  }

  // 社員インタビュー動画 Modal
  function movieModal() {
    if( modalOpenBtn.length > 0 ) {
      let iframes = document.getElementsByClassName('js-iframe');
      /* 再生停止処理のため、各ifrmaeのSrcを保存 */
      let iframesSalesSrc = 'https://www.youtube.com/embed/3FKXN5oGnbU';
      let iframesSeSrc = 'https://www.youtube.com/embed/9KGcm7ndOVc';
      for(let i=0; i < modalOpenBtn.length; i++) {
        modalOpenBtn[i].addEventListener('click', (e)=> {
          modalWrap.classList.add('is-show');
          modalContent[i].classList.add('is-show');
          body.classList.add('is-modal-open');
  
          if(i === 0)  {
            iframes[i].setAttribute('src', iframesSalesSrc);
          } else {
            iframes[i].setAttribute('src', iframesSeSrc);
          }
        });
  
        modalCloseBtn[i].addEventListener('click', (e)=> {
          modalWrap.classList.remove('is-show');
          modalContent[i].classList.remove('is-show');
          body.classList.remove('is-modal-open');
          iframes[i].setAttribute('src', '');
        });
  
        modalWrap.addEventListener('click', (e)=> {
          if(e.target.closest('#js-videoWrap') === null) {
            modalWrap.classList.remove('is-show');
            modalContent[i].classList.remove('is-show');
            body.classList.remove('is-modal-open');
            iframes[i].setAttribute('src', '');
          }
        });
      }
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
}());