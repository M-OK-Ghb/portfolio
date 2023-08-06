export default class fitJumbotron {

    constructor() {
        this.init();
    }

    init(): void {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
}