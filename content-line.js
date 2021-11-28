import { h, Host, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue } from './utils.js';

const contentLineCss = "content-line{display:block;word-break:break-word;white-space:normal}content-line[max-width] .content-line__inner{display:inline-block}.content-line-text-align-left{text-align:left}.content-line-text-align-center{text-align:center}.content-line-text-align-right{text-align:right}";

const ContentBlockLine = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
    return (h(Host, { class: this.activeClass }, h("span", { class: this.innerActiveClass, style: this.inlineStyle }, h("slot", { name: "content" }), h("slot", null))));
  }
  static get style() { return contentLineCss; }
};

const ContentLine = /*@__PURE__*/proxyCustomElement(ContentBlockLine, [4,"content-line",{"textAlign":[1,"text-align"],"styleClass":[1,"style-class"],"maxWidth":[1,"max-width"],"activeClass":[32],"innerActiveClass":[32],"inlineStyle":[32]}]);

export { ContentLine };
