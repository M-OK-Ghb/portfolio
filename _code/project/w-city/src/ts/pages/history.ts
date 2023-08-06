import Base from "../utils/base";
import Swiper, { Navigation, Pagination } from "swiper";
// import EventName from "../utils/EventName";

// モジュールを使用可能に
Swiper.use([Navigation, Pagination]);
export default class History {
  private slider: Swiper | null;
  private _slider: NodeListOf<HTMLElement>;
  constructor() {
    // class変数
    console.log("[create] History");
    this.slider = null;
    this._slider = Base._d.querySelectorAll(".js-slider");

    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    Array.prototype.forEach.call(this._slider, (el) => {
      this.slider = new Swiper(el, {
        // Optional parameters
        loop: true,
        centeredSlides: true,
        slidesPerView: 1.31,
        spaceBetween: 10,
        breakpoints: {
          768: {
            slidesPerView: 1.42,
            spaceBetween: 40,
          },
        },
        // Navigation arrows
        navigation: {
          nextEl: el.parentNode.querySelector(".swiper-button-next"),
          prevEl: el.parentNode.querySelector(".swiper-button-prev"),
        },
      });
    });

    // this.addEvent();
  }

  // public addEvent(): void {
  // }
}
