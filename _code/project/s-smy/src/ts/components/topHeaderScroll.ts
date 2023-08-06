export default class TopHeaderScroll {

    private _headerElem: HTMLElement;
    private _headerTrigger: HTMLElement;

    constructor() {
        console.log("[class] - TopHeaderScroll.setup");
        this._headerElem = document.querySelector(".c-header__navbar");
        this._headerTrigger = document.getElementById("js-header-trigger");
        this.init();
    }

    init(): void {

        let stopFlg = false;
        let startFlg = false;
        let initFlg = false;

        const scrollTriggerFunction = (trigger: HTMLElement) => {

            if (0 > trigger.getBoundingClientRect().top && !stopFlg) {

                stopFlg = true;
                initFlg = true;
                this._headerElem.classList.add("u-background__wht--alpha07");

            } else if (0 < trigger.getBoundingClientRect().top && !startFlg && initFlg) {

                startFlg = false;
                stopFlg = false;
                initFlg = false;
                this._headerElem.classList.remove("u-background__wht--alpha07");
                
            }
        }

        document.addEventListener("scroll", () => scrollTriggerFunction(this._headerTrigger));
    }
}