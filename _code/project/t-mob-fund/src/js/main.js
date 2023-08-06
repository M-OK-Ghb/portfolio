(function(){
  // COMMON
  const breakPoint = 960;
  let swiper, swiperBoolean;
  const header = document.getElementById('js-header');
  const globalSpBtn = document.getElementById('js-spBtn');
  const globalSecondTriggerSp = document.querySelectorAll('.js-link-second-trigger');
  const globalSecondLink = document.querySelectorAll('.js-link-second');
  const isEn = (document.documentElement.lang === 'en');

  // TOP
  const svgCatchPhrase = document.getElementById('js-mv-svg');
  const mvImg = document.getElementById('js-top-mvImg');

  // SUB
  const subHeadingTop = document.getElementById('js-heading-subMv');
  const loadShowElement = document.querySelectorAll('.js-load-fadeIn');
  const loadShowElementSp = document.querySelectorAll('.js-load-fadeIn-sp');
  const isContact = document.querySelector('.js-contact-body');

  window.addEventListener('DOMContentLoaded', initSet);
  window.addEventListener('load', loadSet);
  window.addEventListener('resize', resizeSet);
  window.addEventListener('scroll', scrollSet);

  function initSet() {
    globalMenuSet();
    initSwiper();
    imgModalSet();
    pdfModalSet();
    contactValidation();
  }

  function loadSet() {
    subHeadingMv();
    loadFadeIn();
    loadFadeInSp();
    topMvSet();
  }

  function resizeSet() {
    resizeSwiper();
  }

  function scrollSet() {
    scrollFadeIn();
  }

  function topMvSet() {
    if(!mvImg) { return };
    if(!svgCatchPhrase) { return };

    let imgAry;

    //  Jp or En でパスを変更
    if(isEn) {
      if(breakPoint < window.innerWidth) {
        imgAry = [
          "../images/top/mv_1.webp",
          "../images/top/mv_2.webp",
          "../images/top/mv_3.webp",
          "../images/top/mv_4.webp",
          "../images/top/mv_5.webp",
          "../images/top/mv_6.webp"
        ];
      } else {
        imgAry = [
          "../images/top/mv_1.webp",
          "../images/top/mv_2.webp",
          "../images/top/mv_3_sp.webp",
          "../images/top/mv_4.webp",
          "../images/top/mv_5.webp",
          "../images/top/mv_6.webp",
        ];
      }
    } else {
      if(breakPoint < window.innerWidth) {
        imgAry = [
          "./images/top/mv_1.webp",
          "./images/top/mv_2.webp",
          "./images/top/mv_3.webp",
          "./images/top/mv_4.webp",
          "./images/top/mv_5.webp",
          "./images/top/mv_6.webp"
        ];
      } else {
        imgAry = [
          "./images/top/mv_1.webp",
          "./images/top/mv_2.webp",
          "./images/top/mv_3_sp.webp",
          "./images/top/mv_4.webp",
          "./images/top/mv_5.webp",
          "./images/top/mv_6.webp",
        ];
      }
    }

    const mvNavigation = document.getElementById('js-mv-navigation');
    if(!mvNavigation) {
      console.log('No Set Nav');
    } else {
      for(let i = 0 ; i < imgAry.length; i++) {
        let elementLi = document.createElement('li');
        let elementSpan = document.createElement('span');
        mvNavigation.appendChild(elementLi).appendChild(elementSpan);
      }
    }

    const navList = mvNavigation.querySelectorAll('li');

    setTimeout(() => {
      svgCatchPhrase.classList.add('active','is-show');
    }, 750);

    let count = -1;
    let firstFlag = true;
    slideChange();

    function slideChange() {
      mvImg.classList.add('is-fadeIn');
      count ++;
      if(imgAry.length === count ) {
        count = 0;
      }

      for(let i = 0 ; i < navList.length; i++) {
        navList[i].classList.remove('current');
        navList[count].classList.add('current');
      }

      mvImg.src = imgAry[count];

      // ローディング後初めのスライドのみ表示時間を長くする
      if(firstFlag) {
        setTimeout(() => {
          mvImg.classList.remove('is-fadeIn');
          setTimeout(() => {
            slideChange();
          }, 1000);
        }, 7500);
        firstFlag = false;
      } else {
        setTimeout(() => {
          mvImg.classList.remove('is-fadeIn');
          setTimeout(() => {
            slideChange();
          }, 1000);
        }, 5000);
      }
    }
  }

  function globalMenuSet() {
    globalSpBtn.addEventListener('click', ()=> {
      globalSpBtn.classList.toggle('is-open');
      header.classList.toggle('is-open');
      document.body.classList.toggle('is-open');
    });

    for(let i = 0 ; i < globalSecondTriggerSp.length; i++) {
      globalSecondTriggerSp[i].addEventListener('click', ()=> {
        globalSecondTriggerSp[i].classList.toggle('is-open');
        globalSecondLink[i].classList.toggle('is-open');

        setTimeout(() => {
          globalSecondLink[i].classList.toggle('is-show');
        }, 300);
      });
    }
  }

  function scrollFadeIn() {
    let element = document.querySelectorAll('.js-scrollFadeIn');
    if(!element[0]) return;

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

  function initSwiper() {
    if(isContact) { return };
    if(breakPoint < window.innerWidth) {
      swiperBoolean = false;
    } else {
      createSwiper();
      swiperBoolean = true;
    }
  }

  function resizeSwiper() {
    if(isContact) { return };
    if(breakPoint < window.innerWidth && swiperBoolean) {
      swiper.destroy(false, true);
      swiperBoolean = false;
    } else if(breakPoint >= window.innerWidth && !(swiperBoolean)) {
      createSwiper();
      swiperBoolean = true;
    }
  }

  function createSwiper() {
    swiper = new Swiper('.js-relatedSwiper', {
      loop: true,
      centeredSlides: true,
      spaceBetween: 20,
      slidesPerView: 1.5,
    });
  }

  function subHeadingMv() {
    if(!subHeadingTop) { return };
    setTimeout(() => {
      subHeadingTop.classList.add('is-show');
    }, 200);
  }

  function loadFadeIn() {
    if(!loadShowElement[0]) { return };
    for(let i = 0 ; i < loadShowElement.length; i++) {
      loadShowElement[i].classList.add('is-load-show');
    }
  }

  function loadFadeInSp() {
    if(!loadShowElementSp[0]) { return };
    for(let i = 0 ; i < loadShowElementSp.length; i++) {
      loadShowElementSp[i].classList.add('is-load-show--sp');
    }
  }

  function imgModalSet() {
    const pickUpModal = document.getElementById('js-pickup-modal');
    const modalImg = document.getElementById('js-modal-img-open');
    const modalText = document.getElementById('js-modal-text');
    const modalShowImg = document.querySelectorAll('.js-modal-img img');

    if(!modalShowImg[0] || !pickUpModal) { return };
    // modal Open
    for(let i = 0 ; i < modalShowImg.length; i++) {
      modalShowImg[i].addEventListener('click', ()=> {
        let imgSrc = modalShowImg[i].getAttribute('src');
        if(modalShowImg[i].nextElementSibling) {
          let text = modalShowImg[i].nextElementSibling.textContent;
          modalText.textContent = text;
        }
        
        modalImg.setAttribute('src', imgSrc);
        pickUpModal.classList.add('is-show');
        document.body.classList.add('is-modal-open');
        setTimeout(() => {
          pickUpModal.classList.add('is-fadeIn');
        }, 100);
      });
    }

    // modal Close
    pickUpModal.addEventListener('click', (event)=> {
      if(event.target.closest('#js-modal-contentsWrap') === null) {
        pickUpModal.classList.remove('is-fadeIn');
        document.body.classList.remove('is-modal-open');

        setTimeout(() => {
          pickUpModal.classList.remove('is-show');
        }, 400);
      }
    });
  }

  function pdfModalSet() {
    const pdfModal = document.getElementById('js-pdf-modal');
    const checkBox = document.getElementById('js-agreement');
    const pdfLink = document.getElementById('js-pdf-link');
    const pdfModalTrigger = document.querySelectorAll('.js-pdfModal-trigger');
    const pdfCloseBtn = document.getElementById('js-pdf-closeBtn');

    if(!pdfModal || !pdfModalTrigger[0]) { return };
    for(let i = 0 ; i < pdfModalTrigger.length; i++) {
      pdfModalTrigger[i].addEventListener('click', ()=> {
        let setHref = pdfModalTrigger[i].getAttribute('data-href');
        pdfLink.setAttribute('href', setHref);
        pdfModal.classList.add('is-show');
        document.body.classList.add('is-modal-open');
        setTimeout(() => {
          pdfModal.classList.add('is-fadeIn');
        }, 100);
      })
    }

    // checkが入った状態でのみ、外部リンクをオープンさせる
    checkBox.addEventListener('change', ()=> {
      if(checkBox.checked) {
        pdfLink.classList.add('is-active');
      } else {
        pdfLink.classList.remove('is-active');
      }
    });

    pdfModal.addEventListener('click', (event)=> {
      if(event.target.closest('#js-pdf-contents') === null) {
        closeModal();  
      }
    });

    pdfCloseBtn.addEventListener('click', ()=> {
      closeModal();
    });

    function closeModal() {
      pdfModal.classList.remove('is-fadeIn');
      document.body.classList.remove('is-modal-open');
      checkBox.checked = false;
      pdfLink.classList.remove('is-active');

      setTimeout(() => {
        pdfModal.classList.remove('is-show');
      }, 400);
    }
  }

  function contactValidation() {
    const contactForm = document.getElementById('js-contact');
    if(!contactForm) { return };
    const checkBox = document.getElementById('js-contact-agree');
    const submitBtn = document.getElementById('js-contact-submitBtn');
    const required = document.querySelectorAll('.js-required');

    const perfEntries = performance.getEntriesByType('navigation');
    perfEntries.forEach((entity) => {
      console.log(entity.type);
      if(entity.type === 'back_forward') {
        checkBox.checked = true;
        submitBtn.classList.add('is-active');
      }
    });

    checkBox.addEventListener('change', ()=> {
      if(checkBox.checked) {
        submitBtn.classList.add('is-active');
      } else {
        submitBtn.classList.remove('is-active');
      }
    });

    contactForm.addEventListener('submit', (e)=> {
      let errorCount = 0;
      for(let i = 0; i < required.length; i++) {
        if(required[i].value === "") {
          errorCount ++;
          e.preventDefault();
          required[i].nextElementSibling.classList.add('is-error');
        } else {
          required[i].nextElementSibling.classList.remove('is-error');
        }
      }

      if(errorCount > 0 ) {
        let errorElement = document.querySelectorAll('.is-error');
        const errorElementOffsetTop = errorElement[0].getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: errorElementOffsetTop - 300
        });
      }
    });
  }
}());