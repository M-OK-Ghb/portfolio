(function(){
  const partIcon = document.querySelectorAll('.js-part-icon');
  const headNav = document.querySelector('#js-headNav');
  const headNavShowPoint = document.querySelector('#js-headNav-showPoint');
  const headNavHidePoint = document.querySelector('#js-headNav-hidePoint');
  const breakPointSize = 960;
  const delayTarget = document.querySelectorAll('.js-delay');
  
  window.addEventListener('DOMContentLoaded', domContentLoadetSet());

  function domContentLoadetSet() {
    lazyShow();
    isShakeAdd();
    // 以下の処理はPCのみで
    if(breakPointSize < window.innerWidth) {
      headNavShow();
      headNavHide();
    }
  }

  function lazyShow() {
    document.body.classList.add('is-show');
    setTimeout(() => {
      const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      async function showTarget() {
        for(let i = 0; i < delayTarget.length; i++) {
          await _sleep(100);
          delayTarget[i].classList.add('is-show')
        }
      }

      showTarget();
    }, 500);
  }

  function isShakeAdd() {
    if(!partIcon) { return };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1
    };

    const shakeAdd = (points) => {
      points.forEach( point => {
        if(point.isIntersecting) {
          point.target.classList.add('is-shake');
        }
      });
    }

    for(let i = 0; i < partIcon.length; i++) {
      const target = partIcon[i];
      const observer = new IntersectionObserver(shakeAdd, options);
      observer.observe(target);
    }
  }

  function headNavShow(){
    if(!headNav) { return };
    let firstFlag;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };

    const showNav = (points) => {
      if(firstFlag) {
        return;
      } else if(!points[0].isIntersecting) {
        firstFlag = true;
        headNav.classList.add('is-zindexUp');
        setTimeout(() => {
          headNav.classList.add('is-show');
        }, 100);
      }
    }

    const target = headNavShowPoint;
    const observer = new IntersectionObserver(showNav, options);
    observer.observe(target);
  }

  function headNavHide() {
    if(!headNav) { return };
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6
    };

    const hideNav = (points) => {
      if(!points[0].isIntersecting && !document.body.classList.contains('is-scroll-up')) {
        headNav.classList.remove('is-show');
      } else {
        headNav.classList.add('is-show');
      }
    }

    const target = headNavHidePoint;
    const observer = new IntersectionObserver(hideNav, options);
    observer.observe(target);

    window.addEventListener('wheel', checkScrollDirection);

    function checkScrollDirection(event) {
      if (checkScrollDirectionIsUp(event)) {
        document.body.classList.add('is-scroll-up');
      } else {
        document.body.classList.remove('is-scroll-up');
      }
    }

    function checkScrollDirectionIsUp(event) {
      if (event.wheelDelta) {
        return event.wheelDelta > 0;
      }
      return event.deltaY < 0;
    }
  }
}());