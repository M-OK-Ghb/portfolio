/**
 * 全体の共通処理を記述する
 */
import {catalog} from "./pages/catalog";
import {top} from "./pages/top";
import {base} from "./utils/base";
import {eventName} from "./utils/eventName";
// tslint:disable-next-line:no-any
declare const Barba: any;
// tslint:disable-next-line:no-any
// declare const anime: any;

class AppClass {
  private _a: HTMLCollectionOf<HTMLAnchorElement>;
  private _cardWrap: HTMLElement;
  private _catalog: HTMLCanvasElement;
  private _pageTop: HTMLCanvasElement;
  constructor() {
    // class変数
    this._a = base._d.getElementsByTagName("a");
    this._cardWrap = base._d.getElementById("data-card-wrap");
    this._catalog = base._d.getElementById("data-catalog");
    this._pageTop =  base._d.getElementById("data-page-top");
  }
  public init(): void {
    // 以下共通で追加するEVENT
    app.addEvent();
    app.categoryMenu();

    if (app._cardWrap) {
      top.init();
    }
    if (app._catalog) {
      catalog.init();
    }
    if (app._pageTop) {
      app.goPageTop();
    }
  }
  // public showModal(): void {
  //   const modal: HTMLElement = base._d.getElementById("data-modal") as HTMLElement;
  //   base.addClass(modal, "is-open");
  //   anime( {
  //     targets: modal,
  //     opacity: 1,
  //     duration: 500,
  //     easing: "easeOutQuad",
  //     complete: () => {
  //       base.addClass(modal, "is-anim");
  //       modal.addEventListener(eventName.CLICK, app.hideModal);
  //       const modalClose: HTMLElement = base._d.getElementById("data-modal-close") as HTMLElement;
  //       modalClose.addEventListener(eventName.CLICK, app.hideModal);
  //     },
  //   });
  // }
  // public hideModal(e): void {
  //   const $target: HTMLElement = e.target as HTMLElement;
  //   if ($target.id.toLowerCase() !== "data-modal" && $target.id.toLowerCase() !== "data-modalclose") {
  //     // 処理
  //     return;
  //   }
  //
  //   const modal: HTMLElement = base._d.getElementById("data-modal") as HTMLElement;
  //   anime( {
  //     targets: modal,
  //     opacity: 0,
  //     duration: 200,
  //     easing: "easeInQuad",
  //     complete: () => {
  //       base.removeClass(modal, "is-anim");
  //       base.removeClass(modal, "is-open");
  //       modal.removeEventListener(eventName.CLICK, app.hideModal);
  //       const modalClose: HTMLElement = base._d.getElementById("data-modal-close") as HTMLElement;
  //       modalClose.removeEventListener(eventName.CLICK, app.hideModal);
  //     },
  //   });
  // }

  private addEvent(): void {
    // 以下共通で追加するEVENT
    Array.prototype.forEach.call(app._a, (el) => {
      const target = el.getAttribute("href");
      if (target) {
        if (target.match(/^\#/)) {
          if (base.ua.indexOf("msie 9") > 0) {
            return;
          }
          el.addEventListener(eventName.CLICK, base.smoothScroll);
        }
      }
    });
  }

  private removeEvent(): void {
    // 以下共通で削除するEVENT
    Array.prototype.forEach.call(app._a, (el) => {
      const target = el.getAttribute("href");
      if (target) {
        if (target.match(/^\#/)) {
          if (base.ua.indexOf("msie 9") > 0) {
            return;
          }
          el.removeEventListener(eventName.CLICK, base.smoothScroll);
        }
      }
    });
  }

  private goPageTop(): void {
    app._pageTop.addEventListener(eventName.CLICK, () => {
      base.scrollWindow("#", { duration: 800 });
    });
  }

  private categoryMenu(): void {
    const categoryTrigger: HTMLElement | null = document.getElementById("js-category-trigger");
    const categoryMenu: HTMLElement | null = document.getElementById("js-category-list");
    if (categoryTrigger && categoryMenu) {
      categoryTrigger.addEventListener("click", () => {
        categoryTrigger.classList.toggle("is-open");
        categoryMenu.classList.toggle("is-open");
      });
    } else {
      return;
    }
  }

}
const app: AppClass = new AppClass();
window.onload = () => {
  app.init();
};
