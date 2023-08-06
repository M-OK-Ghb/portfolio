import axios from "axios";
import { all } from "promise";
import { createPartiallyEmittedExpression } from "typescript";
import {
    lang,
    getAssetsPath
} from "../../config/config";
import {
    ssreportArticleBody,
    SsreportSchema,
    SsreportDataSchema
} from "../../type/type";
import DOMFactory from "../../utility/abstractClass/domFactory";
import FitBackground from "../fitBackground";
import HashFilter from "../hashFilter";

export default class GetSsreportArticle extends DOMFactory {

    public data: SsreportSchema

    constructor() {
        super();
        console.log(`[class] - ${this.constructor.name}.setup`);
    }

    public async getJson(): Promise<void> {
        // jsonデータを取得
        return axios({
            method: "get",
            url: `${getAssetsPath("json") + "ssreport.json"}`,
            responseType: "json"
        })
        .then((res) => {
            // コールバック関数の引数にレスポンス結果を渡す
            this.data = res.data;
        });
    }

    public getArticle(schema: SsreportSchema): void {
        let _data: SsreportDataSchema
        let archiveInitFlag = true;
        let pageType = document.body.dataset.page;
        // 初回Set index → latest, archiveTop → 前回号data
        if(pageType === 'ss-report') {
            _data = schema.all[0].data.latest.ssreportData;
        } else if (pageType === 'ss-report-archive' && (archiveInitFlag === true)){
            _data = schema.all[1].data.latest.ssreportData;
        }

        // 要素取得
        const container = document.getElementById("js-briefing-article-container");

        // 子要素削除
        container.innerHTML = "";
        let data = lang ? _data.jp.reverse() : _data.en.reverse();

        const createArticle = (loopCount: number): HTMLElement => {

            const articleElem: HTMLElement = document.createElement("article");
            articleElem.classList.add("c-article", "p-ssreport__article");
            articleElem.setAttribute("id", data[loopCount].head.title);

            // タイトル生成
            articleElem.innerHTML += createHead(loopCount);

            // ボディー生成
            articleElem.innerHTML += createBody(loopCount);

            // 生成したarticleをリターン
            return articleElem;
        };

        const createHead = (loopCount: number): string => {

            const headData = data[loopCount].head;

            switch (headData.new) {
                case true:
                    return (
                        `<div class="c-article__title-block--0 article-block">
                                <h3 class="p-ssreport__latest-head">${headData.issue}<span class="c-icon--latest-news">New</span></h3>
                            </div>`
                    );
                case false:
                    return (
                        `<div class="c-article__title-block--0 article-block">
                            <h3 class="p-ssreport__latest-head">${headData.issue}</h3>
                        </div>`
                    );
                default:
                    break;
            }
        };

        const hrCreate: HTMLElement = document.createElement("div");
        hrCreate.classList.add("p-ssreport__latest-border");

        const createBody = (loopCount: number): string => {

            const _data = data[loopCount].body

            let _elem: string = "";

            const getTemplate = (templateData: ssreportArticleBody): string => {

                switch (templateData.type) {
                    case 4:
                    case 5:
                        return (
                            `<div class="c-article__body-block--0${templateData.type} p-ssreport__article-block">
                                                    <figure>
                                                      <img src="${getAssetsPath("images") + templateData.image}" alt="${templateData.alt}" decoding="async">
                                                      <span class="copyright">${templateData.copyright}</span>
                                                    </figure>
                                                    <div class="wrapper-01">
                                                      <h3>${templateData.lead}</h3>
                                                      ${loopParagraph(templateData.excerpt)}
                                                      ${templateData.link && lang ? `<p class="c-article__link"><a href="${templateData.link}" target="_blank"><span class="link">「${templateData.linktext}」の詳細はこちら</span></a></p>` : ""}
                                                      ${templateData.link && !lang ? `<p class="c-article__link"><a href="${templateData.link}" target="_blank"><span class="link">See more details about 「${templateData.linktext}」</span></a></p>` : ""}
                                                    </div>
                                                </div>`
                        );
                    default:
                        break;
                }
            };

            for (const templateData of _data) {
                _elem += getTemplate(templateData)
            };

            return _elem;
        };

        const loopParagraph = (paragraphData: string | string[]): string => {

            if (Array.isArray(paragraphData)) {

                let _str: string = "";

                for (const text of paragraphData) {
                    _str += `<p class="explane">${text}</p>`;
                };

                return _str;

            } else {
                return `<p class="explane">${paragraphData}</p>`;
            };
        }

        const setArticle = (): void => {

            let currentPage: string;

            if (document.querySelector('[data-page]')) {
                currentPage = document.querySelector('[data-page]').getAttribute("data-page");
            };

            switch (currentPage) {

                // 最新の記事一件を表示
                case "ss-report":
                    if (data[0].double) {
                        container.appendChild(createArticle(0));
                        container.appendChild(hrCreate);
                        container.appendChild(createArticle(1));
                    } else {
                        container.appendChild(createArticle(0));
                    };
                    break;

                case "ss-report-archive":
                    if (data[0].double) {
                        container.appendChild(createArticle(0));
                        container.appendChild(hrCreate);
                        container.appendChild(createArticle(1));
                    } else {
                        container.appendChild(createArticle(0));
                    };
                    break;

                default:
                    break;
            }
        };

        const createArchiveList = (): void => {
            const _elem = document.getElementById("js-archive-toggle-button");
            const _elemBottom = document.getElementById("js-archive-toggle-button--bottom");
            _elem.innerHTML = "";
            schema.all.forEach((item, i) => {
                // latestのデータをスキップ
                if( i === 0 ) { return ;}
                _elem.innerHTML += 
                `<li>
                    <a href="${location.href}#${item.query}">
                      <article>
                        <h2>${item.data.article.ceo_text.content.issue[lang ? "jp" : "en"]} ${item.data.article.ceo_text.content.range[lang ? "jp" : "en"]}</h2>
                      </article>
                    </a>
                </li>`;
                _elemBottom.innerHTML +=
                `<li>
                    <a href="${location.href}#${item.query}">
                      <article>
                        <h2>${item.data.article.ceo_text.content.issue[lang ? "jp" : "en"]} ${item.data.article.ceo_text.content.range[lang ? "jp" : "en"]}</h2>
                      </article>
                    </a>
                </li>`
            });
        };

        // 記事を表示
        setArticle();
        if(document.body.dataset.page === "ss-report-archive") {
          // アーカイブボタン内のテキストを追加
          createArchiveList();
          // #hashがついた状態でページに訪れた時の処理 → archiveトップにreload
          let urlHash = Boolean(location.hash);
          if(urlHash) {
            let url = location.href;
            url = url.substring(0,url.indexOf("archive.html")) + 'archive.html';
            window.history.pushState(null, null, url);
            location.reload();
          }
          // #hash値変更 → 再描画
          window.addEventListener('hashchange', ()=> {
            const body = document.body;
            const scrollTarget = document.getElementById('js-scroll-target');
            const scrollTargetPosition = scrollTarget.getBoundingClientRect().top + window.scrollY - 60;
            const bodyFadeInOut = (elm: HTMLElement)=> {
                elm.classList.add('is-archive-change');  
                setTimeout(()=> {
                    elm.classList.remove('is-archive-change');    
                }, 1000);

                setTimeout(()=> {
                    if(isIe()) {
                        window.scrollTo({top:scrollTargetPosition});
                    } else {
                        scrollArchive();
                    }
                }, 300);
            }

            bodyFadeInOut(body);

            // const scrollToTop = (position)=> {
            //   window.scrollTo({top: position, behavior: 'smooth'});
            // }

            // Safari対策用 SmoothScroll
            const scrollArchive = ()=> {
                let startY = window.pageYOffset;
                if(startY < scrollTargetPosition) {
                    window.scrollTo({top: scrollTargetPosition, behavior: 'smooth'});
                } else {
                    const scroll = ()=> {
                        let y = startY - (startY - scrollTargetPosition) / 4 - 0.5;
                        window.scrollTo(scrollTargetPosition, y);
                        if(y < scrollTargetPosition) return;
                        requestAnimationFrame(scrollArchive);
                    }
                    requestAnimationFrame(scroll);
                }
            }
            const isIe = ()=> {
                const ua = navigator.userAgent;
                return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
            }

            const changedUrl = location.href;
            let queryValue = "";

            if(changedUrl.indexOf("#") >= 0) {
              // #hash以降の文字列を取得し代入
              queryValue = changedUrl.substring(changedUrl.indexOf("#")+1, changedUrl.length)
            }
            schema.all.forEach((item, i) => {
              if(item.query === queryValue) {
                archiveInitFlag = false;
                _data = schema.all[i].data.latest.ssreportData;
                container.innerHTML = "";
                data = lang ? _data.jp.reverse() : _data.en.reverse();
                setArticle();
              }
            });
          });
        }
    };
}