import { Component, h, Element } from '@stencil/core';
import { Prop } from '@stencil/core/internal';
import { generateResponsiveClass } from '../../utils/utils';
/**
 * @slot content - This slot will usually serve a text block.
 * @slot footer - This slot is placed below the content slot
 * @slot - Default slot, same as content slot
 */
export class ContentTextBlock {
  constructor() {
    /**
     * Pipe separated list of ContentVerticalAlignments for text box placement.
     * @type Select
     * @choice top
     * @choice center
     * @choice bottom
     * @responsive
     */
    this.verticalAlignment = 'top';
  }
  computedClasses() {
    let extraClasses = 'content-text-block__wrapper';
    if (this.verticalAlignment)
      extraClasses += ` content-text-block-vertical-align ${generateResponsiveClass('content-text-block-vertical-align', this.verticalAlignment)}`;
    if (!!this.hostElement.querySelector('[slot="footer"]')) {
      extraClasses += ' content-text-block__wrapper--footer';
    }
    return extraClasses;
  }
  computedBackgroundClasses() {
    let extraClasses = '';
    if (this.verticalAlignment)
      extraClasses += ` content-text-block-vertical-align ${generateResponsiveClass('content-text-block-vertical-align', this.verticalAlignment)}`;
    return extraClasses;
  }
  render() {
    return (h("content-block-wrapper", { name: "content-text-block", "style-class": this.styleClass, "background-classes": this.computedBackgroundClasses(), background: this.background },
      h("div", { class: this.computedClasses() },
        h("div", { class: "content-text-block__content" },
          h("slot", { name: "content" }),
          h("slot", null)),
        h("slot", { name: "footer" }))));
  }
  static get is() { return "content-text-block"; }
  static get originalStyleUrls() { return {
    "$": ["content-text-block.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-text-block.css"]
  }; }
  static get properties() { return {
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
        "tags": [{
            "text": "String",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "This is a pipe separated string representing the style class."
      },
      "attribute": "style-class",
      "reflect": false
    },
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
    },
    "verticalAlignment": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ContentVerticalAlignments | ResponsiveString",
        "resolved": "string",
        "references": {
          "ContentVerticalAlignments": {
            "location": "import",
            "path": "../../typings"
          },
          "ResponsiveString": {
            "location": "import",
            "path": "../../typings"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [{
            "text": "Select",
            "name": "type"
          }, {
            "text": "top",
            "name": "choice"
          }, {
            "text": "center",
            "name": "choice"
          }, {
            "text": "bottom",
            "name": "choice"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated list of ContentVerticalAlignments for text box placement."
      },
      "attribute": "vertical-alignment",
      "reflect": false,
      "defaultValue": "'top'"
    }
  }; }
  static get elementRef() { return "hostElement"; }
}
