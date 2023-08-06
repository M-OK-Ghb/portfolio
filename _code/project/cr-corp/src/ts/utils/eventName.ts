class EventNameClass {
  public LOAD: string;
  public CLICK: string;
  public RESIZE: string;
  public MOUSE_MOVE: string;
  public MOUSE_OVER: string;
  public MOUSE_LEAVE: string;
  public MOUSE_ENTER: string;
  public MOUSE_OUT: string;
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
    this.MOUSE_OVER = "mouseover";
    this.MOUSE_LEAVE = "mouseleave";
    this.MOUSE_ENTER = "mouseenter";
    this.MOUSE_OUT = "mouseout";
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