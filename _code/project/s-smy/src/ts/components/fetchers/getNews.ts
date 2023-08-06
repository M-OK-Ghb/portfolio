var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
import axios from "axios";
import { getAssetsPath } from "../../config/config"

export default class getNews {

    private _getConfig: any;
    private _text: string;
    private _link: string;
    private _date: string[];
    private _textElement: HTMLElement;
    private _dateElement: HTMLElement;

    constructor() {
        this.init();
    }

    init(): void {
        this._textElement = document.querySelector(".js-news-text");
        this._dateElement = document.querySelector(".js-news-date");

        this._getConfig = {
            url: ~location.pathname.indexOf("en") ? "https://www.segasammy.co.jp/english/xml/ir_sshd.xml" : "https://www.segasammy.co.jp/japanese/xml/ir_sshd.xml",
            // url: ~location.pathname.indexOf("en") ? `${getAssetsPath("english")}xml/ir_sshd.xml` : `${getAssetsPath("japanese")}xml/ir_sshd.xml`,
            responseType: "document",
        };

        axios({
            method: "get",
            url: this._getConfig.url,
            responseType: this._getConfig.responseType
        })
        .then((response) => {
            const data = response.data.querySelector("item");
            this._text = data.querySelector("title").textContent;
            this._link = data.querySelector("link").textContent;
            this._date = new Date(data.querySelector("pubDate").textContent).toLocaleDateString("en-US").split("/");
            this._textElement.setAttribute("href", this._link);
            this._textElement.insertAdjacentHTML("beforeend", this._text);
            this._dateElement.setAttribute("datetime", `${this._date[0]}-${this._date[1]}-${this._date[2]}`);
            this._dateElement.insertAdjacentHTML("beforeend", `${this._date[2]}.${this._date[0]}.${this._date[1]}`);
        });
    }
}