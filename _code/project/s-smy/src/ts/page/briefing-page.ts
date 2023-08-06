import axios from "axios";
import GetBriefingArticle from "../components/fetchers/getBriefingArticle";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import BriefingView from "../components/fetchers/mvBanner";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class BriefingPage {
    constructor() {
        console.log("[page] - BriefingPage.setup");
        this.init();
    }

    init(): void {
        new BriefingView();
        new GetBriefingArticle();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    };
};
