var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
import axios from 'axios';

export default class getStockprice {

    private _getConfig: any;
    private _date: string;
    private _time: string[];
    private _last: string;
    private _change: string;
    private _volume: string;
    private _dateElement: HTMLElement;
    private _lastElement: HTMLElement;
    private _changeElement: HTMLElement;
    private _volumeElement: HTMLElement;

    constructor() {
        this.init();
    }

    init(): void {
        this._dateElement = document.querySelector(".js-stockprice-time");
        this._lastElement = document.querySelector(".js-stockprice-last");
        this._changeElement = document.querySelector(".js-stockprice-change");
        this._volumeElement = document.querySelector(".js-stockprice-volume");

        axios("//asia.tools.euroland.com/tools/pricefeed/?companycode=jp-ryu&format=json")
        .then((response) => {
            const data = response.data["Sega Sammy Hld. (TSE)"];
            const datetime = data.Date.split(" ");
            this._date = datetime[0];
            this._time = datetime[1].split(":");
            this._last = Math.floor(data.Last).toLocaleString();
            this._change = Math.floor(data.Change).toLocaleString();
            this._volume = String(Math.floor(data.Volume).toLocaleString());
            this._dateElement.setAttribute("datetime", this._date);
            this._dateElement.insertAdjacentHTML("beforeend", `${this._date.replace(/-/g, "/")} ${this._time[0]}:${this._time[1]}`);
            this._lastElement.insertAdjacentHTML("beforeend", this._last);
            this._changeElement.insertAdjacentHTML("beforeend", this._change);
            this._volumeElement.insertAdjacentHTML("beforeend", this._volume);
        });
    }
}