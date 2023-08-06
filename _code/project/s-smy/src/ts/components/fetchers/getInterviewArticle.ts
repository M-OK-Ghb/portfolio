import { lang, getAssetsPath } from "../../config/config";
import { interviewArticleBody, InterviewSchema } from "../../type/type";
import DOMFactory from "../../utility/abstractClass/domFactory";
import FitBackground from "../fitBackground";

export default class GetInterviewArticle extends DOMFactory {

    constructor() {
        super();
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.createDOM(this.getArticle, "interview.json");
    }

    public getArticle (schema: InterviewSchema): void {

        // 要素取得
        const container = document.getElementById("js-briefing-article-container");

        // 子要素削除
        container.innerHTML = "";

        const data = lang ? schema.interviewData.jp.reverse() : schema.interviewData.en.reverse();

        const createArticle = (loopCount: number): HTMLElement => {

            const articleElem: HTMLElement = document.createElement("article");
            articleElem.classList.add("c-article");
            articleElem.setAttribute("id", data[loopCount].head.title);

            // タイトルブロック生成
            articleElem.innerHTML += createHead(loopCount);

            // テンプレートブロック生成
            articleElem.innerHTML += createBody(loopCount);

            // リンク生成
            articleElem.innerHTML += createLink(loopCount);

            // 生成したarticleをリターン
            return articleElem;
        };

        const createHead = (loopCount: number): string => {

            const headData = data[loopCount].head;

            switch (headData.type) {
                case 1:
                    return (
                        `<div class="c-article__title-block--0${headData.type} article-block">
                            <div class="wrapper-01"><span class="tag">${headData.category}</span>
                              <time datetime="${headData.update.replace(/\./g, "-")}">${headData.update}</time>
                            </div>
                            <h2>${headData.title}</h2>
                            ${loopParagraph(headData.excerpt)}
                        </div>`
                        );

                    case 2:
                    case 3:
                    case 4:
                        return (
                            `<div class="c-article__title-block--0${headData.type} article-block">
                                <div class="wrapper-01">
                                  <div class="wrapper-02"><span class="tag">${headData.category}</span>
                                    <time datetime="${headData.update.replace(/\./g, "-")}">${headData.update}</time>
                                  </div>
                                  <h2>${headData.title}</h2>
                                  ${loopParagraph(headData.excerpt)}
                                </div>
                                <div class="img-wrapper">
                                    <img src="${getAssetsPath("images") + headData.image}" alt="${headData.alt}">
                                    ${headData.copyright ? `<span class="copyright">${headData.copyright}</span>` : ""}
                                </div>
                            </div>`
                            );
            
                default:
                    break;
            }
        };

        const createBody = (loopCount: number): string => {

            const _data = data[loopCount].body

            let _elem: string = "";

            const getTemplate = (templateData: interviewArticleBody): string => {
                
                switch (templateData.type) {
                    case 1:
                        return (
                            `<div class="c-article__body-block--0${templateData.type} article-block">
                            ${loopParagraph(templateData.excerpt)}
                            </div>`
                            );

                            case 2:
                                return (
                                    `<div class="c-article__body-block--0${templateData.type} article-block">
                                        <h2>${templateData.lead}</h2>
                                        ${loopParagraph(templateData.excerpt)}
                                    </div>`
                                    );

                                    case 3:
                                        return (
                                            `<div class="c-article__body-block--0${templateData.type} article-block">
                                                <img src="${getAssetsPath("images") + templateData.image}" alt="${templateData.alt}">
                                                ${templateData.copyright ? `<span class="copyright">${templateData.copyright}</span>` : ""}
                                            </div>`
                                            );

                                        case 4:
                                        case 5:
                                            return (
                                                `<div class="c-article__body-block--0${templateData.type} article-block">
                                                    <figure>
                                                      <img src="${getAssetsPath("images") + templateData.image}" alt="${templateData.alt}">
                                                      ${templateData.copyright ? `<span class="copyright">${templateData.copyright}</span>` : ""}
                                                      ${
                                                          templateData.caption.name ? templateData.caption.role ?
                                                          `
                                                          <figcaption>
                                                            <dl>
                                                              <dt>${templateData.caption.name}</dt>
                                                              <dd>${templateData.caption.role}</dd>
                                                            </dl>
                                                          </figcaption>
                                                          ` : `
                                                          <figcaption>
                                                              <p class="fig_name">${templateData.caption.name}</p>
                                                          </figcaption>
                                                          ` : templateData.caption.role ? `
                                                          <figcaption>
                                                              <p class="fig_role">${templateData.caption.role}</p>
                                                          </figcaption>
                                                          ` : ``
                                                      }
                                                    </figure>
                                                    <div class="wrapper-01">
                                                      <h2>${templateData.lead}</h2>
                                                      ${loopParagraph(templateData.excerpt)}
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

        const createLink = (loopCount: number): string => {

            const _data = data[loopCount].link;

            if (_data.view) {
                return (`<p class="c-article__link">
                    <a href="${_data.link}" target="_blank">
                    ${_data.text}
                    </a>
                </p>`);
            } else {
                return "";
            }
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
                case "interviews":
                    if (data[0].double) {
                        container.appendChild(createArticle(0));
                        container.appendChild(createArticle(1));
                    } else {
                        container.appendChild(createArticle(0));
                    };
                    break;

                    // 最新の一件を除く、全ての記事を表示
                    case "interview-archive":
                    if (data[0].double) {
                        let loopCount: number = 2;
                        for (let i = 0; i < data.length - 2; i++) {
                            container.appendChild(createArticle(loopCount));
                            loopCount++;
                        };
                    } else {
                        let loopCount: number = 1;
                        for (let i = 0; i < data.length - 1; i++) {
                            container.appendChild(createArticle(loopCount));
                            loopCount++;
                        };
                    }

                        // アーカイブリスト生成
                        createList();

                        new FitBackground();
                        break;
            
                default:
                    break;
            }
        };

        const createList = (): void => {

            // 初期化
            const _elem = document.getElementById("js-archive-toggle-button");
            _elem.innerHTML = "";

            if (data[0].double) {

                let loopCount: number = 2;
    
                for (let i = 0; i < data.length - 2; i++) {
                    _elem.innerHTML +=
                    `<li>
                        <a href="${location.href}#${data[loopCount].head.title}">
                            <article>
                                <time datetime="${data[loopCount].head.update.replace(/\./g, "-")}">${data[loopCount].head.update}</time>
                                <h2>${data[loopCount].head.title}</h2>
                            </article>
                        </a>
                    </li>`;
                    loopCount++;
                };
            } else {

                let loopCount: number = 1;
    
                for (let i = 0; i < data.length - 1; i++) {
                    _elem.innerHTML +=
                    `<li>
                        <a href="${location.href}#${data[loopCount].head.title}">
                            <article>
                                <time datetime="${data[loopCount].head.update.replace(/\./g, "-")}">${data[loopCount].head.update}</time>
                                <h2>${data[loopCount].head.title}</h2>
                            </article>
                        </a>
                    </li>`;
                    loopCount++;
                };
            };
        };

        // 記事を表示
        setArticle();
    };
}