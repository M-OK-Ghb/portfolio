import SmoothScroll from "./smoothScroll";

export default class HashFilter {

    private _hashValue: string;
    private _smoothScrollClass: SmoothScroll;

    constructor() {
        console.log(`[init class] - ${this.constructor.name}.setup`);
        // smoothscroll.polyfill();
        this._smoothScrollClass = new SmoothScroll();
        this.init();
    };

    init(): void {

        // hash値を取得
        this._hashValue = location.search.replace("?", "");

        // url書き換え
        const sliceUrl: string = location.href.split("?")[0];
        history.replaceState(null, null, sliceUrl + location.search.replace("?", "#"));

        // hash値が存在しなければ処理終了
        if (location.hash) {
            this._hashValue = location.hash.replace("#", "")
        } else {
            if (!this._hashValue) { return; };
        }
        this._smoothScrollClass.scrollWindow("#" + this._hashValue,{ offset: -100, duration: 500 })
    };
};