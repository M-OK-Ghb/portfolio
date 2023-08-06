import Common from "../components/common";
import GetSsreportArticle from "../components/fetchers/getSsreportArticle";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import ScrollAnimation from "../components/ScrollAnimation";
import SetSsValues from "../components/fetchers/setSsValues";
import BriefingView from "../components/fetchers/mvBanner";
import Platform from "../components/platform";
import ResizeSVGs from "../components/resizeSVGs";
import { AwaitHashFilter } from "../components/fetchers/awaitHashFilter";
import HashFilter from "../components/hashFilter";
import ArchiveToggleButtonSs from "../components/archiveToggleButtonSs";

export default class SsReportArchivePage {
    constructor() {
        console.log(`[page] -  ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {
        new ResizeSVGs(document.getElementById("js-carousel-dusts").querySelectorAll("svg"));
        new Platform();
        new BriefingView();
        // new GetSsreportArticle();
        new GetNewSsreportIcon();
        new GetNewInterviewIcon();
        new ScrollAnimation();
        // new SetSsValues();
        // new HashFilter()

        new AwaitHashFilter();
        new ArchiveToggleButtonSs();
    }
}