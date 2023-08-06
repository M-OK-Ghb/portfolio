export default class GetLang {

    static getLang (): boolean {
        const htmlElem: any = document.getElementsByTagName('html');
        const lang: string = htmlElem[0].getAttribute("lang");
        const flg: boolean = lang === "ja";
        return flg;
    };
};