import {Chart} from "chart.js";
import { convert, convertNotation, convertNotationTrillion } from "../utility/utils";


export const dataLabelSumPlugin = {
    afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;
        let num = [0,0,0,0,0,0];

        for (let i = 0; i < chart.data.datasets.length; i++) {

            if (chart.data.datasets[i].type === "line") { continue; };

            // 各項目の合計を算出
            for (let _i = 0; _i < chart.data.datasets[i].data.length; _i++) {
                num[_i] += chart.data.datasets[i].data[_i];
            };
        };
 
        chart.data.datasets.forEach(function (dataset, i) {

            var meta = chart.getDatasetMeta(i);

            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
 
                    // 総計ラベルの設定
                    ctx.fillStyle = '#222';
                    var fontSize = convert(20);
                    var fontStyle = '500';
                    var fontFamily = 'din';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
 
                    var padding = 5;
                    var position = element.tooltipPosition();
 
                    // 総計出力
                    if(i === (chart.data.datasets.length -1)){
                        ctx.fillText(convertNotation(num[index]), position.x, position.y - (fontSize / 2) - padding);
                    };
                });
            }
        });
    }
};

// Trillion yenのみ処理を分ける
export const dataLabelSumPluginTr = {
    afterDatasetsDraw: function (chart, easing) {
        var ctx = chart.ctx;
        let num = [0,0,0,0,0,0];

        for (let i = 0; i < chart.data.datasets.length; i++) {

            if (chart.data.datasets[i].type === "line") { continue; };

            // 各項目の合計を算出
            for (let _i = 0; _i < chart.data.datasets[i].data.length; _i++) {
                num[_i] += chart.data.datasets[i].data[_i];
            };
        };
 
        chart.data.datasets.forEach(function (dataset, i) {

            var meta = chart.getDatasetMeta(i);

            if (!meta.hidden) {
                meta.data.forEach(function (element, index) {
 
                    // 総計ラベルの設定
                    ctx.fillStyle = '#222';
                    var fontSize = convert(20);
                    var fontStyle = '500';
                    var fontFamily = 'din';
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
 
                    var padding = 5;
                    var position = element.tooltipPosition();
 
                    // 総計出力
                    if(i === (chart.data.datasets.length -1)){
                        ctx.fillText(convertNotationTrillion(num[index]), position.x, position.y - (fontSize / 2) - padding);
                    };
                });
            }
        });
    }
};


export const dataLabelPlugin = {
    afterDatasetsDraw: function(chart) {

        var ctx = chart.ctx;

        chart.data.datasets.forEach(function(dataset, i) {

            var meta = chart.getDatasetMeta(i);
            if (!meta.hidden) {
                meta.data.forEach(function(element, i) {

                    // console.log(dataset.type)

                    var dataString = dataset.data[i].toString();
                    ctx.fillStyle = dataset.type === "line" ? "#fff" : "#222";
                    var fontSize = convert(20);
                    var fontStyle = "500";
                    var fontFamily = "din";
                    ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    var padding = 5;
                    var position = element.tooltipPosition();

                    ctx.fillText(convertNotation(Number(dataString)), position.x, position.y - (fontSize / 2) - padding);
                });
            }
        });
    }
}