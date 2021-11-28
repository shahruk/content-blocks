import { Component, Event, h, Host, Prop, State } from '@stencil/core';
import { Element } from '@stencil/core/internal';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot content - Inner contents of the button, usually plaintext.
 * @slot - Default slot, same as content slot.
 * @slot activatedContent - If this slot is used, the content in this will be scrolled to and triggered.
 */
export class ContentButton {
  constructor() {
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
    return (h(Host, null,
      h("a", { role: this.href === 'javascript:void(0);' ? 'button' : '', onClick: ev => this.onHandleClickEvent(ev), class: this.activeClass, "aria-expanded": this.expanded, "aria-controls": this.controls, href: this.href, target: this.target }, !this.clickableBlock ? (h("span", null,
        h("slot", { name: "content" }),
        h("slot", null))) : (h("div", { class: "content-button__clickable-content" },
        h("slot", { name: "content" }),
        h("slot", null)))),
      h("slot", { name: "activatedContent" })));
  }
  static get is() { return "content-button"; }
  static get originalStyleUrls() { return {
    "$": ["content-button.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-button.css"]
  }; }
  static get properties() { return {
    "href": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "URL",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "href",
      "reflect": false
    },
    "target": {
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
          }],
        "text": ""
      },
      "attribute": "target",
      "reflect": false
    },
    "styleClass": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [{
            "text": "String",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "style-class",
      "reflect": false,
      "defaultValue": "'content-block-default-button'"
    },
    "clickableBlock": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Boolean",
            "name": "type"
          }],
        "text": ""
      },
      "attribute": "clickable-block",
      "reflect": false,
      "defaultValue": "false"
    },
    "expanded": {
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
          }],
        "text": ""
      },
      "attribute": "expanded",
      "reflect": false
    },
    "controls": {
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
          }],
        "text": ""
      },
      "attribute": "controls",
      "reflect": false
    }
  }; }
  static get states() { return {
    "activeClass": {}
  }; }
  static get events() { return [{
      "method": "contentBlockActivated",
      "name": "contentBlockActivated",
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
