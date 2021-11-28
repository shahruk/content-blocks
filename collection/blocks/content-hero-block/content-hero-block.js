import { Component, h, Prop } from '@stencil/core';
import { Element, Listen, State } from '@stencil/core/internal';
import { generateResponsiveClass } from '../../utils/utils';
/**
 * @slot media - This slot is usually either a video or image component.
 * @slot content - This slot will usually serve a text block.
 * @slot - Default slot, same as content slot
 */
export class ContentHeroBlock {
  constructor() {
    /**
     * Pipe separated HeroContentPlacementOptions that will determine where the content is positioned with the media.
     * @type Select
     * @choice below
     * @choice above
     * @responsive
     */
    this.contentPosition = 'below|above';
    this.activeClasses = this.computedClasses();
    this.revealHiddenContent = false;
  }
  componentWillLoad() {
    this.hasMedia = !!this.hostElement.querySelector('[slot="media"]');
    this.hasHiddenContent = !!this.hostElement.querySelector('[slot="activatedContent"]');
  }
  computedClasses() {
    let classString = '';
    classString += this.hasMedia ? 'content-hero-block--media' : 'content-hero-block--text';
    classString += ` ${generateResponsiveClass('content-hero-block__content-position', this.contentPosition)}`;
    return classString;
  }
  computedContentClasses() {
    let classString = 'content-hero-block__content';
    return classString;
  }
  computedBackgroundClasses() {
    let classString = '';
    classString += ` ${generateResponsiveClass('content-hero-block-position', this.contentPosition)}`;
    return classString;
  }
  contentBlockActivationHandler(event) {
    if (this.hostElement === event.detail) {
      this.activeClasses = this.computedClasses() + ' content-block-hero--activated';
    }
  }
  render() {
    return (h("content-block-wrapper", { name: "content-hero-block", "extra-classes": this.activeClasses, backgroundClasses: this.computedBackgroundClasses(), background: this.background },
      this.hasMedia &&
        h("div", { class: "content-hero-block__media" },
          h("div", { class: "content-hero-block__media-wrapper" },
            h("slot", { name: "media" }))),
      h("div", { class: this.computedContentClasses() },
        h("slot", { name: "content" }))));
  }
  static get is() { return "content-hero-block"; }
  static get originalStyleUrls() { return {
    "$": ["content-hero-block.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-hero-block.css"]
  }; }
  static get properties() { return {
    "contentPosition": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "ResponsiveString | HeroContentPlacementOptions",
        "resolved": "string",
        "references": {
          "ResponsiveString": {
            "location": "import",
            "path": "../../typings"
          },
          "HeroContentPlacementOptions": {
            "location": "local"
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
            "text": "below",
            "name": "choice"
          }, {
            "text": "above",
            "name": "choice"
          }, {
            "text": undefined,
            "name": "responsive"
          }],
        "text": "Pipe separated HeroContentPlacementOptions that will determine where the content is positioned with the media."
      },
      "attribute": "content-position",
      "reflect": false,
      "defaultValue": "'below|above'"
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
    }
  }; }
  static get states() { return {
    "activeClasses": {},
    "revealHiddenContent": {}
  }; }
  static get elementRef() { return "hostElement"; }
  static get listeners() { return [{
      "name": "contentBlockActivated",
      "method": "contentBlockActivationHandler",
      "target": "window",
      "capture": false,
      "passive": false
    }]; }
}
