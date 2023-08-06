import Common from "../components/common";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class ShareholderReturnPage {
    constructor() {
        console.log(`[page] -  ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {
        new Common();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    }
}