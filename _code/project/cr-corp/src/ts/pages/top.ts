import {app} from "../app";
import {base} from "../utils/base";
import {eventName} from "../utils/eventName";
// tslint:disable-next-line:no-any
declare const mainVisualItems: any;
class TopClass {
  private _a: HTMLCollectionOf<HTMLAnchorElement>;
  private _top: HTMLElement | null;
  private _loading: HTMLElement | null;
  private _loader: HTMLElement | null;
  private _header: HTMLElement | null;
  private _firstMvImg: NodeListOf<HTMLElement> | null;
  private _firstMvCover: HTMLElement | null;
  private _firstMvCoverItem: NodeListOf<HTMLElement> | null;
  private _creativeFlag: HTMLElement | null;
  private _unitFlag: boolean;
  private _firstMvItemCnt: number;
  private _firstMvCurrent: number;
  private _firstMvTimer: number;
  private _secondMv: HTMLElement | null;
  private _secondMvHeading: HTMLElement | null;
  private _secondMvPosY: number;
  private _secondMvDetail: HTMLElement | null;

  private _howBottom: HTMLElement | null;

  private _slideupItem: HTMLElement | null;
  private _genreText: HTMLElement | null;
  private _genreCount: HTMLElement | null;
  private _genreUnit: HTMLElement | null;

  private isScrolling: number;
  private timeoutId: NodeJS.Timer;

  constructor() {
    // class変数
    this._a = base._d.getElementsByTagName("a");
    this._top = base._d.getElementById("js-top");
    this._loading = base._d.getElementById("js-loading");
    this._loader = base._d.getElementById("js-loader");
    this._header = base._d.getElementById("js-header");
    this._firstMvImg = base._d.querySelectorAll(".js-firstMvImg");
    this._firstMvCover = base._d.getElementById("js-firstMvCover");
    this._firstMvCoverItem = base._d.querySelectorAll(".js-firstMvCoverItem");
    this._creativeFlag = base._d.getElementById("js-creativeText");
    this._firstMvItemCnt = 0;
    this._firstMvCurrent = 0;
    this._firstMvTimer = 2500;
    this._secondMv = base._d.getElementById("js-secondMv");
    this._secondMvHeading = base._d.getElementById("js-secondMvHeading");
    this._secondMvPosY = 0;
    this._secondMvDetail = base._d.getElementById("js-secondMvDetail");

    this._howBottom = base._d.getElementById("js-howBottom");

    this._slideupItem = base._d.getElementById("js-slideupItem");
    this._genreText = base._d.getElementById("js-genreText");
    this._genreCount = base._d.getElementById("js-genreCount");
    this._genreUnit = base._d.getElementById("js-genreUnit");
    this._unitFlag = true;

    this.isScrolling = 0;
    this.timeoutId = null;

  }
  public init(): void {
    // 以下共通で追加するEVENT
    // base._w.addEventListener(eventName.RESIZE, top.checkRatio);
    // top.checkRatio();
    top.showLoading();

    base._w.onscroll = ()=>{
      top.windowScroll();
    };
    app.checkLayout();
    top.checkSecondMv();
  }
  public windowScroll(): void {
    clearTimeout( top.timeoutId );
    if(top.isScrolling === 0) {
      requestAnimationFrame(()=> {
        top.isScrolling = 1;
        top.checkSecondMv();
      });
    }

    top.timeoutId = setTimeout(()=> {
      top.isScrolling = 0;
    },500);
  }
  public showLoading(): void {
    top._firstMvItemCnt = mainVisualItems.length;

    Array.prototype.forEach.call(top._firstMvImg, (img) => {
      base.removeClass(img, "is-current");
      base.removeClass(img, "is-slide");
    });
    if(top._firstMvImg){
      base.addClass(top._firstMvImg[top._firstMvCurrent], "is-current");
      top._genreText?.innerText = mainVisualItems[top._firstMvCurrent].genre;
      top._genreCount?.innerText = mainVisualItems[top._firstMvCurrent].count;
    }

    const dataFlag = localStorage.getItem("msdata");

    if(dataFlag) {
      const nowTime = new Date();
      const nowMs = nowTime.getTime();
      const beforeTimeMs = Number(dataFlag);
      // １日(24H)間隔をあける
      const timeRange = 1*1000*60*60*24
      const timeFlag = Boolean(nowMs - beforeTimeMs > timeRange);

      if(timeFlag) {
        dateSaveLocalStorage();
      } else {
        top.createMv();
        top._loading.remove();
      }
    } else {
      dateSaveLocalStorage();
    }

    function dateSaveLocalStorage() {
      const latestTime = new Date();
      const latestTimeMs = String(latestTime.getTime());
      localStorage.setItem("msdata", latestTimeMs);

      base.addClass(top._loader, "is-show");
      setTimeout(()=>{
        base.addClass(top._loading, "is-loading");
        setTimeout(()=>{
          top.createMv();
        }, 800)
      }, 3000)
    }
  }
  public createMv(): void {
    if(top._firstMvImg){
      base.addClass(top._slideupItem, "is-slideup");
      setTimeout(()=>{
        base.addClass(top._firstMvImg[top._firstMvCurrent], "is-slide");
      }, 100)
    }
    top.proceedMv();
  }
  public proceedMv(): void {
    Array.prototype.forEach.call(top._firstMvCoverItem, (item) => {
      item.querySelector("div").removeAttribute("style");
      base.removeClass(item, "is-slide");
      setTimeout(()=>{
        base.removeClass(top._firstMvCover, "is-slide");
      }, 1000)
    });
    setTimeout(()=>{
      Array.prototype.forEach.call(top._firstMvCoverItem, (item) => {
        item.querySelector("div").style.transitionDelay = Math.random()/2+"s";
        base.addClass(item, "is-slide");
      });
      setTimeout(()=>{
        // 覆われたら画像切り替え
        base.removeClass(top._slideupItem, "is-slideup");
        top._firstMvCurrent = top._firstMvCurrent + 1;
        if(top._firstMvCurrent === top._firstMvItemCnt) {
          top._firstMvCurrent = 0;
        }
        Array.prototype.forEach.call(top._firstMvImg, (img) => {
          base.removeClass(img, "is-current");
          base.removeClass(img, "is-slide");
        });
        if(top._firstMvImg){
          base.addClass(top._firstMvImg[top._firstMvCurrent], "is-current");
          top._genreText?.innerText = mainVisualItems[top._firstMvCurrent].genre;
          top._genreCount?.innerText = mainVisualItems[top._firstMvCurrent].count;
          if(mainVisualItems[top._firstMvCurrent].creativeFlag) {
            base.removeClass(top._creativeFlag, "is-hide");
          } else {
            base.addClass(top._creativeFlag, "is-hide");
          }
          if(mainVisualItems[top._firstMvCurrent].unitFlag) {
            base.removeClass(top._genreUnit, "is-hide");
          } else {
            base.addClass(top._genreUnit, "is-hide");
          }
          setTimeout(()=>{
            base.addClass(top._firstMvImg[top._firstMvCurrent], "is-slide");
            base.addClass(top._slideupItem, "is-slideup");
          }, 100)
        }
        base.addClass(top._firstMvCover, "is-slide");
        setTimeout(()=>{
          // 白が取れたらループ
          top.proceedMv();
        }, 500)
      }, 750)
    }, top._firstMvTimer)
  }
  public checkRatio(): void {
    const ww: number = base._w.innerWidth;
    const wh: number = base._w.innerHeight;
    const image: HTMLElement | null = top._secondMv ? top._secondMv.querySelector(".swiper-slide img"): null;
    const iw: number = image ? image.clientWidth: 0;
    const ih: number = image ? image.clientHeight: 0;
    if (ww/wh > iw/ih) {
      base.addClass(top._top, "is-beside");
      base.removeClass(top._top, "is-vertical");
    } else {
      base.removeClass(top._top, "is-beside");
      base.addClass(top._top, "is-vertical");
    }
  }
  public checkSecondMv(): void {
    if(top._secondMv && top._secondMvHeading) {
      top._secondMvPosY = top._secondMv.getBoundingClientRect().top;
      // top._secondMvPosY = top._secondMv.getBoundingClientRect().top + base._w.pageYOffset;
      // console.log("secondMvPosY:" + top._secondMvPosY + "px");
      if(top._secondMvPosY <= 0) {
        top._secondMvHeading.removeAttribute("style");
        base.addClass(top._secondMv,"is-sticky");
        base.addClass(top._howBottom,"is-showButton");
        base.removeClass(top._header,"is-slideUp");
        app.showTopBtn();
        if(app.LAYOUT === "SP") {
          base.addClass(top._secondMvDetail,"is-show");
        } else if(app.LAYOUT === "TB") {
          base.addClass(top._secondMvDetail,"is-show");
        }
      } else {
        if(app.LAYOUT === "SP") {
          top._secondMvHeading.style.top = "calc("+ ( - top._secondMv.getBoundingClientRect().top) +"px + 17.4vh)";
        } else if(app.LAYOUT === "TB") {
          top._secondMvHeading.style.top = "calc("+ ( - top._secondMv.getBoundingClientRect().top) +"px + 17.4vh)";
        } else {
          top._secondMvHeading.style.top = "calc("+ ( - top._secondMv.getBoundingClientRect().top) +"px + 12vh)";
        }
        base.addClass(top._header,"is-slideUp");
        app.hideTopBtn();
        base.removeClass(top._secondMv,"is-sticky");
      }
      if(top.isScrolling === 1) {
        requestAnimationFrame(()=> {
          top.checkSecondMv();
        });
      }
    }
  }
}
export const top: TopClass = new TopClass();
