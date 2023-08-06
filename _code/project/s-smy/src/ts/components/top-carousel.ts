import { vw, convert } from "../utility/utils";
import SetDelayPageTransition from "./setDelayPageTransition";
import { carouselData, CarouselData } from "../config/data/carouselData";
import SmoothScroll from "./smoothScroll";
import GetLang from "./getLang";
import { assetsPath } from "../config/config";

export default class TopCarousel {

    private _progressBarWrappers: [HTMLElement, HTMLElement];
    private _progressBar: [HTMLElement, HTMLElement];
    private _backgroundSquare: [HTMLElement, HTMLElement];
    private _carouselData: CarouselData[];
    private _controlerButtonTexts: string[];
    private _carousel: HTMLElement;
    private _carouselElem_first: HTMLElement;
    private _carouselElem_second: HTMLElement;
    private _pointer: HTMLElement;
    private _controller: HTMLElement;
    private _controller_DOMLists: NodeList;
    private _anchorList: [HTMLElement, HTMLElement];
    private _controllerBtns: [HTMLElement, HTMLElement];
    private _dusts: NodeList;
    private _scrollTrigger: HTMLElement;
    private _jumbotrinImages: HTMLImageElement[];
    private _copyrights: HTMLElement[];
    private _lang: boolean;

    private _startX: number;
    private _diffX: number;
    private CONTROL_AVAILABLE: boolean;
    private THRESHOLD: number;

    private _smoothScrollClass: SmoothScroll;

    constructor() {
        console.log("[class] - TopCarousel.setup");
        this.init();
    }

    init(): void {

        // init
        let flg: boolean = true;
        let loopCount: number = 0;
        this._carousel = document.getElementById("js-top-carousel");
        this._carouselElem_first = document.getElementById("js-carousel-first");
        this._carouselElem_second = document.getElementById("js-carousel-second");
        this._progressBar = [document.getElementById("js-progress-bar-first"), document.getElementById("js-progress-bar-second")];
        this._backgroundSquare = [document.getElementById("js-bg-square-main"), document.getElementById("js-bg-square-sub")];
        this._pointer = document.getElementById("js-carousel-pointer");
        this._anchorList = [document.getElementById("js-anchorlink-list-first"), document.getElementById("js-anchorlink-list-second")];
        this._controllerBtns = [document.getElementById("js-carousel-prev"), document.getElementById("js-carousel-next")];
        this._controller = document.getElementById("js-controller-container");
        this._progressBarWrappers = [document.getElementById("js-progress-bar-first-body"), document.getElementById("js-progress-bar-second-body")];
        this._carouselData = carouselData;
        this._lang = GetLang.getLang();

        this._startX = 0;
        this._diffX = 0;
        this.CONTROL_AVAILABLE = false;
        this.THRESHOLD = 160;

        this._smoothScrollClass = new SmoothScroll();

        this._controlerButtonTexts = 

        this._lang ? 
        [
            "セガサミーについて",
            "事業",
            "市場動向",
            "業績・株主還元",
            "SS通信",
            "感動体験レポート"
        ] : [
            'About <br class="u-is-pc">SEGA SAMMY',
            'Business',
            'Market <br class="u-is-pc">Trend',
            'Results/<br class="u-is-pc">Return',
            'SS Report',
            'Interviews'
        ];

        // コントローラーを生成
        this.createControler();

        // カルーセル画像を非同期で取得
        // this.getjumbotronImages();

        // 初回ロード後1000sで属性削除
        setTimeout(() => {
            this.removeAttributes();
        }, 1000);
        
        this._controller_DOMLists = document.getElementById("js-carousel-pointer-container").querySelectorAll("li");
        this._dusts = document.getElementById("js-carousel-dusts").querySelectorAll("svg");
        this._scrollTrigger = document.getElementById("js-scroll-trigger");
        this._jumbotrinImages = [];
        this._copyrights = [document.getElementById("js-carousel-copyright_1"), document.getElementById("js-carousel-copyright_2")];

        this.setControlerArrow(0);
        this.initControlerDomListPosition();
        
        // コントローラーポインターの初期位置を設定
        this.initPointerPosition();

        const countUp = (arg?: number): void => {

            // 現在と同じ数値の場合処理終了
            if (loopCount === arg) return;
        
            // ループ用の数値の処理
            if (arg) {
                loopCount = arg;
            } else if (arg === 0) {
                loopCount = 0;
            } else {
                loopCount += 1;
            };

            if (loopCount > 5) {
                loopCount = 0;
            };

            this.setControlerArrow(loopCount);
            this.setSpControlerListPosition(loopCount);

            // 同じDOMコンテナ2種類を表示切り替え
            if (!flg) {

                if (!(innerWidth > 640)) {
                    if (loopCount === 5) {
                        this._carouselElem_first.style.height = convert(250) + "px"
                    } else {
                        this._carouselElem_first.style.height = convert(220) + "px"
                    }
                }

                // change contents
                this._carouselElem_second.classList.remove("carousel-fade-in");
                this._carouselElem_second.classList.add("carousel-fade-out");

                this._carouselElem_first.classList.remove("is-hide");
                this._carouselElem_first.classList.remove("carousel-fade-out");
                this._carouselElem_first.classList.add("carousel-fade-in");
                
                // 各イベントリスナ削除
                document.removeEventListener("scroll", scrollTriggerFunction);

                // タイマーをセット
                setProgressBar(this._progressBar[0]);

                this._backgroundSquare[0].style.background = `#${this._carouselData[loopCount].backgroundColor[1]}`;
                this._backgroundSquare[1].style.background = `#${this._carouselData[loopCount].backgroundColor[0]}`;

                this._progressBarWrappers[0].removeAttribute("style");
                this._progressBarWrappers[0].style.background = 
                `linear-gradient(45deg, #${this._carouselData[loopCount].backgroundColor[0]}, #${this._carouselData[loopCount].backgroundColor[1]})`;

                this._carouselElem_first.querySelector("h2").innerHTML = this._carouselData[loopCount].title;
                this._carouselElem_first.querySelector(".js-carousel-link").querySelectorAll("img").forEach(el => el.remove())
                this._carouselData[loopCount].imagePath.forEach(path => {
                    const _imgEl = document.createElement("img")
                    _imgEl.src = path
                    this._carouselElem_first.querySelector(".js-carousel-link").appendChild(_imgEl)
                })
                this._carouselElem_first.querySelector("img").removeAttribute("class");
                if (loopCount !== 4) {
                    this._carouselElem_first.querySelector("img").classList.add(this._carouselData[loopCount].imageClass)
                } else {
                    this._carouselElem_first.querySelectorAll("img").forEach((el, index) => el.classList.add("c-carousel__jumbotron--5__" + (index + 1)))
                }
                this._carouselElem_first.querySelector(".js-carousel-link").setAttribute("href", this._carouselData[loopCount].pageLink);
                if (this._carouselData[loopCount].firstIcon) {
                    this._carouselElem_first.querySelector("h2").classList.add("first-carousel");
                } else {
                    this._carouselElem_first.querySelector("h2").classList.remove("first-carousel");
                };

                // コピーライト差し替え
                this._copyrights[0].innerText = this._carouselData[loopCount].copyright;

                // newIcon非表示
                if (document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon")) {
                    document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon").classList.add("is-hide");
                }

                if (document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon--ss")) {
                    document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon--ss").classList.add("is-hide");
                }

                // アンカーリンク差し替え & newIcon表示
                this._anchorList[0].innerHTML = "";
                if (this._carouselData[loopCount].link.length === 0) {
                   if (loopCount === 4) {
                       if (document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon--ss")) {
                        document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon--ss").classList.remove("is-hide");
                    　　}
                   } else if (loopCount === 5) {
                       this._anchorList[0].innerHTML = 
                       this._lang ? 
                       `<p class="c-anchorlink__text">ここでしかご覧いただけない開発の舞台裏などを<br>インタビュー形式でご紹介します。</p>` :
                       `<p class="c-anchorlink__text">You can find the interviews like behind-the-scene of the development process and others here.</p>`;

                       if (document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon")) {
                            document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon").classList.remove("is-hide");
                       }
                   }
                } else {
                   for (let i = 0; i < this._carouselData[loopCount].link.length; i++) {
                        const create_ul = document.createElement("ul");
                        create_ul.classList.add("c-anchorlink__list");
                        this._anchorList[0].appendChild(create_ul);
                        this._anchorList[0].querySelector("ul").innerHTML +=
                        `<li class="c-anchorlink__list--item">
                            <a href="${this._carouselData[loopCount].link[i].path}">
                                ${this._carouselData[loopCount].link[i].text}
                                <img src=${loopCount === 0 ? assetsPath + "anchor-list-arrow.svg" : assetsPath + "anchor-list-arrow-other.svg"} class=${loopCount === 0 ? "" : "c-anchorlink__list--item--other-icon"} alt="${this._carouselData[loopCount].alt}">
                            </a>
                        </li>`;
                    };
                };
                if (this._carouselData[loopCount].imageClass === "c-carousel__jumbotron--5") {
                    if (document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon--ss")) {
                        document.getElementsByClassName("js-new-icon-sp")[0].querySelector(".c-newicon--ss").classList.remove("is-hide");
                    　　}
                }
                

                // dustsの色変える
                for (let i = 0; i < this._dusts.length; i++) {
                    const dust: HTMLElement = this._dusts[i] as HTMLElement;
                    const svgPath: SVGPathElement = dust.querySelector("path");
                    if( ( i % 2 ) == 0 ) {
                        svgPath.style.fill = `#${this._carouselData[loopCount].backgroundColor[1]}`;
                    } else {
                        svgPath.style.fill = `#${this._carouselData[loopCount].backgroundColor[0]}`;
                    };
                };

                // controle pointer moving
                if (innerWidth > 640) {
                    const typeAs__controller_DOM: HTMLElement = this._controller_DOMLists[loopCount] as HTMLElement;
                    const offsetSize: number = typeAs__controller_DOM.offsetLeft / innerWidth * 100;
                    const targetSize: number = (typeAs__controller_DOM.clientWidth / 2) / innerWidth * 100;
                    const negativeSize: number = (this._pointer.clientWidth / 2) / innerWidth * 100;
                    this._pointer.style.left = `${targetSize + offsetSize - negativeSize}vw`;
                    this._pointer.style.background = 
                    `linear-gradient(45deg, #${this._carouselData[loopCount].backgroundColor[0]}, #${this._carouselData[loopCount].backgroundColor[1]})`;
                } else {
                    this._pointer.style.background = 
                    `linear-gradient(45deg, #${this._carouselData[loopCount].backgroundColor[0]}, #${this._carouselData[loopCount].backgroundColor[1]})`;
                };

                // 別ページのアンカーリンクを一旦キャンセルし、history.pushで遷移
                SetDelayPageTransition.set(this._carouselElem_first);

                flg = true;

            } else {

                if (!(innerWidth > 640)) {
                    if (loopCount === 5) {
                        this._carouselElem_second.style.height = convert(220) + "px"
                    } else {
                        this._carouselElem_second.style.height = convert(220) + "px"
                    }
                }

                // change contents
                this._carouselElem_first.classList.remove("carousel-fade-in");
                this._carouselElem_first.classList.add("carousel-fade-out");

                this._carouselElem_second.classList.remove("is-hide");
                this._carouselElem_second.classList.remove("carousel-fade-out");
                this._carouselElem_second.classList.add("carousel-fade-in");

                // 各イベントリスナ削除
                document.removeEventListener("scroll", scrollTriggerFunction);

                // タイマーをセット
                setProgressBar(this._progressBar[1]);

                this._backgroundSquare[0].style.background = `#${this._carouselData[loopCount].backgroundColor[1]}`;
                this._backgroundSquare[1].style.background = `#${this._carouselData[loopCount].backgroundColor[0]}`;

                this._progressBarWrappers[1].removeAttribute("style");
                this._progressBarWrappers[1].style.background = 
                `linear-gradient(45deg, #${this._carouselData[loopCount].backgroundColor[0]}, #${this._carouselData[loopCount].backgroundColor[1]})`;

                this._carouselElem_second.querySelector("h2").innerHTML = this._carouselData[loopCount].title;
                this._carouselElem_second.querySelector(".js-carousel-link").querySelectorAll("img").forEach(el => el.remove())
                this._carouselData[loopCount].imagePath.forEach(path => {
                    const _imgEl = document.createElement("img")
                    _imgEl.src = path
                    this._carouselElem_second.querySelector(".js-carousel-link").appendChild(_imgEl)
                })
                this._carouselElem_second.querySelector("img").removeAttribute("class");
                if (loopCount !== 4) {
                    this._carouselElem_second.querySelector("img").classList.add(this._carouselData[loopCount].imageClass)
                } else {
                    this._carouselElem_second.querySelectorAll("img").forEach((el, index) => el.classList.add("c-carousel__jumbotron--5__" + (index + 1)))
                }
                this._carouselElem_second.querySelector(".js-carousel-link").setAttribute("href", this._carouselData[loopCount].pageLink);
                if (this._carouselData[loopCount].firstIcon) {
                    this._carouselElem_second.querySelector("h2").classList.add("first-carousel");
                } else {
                    this._carouselElem_second.querySelector("h2").classList.remove("first-carousel");
                };

                // コピーライト差し替え
                this._copyrights[1].innerText = this._carouselData[loopCount].copyright;

                // newIcon非表示
                if (document.getElementsByClassName("js-new-icon-sp")[1].querySelector(".c-newicon")) {
                    document.getElementsByClassName("js-new-icon-sp")[1].querySelector(".c-newicon").classList.add("is-hide");
                };

                // アンカーリンク差し替え & newIcon表示
                this._anchorList[1].innerHTML = "";
                if (this._carouselData[loopCount].link.length === 0) {
                   if (loopCount === 4) {
                       if (document.getElementsByClassName("js-new-icon-sp")[1].querySelector(".c-newicon--ss")) {
                            document.getElementsByClassName("js-new-icon-sp")[1].querySelector(".c-newicon--ss").classList.remove("is-hide");
                       }
                   } else if (loopCount === 5) {
                       this._anchorList[1].innerHTML =
                       this._lang ? 
                       `<p class="c-anchorlink__text">ここでしかご覧いただけない開発の舞台裏などを<br>インタビュー形式でご紹介します。</p>` :
                       `<p class="c-anchorlink__text">You can find the interviews like behind-the-scene of the development process and others here.</p>`;

                       if (document.getElementsByClassName("js-new-icon-sp")[1].querySelector(".c-newicon")) {
                            document.getElementsByClassName("js-new-icon-sp")[1].querySelector(".c-newicon").classList.remove("is-hide");
                       }
                   }
                } else {
                   for (let i = 0; i < this._carouselData[loopCount].link.length; i++) {
                        const create_ul = document.createElement("ul");
                        create_ul.classList.add("c-anchorlink__list");
                        this._anchorList[1].appendChild(create_ul);
                        this._anchorList[1].querySelector("ul").innerHTML +=
                        `<li class="c-anchorlink__list--item">
                            <a href="${this._carouselData[loopCount].link[i].path}">
                                ${this._carouselData[loopCount].link[i].text}
                                <img src=${loopCount === 0 ? assetsPath + "anchor-list-arrow.svg" : assetsPath + "anchor-list-arrow-other.svg"} class=${loopCount === 0 ? "" : "c-anchorlink__list--item--other-icon"} alt="${this._carouselData[loopCount].alt}">
                            </a>
                        </li>`;
                    };
                };

                // dustsの色変える
                for (let i = 0; i < this._dusts.length; i++) {
                    const dust: HTMLElement = this._dusts[i] as HTMLElement;
                    const svgPath: SVGPathElement = dust.querySelector("path");
                    if ( ( i % 2 ) == 0 ) {
                        svgPath.style.fill = `#${this._carouselData[loopCount].backgroundColor[1]}`;
                    } else {
                        svgPath.style.fill = `#${this._carouselData[loopCount].backgroundColor[0]}`;
                    };
                };
                
                // controle pointer moving.
                if (innerWidth > 640) {
                    const typeAs__controller_DOM: HTMLElement = this._controller_DOMLists[loopCount] as HTMLElement;
                    const offsetSize: number = typeAs__controller_DOM.offsetLeft / innerWidth * 100;
                    const targetSize: number = (typeAs__controller_DOM.clientWidth / 2) / innerWidth * 100;
                    const negativeSize: number = (this._pointer.clientWidth / 2) / innerWidth * 100;
                    this._pointer.style.left = `${targetSize + offsetSize - negativeSize}vw`;
                    this._pointer.style.background = 
                    `linear-gradient(45deg, #${this._carouselData[loopCount].backgroundColor[0]}, #${this._carouselData[loopCount].backgroundColor[1]})`;
                } else {
                    this._pointer.style.background = 
                    `linear-gradient(45deg, #${this._carouselData[loopCount].backgroundColor[0]}, #${this._carouselData[loopCount].backgroundColor[1]})`;
                };

                // 別ページのアンカーリンクを一旦キャンセルし、history.pushで遷移
                SetDelayPageTransition.set(this._carouselElem_second);

                flg = false;
            };
        };

        // スコープ外から変数を定義
        let scrollTriggerFunction: () => void;
        let prevControler: () => void;
        let nextControler: () => void;
        let moveControler: (i: number) => void;
        
        // プログレスバーを作動させる関数
        const setProgressBar = (elem: HTMLElement): void => {

            const limit: number = 1500;
            const barPixel: number = innerWidth > 640 ? (innerWidth / 100) * vw(440) : innerWidth;
            let count: number = 0;
            let progressBarCount: number = innerWidth > 640 ? (innerWidth / 100) * vw(440) : innerWidth;
            let timerId: any;

            const startTimer = (): void => {

                count += 1;

                if ((count % (limit / 100)) === 0) {
                    progressBarCount -= barPixel / 100;
                    elem.style.width = `${progressBarCount}px`;
                };

                timerId = setTimeout(startTimer, 1);
    
                if (count >= limit) {
                    clearTimeout(timerId);
                    countUp();
                };
            };

            startTimer();

            let stopFlg = false;
            let startFlg = false;
            let initFlg = false;

            const stopTimer = (): void => {
                clearTimeout(timerId);
            };

            scrollTriggerFunction = (): void => {
                if(0 > this._scrollTrigger.getBoundingClientRect().top && !stopFlg) {
                    stopFlg = true;
                    initFlg = true;
                    stopTimer();
                    this._controller.style.pointerEvents = "none";
                    this._backgroundSquare[0].style.background = `#${this._carouselData[0].backgroundColor[1]}`;
                    this._backgroundSquare[1].style.background = `#${this._carouselData[0].backgroundColor[0]}`;
                } else if (0 < this._scrollTrigger.getBoundingClientRect().top && !startFlg && initFlg) {
                    startFlg = false;
                    stopFlg = false;
                    initFlg = false;
                    startTimer();
                    this._controller.style.pointerEvents = "auto";
                    this._backgroundSquare[0].style.background = `#${this._carouselData[loopCount].backgroundColor[1]}`;
                    this._backgroundSquare[1].style.background = `#${this._carouselData[loopCount].backgroundColor[0]}`;
                };
            };

            prevControler = (): void => {
                let _loopCount: number;
                if (loopCount === 0) {
                    _loopCount = this._carouselData.length - 1;
                } else {
                    _loopCount = loopCount - 1;
                };
                stopTimer();
                countUp(_loopCount);
            };

            nextControler = (): void => {
                let _loopCount: number;
                if (loopCount === this._carouselData.length - 1) {
                    _loopCount = 0;
                } else {
                    _loopCount = loopCount + 1;
                };
                stopTimer();
                countUp(_loopCount);
            };

            moveControler = (i: number): void => {

                // 現在と同じ数値の場合処理終了
                if (loopCount === i) {
                  let _currentContainer: Element = null;
                  _currentContainer = this._carousel.querySelectorAll(".carousel-fade-in")[0];
                  if(!_currentContainer) {
                    _currentContainer = this._carousel.querySelectorAll(".c-carousel__container--first")[0];
                  };
                  const _target: string = _currentContainer.querySelectorAll(".js-carousel-link")[0].getAttribute("href");
                  if(_target.match(/^#/)) {
                    this._smoothScrollClass.scrollWindow(_target,{ offset: -100, duration: 500 })
                  } else {
                    location.href = _target;
                  }
                  return;
                };

                stopTimer();
                countUp(i);
            };
            
            document.addEventListener("scroll", scrollTriggerFunction); // スクロールイベント設定
            this._controllerBtns[0].onclick = prevControler; // prevボタンにクリックイベント設定
            this._controllerBtns[1].onclick = nextControler; // nextボタンにクリックイベント設定

            // 各カルーセルに移動するボタンにイベント設定
            for (let i = 0; i < this._controller_DOMLists.length; i++) {
                const __elem: HTMLElement = this._controller_DOMLists[i] as HTMLElement;
                __elem.onclick = (): void => moveControler(i);
            };
        };
        const touchHandler = (e) => {
          const touch = e.touches[0];
          if (e.type === "touchstart") {
            this.CONTROL_AVAILABLE = true;
            this._startX = touch.pageX;
          } else if (e.type === "touchmove") {
            if (this.CONTROL_AVAILABLE) {
              this._diffX = this._startX - touch.pageX;
            }
          } else if (e.type === "touchend") {
            if ( this._diffX <  - this.THRESHOLD) {
              // prev
              prevControler();
            } else if ( this._diffX >  this.THRESHOLD) {
              // next
              nextControler();
            }
            this.CONTROL_AVAILABLE = false;
            this._diffX = 0;
          }
        }
        this._carousel.addEventListener("touchstart",touchHandler,false);
        this._carousel.addEventListener("touchmove",touchHandler,false);
        this._carousel.addEventListener("touchend",touchHandler,false);

        window.addEventListener("resize", (): void => {
            if (innerWidth > 640) {
            } else {
                this._pointer.style.left = "0";
            };
        });

        // プログレスバー初期化
        setProgressBar(this._progressBar[0]);
    };

    private initPointerPosition (): void {

        if (innerWidth > 640) {

            const typeAs__controller_DOM: HTMLElement = this._controller_DOMLists[0] as HTMLElement;
            const offsetSize: number = typeAs__controller_DOM.offsetLeft / innerWidth * 100;
            const targetSize: number = (typeAs__controller_DOM.clientWidth / 2) / innerWidth * 100;
            const negativeSize: number = (this._pointer.clientWidth / 2) / innerWidth * 100;
            this._pointer.style.left = `${targetSize + offsetSize - negativeSize}vw`;

        } else {
            this._pointer.style.left = "0";
        };

        this._pointer.style.transition = "0.2s";
    };

    private initControlerDomListPosition (): void {

        if (innerWidth < 640) {
            const typeAs_element: HTMLElement = this._controller.querySelector("#js-carousel-pointer-container") as HTMLElement;
            const first_child: HTMLElement = this._controller_DOMLists[0] as HTMLElement;
            const pos: number = first_child.clientWidth / 2;
            typeAs_element.style.left = `${(innerWidth / 2 - pos) / innerWidth * 100}vw`;
        };
    };

    private createControler (): void {

        this._controller.querySelector("#js-carousel-pointer-container").innerHTML = "";

        // コントローラーボタンを生成
        for (let i = 0; i < this._controlerButtonTexts.length; i++) {

            if (this._controlerButtonTexts.length - 2 === i) {
                this._controller.querySelector("#js-carousel-pointer-container").innerHTML +=
                `<li id="js-new-icon-pc-ss">
                    <span class="list-inner">
                        ${this._controlerButtonTexts[i]}
                    </span>
                </li>`;

                continue;
            }

            if (this._controlerButtonTexts.length - 1 === i) {
                this._controller.querySelector("#js-carousel-pointer-container").innerHTML +=
                `<li id="js-new-icon-pc">
                    <span class="list-inner">
                        ${this._controlerButtonTexts[i]}
                    </span>
                </li>`;

                continue;
            }

            this._controller.querySelector("#js-carousel-pointer-container").innerHTML +=
            `<li>
                <span class="list-inner">
                    ${this._controlerButtonTexts[i]}
                </span>
            </li>`;
        };
    };

    private setSpControlerListPosition (count: number): void {

        const startPos: number = innerWidth / 2;
        let totalPos: number = 0;

        if (count === 0) {

            const typeAs_Element: HTMLElement = this._controller_DOMLists[count] as HTMLElement;
            totalPos = typeAs_Element.clientWidth / 2 ;

        } else {

            for (let i = 0; i < count; i++) {
                const typeAs_Element: HTMLElement = this._controller_DOMLists[i] as HTMLElement;
                totalPos += typeAs_Element.clientWidth;
    
                if (count - 1 === i) {
                    const _typeAs_Element: HTMLElement = this._controller_DOMLists[i + 1] as HTMLElement;
                    totalPos += _typeAs_Element.clientWidth / 2 ;
                }
            };
        }

        totalPos = startPos - totalPos;

        document.getElementById("js-carousel-pointer-container").style.left = `${totalPos / innerWidth * 100}vw`;
    };

    private setControlerArrow (count: number): void {
        const imgs: [HTMLElement, HTMLElement] = [this._controllerBtns[0].querySelectorAll("img")[0], this._controllerBtns[1].querySelectorAll("img")[0]];
        const imgs_sp: [HTMLElement, HTMLElement] = [this._controllerBtns[0].querySelectorAll("img")[1], this._controllerBtns[1].querySelectorAll("img")[1]];

        if (innerWidth > 640) {
            imgs[0].style.display = "block";
            imgs[1].style.display = "block";
            imgs_sp[0].style.display = "none";
            imgs_sp[1].style.display = "none";
        } else {
          imgs[0].style.display = "none";
          imgs[1].style.display = "none";
          imgs_sp[0].style.display = "block";
          imgs_sp[1].style.display = "block";
        };
    };

    private removeAttributes (): void {
        this._carouselElem_first.querySelector(".u-carousel-img-animation")
            .removeAttribute("style");
    };

    private getjumbotronImages (): void {

        const imagePaths: string[] = [
            "../images/01_mv.png",
            "../images/02_mv.png",
            "../images/03_mv.png",
            "../images/04_mv.png",
            "../images/05_mv.png",
            "../images/06_mv.png"
        ];

        for (let i = 0; i < imagePaths.length; i++) {
            const image: HTMLImageElement = new Image();
            image.src = imagePaths[i];
            image.onload = (): void => {
                this._jumbotrinImages.push(image);
            };
        };
    };
};
