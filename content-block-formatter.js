import { h, proxyCustomElement } from '@stencil/core/internal/client';

const contentBlockFormatterCss = "content-block-formatter{display:block}";

const ContentBlockFormatter$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentWillLoad() {
    this.hasHeader = !!this.hostElement.querySelector('[slot="header"]');
  }
  render() {
    return (h("content-formatter-wrapper", { name: "content-block-formatter", "extra-classes": this.hasHeader ? 'content-block-formatter--full' : 'content-block-formatter--content' }, this.hasHeader &&
      h("div", { class: "content-block-formatter__header" }, h("slot", { name: "header" })), h("div", { class: "content-block-formatter__content" }, h("slot", { name: "content" }), h("slot", null))));
  }
  get hostElement() { return this; }
  static get style() { return contentBlockFormatterCss; }
};

const ContentBlockFormatter = /*@__PURE__*/proxyCustomElement(ContentBlockFormatter$1, [4,"content-block-formatter"]);

export { ContentBlockFormatter };
