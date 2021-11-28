import { Component, Element, Event, h, Prop, State } from '@stencil/core';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot content - Inner contents of the block, can be anything.
 * @slot - Default slot, same as content slot.
 */
export class ContentBlockWrapper {
  constructor() {
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
    return (h("div", { class: this.activeClass, style: this.inlineStyle },
      h("div", { class: this.computedBackgroundClassString(), style: this.styleObject },
        h("div", { class: `content-block-wrapper__inner${this.innerClassName ? ` ${this.innerClassName}` : ''}` },
          h("slot", { name: "content" }),
          h("slot", null)))));
  }
  static get is() { return "content-block-wrapper"; }
  static get originalStyleUrls() { return {
    "$": ["content-block-wrapper.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-block-wrapper.css"]
  }; }
  static get properties() { return {
    "background": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveString",
        "resolved": "string",
        "references": {
          "ResponsiveString": {
            "location": "import",
            "path": "../../typings"
          }
        }
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
      "defaultValue": "'content-block'"
    },
    "styleClass": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveString",
        "resolved": "string",
        "references": {
          "ResponsiveString": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "style-class",
      "reflect": false,
      "defaultValue": "''"
    },
    "backgroundClasses": {
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
      "attribute": "background-classes",
      "reflect": false,
      "defaultValue": "''"
    },
    "maxWidth": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveNumber",
        "resolved": "string",
        "references": {
          "ResponsiveNumber": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "max-width",
      "reflect": false,
      "defaultValue": "'100%'"
    }
  }; }
  static get states() { return {
    "styleObject": {},
    "activeClass": {},
    "inlineStyle": {}
  }; }
  static get events() { return [{
      "method": "contentBlockReady",
      "name": "contentBlockReady",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "HTMLElement",
        "resolved": "HTMLElement",
        "references": {
          "HTMLElement": {
            "location": "global"
          }
        }
      }
    }]; }
  static get elementRef() { return "hostElement"; }
}
