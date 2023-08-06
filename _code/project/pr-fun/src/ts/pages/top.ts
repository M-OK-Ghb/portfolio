/**
 * 全体の共通処理を記述する
 */
import {Draggable, EaselPlugin, Expo, gsap, Linear, MotionPathPlugin, ScrollTrigger, TweenMax} from "gsap";
import * as THREE from "three";
import {Material} from "three";
import {base} from "../utils/base";
import {eventName} from "../utils/eventName";
// tslint:disable-next-line:no-any
declare const sliderImagePc: any;
// tslint:disable-next-line:no-any
declare const sliderImageSp: any;
class TopClass {
  private cardImagesPc: object[];
  private cardImagesSp: object[];
  private cardImagesPixiPc: object[];
  private cardImagesPixiSp: object[];
  private _cardWrap: HTMLElement;
  private _controllerCurrent: HTMLElement;
  private _controllerPrev: HTMLElement;
  private _controllerNext: HTMLElement;
  private _controllerBg: HTMLCanvasElement;
  private controllerBgCtx: CanvasRenderingContext2D;
  private material: Material;
  private seekbar: TweenMax;
  private seekbarStart: number;
  private seekbarEnd: number;
  private seekbarAngle: object;
  private seekbarDuration: number;
  private transitionSpeed: number;
  private transitionSpeedIe: number;
  private transitionEasing: EaselPlugin;

  private _card: NodeListOf<Element>;
  private _numberItem: NodeListOf<Element>;
  private currentCard: number;
  private cardLen: number;
  private BREAK_POINT: number;
  private windowWidth: number;

  private pcImageWidth: number;
  private pcImageHeight: number;
  private spImageWidth: number;
  private spImageHeight: number;

  private _cover: HTMLCanvasElement;
  private _coverCtx: CanvasRenderingContext2D;

  private _startX: number;
  private _diffX: number;
  private CONTROL_AVAILABLE: boolean;
  private THRESHOLD: number;

  constructor() {
    // class変数
    this.cardImagesPc = [];
    this.cardImagesSp = [];
    this.cardImagesPixiPc = [];
    this.cardImagesPixiSp = [];
    this._cardWrap = base._d.getElementById("data-card-wrap");
    this._controllerCurrent = base._d.getElementById("data-controller-number");
    this._controllerPrev = base._d.getElementById("data-controller-prev");
    this._controllerNext = base._d.getElementById("data-controller-next");
    this._controllerBg = base._d.getElementById("data-controller-bg");
    this.controllerBgCtx = null;
    this.material = null;
    this.seekbar = null;
    this.seekbarStart = -90 / 180 * Math.PI;
    this.seekbarEnd = 270 / 180 * Math.PI;
    this.seekbarAngle = {};
    this.seekbarDuration = 8;
    this.transitionSpeed = 1;
    this.transitionSpeedIe = 0.3;
    this.transitionEasing = Expo.easeOut;

    this._card = base._d.querySelectorAll(".data-card");
    this._numberItem = base._d.querySelectorAll(".data-number-item");
    this.currentCard = 0;
    this.cardLen = 0;
    this.BREAK_POINT = 980;
    this.windowWidth = 0;

    this.pcImageWidth = 2000;
    this.pcImageHeight = 1400;
    this.spImageWidth = 1080;
    this.spImageHeight = 1080;

    this._cover = base._d.createElement("canvas");
    this._coverCtx = null;

    this._startX = 0;
    this._diffX = 0;
    this.CONTROL_AVAILABLE = false;
    this.THRESHOLD = 250;
  }
  public init(): void {
    // 以下共通で追加するEVENT
    top.cardLen = top._card.length - 1;
    top.windowWidth = base._w.innerWidth;

    const parent: HTMLElement = top._cardWrap;
    const linear = Linear.easeNone;
    top._controllerBg.width = 250;
    top._controllerBg.height = 250;
    top.controllerBgCtx = top._controllerBg.getContext("2d");
    top.seekbarAngle = {
      end: top.seekbarStart,
    };
    top._coverCtx = top._cover.getContext("2d");
    top._cover.width = parent.offsetWidth * 2;
    top._cover.height = parent.offsetHeight * 2;
    parent.appendChild(top._cover);
    top._cover.style.position = "absolute";
    top._cover.style.top = "0px";
    top._cover.style.left = "0px";
    top._cover.style.zIndex = "1";
    top._cover.style.width = "100%";
    top._cover.style.height = "100%";

    if (!base.isIe()) {
      top.initCard();
    } else {
      const $s: HTMLSelectElement = base._d.createElement("script");
      $s.src = "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/3.0.10/pixi.min.js";
      base._b.appendChild($s);
      $s.onload = () => {
        top.initCardIe();
      };
    }

    top.seekbar = TweenMax.to(top.seekbarAngle, top.seekbarDuration, {
      end: top.seekbarEnd,
      ease: linear,
      onComplete: () => {
        // 完了時
        top.nextCard();
      },
    });

    top._controllerNext.addEventListener(eventName.CLICK, (e) => {
      top.seekbarAngle.end = top.seekbarEnd;
      top.seekbar.pause(top.seekbarDuration);
      top.nextCard();
    });

    top._controllerPrev.addEventListener(eventName.CLICK, (e) => {
      top.seekbarAngle.end = top.seekbarEnd;
      top.seekbar.pause(top.seekbarDuration);
      top.prevCard();
    });

    top._cardWrap.addEventListener(eventName.MOUSE_DOWN, top.mouseHandler, false);
    top._cardWrap.addEventListener(eventName.MOUSE_MOVE, top.mouseHandler, false);
    top._cardWrap.addEventListener(eventName.MOUSE_UP, top.mouseHandler, false);
    top._cardWrap.addEventListener(eventName.TOUCH_START, top.touchHandler, false);
    top._cardWrap.addEventListener(eventName.TOUCH_MOVE, top.touchHandler, false);
    top._cardWrap.addEventListener(eventName.TOUCH_END, top.touchHandler, false);
  }
  public initCard(): void {
    // 以下共通で追加するEVENT
    const displacementImage = "/images/top/texture.jpg";

    const vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;
    const fragment = `
        varying vec2 vUv;

        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        uniform vec2 resolution;
        uniform vec2 imageResolution;

        uniform float dispFactor;
        uniform float effectFactor;

        void main() {

            vec2 ratio = vec2(
              min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
              min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
            );

            vec2 uv = vec2(
              vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
              vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );


            vec4 disp = texture2D(disp, uv);

            vec2 distortedPosition = vec2(uv.x - dispFactor * (disp.r*effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x + (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

            vec4 _texture1 = texture2D(texture1, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture1, _texture2, dispFactor);

            gl_FragColor = finalTexture;
        }
    `;

    const parent: HTMLElement = top._cardWrap;
    const intensity: number = 0.6;
    const speedIn: number = 1;
    const speedOut: number = 1;
    const userHover: boolean = true;
    const easing = Expo.easeOut;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      parent.offsetWidth / -2,
      parent.offsetWidth / 2,
      parent.offsetHeight / 2,
      parent.offsetHeight / -2,
      1,
      1000,
    );

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      // alpha: true,
    });

    renderer.setPixelRatio(base._w.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0.0);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";

    Array.prototype.forEach.call(sliderImagePc, (path) => {
      const texture = loader.load(path);
      // if (!base.isIe()) {
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.getMaxAnisotropy();
      // }
      top.cardImagesPc.push( texture );
    });
    Array.prototype.forEach.call(sliderImageSp, (path) => {
      const texture = loader.load(path);
      // if (!base.isIe()) {
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.getMaxAnisotropy();
      // }
      top.cardImagesSp.push( texture );
    });
    const disp = loader.load( displacementImage );
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    let geometry;
    top.material = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: { type: "f", value: intensity },
        dispFactor: { type: "f", value: 0 },
        texture1: {
          type: "t",
          value: (top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[0] : top.cardImagesPc[0]),
        },
        texture2: {
          type: "t",
          value: (top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[1] : top.cardImagesPc[1]),
        },
        disp: { type: "t", value: disp },
        resolution: { type: "v2", value: new THREE.Vector2(parent.clientWidth, parent.clientHeight) },
        imageResolution: { type: "v2", value: (top.windowWidth < top.BREAK_POINT ?
            new THREE.Vector2(1080, 1080) :
            new THREE.Vector2(2000, 1400)),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      opacity: 1.0,
    });
    geometry = new THREE.PlaneBufferGeometry(
      parent.offsetWidth,
      parent.offsetHeight,
      1,
    );

    const object = new THREE.Mesh(geometry, top.material);
    scene.add(object);

    base._w.addEventListener(eventName.RESIZE, (e) => {
      renderer.setSize(parent.offsetWidth, parent.offsetHeight);
      object.material.uniforms.resolution.value.set(parent.clientWidth, parent.clientHeight);
      top._cover.width = parent.offsetWidth * 2;
      top._cover.height = parent.offsetHeight * 2;
      top.windowWidth = base._w.innerWidth;
      if ( top.windowWidth < top.BREAK_POINT ) {
        top.material.uniforms.texture1.value =
          top.cardImagesSp[top.currentCard];
        top.material.uniforms.texture2.value = top.cardImagesSp[
          (top.currentCard === top.cardLen ? 0 : top.currentCard + 1)
          ];
        object.material.uniforms.imageResolution.value.set(1080, 1080);
      } else {
        top.material.uniforms.texture1.value =
          top.cardImagesPc[top.currentCard];
        top.material.uniforms.texture2.value = top.cardImagesPc[
          (top.currentCard === top.cardLen ? 0 : top.currentCard + 1)
          ];
        object.material.uniforms.imageResolution.value.set(2000, 1400);
      }
    });

    top.controllerBgCtx.beginPath();
    top.controllerBgCtx.arc(
      top._controllerBg.clientWidth / 2,
      top._controllerBg.clientHeight / 2,
      top._controllerBg.clientWidth / 2,
      top.seekbarStart,
      Math.PI * 2,
      false,
    );
    top.controllerBgCtx.clip();
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      top.drawControllerBg(parent.clientWidth, parent.clientHeight);
      top.drawCover(parent.clientWidth, parent.clientHeight);
    };
    animate();
    top.initClass();

  }
  public initCardIe(): void {
    // 以下共通で追加するEVENT
    const parent: HTMLElement = top._cardWrap;
    const intensity: number = 0.6;

    const pixiContainer = new PIXI.Container();
    // キャンバスレンダラーを200x100で生成します
    const pixiRenderer = new PIXI.autoDetectRenderer(parent.offsetWidth, parent.offsetHeight, {
      view: null,
      transparent: true,
      resolution: 1,
    });
    parent.appendChild(pixiRenderer.view);

    Array.prototype.forEach.call(sliderImagePc, (path) => {
      const pixiImage = PIXI.Texture.fromImage(path);
      const sprite = new PIXI.Sprite(pixiImage);
      sprite.width = parent.offsetWidth;
      sprite.height = parent.offsetWidth * ( top.pcImageHeight / top.pcImageWidth);
      sprite.position.x = 0;
      sprite.position.y = - (sprite.height - parent.offsetHeight) / 2;
      sprite.alpha = 0;
      top.cardImagesPixiPc.push( sprite );
      pixiContainer.addChild(sprite);
    });
    Array.prototype.forEach.call(sliderImageSp, (path) => {
      const pixiImage = PIXI.Texture.fromImage(path);
      const sprite = new PIXI.Sprite(pixiImage);
      sprite.width = parent.offsetHeight;
      sprite.height = parent.offsetHeight;
      sprite.position.x = - (sprite.width - parent.offsetWidth) / 2;
      sprite.position.y = 0;
      sprite.alpha = 0;
      top.cardImagesPixiSp.push( sprite );
      pixiContainer.addChild(sprite);
    });
    TweenMax.set(top.windowWidth < top.BREAK_POINT ?
      top.cardImagesPixiSp[top.currentCard] :
      top.cardImagesPixiPc[top.currentCard], {
      alpha: 0,
    });
    TweenMax.to(top.windowWidth < top.BREAK_POINT ?
      top.cardImagesPixiSp[top.currentCard] :
      top.cardImagesPixiPc[top.currentCard], top.transitionSpeedIe, {
      alpha: 1,
      ease: top.transitionEasing,
    });

    base._w.addEventListener(eventName.RESIZE, (e) => {
      pixiRenderer.resize(parent.offsetWidth, parent.offsetHeight);
      top._cover.width = parent.offsetWidth * 2;
      top._cover.height = parent.offsetHeight * 2;
      top.windowWidth = base._w.innerWidth;
      Array.prototype.forEach.call(top.cardImagesPixiPc, (item) => {
        item.width = parent.offsetWidth;
        item.height = parent.offsetWidth * ( top.pcImageHeight / top.pcImageWidth);
        item.position.x = 0;
        item.position.y = - (item.height - parent.offsetHeight) / 2;
        item.alpha = 0;
      });
      Array.prototype.forEach.call(top.cardImagesPixiSp, (item) => {
        item.width = parent.offsetHeight;
        item.height = parent.offsetHeight;
        item.position.x = - (item.width - parent.offsetWidth) / 2;
        item.position.y = 0;
      });
      if ( top.windowWidth < top.BREAK_POINT ) {
        top.cardImagesPixiPc[top.currentCard].alpha = 0;
        top.cardImagesPixiSp[top.currentCard].alpha = 1;
      } else {
        top.cardImagesPixiPc[top.currentCard].alpha = 1;
        top.cardImagesPixiSp[top.currentCard].alpha = 0;
      }
    });

    top.controllerBgCtx.beginPath();
    top.controllerBgCtx.arc(
      top._controllerBg.clientWidth / 2,
      top._controllerBg.clientHeight / 2,
      top._controllerBg.clientWidth / 2,
      top.seekbarStart,
      Math.PI * 2,
      false,
    );
    top.controllerBgCtx.clip();

    const animate = () => {
      requestAnimationFrame(animate);
      pixiRenderer.render(pixiContainer);

      top.drawControllerBg(parent.clientWidth, parent.clientHeight);
      top.drawCover(parent.clientWidth, parent.clientHeight);
    };
    animate();
    top.initClass();
  }
  public initClass(): void {
    base.addClass(top._card[top.currentCard], "is-active");
    base.addClass(top._numberItem[top.currentCard], "is-active");
    base.addClass(top._numberItem[top.currentCard], "is-current");
    base.addClass(top._numberItem[top.currentCard + 1], "is-active");
    base.addClass(top._numberItem[top.currentCard + 1], "is-next");
    base.addClass(top._numberItem[top.cardLen], "is-active");
    base.addClass(top._numberItem[top.cardLen], "is-prev");
  }
  public drawControllerBg(w: number, h: number): void {
    top.controllerBgCtx.clearRect(0, 0, w, h);

    top.controllerBgCtx.lineWidth = 4;
    top.controllerBgCtx.strokeStyle = "#ffdd32";
    top.controllerBgCtx.beginPath();
    top.controllerBgCtx.arc(
      top._controllerBg.clientWidth / 2,
      top._controllerBg.clientHeight / 2,
      (top._controllerBg.clientWidth / 2) - 2,
      top.seekbarStart,
      top.seekbarAngle.end,
      false,
    );
    top.controllerBgCtx.stroke();
  }
  public drawCover(w: number, h: number): void {
    if ( top.windowWidth >= top.BREAK_POINT ) {
      top._coverCtx.beginPath();
      top._coverCtx.arc(
        (w - (h / 2) - 100) * 2,
        (h / 2) * 2,
        (h / 2) * 2,
        top.seekbarStart,
        0,
        false,
      );
      top._coverCtx.lineTo((w) * 2, (h / 2) * 2);
      top._coverCtx.lineTo((w) * 2, 0);
      top._coverCtx.closePath();
      top._coverCtx.fillStyle = "rgb(34, 34, 34)";
      top._coverCtx.fill();

      top._coverCtx.beginPath();
      top._coverCtx.arc(
        (w - (h / 2) - 100) * 2,
        (h / 2) * 2,
        (h / 2) * 2,
        90 / 180 * Math.PI,
        0,
        true,
      );
      top._coverCtx.lineTo((w) * 2, (h / 2) * 2);
      top._coverCtx.lineTo((w) * 2, (h) * 2);
      top._coverCtx.closePath();
      top._coverCtx.fillStyle = "rgb(255, 255, 255)";
      top._coverCtx.fill();
    }
  }

  public timerSet(): void {
    top.seekbarAngle.end = top.seekbarStart;
    base.addClass(top._card[top.currentCard], "is-before");
    base.addClass(top._card[top.currentCard], "is-active");
    top.numberSet();
    setTimeout(() => {
      base.removeClass(top._card[top.currentCard], "is-before");
      top.seekbar.play(0);
    }, 100);
  }
  public nextCard(): void {
    // 現在のDOMを非表示
    base.addClass(top._card[top.currentCard], "is-after");
    setTimeout(() => {
      base.removeClass(top._card[top.currentCard], "is-after");
      base.removeClass(top._card[top.currentCard], "is-active");
      if (base.isIe()) {
        TweenMax.to(top.windowWidth < top.BREAK_POINT ?
          top.cardImagesPixiSp[top.currentCard] :
          top.cardImagesPixiPc[top.currentCard], top.transitionSpeedIe, {
          alpha: 0,
          ease: top.transitionEasing,
          onComplete: () => {
            // トランジション完了時
            if ( top.currentCard === top.cardLen ) {
              top.currentCard = 0;
            } else {
              top.currentCard = top.currentCard + 1;
            }

            TweenMax.set(top.windowWidth < top.BREAK_POINT ?
              top.cardImagesPixiSp[top.currentCard] :
              top.cardImagesPixiPc[top.currentCard], {
              alpha: 0,
            });
            TweenMax.to(top.windowWidth < top.BREAK_POINT ?
              top.cardImagesPixiSp[top.currentCard] :
              top.cardImagesPixiPc[top.currentCard], top.transitionSpeedIe, {
              alpha: 1,
              ease: top.transitionEasing,
            });

            top.timerSet();
          },
        });
      }

      if (!base.isIe()) {
        if ( top.currentCard === top.cardLen ) {
          top.currentCard = 0;
        } else {
          top.currentCard = top.currentCard + 1;
        }
        TweenMax.to(top.material.uniforms.dispFactor, top.transitionSpeed, {
          value: 1,
          ease: top.transitionEasing,
          onComplete: () => {
            // トランジション完了時
            top.material.uniforms.dispFactor.value = 0;
            top.material.uniforms.texture1.value =
              top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[top.currentCard] : top.cardImagesPc[top.currentCard];
            top.material.uniforms.texture2.value = top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[
              (top.currentCard === top.cardLen ? 0 : top.currentCard + 1)
              ] : top.cardImagesPc[
              (top.currentCard === top.cardLen ? 0 : top.currentCard + 1)
              ];

            top.timerSet();
          },
        });
      }
    }, 500);
  }
  public prevCard(): void {
    // 現在のDOMを非表示
    base.addClass(top._card[top.currentCard], "is-after");
    setTimeout(() => {
      base.removeClass(top._card[top.currentCard], "is-after");
      base.removeClass(top._card[top.currentCard], "is-active");
      if (!base.isIe()) {
      top.material.uniforms.texture1.value =
          top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[top.currentCard] : top.cardImagesPc[top.currentCard];
      top.material.uniforms.texture2.value = top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[
          (top.currentCard === 0 ? top.cardLen : top.currentCard - 1)
          ] : top.cardImagesPc[
          (top.currentCard === 0 ? top.cardLen : top.currentCard - 1)
          ];
      }

      if (base.isIe()) {
        TweenMax.to(top.windowWidth < top.BREAK_POINT ?
          top.cardImagesPixiSp[top.currentCard] :
          top.cardImagesPixiPc[top.currentCard], top.transitionSpeedIe, {
          alpha: 0,
          ease: top.transitionEasing,
          onComplete: () => {
            // トランジション完了時
            if ( top.currentCard === 0 ) {
              top.currentCard = top.cardLen;
            } else {
              top.currentCard = top.currentCard - 1;
            }

            TweenMax.set(top.windowWidth < top.BREAK_POINT ?
              top.cardImagesPixiSp[top.currentCard] :
              top.cardImagesPixiPc[top.currentCard], {
              alpha: 0,
            });
            TweenMax.to(top.windowWidth < top.BREAK_POINT ?
              top.cardImagesPixiSp[top.currentCard] :
              top.cardImagesPixiPc[top.currentCard], top.transitionSpeedIe, {
              alpha: 1,
              ease: top.transitionEasing,
            });

            top.timerSet();
          },
        });
      }

      if (!base.isIe()) {
        if ( top.currentCard === 0 ) {
          top.currentCard = top.cardLen;
        } else {
          top.currentCard = top.currentCard - 1;
        }
        TweenMax.to(top.material.uniforms.dispFactor, top.transitionSpeed, {
          value: 1,
          ease: top.transitionEasing,
          onComplete: () => {
            // トランジション完了時
            top.material.uniforms.dispFactor.value = 0;
            top.material.uniforms.texture1.value = top.windowWidth < top.BREAK_POINT ?
              top.cardImagesSp[top.currentCard] :
              top.cardImagesPc[top.currentCard];
            top.material.uniforms.texture2.value = top.windowWidth < top.BREAK_POINT ? top.cardImagesSp[
              (top.currentCard === 0 ? top.cardLen : top.currentCard - 1)
              ] : top.cardImagesPc[
              (top.currentCard === 0 ? top.cardLen : top.currentCard - 1)
              ];

            top.timerSet();
          },
        });
      }
    }, 500);
  }
  public numberSet(): void {
    Array.prototype.forEach.call(top._numberItem, (el) => {
      base.removeClass(el, "is-active");
      base.removeClass(el, "is-current");
      base.removeClass(el, "is-next");
      base.removeClass(el, "is-prev");
    });
    base.addClass(top._numberItem[top.currentCard], "is-active");
    base.addClass(top._numberItem[top.currentCard], "is-current");
    base.addClass(top._numberItem[
      (top.currentCard === top.cardLen ? 0 : top.currentCard + 1)
      ], "is-active");
    base.addClass(top._numberItem[
      (top.currentCard === top.cardLen ? 0 : top.currentCard + 1)
      ], "is-next");
    base.addClass(top._numberItem[
      (top.currentCard === 0 ? top.cardLen : top.currentCard - 1)
      ], "is-active");
    base.addClass(top._numberItem[
      (top.currentCard === 0 ? top.cardLen : top.currentCard - 1)
      ], "is-prev");
  }
  public mouseHandler(e): void {
    if (e.type === eventName.MOUSE_DOWN) {
      top.CONTROL_AVAILABLE = true;
      top._startX = e.offsetX;
    } else if (e.type === eventName.MOUSE_MOVE) {

      if (top.CONTROL_AVAILABLE) {
        top._diffX = top._startX - e.offsetX;
      }
    } else if (e.type === eventName.MOUSE_UP) {
      if ( top._diffX <  - top.THRESHOLD) {
        // prev
        top.seekbarAngle.end = top.seekbarEnd;
        top.seekbar.pause(top.seekbarDuration);
        top.prevCard();
      } else if ( top._diffX >  top.THRESHOLD) {
        // next
        top.seekbarAngle.end = top.seekbarEnd;
        top.seekbar.pause(top.seekbarDuration);
        top.nextCard();
      }
      if ( top._diffX <  3 && top._diffX > -3) {
        const _target: HTMLAnchorElement =
          top._card[top.currentCard].querySelector(".title > a");
        const _href: string = _target.getAttribute("href");
        location.href = _href;
      }
      top.CONTROL_AVAILABLE = false;
      top._diffX = 0;
    }
  }
  public touchHandler(e): void {
    const touch = e.touches[0];
    if (e.type === eventName.TOUCH_START) {
      top.CONTROL_AVAILABLE = true;
      top._startX = touch.pageX;
    } else if (e.type === eventName.TOUCH_MOVE) {
      if (top.CONTROL_AVAILABLE) {
        top._diffX = top._startX - touch.pageX;
      }
    } else if (e.type === eventName.TOUCH_END) {
      if ( top._diffX <  - top.THRESHOLD) {
        // prev
        top.seekbarAngle.end = top.seekbarEnd;
        top.seekbar.pause(top.seekbarDuration);
        top.prevCard();
      } else if ( top._diffX >  top.THRESHOLD) {
        // next
        top.seekbarAngle.end = top.seekbarEnd;
        top.seekbar.pause(top.seekbarDuration);
        top.nextCard();
      }
      if ( top._diffX <  3 && top._diffX > -3) {
        const _target: HTMLAnchorElement =
          top._card[top.currentCard].querySelector(".title > a");
        const _href: string = _target.getAttribute("href");
        location.href = _href;
      }
      top.CONTROL_AVAILABLE = false;
      top._diffX = 0;
    }
  }
}
export const top: TopClass = new TopClass();
