import axios from "axios";
import Common from "../components/common";
import GetNewInterviewIcon from "../components/fetchers/getNewInterviewIcon";
import ScrollAnimation from "../components/ScrollAnimation";
import GetNewSsreportIcon from "../components/fetchers/getNewSsreportIcon";

export default class  BusinessPage {
    constructor() {
        console.log("[page] -  BusinessPage.setup");
        this.init();
    }

    init(): void {
        new Common();
        new ScrollAnimation();
        new GetNewInterviewIcon();
        new GetNewSsreportIcon();
    }
}