import { Component, h, Host, Prop, State } from '@stencil/core';
import { WindowResizeService } from '../../services/window-resize-service';
import { breakpoints, breakpointValues, getCurrentValue, getValueAtIndex } from '../../utils/utils';
export class ContentImage {
  constructor() {
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
    return (h(Host, { class: this.lazyLoadIsComplete ? 'content-image-loaded' : this.computedLazyLoadClass() }, this.showVideo ? (h("video", { autoplay: true, muted: true, loop: true, preload: "none", playsinline: true, width: this.activeMediaValues.width, height: this.activeMediaValues.height },
      h("source", { src: this.lazyLoadIsComplete ? this.activeMediaValues.src : null, type: this.videoType }))) : (h("picture", null,
      h("source", { srcSet: pictureSrcSet }),
      h("img", { width: this.activeMediaValues.width, height: this.activeMediaValues.height, src: pictureImageSrc, alt: this.activeMediaValues.alt })))));
  }
  static get is() { return "content-image"; }
  static get originalStyleUrls() { return {
    "$": ["content-image.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-image.css"]
  }; }
  static get properties() { return {
    "lazyLoad": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Boolean",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "lazy-load",
      "reflect": false,
      "defaultValue": "true"
    },
    "src": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveString",
        "resolved": "string",
        "references": {
          "ResponsiveString": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": true,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "src",
      "reflect": false
    },
    "alt": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveString",
        "resolved": "string",
        "references": {
          "ResponsiveString": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "alt",
      "reflect": false
    },
    "width": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveNumber",
        "resolved": "string",
        "references": {
          "ResponsiveNumber": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Number",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "width",
      "reflect": false,
      "defaultValue": "'16'"
    },
    "height": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveNumber",
        "resolved": "string",
        "references": {
          "ResponsiveNumber": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Number",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "height",
      "reflect": false,
      "defaultValue": "'9'"
    },
    "videoType": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "video-type",
      "reflect": false,
      "defaultValue": "'video/mp4'"
    }
  }; }
  static get states() { return {
    "lazyLoadIsComplete": {},
    "showVideo": {},
    "activeMediaValues": {}
  }; }
}
