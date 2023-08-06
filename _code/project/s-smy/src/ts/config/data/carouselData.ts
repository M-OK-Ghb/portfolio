import { assetsPath, rootPath, lang } from "../../config/config";

interface AnchorLink {
    text: string;
    path: string;
};

export interface CarouselData {
    pageLink: string;
    imagePath: string[];
    title: string;
    copyright: string;
    link: AnchorLink[];
    backgroundColor: [string, string];
    imageClass: string;
    alt: string;
    firstIcon: boolean;
};

export const carouselData: CarouselData[] = [
    {
        pageLink: "#about",
        imagePath: [assetsPath + "01_mv.png"],
        title: lang ? "セガサミーに<br>ついて" : "<span>About<span>SEGA SAMMY</span></span>",
        copyright: "©SEGA",
        link: [
            {
                text: lang ? "セガサミーグループミッション" : "Group Mission",
                path: "#group-mission"
            },
            {
                text: lang ? "ビジョン" : "Vision",
                path: "#vision"
            },
            {
                text: lang ? "ESG/SDGs" : "ESG/SDGs",
                path: "#esg-sdgs"
            },
            {
                text: lang ? "セガサミーのあゆみ" : "History",
                path: "#history"
            }
        ],
        backgroundColor: ["1482CA", "79BD36"],
        imageClass: "c-carousel__jumbotron--1",
        alt: lang ? "ソニック" : "SONIC",
        firstIcon: true
    },
    {
        pageLink: `${rootPath}business/index.html`,
        imagePath: [assetsPath + "02_mv.png"],
        title: lang ? "事業" : "<span>Business<span>of SEGA SAMMY</span></span>",
        copyright: "©Sammy",
        link: [
            {
                text: lang ? "事業概要" : "Business Summary",
                path: `${rootPath}business/index.html#business-summary`
            },
            {
                text: lang ? "セガサミーの強み" : "Strength",
                path: `${rootPath}business/index.html#strength`
            }
        ],
        backgroundColor: ["79BD36", "F4E232"],
        imageClass: "c-carousel__jumbotron--2",
        alt: lang ? "エイリやん" : "ALIYAN",
        firstIcon: false
    },
    {
        pageLink: `${rootPath}market/index.html`,
        imagePath: [assetsPath + "03_mv.png"],
        title: lang ? "市場動向" : "Market<br>Trend",
        copyright: "©SEGA",
        link: [
            {
                text: lang ? "エンタメ市場" : "Entertainment",
                path: `${rootPath}market/index.html#entertainment`
            },
            {
                text: lang ? "遊技場市場" : "Pachislot & Pachinko",
                path: `${rootPath}market/index.html#pachislot`
            }
        ],
        backgroundColor: ["F4E232", "FDAD30"],
        imageClass: "c-carousel__jumbotron--3",
        alt: lang ? "Dr.エッグマン" : "Dr.EGGMAN",
        firstIcon: false
    },
    {
        pageLink: `${rootPath}operating-results/index.html`,
        imagePath: [assetsPath + "04_mv.png"],
        title: lang ? "業績・<br>株主還元" : "Results/<br>Return",
        copyright: "©ATLUS ©SEGA All rights reserved.",
        link: [
            {
                text: lang ? "直近業績" : "Latest Results",
                path: `${rootPath}operating-results/index.html#latest-results`
            },
            {
                text: lang ? "今後の見通し" : "Forecast",
                path: `${rootPath}operating-results/index.html#forecast`
            },
            {
                text: lang ? "株主還元" : "Shareholder Return",
                path: `${rootPath}operating-results/index.html#holderreturn`
            }
        ],
        backgroundColor: ["FDAD30", "CE090F"],
        imageClass: "c-carousel__jumbotron--4",
        alt: lang ? "ペルソナ5" : "Persona 5",
        firstIcon: false
    },
    {
        pageLink: `${rootPath}ss-report/index.html`,
        imagePath: [assetsPath + "05_mv_a.png", assetsPath + "05_mv_b.png"],
        title: lang ? "SS通信" : "SS-<br>Report",
        copyright: "©SEGA ©Sammy",
        link: [
            {
                text: lang ? "CEO業績報告" : "Business Report from the CEO",
                path: `${rootPath}ss-report/index.html#ceo`
            },
            {
                text: lang ? "業績ハイライト" : "Results Highlights",
                path: `${rootPath}ss-report/index.html#highlight`
            },
            {
                text: lang ? "最新トピックス" : "Latest Topics",
                path: `${rootPath}ss-report/index.html#latest-topics`
            }
        ],
        backgroundColor: ["CE090F", "BF36A0"],
        imageClass: "c-carousel__jumbotron--5",
        alt: lang ? "PARADISE CITY" : "PARADISE CITY",
        firstIcon: false
    },
    {
        pageLink: `${rootPath}interviews/index.html`,
        imagePath: [assetsPath + "06_mv.png"],
        title: lang ? "感動体験<br>レポート" : "<span><span>“Experiences that <br>move the heart”</span>Interviews</span>",
        copyright: "©SEGA",
        link: [],
        backgroundColor: ["BF36A0", "0082CA"],
        imageClass: "c-carousel__jumbotron--6",
        alt: lang ? "アルル" : "Arle",
        firstIcon: false
    }
];