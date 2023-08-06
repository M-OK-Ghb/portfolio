import ScrollReveal from "scrollreveal";
import { CountUp } from "countup.js";
import { getAssetsPath, lang } from "../config/config";
import ChartFactory from "./fetchers/chartFactory";
import axios from "axios";

interface Buisiness_countData {
    sonic_series: number;
    hokuto: number;
    juo: number;
    ryuga_gotoku: number;
}

export default class ScrollAnimation {

    private _rootAttr: string;

    constructor () {
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.init();
    };

    private init (): void {
        if (document.querySelector('[data-page]')) {
            this._rootAttr = document.querySelector('[data-page]').getAttribute("data-page");
        };

        switch (this._rootAttr) {
            case "top":
                this.setTopAnimation();
                this.top_beforeIntegration_FadeIn();
                this.top_afterIntegration_FadeIn_Right();
                this.top_afterIntegration_FadeIn_left();
                break;

                case "business":
                    this.setBusinessAnimation();
                    break;

                    case "business":
                        this.setBusinessAnimation();
                        break;

                        case "market":
                            this.canvas_fadeIn_toTop_1();
                            this.canvas_fadeIn_toTop_2();
                            break;

                            case "operating-results":
                                this.canvas_fadeIn_toTop_3();
                                this.canvas_fadeIn_toTop_4();
                                break;

            default:
                break;
        }
        
        this.common_navigator();
        this.common_fadeIn_toTop();
        this.common_fadeIn_toRight_d350();

        this.setCount();
    };

    public setCount () {

        // jsonデータを取得
        axios({
            method: "get",
            url: `${getAssetsPath("json")}data.json`,
            responseType: "json"
        })
        .then((res) => {
            this.common_fadeIn_toTop_d500_1(res.data["business_countdata"][lang ? "jp" : "en"]);
            this.common_fadeIn_toTop_d500_2(res.data["business_countdata"][lang ? "jp" : "en"]);
            this.common_fadeIn_toTop_d500_3(res.data["business_countdata"][lang ? "jp" : "en"]);
            this.common_fadeIn_toTop_d500_4(res.data["business_countdata"][lang ? "jp" : "en"]);
        });
    };

    private setTopAnimation (): void {

        // before integration area
        const list_1 = document.getElementById("js-top-before-int").querySelectorAll("li");
        for (let i = 0; i < list_1.length; i++) {
            list_1[i].classList.add("js-scroll-box__top--before-int");
        };

        // after integration area
        const list_2 = document.getElementById("js-top-after-int").querySelectorAll("li");
        for (let i = 0; i < list_1.length + 1; i++) {
            if (i % 2 === 0) {
                list_2[i].classList.add("js-scroll-box__top--after-int-right");
            } else {
                list_2[i].classList.add("js-scroll-box__top--after-int-left");
            }
        };
    };

    private setBusinessAnimation (): void {};

    private top_beforeIntegration_FadeIn () {
        ScrollReveal().reveal('.js-scroll-box__top--before-int', { 
            duration: 800, // アニメーションの完了にかかる時間
            viewFactor: 0.2, // 0~1,どれくらい見えたら実行するか
            reset: false,   // 何回もアニメーション表示するか
            origin: 'bottom',
            distance: '30px',
          });
        };

        private top_afterIntegration_FadeIn_Right () {
            ScrollReveal().reveal('.js-scroll-box__top--after-int-right', { 
                duration: 800, // アニメーションの完了にかかる時間
                viewFactor: 0.2, // 0~1,どれくらい見えたら実行するか
                reset: false,   // 何回もアニメーション表示するか
                origin: 'right',
                distance: '30px',
              });
            };

            private top_afterIntegration_FadeIn_left () {
                ScrollReveal().reveal('.js-scroll-box__top--after-int-left', { 
                    duration: 800, // アニメーションの完了にかかる時間
                    viewFactor: 0.2, // 0~1,どれくらい見えたら実行するか
                    reset: false,   // 何回もアニメーション表示するか
                    origin: 'left',
                    distance: '30px',
                  });
                };

                private common_navigator () {
                    ScrollReveal().reveal('.js-scroll-box__navigator', { 
                        duration: 1200, // アニメーションの完了にかかる時間
                        viewFactor: 0.9, // 0~1,どれくらい見えたら実行するか
                        reset: false,   // 何回もアニメーション表示するか
                        origin: 'right',
                        distance: `200px`,
                        opacity: 0
                      });
                    };

                    private common_fadeIn_toTop () {
                        ScrollReveal().reveal('.js-scroll-box__to-top', { 
                            duration: 800, // アニメーションの完了にかかる時間
                            viewFactor: 0.2, // 0~1,どれくらい見えたら実行するか
                            reset: false,   // 何回もアニメーション表示するか
                            origin: 'bottom',
                            distance: '30px',
                          });
                        };

                        private canvas_fadeIn_toTop_1 () {
                            ScrollReveal().reveal('.js-scroll-canvas__to-top-1', { 
                                duration: 800, // アニメーションの完了にかかる時間
                                viewFactor: 0.5, // 0~1,どれくらい見えたら実行するか
                                reset: false,   // 何回もアニメーション表示するか
                                origin: 'bottom',
                                distance: '30px',
                                afterReveal: () => {
                                    ChartFactory.createChart("js-chart-bar_01");
                                }
                              });
                            };

                            private canvas_fadeIn_toTop_2 () {
                                ScrollReveal().reveal('.js-scroll-canvas__to-top-2', { 
                                    duration: 800, // アニメーションの完了にかかる時間
                                    viewFactor: 0.5, // 0~1,どれくらい見えたら実行するか
                                    reset: false,   // 何回もアニメーション表示するか
                                    origin: 'bottom',
                                    distance: '30px',
                                    afterReveal: () => {
                                        ChartFactory.createChart("js-chart-bar_02");
                                    }
                                  });
                                };

                                private canvas_fadeIn_toTop_3 () {
                                    ScrollReveal().reveal('.js-scroll-canvas__to-top-3', { 
                                        duration: 800, // アニメーションの完了にかかる時間
                                        viewFactor: 0.5, // 0~1,どれくらい見えたら実行するか
                                        reset: false,   // 何回もアニメーション表示するか
                                        origin: 'bottom',
                                        distance: '30px',
                                        afterReveal: () => {
                                            ChartFactory.createChart("js-chart-bar_03");
                                        }
                                      });
                                    };

                                    private canvas_fadeIn_toTop_4 () {
                                        ScrollReveal().reveal('.js-scroll-canvas__to-top-4', { 
                                            duration: 800, // アニメーションの完了にかかる時間
                                            viewFactor: 0.5, // 0~1,どれくらい見えたら実行するか
                                            reset: false,   // 何回もアニメーション表示するか
                                            origin: 'bottom',
                                            distance: '30px',
                                            afterReveal: () => {
                                                ChartFactory.createChart("js-chart-bar_04");
                                            }
                                          });
                                        };

                        private common_fadeIn_toTop_d500_1 (data: Buisiness_countData) {
                            ScrollReveal().reveal('.js-scroll-box__to-top--d500_1', { 
                                duration: 800, // アニメーションの完了にかかる時間
                                viewFactor: 0, // 0~1,どれくらい見えたら実行するか
                                reset: false,   // 何回もアニメーション表示するか
                                origin: 'bottom',
                                distance: '30px',
                                delay: 500,
                                beforeReveal: () => {
                                    const targetCountElem: HTMLElement = document.getElementById("js-countup-1");
                                    const options = {
                                          decimalPlaces: this.getFloatLength(data.sonic_series),
                                    };
                                    const countUpFunction = new CountUp(targetCountElem, data.sonic_series, options);
                                    setTimeout(() => {
                                        countUpFunction.start();
                                    }, 700);
                                }
                              });
                            };

                            private common_fadeIn_toTop_d500_2 (data: Buisiness_countData) {
                                ScrollReveal().reveal('.js-scroll-box__to-top--d500_2', { 
                                    duration: 800, // アニメーションの完了にかかる時間
                                    viewFactor: 0, // 0~1,どれくらい見えたら実行するか
                                    reset: false,   // 何回もアニメーション表示するか
                                    origin: 'bottom',
                                    distance: '30px',
                                    delay: 500,
                                    beforeReveal: () => {
                                        const targetCountElem: HTMLElement = document.getElementById("js-countup-2");
                                        const options = {
                                             decimalPlaces: this.getFloatLength(data.hokuto),
                                        };
                                        const countUpFunction = new CountUp(targetCountElem, data.hokuto, options);
                                        setTimeout(() => {
                                            countUpFunction.start();
                                        }, 700);
                                    }
                                  });
                                };

                                private common_fadeIn_toTop_d500_3 (data: Buisiness_countData) {
                                    ScrollReveal().reveal('.js-scroll-box__to-top--d500_3', { 
                                        duration: 800, // アニメーションの完了にかかる時間
                                        viewFactor: 0, // 0~1,どれくらい見えたら実行するか
                                        reset: false,   // 何回もアニメーション表示するか
                                        origin: 'bottom',
                                        distance: '30px',
                                        delay: 500,
                                        beforeReveal: () => {
                                            const targetCountElem: HTMLElement = document.getElementById("js-countup-3");
                                            const options = {
                                                 decimalPlaces: this.getFloatLength(data.juo),
                                            };
                                            const countUpFunction = new CountUp(targetCountElem, data.juo, options);
                                            setTimeout(() => {
                                                countUpFunction.start();
                                            }, 700);
                                        }
                                      });
                                    };

                                    private common_fadeIn_toTop_d500_4 (data: Buisiness_countData) {
                                        ScrollReveal().reveal('.js-scroll-box__to-top--d500_4', { 
                                            duration: 800, // アニメーションの完了にかかる時間
                                            viewFactor: 0, // 0~1,どれくらい見えたら実行するか
                                            reset: false,   // 何回もアニメーション表示するか
                                            origin: 'bottom',
                                            distance: '30px',
                                            delay: 500,
                                            beforeReveal: () => {
                                                const targetCountElem: HTMLElement = document.getElementById("js-countup-4");
                                                const options = {
                                                     decimalPlaces: this.getFloatLength(data.ryuga_gotoku),
                                                };
                                                const countUpFunction = new CountUp(targetCountElem, data.ryuga_gotoku, options);
                                                setTimeout(() => {
                                                    countUpFunction.start();
                                                }, 700);
                                            }
                                          });
                                        };

                                        private common_fadeIn_toRight_d350 () {
                                            ScrollReveal().reveal('.js-scroll-box__to-right--d350', { 
                                                duration: 800, // アニメーションの完了にかかる時間
                                                viewFactor: 0, // 0~1,どれくらい見えたら実行するか
                                                reset: false,   // 何回もアニメーション表示するか
                                                origin: 'right',
                                                distance: '30px',
                                                delay: 350
                                              });
                                            };

                                            private getFloatLength (number: number): number {
                                                if (number.toString().split(".")[1]) {
                                                    return number.toString().split(".")[1].length;
                                                } else {
                                                    return 0;
                                                }
                                            };
}