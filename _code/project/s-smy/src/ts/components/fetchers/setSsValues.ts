import axios from "axios";
import {
  consoleTestResultHandler
} from "ts-lint/lib/test";
import { isForOfStatement } from "typescript";
import {
  getAssetsPath,
  lang
} from "../../config/config";
import {
  convertNotation
} from "../../utility/utils";

export default class SetSsValues {

  constructor() {}

  public async set(): Promise < void > {

    console.log(`[static] - ${this.constructor.name}.set`);

    let allSchema;
    let tableData;
    let ceoData;
    const tableElemes = document.getElementsByClassName("js-table-set-value");

    const start = (): void => {

      const set_results_highlights = (): void => {

        const _schema = tableData["results_highlights"];
        const _schemaKeys = Object.keys(tableData["results_highlights"]);

        // テーブルヘッダー設定
        const head = tableElemes[0].querySelectorAll("tr")[0];
        head.querySelectorAll("th")[1].innerText = _schema[_schemaKeys[0]].labels[lang ? "jp" : "en"];

        // Net Sales設定
        const net_sales = tableElemes[0].querySelectorAll("tr")[1];
        net_sales.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.net_sales);
        net_sales.querySelectorAll("td")[2].querySelector("span").innerText = _schema[_schemaKeys[1]].slots.net_sales;

        // Operating Income設定
        const operating_income = tableElemes[0].querySelectorAll("tr")[2];
        operating_income.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.operating_income);
        operating_income.querySelectorAll("td")[2].querySelector("span").innerText = _schema[_schemaKeys[1]].slots.operating_income;

        // Net Sales設定
        const ordinary_income = tableElemes[0].querySelectorAll("tr")[3];
        ordinary_income.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.ordinary_income);
        ordinary_income.querySelectorAll("td")[2].querySelector("span").innerText = _schema[_schemaKeys[1]].slots.ordinary_income;

        // Profit attributable設定
        const profit_attributable = tableElemes[0].querySelectorAll("tr")[4];
        profit_attributable.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].slots.profit_attributable);
        profit_attributable.querySelectorAll("td")[2].querySelector("span").innerText = _schema[_schemaKeys[1]].slots.profit_attributable;
      };

      const set_segment_results = (): void => {

        const _schema = tableData["segment_results"];
        const _schemaKeys = Object.keys(tableData["segment_results"]);

        // テーブルヘッダー設定
        const head = tableElemes[1].querySelectorAll("tr")[0];
        head.querySelectorAll("th")[1].innerText = _schema[_schemaKeys[0]].labels[lang ? "jp" : "en"];

        // entertainment_sales set
        const entertainment = tableElemes[1].querySelectorAll("tr")[1];
        entertainment.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].value.entertainment_sales);
        entertainment.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = _schema[_schemaKeys[1]].slots.entertainment_sales;

        // pachislot_and_pachinko_sales set
        const pachislot_and_pachinko = tableElemes[1].querySelectorAll("tr")[2];
        pachislot_and_pachinko.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].value.pachislot_and_pachinko_sales);
        pachislot_and_pachinko.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = _schema[_schemaKeys[1]].slots.pachislot_and_pachinko_sales;

        // resort_sales set
        const resort = tableElemes[1].querySelectorAll("tr")[3];
        resort.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].value.resort_sales);
        resort.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = _schema[_schemaKeys[1]].slots.resort_sales;

        // entertainment_profit set
        const entertainment_profit = tableElemes[1].querySelectorAll("tr")[4];
        entertainment_profit.querySelectorAll("td")[2].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].value.entertainment_profit);
        entertainment_profit.querySelectorAll("td")[3].querySelector("span").querySelector("span").innerText = _schema[_schemaKeys[1]].slots.entertainment_profit;

        // pachislot_and_pachinko_profit set
        const pachislot_and_pachinko_profit = tableElemes[1].querySelectorAll("tr")[5];
        pachislot_and_pachinko_profit.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].value.pachislot_and_pachinko_profit);
        pachislot_and_pachinko_profit.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = _schema[_schemaKeys[1]].slots.pachislot_and_pachinko_profit;
        // resort_profit set
        const resort_profit = tableElemes[1].querySelectorAll("tr")[6];
        resort_profit.querySelectorAll("td")[1].querySelector("span").innerText = convertNotation(_schema[_schemaKeys[0]].value.resort_profit);
        resort_profit.querySelectorAll("td")[2].querySelector("span").querySelector("span").innerText = _schema[_schemaKeys[1]].slots.resort_profit;

        // review set
        const review_textData = _schema["review"];
        const review_entertainment = document.getElementById('js-review-entertainment');
        const review_pachinko = document.getElementById('js-review-pachinko');
        const review_resort = document.getElementById('js-review-resort');
        review_entertainment.innerHTML = review_textData.entertainment[lang ? "jp" : "en"];
        review_pachinko.innerHTML = review_textData.pachinko[lang ? "jp" : "en"];
        review_resort.innerHTML = review_textData.resort[lang ? "jp" : "en"];

        // addBlock set
        const addBlock = document.getElementById('js-addBlock');
        const addBlockData = _schema["addBlock"];
        const commonImgPath = getAssetsPath("images");
        if (addBlockData.display === true) {
          addBlock.style.display = "block";
          const addBlock_title = document.getElementById('js-addBlock-title');
          const addBlock_text = document.getElementById('js-addBlock-text');
          const addBlock_link = document.getElementById('js-addBlock-link');
          const addBlock_img = document.getElementById('js-addBlock-img');
          const addBlock_imgWrap = document.getElementById('js-addBlock-imgWrap');
          addBlock_title.innerHTML = addBlockData.title[lang ? "jp" : "en"];
          addBlock_text.innerHTML = addBlockData.text[lang ? "jp" : "en"];
          if (addBlockData.link.display === true) {
            addBlock_link.innerHTML = addBlockData.link.text[lang ? "jp" : "en"];
            addBlock_link.setAttribute('href', addBlockData.link.url[lang ? "jp" : "en"]);
          } else {
            addBlock_link.innerHTML = "";
            addBlock_link.setAttribute('href', "");
          }

          if (addBlockData.img.display === true) {
            const imgPath = commonImgPath + addBlockData.img[lang ? "jp" : "en"];
            addBlock_img.setAttribute('src', imgPath);
            addBlock_imgWrap.style.display = "block";
          } else {
            addBlock_imgWrap.style.display = "none";
          }
        } else {
          addBlock.style.display = "none";
        }
      };

      const set_ceo_data = (): void => {
        const _schema = ceoData["ceo_text"];
        const _schemaKeys = Object.keys(ceoData["ceo_text"]);

        const report_issue = document.getElementById('js-issue');
        const report_range = document.getElementById('js-range');
        const report_summary = document.getElementById('js-summary');
        const ceo_img = document.getElementById('js-ceoimg');
        const short_title = document.getElementById('js-shorttitle');
        const position = document.getElementById('js-position');
        const ceo_name = document.getElementById('js-ceoname');
        const main_text = document.getElementById('js-maintext');

        report_issue.innerHTML = _schema[_schemaKeys[0]].issue[lang ? "jp" : "en"];
        report_range.innerHTML = _schema[_schemaKeys[0]].range[lang ? "jp" : "en"];;
        report_summary.innerHTML = _schema[_schemaKeys[0]].summary[lang ? "jp" : "en"];;
        short_title.innerHTML = _schema[_schemaKeys[0]].shorttitle[lang ? "jp" : "en"];;
        position.innerHTML = _schema[_schemaKeys[0]].position[lang ? "jp" : "en"];;
        ceo_name.innerHTML = _schema[_schemaKeys[0]].ceoname[lang ? "jp" : "en"];;
        main_text.innerHTML = this.getParagraphTexts(_schema[_schemaKeys[0]].maintext[lang ? "jp" : "en"]);;
        const imgPath = getAssetsPath("images") + _schema[_schemaKeys[0]].ceoimgpath["common"];
        ceo_img.setAttribute('src', imgPath);
      }

      set_results_highlights();
      set_segment_results();
      set_ceo_data();
    };

    // jsonデータを取得
    return axios({
        method: "get",
        url: `${getAssetsPath("json")}ssreport.json`,
        responseType: "json"
      })
      .then((res) => {
        // 各期のデータ全て
        allSchema = res.data.all;
        // indexとarchiveで初回表示出しわけ
        let bodyData = document.body.dataset.page;

        if(bodyData === 'ss-report') {
          tableData = allSchema[0].data.table;
          ceoData = allSchema[0].data.article;
        } else if(bodyData === 'ss-report-archive'){
          tableData = allSchema[1].data.table;
          ceoData = allSchema[1].data.article;
        }

        start();

        if(document.body.dataset.page === "ss-report-archive") {
          window.addEventListener('hashchange', ()=> {
            const changedUrl = location.href;
            let queryValue = "";

            if(changedUrl.indexOf("#") >= 0) {
              queryValue = changedUrl.substring(changedUrl.indexOf("#")+1, changedUrl.length)
            }
            allSchema.forEach((item, i) => {
              if(item.query === queryValue) {
                tableData = allSchema[i].data.table;
                ceoData = allSchema[i].data.article; 
                start();
              }
            });
          });
        }
      });
  };

  private getParagraphTexts(textArr: string[]): string {
    let _text = ""
    textArr.forEach(text => {
      _text += `<p>${text}</p>`
    })
    return _text
  }
}