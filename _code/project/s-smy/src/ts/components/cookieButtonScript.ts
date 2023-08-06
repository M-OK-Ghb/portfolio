export default class CookieButtonScript {

    private _el: HTMLElement;
    private _showEl: HTMLElement;
    private _scrollY: number;
    private _flg: boolean;

    constructor() {
        console.log("[class] - CookieButtonScript.setup")
        this._el = document.querySelector(".l-gdpr__toggle")
        this._showEl = document.querySelector(".l-gdpr__overlay")
        this._scrollY = window.pageYOffset
        this._flg = this.getInitFlg()
        this.check()
        this.addEvent()
    }

    getInitFlg() {
        return this._scrollY > 0
    }

    check() {
        if (!this._el) { return }
        if (this._scrollY > 0 && this._flg) {
            this._el.style.left = "0"
            this._flg = false
        } else if (this._scrollY <= 0 && !this._flg) {
            this._el.style.left = "-72px"
            this._flg = true
        }
    }

    event() {
        this._scrollY = window.pageYOffset
        this.check()
    }

    addEvent() {
        window.addEventListener("scroll", this.event.bind(this))
    }
}