import { Component, h, Element } from '@stencil/core';
/**
 * @slot header - Header area, usually shown framed above or next to the content.
 * @slot content - Contents of the formatter, can be anything.
 * @slot - Default slot, same as content slot.
 */
export class ContentBlockFormatter {
  componentWillLoad() {
    this.hasHeader = !!this.hostElement.querySelector('[slot="header"]');
  }
  render() {
    return (h("content-formatter-wrapper", { name: "content-block-formatter", "extra-classes": this.hasHeader ? 'content-block-formatter--full' : 'content-block-formatter--content' },
      this.hasHeader &&
        h("div", { class: "content-block-formatter__header" },
          h("slot", { name: "header" })),
      h("div", { class: "content-block-formatter__content" },
        h("slot", { name: "content" }),
        h("slot", null))));
  }
  static get is() { return "content-block-formatter"; }
  static get originalStyleUrls() { return {
    "$": ["content-block-formatter.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-block-formatter.css"]
  }; }
  static get elementRef() { return "hostElement"; }
}
