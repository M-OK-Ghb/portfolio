export default class ArchiveToggleButtonSs {
  private _triggerElem: HTMLElement;
  private _targetElem: HTMLElement;
  private _triggerElemBottom: HTMLElement;
  private _targetElemBottom: HTMLElement;
  private _flg: boolean;
  private _onceFlg: boolean;

  constructor() {
      console.log(`[class] - ${this.constructor.name}.setup`);
      this.init();
  }

  init(): void {

      // dom取得
      this._triggerElem = document.getElementById("js-archive-toggle-trigger");
      this._targetElem = document.getElementById("js-archive-toggle-target");
      this._triggerElemBottom = document.getElementById("js-archive-toggle-trigger--bottom");
      this._targetElemBottom = document.getElementById("js-archive-toggle-target--bottom");
      const triggerImg = this._triggerElem.querySelector("img");
      const triggerImgBottom = this._triggerElemBottom.querySelector("img");

      // フラグ初期化
      this._flg = false;
      this._onceFlg = false;

      // イベントリスナ関数定義
      const clickableFunction = (): void => {
          if (!this._flg) {
              triggerImg.style.transform = "rotate(45deg)";
              triggerImgBottom.style.transform = "rotate(45deg)";
              this._targetElem.classList.remove("toggle-fade-out");
              this._targetElem.classList.add("toggle-fade-in");
              this._targetElemBottom.classList.remove("toggle-fade-out");
              this._targetElemBottom.classList.add("toggle-fade-in");
              this._flg = true;
          } else {
              triggerImg.style.transform = "rotate(0deg)";
              triggerImgBottom.style.transform = "rotate(0deg)";
              this._targetElem.classList.remove("toggle-fade-in");
              this._targetElem.classList.add("toggle-fade-out");
              this._targetElemBottom.classList.remove("toggle-fade-in");
              this._targetElemBottom.classList.add("toggle-fade-out");
              this._flg = false;
          };

          // 一度きり実行
          if (!this._onceFlg) {
              this._targetElem.classList.remove("is-hide");
              this._targetElemBottom.classList.remove("is-hide");
              this._onceFlg = true;
          };
      };

      // イベントリスナ設定
      this._triggerElem.addEventListener("click", clickableFunction);
      this._triggerElemBottom.addEventListener("click", clickableFunction);
      window.addEventListener('hashchange', clickableFunction);
  }
}