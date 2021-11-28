import { Component, h, Element } from '@stencil/core';
import W3Tabs from './libraries/w3_tabs';
/**
 * @slot content - This slot will usually serve specific markup to ensure tabs are accessible.
 * @slot - Default slot, same as content slot.
 */
export class ContentTabs {
  componentDidLoad() {
    new W3Tabs(this.element);
  }
  render() {
    return (h("content-block-wrapper", { name: "content-tabs" },
      h("slot", { name: "content" }),
      h("slot", null)));
  }
  static get is() { return "content-tabs"; }
  static get originalStyleUrls() { return {
    "$": ["content-tabs.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-tabs.css"]
  }; }
  static get elementRef() { return "element"; }
}
