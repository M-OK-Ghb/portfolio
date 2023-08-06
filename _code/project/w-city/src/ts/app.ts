import Top from "./pages/top";
import Careers from "./pages/careers";
import History from "./pages/history";
import UpdatesDetail from "./pages/updates-detail";
import Base from "./utils/Base";
import EventName from "./utils/eventName";
import Menu from "./module/menu";
import Accordion from "./module/accordion";
import Header from "./module/header";
import Modal from "./module/modal";
import Parallax from "./module/parallax";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TweenTarget = gsap.TweenTarget;

gsap.registerPlugin(ScrollTrigger);

class AppClass {
  private _top: HTMLElement | null;
  private _a: HTMLCollectionOf<HTMLAnchorElement>;
  private _main: HTMLElement | null;
  private _modal: HTMLElement | null;
  private top: Top | null;
  private careers: Careers | null;
  private history: History | null;
  private updatesDetail: UpdatesDetail | null;
  private header: Header | null;
  private page: string | null;
  private parallax: Parallax | null;
  private scrollTimer: NodeJS.Timer | null;
  private scrollInterval: number;
  constructor() {
    // class変数
    new Base();
    new EventName();
    console.log("[init] App");
    this._top = Base._d.getElementById("data-top");
    this._a = Base._d.getElementsByTagName("a");
    this._main = Base._d.getElementById("js-main");
    this._modal = Base._d.getElementById("js-modal");
    this.top = null;
    this.careers = null;
    this.history = null;
    this.updatesDetail = null;
    this.header = null;
    if (this._main) {
      this.page = this._main.getAttribute("data-page") as string;
    }
    this.parallax = null;
    this.scrollTimer = null;
    this.scrollInterval = 300;
    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    const posY = Base._w.pageYOffset;
    if (this._main) {
      switch (this.page) {
        case "top":
          this.top = new Top();
          break;
        case "careers":
          this.careers = new Careers();
          this.careers.setValues(posY);
          break;
        case "history":
          this.history = new History();
          break;
        case "updates-detail":
          this.updatesDetail = new UpdatesDetail();
          break;
        default:
          break;
      }
    }
    new Menu();
    new Accordion();
    this.header = new Header();
    if (this._modal) {
      new Modal();
    }
    this.parallax = new Parallax();
    this.setHeight();
    this.addEvent();
  }
  private addEvent(): void {
    // 以下共通で追加するEVENT
    Array.prototype.forEach.call(this._a, (el) => {
      const target = el.getAttribute("href");
      if (target.match(/^#/)) {
        el.addEventListener(EventName.CLICK, Base.smoothScroll);
      }
    });

    Base._w.onscroll = () => {
      const posY = this.getScrollTop();
      setTimeout(() => {
        if (this.header) {
          this.header.setHeader(posY);
        }
      }, 50);
      if (this.careers) {
        this.careers.setValues(posY);
      }
      if (this.parallax) {
        this.parallax.setPosion();
      }

      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        if (this.header) {
          this.header.showHeader();
        }
        this.scrollTimer = null;
      }, this.scrollInterval);
    };
    window.addEventListener(EventName.RESIZE, this.setHeight);

    const items = gsap.utils.toArray("[data-animate]");
    items.forEach((item) => {
      gsap.fromTo(
        item as TweenTarget,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: (item as HTMLElement).parentNode as HTMLElement,
            start: "top center+=20%",
          },
        }
      );
    });
  }

  private getScrollTop(): number {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop, window.scrollY);
  }

  private removeEvent(): void {
    // 以下共通で削除するEVENT
    Array.prototype.forEach.call(this._a, (el) => {
      const target = el.getAttribute("href");
      if (target.match(/^#/)) {
        if (Base.ua.indexOf("msie 9") > 0) {
          return;
        }
        el.removeEventListener(EventName.CLICK, Base.smoothScroll);
      }
    });
  }

  public setHeight(): void {
    const vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.setAttribute("style", "--vh:" + String(vh) + "px");
  }
}
window.addEventListener(
  "load",
  () => {
    new AppClass();
  },
  false
);
