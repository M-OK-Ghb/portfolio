import { target } from "../../../webpack.config";

interface svgData {
    width: number;
    height: number;
};

export default class ResizeSVGs {

    private _svgs: NodeList;
    private _svgData: svgData[];
    private _siteWidth: number;

    constructor(targetElement: NodeList) {
        console.log(`[init class] - ${this.constructor.name}.setup`);
        this.init(targetElement);
    };

    init(targetElement: NodeList): void {

        // init property
        this._svgs = targetElement;;
        this._svgData = [];
        this._siteWidth = innerWidth;

        // svgの各データを取得
        this.getInitialSvgData();

        // 初期サイズ設定
        this.setSvgData(this._svgs, this._svgData);

        // イベントリスナ設定
        const setSvgData_wrapper = () => this.setSvgData(this._svgs, this._svgData); // イベントリスナ関数にクラスメンバーを渡すためラップ
        window.addEventListener("resize", setSvgData_wrapper);
    };

    private getInitialSvgData (): void {

        for (let i = 0; i < this._svgs.length; i++) {
            const svgElem: SVGElement = this._svgs[i] as SVGElement;
            const svgDataObject: svgData = {
                width: Number(svgElem.getAttribute("width")),
                height: Number(svgElem.getAttribute("height"))
            };
            this._svgData.push(svgDataObject);
        };
    };

    private setSvgData (svgs: NodeList, svgData: svgData[]): void {

        // 画面幅を取得
        this._siteWidth = innerWidth;

        if (this._siteWidth > 640) {
            for (let i = 0; i < svgs.length; i++) {
                const newWidth: number = (svgData[i].width / 1280 * 100) * (innerWidth / 100);
                const newHeight: number = (svgData[i].height / 1280 * 100) * (innerWidth / 100);

                const svgElem: SVGElement = this._svgs[i] as SVGElement;
                svgElem.setAttribute("width", newWidth.toString());
                svgElem.setAttribute("height", newHeight.toString());
            }
        };
    };
};