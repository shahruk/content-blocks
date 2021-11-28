import { h, proxyCustomElement } from '@stencil/core/internal/client';
import { W as WindowResizeService } from './window-resize-service.js';
import { g as getCurrentValue } from './utils.js';

const contentGridFormatterCss = "content-grid-formatter{display:block}.content-grid-formatter-grid{display:grid;grid-template-columns:repeat(3, 1fr);width:100%;overflow:hidden}.content-grid-formatter-grid>*{overflow:hidden}.content-grid-formatter-flex{display:flex;width:100%;align-items:stretch;flex-wrap:wrap}.content-grid-formatter-flex.content-grid-formatter-flex--flex-start{justify-content:flex-start}.content-grid-formatter-flex.content-grid-formatter-flex--space-between{justify-content:space-between}.content-grid-formatter-flex.content-grid-formatter-flex--center{justify-content:center}.content-grid-formatter-flex.content-grid-formatter-flex--space-evenly{justify-content:space-evenly}.content-grid-formatter-flex [slot=column1],.content-grid-formatter-flex [slot=column2]{height:auto}.content-grid-formatter-cols-1.content-grid-formatter-grid{grid-template-columns:repeat(1, 1fr)}.content-grid-formatter-cols-1.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/1)}.content-grid-formatter-cols-1.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-1.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-2.content-grid-formatter-grid{grid-template-columns:repeat(2, 1fr)}.content-grid-formatter-cols-2.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/2)}.content-grid-formatter-cols-2.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-2.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-3.content-grid-formatter-grid{grid-template-columns:repeat(3, 1fr)}.content-grid-formatter-cols-3.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/3)}.content-grid-formatter-cols-3.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-3.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-4.content-grid-formatter-grid{grid-template-columns:repeat(4, 1fr)}.content-grid-formatter-cols-4.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/4)}.content-grid-formatter-cols-4.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-4.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-5.content-grid-formatter-grid{grid-template-columns:repeat(5, 1fr)}.content-grid-formatter-cols-5.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/5)}.content-grid-formatter-cols-5.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-5.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-6.content-grid-formatter-grid{grid-template-columns:repeat(6, 1fr)}.content-grid-formatter-cols-6.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/6)}.content-grid-formatter-cols-6.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-6.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-7.content-grid-formatter-grid{grid-template-columns:repeat(7, 1fr)}.content-grid-formatter-cols-7.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/7)}.content-grid-formatter-cols-7.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-7.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-8.content-grid-formatter-grid{grid-template-columns:repeat(8, 1fr)}.content-grid-formatter-cols-8.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/8)}.content-grid-formatter-cols-8.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-8.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-9.content-grid-formatter-grid{grid-template-columns:repeat(9, 1fr)}.content-grid-formatter-cols-9.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/9)}.content-grid-formatter-cols-9.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-9.content-grid-formatter-flex--grow>*{flex-grow:1}";

const ContentGridFormatter$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
    return (h("content-formatter-wrapper", { name: "content-grid-formatter" }, h("div", { class: this.activeClassString }, h("slot", null))));
  }
  static get style() { return contentGridFormatterCss; }
};

const ContentGridFormatter = /*@__PURE__*/proxyCustomElement(ContentGridFormatter$1, [4,"content-grid-formatter",{"type":[1],"flexGrow":[1,"flex-grow"],"flexShrink":[1,"flex-shrink"],"flexAlign":[1,"flex-align"],"columns":[1],"activeClassString":[32]}]);

export { ContentGridFormatter };
