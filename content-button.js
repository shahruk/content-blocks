import { createEvent, h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue } from './utils.js';

const contentButtonCss = "content-button{display:inline-block}content-button[clickable-block=true]{display:block;width:100%}content-button[clickable-block=true]>content-element-wrapper{height:100%;width:100%}content-button[clickable-block=true]>content-element-wrapper>.content-button{height:100%;width:100%}content-button[clickable-block=true]>content-element-wrapper>.content-button>a,content-button[clickable-block=true]>content-element-wrapper>.content-button>button{height:100%;width:100%}content-button[clickable-block=true]>content-element-wrapper>.content-button>a>*,content-button[clickable-block=true]>content-element-wrapper>.content-button>button>*{display:block;width:100%}content-button[clickable-block=true] .content-button__clickable-content{width:100%;height:100%}content-button .content-button>a,content-button .content-button>button{display:flex;align-items:center;justify-content:center}content-button .content-button>button{appearance:none;background:inherit;cursor:pointer}";

const ContentButton$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.contentBlockActivated = createEvent(this, "contentBlockActivated", 7);
    /**
     * @type String
     */
    this.styleClass = 'content-block-default-button';
    /**
     * @type Boolean
     */
    this.clickableBlock = false;
  }
  componentWillLoad() {
    this.activatedContent = this.hostElement.querySelector('[slot="activatedContent"]');
    this.hasContentToActivate = !!this.activatedContent;
    // If this is a clickable block, forcefully add a # to force an anchor link
    if (!this.href || this.href === '#') {
      this.href = 'javascript:void(0);';
    }
    if (this.styleClass) {
      WindowResizeService.breakpointIndex$.subscribe(() => {
        this.activeClass = getCurrentValue(this.styleClass);
      });
    }
  }
  onHandleClickEvent(ev) {
    if (this.hasContentToActivate) {
      ev.preventDefault();
      ev.stopPropagation();
      this.contentBlockActivated.emit(this.activatedContent);
      this.activatedContent.scrollIntoView();
    }
    else if (this.href && this.href.length > 1 && this.href.substr(0, 1) === '#') {
      let element = document.getElementById(this.href.substr(1));
      if (element) {
        ev.preventDefault();
        ev.stopPropagation();
        this.contentBlockActivated.emit(element);
        element.scrollIntoView();
      }
    }
  }
  render() {
    return (h(Host, null, h("a", { role: this.href === 'javascript:void(0);' ? 'button' : '', onClick: ev => this.onHandleClickEvent(ev), class: this.activeClass, "aria-expanded": this.expanded, "aria-controls": this.controls, href: this.href, target: this.target }, !this.clickableBlock ? (h("span", null, h("slot", { name: "content" }), h("slot", null))) : (h("div", { class: "content-button__clickable-content" }, h("slot", { name: "content" }), h("slot", null)))), h("slot", { name: "activatedContent" })));
  }
  get hostElement() { return this; }
  static get style() { return contentButtonCss; }
};

const ContentButton = /*@__PURE__*/proxyCustomElement(ContentButton$1, [4,"content-button",{"href":[1025],"target":[1],"styleClass":[1,"style-class"],"clickableBlock":[4,"clickable-block"],"expanded":[1],"controls":[1],"activeClass":[32]}]);

export { ContentButton };
