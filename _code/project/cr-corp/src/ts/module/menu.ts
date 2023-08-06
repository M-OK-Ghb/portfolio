import {base} from "../utils/base";
import {eventName} from "../utils/eventName";
import {app} from "../app";

class MenuClass {
  private _top: HTMLElement | null;
  private _header: HTMLElement | null;
  private _headerList: HTMLElement | null;
  private _menuTrigger: HTMLElement | null;
  private _navItemFirst: NodeListOf<HTMLElement> | null;
  private _navItemSecond: NodeListOf<HTMLElement> | null;

  private _navChildBackBtn: NodeListOf<HTMLElement> | null;
  private _navGrandchildBackBtn: NodeListOf<HTMLElement> | null;
  private _navGrandchildTrigger: NodeListOf<HTMLElement> | null;
  private _navChildTarget: HTMLElement | null;
  private _navGrandchildTarget: HTMLElement | null;

  private _navChildCat: string | null;
  private _navGrandchildCat: string | null;

  private _container: HTMLElement | null;
  private _main: HTMLElement | null;
  private scrollPosY: number;
  private _mainDirectory: string;
  constructor() {
    // class変数
    this._top = base._d.getElementById("js-top");
    this._header = base._d.getElementById("js-header");
    this._headerList = base._d.getElementById("js-headerList");
    this._menuTrigger = base._d.getElementById("js-menuTrigger");
    this._navItemFirst = base._d.querySelectorAll(".js-itemFirst");
    this._navItemSecond = base._d.querySelectorAll(".js-itemSecond");

    this._navChildBackBtn = base._d.querySelectorAll(".js-menuBackButton");
    this._navGrandchildBackBtn = base._d.querySelectorAll(".js-categoryBackButton");
    this._navGrandchildTrigger = base._d.querySelectorAll(".js-thirdTrigger");
    this._navChildTarget = null;
    this._navGrandchildTarget = null;

    this._navChildCat = "";
    this._navGrandchildCat = "";

    this._container = base._d.getElementById("js-container");
    this._main = base._d.getElementById("js-main");
    this.scrollPosY = 0;
    this._mainDirectory = "";
  }
  public init(): void {
    // 以下共通で追加するEVENT
    menu.addEvent();
    const pathname = location.pathname;
    this._mainDirectory = "/" + pathname.split("/")[1] + "/";
    if (this._mainDirectory === "/case_studies/") {
      this._mainDirectory = "/services/";
    }
  }
  private addEvent(): void {
    // 以下共通で追加するEVENT
    if (menu._menuTrigger) {
      menu._menuTrigger.addEventListener(eventName.CLICK, menu.toggleMenu);
    }
    Array.prototype.forEach.call(menu._navItemFirst, (el) => {
      el.addEventListener(eventName.MOUSE_ENTER, menu.hoverMenu, false);
      el.addEventListener(eventName.MOUSE_LEAVE, menu.blurMenu, false);
      el.addEventListener(eventName.CLICK, menu.openChild, false);
    });
    Array.prototype.forEach.call(menu._navChildBackBtn, (el) => {
      el.addEventListener(eventName.CLICK, menu.closeChild, false);
    });
    Array.prototype.forEach.call(menu._navGrandchildTrigger, (el) => {
      el.addEventListener(eventName.CLICK, menu.openGrandchild, false);
    });
    Array.prototype.forEach.call(menu._navGrandchildBackBtn, (el) => {
      el.addEventListener(eventName.CLICK, menu.closeGrandchild, false);
    });

  }
  private hoverMenu(): void {
    // 以下共通で追加するEVENT
    if(app.LAYOUT !== "PC") {
      return;
    }
    Array.prototype.forEach.call(menu._navItemFirst, (el) => {
      base.removeClass(el, "is-hover");
    });
    base.addClass(this, "is-hover");
  }
  private blurMenu(): void {
    // 以下共通で追加するEVENT
    if(app.LAYOUT !== "PC") {
      return;
    }
    Array.prototype.forEach.call(menu._navItemFirst, (el) => {
      base.removeClass(el, "is-hover");
    });
  }
  private toggleMenu(): void {
    // 以下共通で追加するEVENT
    if(app.LAYOUT === "PC") {
      return;
    }
    if (!base.hasClass(menu._container, "is-open")) {
      menu.scrollPosY = base._w.pageYOffset;
      menu._main?.setAttribute("style", "top:"+ -menu.scrollPosY +"px");
      base.addClass(menu._container, "is-open");
      // メインディレクトリのグループを展開する。
      const trigger: NodeListOf<HTMLElement> = document.querySelectorAll("[data-url]");
      Array.prototype.forEach.call(trigger, (t: HTMLElement) => {
        // console.log(t.getAttribute("data-url"), menu._mainDirectory);
        if (t.getAttribute("data-url") === menu._mainDirectory) {
          base.addClass((t.parentNode as HTMLElement), "is-slide");
          menu._navChildTarget = (t.parentNode as HTMLElement).querySelector(".js-itemSecond");
          base.addClass(menu._headerList, "is-secondOpen");
          menu._navChildCat = (t.parentNode as HTMLElement).getAttribute("data-category");
        }
      });
      setTimeout(()=>{
        base.addClass(menu._container, "is-slide");
      },100);
    } else {
      base.removeClass(menu._container, "is-slide");
      setTimeout(()=>{
        base.removeClass(menu._container, "is-open");
        menu._main?.removeAttribute("style");
        base._w.scrollTo(0,menu.scrollPosY);

        // class解除
        if(menu._navChildCat !== "" || menu._navGrandchildCat !== "") {
          base.removeClass(menu._headerList, "is-secondOpen");
          Array.prototype.forEach.call(menu._navItemFirst, (el) => {
            base.removeClass(el, "is-slide");
          });
          base.removeClass(menu._headerList, "is-thirdOpen");
          Array.prototype.forEach.call(menu._navGrandchildTrigger, (el) => {
            base.removeClass(el, "is-slide");
          });
          menu._navChildCat = "";
          menu._navGrandchildCat = "";
        }

      },500);
    }
  }
  private openChild(e): void {
    if(app.LAYOUT === "PC") {
      return;
    } else {
      e.preventDefault();
    }
    const _self: HTMLElement = this as unknown as HTMLElement;
    menu._navChildTarget = _self.querySelector(".js-itemSecond");
    base.addClass(menu._headerList, "is-secondOpen");
    base.addClass(this, "is-slide");
    menu._navChildCat = _self.getAttribute("data-category");
  }
  private closeChild(e: MouseEvent): void {
    if(app.LAYOUT === "PC") {
      return;
    }
    base.removeClass(menu._headerList, "is-secondOpen");
    Array.prototype.forEach.call(menu._navItemFirst, (el) => {
      if(el.getAttribute("data-category") === menu._navChildCat){
        base.removeClass(el, "is-slide");
      }
    });
    e.stopPropagation();
  }

  private openGrandchild(e: MouseEvent): void {
    if(app.LAYOUT === "PC") {
      return;
    }
    const _self: HTMLElement = this as unknown as HTMLElement;
    menu._navGrandchildTarget = _self.querySelector(".js-thirdTarget") as HTMLElement;
    base.addClass(menu._headerList, "is-thirdOpen");
    base.addClass(this, "is-slide");
    menu._navGrandchildCat = _self.getAttribute("data-detail");
    // console.log(menu._navChildCat);
    // if(menu._headerList) {
    //
    // }
    e.stopPropagation();
  }

  private closeGrandchild(e: MouseEvent): void {
    if(app.LAYOUT === "PC") {
      return;
    }
    base.removeClass(menu._headerList, "is-thirdOpen");
    Array.prototype.forEach.call(menu._navGrandchildTrigger, (el) => {
      if(el.getAttribute("data-detail") === menu._navGrandchildCat){
        base.removeClass(el, "is-slide");
        setTimeout(()=>{
          menu._navGrandchildTarget?.removeAttribute("style");
        },1000)
      }
    });
    e.stopPropagation();
  }

  public closeMenu(): void {
    if (base.hasClass(menu._container, "is-open")) {
      base.removeClass(menu._container, "is-slide");
      base.removeClass(menu._container, "is-open");
      menu._main?.removeAttribute("style");
      if(menu._navChildCat !== "" || menu._navGrandchildCat !== "") {
        base.removeClass(menu._headerList, "is-secondOpen");
        Array.prototype.forEach.call(menu._navItemFirst, (el) => {
          base.removeClass(el, "is-slide");
        });
        base.removeClass(menu._headerList, "is-thirdOpen");
        Array.prototype.forEach.call(menu._navGrandchildTrigger, (el) => {
          base.removeClass(el, "is-slide");
        });
        menu._navChildCat = "";
        menu._navGrandchildCat = "";
      }
    }
  }

}
export const menu: MenuClass = new MenuClass();
