
type valueComparisonArray = [number, number];

export default class TableArrowDirection {

    private _tableElems: HTMLCollection;

    constructor () {
        console.log(`[class] - ${this.constructor.name}.setup`);
        this._tableElems = document.getElementsByClassName("js-table");
        this.init();
    };

    private init (): void {

        for (let i = 0; i < this._tableElems.length; i++) {
            const trs: NodeList = this._tableElems[i].querySelectorAll("tr");

            for (let t = 0; t < trs.length; t++) {

                if (t === 0) { continue; }

                const trElem: HTMLElement = trs[t] as HTMLElement;
                const tds: NodeList = trElem.querySelectorAll("td");
                const r_td: HTMLElement = tds[tds.length - 1] as HTMLElement;
                const l_td: HTMLElement = tds[tds.length - 2] as HTMLElement;
                const r_value = Number(r_td.querySelector("span").textContent.replace(",", ""));
                const l_value = Number(l_td.querySelector("span").textContent.replace(",", ""));
                const arrowElem: HTMLElement = r_td.querySelector(".js-table-svgs");
                let rotateDeg = 0;

                if (l_value === r_value) {
                    rotateDeg = 90;
                } else if (l_value > r_value) {
                    rotateDeg = 180;
                }

                arrowElem.style.transform = `rotate(${rotateDeg}deg)`
            }
        }
    };
}