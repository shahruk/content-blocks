import { h, proxyCustomElement } from '@stencil/core/internal/client';
import { b as generateResponsiveClass } from './utils.js';

const contentTextBlockCss = ".light,.white{color:white}.dark,.black{color:black}content-text-block{display:block;width:100%;height:100%;text-align:initial}content-text-block .content-text-block{height:100%}content-text-block .content-text-block__wrapper{height:100%}content-text-block .content-text-block__wrapper>[slot=footer]{padding-top:1rem}@media screen and (min-width: 1024px){content-text-block .content-text-block__wrapper>[slot=footer]{margin-top:auto;margin-bottom:0;width:100%;height:auto}}content-text-block[vertical-alignment=bottom] .content-text-block__wrapper>[slot=footer]{position:static}.content-text-block-vertical-align{display:flex;flex-direction:column;height:100%}.content-text-block-vertical-align>*{display:block;width:100%}.content-text-block-vertical-align-mobile-top{justify-content:flex-start}.content-text-block-vertical-align-mobile-center{justify-content:center}.content-text-block-vertical-align-mobile-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-mobile-bottom{justify-content:flex-end}.content-text-block-vertical-align-mobile-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-mobile-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}@media screen and (min-width: 768px){.content-text-block-vertical-align-tablet-portrait-top{justify-content:flex-start}.content-text-block-vertical-align-tablet-portrait-center{justify-content:center}.content-text-block-vertical-align-tablet-portrait-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-portrait-bottom{justify-content:flex-end}.content-text-block-vertical-align-tablet-portrait-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-portrait-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1024px){.content-text-block-vertical-align-tablet-landscape-top{justify-content:flex-start}.content-text-block-vertical-align-tablet-landscape-center{justify-content:center}.content-text-block-vertical-align-tablet-landscape-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-landscape-bottom{justify-content:flex-end}.content-text-block-vertical-align-tablet-landscape-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-landscape-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1280px){.content-text-block-vertical-align-desktop-top{justify-content:flex-start}.content-text-block-vertical-align-desktop-center{justify-content:center}.content-text-block-vertical-align-desktop-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-bottom{justify-content:flex-end}.content-text-block-vertical-align-desktop-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1440px){.content-text-block-vertical-align-desktop-large-top{justify-content:flex-start}.content-text-block-vertical-align-desktop-large-center{justify-content:center}.content-text-block-vertical-align-desktop-large-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-large-bottom{justify-content:flex-end}.content-text-block-vertical-align-desktop-large-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-large-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1920px){.content-text-block-vertical-align-desktop-wide-top{justify-content:flex-start}.content-text-block-vertical-align-desktop-wide-center{justify-content:center}.content-text-block-vertical-align-desktop-wide-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-wide-bottom{justify-content:flex-end}.content-text-block-vertical-align-desktop-wide-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-wide-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}";

const ContentTextBlock$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
    return (h("content-block-wrapper", { name: "content-text-block", "style-class": this.styleClass, "background-classes": this.computedBackgroundClasses(), background: this.background }, h("div", { class: this.computedClasses() }, h("div", { class: "content-text-block__content" }, h("slot", { name: "content" }), h("slot", null)), h("slot", { name: "footer" }))));
  }
  get hostElement() { return this; }
  static get style() { return contentTextBlockCss; }
};

const ContentTextBlock = /*@__PURE__*/proxyCustomElement(ContentTextBlock$1, [4,"content-text-block",{"styleClass":[1,"style-class"],"background":[1],"verticalAlignment":[1,"vertical-alignment"]}]);

export { ContentTextBlock };
