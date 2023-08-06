export default class EventName {
  public static LOAD: string;
  public static CHANGE: string;
  public static CLICK: string;
  public static RESIZE: string;
  public static MOUSE_MOVE: string;
  public static DOM_MOUSE_SCROLL: string;
  public static ON_MOUSE_WHEEL: string;
  public static SCROLL: string;
  public static TOUCH_START: string;
  public static TOUCH_MOVE: string;
  public static TOUCH_END: string;
  public static ORIENTATION_CHANGE: string;
  constructor() {
    EventName.LOAD = "load";
    EventName.CHANGE = "change";
    EventName.CLICK = "click";
    EventName.RESIZE = "resize";
    EventName.MOUSE_MOVE = "mousemove";
    EventName.DOM_MOUSE_SCROLL = "DOMMouseScroll";
    EventName.ON_MOUSE_WHEEL = "onmousewheel";
    EventName.SCROLL = "scroll";
    EventName.TOUCH_START = "touchstart";
    EventName.TOUCH_MOVE = "touchmove";
    EventName.TOUCH_END = "touchend";
    EventName.ORIENTATION_CHANGE = "orientationchange";
  }
}
