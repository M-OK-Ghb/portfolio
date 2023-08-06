export default class landscapeAlert {

    private _landscapeAlert: HTMLElement;

    constructor() {
        this.init();
    }

    init(): void {
        this._landscapeAlert = document.querySelector(".js-landscape-alert");

        const checkLandscape = () => {
            if (Math.abs(Number(window.orientation)) === 90 || Math.abs(Number(window.orientation)) === -90) {
                this._landscapeAlert.removeAttribute("hidden");
            } else {
                this._landscapeAlert.setAttribute("hidden", "true");
            }
        }

        window.addEventListener("orientationchange", () => checkLandscape());
        window.addEventListener("load", () => checkLandscape(), {once: true});
    }
}