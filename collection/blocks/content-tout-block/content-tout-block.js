import { Component, h, Element } from '@stencil/core';
import { Prop, State } from '@stencil/core/internal';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot media - This slot is usually a video or image component.
 * @slot mediaContent - This is a layer that floats the media layer and is revealed on hover.
 * @slot content - This slot will usually serve a text block.
 * @slot - Default slot, same as content slot.
 */
export class ContentToutBlock {
  constructor() {
    /**
     * If true, the media content will show only on hover
     * @type Boolean
     * @responsive
    */
    this.hover = 'false|true';
    this.hasHoverContent = false;
  }
  componentWillLoad() {
    this.hasMediaContent = !!this.hostElement.querySelector('[slot="mediaContent"]');
    WindowResizeService.breakpointIndex$.subscribe(() => {
      this.hasHoverContent = getCurrentValue(this.hover) === 'true';
    });
  }
  render() {
    return (h("content-block-wrapper", { name: "content-tout-block" },
      h("div", { class: "content-tout-block__media" },
        h("div", { class: "content-tout-block__media-wrapper" },
          h("slot", { name: "media" })),
        this.hasMediaContent &&
          h("div", { class: `content-tout-block__media-content${this.hasHoverContent ? ' content-tout-block__media-content--hover' : ''}` },
            h("slot", { name: "mediaContent" }))),
      h("div", { class: "content-tout-block__content" },
        h("slot", { name: "content" }),
        h("slot", null))));
  }
  static get is() { return "content-tout-block"; }
  static get originalStyleUrls() { return {
    "$": ["content-tout-block.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-tout-block.css"]
  }; }
  static get properties() { return {
    "hover": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveBoolean",
        "resolved": "string",
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
        "text": "If true, the media content will show only on hover"
      },
      "attribute": "hover",
      "reflect": false,
      "defaultValue": "'false|true'"
    }
  }; }
  static get states() { return {
    "hasHoverContent": {}
  }; }
  static get elementRef() { return "hostElement"; }
}
