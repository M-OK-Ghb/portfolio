import BackgroundAnimation from "../components/backgroundAnimation";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class FallBackScript {
    constructor() {
        console.log("[fallBack] - FallBackScript.setup");
        this.init();
    }

    init(): void {
        new BackgroundAnimation();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    }
}