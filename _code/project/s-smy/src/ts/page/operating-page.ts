import CanvasScroll from "../components/canvasScroll";
import ChartFactory from "../components/fetchers/chartFactory";
import Common from "../components/common";
import ResizeSVGs from "../components/resizeSVGs";
import ScrollAnimation from "../components/ScrollAnimation";
import SetTableValues from "../components/fetchers/setTableValues";
import SetTableValue from "../components/fetchers/setTableValues"
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class  OperatingPage {
    constructor() {
        console.log(`[page] -  ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {
        new Common();
        new ChartFactory("operating");
        new CanvasScroll();
        new ResizeSVGs(document.querySelectorAll(".js-table-svgs"));
        new ScrollAnimation();
        SetTableValues.set();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    }
}