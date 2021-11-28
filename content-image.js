import { h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue, c as breakpointValues, d as getValueAtIndex, e as breakpoints } from './utils.js';

const contentImageCss = "content-image{display:block;height:auto}content-image .content-image{opacity:0}content-image .content-image.content-image-loaded{opacity:1}content-image .content-image img,content-image .content-image picture,content-image .content-image video{display:block;width:100%;height:auto}";

const ContentImage$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /**
     * @type Boolean
     */
    this.lazyLoad = true;
    /**
     * @type Number
     * @responsive
     */
    this.width = '16';
    /**
     * @type Number
     * @responsive
     */
    this.height = '9';
    /**
     * @type String
     */
    this.videoType = 'video/mp4';
    this.lazyLoadIsComplete = false;
    this.showVideo = false;
    this.activeMediaValues = {
      width: '1',
      height: '1',
      src: '',
      alt: '',
    };
  }
  preloadImage(src) {
    return new Promise(r => {
      const image = new Image();
      image.onload = r;
      image.onerror = r;
      image.src = src;
    });
  }
  componentWillLoad() {
    WindowResizeService.breakpointIndex$.subscribe(() => {
      this.activeMediaValues = {
        width: getCurrentValue(this.width),
        height: getCurrentValue(this.height),
        src: getCurrentValue(this.src),
        alt: getCurrentValue(this.alt),
      };
      this.showVideo = false;
      requestAnimationFrame(async () => {
        this.showVideo = getCurrentValue(this.src).indexOf('.mp4') >= 0;
        // Preload an image
        if (!this.showVideo) {
          await this.preloadImage(getCurrentValue(this.src));
          setTimeout(() => {
            this.lazyLoadIsComplete = true;
          }, 1000);
        }
        else {
          this.lazyLoadIsComplete = true;
        }
      });
    });
  }
  computedLazyLoadClass() {
    let className = '';
    if (!this.lazyLoad) {
      className = 'content-image-no-lazyload';
    }
    else {
      className = 'content-image-loading';
    }
    return className;
  }
  render() {
    let pictureSrcSet = '';
    let pictureImageSrc = '';
    breakpointValues.forEach((_bp, index) => {
      if (index === 0) {
        pictureImageSrc = getValueAtIndex(0, this.src);
      }
      else {
        pictureSrcSet += `${getValueAtIndex(index, this.src)} ${breakpoints[index]}w,`;
      }
    });
    return (h(Host, { class: this.lazyLoadIsComplete ? 'content-image-loaded' : this.computedLazyLoadClass() }, this.showVideo ? (h("video", { autoplay: true, muted: true, loop: true, preload: "none", playsinline: true, width: this.activeMediaValues.width, height: this.activeMediaValues.height }, h("source", { src: this.lazyLoadIsComplete ? this.activeMediaValues.src : null, type: this.videoType }))) : (h("picture", null, h("source", { srcSet: pictureSrcSet }), h("img", { width: this.activeMediaValues.width, height: this.activeMediaValues.height, src: pictureImageSrc, alt: this.activeMediaValues.alt })))));
  }
  static get style() { return contentImageCss; }
};

const ContentImage = /*@__PURE__*/proxyCustomElement(ContentImage$1, [0,"content-image",{"lazyLoad":[4,"lazy-load"],"src":[1],"alt":[1],"width":[1],"height":[1],"videoType":[1,"video-type"],"lazyLoadIsComplete":[32],"showVideo":[32],"activeMediaValues":[32]}]);

export { ContentImage };
