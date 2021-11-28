import { Component, h, Prop, State } from '@stencil/core';
import { WindowResizeService } from '../../services/window-resize-service';
import { getCurrentValue } from '../../utils/utils';
/**
 * @slot media - This slot can either be a video or image component.
 * @slot content - This slot will usually serve a content text block.
 */
export class ContentGridFormatter {
  constructor() {
    // Flex or grid 
    /**
     * @type Select
     * @choice flex
     * @choice grid
     * @responsive
     */
    this.type = 'flex';
    /**
     * @type Boolean
     * @responsive
     */
    this.flexGrow = 'false';
    /**
     * @type Boolean
     * @responsive
     */
    this.flexShrink = 'false';
    /**
     * @type Select
     * @choice flex-start
     * @choice space-between
     * @choice center
     * @choice space-evenly
     * @responsive
     */
    this.flexAlign = 'space-between';
    /**
   * @type Number
   * @responsive
   */
    this.columns = '1';
  }
  componentWillLoad() {
    WindowResizeService.breakpointIndex$.subscribe(() => {
      let type = getCurrentValue(this.type);
      let flexAlign = getCurrentValue(this.flexAlign);
      let flexShrink = getCurrentValue(this.flexShrink);
      let flexGrow = getCurrentValue(this.flexGrow);
      let columns = getCurrentValue(this.columns);
      let classString = `content-grid-formatter-${type}`;
      if (type === 'flex') {
        classString += ` content-grid-formatter-${type}--${flexAlign}`;
        if (flexShrink) {
          classString += ` content-grid-formatter-${type}--shrink`;
        }
        if (flexGrow) {
          classString += ` content-grid-formatter-${type}--grow`;
        }
      }
      if (this.columns)
        classString += ` content-grid-formatter-cols-${columns}`;
      this.activeClassString = classString;
    });
  }
  render() {
    return (h("content-formatter-wrapper", { name: "content-grid-formatter" },
      h("div", { class: this.activeClassString },
        h("slot", null))));
  }
  static get is() { return "content-grid-formatter"; }
  static get originalStyleUrls() { return {
    "$": ["content-grid-formatter.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-grid-formatter.css"]
  }; }
  static get properties() { return {
    "type": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "GRID_TYPES | ResponsiveString",
        "resolved": "string",
        "references": {
          "GRID_TYPES": {
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
            "text": "flex",
            "name": "choice"
          }, {
            "text": "grid",
            "name": "choice"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "type",
      "reflect": false,
      "defaultValue": "'flex'"
    },
    "flexGrow": {
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
        "text": ""
      },
      "attribute": "flex-grow",
      "reflect": false,
      "defaultValue": "'false'"
    },
    "flexShrink": {
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
        "text": ""
      },
      "attribute": "flex-shrink",
      "reflect": false,
      "defaultValue": "'false'"
    },
    "flexAlign": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "FLEX_JUSTIFY_OPTIONS | ResponsiveString",
        "resolved": "string",
        "references": {
          "FLEX_JUSTIFY_OPTIONS": {
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
            "text": "flex-start",
            "name": "choice"
          }, {
            "text": "space-between",
            "name": "choice"
          }, {
            "text": "center",
            "name": "choice"
          }, {
            "text": "space-evenly",
            "name": "choice"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "flex-align",
      "reflect": false,
      "defaultValue": "'space-between'"
    },
    "columns": {
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
        "text": ""
      },
      "attribute": "columns",
      "reflect": false,
      "defaultValue": "'1'"
    }
  }; }
  static get states() { return {
    "activeClassString": {}
  }; }
}
