import Base from "../utils/base";
import Swiper, { Navigation, Pagination } from "swiper";
import EventName from "../utils/EventName";

// モジュールを使用可能に
Swiper.use([Navigation, Pagination]);
export default class Careers {
  private slider: Swiper | null;
  private _values: HTMLElement | null;
  private _valuesInner: HTMLElement | null;
  private _valuesGroup: NodeListOf<HTMLElement>;

  private startPos: number;
  private valuesPosTop: number;
  private currentValues: number;
  constructor() {
    // class変数
    console.log("[create] Careers");
    this.slider = null;
    this._values = Base._d.getElementById("js-values");
    this._valuesInner = Base._d.getElementById("js-valuesInner");
    this._valuesGroup = Base._d.querySelectorAll(".js-valuesGroup");
    // this._valuesGroup = this._valuesInner.querySelectorAll("[data-animate]") as NodeListOf<HTMLElement>;

    this.startPos = 0;
    this.valuesPosTop = this._values ? this._values.getBoundingClientRect().top : 0;
    this.currentValues = 1;

    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    this.slider = new Swiper(".js-slider", {
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
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    this.setValuesSize();
    this.addEvent();
  }
  public addEvent(): void {
    Base._w.addEventListener(EventName.RESIZE, this.setValuesSize.bind(this));
  }

  public setValuesSize(): void {
    // const ww: number = Base._w.innerWidth;
    const wh: number = Base._w.innerHeight;
    if (Base.ua.indexOf("iphone") > 0 || (Base.ua.indexOf("android") > 0 && Base.ua.indexOf("mobile") > 0)) {
      (this._values as HTMLElement).style.height = "inherit";
    } else {
      (this._values as HTMLElement).style.height = String(wh * this._valuesGroup.length + wh) + "px";
    }
    this.valuesPosTop = this._values
      ? this._values.getBoundingClientRect().top + Base._w.pageYOffset
      : Base._w.pageYOffset;
  }

  public setValues(posY: number): void {
    const wh: number = Base._w.innerHeight;
    this.setValuesSize();
    if (Base.ua.indexOf("iphone") > 0 || (Base.ua.indexOf("android") > 0 && Base.ua.indexOf("mobile") > 0)) {
      return;
    }
    // 現在のvaluesを計算
    // 1つあたりの高さ
    this.currentValues = 0;
    Array.prototype.forEach.call(this._valuesGroup, (el, index) => {
      if (posY >= this.valuesPosTop + wh * index && posY < this.valuesPosTop + wh * (index + 1)) {
        this.currentValues = index + 1;
      } else if (posY >= this.valuesPosTop + wh * (index + 1)) {
        this.currentValues = index + 2;
      }
    });
    Array.prototype.forEach.call(this._valuesGroup, (el, index) => {
      if (index + 1 < this.currentValues) {
        el.classList.add("is-after");
        el.classList.remove("is-before");
      } else if (index + 1 > this.currentValues) {
        el.classList.remove("is-after");
        el.classList.add("is-before");
      } else {
        el.classList.remove("is-after");
        el.classList.remove("is-before");
      }
      if (index + 1 === this._valuesGroup.length && this.currentValues === index + 2) {
        el.classList.remove("is-after");
        el.classList.remove("is-before");
      }
    });
    if (posY < this.valuesPosTop) {
      (this._valuesInner as HTMLElement).style.position = "static";
      (this._valuesInner as HTMLElement).style.top = "inherit";
      (this._valuesInner as HTMLElement).style.left = "inherit";
      (this._valuesInner as HTMLElement).style.transform = "inherit";
    } else if (posY >= this.valuesPosTop + wh * this._valuesGroup.length) {
      (this._valuesInner as HTMLElement).style.position = "static";
      (this._valuesInner as HTMLElement).style.top = "inherit";
      (this._valuesInner as HTMLElement).style.left = "inherit";
      (this._valuesInner as HTMLElement).style.transform =
        "translateY(" + String(wh * this._valuesGroup.length) + "px)";
    } else {
      (this._valuesInner as HTMLElement).style.position = "fixed";
      (this._valuesInner as HTMLElement).style.top = "0";
      (this._valuesInner as HTMLElement).style.left = "0";
      (this._valuesInner as HTMLElement).style.transform = "inherit";
    }
  }
}
