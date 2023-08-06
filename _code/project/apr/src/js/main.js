(function(){
  // CommonParts
  const header = document.getElementById('js-header');
  const menuBtn = document.getElementById('js-menu-btn');
  const secondMenu = document.querySelectorAll('.js-second-menu');
  const headingBorder = document.querySelectorAll('.js-heading-line');
  const scrollTopBtn = document.querySelectorAll('.js-scrollTop-btn');
  const logoShowTarget = document.querySelectorAll('.js-logoShow-target');
  const headerLogo = document.getElementById('js-header-logo');
  const breakPoint = 960;
  const headerFirstLinkWrap = document.querySelectorAll('.js-first-linkWrap');
  const headerFirstLink = document.querySelectorAll('.js-first-link');

  // TopPageParts
  const isTop = document.getElementById('js-top-body');
  const fvLogo = document.getElementById('js-fv-logo');
  const fvMessage = document.getElementById('js-fv-message');
  const scrollList = document.getElementById('js-scroll-list');
  const scrollBorder = document.getElementById('js-scroll-border');
  let scrollListHeight;

  // SubPageParts
  const partsList = document.querySelectorAll('.js-list');

  window.addEventListener('DOMContentLoaded', initSet());
  window.addEventListener('load', fvSet());
  // Resize処理はTOPページのみ
  if(isTop!= null) {
    window.addEventListener('resize', scrollBarShowHide)
  }

  function initSet() {
    secondOpenBtnCreate();
    menuOpenClose();
    headingBorderShow();
    scrollTopSet();
    headerLogoShow();
    partsListSet();
    scrollBarShowHide();
    childItemCheck();
  }

  function secondOpenBtnCreate() {
    for(let i = 0 ; i < secondMenu.length; i++) {
      let fragment = document.createDocumentFragment();
      for(let i = 0; i < 2; i++) {
        let spanElm = document.createElement('span');
        fragment.appendChild(spanElm);
      }
      let btnElm = document.createElement('button');
      btnElm.classList.add('l-header__secondOpenBtn' , 'js-second-menu-trigger');
      btnElm.appendChild(fragment);
      secondMenu[i].previousElementSibling.appendChild(btnElm);
    }
  }

  function menuOpenClose() {
    const secondMenuTrigger = document.querySelectorAll('.js-second-menu-trigger');

    menuBtn.addEventListener('click', ()=> {
      document.body.classList.toggle('is-open');
      header.classList.toggle('is-open');
      menuBtn.classList.toggle('is-open');
    });

    for(let i = 0 ; i < secondMenuTrigger.length; i++) {
      secondMenuTrigger[i].addEventListener('click', ()=> {
        secondMenuTrigger[i].classList.toggle('is-open');
        secondMenu[i].classList.toggle('is-open');
      });
    }
  }

  function childItemCheck() {
    for(let i = 0 ; i < headerFirstLinkWrap.length; i++ ) {
      if(headerFirstLinkWrap[i].nextElementSibling !== null) {
        headerFirstLink[i].classList.add('is-hasChild');
      }
    }
  }

  function headingBorderShow() {
    if(!headingBorder[0]) { return };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const borderShow = (points) => {
      points.forEach( point => {
        if(point.isIntersecting) {
          point.target.classList.add('is-border-show');
        }
      });
    }

    for(let i = 0; i < headingBorder.length; i++) {
      const target = headingBorder[i];
      const observer = new IntersectionObserver(borderShow, options);
      observer.observe(target);
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

  function headerLogoShow() {
    if(!logoShowTarget[0]) { return };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    }

    const logoShow = (points) => {
      if(!points[0].isIntersecting) {
        headerLogo.classList.add('is-show');
      } else {
        headerLogo.classList.remove('is-show');
      }
    }

    for(let i = 0; i < logoShowTarget.length; i++) {
      const target = logoShowTarget[i];
      const observer = new IntersectionObserver(logoShow, options);
      observer.observe(target);
    }
  }
  
  function fvSet() {
    if(!fvMessage) { return };
    setTimeout(() => {
      fvLogo.classList.add('is-show');
      const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      async function showTarget() {
        fvMessage.classList.add('is-show')
      }
      showTarget();
    }, 500);
  }

  function partsListSet() {
    if(!partsList[0]) { return };
    const secondTrigger = document.querySelectorAll('.js-list-second-trigger');
    const secondList = document.querySelectorAll('.js-list-second');
    const thirdTrigger = document.querySelectorAll('.js-list-third-trigger');
    const thirdList = document.querySelectorAll('.js-list-third');

    for(let i = 0 ; i < secondTrigger.length; i++) {
      secondTrigger[i].addEventListener('click', ()=> {
        secondTrigger[i].classList.toggle('is-show');
        secondList[i].classList.toggle('is-show');
      });
    }

    for(let i = 0 ; i < thirdTrigger.length; i++) {
      thirdTrigger[i].addEventListener('click', ()=> {
        thirdTrigger[i].classList.toggle('is-show');
        thirdList[i].classList.toggle('is-show');
      });
    }
  }

  function scrollBarShowHide() {
    if(!scrollList || !scrollBorder ) { return; };
    let browserW = window.innerWidth;
    scrollListHeight = scrollList.clientHeight;
    if(browserW > breakPoint) {
      // max-heigth 200pxで分岐
      if(scrollListHeight < 200) {
        scrollBorder.style.display = 'none';
      } else {
        scrollBorder.style.display = 'block';
      }
    } else {
      // max-height 65vwで分岐
      if(scrollListHeight < browserW * 0.65) {
        scrollBorder.style.display = 'none';
      } else {
        scrollBorder.style.display = 'block';
      }
    }
  }
}());