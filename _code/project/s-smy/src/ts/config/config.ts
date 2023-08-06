import GetLang from "../components/getLang";
export const lang = GetLang.getLang();
// 納品時とローカル環境時は trueを、MDのtestup時はfalseを
export const isDev: boolean = true;
export const rootPath: string = isDev ? `${location.origin}/${lang ? "japanese" : "english"}/ir/individual/` : `https://dev.monster-dive.com/testup/2021/segasammy/${lang ? "japanese" : "english"}/ir/individual/`;
export const assetsPath = isDev ? `${location.origin}/assets/images/` : `https://dev.monster-dive.com/testup/2021/segasammy/assets/images/`;

export const getAssetsPath = (assetType: string): string => {
    return isDev ? `${location.origin}/assets/${assetType}/` : `https://dev.monster-dive.com/testup/2021/segasammy/assets/${assetType}/`;
};