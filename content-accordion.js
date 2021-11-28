import { h, proxyCustomElement } from '@stencil/core/internal/client';

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   ButtonExpand.js
*
*   Desc:   Checkbox widget that implements ARIA Authoring Practices
*           for a menu of links
*/
/*
*   @constructor ButtonExpand
*
*
*/
var ButtonExpand = function (domNode) {
  this.domNode = domNode;
  this.keyCode = Object.freeze({
    'RETURN': 13
  });
};
ButtonExpand.prototype.init = function () {
  this.controlledNode = false;
  var id = this.domNode.getAttribute('aria-controls');
  if (id) {
    this.controlledNode = document.getElementById(id);
  }
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  if (this.domNode.getAttribute('aria-expanded') === 'false') {
    this.domNode.setAttribute('aria-expanded', 'false');
    this.hideContent();
  }
};
ButtonExpand.prototype.showContent = function () {
  if (this.controlledNode) {
    this.controlledNode.style.display = 'block';
  }
};
ButtonExpand.prototype.hideContent = function () {
  if (this.controlledNode) {
    this.controlledNode.style.display = 'none';
  }
};
ButtonExpand.prototype.toggleExpand = function () {
  if (this.domNode.getAttribute('aria-expanded') === 'true') {
    this.domNode.setAttribute('aria-expanded', 'false');
    this.hideContent();
  }
  else {
    this.domNode.setAttribute('aria-expanded', 'true');
    this.showContent();
  }
};
/* EVENT HANDLERS */
ButtonExpand.prototype.handleKeydown = function (event) {
  switch (event.keyCode) {
    case this.keyCode.RETURN:
      this.toggleExpand();
      event.stopPropagation();
      event.preventDefault();
      break;
  }
};
ButtonExpand.prototype.handleClick = function (e) {
  e.preventDefault();
  this.toggleExpand();
};
ButtonExpand.prototype.handleFocus = function () {
  this.domNode.classList.add('focus');
};
ButtonExpand.prototype.handleBlur = function () {
  this.domNode.classList.remove('focus');
};
class W3DisclosureButton {
  constructor(stencilElement) {
    var buttons = stencilElement.querySelectorAll('button[aria-expanded][aria-controls], a[role="button"][aria-expanded][aria-controls]');
    for (var i = 0; i < buttons.length; i++) {
      var be = new ButtonExpand(buttons[i]);
      be.init();
    }
  }
}

const contentAccordionCss = "content-accordion{display:block}content-accordion button[aria-expanded][aria-controls]{padding:0;border:none;font:inherit;color:inherit;background-color:transparent;cursor:pointer}";

const ContentAccordion$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.initialized = false;
  }
  componentDidLoad() {
    if (!this.initialized) {
      this.initialized = true;
      new W3DisclosureButton(this.element);
    }
  }
  render() {
    return (h("content-block-wrapper", { name: "content-accordion" }, h("slot", { name: "content" }), h("slot", null)));
  }
  get element() { return this; }
  static get style() { return contentAccordionCss; }
};

const ContentAccordion = /*@__PURE__*/proxyCustomElement(ContentAccordion$1, [4,"content-accordion"]);

export { ContentAccordion };
