import Base from "../utils/base";
import EventName from "../utils/eventName";
import YouTubeIframeLoader from "youtube-iframe";

export default class Modal {
  private is_expanded: boolean;
  private _modalTrigger: NodeListOf<Element>;
  private _modal: HTMLElement | null;
  private _modalOverlay: HTMLElement | null;
  private _modalClose: HTMLElement | null;
  private declare player;
  private declare YT;
  private _download: HTMLElement | null;
  private _agreement: HTMLInputElement | null;
  private BREAK_POINT_SP: number;
  constructor() {
    // class変数
    console.log("[create] Modal");
    this.is_expanded = false;
    this._modalTrigger = Base._d.querySelectorAll(".js-modalTrigger");
    this._modal = Base._d.getElementById("js-modal");
    this._modalOverlay = Base._d.getElementById("js-modalOverlay");
    this._modalClose = Base._d.getElementById("js-modalClose");
    this.player = null;
    this.YT = null;
    this._download = Base._d.getElementById("js-download");
    this._agreement = Base._d.getElementById("js-agreement") as HTMLInputElement;
    this.BREAK_POINT_SP = 750;
    this.init();
  }
  public init(): void {
    // 以下共通で追加するEVENT
    this.addEvent();

    YouTubeIframeLoader.load((YT) => {
      this.YT = YT;
    });
  }
  private addEvent(): void {
    // 以下共通で追加するEVENT
    Array.prototype.forEach.call(this._modalTrigger, (el) => {
      el.addEventListener(EventName.CLICK, this.showModal.bind(this, el));
    });
    if (this._modalClose) {
      this._modalClose.addEventListener(EventName.CLICK, this.hideModal.bind(this), true);
    }
    if (this._modalOverlay) {
      this._modalOverlay.addEventListener(EventName.CLICK, this.hideModal.bind(this), true);
    }

    if (this._agreement) {
      this._agreement.addEventListener(EventName.CHANGE, this.changeAgreement.bind(this));
    }
  }

  public showModal(trigger: HTMLButtonElement): void {
    const videoId: string | null = trigger.getAttribute("data-video-id");
    const downloadPath: string | null = trigger.getAttribute("data-download-path");
    if (videoId) {
      if (this.player) {
        this.player.cueVideoById({ videoId: videoId });
      } else {
        this.player = new this.YT.Player("js-movie", {
          height: "315",
          width: "560",
          videoId: videoId,
          playerVars: {
            allowfullscreen: 1,
            controls: 1,
            rel: 0,
          },
        });
      }
    }
    if (downloadPath && this._download) {
      this._download.setAttribute("href", downloadPath);
    }

    if (this._modal && this._modalOverlay) {
      this._modal.setAttribute("aria-hidden", "false");
      this._modalOverlay.setAttribute("tabindex", "1");
    }
    Base._b.style.overflow = "hidden";
  }
  public hideModal(e: PointerEvent): void {
    if (e.target === this._modalClose || e.target === this._modalOverlay) {
      if (this._modal && this._modalOverlay) {
        this._modal.setAttribute("aria-hidden", "true");
        this._modalOverlay.setAttribute("tabindex", "-1");
      }
      if (this.player) {
        this.player.stopVideo();
      }
      if (this._agreement && this._download) {
        this._agreement.checked = false;
        this._download.classList.add("-disabled");
      }
      Base._b.style.overflow = "auto";
    }
    e.stopPropagation();
  }
  public changeAgreement(): void {
    const agreement: boolean | undefined = this._agreement ? this._agreement.checked : undefined;
    if (this._download) {
      if (agreement) {
        this._download.classList.remove("-disabled");
      } else {
        this._download.classList.add("-disabled");
      }
    }
  }
}
