import Common from "../components/common";
import Loader from "../components/loader";
import SmoothScroll from "../components/smoothScroll";
import getNews from "../components/fetchers/getNews";
import fitJumbotron from "../components/fitJumbotron";
import CreateHistoryDOM from "../components/fetchers/createHistoryDOM";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import CookieButtonScript from "../components/cookieButtonScript";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class TopPage {

    private _loaderClass: Loader;
    private _smoothScrollClass: SmoothScroll;
    private _getNewsClass: getNews;
    private _fitJumbotron: fitJumbotron;
    private _cookieButtonScriptClass: CookieButtonScript;

    constructor() {
        console.log("[page] - TopPage.setup");
        this._loaderClass = new Loader();
        this._smoothScrollClass = new SmoothScroll();
        this._getNewsClass = new getNews();
        this._fitJumbotron = new fitJumbotron();
        this._cookieButtonScriptClass = new CookieButtonScript();
        new CreateHistoryDOM();
        this.init();
    }

    init(): void {
      // アクセス以降1日はloading出さない
      const time:Date = new Date();
      const timestamp:number = time.getTime();
      const _hash: string = location.hash.replace("#", "");
      const _body:HTMLBodyElement = document.getElementsByTagName("body")[0];
      if(timestamp-Number(localStorage.getItem("timestamp")) >= 1000*60*60*24){
        this._loaderClass.startLoader();
        _body.setAttribute("style", "");
        new Common();
        this._loaderClass.killLoader();
      } else {
        _body.setAttribute("style", "");
        this._loaderClass.killLoader();
        if (_hash === "about") {
          this._smoothScrollClass.scrollWindow("#" + _hash,{ offset: -100, duration: 500 });
        }
        new Common();
      }
      localStorage.setItem("timestamp", String(timestamp));
    };
};