
type blockOpions = {
    initPosition: number,
    moveDirection: boolean,
    speed: number
};
    
export default class BackgroundAnimation {

    private _cv: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _bgBlock: blockOpions[];
    private _lastInnerWidth: number;

    constructor() {
        console.log("[init class] - BackgroundAnimation.setup");
        this._lastInnerWidth = innerWidth;
        this.init();
    }

    init(): void {

        // 要素取得
        this._cv = document.querySelector("canvas");

        // 要素が存在しない場合はreturn
        if (!this._cv) { return; };

        // コンテキスト取得
        this._ctx = this._cv.getContext("2d");

        // canvasサイズを設定
        this._cv.width = innerWidth;
        this._cv.height = innerHeight;

        // blockの設定
        this._bgBlock = [
            {
                initPosition: innerWidth,
                moveDirection: true,
                speed: 0.2
            },
            {
                initPosition: innerWidth - innerWidth / 2,
                moveDirection: false,
                speed: 0.4
            },
            {
                initPosition: innerWidth - innerWidth / 3,
                moveDirection: true,
                speed: 0.2
            },
            {
                initPosition: innerWidth - innerWidth / 2.5,
                moveDirection: false,
                speed: 0.3
            },
            {
                initPosition: innerWidth - innerWidth / 1.3,
                moveDirection: true,
                speed: 0.2
            },
            {
                initPosition: innerWidth - innerWidth / 1,
                moveDirection: false,
                speed: 0.1
            }
        ];

        // リサイズ処理
        const wrapper_canvasResizing = () => this.canvasResizing(this._cv, this._ctx); // クラス外で動作する関数にクラスメンバーを渡すため関数をラップ
        window.addEventListener("resize", wrapper_canvasResizing); // イベントリスナ設定

        // 描画
        this.createBlock(this._cv, this._ctx);
    }

    private canvasResizing(cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        if (this._lastInnerWidth != window.innerWidth) {

            // 
            this._lastInnerWidth = window.innerWidth ;

            // キャンバスサイズを更新
            cv.width = innerWidth;
            cv.height = innerHeight;
    
            // コンテキスト共通設定
            ctx.translate(cv.width / 2, cv.height / 2);
            ctx.rotate(25 * Math.PI / 180);
            ctx.translate(-cv.width / 2, -cv.height / 2);
            ctx.globalAlpha = 0.02;
        };
    };

    private createBlock(cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        // コンテキスト共通設定
        ctx.translate(cv.width / 2, cv.height / 2);
        ctx.rotate(25 * Math.PI / 180);
        ctx.translate(-cv.width / 2, -cv.height / 2);
        ctx.globalAlpha = 0.02;

        // ループさせる描画処理
        const loop = (): void => {

            ctx.clearRect(-200,-500, cv.width * 2, cv.height + 1000);

            for (let i = 0; i < this._bgBlock.length; i++) {
    
                // 進行方向によって分岐
                if (this._bgBlock[i].moveDirection) {
                    this._bgBlock[i].initPosition += this._bgBlock[i].speed;

                    if (this._bgBlock[i].initPosition > innerWidth + 200) {
                        this._bgBlock[i].initPosition = -400;
                    };
                } else {
                    this._bgBlock[i].initPosition -= this._bgBlock[i].speed;

                    if (this._bgBlock[i].initPosition < -500) {
                        this._bgBlock[i].initPosition = innerWidth + 200;
                    }
                }
                    
                ctx.beginPath();
                ctx.fillRect(this._bgBlock[i].initPosition, -500, 270, cv.height + 1000);
                ctx.stroke();
            };

            requestAnimationFrame(loop);
        };

        // 1msごとに描画
        loop();
    }
}