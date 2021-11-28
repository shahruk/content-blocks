import { h, Host, proxyCustomElement } from '@stencil/core/internal/client';

const contentFormatterWrapperCss = "content-formatter-wrapper{display:block}";

const ContentFormatterWrapper$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.name = 'content-formatter';
    this.extraClasses = '';
    this.outerClassName = this.name + '__outer';
    this.innerClassName = this.name + '__inner';
  }
  computedClassString() {
    let classString = '';
    if (!this.extraClasses) {
      classString = this.name;
    }
    else {
      classString = `${this.name} ${this.extraClasses}`;
    }
    return classString;
  }
  render() {
    return (h(Host, { class: this.computedClassString(), style: {
        'background': this.background
      } }, h("div", { class: this.innerClassName }, h("slot", { name: "content" }), h("slot", null))));
  }
  static get style() { return contentFormatterWrapperCss; }
};

const ContentFormatterWrapper = /*@__PURE__*/proxyCustomElement(ContentFormatterWrapper$1, [4,"content-formatter-wrapper",{"background":[1],"name":[1],"extraClasses":[1,"extra-classes"]}]);

export { ContentFormatterWrapper };
