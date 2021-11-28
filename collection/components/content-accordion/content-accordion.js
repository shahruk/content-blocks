import { Component, h, Element } from '@stencil/core';
import W3DisclosureButton from './libraries/w3_disclosure_button';
/**
 * @slot content - This slot will usually serve a content button.
 * @slot - Default slot, same as content slot.
 */
export class ContentAccordion {
  constructor() {
    this.initialized = false;
  }
  componentDidLoad() {
    if (!this.initialized) {
      this.initialized = true;
      new W3DisclosureButton(this.element);
    }
  }
  render() {
    return (h("content-block-wrapper", { name: "content-accordion" },
      h("slot", { name: "content" }),
      h("slot", null)));
  }
  static get is() { return "content-accordion"; }
  static get originalStyleUrls() { return {
    "$": ["content-accordion.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-accordion.css"]
  }; }
  static get elementRef() { return "element"; }
}
