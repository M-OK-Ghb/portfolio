/**
 * 全体の共通処理を記述する
 */
class EventNameClass {
  public LOAD: string;
  public CLICK: string;
  public RESIZE: string;
  public MOUSE_MOVE: string;
  public MOUSE_DOWN: string;
  public MOUSE_UP: string;
  public DOM_MOUSE_SCROLL: string;
  public ON_MOUSE_WHEEL: string;
  public SCROLL: string;
  public TOUCH_START: string;
  public TOUCH_MOVE: string;
  public TOUCH_END: string;
  public ORIENTATION_CHANGE: string;

  constructor() {
    // class変数
    this.LOAD = "load";
    this.CLICK = "click";
    this.RESIZE = "resize";
    this.MOUSE_MOVE = "mousemove";
    this.MOUSE_DOWN = "mousedown";
    this.MOUSE_UP = "mouseup";
    this.DOM_MOUSE_SCROLL = "DOMMouseScroll";
    this.ON_MOUSE_WHEEL = "onmousewheel";
    this.SCROLL = "scroll";
    this.TOUCH_START = "touchstart";
    this.TOUCH_MOVE = "touchmove";
    this.TOUCH_END = "touchend";
    this.ORIENTATION_CHANGE = "orientationchange";
  }

}
export const eventName: EventNameClass = new EventNameClass();
