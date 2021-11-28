import { h, proxyCustomElement } from '@stencil/core/internal/client';
import { b as generateResponsiveClass } from './utils.js';

const contentHeroBlockCss = "content-hero-block .alignment-horizontal-left{justify-content:flex-start}content-hero-block .alignment-horizontal-center{justify-content:center}content-hero-block .alignment-horizontal-right{justify-content:flex-end}content-hero-block .alignment-vertical-top{align-items:flex-start}content-hero-block .alignment-vertical-center{align-items:center}content-hero-block .alignment-vertical-bottom{align-items:flex-end}content-hero-block .content-hero-block__media-wrapper{height:100%}content-hero-block .content-hero-block__media-wrapper content-image{height:100%}content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper{height:100%}content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image{height:100%}content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image img,content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image picture,content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image video{display:block;width:100%;height:100%;object-fit:cover}content-hero-block .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block__content{display:flex;top:0;left:0;width:100%;height:100%;grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block__content>*{display:block;width:100%}content-hero-block .content-hero-block-position-mobile-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-mobile-above .content-hero-block__media,content-hero-block .content-hero-block-position-mobile-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-mobile-below .content-hero-block__inner{display:block}@media screen and (min-width: 768px){content-hero-block .content-hero-block-position-tablet-portrait-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-tablet-portrait-above .content-hero-block__media,content-hero-block .content-hero-block-position-tablet-portrait-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-tablet-portrait-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1024px){content-hero-block .content-hero-block-position-tablet-landscape-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-tablet-landscape-above .content-hero-block__media,content-hero-block .content-hero-block-position-tablet-landscape-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-tablet-landscape-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1280px){content-hero-block .content-hero-block-position-desktop-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-desktop-above .content-hero-block__media,content-hero-block .content-hero-block-position-desktop-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-desktop-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1440px){content-hero-block .content-hero-block-position-large-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-large-above .content-hero-block__media,content-hero-block .content-hero-block-position-large-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-large-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1920px){content-hero-block .content-hero-block-position-desktop-wide-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-desktop-wide-above .content-hero-block__media,content-hero-block .content-hero-block-position-desktop-wide-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-desktop-wide-below .content-hero-block__inner{display:block}}";

const ContentHeroBlock$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
    return (h("content-block-wrapper", { name: "content-hero-block", "extra-classes": this.activeClasses, backgroundClasses: this.computedBackgroundClasses(), background: this.background }, this.hasMedia &&
      h("div", { class: "content-hero-block__media" }, h("div", { class: "content-hero-block__media-wrapper" }, h("slot", { name: "media" }))), h("div", { class: this.computedContentClasses() }, h("slot", { name: "content" }))));
  }
  get hostElement() { return this; }
  static get style() { return contentHeroBlockCss; }
};

const ContentHeroBlock = /*@__PURE__*/proxyCustomElement(ContentHeroBlock$1, [4,"content-hero-block",{"contentPosition":[1,"content-position"],"background":[1],"activeClasses":[32],"revealHiddenContent":[32]},[[8,"contentBlockActivated","contentBlockActivationHandler"]]]);

export { ContentHeroBlock };
