export default class FitBackground {

    private _bgElem: HTMLElement;
    private _fitContentElem: HTMLElement;

    constructor() {
        console.log(`[init class] - ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {

        // dom取得
        this._bgElem = document.getElementById("js-bg-elem");
        this._fitContentElem = document.getElementById("js-fit-content");

        // width & height代入
        this._bgElem.style.width = `${this._fitContentElem.clientWidth}px`;
        this._bgElem.style.height = `${this._fitContentElem.clientHeight}px`;

        window.addEventListener("resize", () => {
            this._bgElem.style.width = `${this._fitContentElem.clientWidth}px`;
            this._bgElem.style.height = `${this._fitContentElem.clientHeight}px`;
        });
    }
}