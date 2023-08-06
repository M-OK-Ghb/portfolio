import { getAssetsPath } from "../../config/config";
import { InterviewSchema } from "../../type/type";
import DOMFactory from "../../utility/abstractClass/domFactory";

export default class GetNewInterviewIcon extends DOMFactory {

    constructor() {
        super();
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.createDOM(this.getState, "interview.json");
    }

    public getState (data: InterviewSchema): void {

        // 最新記事がない場合、処理終了
        if (!data.interviewData.new) { return; };


        if (document.querySelector('[data-page]')) {

            if (document.querySelector('[data-page]').getAttribute("data-page") === "top") {

                const icon_pc = document.createElement("img");
                icon_pc.src = `${getAssetsPath("images")}new_pc.svg`;
                icon_pc.classList.add("c-newicon","u-is-pc");
        
                const elem_pc = document.getElementById("js-new-icon-pc");
                const elem_sp = document.getElementsByClassName("js-new-icon-sp");
        
                elem_pc.appendChild(icon_pc);
                
                for (let i = 0; i < elem_sp.length; i++) {
        
                    const icon_sp = document.createElement("img");
                    icon_sp.src = `${getAssetsPath("images")}new_sp.svg`;
                    icon_sp.classList.add("c-newicon", "u-is-sp", "is-hide");
        
                    elem_sp[i].appendChild(icon_sp);
                };
            }
        }

        const elem_header = document.querySelector(".c-header__navbar--list");
        const elem_nav = document.querySelector(".top-border-bg-6").querySelector("a");

        const icon_header = document.createElement("span");
        icon_header.classList.add("c-newicon--header");
        icon_header.innerText = "NEW";

        const icon_nav = document.createElement("span");
        icon_nav.classList.add("c-newicon--nav");
        icon_nav.innerText = "NEW";

        elem_header.children[elem_header.children.length - 1].appendChild(icon_header);
        elem_nav.appendChild(icon_nav);
    };
};