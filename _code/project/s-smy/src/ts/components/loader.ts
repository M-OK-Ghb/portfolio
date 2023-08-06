import gsap, { Power1 } from "gsap";
import GetNewInterviewIcon from "./fetchers/getNewInterviewIcon";
import GetNewSsreportIcon from "./fetchers/getNewSsreportIcon";
import TopCarousel from "./top-carousel";

export default class Loader {

    private _loader: HTMLElement;
    private _ornaments: any;
    private _dusts: HTMLElement;
    private _carouselImg: HTMLElement;

    constructor () {
        console.log(`[class] - ${this.constructor.name}.setup`);
        this.init();
    };

    private init () {

        // property init
        this._loader = document.querySelector(".js-loader");
    
        this._ornaments = {
            wrapper: document.querySelector(".js-loader-content"),
            sonic: {
                wrapper: document.querySelector(".js-loader-sonic"),
                items: document.querySelectorAll(
                    ".js-loader-sonic .js-loader-item-rhombus"
                ),
                chara: document.querySelector(
                    ".js-loader-sonic .js-loader-chara"
                ),
            },
            alien: {
                wrapper: document.querySelector(".js-loader-alien"),
                items: document.querySelectorAll(
                    ".js-loader-alien .js-loader-item-rhombus"
                ),
                chara: document.querySelector(
                    ".js-loader-alien .js-loader-chara"
                ),
            },
        };

        this._dusts = document.getElementById("js-carousel-dusts");
        this._carouselImg = document.getElementById("js-carousel-load-animation");
    };
    
    private timeline = gsap.timeline({
        repeat: -1,
        default: {
            duration: 0.2,
            ease: Power1.easeOut,
        },
    });
    
    public startLoader = () => {
        // 初期値設定
        gsap.set(this._loader, {
          opacity: 1,
        });
        gsap.set(this._ornaments.wrapper, {
            opacity: 1,
        });
        gsap.set(
            [
                this._ornaments.sonic.wrapper,
                this._ornaments.alien.wrapper,
                this._ornaments.sonic.items,
                this._ornaments.alien.items,
            ],
            {
                opacity: 0,
            }
        );
    
        this.timeline
            .to(this._ornaments.sonic.wrapper, {
                opacity: 1,
                duration: 0.1,
                delay: 0,
            })
            .from(this._ornaments.sonic.chara, {
                x: "-200%",
            })
            .to(
                this._ornaments.sonic.items,
                {
                    opacity: 1,
                    stagger: {
                        from: "start",
                        amount: 0.2,
                    },
                },
                "<"
            )
            .to(this._ornaments.sonic.wrapper, {
                opacity: 0,
                duration: 0.1,
                delay: 0,
            })
            .to(this._ornaments.alien.wrapper, {
                opacity: 1,
                duration: 0,
                delay: 0,
            })
            .from(this._ornaments.alien.chara, {
                x: "-200%",
            })
            .to(
                this._ornaments.alien.items,
                {
                    opacity: 1,
                    stagger: {
                        from: "start",
                        amount: 0.2,
                    },
                },
                "<"
            );
    };
    
    public killLoader = () => {
        this.timeline.eventCallback("onRepeat", () => {
            this.timeline.pause();
            gsap.to(this._loader, {
                opacity: 0,
                duration: 0.5,
                ease: Power1.easeOut,
                onComplete: () => {
                    this._loader.remove();
                },
            });

            // MVカルーセルスタート
            new TopCarousel();
            this._dusts.classList.add("u-carousel-dust-animation");
            this._carouselImg.classList.add("u-carousel-img-animation");
            new GetNewInterviewIcon();
            new GetNewSsreportIcon();
        });
    };
};
