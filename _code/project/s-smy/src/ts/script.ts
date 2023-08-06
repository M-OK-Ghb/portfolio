import App from "./app";

const appInstance: App = new App();

window.addEventListener("load", () => {
    appInstance.initialize();
});
