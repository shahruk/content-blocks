import { h, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue } from './utils.js';

const contentSplitBlockCss = "content-split-block{display:block}@media screen and (min-width: 768px){content-split-block .content-split-block--reverse .content-grid-formatter-flex>:first-child,content-split-block .content-split-block--reverse .content-grid-formatter-grid>:first-child{order:2}}";

const ContentSplitBlock$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    /**
     * @type Boolean
     * @responsive
     */
    this.reverse = false;
  }
  componentWillLoad() {
    WindowResizeService.breakpointIndex$.subscribe(() => {
      this.activeClass = getCurrentValue(this.reverse) ? 'content-split-block--reverse' : '';
      this.activeBackground = getCurrentValue(this.background);
    });
  }
  render() {
    return (h("content-block-wrapper", { name: "content-split-block", background: this.activeBackground, class: this.activeClass }, h("content-grid-formatter", { type: "flex", "flex-grow": "true", "flex-shrink": "true", columns: "1|2" }, h("slot", { name: "column1" }), h("slot", { name: "column2" }))));
  }
  static get style() { return contentSplitBlockCss; }
};

const ContentSplitBlock = /*@__PURE__*/proxyCustomElement(ContentSplitBlock$1, [4,"content-split-block",{"reverse":[8],"background":[1],"activeClass":[32],"activeBackground":[32]}]);

export { ContentSplitBlock };
