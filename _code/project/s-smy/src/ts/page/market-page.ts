import axios from "axios";
import Common from "../components/common";
import ChartFactory from "../components/fetchers/chartFactory";
import CanvasScroll from "../components/canvasScroll";
import ScrollAnimation from "../components/ScrollAnimation";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class MarketPage {
    constructor() {
        console.log("[page] - MarketPage.setup");
        this.init();
    }

    init(): void {
        new Common();
        new ChartFactory("market");
        new CanvasScroll();
        new ScrollAnimation();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    }
}