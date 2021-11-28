import { Component, h, Host } from '@stencil/core';
import { Element, Prop, State } from '@stencil/core/internal';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot poster - Poster shown before video is played.
 * @slot playButton - Play button contents.
 * @slot no-js-message - Contents of no JS message.
 * @slot content - Adjacent to no-js message for video. Usually not needed.
 * @slot - Default slot, same as content slot.
 */
export class ContentVideo {
  constructor() {
    /**
     * If this video is opened within a container, e.g. a <content-overlay> with a target.
     * The height of the video will fit the container instead of resizing to the video aspect ratio.
     * @type Boolean
     * @responsive
     */
    this.fitContainer = false;
    /**
     * @type Select
     * @choice youtube
     * @choice html5
     */
    this.method = 'youtube';
    /**
     * If you're using this inside a content-overlay for example, you may want the video to play immediately on launch.
     * @type Boolean
     */
    this.autoplay = false;
    /**
     * Supports YouTube and self hosted URLs.
     * @type String
     */
    this.src = '';
    /**
     * @type Number
     */
    this.width = 16;
    /**
     * @type Number
     */
    this.height = 9;
    /**
     * @type String
     */
    this.type = 'video/mp4';
    /**
     * @type String
     */
    this.playButtonAriaLabel = 'Play';
    /**
     * @type String
     * @responsive
     */
    this.styleClass = '';
    /**
     * @type Boolean
     */
    this.controls = true;
    /**
     * @type String
     */
    this.preload = 'metadata';
    this.isLoaded = false;
    this.hasPoster = false;
    this.activeClass = '';
    this.isPlayed = false;
  }
  computedVideoConfig() {
    let videoConfig = {};
    if (this.method === 'youtube' || this.src.indexOf('youtube') >= 0) {
      videoConfig = {
        "fluid": true,
        "techOrder": ["youtube"],
        "sources": [{
            "type": "video/youtube",
            "src": this.src,
          }],
        "youtube": {
          "showinfo": 0,
          "rel": 0,
          "modestbranding": 1,
        }
      };
    }
    return videoConfig;
  }
  initVideo() {
    this.isLoaded = true;
  }
  componentDidRender() {
    let self = this;
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          let videojs = await import('video.js');
          await import('videojs-youtube/dist/Youtube.js');
          this.hasPoster = !!this.hostElement.querySelector('[slot="poster"]');
          if (!this.hasPoster) {
            this.initVideo();
          }
          if (this.isLoaded && this.videoElement) {
            this.player = videojs.default(this.videoElement, this.computedVideoConfig(), function onPlayerReady() {
              if (self.hasPoster || self.autoplay) {
                self.isPlayed = true;
                this.play();
              }
            });
          }
        }
      });
    }, options);
    observer.observe(this.hostElement);
    if (this.styleClass) {
      WindowResizeService.breakpointIndex$.subscribe(() => {
        this.activeClass = getCurrentValue(this.styleClass);
        this.activeClass += ' content-video--fit-container';
      });
    }
  }
  onClickHandler(event) {
    event.preventDefault();
    if (this.hasPoster) {
      this.initVideo();
    }
    else {
      this.isPlayed = true;
      this.player.play();
    }
  }
  render() {
    return (h(Host, { class: this.activeClass },
      (this.hasPoster && !this.isLoaded) &&
        h("div", { class: "content-video__poster" },
          h("slot", { name: "poster" })),
      ((this.hasPoster && !this.isPlayed) || !this.isPlayed) &&
        h("button", { class: "content-video__play", "aria-label": this.playButtonAriaLabel, onClick: ev => this.onClickHandler(ev) },
          h("slot", { name: "playButton" })),
      h("div", { class: "content-video__content" }, (!this.hasPoster || this.isLoaded) &&
        h("video", { ref: element => this.videoElement = element, class: "video-js vjs-content-block-theme", controls: this.controls, preload: this.preload, width: this.width, height: this.height, crossorigin: "anonymous" },
          h("source", { src: this.src, type: this.type }),
          h("slot", { name: "no-js-message" }),
          h("slot", { name: "content" }),
          h("slot", null)))));
  }
  static get is() { return "content-video"; }
  static get originalStyleUrls() { return {
    "$": ["content-video.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-video.css"]
  }; }
  static get properties() { return {
    "fitContainer": {
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
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "If this video is opened within a container, e.g. a <content-overlay> with a target.\nThe height of the video will fit the container instead of resizing to the video aspect ratio."
      },
      "attribute": "fit-container",
      "reflect": false,
      "defaultValue": "false"
    },
    "method": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "SupportedVideoMethods",
        "resolved": "\"html5\" | \"youtube\"",
        "references": {
          "SupportedVideoMethods": {
            "location": "local"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Select",
            "name": "type"
          }, {
            "text": "youtube",
            "name": "choice"
          }, {
            "text": "html5",
            "name": "choice"
          }],
        "text": ""
      },
      "attribute": "method",
      "reflect": false,
      "defaultValue": "'youtube'"
    },
    "autoplay": {
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
        "text": "If you're using this inside a content-overlay for example, you may want the video to play immediately on launch."
      },
      "attribute": "autoplay",
      "reflect": false,
      "defaultValue": "false"
    },
    "src": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }],
        "text": "Supports YouTube and self hosted URLs."
      },
      "attribute": "src",
      "reflect": false,
      "defaultValue": "''"
    },
    "width": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Number",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "width",
      "reflect": false,
      "defaultValue": "16"
    },
    "height": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Number",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "height",
      "reflect": false,
      "defaultValue": "9"
    },
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'video/mp4'"
    },
    "playButtonAriaLabel": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "play-button-aria-label",
      "reflect": false,
      "defaultValue": "'Play'"
    },
    "styleClass": {
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
      "attribute": "style-class",
      "reflect": false,
      "defaultValue": "''"
    },
    "controls": {
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
      "attribute": "controls",
      "reflect": false,
      "defaultValue": "true"
    },
    "preload": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "preload",
      "reflect": false,
      "defaultValue": "'metadata'"
    }
  }; }
  static get states() { return {
    "isLoaded": {},
    "hasPoster": {},
    "activeClass": {},
    "isPlayed": {}
  }; }
  static get elementRef() { return "hostElement"; }
}
