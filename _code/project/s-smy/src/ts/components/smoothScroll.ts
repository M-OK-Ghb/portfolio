
export default class SmoothScroll {
  private _duration: number = 500;
    constructor() {
        console.log(`[init class] - ${this.constructor.name}.setup`);
    };

    init(): void {

        
    };
  // public smoothScroll(e): void {
  //   const _self = this;
  //   const target: HTMLElement = e.target;
  //   const href: string = target.getAttribute("href");
  //   this.scrollWindow(href, { duration: _self._duration * 2 });
  //   e.preventDefault();
  // }
  public scrollWindow(target: string, options: any): void {
    const _self = this;
    const start = window.pageYOffset;
    const opt = {
      duration: options.duration || 500,
      offset: options.offset || 0,
      callback: options.callback,
      easing: options.easing || easeInOutQuad,
    };
    const distance = typeof target === "string" ?
      (target === "#" ? start * -1 : opt.offset + document.querySelector(target).getBoundingClientRect().top)
      : target;
    const duration = typeof opt.duration === "function" ? opt.duration(distance) : opt.duration;
    let timeStart;
    let timeElapsed;

    requestAnimationFrame((time) => { timeStart = time; loop(time); });
    function loop(time) {
      timeElapsed = time - timeStart;
      window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
      if (timeElapsed < duration) {
        requestAnimationFrame(loop);
      } else {
        end();
      }
    }

    function end() {
      window.scrollTo(0, start + distance);
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
};