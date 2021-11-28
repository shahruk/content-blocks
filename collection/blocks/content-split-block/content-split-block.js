import { Component, h, Prop, State } from '@stencil/core';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot column1 - This will be column 1.
 * @slot column2 - This will be column 2.
 */
export class ContentSplitBlock {
  constructor() {
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
    return (h("content-block-wrapper", { name: "content-split-block", background: this.activeBackground, class: this.activeClass },
      h("content-grid-formatter", { type: "flex", "flex-grow": "true", "flex-shrink": "true", columns: "1|2" },
        h("slot", { name: "column1" }),
        h("slot", { name: "column2" }))));
  }
  static get is() { return "content-split-block"; }
  static get originalStyleUrls() { return {
    "$": ["content-split-block.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-split-block.css"]
  }; }
  static get properties() { return {
    "reverse": {
      "type": "any",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveBoolean | boolean",
        "resolved": "boolean | string",
        "references": {
          "ResponsiveBoolean": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Boolean",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "reverse",
      "reflect": false,
      "defaultValue": "false"
    },
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
        "tags": [{
            "text": "String",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "background",
      "reflect": false
    }
  }; }
  static get states() { return {
    "activeClass": {},
    "activeBackground": {}
  }; }
}
