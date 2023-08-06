export interface scrollOpt {
  duration?: number | void;
  offset?: number;
  callback?: void;
  easing?: void;
}

export default class Base {
  public static speed: number;
  public static _w: Window;
  public static _d: HTMLDocument;
  public static _b: HTMLBodyElement;
  public static rclass: RegExp;
  public static ua: string;
  public static checkIOS: number;
  public static checkANDROID: number;
  public static checkMS: number;
  constructor() {
    // Class変数
    console.log("[create] Base");
    Base.speed = 500;
    Base._w = window;
    Base._d = document;
    Base._b = Base._d.getElementsByTagName("body")[0];
    Base.rclass = /[\t\r\n\f]/g;
    Base.ua = navigator.userAgent.toLowerCase();
    Base.checkIOS = 9;
    Base.checkANDROID = 5;
    Base.checkMS = 11;
  }
  // クラス名追加
  public static addClass(tgt: HTMLElement, name: string): boolean {
    if (!tgt) {
      return false;
    }
    // tslint:disable-next-line:typedef prefer-template
    const src = " " + tgt.className.replace(this.rclass, " ") + " ";
    // tslint:disable-next-line:prefer-template
    if (src.indexOf(" " + name + " ") >= 0) {
      return false;
    }
    tgt.className += " " + name;

    return true;
  }

  // クラス名削除
  public static removeClass(tgt: HTMLElement, name: string): boolean {
    if (!tgt) {
      return false;
    }
    const src = " " + tgt.className.replace(this.rclass, " ") + " ";
    const dst = src.replace(" " + name + " ", " ");
    tgt.className = dst.replace(/^\s+/, "").replace(/\s+$/, "");
    return src !== dst;
  }

  // クラス名有無チェック
  public static hasClass(tgt: HTMLElement, name: string): boolean {
    if (!tgt) {
      return false;
    }
    const className = " " + name + " ";
    if ((" " + tgt.className + " ").replace(this.rclass, " ").indexOf(className) >= 0) {
      return true;
    }
    return false;
  }

  // index番号取得
  public static index(el: HTMLElement, elms: NodeListOf<HTMLElement>): number {
    if (!el || !elms) {
      return 0;
    }
    let num;
    for (let i = 0; i < elms.length; i++) {
      if (el === elms[i]) {
        num = i;
        break;
      }
    }
    return <number>num;
  }

  // スムーススクロール
  public static smoothScroll(e: MouseEvent): void {
    const target: HTMLElement = e.target as HTMLElement;
    const href: string = target.getAttribute("href") as string;
    this.scrollWindow(href, { duration: this.speed * 2 });
    e.preventDefault();
  }
  public static scrollWindow(target: string, options: scrollOpt): void {
    const start = this._w.pageYOffset;
    const opt = {
      duration: options.duration || 500,
      offset: options.offset || 0,
      callback: options.callback || null,
      easing: options.easing || easeInOutQuad,
    };
    const distance =
      typeof target === "string"
        ? target === "#"
          ? start * -1
          : opt.offset + (this._d.querySelector(target) as HTMLElement).getBoundingClientRect().top
        : target;
    const duration = typeof opt.duration === "function" ? opt.duration(distance) : opt.duration;
    let timeStart: number;
    let timeElapsed: number;

    if (this.ua.indexOf("msie 9") > 0) {
      this._w.scrollTo(0, distance);
    }

    requestAnimationFrame((time) => {
      timeStart = time;
      loop(time);
    });
    function loop(time: number) {
      timeElapsed = time - timeStart;
      Base._w.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
      if (timeElapsed < duration) {
        requestAnimationFrame(loop);
      } else {
        end();
      }
    }

    function end() {
      Base._w.scrollTo(0, start + distance);
      if (typeof opt.callback === "function") {
        opt.callback();
      }
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) {
        return (c / 2) * t * t + b;
      }
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  }
  public static escapeHTML(str: string): string {
    let result = "";
    result = str.replace("&", "&amp;");
    result = str.replace("'", "&#x27;");
    result = str.replace("`", "&#x60;");
    result = str.replace('"', "&quot;");
    result = str.replace("<", "&lt;");
    result = str.replace(">", "&gt;");
    result = str.replace(/\n/, "<br>");

    return result;
  }
  public static serialize(data): string {
    let key;
    let value;
    let type;
    let i;
    let max;
    const encode = window.encodeURIComponent;
    let query = "?";

    for (key of Object.keys(data)) {
      value = data[key];
      type = typeof value === "object" && value instanceof Array ? "array" : typeof value;
      switch (type) {
        case "undefined":
          // キーのみ
          query += key;
          break;
        case "array":
          // 配列
          for (i = 0, max = value.length; i < max; i++) {
            query += key + "[]";
            query += "=";
            query += encode(value[i]);
            query += "&";
          }
          query = query.substr(0, query.length - 1);
          break;
        case "object":
          // ハッシュ
          for (i of Object.keys(value)) {
            query += key + "[" + i + "]";
            query += "=";
            query += encode(value[i]);
            query += "&";
          }
          query = query.substr(0, query.length - 1);
          break;
        default:
          query += key;
          query += "=";
          query += encode(value);
          break;
      }
      query += "&";
    }
    query = query.substr(0, query.length - 1);
    return query;
  }
  public static callApi(method: string, url: string, data, callback): void {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        if (req.response) {
          const jsonObj = req.response;
          callback("success", jsonObj);
        } else {
          callback("error");
        }
      }
    };
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    req.responseType = "json";
    req.send(this.serialize(data));
  }

  public static rgb2hex(rgb: string[]): string {
    return (
      "#" +
      rgb
        .map((value: string) => {
          return "0" + Number(value).toString(16).slice(-2);
        })
        .join("")
    );
  }

  public static sampleEvent(): void {
    const sampleCallback = (status: string, res) => {
      alert(res.status);
    };
    this.callApi("GET", "url", null, sampleCallback);
  }

  public static getDatetime(date: string): string {
    const d: Date = new Date(date);
    return (
      String(d.getFullYear()) +
      "-" +
      String(d.getMonth() + 1) +
      "-" +
      String(d.getDate()) +
      "T" +
      String(d.getHours()) +
      ":" +
      String(d.getMinutes())
    );
  }

  public static getFullDate(date: string): string {
    const d: Date = new Date(date);
    return (
      String(d.getFullYear()) +
      "年" +
      String(d.getMonth() + 1) +
      "月" +
      String(d.getDate()) +
      "日 " +
      String(d.getHours()) +
      ":" +
      String(d.getMinutes())
    );
  }

  public static verCheck(): void {
    // iOSのバージョン判断
    function ios_ver() {
      if (Base.ua.indexOf("iphone") > 0) {
        Base.ua.match(/iphone os (\w+) {1,3}/g);
        const ver: string[] = RegExp.$1.split(/_/);
        ver.splice(1, 0, ".");
        ver.push("0");
        return parseFloat(ver.join(""));
      } else {
        return false;
      }
    }
    // Androidのバージョン判断
    function and_ver() {
      if (Base.ua.indexOf("android") > 0) {
        return parseFloat(Base.ua.slice(Base.ua.indexOf("android") + 8));
      } else {
        return false;
      }
    }
    if (ios_ver() < this.checkIOS || and_ver() < this.checkANDROID) {
      // $('.old_browser').show();
    }

    function is_ms() {
      // IEの判定
      const isIE = Base.ua.indexOf("msie") >= 0 || Base.ua.indexOf("trident") >= 0;
      // IEのバージョンを取得
      if (isIE) {
        // 正規表現によりUA文字列を配列に分割
        const arr = /(msie|rv:?)\s?([\d.]+)/.exec(Base.ua);
        return arr ? arr[2] : "";
      } else {
        if (Base.ua.indexOf("edge") !== -1) {
          /* Edge. */
          Base.ua.match(/edge\/([0-9.]+)/g);
          const ver = RegExp.$1.split(/\//);
          // return 'edge';

          return parseFloat(ver.join(""));
        } else {
          return false;
        }
      }
    }
    if (is_ms()) {
      console.log("MS");
      this.addClass(this._b, "is-ms");
    }
    is_ms();
    if (is_ms() < this.checkMS) {
      // return is_ms();
    }
  }
  // クエリ文字列を変換
  public static getUrlVars(): object {
    const vars = {};
    const url = this._w.location.search;
    // ?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    const hash: string[] = url.slice(1).split("&");
    const max: number = hash.length;
    for (let i = 0; i < max; i++) {
      const array: string[] = hash[i].split("="); // keyと値に分割。
      // vars.push(array[0]);    // 末尾にクエリ文字列のkeyを挿入。
      vars[array[0]] = array[1]; // keyに、値を代入。
    }
    return vars;
  }
}
