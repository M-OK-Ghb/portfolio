import Base from "../utils/base";
import EventName from "../utils/eventName";

export default class Menu {
  private is_expanded: boolean;
  private _navButton: HTMLElement | null;
  private _siteMenu: HTMLElement | null;
  private BREAK_POINT_SP: number;
  constructor() {
    // class変数+
    console.log("[create] Menu");
    this.is_expanded = false;
    this._navButton = Base._d.getElementById("js-navButton");
    this._siteMenu = Base._d.getElementById("js-siteMenu");
    this.BREAK_POINT_SP = 750;
    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    this.addEvent();
  }
  private addEvent(): void {
    // 以下共通で追加するEVENT
    this._navButton.addEventListener(EventName.CLICK, this.toggleMenu.bind(this));
  }
  private toggleMenu(): void {
    if (!this.is_expanded) {
      this._navButton.setAttribute("aria-expanded", "true");
      this._siteMenu.setAttribute("aria-hidden", "false");
      this.is_expanded = true;
      Base._b.style.overflow = "hidden";
    } else {
      this._navButton.setAttribute("aria-expanded", "false");
      this._siteMenu.setAttribute("aria-hidden", "true");
      this.is_expanded = false;
      Base._b.style.overflow = "auto";
    }
  }
}
