import { lang } from "../config/config";
import GetLang from "../components/getLang";

export const vw = (arg: number): number => {
    return arg / (innerWidth > 640 ? 1280 : 375) * 100;
};

export const convert = (arg: any): any => {
    if (innerWidth > 640) {
        return (innerWidth / 100) * (arg / 1280 * 100);
    } else {
        return (innerWidth / 100) * (arg / 375 * 100);
    };
};

export const convertNotation = (label: number): string => {

    // 既に小数点が付与されている場合はリターン
    if (label.toString().indexOf(".") !== -1) { return label.toFixed(1); };

    // 日本版の場合、カンマを付与してリターン
    if (lang) { return label.toLocaleString(); };

    // 以下、海外版表記に加工
    const str: string = label.toString();

    if (str.length > 1) {
      const sliceStr_1: string = Number(str.slice(0, str.length - 1)).toLocaleString();
      const sliceStr_2: string = str.slice(-1);
      return sliceStr_1 + "." + sliceStr_2;
    } else {
      return str;
    }
  };


  // Trillion yenのみ処理を分ける
  export const convertNotationTrillion = (label: number): string => {

    // 既に小数点が付与されている場合はリターン
    if (label.toString().indexOf(".") !== -1) { return label.toFixed(1); };

    // 日本版の場合、カンマを付与してリターン
    if (lang) { return label.toLocaleString(); };

    // 以下、海外版表記に加工
    const str: string = label.toString();

    if (str.length > 2) {
      const sliceStr_1: string = Number(str.slice(0, str.length - 1)).toLocaleString();
      const sliceStr_2: string = str.slice(-1);
      return sliceStr_1 + "." + sliceStr_2;
    } else {
      return str;
    }
  };