import ArchiveToggleButton from "../components/archiveToggleButton";
import Common from "../components/common";
import GetInterviewArticle from "../components/fetchers/getInterviewArticle";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class InterviewArchivePage {
    constructor() {
        console.log(`[page] - ${this.constructor.name}.setup`);
        this.init();
    }

    init(): void {
        new Common();
        new ArchiveToggleButton();
        new GetInterviewArticle();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    }
}