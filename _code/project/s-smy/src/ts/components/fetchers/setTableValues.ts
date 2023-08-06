import axios from "axios";
import { getAssetsPath, lang } from "../../config/config";
import TableArrowDirection from "../tableArrowDirection";
import { convertNotation } from "../../utility/utils";

export default class SetTableValues {

    static set (): void {

        console.log(`[static] - ${this.constructor.name}.set`);

        let tableSchema;
        const tableElemes = document.getElementsByClassName("js-table-set-value");

        const start = (): void => {

            const set_results_highlights = (): void => {

                const _schema = tableSchema["results_highlights"];
                const _schemaKeys = Object.keys(tableSchema["results_highlights"]);

                // テーブルヘッダー設定
                const head = tableElemes[0].querySelectorAll("tr")[0];
                head.querySelectorAll("th")[1].innerText = _schema[_schemaKeys[0]].labels[lang ? "jp" : "en"];
                head.querySelectorAll("th")[2].innerText = _schema[_schemaKeys[1]].labels[lang ? "jp" : "en"];

                // Net Sales設定
                const net_sales = tableElemes[0].querySelectorAll("tr")[1];
                net_sales.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.net_sales);
                net_sales.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.net_sales);
                net_sales.querySelectorAll("td")[3].querySelector("span").innerText = _schema[_schemaKeys[2]].slots.net_sales;

                // Operating Income設定
                const operating_income = tableElemes[0].querySelectorAll("tr")[2];
                operating_income.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.operating_income);
                operating_income.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.operating_income);
                operating_income.querySelectorAll("td")[3].querySelector("span").innerText = _schema[_schemaKeys[2]].slots.operating_income;

                // Net Sales設定
                const ordinary_income = tableElemes[0].querySelectorAll("tr")[3];
                ordinary_income.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.ordinary_income);
                ordinary_income.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.ordinary_income);
                ordinary_income.querySelectorAll("td")[3].querySelector("span").innerText = _schema[_schemaKeys[2]].slots.ordinary_income;

                // Profit attributable設定
                const profit_attributable = tableElemes[0].querySelectorAll("tr")[4];
                profit_attributable.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.profit_attributable);
                profit_attributable.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.profit_attributable);
                profit_attributable.querySelectorAll("td")[3].querySelector("span").innerText = _schema[_schemaKeys[2]].slots.profit_attributable;
            };

            const set_segment_results = (): void => {

                const _schema = tableSchema["segment_results"];
                const _schemaKeys = Object.keys(tableSchema["segment_results"]);

                // テーブルヘッダー設定
                const head = tableElemes[1].querySelectorAll("tr")[0];
                head.querySelectorAll("th")[1].innerText = _schema[_schemaKeys[0]].labels[lang ? "jp" : "en"];
                head.querySelectorAll("th")[2].innerText = _schema[_schemaKeys[1]].labels[lang ? "jp" : "en"];

                // entertainment設定
                const entertainment = tableElemes[1].querySelectorAll("tr")[1];
                entertainment.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.entertainment);
                entertainment.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.entertainment);

                // Opachislot_and_pachinko設定
                const pachislot_and_pachinko = tableElemes[1].querySelectorAll("tr")[2];
                pachislot_and_pachinko.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.pachislot_and_pachinko);
                pachislot_and_pachinko.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.pachislot_and_pachinko);

                // resort設定
                const resort = tableElemes[1].querySelectorAll("tr")[3];
                resort.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.resort);
                resort.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.resort);

                // other_elimination設定
                const other_elimination = tableElemes[1].querySelectorAll("tr")[4];
                other_elimination.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.other_elimination);
                other_elimination.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.other_elimination);
            };

            const set_operating_forecast = (): void => {

                const _schema = tableSchema["operating_forecast"];
                const _schemaKeys = Object.keys(tableSchema["operating_forecast"]);

                // テーブルヘッダー設定
                const head = tableElemes[2].querySelectorAll("tr")[0];
                head.querySelectorAll("th")[1].innerText = _schema[_schemaKeys[0]].labels[lang ? "jp" : "en"];
                head.querySelectorAll("th")[2].innerText = _schema[_schemaKeys[1]].labels[lang ? "jp" : "en"];
                head.querySelectorAll("th")[3].innerText = _schema[_schemaKeys[2]].labels[lang ? "jp" : "en"];

                // Net Sales設定
                const net_sales = tableElemes[2].querySelectorAll("tr")[1];
                net_sales.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.net_sales);
                net_sales.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.net_sales);
                net_sales.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[2]].slots.net_sales);

                // Operating Income設定
                const ordinary_income = tableElemes[2].querySelectorAll("tr")[2];
                ordinary_income.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.ordinary_income);
                ordinary_income.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.ordinary_income);
                ordinary_income.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[2]].slots.ordinary_income);
                
                // entertainment設定
                const entertainment = tableElemes[2].querySelectorAll("tr")[3];
                entertainment.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.entertainment);
                entertainment.querySelectorAll("td")[3].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.entertainment);
                entertainment.querySelectorAll("td")[4].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[2]].slots.entertainment);

                // Opachislot_and_pachinko設定
                const pachislot_and_pachinko = tableElemes[2].querySelectorAll("tr")[4];
                pachislot_and_pachinko.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.pachislot_and_pachinko);
                pachislot_and_pachinko.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.pachislot_and_pachinko);
                pachislot_and_pachinko.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[2]].slots.pachislot_and_pachinko);

                // resort設定
                const resort = tableElemes[2].querySelectorAll("tr")[5];
                resort.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.resort);
                resort.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.resort);
                resort.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[2]].slots.resort);

                // other_elimination設定
                const other_elimination = tableElemes[2].querySelectorAll("tr")[6];
                other_elimination.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.other_elimination);
                other_elimination.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[1]].slots.other_elimination);  
                other_elimination.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = convertNotation(_schema[_schemaKeys[2]].slots.other_elimination);
            };

            set_results_highlights();
            set_segment_results();
            set_operating_forecast();
            
            new TableArrowDirection();
        };

        // jsonデータを取得
        axios({
            method: "get",
            url: `${getAssetsPath("json")}chart.json`,
            responseType: "json"
        })
        .then((res) => {

            tableSchema = res.data.table;
            start();
        });
    };
}