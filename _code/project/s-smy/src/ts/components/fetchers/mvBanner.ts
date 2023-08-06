import axios from "axios";
import { getAssetsPath, lang } from "../../config/config";

interface BriefingData  {
    view: boolean;
    date_jp: string;
    date_en: string;
    datetime: string;
}

export default class BriefingView {

    private _briefingData: BriefingData;
    private _briefingBanner_mv: HTMLElement;
    private _briefingBanner_menu: HTMLCollection;
    private _rootElement: HTMLElement;
    private _rootAttr: string;

    constructor() {
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.init();
    };

    private init(): void {

        this.getRoot();

        // jsonデータを取得
        axios({
            method: "get",
            url: `${getAssetsPath("json")}data.json`,
            responseType: "json"
        })
        .then((res) => {
            // 取得したcreateIDに応じて処理を分岐
            this._briefingData = res.data["BriefingData"];
            this.setData();
        });
    };

    private getRoot (): void {

        if (document.querySelector('[data-page]')) {
            this._rootElement = document.querySelector('[data-page]');
            this._rootAttr = this._rootElement.getAttribute("data-page");
        };

        if (this._rootAttr === "top") {
            this._briefingBanner_mv = document.getElementById("js-briefing-banner-mv");
        };

        this._briefingBanner_menu = document.getElementsByClassName("js-briefing-banner-menu");
    };

    private setData (): void {

        if (this._rootAttr === "top") {
            if (this._briefingData.view) {
                this._briefingBanner_mv.style.display = "block";
            }

            const time = this._briefingBanner_mv.querySelector("time");
            time.setAttribute("datetime", this._briefingData.datetime);
            time.innerText = lang ? this._briefingData.date_jp : this._briefingData.date_en;
        };

        if (this._briefingData.view) {
            for (let i = 0; i < this._briefingBanner_menu.length; i++) {
                const elem: HTMLElement = this._briefingBanner_menu[i] as HTMLElement;
                elem.style.display = "flex";
            }
        }
    };
}