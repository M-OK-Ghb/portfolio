import { getAssetsPath } from "../../config/config";
import { SsreportSchema } from "../../type/type";
import DOMFactory from "../../utility/abstractClass/domFactory";

export default class GetNewSsreportIcon extends DOMFactory {

    constructor() {
        super();
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.createDOM(this.getState, "ssreport.json");
    }

    public getState (data: SsreportSchema): void {

        // 最新記事がない場合、処理終了
        if (!data.all[0].data.latest.ssreportData.new) { return; };

        if (document.querySelector('[data-page]')) {

            if (document.querySelector('[data-page]').getAttribute("data-page") === "top") {

                const icon_pc = document.createElement("img");
                icon_pc.src = `${getAssetsPath("images")}new_pc_ss.svg`;
                icon_pc.classList.add("c-newicon","u-is-pc");
        
                const elem_pc = document.getElementById("js-new-icon-pc-ss");
                elem_pc.appendChild(icon_pc);
                
                const elem_sp = document.getElementsByClassName("js-new-icon-sp");
                
                for (let i = 0; i < elem_sp.length; i++) {        
                    const icon_sp = document.createElement("img");
                    icon_sp.src = `${getAssetsPath("images")}new_sp_ss.svg`;
                    icon_sp.classList.add("c-newicon--ss", "u-is-sp", "is-hide");
        
                    elem_sp[i].appendChild(icon_sp);
                };
            }
        }

        const elem_header = document.querySelector(".c-header__navbar--list");
        const elem_nav = document.querySelector(".top-border-bg-5").querySelector("a");

        const icon_header = document.createElement("span");
        icon_header.classList.add("c-newicon--header", "p-ssreport__icon");
        icon_header.innerText = "NEW";

        const icon_nav = document.createElement("span");
        icon_nav.classList.add("c-newicon--nav", "p-ssreport__icon");
        icon_nav.innerText = "NEW";

        elem_header.children[elem_header.children.length - 2].appendChild(icon_header);
        elem_nav.appendChild(icon_nav);

        // 最新トピックス Newアイコン
        if (data.all[0].data.latest.ssreportData.new_topics) {
            const icon_nav_latest = document.createElement("span");
            icon_nav_latest.classList.add("c-newicon--nav", "p-ssreport__icon");
            icon_nav_latest.innerText = "NEW";
            const list_topics = document.querySelector(".js-header-topics").querySelector("a");
            list_topics.appendChild(icon_nav_latest);
        }
    };
};