export default class SetDelayPageTransition {

    static set (container: HTMLElement): void {

        console.log(`[static] - ${this.constructor.name}.set`);

        // topコンテナの場合、処理を終了
        if (container.querySelector(".c-carousel__jumbotron--1")) { return; };

        // a要素を持たないコンテナ要素の場合、処理を終了
        if (!container.querySelector("ul")) { return; };

        const elems: NodeList = container.querySelectorAll("a");

        // アンカーリンクをクリック後、hrefのハッシュをハテナに加工
        for (let i = 0; i < elems.length; i++) {
            const elem: HTMLElement = elems[i] as HTMLElement;
            elem.addEventListener("click", (e: MouseEvent): void => {
                e.preventDefault();
                const replaceHashURL: string = elem.getAttribute("href").replace("#", "?");
                window.location.href = replaceHashURL;
            });
        }
    };
}