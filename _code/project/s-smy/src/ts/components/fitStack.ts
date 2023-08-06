export default class FitStack {

    private _stackList: HTMLElement;
    private _space: number;
    private _margin: number;
    private _preserveSpace: number;

    constructor() {
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {
        this._stackList = document.getElementById("js-fit-stack-list");
        this._preserveSpace = 0;
        this._margin = 0;
        const foo: HTMLCollection = this._stackList.getElementsByClassName("js-fit-stack-list-item");

        for (let index = 0; index < foo.length; index++) {
            const elem: HTMLElement = foo[index] as HTMLElement;

            let totalHeight: number = 0;

            for (let _i = 0; _i < elem.children.length; _i++) {
                totalHeight += elem.children[_i].clientHeight;
                if (elem.children.length > 3) {
                    this._space = 30 * (elem.children.length - 2);
                }
            }

            console.log(totalHeight)

            elem.style.height = `${totalHeight + this._space}px`;

            const NormalizationCount = index + 1;

            if (NormalizationCount >= 3 && NormalizationCount % 2 !== 0) {
                const typeAs_element: HTMLElement = foo[index] as HTMLElement;
                typeAs_element.style.top = `${-(Math.abs(foo[index - 1].clientHeight - foo[index - 2].clientHeight) + this._preserveSpace)}px`;
                this._preserveSpace = Math.abs(foo[index - 1].clientHeight - foo[index - 2].clientHeight)
            }
        }
    }
}