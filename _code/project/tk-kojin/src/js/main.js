(function(){
  // Common
  const breakPoint = 1000; 

  // TOP
  const faqTrigger = document.querySelectorAll('.js-faq-trigger');
  const productTrigger = document.querySelectorAll('.js-product-trigger');

  // DIY
  const itemList = document.getElementById('js-item-list');
  const searchBox = document.getElementById('js-search-box');

  // FloatBtn
  const floatBtn = document.getElementById('js-float-btn');
  const floatBtnRentaCar = document.getElementById('js-float-btn-renta');
  const floatStartPoint = document.querySelectorAll('.js-float-start');
  const floatEndPoint = document.querySelectorAll('.js-float-end');

  window.addEventListener('DOMContentLoaded', initSet);
  window.addEventListener('resize', resizeSet);

  function initSet() {
    faqMenuSet();
    productAccordionSpSet();
    diySpSearchMenuOpenClose()
    diyCategorySearchSet();
    movieModal();
    floatBtnShowHideSp();
    floatBtnShowHideSpRenta();
  }

  function resizeSet() {
    floatBtnShowHideSp();
    floatBtnShowHideSpRenta();
  }

  function faqMenuSet() {
    if(!faqTrigger[0]) { return };
    for(let i = 0 ; i < faqTrigger.length; i++) {
      faqTrigger[i].addEventListener('click', ()=> {
        faqTrigger[i].classList.toggle('is-open-menu');
        faqTrigger[i].nextElementSibling.classList.toggle('is-open-menu');
      });
    }
  }

  function productAccordionSpSet() {
    if(!productTrigger[0]) { return };
    const itemList = document.querySelectorAll('.js-product-itemList');
    const itemLink = document.querySelectorAll('.js-product-link');

    for(let i = 0 ; i < productTrigger.length; i++) {
      productTrigger[i].addEventListener('click', ()=> {
        productTrigger[i].classList.toggle('is-block-show');
        itemList[i].classList.toggle('is-block-show');
        itemLink[i].classList.toggle('is-block-show');
      });
    }
  }

  function diySpSearchMenuOpenClose() {
    const menuOpenBtn = document.getElementById('js-search-menuOpen');
    const menuCloseBtn = document.getElementById('js-search-menuClose');

    if(!searchBox || !menuOpenBtn || !menuCloseBtn) { return };
    menuOpenBtn.addEventListener('click', ()=> {
      searchBox.classList.toggle('is-menu-open');
    });

    menuCloseBtn.addEventListener('click', ()=> {
      searchBox.classList.toggle('is-menu-open');
    });
  }

  function diyCategorySearchSet() {
    if(!itemList) { return };
    const itemAry = itemList.children;
    const diyLabel = document.querySelectorAll('.js-search-label');
    const allSelectBtn = document.getElementById('js-search-all');
    const searchTrigger = document.getElementById('js-search-trigger');
    for(let i = 0 ; i < diyLabel.length; i++) {
      diyLabel[i].addEventListener('click', ()=> {
        diyLabel[i].classList.toggle('is-active');
      });
    }

    allSelectBtn.addEventListener('click', ()=> {
      allSelectBtn.classList.toggle('is-active');
      if(allSelectBtn.classList.contains('is-active')) {
        for(let i = 0 ; i < diyLabel.length; i++) {
          if(!diyLabel[i].classList.contains('is-active')) {
            diyLabel[i].classList.add('is-active');
          }
        }
      } else {
        for(let i = 0 ; i < diyLabel.length; i++) {
          if(diyLabel[i].classList.contains('is-active')) {
            diyLabel[i].classList.remove('is-active');
          }
        }
      }
    });
    // date-categoryをc-labelから動的に追加
    for(let i = 0 ; i < itemAry.length ; i++) {
      let catNodeAry= itemAry[i].querySelectorAll('.c-label');
      let catTextAry = [];
      for(let i = 0 ; i < catNodeAry.length; i++) {
        catTextAry.push(catNodeAry[i].textContent) ;
      }
      itemAry[i].dataset.category = catTextAry;
    }

    searchTrigger.addEventListener('click', ()=> {
      if(searchBox.classList.contains('is-menu-open')) {
        searchBox.classList.remove('is-menu-open');
      }
      let labelAry = [];
      for(let i = 0 ; i < itemAry.length ; i++) {
        if(itemAry[i].classList.contains('is-dpNone')) {
          itemAry[i].classList.remove('is-dpNone');
        }
      }

      for(let i = 0 ; i < diyLabel.length; i++) {
        if(diyLabel[i].classList.contains('is-active')) {
          labelAry.push(diyLabel[i].dataset.category);
        }
      }

      if(labelAry.length !==0 ) {
        for(let i = 0 ; i < itemAry.length ; i++) {
          labelChecker(itemAry[i], labelAry);
        }
  
        function labelChecker(item, checkAry) {
          let flg = false;
          for(let j = 0 ; j < checkAry.length; j++) {
            if(item.dataset.category.split(",").indexOf(checkAry[j]) != -1) {
              flg = true;
            }
          }
          if(!flg) {
            item.classList.add('is-dpNone');
          }
        }
      }
    });
  }

  function movieModal() {
    const modalTrigger = document.querySelectorAll('.js-modal-trigger');
    const modal = document.querySelectorAll('.js-modal');
    const iframe = document.querySelectorAll('.js-iframe');
    if(!modalTrigger[0] || !modal[0] || !iframe[0]) { return };

    // Open
    for (let i = 0 ; i < modalTrigger.length; i++) {
      modalTrigger[i].addEventListener('click', ()=> {
        let url = modalTrigger[i].dataset.url;
        iframe[i].setAttribute('src', url);
        setTimeout(()=> {
          modal[i].classList.add('is-open');
          document.body.classList.add('is-modal-open');
        },300);
      });
    }

    // Close
    for (let i = 0 ; i < modal.length; i++) {
      modal[i].addEventListener('click', (e)=> {
        if(e.target.closest('.js-frame-box .js-modal-text') === null) {
          document.body.classList.remove('is-modal-open');
          modal[i].classList.remove('is-open');
          setTimeout(()=> {
            iframe[i].setAttribute('src', '');
          },300);
        }
      });
    }
  }

  function floatBtnShowHideSp() {
    if(!floatBtn) { return };
    // SPのみ実装
    if(window.innerWidth > breakPoint) {
      return;
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    const floatStart = (points)=> {
      if(points[0].isIntersecting) {
        floatBtn.classList.add('is-float');
      } else {
        floatBtn.classList.remove('is-float');
      }
    }

    const startTarget = new IntersectionObserver(floatStart, options);
    startTarget.observe(floatStartPoint[0]);

    const floatEnd = (points)=> {
      if(points[0].isIntersecting) {
        floatBtn.classList.add('is-float-stop');
      } else {
        floatBtn.classList.remove('is-float-stop');
      }
    }

    const endTarget = new IntersectionObserver(floatEnd, options);
    endTarget.observe(floatEndPoint[0]);
  }

  function floatBtnShowHideSpRenta() {
    if(!floatBtnRentaCar) { return };
    // SPのみ実装
    if(window.innerWidth > breakPoint) {
      return;
    }
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    const floatStart = (points)=> {
      if(points[0].isIntersecting) {
        floatBtnRentaCar.classList.add('is-block');
      } else {
        floatBtnRentaCar.classList.remove('is-block');
      }
    }

    const startTarget = new IntersectionObserver(floatStart, options);
    startTarget.observe(floatStartPoint[0]);

    const floatEnd = (points)=> {
      if(points[0].isIntersecting) {
        floatBtnRentaCar.classList.add('is-stop');
      } else {
        floatBtnRentaCar.classList.remove('is-stop');
      }
    }

    const endTarget = new IntersectionObserver(floatEnd, options);
    endTarget.observe(floatEndPoint[0]);
  }
}());