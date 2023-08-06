/**
 * 全体の共通処理を記述する
 */
import {base} from "../utils/base";
import {eventName} from "../utils/eventName";
class CatalogClass {
  private _catalog: HTMLElement;
  private _pdfBook: HTMLElement;
  private _pdfPages: NodeListOf<HTMLElement>;
  private catalogImages: object[];
  private widthRatio: number;

  private currentPage: number;
  private mousePos: object;
  private BOOK_WIDTH: number;
  private BOOK_HEIGHT: number;
  private _pagePrev: HTMLButtonElement;
  private _pageNext: HTMLButtonElement;
  private _expansion: HTMLButtonElement;
  private _shrink: HTMLButtonElement;
  private _start: HTMLButtonElement;
  private _prev: HTMLButtonElement;
  private _next: HTMLButtonElement;
  private _end: HTMLButtonElement;
  private _print: HTMLButtonElement;
  private _download: HTMLButtonElement;

  private _pageCurrent: HTMLElement;
  private _pageAll: HTMLElement;
  private SCALE: number;
  private clickable: boolean;
  private clickableTimer: number;

  private _startX: number;
  private _diffX: number;
  private CONTROL_AVAILABLE: boolean;
  private THRESHOLD: number;

  private _loading: HTMLElement;
  constructor() {
    // class変数
    this._catalog = base._d.getElementById("data-catalog");
    this._pdfBook =  base._d.getElementById("data-catalog-pages");
    this._pdfPages = null;
    this.catalogImages = [];
    this.widthRatio = 0.706666;

    this.currentPage = base.getUrlVars().p ? Number(base.getUrlVars().p) - 1 : 0;
    this.mousePos =  { x: 0, y: 0 };
    this.BOOK_WIDTH = 0;
    this.BOOK_HEIGHT = 0;

    this._pagePrev = base._d.getElementById("data-catalog-page-prev");
    this._pageNext = base._d.getElementById("data-catalog-page-next");
    this._expansion = base._d.getElementById("data-catalog-expansion");
    this._shrink = base._d.getElementById("data-catalog-shrink");
    this._start = base._d.getElementById("data-catalog-start");
    this._prev = base._d.getElementById("data-catalog-prev");
    this._next = base._d.getElementById("data-catalog-next");
    this._end = base._d.getElementById("data-catalog-end");
    this._print = base._d.getElementById("data-catalog-print");
    this._download = base._d.getElementById("data-catalog-download");
    this._pageCurrent = base._d.getElementById("data-catalog-page-current");
    this._pageAll = base._d.getElementById("data-catalog-page-all");
    this.SCALE = 1;
    this.clickable = true;
    this.clickableTimer = 800;

    this._startX = 0;
    this._diffX = 0;
    this.CONTROL_AVAILABLE = false;
    this.THRESHOLD = 250;

    this._loading =  base._d.getElementById("data-loading");
  }
  public init(): void {
    // 以下共通で追加するEVENT
    catalog.initCatalog();
  }
  public initCatalog(): void {
    // 以下共通で追加するEVENT
    catalog._pdfPages = catalog._pdfBook.getElementsByTagName("div");

    Array.prototype.forEach.call(catalog._pdfPages, (item, index) => {
      item.style.zIndex = catalog._pdfPages.length - index;
      catalog.catalogImages.push({
        // Current progress of the flip (left -1 to right +1)
        progress: 1,
        // The target value towards which progress is always moving
        target: 1,
        // The page DOM element related to this flip
        page: item,
        // True while the page is being dragged
        dragging: false,
      });
    });
    catalog.BOOK_WIDTH = catalog._catalog.offsetHeight * catalog.widthRatio;
    catalog.BOOK_HEIGHT = catalog._catalog.offsetHeight;
    catalog._catalog.style.width = catalog.BOOK_WIDTH + "px";
    base.removeClass(catalog.catalogImages[catalog.currentPage].page, "is-hide");
    Array.prototype.forEach.call(catalog.catalogImages, (item, index) => {
      if (index < catalog.currentPage ) {
        base.addClass(item.page, "is-sent");
      }
    });

    catalog._pageCurrent.innerText = String(catalog.currentPage + 1);
    catalog._pageAll.innerText = String(catalog.catalogImages.length);

    if (catalog.currentPage === 0 ) {
      catalog._pageNext.removeAttribute("disabled");
      catalog._next.removeAttribute("disabled");
      catalog._end.removeAttribute("disabled");
      catalog._pagePrev.setAttribute("disabled", "disabled");
      catalog._prev.setAttribute("disabled", "disabled");
      catalog._start.setAttribute("disabled", "disabled");
    } else if (catalog.currentPage === catalog.catalogImages.length - 1 ) {
      catalog._pageNext.setAttribute("disabled", "disabled");
      catalog._next.setAttribute("disabled", "disabled");
      catalog._end.setAttribute("disabled", "disabled");
      catalog._pagePrev.removeAttribute("disabled");
      catalog._prev.removeAttribute("disabled");
      catalog._start.removeAttribute("disabled");
    }  else {
      catalog._pageNext.removeAttribute("disabled");
      catalog._next.removeAttribute("disabled");
      catalog._end.removeAttribute("disabled");
      catalog._pagePrev.removeAttribute("disabled");
      catalog._prev.removeAttribute("disabled");
      catalog._start.removeAttribute("disabled");
    }

    base._w.addEventListener(eventName.RESIZE, (e) => {
      catalog.BOOK_WIDTH = catalog._catalog.offsetHeight * catalog.widthRatio;
      catalog.BOOK_HEIGHT = catalog._catalog.offsetHeight;
      catalog._catalog.style.width = catalog.BOOK_WIDTH + "px";
    });

    catalog._pagePrev.addEventListener( eventName.CLICK, catalog.pagePrev, false );
    catalog._prev.addEventListener( eventName.CLICK, catalog.pagePrev, false );
    catalog._pageNext.addEventListener( eventName.CLICK, catalog.pageNext, false );
    catalog._next.addEventListener( eventName.CLICK, catalog.pageNext, false );
    catalog._expansion.addEventListener( eventName.CLICK, catalog.pageExpansion, false );
    catalog._shrink.addEventListener( eventName.CLICK, catalog.pageShrink, false );
    catalog._start.addEventListener( eventName.CLICK, catalog.pageStart, false );
    catalog._end.addEventListener( eventName.CLICK, catalog.pageEnd, false );
    catalog._print.addEventListener( eventName.CLICK, () => {
      base._w.print();
    }, false );

    catalog._pdfBook.addEventListener(eventName.MOUSE_DOWN, catalog.mouseHandler, false);
    catalog._pdfBook.addEventListener(eventName.MOUSE_MOVE, catalog.mouseHandler, false);
    catalog._pdfBook.addEventListener(eventName.MOUSE_UP, catalog.mouseHandler, false);
    catalog._pdfBook.addEventListener(eventName.TOUCH_START, catalog.touchHandler, false);
    catalog._pdfBook.addEventListener(eventName.TOUCH_MOVE, catalog.touchHandler, false);
    catalog._pdfBook.addEventListener(eventName.TOUCH_END, catalog.touchHandler, false);

    base.addClass(catalog._loading, "is-hide");
  }
  public pageZoomReset(page: HTMLElement, img: HTMLImageElement): void {
    catalog._expansion.removeAttribute("disabled");
    catalog._shrink.setAttribute("disabled", "disabled");
    catalog.SCALE = 1;
    base.removeClass(page, "is-zoom");
    base.removeClass(catalog._pdfBook, "is-zoom");
    img.style.transform = "scale(1,1)";
  }
  public pageExpansion(): void {
    if (!catalog.clickable) {
      return;
    }
    catalog.clickable = false;
    const page: HTMLElement = catalog.catalogImages[catalog.currentPage].page;
    const img: HTMLImageElement = page.querySelector("img");
    catalog.SCALE = catalog.SCALE + 1;
    if (catalog.SCALE > 1) {
      catalog._shrink.removeAttribute("disabled");
      base.addClass(page, "is-zoom");
      base.addClass(catalog._pdfBook, "is-zoom");
      img.style.transform = "scale(" + catalog.SCALE + "," + catalog.SCALE + ")";
      if (catalog.SCALE === 3) {
        catalog._expansion.setAttribute("disabled", "disabled");
      }
    }
    setTimeout(() => {
      catalog.clickable = true;
    }, catalog.clickableTimer);
  }
  public pageShrink(): void {
    if (!catalog.clickable) {
      return;
    }
    catalog.clickable = false;
    const page: HTMLElement = catalog.catalogImages[catalog.currentPage].page;
    const img: HTMLImageElement = page.querySelector("img");
    if (catalog.SCALE > 1) {
      catalog._expansion.removeAttribute("disabled");
      catalog.SCALE = catalog.SCALE - 1;
      img.style.transform = "scale(" + catalog.SCALE + "," + catalog.SCALE + ")";
      if (catalog.SCALE === 1) {
        catalog._shrink.setAttribute("disabled", "disabled");
        base.removeClass(page, "is-zoom");
        base.removeClass(catalog._pdfBook, "is-zoom");
      }
    } else {
      catalog._shrink.setAttribute("disabled", "disabled");
      base.removeClass(page, "is-zoom");
      base.removeClass(catalog._pdfBook, "is-zoom");
    }
    setTimeout(() => {
      catalog.clickable = true;
    }, catalog.clickableTimer);
  }
  public pagePrev(): void {
    if (catalog.currentPage === 0) {
      return;
    }
    if (!catalog.clickable) {
      return;
    }
    base.removeClass(catalog._loading, "is-hide");
    catalog.clickable = false;
    const page: HTMLElement = catalog.catalogImages[catalog.currentPage].page;
    const img: HTMLImageElement = page.querySelector("img");
    const prev: HTMLElement = catalog.catalogImages[catalog.currentPage - 1].page;
    base.removeClass(prev, "is-hide");
    catalog.pageZoomReset(page, img);
    const image = new Image();
    // コールバックを設定
    image.onload = () => {
      base.removeClass(prev, "is-sent");
      setTimeout(() => {
        base.addClass(page, "is-hide");
        catalog.currentPage = catalog.currentPage - 1;
        catalog._pageCurrent.innerText = String(catalog.currentPage + 1);
        if (catalog.currentPage === 0) {
          catalog._pagePrev.setAttribute("disabled", "disabled");
          catalog._prev.setAttribute("disabled", "disabled");
          catalog._start.setAttribute("disabled", "disabled");
        } else {
          catalog._pagePrev.removeAttribute("disabled");
          catalog._prev.removeAttribute("disabled");
          catalog._start.removeAttribute("disabled");
          catalog._pageNext.removeAttribute("disabled");
          catalog._next.removeAttribute("disabled");
          catalog._end.removeAttribute("disabled");
        }
        setTimeout(() => {
          catalog.clickable = true;
          base.addClass(catalog._loading, "is-hide");
        }, catalog.clickableTimer);
      }, 1000);
    };
    image.src = prev.querySelector("img").getAttribute("src");
  }
  public pageNext(): void {
    if (catalog.currentPage === catalog.catalogImages.length - 1) {
      return;
    }
    if (!catalog.clickable) {
      return;
    }
    base.removeClass(catalog._loading, "is-hide");
    catalog.clickable = false;
    const page: HTMLElement = catalog.catalogImages[catalog.currentPage].page;
    const img: HTMLImageElement = page.querySelector("img");
    const next: HTMLElement = catalog.catalogImages[catalog.currentPage + 1 ].page;
    base.removeClass(next, "is-hide");
    catalog.pageZoomReset(page, img);
    const image = new Image();
    // コールバックを設定
    image.onload = () => {
      base.addClass(page, "is-sent");
      catalog.currentPage = catalog.currentPage + 1;
      catalog._pageCurrent.innerText = String(catalog.currentPage + 1);
      if (catalog.currentPage + 1 === catalog.catalogImages.length) {
        catalog._pageNext.setAttribute("disabled", "disabled");
        catalog._next.setAttribute("disabled", "disabled");
        catalog._end.setAttribute("disabled", "disabled");
      } else {
        catalog._pagePrev.removeAttribute("disabled");
        catalog._prev.removeAttribute("disabled");
        catalog._start.removeAttribute("disabled");
        catalog._pageNext.removeAttribute("disabled");
        catalog._next.removeAttribute("disabled");
        catalog._end.removeAttribute("disabled");
      }
      setTimeout(() => {
        base.addClass(page, "is-hide");
        catalog.clickable = true;
        base.addClass(catalog._loading, "is-hide");
      }, catalog.clickableTimer);
    };
    image.src = next.querySelector("img").getAttribute("src");
  }
  public pageStart(): void {
    if (!catalog.clickable) {
      return;
    }
    base.removeClass(catalog._loading, "is-hide");
    catalog.clickable = false;
    const page: HTMLElement = catalog.catalogImages[catalog.currentPage].page;
    const img: HTMLImageElement = page.querySelector("img");
    const start: HTMLElement = catalog.catalogImages[0].page;
    base.removeClass(start, "is-hide");
    catalog.pageZoomReset(page, img);
    const image = new Image();
    // コールバックを設定
    image.onload = () => {
      Array.prototype.forEach.call(catalog.catalogImages, (item, index) => {
        if ( index !==  0 && index !== catalog.currentPage ) {
          base.removeClass(item.page, "is-sent");
          base.addClass(item.page, "is-hide");
        }
      });
      setTimeout(() => {
        base.removeClass(start, "is-sent");
        catalog.currentPage = 0;
        catalog._pageCurrent.innerText = String(catalog.currentPage + 1);

        catalog._pageNext.removeAttribute("disabled");
        catalog._next.removeAttribute("disabled");
        catalog._end.removeAttribute("disabled");
        catalog._pagePrev.setAttribute("disabled", "disabled");
        catalog._prev.setAttribute("disabled", "disabled");
        catalog._start.setAttribute("disabled", "disabled");
        setTimeout(() => {
          base.addClass(page, "is-hide");
          catalog.clickable = true;
          base.addClass(catalog._loading, "is-hide");
        }, catalog.clickableTimer);
      }, 500);
    };
    image.src = start.querySelector("img").getAttribute("src");
  }
  public pageEnd(): void {
    if (!catalog.clickable) {
      return;
    }
    base.removeClass(catalog._loading, "is-hide");
    catalog.clickable = false;
    const page: HTMLElement = catalog.catalogImages[catalog.currentPage].page;
    const img: HTMLImageElement = page.querySelector("img");
    const end: HTMLElement = catalog.catalogImages[catalog.catalogImages.length - 1 ].page;
    base.removeClass(end, "is-hide");
    catalog.pageZoomReset(page, img);
    const image = new Image();
    // コールバックを設定
    image.onload = () => {
      Array.prototype.forEach.call(catalog.catalogImages, (item, index) => {
        if ( index !==  catalog.catalogImages.length - 1 && index !== catalog.currentPage ) {
          base.addClass(item.page, "is-sent");
          base.addClass(item.page, "is-hide");
        }
      });
      setTimeout(() => {
        base.addClass(page, "is-sent");
        catalog.currentPage = catalog.catalogImages.length - 1;
        catalog._pageCurrent.innerText = String(catalog.currentPage + 1);
        catalog._pageNext.setAttribute("disabled", "disabled");
        catalog._next.setAttribute("disabled", "disabled");
        catalog._end.setAttribute("disabled", "disabled");
        catalog._pagePrev.removeAttribute("disabled");
        catalog._prev.removeAttribute("disabled");
        catalog._start.removeAttribute("disabled");
        setTimeout(() => {
          base.addClass(page, "is-hide");
          catalog.clickable = true;
          base.addClass(catalog._loading, "is-hide");
        }, catalog.clickableTimer);
      }, 500);
    };
    image.src = end.querySelector("img").getAttribute("src");
  }
  public mouseHandler(e): void {
    if (catalog.SCALE === 1) {
      if (e.type === eventName.MOUSE_DOWN) {
        catalog.CONTROL_AVAILABLE = true;
        catalog._startX = e.offsetX;
      } else if (e.type === eventName.MOUSE_MOVE) {

        if (catalog.CONTROL_AVAILABLE) {
          catalog._diffX = catalog._startX - e.offsetX;
        }
      } else if (e.type === eventName.MOUSE_UP) {
        if ( catalog._diffX <  - catalog.THRESHOLD) {
          // prev
          catalog.pagePrev();
        } else if ( catalog._diffX >  catalog.THRESHOLD) {
          // next
          catalog.pageNext();
        }
        catalog.CONTROL_AVAILABLE = false;
      }
    }

  }
  public touchHandler(e): void {
    const touch = e.touches[0];
    if (catalog.SCALE === 1) {
      if (e.type === eventName.TOUCH_START) {
        catalog.CONTROL_AVAILABLE = true;
        catalog._startX = touch.pageX;
      } else if (e.type === eventName.TOUCH_MOVE) {
        if (catalog.CONTROL_AVAILABLE) {
          catalog._diffX = catalog._startX - touch.pageX;
        }
      } else if (e.type === eventName.TOUCH_END) {
        if ( catalog._diffX <  - catalog.THRESHOLD) {
          // prev
          catalog.pagePrev();
        } else if ( catalog._diffX >  catalog.THRESHOLD) {
          // next
          catalog.pageNext();
        }
        catalog.CONTROL_AVAILABLE = false;
      }
    }
  }

}
export const catalog: CatalogClass = new CatalogClass();
