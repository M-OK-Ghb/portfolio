import HashFilter from "./hashFilter";
import Platform from "./platform";
import ResizeSVGs from "./resizeSVGs";
import BriefingView from "./fetchers/mvBanner";

export default class Common {
    constructor() {
        console.log("[class] - Common.setup");
        this.init();
    }

    init(): void {
        new HashFilter();
        new ResizeSVGs(document.getElementById("js-carousel-dusts").querySelectorAll("svg"));
        new Platform();
        new BriefingView();
    }
}