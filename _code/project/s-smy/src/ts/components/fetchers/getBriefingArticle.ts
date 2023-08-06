import { lang } from "../../config/config";
import { BriefingSchema, DomFactorySchema } from "../../type/type";
import DOMFactory from "../../utility/abstractClass/domFactory";

export default class GetBriefingArticle extends DOMFactory {

    constructor() {
        super();
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.createDOM(this.getArticle, "data.json");
    }

     public getArticle (schema: DomFactorySchema): void {

        // 要素取得
        const container = document.getElementById("js-briefing-article-container");

        // 子要素削除
        container.innerHTML = "";

        if (lang) {

            for (let i = 0; i < schema.BriefingData.article_jp.length; i++) {
    
                const data = schema.BriefingData.article_jp[i];
    
                container.innerHTML +=
                    `<article>
                        <div class="content-bodrer-top u-gradation__background--7"></div>
                        <time>${data.release_date}</time>
                        <h1>${data.title}</h1>
                        <h2>${data.sub_title}</h2>
                        <p>${data.excerpt}</p>
                        ${data.buttonType === "pdf"
                        ?
                        `<a class="c-button c-button__briefing c-button__briefing--pdf" href="${data.link}" download>${data.event_date_year}個人投資家様向け<br class="u-is-sp">説明会資料PDFをダウンロードする</a>`
                        :
                        `<a class="c-button c-button__briefing" href="${data.link}" target="_blank">詳細はこちら<br class="u-is-sp">（外部サイトに移動します）</a>`
                        }
                        
                    </article>`
            };

        } else {
    
            for (let i = 0; i < schema.BriefingData.article_en.length; i++) {
    
                const data = schema.BriefingData.article_en[i];
    
                container.innerHTML +=
                    `<article>
                        <div class="content-bodrer-top u-gradation__background--7"></div>
                        <time>${data.release_date}</time>
                        <h1>${data.title}</h1>
                        <h2>${data.sub_title}</h2>
                        <p>${data.excerpt}</p>
                        ${data.buttonType === "pdf"
                        ?
                        `<a class="c-button c-button__briefing c-button__briefing--pdf" href="${data.link}" download>Download materials of briefing for <br>individual investors held on ${data.event_date_year}</a>`
                        :
                        `<a class="c-button c-button__briefing" href="${data.link}" target="_blank">For more details<br class="u-is-sp"> (Go to external site)</a>`
                        }
                        
                    </article>`
            };
        };
    };
}