import { Component, Host, h, Prop } from '@stencil/core';
/**
 * @slot content - Contents of the wrapper, can be anything.
 * @slot - Default slot, same as content slot.
 */
export class ContentFormatterWrapper {
  constructor() {
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
      } },
      h("div", { class: this.innerClassName },
        h("slot", { name: "content" }),
        h("slot", null))));
  }
  static get is() { return "content-formatter-wrapper"; }
  static get originalStyleUrls() { return {
    "$": ["content-formatter-wrapper.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-formatter-wrapper.css"]
  }; }
  static get properties() { return {
    "background": {
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
        "tags": [],
        "text": ""
      },
      "attribute": "background",
      "reflect": false
    },
    "name": {
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
        "tags": [],
        "text": ""
      },
      "attribute": "name",
      "reflect": false,
      "defaultValue": "'content-formatter'"
    },
    "extraClasses": {
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
        "tags": [],
        "text": ""
      },
      "attribute": "extra-classes",
      "reflect": false,
      "defaultValue": "''"
    }
  }; }
}
