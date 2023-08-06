import { Chart } from 'chart.js';
import { ChartTooltipModel } from "chart.js";
import {convert, convertNotation} from "../../utility/utils";
import { getAssetsPath } from "../../config/config";
import axios from "axios";
import { dataLabelSumPlugin, dataLabelPlugin, dataLabelSumPluginTr } from "../chartLabelTotalPlugin";
import GetLang from "../getLang";
import { ChartSchema } from '../../type/type';
import { arrayify } from 'ts-lint/lib/utils';

const lang: boolean = GetLang.getLang();
let chartSchema: ChartSchema;

export default class ChartFactory {
    
    private _chartType: string;
    private _flg: boolean;
    private _isSP: boolean;

    constructor (chartType: string) {
        console.log(`[class] - ChartFactory[type: ${chartType}].setup`);
        this._chartType = chartType;
        this._isSP = false;
    };

    static createChart (id: string): void {

      const start = () => {

        const self = this;
        const ua = navigator.userAgent.toLowerCase();
        const isSP: boolean = ua.indexOf("iphone") > 0 || (ua.indexOf("android") > 0 && ua.indexOf("mobile") > 0) ? true: false;
        this.prototype._isSP = isSP;

        const convertSpSize = (chartOptions) => {
          if(isSP) {
            chartOptions.options.scales.xAxes[0].barPercentage= 0.8;
            chartOptions.options.scales.xAxes[0].categoryPercentage= 0.8;
            chartOptions.options.scales.xAxes[0].ticks.fontSize= convert(11);
            chartOptions.options.scales.yAxes[0].ticks.fontSize= convert(11);
            if(chartOptions.options.scales.yAxes[1]){
              chartOptions.options.scales.yAxes[1].ticks.fontSize= convert(11);
            };
          }
  
          if(chartOptions.plugins){
            chartOptions.plugins.push({afterRender: self.copyYAxisImage.bind(self,this)})
          } else {
            chartOptions.plugins = [{afterRender: self.copyYAxisImage.bind(self,this)}];
          }
        }

        // chartを描画
        const drawChart = (): void => {

          const chartContainer = document.getElementById(id);
          const cv = chartContainer.querySelector("canvas");
          const ctx = cv.getContext("2d");
  
          // キャンバスサイズを設定
          cv.width = cv.clientWidth;
          cv.height = (<HTMLElement>cv.parentNode).clientHeight;

          // ラベル取得用関数
          const getChartLabels = (data): string[][] => {

            const dataLabelArray: string[] = Object.keys(data);
            let jp_labelArray: string[] = [];
            let en_labelArray: string[] = [];
            let labelArray: string[][] = [];
  
            for (let i = 0; i < dataLabelArray.length; i++) {
              jp_labelArray.push(data[dataLabelArray[i]].labels.jp);
              en_labelArray.push(data[dataLabelArray[i]].labels.en);
            }

            labelArray.push(jp_labelArray, en_labelArray)
  
            return labelArray;
          };

          // データ取得用関数
          const getDatesets = (data, mergeData?: {}[]) => {

            const dataLabelArray: any = Object.keys(data);
            const bf_dataSetsArray: any = [];
            const af_dataSetsArray: any = [];
            const dataSets = [];
            const newDataSets = [];

            // nameプロパティ追加
            for (const iterator of data[dataLabelArray[0]].slots) {
              dataSets.push({label: lang ? iterator.jp_name : iterator.en_name});
            };
  
            // dataプロパティ追加
            for (let i = 0; i < dataLabelArray.length; i++) {
              bf_dataSetsArray.push([])

              for (let _i = 0; _i < data[dataLabelArray[i]].slots.length; _i++) {
                bf_dataSetsArray[i].push(data[dataLabelArray[i]].slots[_i].value);
              };

            };

            for (let i = 0; i < data[dataLabelArray[0]].slots.length; i++) {
              af_dataSetsArray.push([]);

              for (const iterator of bf_dataSetsArray) {
                af_dataSetsArray[i].push(iterator[i]);
              };

            };

            for (let i = 0; i < dataSets.length; i++) {
              dataSets[i].data = af_dataSetsArray[i]
            }

            for (let i = 0; i < dataSets.length; i++) {
              let _mergeArray = {...dataSets[i], ...mergeData[i]};
              newDataSets.push(_mergeArray)
            }
            
            return newDataSets;

          };

          // y軸取得用関数
          const getAxes = (data, data2?) => {

            if (data2) {

              const axesData = [
                {
                  max: data.max,
                  min: data.min ? data.min : 0,
                  stepSize: data.stepSize
                },
                {
                  max: data2.max,
                  min: data2.min ? data2.min : 0,
                  stepSize: data2.stepSize
                }
              ];

              return axesData;

            } else {

              const axesData = {
                max: data.max,
                min: typeof data.min === "number" ? data.min : 0,
                stepSize: data.stepSize
              };

              return axesData;
            }

          };

          switch (id) {
            case "js-chart-bar_01":

            const mergeArray = [
              { backgroundColor: "#0082CA", yAxisID: "y-axis-1" },
              { backgroundColor: "#2A96D3",yAxisID: "y-axis-1" },
              { backgroundColor: "#55ACDD",yAxisID: "y-axis-1" },
              { backgroundColor: "#8FC8E8",yAxisID: "y-axis-1" },
              { backgroundColor: "#CCE6F5",yAxisID: "y-axis-1" }
            ];

            const labels = getChartLabels(chartSchema.entertainment.data);
            const datasets = getDatesets(chartSchema.entertainment.data, mergeArray);
            const axesData = getAxes(chartSchema.entertainment.yAxes);

              const chartOptions = {

                type: 'bar',
                data: {
                  labels: lang ? labels[0] : labels[1],
                  datasets: datasets
                },
                plugins: [dataLabelSumPluginTr],
                options: {
                  responsive: true,
                  elements: {
                    rectangle: {
                        maxBarThickness: convert(40),
                      borderSkipped: 'bottom'
                    }
                  },
                  scales: {
                    xAxes: [{
                      stacked: true,
                      gridLines: {
                          tickColor: "#fff",
                          tickLength: 12,
                          display: false
                      },
                      ticks: {
                        fontSize: innerWidth > 640　? convert(13) : convert(11),
                        fontColor: "#333",
                        fontFamily: "std",
                        padding: convert(10),
                        maxRotation: 0,
                        minRotation: 0
                      }
                    }],
                    yAxes: [{
                      id: "y-axis-1",   // Y軸のID
                      stacked: true,
                      gridLines: {
                        color: "#ddd",
                        drawBorder: false,
                        zeroLineColor: "#ddd"
                      },
                      ticks: {
                          fontSize: innerWidth > 640　? convert(16) : convert(11),
                          fontColor: "#333",
                          fontFamily: "std",
                          padding: convert(10),
                          beginAtZero: true,
                          ...axesData
                      }
                    }]
                  },
                  legend: {
                      display: false
                  },
                  tooltips: {
                      enabled: false,
                      custom: function(tooltipModel) {
            
                        // ツールチップ要素
                        const tooltipEl = document.getElementById('chartjs-tooltip');
            
                        // ツールチップがない場合は非表示
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = "0";
                            return;
                        };
            
                        // キャレット(ツールチップが指し示すもの)の位置を設定する
                        tooltipEl.classList.remove('above', 'below', 'no-transform');
                        if (tooltipModel.yAlign) {
                            tooltipEl.classList.add(tooltipModel.yAlign);
                        } else {
                            tooltipEl.classList.add('no-transform');
                        };
            
                        function getBody(bodyItem) {
                            return bodyItem.lines;
                        };
            
                        let props_title: string;
                        let props_text: string;
                        let props_count: string;
                        let props_color: string;
            
                        // テキストを設定する
                        if (tooltipModel.body) {
                            var titleLines = tooltipModel.title || [];
                            var bodyLines = tooltipModel.body.map(getBody);
            
                            titleLines.forEach(function(title) {
                                props_title = title;
                            });
            
                            bodyLines.forEach(function(body, i) {
            
                                props_text = body[0].split(": ")[0];
                                props_count = convertNotation(Number(body[0].split(": ")[1]));
            
                                props_color = tooltipModel.labelColors[i].backgroundColor;
                            });
            
                            tooltipEl.innerHTML =
                            `<div class="c-tooltip__inner" style="border: 0.15625vw solid ${props_color}">
                                <span>${props_title}</span>
                                <div class="flex-wrapper">
                                    <span class="color-block" style="background-color: ${props_color}"></span>
                                    <span>${props_text}</span>
                                    <span class="c-tooltip__count" style="color: ${props_color}">${props_count}</span>
                                </div>
                            </div>`;
                        };
            
                        // `this` はツールチップ全体です
                        var position = this._chart.canvas.getBoundingClientRect();
            
                        // 表示、配置、およびフォントスタイルの設定
                        tooltipEl.style.opacity = "1";
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                        tooltipEl.style.fontSize = tooltipModel.bodyFontSize;
                        tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                        tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                    }
                  },
                  layout: {
                    padding: {
                      left: -6,
                      right: -6
                    }
                  }
                }
            };
              convertSpSize(chartOptions);
              let myChart = new Chart(ctx, chartOptions as any);

              window.addEventListener("resize", (): void => {
                  myChart.destroy();
                  cv.width = cv.clientWidth;
                  cv.height = cv.clientHeight;
                  drawChart();
              });

              break;

              case "js-chart-bar_02":

                const mergeArray2 = [
                  {type: 'line', borderColor: '#234600', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#234600', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-2"},
                  {type: 'line', borderColor: '#549318', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#549318', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-2"},
                  {type: 'bar', backgroundColor: "#79BD36", yAxisID: "y-axis-1"},
                  {type: 'bar', backgroundColor: "#AED785", yAxisID: "y-axis-1"},
                ];

                const labels2 = getChartLabels(chartSchema.pachislot_and_pachinko.data);
                const datasets2 = getDatesets(chartSchema.pachislot_and_pachinko.data, mergeArray2);
                const axesData2 = getAxes(chartSchema.pachislot_and_pachinko.yAxes, chartSchema.pachislot_and_pachinko.yAxes2);

                const chartOptions2 = {
    
                  type: 'bar',
                  data: {
                    labels: lang ? labels2[0] : labels2[1],
                    datasets: datasets2
                  },
                  plugins: [dataLabelSumPlugin],
                  options: {
                    responsive: true,
                    elements: {
                      rectangle: {
                          maxBarThickness: convert(40),
                          borderSkipped: 'bottom' // 除外する境界線。
                      }
                    },
                    scales: {
                      xAxes: [{
                        stacked: true,
                        gridLines: {
                            tickColor: "#fff",
                            tickLength: 12,
                            display: false
                        },
                        ticks: {
                          fontSize: innerWidth > 640　? convert(16) : convert(11),
                          fontColor: "#333",
                          fontFamily: "std",
                          padding: convert(10),
                          maxRotation: 0,
                          minRotation: 0
                        }
                      }],
                      yAxes: [{
                          id: "y-axis-2",   // Y軸のID
                          stacked: false,
                          position: 'right',
                          gridLines: {
                            color: "#ddd",
                            drawBorder: false,
                            zeroLineColor: "#ddd"
                          },
                          ticks: {
                              fontSize: innerWidth > 640　? convert(16) : convert(11),
                              fontColor: "#333",
                              fontFamily: "std",
                              padding: convert(10),
                              beginAtZero: true,
                              ...axesData2[1],
                              callback: (label: number) => {
                                return label.toLocaleString();
                              }
                          }
                      }, {
                        id: "y-axis-1",   // Y軸のID
                        stacked: true,
                        gridLines: {
                          color: "#ddd",
                          drawBorder: false,
                          zeroLineColor: "#ddd"
                        },
                        ticks: {
                            fontSize: innerWidth > 640　? convert(16) : convert(11),
                            fontColor: "#333",
                            fontFamily: "std",
                            padding: convert(10),
                            beginAtZero: true,
                            ...axesData2[0],
                            callback: convertNotation
                        }
                      }]
                    },
                    legend: {
                      display: false
                    },
                    tooltips: {
                        enabled: false,
                        custom: function(tooltipModel) {
              
                          // ツールチップ要素
                          const tooltipEl = document.getElementById('chartjs-tooltip');
              
                          // ツールチップがない場合は非表示
                          if (tooltipModel.opacity === 0) {
                              tooltipEl.style.opacity = "0";
                              return;
                          };
              
                          // キャレット(ツールチップが指し示すもの)の位置を設定する
                          tooltipEl.classList.remove('above', 'below', 'no-transform');
                          if (tooltipModel.yAlign) {
                              tooltipEl.classList.add(tooltipModel.yAlign);
                          } else {
                              tooltipEl.classList.add('no-transform');
                          };
              
                          function getBody(bodyItem) {
                              return bodyItem.lines;
                          };
              
                          let props_title: string;
                          let props_text: string;
                          let props_count: string;
                          let props_color: string;
                          let micro: boolean;
              
                          // テキストを設定する
                          if (tooltipModel.body) {
                              var titleLines = tooltipModel.title || [];
                              var bodyLines = tooltipModel.body.map(getBody);
              
                              titleLines.forEach(function(title) {
                                  props_title = title;
                              });
              
                              bodyLines.forEach(function(body, i) {
              
                                  props_text = body[0].split(": ")[0];
                                  props_count = props_text.indexOf("units") !== -1 ? Number(body[0].split(": ")[1]).toLocaleString() : convertNotation(Number(body[0].split(": ")[1]));
              
                                  props_color = tooltipModel.labelColors[i].backgroundColor;
                                  micro = props_color === "#1482CA" || props_color === "#79BD36" || props_color === "rgb(110, 202, 18)" || props_color === "rgb(0, 122, 204)";
                              });
                              
                              tooltipEl.innerHTML =
                              `<div class="c-tooltip__inner" style="border: 0.15625vw solid ${props_color}">
                                  <span>${props_title}</span>
                                  <div class="flex-wrapper">
                                      <span class="${micro ? "color-block" : "color-block-micro"}" style="background-color: ${props_color}"></span>
                                      <span>${props_text}</span>
                                      <span class="c-tooltip__count" style="color: ${props_color}">${props_count}</span>
                                  </div>
                              </div>`;
                          };
              
                          // `this` はツールチップ全体です
                          var position = this._chart.canvas.getBoundingClientRect();
              
                          // 表示、配置、およびフォントスタイルの設定
                          tooltipEl.style.opacity = "1";
                          tooltipEl.style.position = 'absolute';
                          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                          tooltipEl.style.fontSize = tooltipModel.bodyFontSize;
                          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                          tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                          tooltipEl.style.pointerEvents = 'none';
                      }
                    },
                    layout: {
                      padding: {
                        left: -6,
                        right: -6
                      }
                    }
                  }
                };

                convertSpSize(chartOptions2);
                let myChart2 = new Chart(ctx, chartOptions2);

                window.addEventListener("resize", (): void => {
                    myChart2.destroy();
                    drawChart();
                });
                
                break;

                case "js-chart-bar_03":
  
                  const mergeArray3 = [
                    {type: 'line', borderColor: '#222', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#222', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-2"},
                    {type: 'bar', backgroundColor: "#0082CA", yAxisID: "y-axis-1"},
                  ];
  
                  const labels3 = getChartLabels(chartSchema.latest_results.data);
                  const datasets3 = getDatesets(chartSchema.latest_results.data, mergeArray3);
                  const axesData3 = getAxes(chartSchema.latest_results.yAxes, chartSchema.latest_results.yAxes2);
  
                  const chartOptions3 = {
    
                    type: 'bar',
                    data: {
                      labels: lang ? labels3[0] : labels3[1],
                      datasets: datasets3
                    },
                    plugins: [dataLabelPlugin],
                    options: {
                      responsive: true,
                      elements: {
                        rectangle: {
                            maxBarThickness: convert(40),
                            borderSkipped: 'bottom' // 除外する境界線。
                        }
                      },
                      scales: {
                        xAxes: [{
                          stacked: true,
                          gridLines: {
                              tickColor: "#fff",
                              tickLength: 12,
                              display: false
                          },
                          ticks: {
                            fontSize: innerWidth > 640　? convert(16) : convert(11),
                            fontColor: "#333",
                            fontFamily: "std",
                            padding: convert(10),
                            maxRotation: 0,
                            minRotation: 0
                          }
                        }],
                        yAxes: [{
                            id: "y-axis-2",   // Y軸のID
                            stacked: false,
                            position: 'right',
                            gridLines: {
                              color: "#ddd",
                              drawBorder: false,
                              zeroLineColor: "#ddd"
                            },
                            ticks: {
                                fontSize: innerWidth > 640　? convert(16) : convert(11),
                                fontColor: "#333",
                                fontFamily: "std",
                                padding: convert(10),
                                beginAtZero: true,
                                ...axesData3[1],
                                autoSkip: false,
                                callback: convertNotation
                            }
                        },
                        {
                          id: "y-axis-1",   // Y軸のID
                          stacked: true,
                          gridLines: {
                            color: "#ddd",
                            drawBorder: false,
                            zeroLineColor: "#ddd"
                          },
                          ticks: {
                              fontSize: innerWidth > 640　? convert(16) : convert(11),
                              fontColor: "#333",
                              fontFamily: "std",
                              padding: convert(10),
                              beginAtZero: true,
                              ...axesData3[0],
                              autoSkip: false,
                              callback: convertNotation
                          }
                        }]
                      },
                      legend: {
                        display: false
                      },
                      tooltips: {
                          enabled: false,
                          custom: function(tooltipModel) {
                
                            // ツールチップ要素
                            const tooltipEl = document.getElementById('chartjs-tooltip');
                
                            // ツールチップがない場合は非表示
                            if (tooltipModel.opacity === 0) {
                                tooltipEl.style.opacity = "0";
                                return;
                            };
                
                            // キャレット(ツールチップが指し示すもの)の位置を設定する
                            tooltipEl.classList.remove('above', 'below', 'no-transform');
                            if (tooltipModel.yAlign) {
                                tooltipEl.classList.add(tooltipModel.yAlign);
                            } else {
                                tooltipEl.classList.add('no-transform');
                            };
                
                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            };
                
                            let props_title: string;
                            let props_text: string;
                            let props_count: string;
                            let props_color: string;
                            let micro: boolean;
                
                            // テキストを設定する
                            if (tooltipModel.body) {
                                var titleLines = tooltipModel.title || [];
                                var bodyLines = tooltipModel.body.map(getBody);
                
                                titleLines.forEach(function(title) {
                                    props_title = title;
                                });
                
                                bodyLines.forEach(function(body, i) {
                
                                    props_text = body[0].split(": ")[0];
                                    props_count = convertNotation(Number(body[0].split(": ")[1]));
                
                                    props_color = tooltipModel.labelColors[i].backgroundColor;
                                    micro = props_color === "#0082CA" || props_color === "rgb(0, 119, 184)";
                                });
                                
                                tooltipEl.innerHTML =
                                `<div class="c-tooltip__inner" style="border: 0.15625vw solid ${props_color}">
                                    <span>${props_title}</span>
                                    <div class="flex-wrapper">
                                        <span class="${micro ? "color-block" : "color-block-micro"}" style="background-color: ${props_color}"></span>
                                        <span>${props_text}</span>
                                        <span class="c-tooltip__count" style="color: ${props_color}">${props_count}</span>
                                    </div>
                                </div>`;
                            };
                
                            // `this` はツールチップ全体です
                            var position = this._chart.canvas.getBoundingClientRect();
                
                            // 表示、配置、およびフォントスタイルの設定
                            tooltipEl.style.opacity = "1";
                            tooltipEl.style.position = 'absolute';
                            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                            tooltipEl.style.fontSize = tooltipModel.bodyFontSize;
                            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                            tooltipEl.style.pointerEvents = 'none';
                        }
                      },
                      layout: {
                        padding: {
                          left: -6,
                          right: -6
                        }
                      }
                    }
                  };
  
                  convertSpSize(chartOptions3);
                  let myChart3 = new Chart(ctx, chartOptions3);
  
                  window.addEventListener("resize", (): void => {
                      myChart3.destroy();
                      cv.width = cv.clientWidth;
                      cv.height = cv.clientHeight;
                      drawChart();
                  });

                  break;

                  case "js-chart-bar_04":
    
                    const mergeArray4 = [
                      {type: 'line', borderColor: '#1482CA', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#1482CA', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-1"},
                      {type: 'line', borderColor: '#7EBB41', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#7EBB41', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-1"},
                      {type: 'line', borderColor: '#FDAD30', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#FDAD30', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-1"},
                      {type: 'line', borderColor: '#888888', backgroundColor: "rgba(0,0,0,0)", pointBackgroundColor: '#888888', lineTension: 0, borderWidth: convert(2), yAxisID: "y-axis-1"},
                    ];
    
                    const labels4 = getChartLabels(chartSchema.forecast.data);
                    const datasets4 = getDatesets(chartSchema.forecast.data, mergeArray4);
                    const axesData4 = getAxes(chartSchema.forecast.yAxes);
    
                    const chartOptions4 = {
    
                      type: 'bar',
                      data: {
                        labels: lang ? labels4[0] : labels4[1],
                        datasets: datasets4
                      },
                      options: {
                        responsive: true,
                        elements: {
                          rectangle: {
                              maxBarThickness: convert(40),
                              borderSkipped: 'bottom'
                          }
                        },
                        scales: {
                          xAxes: [{
                            stacked: true,
                            gridLines: {
                                tickColor: "#fff",
                                tickLength: 12,
                                display: false
                            },
                            ticks: {
                              fontSize: innerWidth > 640　? convert(16) : convert(11),
                              fontColor: "#333",
                              fontWeight: "bold",
                              fontFamily: "std",
                              padding: convert(10),
                              maxRotation: 0,
                              minRotation: 0
                            }
                          }],
                          yAxes: [{
                              id: "y-axis-1",   // Y軸のID
                              stacked: false,
                              gridLines: {
                                color: "#ddd",
                                drawBorder: false,
                                zeroLineColor: "#ddd"
                              },
                              ticks: {
                                  fontSize: innerWidth > 640　? convert(16) : convert(11),
                                  fontColor: "#333",
                                  fontFamily: "std",
                                  padding: convert(10),
                                  beginAtZero: true,
                                  autoSkip: false,
                                  ...axesData4,
                                  callback: convertNotation
                              }
                          }]
                        },
                        legend: {
                          display: false
                        },
                        tooltips: {
                            enabled: false,
                            custom: function(tooltipModel) {
                  
                              // ツールチップ要素
                              const tooltipEl = document.getElementById('chartjs-tooltip');
                  
                              // ツールチップがない場合は非表示
                              if (tooltipModel.opacity === 0) {
                                  tooltipEl.style.opacity = "0";
                                  return;
                              };
                  
                              // キャレット(ツールチップが指し示すもの)の位置を設定する
                              tooltipEl.classList.remove('above', 'below', 'no-transform');
                              if (tooltipModel.yAlign) {
                                  tooltipEl.classList.add(tooltipModel.yAlign);
                              } else {
                                  tooltipEl.classList.add('no-transform');
                              };
                  
                              function getBody(bodyItem) {
                                  return bodyItem.lines;
                              };
                  
                              let props_title: string;
                              let props_text: string;
                              let props_count: string;
                              let props_color: string;
                              let micro: boolean;
                  
                              // テキストを設定する
                              if (tooltipModel.body) {
                                  var titleLines = tooltipModel.title || [];
                                  var bodyLines = tooltipModel.body.map(getBody);
                  
                                  titleLines.forEach(function(title) {
                                      props_title = title;
                                  });
                  
                                  bodyLines.forEach(function(body, i) {
                  
                                      props_text = body[0].split(": ")[0];
                                      props_count = convertNotation(Number(body[0].split(": ")[1]));
                  
                                      props_color = tooltipModel.labelColors[i].backgroundColor;
                                      micro = false;
                                  });
                                  
                                  tooltipEl.innerHTML =
                                  `<div class="c-tooltip__inner" style="border: 0.15625vw solid ${props_color}">
                                      <span>${props_title}</span>
                                      <div class="flex-wrapper">
                                          <span class="${micro ? "color-block" : "color-block-micro"}" style="background-color: ${props_color}"></span>
                                          <span>${props_text}</span>
                                          <span class="c-tooltip__count" style="color: ${props_color}">${props_count}</span>
                                      </div>
                                  </div>`;
                              };
                  
                              // `this` はツールチップ全体です
                              var position = this._chart.canvas.getBoundingClientRect();
                  
                              // 表示、配置、およびフォントスタイルの設定
                              tooltipEl.style.opacity = "1";
                              tooltipEl.style.position = 'absolute';
                              tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                              tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                              tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
                              tooltipEl.style.fontSize = tooltipModel.bodyFontSize;
                              tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
                              tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                              tooltipEl.style.pointerEvents = 'none';
                          }
                        },
                        layout: {
                          padding: {
                            left: -6,
                            right: -6
                          }
                        }
                      }
                    };
    
                    convertSpSize(chartOptions4);

                    let myChart4 = new Chart(ctx, chartOptions4 as any);
    
                    window.addEventListener("resize", (): void => {
                        myChart4.destroy();
                        drawChart();
                    });
          
            default:
              break;
          }
        };

        drawChart();
      }

      // jsonデータを取得
      axios({
          method: "get",
          url: `${getAssetsPath("json")}chart.json`,
          responseType: "json"
      })
      .then((res) => {
          // 取得したcreateIDに応じて処理を分岐
          chartSchema = res.data.chart;
          start();
      });

    };
    
    static copyYAxisImage (self,chart): void {

      const cvsYAxis1:HTMLCanvasElement = (<HTMLElement>chart.canvas.parentNode.parentNode.parentNode).querySelector("canvas.js-yAxis1");
      const cvsYAxis2:HTMLCanvasElement = (<HTMLElement>chart.canvas.parentNode.parentNode.parentNode).querySelector("canvas.js-yAxis2");

      // Y軸のスケール情報
      const yAxScale1 = chart.scales['y-axis-1'];
      const yAxScale2 = chart.scales['y-axis-2'];

      if(!this.prototype._isSP) {
        cvsYAxis1.width = 0;
        cvsYAxis1.style.width = "0px";
        if(yAxScale2){
          cvsYAxis2.width = 0;
          cvsYAxis2.style.width = "0px";
        }
        return;
      }
      // chart.options.scales.yAxes[0].ticks.fontColor = 'rgba(0,0,0,1)';
      // if(yAxScale2){
      //   chart.options.scales.yAxes[1].ticks.fontColor = 'rgba(0,0,0,1)';
      // }
      // chart.update();

      const cvsChart:HTMLCanvasElement = chart.canvas;
      // グラフ描画後は、canvas.width(height):canvas.style.width(height) 比は、下記 scale の値になっている
      const scale = window.devicePixelRatio;

      // Y軸部分としてグラフからコピーすべき幅
      const yAxisStyleWidth0_1 = yAxScale1.width - 10;

      // canvas におけるコピー幅(yAxisStyleWidth0を直接使うと微妙にずれるので、整数値に切り上げる)
      const copyWidth1 = Math.ceil(yAxisStyleWidth0_1 * scale);

      // Y軸canvas の幅(右側に少し空白部を残す)
      const yAxisCvsWidth1 = copyWidth1;

      // 実際の描画幅(styleに設定する)
      const yAxisStyleWidth1 = yAxisCvsWidth1 / scale;

      // Y軸部分としてグラフからコピーすべき高さ
      const yAxisStyleHeight1 = yAxScale1.height + yAxScale1.top + 10;

      // canvas におけるコピー高
      const copyHeight1 = yAxisStyleHeight1 * scale;

      // Y軸canvas の高さ
      const yAxisCvsHeight1 = copyHeight1;

      // Y軸canvas の幅と高さを設定
      cvsYAxis1.width = yAxisCvsWidth1;
      cvsYAxis1.height = yAxisCvsHeight1;

      // Y軸canvas.style(実際に描画される大きさ)の幅と高さを設定
      cvsYAxis1.style.width = yAxisStyleWidth1 + "px";
      cvsYAxis1.style.height = yAxisStyleHeight1 + "px";
      cvsYAxis1.style.left = "0px";

      // グラフcanvasからY軸部分のイメージをコピーする
      const ctxYAxis1 = cvsYAxis1.getContext('2d');
      ctxYAxis1.drawImage(cvsChart, 0, 0, copyWidth1, copyHeight1, 0, 0, copyWidth1, copyHeight1);

      // 軸ラベルのフォント色を透明に変更して、以降、再表示されても見えないようにする
      // chart.options.scales.yAxes[0].ticks.fontColor = 'rgba(0,0,0,0)';

      // y軸2本目があった場合
      let yAxisStyleWidth2 = 0;
      let yAxisStyleHeight2 = 0;
      if(yAxScale2){
        const yAxisStyleWidth0_2 = yAxScale2.width - 10;
        const copyWidth2 = Math.ceil(yAxisStyleWidth0_2 * scale);
        const yAxisCvsWidth2 = copyWidth2;
        yAxisStyleWidth2 = yAxisCvsWidth2 / scale;
        yAxisStyleHeight2 = yAxScale2.height + yAxScale2.top + 10;
        const copyHeight2 = yAxisStyleHeight2 * scale;
        const yAxisCvsHeight2 = copyHeight2;
        cvsYAxis2.width = yAxisCvsWidth2;
        cvsYAxis2.height = yAxisCvsHeight2;
        cvsYAxis2.style.width = yAxisStyleWidth2 + "px";
        cvsYAxis2.style.height = yAxisStyleHeight1 + "px";
        cvsYAxis2.style.right = "0px";
        const ctxYAxis2 = cvsYAxis2.getContext('2d');
        ctxYAxis2.drawImage(cvsChart, cvsChart.width - copyWidth2, 0, copyWidth2, copyHeight2, cvsYAxis2.width - copyWidth2, 0, copyWidth2, copyHeight2);
        // chart.options.scales.yAxes[1].ticks.fontColor = 'rgba(0,0,0,0)';
      }

      chart.update();
      // 最初に描画されたグラフのY軸ラベル部分をクリアする
      cvsChart.getContext('2d').clearRect(0, 0, yAxisStyleWidth1, yAxisStyleHeight1);
      if(yAxScale2){
        cvsChart.getContext('2d').clearRect(cvsChart.width - yAxisStyleWidth2, 0, yAxisStyleWidth2, yAxisStyleHeight2);
      }
    }
}