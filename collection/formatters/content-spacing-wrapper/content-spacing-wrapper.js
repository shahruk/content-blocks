import { Component, h, Prop, State } from '@stencil/core';
import { WindowResizeService } from '../../services/window-resize-service';
import { generateResponsiveClass, getCurrentValue } from '../../utils/utils';
/**
 * @slot content - Inner contents of spacing wrapper, can be anything.
 * @slot - Default slot, same as content slot.
 */
export class ContentSpacingWrapper {
  constructor() {
    /**
     * Pipe separated list of max width numbers. You can also use units such as "px" and "vw".
     * @type Percentage
     * @responsive
     */
    this.maxWidth = '100%';
    /**
     * Pipe separated boolean values for full height. Typically, this is used if you have a hero block and you want a footer that aligns with the text layer. This is a niche case, but a valid one.
     * @type Boolean
     * @responsive
     */
    this.fullHeight = 'false';
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
     * Pipe separated numbers between 0 and 100.
     * @type Number
     * @responsive
     */
    this.topOffset = '0';
    /**
     * Pipe separated numbers between 0 and 100.
     * @type Number
     * @responsive
     */
    this.bottomOffset = '0';
    /**
     * Pipe separated numbers between 0 and 100.
     * @type Number
     * @responsive
     */
    this.leftOffset = '0';
    /**
     * Pipe separated numbers between 0 and 100.
     * @type Number
     * @responsive
     */
    this.rightOffset = '0';
    /**
     * A custom class to use as the offset. This cannot be pipe separated, because this causes repaint of content.
     * @type String
     */
    this.offsetClass = '';
  }
  componentWillLoad() {
    WindowResizeService.breakpointIndex$.subscribe(() => {
      this.inlineStyle = {
        'max-width': isNaN(getCurrentValue(this.maxWidth)) ? getCurrentValue(this.maxWidth) : getCurrentValue(this.maxWidth) + '%',
      };
    });
  }
  computedClasses() {
    let classString = 'content-spacing-wrapper__alignments';
    if (this.textAlign)
      classString += ` ${generateResponsiveClass('content-text-align', this.textAlign)}`;
    if (this.horizontalAlignment)
      classString += ` ${generateResponsiveClass('content-horizontal-alignment', this.horizontalAlignment)}`;
    return classString;
  }
  computedOffsetClasses() {
    let classString = 'content-spacing-wrapper__offsets';
    let directions = ['left', 'top', 'right', 'bottom'];
    directions.forEach(direction => {
      let offset = this[direction + 'Offset'];
      let keyString = `content-offset-${direction}`;
      classString += ` ${generateResponsiveClass(keyString, offset)}`;
    });
    if (this.fullHeight) {
      classString += ` ${generateResponsiveClass('content-full-height', this.fullHeight)}`;
    }
    if (this.offsetClass) {
      classString += ' ' + this.offsetClass;
    }
    return classString;
  }
  render() {
    return (h("div", { class: this.computedOffsetClasses() },
      h("div", { class: this.computedClasses(), style: this.inlineStyle },
        h("slot", { name: "content" }),
        h("slot", null))));
  }
  static get is() { return "content-spacing-wrapper"; }
  static get originalStyleUrls() { return {
    "$": ["content-spacing-wrapper.scss", "../../scss/utility-classes.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-spacing-wrapper.css", "../../scss/utility-classes.css"]
  }; }
  static get properties() { return {
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
    },
    "fullHeight": {
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
        "text": "Pipe separated boolean values for full height. Typically, this is used if you have a hero block and you want a footer that aligns with the text layer. This is a niche case, but a valid one."
      },
      "attribute": "full-height",
      "reflect": false,
      "defaultValue": "'false'"
    },
    "textAlign": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ContentLineTextAlignOptions | ResponsiveString",
        "resolved": "string",
        "references": {
          "ContentLineTextAlignOptions": {
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
    "horizontalAlignment": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ContentLineTextAlignOptions | ResponsiveString",
        "resolved": "string",
        "references": {
          "ContentLineTextAlignOptions": {
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
        "text": "Pipe separated list of ContentLineTextAlignOptions for where to place text box when a max width is specified."
      },
      "attribute": "horizontal-alignment",
      "reflect": false
    },
    "topOffset": {
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
            "text": "Number",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated numbers between 0 and 100."
      },
      "attribute": "top-offset",
      "reflect": false,
      "defaultValue": "'0'"
    },
    "bottomOffset": {
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
            "text": "Number",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated numbers between 0 and 100."
      },
      "attribute": "bottom-offset",
      "reflect": false,
      "defaultValue": "'0'"
    },
    "leftOffset": {
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
            "text": "Number",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated numbers between 0 and 100."
      },
      "attribute": "left-offset",
      "reflect": false,
      "defaultValue": "'0'"
    },
    "rightOffset": {
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
            "text": "Number",
            "name": "type"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated numbers between 0 and 100."
      },
      "attribute": "right-offset",
      "reflect": false,
      "defaultValue": "'0'"
    },
    "offsetClass": {
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
        "text": "A custom class to use as the offset. This cannot be pipe separated, because this causes repaint of content."
      },
      "attribute": "offset-class",
      "reflect": false,
      "defaultValue": "''"
    }
  }; }
  static get states() { return {
    "inlineStyle": {}
  }; }
}
