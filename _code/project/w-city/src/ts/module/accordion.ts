import Base from "../utils/base";
import EventName from "../utils/eventName";

export default class Accordion {
  private _accordion: NodeListOf<Element>;
  constructor() {
    // class変数
    console.log("[create] Accordion");
    this._accordion = Base._d.querySelectorAll(".js-accordion");
    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    this.addEvent();
  }
  private addEvent(): void {
    // 以下共通で追加するEVENT
    Array.prototype.forEach.call(this._accordion, (el) => {
      const trigger: HTMLButtonElement | null = el.querySelector(".js-accordionTrigger");
      trigger.addEventListener(EventName.CLICK, this.toggleAccordion.bind(this, trigger));
    });
  }

  // private removeEvent(): void {
  //   // 以下共通で削除するEVENT
  // }
  private toggleAccordion(trigger: HTMLButtonElement): void {
    const expanded: string | null = trigger.getAttribute("aria-expanded");
    if (expanded === "true") {
      trigger.setAttribute("aria-expanded", "false");
      trigger.parentNode.parentNode.querySelector(".js-accordionDefinition").setAttribute("aria-hidden", "true");
    } else {
      trigger.setAttribute("aria-expanded", "true");
      trigger.parentNode.parentNode.querySelector(".js-accordionDefinition").setAttribute("aria-hidden", "false");
    }
  }
}
