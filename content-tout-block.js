import { h, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue } from './utils.js';

const contentToutBlockCss = "content-tout-block .content-tout-block__media{position:relative}content-tout-block .content-tout-block__media-content{position:absolute;width:100%;height:100%;top:0;left:0;display:flex;align-items:center;justify-content:center;overflow:hidden}content-tout-block .content-tout-block__media-content [slot=mediaContent]{height:100%;width:100%}@media (hover: hover){content-tout-block .content-tout-block__media-content--hover{opacity:0}content-tout-block .content-tout-block__media-content--hover:hover{opacity:1}}";

const ContentToutBlock$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /**
     * If true, the media content will show only on hover
     * @type Boolean
     * @responsive
    */
    this.hover = 'false|true';
    this.hasHoverContent = false;
  }
  componentWillLoad() {
    this.hasMediaContent = !!this.hostElement.querySelector('[slot="mediaContent"]');
    WindowResizeService.breakpointIndex$.subscribe(() => {
      this.hasHoverContent = getCurrentValue(this.hover) === 'true';
    });
  }
  render() {
    return (h("content-block-wrapper", { name: "content-tout-block" }, h("div", { class: "content-tout-block__media" }, h("div", { class: "content-tout-block__media-wrapper" }, h("slot", { name: "media" })), this.hasMediaContent &&
      h("div", { class: `content-tout-block__media-content${this.hasHoverContent ? ' content-tout-block__media-content--hover' : ''}` }, h("slot", { name: "mediaContent" }))), h("div", { class: "content-tout-block__content" }, h("slot", { name: "content" }), h("slot", null))));
  }
  get hostElement() { return this; }
  static get style() { return contentToutBlockCss; }
};

const ContentToutBlock = /*@__PURE__*/proxyCustomElement(ContentToutBlock$1, [4,"content-tout-block",{"hover":[1],"hasHoverContent":[32]}]);

export { ContentToutBlock };
