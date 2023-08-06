const platform: NodeRequire = require("platform");

export default class HeaderNav {

    private _headerTrigger: HTMLElement;
    private _currenrPos: boolean;
    private _dataPage: string;
    private _controleFlg: boolean;

    public flg: boolean;
    public navBar: HTMLElement;
    public navBody: HTMLElement;
    public navBG: HTMLElement;
    public navList: HTMLElement;

    constructor() {
        console.log("[class] - HeaderNav.setup");
        this.init();
    };

    private init(): void {

        // 要素取得
        this._dataPage = document.querySelector("[data-page]").getAttribute("data-page");
        const menuBtnElem: HTMLElement = document.getElementById("js-menu-btn")!;
        this.navBar = document.getElementById("js-nav-bar")!;
        this.navBody = document.getElementById("js-nav-body")!;
        this.navBG = document.getElementById("js-nav-bg")!;
        this.navList = document.querySelector(".c-header__navbar--list");

        if (this._dataPage === "top") {

            this._headerTrigger = document.getElementById("js-header-trigger");
            this._currenrPos = 0 > this._headerTrigger.getBoundingClientRect().top;

            // スタイル変更
            this.navBar.style.backgroundColor = "rgba(255,255,255,0.0)";
            this.navBar.style.boxShadow = "none";
            this.navList.style.visibility = "hidden";

            let stopFlg = false;
            let startFlg = false;
            let initFlg = false;
    
            // リスナー関数定義
            const scrollTriggerFunction = (trigger: HTMLElement) => {
    
                if (0 > trigger.getBoundingClientRect().top - 110 && !stopFlg) {
    
                    stopFlg = true;
                    initFlg = true;
                    this.navBar.style.backgroundColor = "#fff";
                    this.navBar.style.boxShadow = "0px 10px 30px #0000000A";
                    this.navList.style.visibility = "visible";
                    this._currenrPos = true;
    
                } else if (0 <= trigger.getBoundingClientRect().top - 110 && !startFlg && initFlg) {
    
                    startFlg = false;
                    stopFlg = false;
                    initFlg = false;
                    this.navBar.style.backgroundColor = "rgba(255,255,255,0.0)";
                    this.navBar.style.boxShadow = "none";
                    this.navList.style.visibility = "hidden";
                    this._currenrPos = false;
    
                };
            };

            document.addEventListener("scroll", () => scrollTriggerFunction(this._headerTrigger));
        } else {
            this.navBar.style.backgroundColor = "#fff";
            this.navBar.style.boxShadow = "0px 10px 30px #0000000A";
        };

        // リスナー関数定義
        const toggleMenu = (): void => {
            if (!this.flg && !this._controleFlg) {

                this.open();
                
                if (this._dataPage === "top") {
                    // bar
                    this.navBar.style.backgroundColor = "#fff";
                };
                
                // header
                document.querySelector("header").style.height = "100%";
                document.querySelector("header").style.overflowY = "scroll";

                // btn
                if (!(platform.name == 'Chrome') &&
                !(platform.name == 'Safari') &&
                !(platform.name == 'Firefox') &&
                !(platform.name == 'Opera') &&
                !(platform.name == 'Microsoft Edge')) {
                    menuBtnElem.classList.add("active-ie");
                } else {
                    menuBtnElem.classList.add("active");
                };

                // bg
                this.navBG.classList.remove("fade-out_std");
                this.navBG.classList.add("fade-in_std");
                this.navBG.style.display = "block";

                // body
                this.navBody.classList.remove("fade-out");
                this.navBody.classList.add("fade-in");
                this.navBody.style.display = "flex";

                // list
                this.navList.style.visibility = "visible";

                // メインコンテンツ固定
                document.body.style.overflowY = "hidden";

                // 400ms経たないとクリックできない
                setTimeout(() => {
                    this._controleFlg = false;
                }, 400);

            } else if (!this._controleFlg) {

                this.close();
                
                if (this._dataPage === "top") {
                    // bar 
                    if (!this._currenrPos) {
                        this.navBar.style.backgroundColor = "rgba(255,255,255,0.0)";
                    } else {
                        this.navBar.style.backgroundColor = "#fff";
                    };
                };

                // pcサイズの場合のみ
                if (innerWidth > 640) {
                    // header
                    document.querySelector("header").style.height = "9.375vw";
                };
                
                // header
                document.querySelector("header").style.overflowY = "auto";

                // btn
                if (!(platform.name == 'Chrome') &&
                !(platform.name == 'Safari') &&
                !(platform.name == 'Firefox') &&
                !(platform.name == 'Opera') &&
                !(platform.name == 'Microsoft Edge')) {
                    menuBtnElem.classList.remove("active-ie");
                } else {
                    menuBtnElem.classList.remove("active");
                };

                // bg
                this.navBG.classList.remove("fade-in_std");
                this.navBG.classList.add("fade-out_std");
                setTimeout(() => {
                    this.navBG.style.display = "none";
                    this._controleFlg = false;
                }, 400);

                // body
                this.navBody.classList.remove("fade-in");
                this.navBody.classList.add("fade-out");
                setTimeout(() => {this.navBody.style.display = "none"}, 400);
                
                // list
                if (this._headerTrigger) {
                    if (0 > this._headerTrigger.getBoundingClientRect().top) {
                        this.navList.style.visibility = "visible";
                    } else {
                        this.navList.style.visibility = "hidden";
                    };
                };

                // メインコンテンツ固定解除
                document.body.style.overflowY = "auto";
            };
        };

        // イベントリスナ設定
        menuBtnElem.addEventListener("click", toggleMenu);
    };

    public open (): void {
        this.flg = true;
        this._controleFlg = true;
    };

    public close (): void {
        this.flg = false;
        this._controleFlg = true;
    };
};