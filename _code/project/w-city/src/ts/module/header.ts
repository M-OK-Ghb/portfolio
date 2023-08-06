import Base from "../utils/base";
// import EventName from "../utils/eventName";

export default class Header {
  public _header: HTMLElement | null;
  private _hero: HTMLElement | null;
  private _main: HTMLElement | null;
  private _content: HTMLElement | null;
  private page: string | null;
  public heroHeight: number;
  public startPos: number;
  private scrollable: boolean;
  constructor() {
    // class変数+
    console.log("[create] Header");
    this._header = Base._d.getElementById("js-header");
    this._hero = Base._d.getElementById("js-hero");
    this._main = Base._d.getElementById("js-main");
    this._content = Base._d.getElementById("js-content");
    if (this._main) {
      this.page = this._main.getAttribute("data-page") as string;
    } else {
      this.page = "";
    }
    this.heroHeight = this._hero ? this._hero.getBoundingClientRect().height : 0;
    this.startPos = 0;
    // this.scrollable = false;
    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    // this.addEvent();
    if (this.page === "updates" || this.page === "mediakits" || this.page === "terms") {
      setTimeout(() => {
        if (this._hero) {
          this._hero.classList.remove("is-before");
          this._hero.classList.add("is-after");
          this.showContent();
        }
      }, 100);
    } else {
      setTimeout(() => {
        if (this._hero) {
          this._hero.classList.remove("is-before");
          this.showContent();
        }
      }, 300);
      setTimeout(() => {
        if (this._hero) {
          this._hero.classList.add("is-after");
        }
      }, 100);
    }
  }
  private showContent(): void {
    // 以下共通で追加するEVENT
    setTimeout(() => {
      if (this._content) {
        this._content.classList.remove("is-before");
      }
    }, 1000);
  }
  public setHeader(posY: number): void {
    // 処理内容
    if (this.page === "updates" || this.page === "mediakits" || this.page === "terms") {
      if (this._header) {
        Base.addClass(this._header, "-changeBgColor");
      }
    } else {
      if (posY > this.heroHeight / 2) {
        if (this._header) {
          Base.addClass(this._header, "-changeBgColor");
        }
      } else {
        if (this._header) {
          Base.removeClass(this._header, "-changeBgColor");
        }
      }
    }

    if (posY > this.startPos) {
      // マウスホイールを下にスクロールしたときの処理を記載
      setTimeout(() => {
        if (this._header && !Base.hasClass(this._header, "-hide")) {
          Base.addClass(this._header, "-hide");
        }
      }, 100);
      if (posY === 0) {
        if (this._header) {
          Base.removeClass(this._header, "-hide");
        }
      }
    } else {
      // マウスホイールを上にスクロールしたときの処理を記載
      if (this._header && Base.hasClass(this._header, "-hide")) {
        Base.removeClass(this._header, "-hide");
      }
    }
    setTimeout(() => {
      // this.scrollable = true;
      this.startPos = posY;
    }, 200);
  }
  public showHeader(): void {
    if (this._header) {
      Base.removeClass(this._header, "-hide");
    }
  }
}
