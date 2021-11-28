import { createEvent, h, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue } from './utils.js';

const contentBlockWrapperCss = "content-block-wrapper{display:block;height:100%}.content-block-wrapper__background-wrapper{position:relative;height:100%}.content-block-wrapper__background-wrapper .content-block-wrapper__inner{position:relative;z-index:1;height:100%}.content-block-wrapper__background-wrapper .content-block-wrapper__background{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}";

const ContentBlockWrapper$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.contentBlockReady = createEvent(this, "contentBlockReady", 7);
    this.name = 'content-block';
    this.styleClass = '';
    this.backgroundClasses = '';
    this.maxWidth = '100%';
    this.innerClassName = this.name + '__inner';
  }
  computedBackgroundClassString() {
    let classString = `content-block-wrapper__background-wrapper`;
    if (this.backgroundClasses) {
      classString += ` ${this.backgroundClasses}`;
    }
    return classString;
  }
  componentWillLoad() {
    WindowResizeService.breakpointIndex$.subscribe(() => {
      if (this.styleClass) {
        this.activeClass = getCurrentValue(this.styleClass);
      }
      if (this.background) {
        let value = getCurrentValue(this.background);
        this.inlineStyle = {
          'background': value,
          'max-width': !isNaN(getCurrentValue(this.maxWidth)) ? getCurrentValue(this.maxWidth) : getCurrentValue(this.maxWidth) + '%',
        };
      }
    });
  }
  componentDidRender() {
    // this.contentBlockReady.emit(this.hostElement);
  }
  render() {
    return (h("div", { class: this.activeClass, style: this.inlineStyle }, h("div", { class: this.computedBackgroundClassString(), style: this.styleObject }, h("div", { class: `content-block-wrapper__inner${this.innerClassName ? ` ${this.innerClassName}` : ''}` }, h("slot", { name: "content" }), h("slot", null)))));
  }
  get hostElement() { return this; }
  static get style() { return contentBlockWrapperCss; }
};

const ContentBlockWrapper = /*@__PURE__*/proxyCustomElement(ContentBlockWrapper$1, [4,"content-block-wrapper",{"background":[1],"name":[1],"styleClass":[1,"style-class"],"backgroundClasses":[1,"background-classes"],"maxWidth":[1,"max-width"],"styleObject":[32],"activeClass":[32],"inlineStyle":[32]}]);

export { ContentBlockWrapper };
