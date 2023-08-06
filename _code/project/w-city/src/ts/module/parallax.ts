import Base from "../utils/base";
// import EventName from "../utils/eventName";

export default class Parallax {
  private _parallax: NodeListOf<Element>;
  private devided: number;
  private scale: number;
  private slide: number;
  constructor() {
    // class変数
    console.log("[create] Parallax");
    this._parallax = Base._d.querySelectorAll(".js-parallax");
    this.devided = 10;
    this.scale = 1.4;
    this.slide = -20;
    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    this.setPosion();
  }
  // private addEvent(): void {
  //   // 以下共通で追加するEVENT
  //
  // }

  public setPosion(): void {
    Array.prototype.forEach.call(this._parallax, (el) => {
      const img: HTMLImageElement = el.querySelector("img");
      const offset: number = img.getBoundingClientRect().top;
      img.style.transform =
        "translateX(" +
        String(this.slide) +
        "%) translateY(" +
        String((offset / this.devided) * -1) +
        "px) scale(" +
        String(this.scale) +
        ")";
    });
  }
}
