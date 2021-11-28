import { Component, Prop, h, State, Host } from '@stencil/core';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot content - Inner contents of the line, usually plaintext.
 * @slot - Default slot, same as content slot.
 */
export class ContentBlockLine {
  constructor() {
    // /**
    //  * The element tag to use.
    //  * @type Select
    //  * @choice div
    //  * @choice p
    //  * @choice h1
    //  * @choice h2
    //  * @choice h3
    //  * @choice h4
    //  * @choice h5
    //  * @choice h6
    //  * @choice span
    //  * @choice section
    //  * @choice article
    //  */
    // @Prop() tag: ContentLineTagOptions = 'div';
    /**
     * Pipe separated list of ContentLineTextAlignOptions for text alignment.
     * @type Select
     * @choice default
     * @choice left
     * @choice center
     * @choice right
     * @responsive
     */
    this.textAlign = 'default';
    /**
     * Pipe separated list of max width numbers. You can also use units such as "px" and "vw".
     * @type Percentage
     * @responsive
     */
    this.maxWidth = '100%';
    this.inlineStyle = {};
  }
  componentWillLoad() {
    if (this.styleClass) {
      WindowResizeService.breakpointIndex$.subscribe(() => {
        this.activeClass = `${getCurrentValue(this.styleClass)}`;
        this.innerActiveClass = `content-line__inner content-line-text-align-${getCurrentValue(this.textAlign)}`;
        if (this.maxWidth) {
          this.inlineStyle = {
            'max-width': isNaN(getCurrentValue(this.maxWidth)) ? getCurrentValue(this.maxWidth) : getCurrentValue(this.maxWidth) + '%',
          };
        }
      });
    }
  }
  render() {
    // The capital case in this JSX variable is important
    // const ElementTagParsed = `${this.tag}`;
    return (h(Host, { class: this.activeClass },
      h("span", { class: this.innerActiveClass, style: this.inlineStyle },
        h("slot", { name: "content" }),
        h("slot", null))));
  }
  static get is() { return "content-line"; }
  static get originalStyleUrls() { return {
    "$": ["content-line.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-line.css"]
  }; }
  static get properties() { return {
    "textAlign": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ContentLineTextAlignOptions | ResponsiveString",
        "resolved": "string",
        "references": {
          "ContentLineTextAlignOptions": {
            "location": "local"
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
            "text": "default",
            "name": "choice"
          }, {
            "text": "left",
            "name": "choice"
          }, {
            "text": "center",
            "name": "choice"
          }, {
            "text": "right",
            "name": "choice"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated list of ContentLineTextAlignOptions for text alignment."
      },
      "attribute": "text-align",
      "reflect": false,
      "defaultValue": "'default'"
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
        "tags": [{
            "text": "String",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "The font class for the line."
      },
      "attribute": "style-class",
      "reflect": false
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
        "tags": [{
            "text": "Percentage",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated list of max width numbers. You can also use units such as \"px\" and \"vw\"."
      },
      "attribute": "max-width",
      "reflect": false,
      "defaultValue": "'100%'"
    }
  }; }
  static get states() { return {
    "activeClass": {},
    "innerActiveClass": {},
    "inlineStyle": {}
  }; }
}
