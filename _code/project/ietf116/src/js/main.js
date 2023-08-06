(function(){
  // Common
  const header = document.getElementById('js-header');
  const headerMenu = document.getElementById('js-header-menu');
  const headerBtnSp = document.getElementById('js-header-menuBtn');
  const headerBtnSpText = document.getElementById('js-header-menuBtn-text');
  const scrollTopBtn = document.querySelectorAll('.js-scrollTop-btn');
  const topLevelHeading = document.querySelectorAll('.js-topLevel-heading');
  const breakPoint = 960;
  const fvArea = document.querySelectorAll('.js-fv-area');
  const disableBodyScroll = bodyScrollLock.disableBodyScroll;
  const enableBodyScroll = bodyScrollLock.enableBodyScroll;

  // Top
  const topBody = document.querySelector('.js-top-body');
  const topFv = document.getElementById('js-top-fvImg');

  window.addEventListener('DOMContentLoaded', initSet());
  window.addEventListener('resize', resizeSet());

  function initSet() {
    bodyFadeIn();
    globalMenuSet();
    contentsMarginSet();
    scrollTopSet();
    headerLinkColorChange();
    setVh();
  }

  function resizeSet() {
    contentsMarginSet();
    setVh();
  }

  function bodyFadeIn() {
    if(!topBody) { return };
    setTimeout(()=> {
      document.body.classList.add('is-show');
      topFv.classList.add('is-zoom');
    }, 300);
  }

  function globalMenuSet() {
    headerBtnSp.addEventListener('click', ()=> {
      if(document.body.classList.contains('is-open')) {
        bodyScrollLock.enableBodyScroll(header);
      } else {
        bodyScrollLock.disableBodyScroll(header);
      }
      document.body.classList.toggle('is-open');
      header.classList.toggle('is-open');
      headerBtnSp.classList.toggle('is-open');
      if(headerBtnSp.classList.contains('is-open')) {
        headerBtnSpText.innerHTML = 'CLOSE'
      } else {
        headerBtnSpText.innerHTML = 'MENU'
      }
    });
  }

  function contentsMarginSet() {
    if(!topLevelHeading[0]) { return; }
    let browserW = window.innerWidth;
    for(let i = 0 ; i < topLevelHeading.length; i++) {
      let headingHeight = topLevelHeading[i].clientHeight;
      if(browserW > breakPoint) {
        // (stickyのheight-120px(デザイン上必要な余白))分のネガティブマージンを設定
        let marginTop =  -1 * (headingHeight - 120);
        topLevelHeading[i].nextElementSibling.style.marginTop = marginTop + "px";
      } else {
        // sticky - 26.65vw
        let marginTop =  -1 * (headingHeight - browserW * 0.2665);
        topLevelHeading[i].nextElementSibling.style.marginTop = marginTop + "px";
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

  function headerLinkColorChange() {
    if(!fvArea[0]) { return };
    if(!headerMenu) { return };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.05
    };

    const colorChange = (points) => {
      if(!points[0].isIntersecting) {
        headerMenu.classList.add('is-colorChange');
        headerBtnSp.classList.add('is-colorChange');
      } else {
        headerMenu.classList.remove('is-colorChange');
        headerBtnSp.classList.remove('is-colorChange');
      }
    }
    const observer = new IntersectionObserver(colorChange, options);
    observer.observe(fvArea[0]);
  }

  function setVh() {
    let browserW = window.innerWidth;
    if(browserW > breakPoint) {
      return;
    } else {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
}());