import { Component, Host, h, Prop, State, Listen, Element } from '@stencil/core';
import { Event } from '@stencil/core/internal';
import { WindowResizeService } from '../../services/window-resize-service';
import { generateResponsiveClass, getCurrentValue } from '../../utils/utils';
import './libraries/aria-utilities';
import './libraries/aria-dialog';
/**
 * @slot closeButton - Contents of the <button> that will close the overlay when triggered.
 * @slot header - This is adjacent to the close button, usually a header or title for the overlay.
 * @slot content - Contents that sit inside the overlay.
 */
export class ContentOverlay {
  constructor() {
    /**
     * @type Boolean
     * @responsive
     */
    this.fullScreen = 'true';
    /**
     * A pipe delimited setting for horizontal alignment. This only applies when fullscreen mode is activated.
     * @type Select
     * @choice default
     * @choice left
     * @choice center
     * @choice right
     * @responsive
     */
    this.horizontalAlignment = 'center';
    /**
     * A pipe delimited setting for vertical alignment. This only applies when fullscreen mode is activated.
     * @type Select
     * @choice top
     * @choice center
     * @choice bottom
     */
    this.verticalAlignment = 'center';
    /**
     * Title attribute value for the close button.
     * @type String
     */
    this.closeTitle = 'Close Overlay';
    this.isActive = false;
    this.activeClass = '';
    this.isFullScreen = false;
  }
  onContentBlockActivated(event) {
    if (this.hostElement === event.detail) {
      event.preventDefault();
      if (this.isActive) {
        return false;
      }
      if (this.target) {
        let targetElement = document.getElementById(this.target);
        if (targetElement) {
          targetElement.classList.add('content-block-overlay-container');
          targetElement.appendChild(this.hostElement);
        }
      }
      else if (this.isFullScreen) {
        document.body.appendChild(this.hostElement);
      }
      if (this.contentSlot) {
        this.isActive = true;
        this.setComputedActiveClass();
        this.ariaDialog = new aria.Dialog(this.dialogElement, this.hostElement, this.target, this.isFullScreen);
        this.contentElement.innerHTML = this.contentSlot.innerHTML;
      }
      this.contentOverlayActivated.emit(this.hostElement);
    }
  }
  setComputedActiveClass() {
    let positioningValue = 'static';
    if (this.target) {
      positioningValue = 'absolute';
    }
    if (this.isFullScreen) {
      positioningValue = 'fullscreen';
    }
    this.activeClass = `content-overlay ${this.isActive ? 'content-overlay-active' : 'content-overlay-inactive'}  content-overlay--${positioningValue} ${getCurrentValue(this.styleClass)}`;
  }
  ;
  componentWillLoad() {
    let targetElement = document.getElementById(this.target);
    this.contentSlot = this.hostElement.querySelector('[slot="content"]');
    WindowResizeService.breakpointIndex$.subscribe(() => {
      this.isFullScreen = (!targetElement && getCurrentValue(this.fullScreen) === 'true');
      this.setComputedActiveClass();
    });
  }
  closeOverlayButtonClicked(event) {
    event.preventDefault();
    event.stopPropagation();
    this.ariaDialog.close();
  }
  onAriaDialogClosed() {
    this.contentElement.innerHTML = '';
    this.isActive = false;
    this.setComputedActiveClass();
  }
  render() {
    return (h(Host, { class: this.activeClass },
      h("div", { ref: element => this.dialogElement = element, role: "dialog", "aria-modal": "true", class: "hidden", "aria-expanded": "false" },
        h("div", { class: "content-overlay__header" },
          h("button", { onClick: e => this.closeOverlayButtonClicked(e), class: "content-overlay__close", title: this.closeTitle },
            h("slot", { name: "closeButton" })),
          h("slot", { name: "header" })),
        h("slot", { name: "content" }),
        h("div", { ref: element => this.contentElement = element, class: `content-overlay__content ${generateResponsiveClass('content-overlay-vertical-position', this.verticalAlignment)} ${generateResponsiveClass('content-overlay-horizontal-position', this.horizontalAlignment)}` }))));
  }
  static get is() { return "content-overlay"; }
  static get originalStyleUrls() { return {
    "$": ["content-overlay.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-overlay.css"]
  }; }
  static get properties() { return {
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
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": ""
      },
      "attribute": "target",
      "reflect": false
    },
    "fullScreen": {
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
      "attribute": "full-screen",
      "reflect": false,
      "defaultValue": "'true'"
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
        "text": ""
      },
      "attribute": "style-class",
      "reflect": false
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
        "text": "A pipe delimited setting for horizontal alignment. This only applies when fullscreen mode is activated."
      },
      "attribute": "horizontal-alignment",
      "reflect": false,
      "defaultValue": "'center'"
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
          }],
        "text": "A pipe delimited setting for vertical alignment. This only applies when fullscreen mode is activated."
      },
      "attribute": "vertical-alignment",
      "reflect": false,
      "defaultValue": "'center'"
    },
    "closeTitle": {
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
        "text": "Title attribute value for the close button."
      },
      "attribute": "close-title",
      "reflect": false,
      "defaultValue": "'Close Overlay'"
    }
  }; }
  static get states() { return {
    "isActive": {},
    "activeClass": {}
  }; }
  static get events() { return [{
      "method": "contentOverlayActivated",
      "name": "contentOverlayActivated",
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
  static get listeners() { return [{
      "name": "contentBlockActivated",
      "method": "onContentBlockActivated",
      "target": "window",
      "capture": false,
      "passive": false
    }, {
      "name": "ariaDialog.closed",
      "method": "onAriaDialogClosed",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
