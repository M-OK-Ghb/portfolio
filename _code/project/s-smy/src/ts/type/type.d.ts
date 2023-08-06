// level 1 type

export interface HistoryItem {
    title: string;
    explanation: string;
    image: string;
    copyright: string;
}

export interface HistoryBlock {
    year: string;
    items: HistoryItem[]
}

export interface BusinessCountData {
    sonic_series: number,
    hokuto: number,
    juo: number,
    ryuga_gotoku: number
}

interface BriefingArticle {
    release_date: string;
    event_date_year: string;
    title: string;
    sub_title: string;
    excerpt: string;
    buttonType: "pdf" | "link",
    buttonText: string;
    link: string;
}

interface entertainment_slot {
    jp_name: string,
    en_name: string,
    value: number
}

interface Y_axes {
    max: number;
    min?: number;
    stepSize: number;
}

interface chartMaterialData {
    [key: string]: {
        labels: {
            jp: string;
            en: string;
        },
        slots: entertainment_slot[];
    };
}

interface interviewArticleHead {
    type: number;
    category: string;
    update: string;
    title: string;
    excerpt: string;
    image?: string;
    alt?: string;
    caption?: string;
    copyright?: string;
}

interface interviewArticleBody {
    type: number;
    lead: string;
    excerpt: string;
    image: string;
    alt: string;
    caption: {
        role: string;
        name: string;
    };
    copyright?: string;
}

interface interviewArticleLink {
    view: boolean;
    text: string;
    link: string;
}

interface interviewArticle {
    head: interviewArticleHead;
    body: interviewArticleBody[];
    link: interviewArticleLink;
    double?: boolean;
}

interface ssreportArticleHead {
    type: number;
    category: string;
    update: string;
    title: string;
    excerpt: string;
    image?: string;
    alt?: string;
    caption?: string;
    copyright?: string;
    issue: string;
    new: boolean;
}

interface ssreportArticleBody {
    type: number;
    lead: string;
    excerpt: string;
    image: string;
    alt: string;
    caption: {
        role: string;
        name: string;
    };
    copyright?: string;
    link: string;
    linktext: string;
}

interface ssreportArticleLink {
    view: boolean;
    text: string;
    link: string;
}



interface ssreportArticle {
    head: ssreportArticleHead;
    body: ssreportArticleBody[];
    link: ssreportArticleLink;
    double?: boolean;
}

// level 2 type

interface HistorySchema {
    materials: HistoryBlock[];
}

interface BusinessCountSchema {
    jp: BusinessCountData;
    en: BusinessCountData;
}

interface InterviewDataSchema {
    jp: interviewArticle[];
    en: interviewArticle[];
    new: boolean;
}

interface SsreportDataSchema {
    jp: ssreportArticle[];
    en: ssreportArticle[];
    new: boolean;
    new_topics: boolean;
}

interface BriefingSchema {
    view: boolean;
    date_jp: string;
    date_en: string;
    datetime: string;
    article_jp: BriefingArticle[];
    article_en: BriefingArticle[];
}

interface ChartData {
    data: chartMaterialData;
    yAxes: Y_axes;
    yAxes2?: Y_axes;
}

// level 3 type

interface DomFactorySchema {
    segasammy_history: HistorySchema;
    business_countdata: BusinessCountSchema;
    BriefingData: BriefingSchema;
}

interface InterviewSchema {
    interviewData: InterviewDataSchema;
}

interface allSchema {
    query: string;
    data: {
        article: {
            ceo_text: any;
        },
        table: {
            results_highlights: any;
            segment_results: any;
        },
        latest: {
            ssreportData: SsreportDataSchema;
        }
    }
}

interface SsreportSchema {
    all: allSchema[];
}

export interface ChartSchema {
    entertainment: ChartData;
    pachislot_and_pachinko: ChartData;
    latest_results: ChartData;
    forecast: ChartData;
}