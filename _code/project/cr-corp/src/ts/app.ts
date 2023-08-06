import {top} from "./pages/top";
import {base} from "./utils/base";
import {eventName} from "./utils/eventName";
import {menu} from "./module/menu";
// import Swiper JS
import Swiper from "swiper/bundle";
// import Swiper styles
import "swiper/css/bundle";

class AppClass {
  private _top: HTMLElement | null;
  private _a: HTMLCollectionOf<HTMLAnchorElement>;
  private _header: HTMLElement | null;
  private _backBtn: HTMLElement | null;
  private BREAK_TB: number;
  private BREAK_SP: number;
  public LAYOUT: string;
  private _table:HTMLElement | null;
  private _carouselCnt : HTMLElement | null;
  private _carouselWrap : HTMLElement | null;
  private _carouselActive : number;
  private _carouselSecond : number;
  private _carouselThird : number;
  private _carouselHeight : number;
  constructor() {
    // class変数
    this._top = base._d.getElementById("js-top");
    this._a = base._d.getElementsByTagName("a");
    this._header = base._d.getElementById("js-header");
    this._backBtn = base._d.getElementById("js-scrollTop");
    this.BREAK_TB = 1025;
    this.BREAK_SP = 750;
    this.LAYOUT = "PC";
    this._table = base._d.querySelectorAll(".common-table");
    this._groupAccordionButton = base._d.querySelectorAll(".js-group-accordion-button");
  }
  public init(): void {
    // 以下共通で追加するEVENT
    if (app._top) {
      top.init();
    } else {
      base._w.onscroll = ()=>{
        app.windowScroll();
      };
    }
    menu.init();

    app.addEvent();
  }
  private addEvent(): void {
    // 以下共通で追加するEVENT
    Array.prototype.forEach.call(app._a, (el) => {
      const target = el.getAttribute("href");
      // if (target.match(/^\#/)) {
      //   if (base.ua.indexOf("msie 9") > 0) {
      //     return;
      //   }
      //   el.addEventListener(eventName.CLICK, base.smoothScroll);
      // }
    });

    base._w.addEventListener(eventName.RESIZE, app.checkLayout);
    app.checkLayout();
    base._w.addEventListener(eventName.ORIENTATION_CHANGE, app.checkOrientation);
    app.checkOrientation();

    app._backBtn?.addEventListener(eventName.CLICK, (e)=> {
      base.scrollWindow("#", {duration: 1000});
      e.preventDefault();
    })
    if(app.LAYOUT === "SP") {
      Array.prototype.forEach.call(app._table, (el) => {
        el.addEventListener(eventName.SCROLL, app.tableScrollSync, false);
      });
    }

    Array.prototype.forEach.call(app._groupAccordionButton, (el) => {
      el.addEventListener(eventName.CLICK, app.groupAccordion, false);
    });
    app.carousel();
  }

  public checkLayout(): void {
    const ww: number = base._w.innerWidth;
    if (ww > app.BREAK_SP && ww <= app.BREAK_TB) {
      app.LAYOUT = "TB";
    } else if(ww <= app.BREAK_SP) {
      app.LAYOUT = "SP";
    } else {
      app.LAYOUT = "PC";
      menu.closeMenu();
    }
    console.log("Layout:"+app.LAYOUT);
  }

  public checkOrientation(): void {
    switch(base._w.orientation) {
      case -90:
      case 90:
      case 270:
        // alert('端末は横向きでお使いください。');
        base.addClass(base._b, "is-landscape");
        console.log("Orientation:landscape");
        break;
      default:
        base.removeClass(base._b, "is-landscape");
        console.log("Orientation:portrait");
        break;
    }
  }

  public windowScroll(): void {
    if(base._w.pageYOffset > 100) {
      app.showTopBtn();
    } else {
      app.hideTopBtn();
    }
  }
  public showTopBtn(): void {
    base.addClass(app._backBtn,"is-show");
  }
  public hideTopBtn(): void {
    base.removeClass(app._backBtn,"is-show");
  }

  private removeEvent(): void {
    // 以下共通で削除するEVENT
    Array.prototype.forEach.call(app._a, (el) => {
      const target = el.getAttribute("href");
      // if (target.match(/^\#/)) {
      //   if (base.ua.indexOf("msie 9") > 0) {
      //     return;
      //   }
      //   el.removeEventListener(eventName.CLICK, base.smoothScroll);
      // }
    });
  }

  public tableScrollSync(): void {
    const scroll = this.scrollLeft;
    Array.prototype.forEach.call(app._table, (el) => {
      el.scrollLeft = scroll;
    });
  }

  public groupAccordion(): void {
    const target = this.closest(".js-group-accordion");
    target.classList.toggle("group__accordion--active");
  }

  public carousel(): void {

    const elmSwiper = document.querySelectorAll(".js-carousel");
    const carouselNextBtn = document.querySelectorAll(".js-carouselNextBtn");
    const carouselBackBtn = document.querySelectorAll(".js-carouselBackBtn");
    if(elmSwiper.length > 0){
      for (const i = 0; i < elmSwiper.length; i++) {
        elmSwiper[i].className += i;
        carouselNextBtn[i].className += i;
        carouselBackBtn[i].className += i;
        const swiper = new Swiper(".js-carousel" + i, {
          loop: true,
          slidesPerView: 1.2,
          spaceBetween: 10,
          speed: 300,
          paginationClickable: true,
          wrapperClass: "common-carouselWrap",
          slideClass: "js-carouselItem",
          navigation: {
            nextEl: ".js-carouselNextBtn" + i,
            prevEl: ".js-carouselBackBtn" + i,
          },
          breakpoints: {
            // 768px以上の場合
            751: {
              slidesPerView: 3.2,
            }
          }
        });
      }
    }

    const carousel01 = new Swiper("#js-carousel-group01", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 300,
      paginationClickable: true,
      wrapperClass: "common-carouselWrap",
      slideClass: "js-carouselItem",
      navigation: {
        nextEl: ".js-carouselNextBtn",
        prevEl: ".js-carouselBackBtn",
      },
      breakpoints: {
        // 768px以上の場合
        751: {
          slidesPerView: 2.4,
        }
      }
    });
    const carousel02 = new Swiper("#js-carousel-group02", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 300,
      paginationClickable: true,
      wrapperClass: "common-carouselWrap",
      slideClass: "js-carouselItem",
      navigation: {
        nextEl: ".js-carouselNextBtn",
        prevEl: ".js-carouselBackBtn",
      },
      breakpoints: {
        // 768px以上の場合
        751: {
          slidesPerView: 2.4,
        }
      }
    });
    const carousel03 = new Swiper("#js-carousel-group03", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 300,
      paginationClickable: true,
      wrapperClass: "common-carouselWrap",
      slideClass: "js-carouselItem",
      navigation: {
        nextEl: ".js-carouselNextBtn",
        prevEl: ".js-carouselBackBtn",
      },
      breakpoints: {
        // 768px以上の場合
        751: {
          slidesPerView: 2.4,
        }
      }
    });

    const carousel04 = new Swiper("#js-carousel-group04", {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 300,
      paginationClickable: true,
      wrapperClass: "common-carouselWrap",
      slideClass: "js-carouselItem",
      navigation: {
        nextEl: ".js-carouselNextBtn",
        prevEl: ".js-carouselBackBtn",
      },
      breakpoints: {
        // 768px以上の場合
        751: {
          slidesPerView: 3,
        }
      },
      on: {
        init(e) {
          this._carouselCnt = e.$el[0];
          this._carouselWrap = this._carouselCnt.children[0];
          this._carouselWrap.style.transitionDuration = 300 + "ms";
          app.carouselHeightSet(this._carouselWrap);
        },
      },
    });
    carousel04.on("slideChangeTransitionEnd", (e) => {
      this._carouselCnt = e.$el[0];
      this._carouselWrap = this._carouselCnt.children[0];
      app.carouselHeightSet(this._carouselWrap);
    });
  }

  public carouselHeightSet(e): void {
    if(app.LAYOUT === "PC" || app.LAYOUT === "TB") {
      this._carouselActive = e.querySelectorAll(".swiper-slide-active > div")[0].offsetHeight;
      this._carouselSecond = e.querySelectorAll(".swiper-slide-next > div")[0].offsetHeight;
      this._carouselThird = e.querySelectorAll(".swiper-slide-next")[0].nextElementSibling.children[0].offsetHeight;
      this._carouselHeight = Math.max(this._carouselActive, this._carouselSecond, this._carouselThird);
    } else if(app.LAYOUT === "SP") {
      this._carouselHeight = e.querySelectorAll(".swiper-slide-active > div")[0].offsetHeight;
    }
    e.style.transitionDuration = 300 + "ms";
    e.style.height = this._carouselHeight + "px";
  }

}
export const app: AppClass = new AppClass();
window.onload = () => {
  app.init();
};
