class BaseClass {
  public speed: number;
  public _w: Window;
  public _d: HTMLDocument;
  public _b: HTMLBodyElement;
  public rclass: RegExp;
  public ua: string;
  public checkIOS: number;
  public checkANDROID: number;
  public checkMS: number;
  constructor() {
    // Class変数
    this.speed = 500;
    this._w = window;
    this._d = document;
    this._b = this._d.getElementsByTagName("body")[0];
    this.rclass = /[\t\r\n\f]/g;
    this.ua = navigator.userAgent.toLowerCase();
    this.checkIOS = 9;
    this.checkANDROID = 5;
    this.checkMS = 11;
  }
  // クラス名追加
  // tslint:disable-next-line:completed-docs
  public addClass(tgt, name): boolean {
    if (!tgt) { return; }
    // tslint:disable-next-line:typedef prefer-template
    const src = " " + tgt.className.replace(this.rclass, " ") + " ";
    // tslint:disable-next-line:prefer-template
    if (src.indexOf(" " + name + " ") >= 0) { return false; }
    tgt.className += " " + name;

    return true;
  }

  // クラス名削除
  public removeClass(tgt, name): boolean {
    if (!tgt) { return; }
    const src = " " + tgt.className.replace(this.rclass, " ") + " ";
    const dst = src.replace(" " + name + " ", " ");
    tgt.className = dst.replace(/^\s+/, "").replace(/\s+$/, "");
    return (src !== dst);
  }

  // クラス名有無チェック
  public hasClass(tgt, name): boolean {
    if (!tgt) { return; }
    const className = " " + name + " ";
    const l = tgt.length;
    if ((" " + tgt.className + " ").replace(this.rclass, " ").indexOf(className) >= 0) {
      return true;
    }
    return false;
  }

  // index番号取得
  public index(el, elms): number {
    if (!el || !elms) { return; }
    let num;
    for ( let i = 0; i < elms.length; i++ ) {
      if ( el === elms[i] ) {
        num = i;
        break ;
      }
    }
    return num;
  }

  // スムーススクロール
  public smoothScroll(e): void {
    const _self = base;
    const target: HTMLElement = e.target;
    const href: string | null = target.getAttribute("href");
    _self.scrollWindow(href, { duration: _self.speed * 2 });
    e.preventDefault();
  }
  // tslint:disable-next-line:no-any
  public scrollWindow(target: string | number | null, options: any): void {
    const _self = base;
    const start = _self._w.pageYOffset;
    const opt = {
      duration: options.duration || 500,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad,
    };
    const distance = typeof target === "string" ?
      (target === "#" ? start * -1 : opt.offset + _self._d.querySelector(target)?.getBoundingClientRect().top)
      : target;
    const duration = typeof opt.duration === "function" ? opt.duration(distance) : opt.duration;
    let timeStart;
    let timeElapsed;

    if (_self.ua.indexOf("msie 9") > 0) {
      _self._w.scrollTo(0, distance);
    }

    requestAnimationFrame((time) => { timeStart = time; loop(time); });
    function loop(time) {
      timeElapsed = time - timeStart;
      _self._w.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
      if (timeElapsed < duration) {
        requestAnimationFrame(loop);
      } else {
        end();
      }
    }

    function end() {
      _self._w.scrollTo(0, start + distance);
      if (typeof opt.callback === "function") {
        opt.callback();
      }
    }

    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) { return c / 2 * t * t + b; }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  }
  public escapeHTML(str: string): string {
    let result = "";
    result = str.replace("&", "&amp;");
    result = str.replace("'", "&#x27;");
    result = str.replace("`", "&#x60;");
    result = str.replace("\"", "&quot;");
    result = str.replace("<", "&lt;");
    result = str.replace(">", "&gt;");
    result = str.replace(/\n/, "<br>");

    return(result);
  }
  // tslint:disable-next-line:no-any
  public serialize(data: any): string {
    let key;
    let value;
    let type;
    let i;
    let max;
    const encode = window.encodeURIComponent;
    let query: string = "?";

    for (key of Object.keys(data)) {
      value = data[key];
      type = typeof(value) === "object" && value instanceof Array ? "array" : typeof(value);
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
  // tslint:disable-next-line:no-any
  public callApi(method: string, url: string, data: any, callback: any): void {
    const _self = this;
    const req = new XMLHttpRequest();
    req.open( method, url, true );
    req.onreadystatechange = () => {
      if ( req.readyState === 4 && req.status === 200 ) {
        if ( req.response ) {
          const jsonObj = req.response;
          callback("success", jsonObj);
        } else {
          callback("error");
        }
      }
    };
    req.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded; charset=UTF-8" );
    req.responseType = "json";
    req.send( _self.serialize(data));
  }

  public rgb2hex(rgb: string[]): string {
    return "#" + rgb.map(( value: string ) => {
      return ( "0" + Number(value).toString( 16 ) ).slice( -2 ) ;
    } ).join( "" ) ;
  }

  public sampleEvent(el): void {
    // tslint:disable-next-line:no-any
    const sampleCallback = (status: string, res: any) => {
      alert(res.status);
    };
    this.callApi("GET", "url", null, sampleCallback);
  }

  public getDatetime(date: string): string {
    const d: Date = new Date(date);
    return String(d.getFullYear()) + "-" +
      String(d.getMonth() + 1) + "-" +
      String(d.getDate()) + "T" +
      String(d.getHours()) + ":" +
      String(d.getMinutes());
  }

  public getFullDate(date: string): string {
    const d: Date = new Date(date);
    return String(d.getFullYear()) + "年" +
      String(d.getMonth() + 1) + "月" +
      String(d.getDate()) + "日 " +
      String(d.getHours()) + ":" +
      String(d.getMinutes());
  }

  public verCheck(): void {
    const _self = this;
    // iOSのバージョン判断
    function ios_ver() {
      if ( _self.ua.indexOf("iphone") > 0 ) {
        _self.ua.match(/iphone os (\w+) {1,3}/g);
        const ver: string[] = (RegExp.$1.split(/_/));
        ver.splice( 1, 0, "." );
        ver.push("0");
        return parseFloat(ver.join(""));
      }
    }
    // Androidのバージョン判断
    function and_ver() {
      if ( _self.ua.indexOf("android") > 0 ) {
        return parseFloat(_self.ua.slice(_self.ua.indexOf("android") + 8));
      }
    }
    if (ios_ver() < this.checkIOS || and_ver() < this.checkANDROID) {
      // $('.old_browser').show();
    }

    function is_ms() {
      // IEの判定
      const isIE = (_self.ua.indexOf("msie") >= 0 || _self.ua.indexOf("trident") >= 0);
      // IEのバージョンを取得
      if (isIE) {
        // 正規表現によりUA文字列を配列に分割
        const arr = /(msie|rv:?)\s?([\d.]+)/.exec(_self.ua);
        return (arr) ? arr[2] : "";
      } else {
        if (_self.ua.indexOf("edge") !== -1) {
          /* Edge. */
          _self.ua.match(/edge\/([0-9.]+)/g);
          const ver = (RegExp.$1.split(/\//));
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
  public getUrlVars(): object {
    const _self = this;
    const vars: object = {};
    const url = _self._w.location.search;
    // ?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
    const hash: string[]  = url.slice(1).split("&");
    const max: number = hash.length;
    for (let i = 0; i < max; i++) {
      const array: string[] = hash[i].split("=");    // keyと値に分割。
      // vars.push(array[0]);    // 末尾にクエリ文字列のkeyを挿入。
      vars[array[0]] = array[1];    // keyに、値を代入。
    }
    return vars;
  }
}
export const base: BaseClass = new BaseClass();