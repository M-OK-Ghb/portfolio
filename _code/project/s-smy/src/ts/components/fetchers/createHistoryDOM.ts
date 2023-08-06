import { DomFactorySchema, HistoryBlock, HistoryItem } from "../../type/type";
import DOMFactory from "../../utility/abstractClass/domFactory";
import ScrollAnimation from "../ScrollAnimation";
import { getAssetsPath } from "../../config/config";

export default class CreateHistoryDOM extends DOMFactory {

    constructor() {
        super();
        this.createDOM(this.set, "data.json");
    };

    private set (data: DomFactorySchema): void {

        // domを挿入するentryPoint取得
        const entryPoint: HTMLElement = document.getElementById("js-create-dom-entrypoint_01")!;
        let direction: boolean = entryPoint.childElementCount % 2 === 0;

        // dom生成
        for (let i = 0; i < data.segasammy_history.materials.length; i++) {

            // 記述しやすいよう変数に格納
            const m: HistoryBlock = data.segasammy_history.materials[i];

            // 要素作成
            const li: HTMLElement = document.createElement("li");
            const span: HTMLElement = document.createElement("span");

            // クラス追加
            if (direction) {
                li.classList.add("c-integration__list--after--item", "js-fit-stack-list-item", "js-scroll-box__top--after-int-right");
                direction = false;
            } else {
                li.classList.add("c-integration__list--after--item--even", "js-fit-stack-list-item", "js-scroll-box__top--after-int-left");
                direction = true;
            };

            span.classList.add("year");

            // テキスト追加
            span.innerText = m.year;
            li.appendChild(span);

            // 子要素以下追加
            for (let i = 0; i < m.items.length; i++) {

                const _m: HistoryItem = m.items[i];

                const figure: HTMLElement = document.createElement("figure");
                const img: HTMLElement = document.createElement("img");
                const figcaption: HTMLElement = document.createElement("figcaption");
                const dl: HTMLElement = document.createElement("dl");
                const dt: HTMLElement = document.createElement("dt");
                const dd: HTMLElement = document.createElement("dd");
                const span2: HTMLElement = document.createElement("span");

                img.setAttribute("src", getAssetsPath("images") + _m.image);
                img.setAttribute("alt", _m.title);
                dt.innerHTML = _m.title;
                dd.innerHTML = _m.explanation;
                span2.classList.add("copy-right");
                span2.innerHTML = _m.copyright;
                dd.appendChild(span2);
                dl.appendChild(dt);
                dl.appendChild(dd);
                figcaption.appendChild(dl);
                figure.appendChild(img);
                figure.appendChild(figcaption);
                li.appendChild(figure);
            }

            // domをentryPointに追加
            entryPoint.appendChild(li);
        };

        new ScrollAnimation();
    };
};
