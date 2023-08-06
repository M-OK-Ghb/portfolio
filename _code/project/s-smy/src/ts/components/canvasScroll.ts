export default class CanvasScroll {

    private _scrollElem: HTMLCollection;

    constructor() {
        console.log(`[init class] - ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {

        this._scrollElem = document.getElementsByClassName("js-scroll-canvas");

        for (let i = 0; i < this._scrollElem.length; i++) {

            const typeAs_Elem: HTMLElement = this._scrollElem[i] as HTMLElement;
            const removeElement: HTMLCollection = typeAs_Elem.getElementsByClassName("scroll-remove");
            let flg = false;

            (<HTMLElement>typeAs_Elem.querySelector(".c-chart__canvas")).onscroll = () => {
                if (!flg) {
                    flg = true;
    
                    for (let i = 0; i < removeElement.length; i++) {
                        removeElement[i].classList.add("is-hide");
                    };
                }
            }
        }
    }
}