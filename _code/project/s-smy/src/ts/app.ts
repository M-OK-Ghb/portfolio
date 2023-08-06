import TopPage from "./page/top-page";
import BusinessPage from "./page/business-page";
import MarketPage from "./page/market-page";
import BriefingPage from "./page/briefing-page";
import FallBackScript from "./page/fallBackScript";
import BackgroundAnimation from "./components/backgroundAnimation";
import HeaderNav from "./components/headerNav";
import InterviewArchivePage from "./page/interview-archive-page";
import FitBackground from "./components/fitBackground";
import 'nodelist-foreach-polyfill';
import InterviewsPage from "./page/interviews-page";
import OperatingPage from "./page/operating-page";
import ShareholderReturnPage from "./page/shareholderReturn-page";
import landscapeAlert from "./components/landscapeAlert";
import getStockprice from "./components/fetchers/getStockprice";
import GetNewInterviewIcon from "./components/fetchers/getNewInterviewIcon";
import ObjectFitPolyfill from "./components/object-fit-polyfill";
import SsReportPage from "./page/ssReport-page";
import SsReportArchivePage from "./page/ssReport-archive-page";
import GetNewSsReportIcon from "./components/fetchers/getNewSsReportIcon";
// ss-report-archivePage hash変更時のsmoothscroll 
import 'scroll-behavior-polyfill';

export default class App {

    private _rootElement: HTMLElement;
    private _rootAttr: string;

    public MenuBtnClass: HeaderNav;

    constructor() {
        console.log("\u001b[32m" + "[message] - application init...");
        new BackgroundAnimation();
        new FitBackground();
        new HeaderNav();
        new landscapeAlert();
        new getStockprice();
        new ObjectFitPolyfill();
    }

    public initialize(){
        this.getRootAttr(); // data-page属性を取得
        this.setScript(); // 実行するscriptを決定
        // this.duplicateLinkCanceler(); // 現在のURLと同じURLを踏んだ場合キャンセルする
    }

    private getRootAttr(): void {
        
        // data-page属性を持つ要素を取得
        // 取得できなかった場合は文字型：voidを代入
        if (document.querySelector('[data-page]')) {
            this._rootElement = document.querySelector('[data-page]');
            this._rootAttr = this._rootElement.getAttribute("data-page");
        }
    }

    private setScript() {
        switch (this._rootAttr) {
            case "top":
                new TopPage();
                break;

                case "business":
                    new BusinessPage();
                    break;

                    case "market":
                        new MarketPage();
                        break;

                        case "operating-results":
                            new OperatingPage();
                            break;

                            // case "shareholder-return":
                            //     new ShareholderReturnPage();
                            //     break;
                                
                                case "ss-report":
                                    new SsReportPage();
                                    break;

                                    case "ss-report-archive":
                                        new SsReportArchivePage();
                                        break;

                                        case "interviews":
                                            new InterviewsPage();
                                            break;

                                            case "interview-archive":
                                                new InterviewArchivePage();
                                                break;

                                                case "event":
                                                    new BriefingPage();
                                                    break;
        
            default:
                new FallBackScript();
                break;
        }
    }

    // private duplicateLinkCanceler() {
    // 
    //     const eventDelete = e => {
    //         if (e.currentTarget.href === window.location.href) {
    //           e.preventDefault();
    //           e.stopPropagation();
    //           return
    //         }
    //       };
    //       
    //     const links = document.querySelectorAll('a[href]');
    //     links.forEach(link => {
    //         link.addEventListener('click', (e: MouseEvent) => {
    //           eventDelete(e);
    //         }, false);
    //     });
    // }
}