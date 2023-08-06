const platform: NodeRequire = require("platform");

export default class Platform {

    private _wrapElem: HTMLElement;

    constructor() {
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {

        // body要素取得
        this._wrapElem = document.getElementById("js-app-wrapper");

        // safariの場合、スタイル付与
        if (platform.name === "Safari" || platform.name === "safari" || platform.name === "SAFARI") {
            this._wrapElem.style.overflowX = "hidden";
        };

        if (!(platform.name == 'Chrome') &&
             !(platform.name == 'Safari') &&
             !(platform.name == 'Firefox') &&
             !(platform.name == 'Opera') &&
             !(platform.name == 'Microsoft Edge')) {
                 document.querySelector(".c-content__stack1--mail").classList.add("ie_regist");
                 document.querySelector(".c-content__stack1--questionnaire").classList.add("ie_regist");

                 for (let i = 0; i < document.querySelector(".c-nav").querySelectorAll("a").length; i++) {
                     document.querySelector(".c-nav").querySelectorAll("a").forEach((elem) => {
                         elem.classList.add("u-nav-pseudo_ie_regist")
                     })
                 }
             }
    }
}