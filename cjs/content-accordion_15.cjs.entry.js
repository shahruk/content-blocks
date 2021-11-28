'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('./utils-e18255dc.js');
const windowResizeService = require('./window-resize-service-fa769f30.js');

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   ButtonExpand.js
*
*   Desc:   Checkbox widget that implements ARIA Authoring Practices
*           for a menu of links
*/
/*
*   @constructor ButtonExpand
*
*
*/
var ButtonExpand = function (domNode) {
  this.domNode = domNode;
  this.keyCode = Object.freeze({
    'RETURN': 13
  });
};
ButtonExpand.prototype.init = function () {
  this.controlledNode = false;
  var id = this.domNode.getAttribute('aria-controls');
  if (id) {
    this.controlledNode = document.getElementById(id);
  }
  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  if (this.domNode.getAttribute('aria-expanded') === 'false') {
    this.domNode.setAttribute('aria-expanded', 'false');
    this.hideContent();
  }
};
ButtonExpand.prototype.showContent = function () {
  if (this.controlledNode) {
    this.controlledNode.style.display = 'block';
  }
};
ButtonExpand.prototype.hideContent = function () {
  if (this.controlledNode) {
    this.controlledNode.style.display = 'none';
  }
};
ButtonExpand.prototype.toggleExpand = function () {
  if (this.domNode.getAttribute('aria-expanded') === 'true') {
    this.domNode.setAttribute('aria-expanded', 'false');
    this.hideContent();
  }
  else {
    this.domNode.setAttribute('aria-expanded', 'true');
    this.showContent();
  }
};
/* EVENT HANDLERS */
ButtonExpand.prototype.handleKeydown = function (event) {
  switch (event.keyCode) {
    case this.keyCode.RETURN:
      this.toggleExpand();
      event.stopPropagation();
      event.preventDefault();
      break;
  }
};
ButtonExpand.prototype.handleClick = function (e) {
  e.preventDefault();
  this.toggleExpand();
};
ButtonExpand.prototype.handleFocus = function () {
  this.domNode.classList.add('focus');
};
ButtonExpand.prototype.handleBlur = function () {
  this.domNode.classList.remove('focus');
};
class W3DisclosureButton {
  constructor(stencilElement) {
    var buttons = stencilElement.querySelectorAll('button[aria-expanded][aria-controls], a[role="button"][aria-expanded][aria-controls]');
    for (var i = 0; i < buttons.length; i++) {
      var be = new ButtonExpand(buttons[i]);
      be.init();
    }
  }
}

const contentAccordionCss = "content-accordion{display:block}content-accordion button[aria-expanded][aria-controls]{padding:0;border:none;font:inherit;color:inherit;background-color:transparent;cursor:pointer}";

const ContentAccordion = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    this.initialized = false;
  }
  componentDidLoad() {
    if (!this.initialized) {
      this.initialized = true;
      new W3DisclosureButton(this.element);
    }
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-accordion" }, utils.h("slot", { name: "content" }), utils.h("slot", null)));
  }
  get element() { return utils.getElement(this); }
};
ContentAccordion.style = contentAccordionCss;

const contentBlockFormatterCss = "content-block-formatter{display:block}";

const ContentBlockFormatter = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    this.hasHeader = !!this.hostElement.querySelector('[slot="header"]');
  }
  render() {
    return (utils.h("content-formatter-wrapper", { name: "content-block-formatter", "extra-classes": this.hasHeader ? 'content-block-formatter--full' : 'content-block-formatter--content' }, this.hasHeader &&
      utils.h("div", { class: "content-block-formatter__header" }, utils.h("slot", { name: "header" })), utils.h("div", { class: "content-block-formatter__content" }, utils.h("slot", { name: "content" }), utils.h("slot", null))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentBlockFormatter.style = contentBlockFormatterCss;

const contentBlockWrapperCss = "content-block-wrapper{display:block;height:100%}.content-block-wrapper__background-wrapper{position:relative;height:100%}.content-block-wrapper__background-wrapper .content-block-wrapper__inner{position:relative;z-index:1;height:100%}.content-block-wrapper__background-wrapper .content-block-wrapper__background{position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}";

const ContentBlockWrapper = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    this.contentBlockReady = utils.createEvent(this, "contentBlockReady", 7);
    this.name = 'content-block';
    this.styleClass = '';
    this.backgroundClasses = '';
    this.maxWidth = '100%';
    this.innerClassName = this.name + '__inner';
  }
  computedBackgroundClassString() {
    let classString = `content-block-wrapper__background-wrapper`;
    if (this.backgroundClasses) {
      classString += ` ${this.backgroundClasses}`;
    }
    return classString;
  }
  componentWillLoad() {
    windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
      if (this.styleClass) {
        this.activeClass = utils.getCurrentValue(this.styleClass);
      }
      if (this.background) {
        let value = utils.getCurrentValue(this.background);
        this.inlineStyle = {
          'background': value,
          'max-width': !isNaN(utils.getCurrentValue(this.maxWidth)) ? utils.getCurrentValue(this.maxWidth) : utils.getCurrentValue(this.maxWidth) + '%',
        };
      }
    });
  }
  componentDidRender() {
    // this.contentBlockReady.emit(this.hostElement);
  }
  render() {
    return (utils.h("div", { class: this.activeClass, style: this.inlineStyle }, utils.h("div", { class: this.computedBackgroundClassString(), style: this.styleObject }, utils.h("div", { class: `content-block-wrapper__inner${this.innerClassName ? ` ${this.innerClassName}` : ''}` }, utils.h("slot", { name: "content" }), utils.h("slot", null)))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentBlockWrapper.style = contentBlockWrapperCss;

const contentButtonCss = "content-button{display:inline-block}content-button[clickable-block=true]{display:block;width:100%}content-button[clickable-block=true]>content-element-wrapper{height:100%;width:100%}content-button[clickable-block=true]>content-element-wrapper>.content-button{height:100%;width:100%}content-button[clickable-block=true]>content-element-wrapper>.content-button>a,content-button[clickable-block=true]>content-element-wrapper>.content-button>button{height:100%;width:100%}content-button[clickable-block=true]>content-element-wrapper>.content-button>a>*,content-button[clickable-block=true]>content-element-wrapper>.content-button>button>*{display:block;width:100%}content-button[clickable-block=true] .content-button__clickable-content{width:100%;height:100%}content-button .content-button>a,content-button .content-button>button{display:flex;align-items:center;justify-content:center}content-button .content-button>button{appearance:none;background:inherit;cursor:pointer}";

const ContentButton = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    this.contentBlockActivated = utils.createEvent(this, "contentBlockActivated", 7);
    /**
     * @type String
     */
    this.styleClass = 'content-block-default-button';
    /**
     * @type Boolean
     */
    this.clickableBlock = false;
  }
  componentWillLoad() {
    this.activatedContent = this.hostElement.querySelector('[slot="activatedContent"]');
    this.hasContentToActivate = !!this.activatedContent;
    // If this is a clickable block, forcefully add a # to force an anchor link
    if (!this.href || this.href === '#') {
      this.href = 'javascript:void(0);';
    }
    if (this.styleClass) {
      windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
        this.activeClass = utils.getCurrentValue(this.styleClass);
      });
    }
  }
  onHandleClickEvent(ev) {
    if (this.hasContentToActivate) {
      ev.preventDefault();
      ev.stopPropagation();
      this.contentBlockActivated.emit(this.activatedContent);
      this.activatedContent.scrollIntoView();
    }
    else if (this.href && this.href.length > 1 && this.href.substr(0, 1) === '#') {
      let element = document.getElementById(this.href.substr(1));
      if (element) {
        ev.preventDefault();
        ev.stopPropagation();
        this.contentBlockActivated.emit(element);
        element.scrollIntoView();
      }
    }
  }
  render() {
    return (utils.h(utils.Host, null, utils.h("a", { role: this.href === 'javascript:void(0);' ? 'button' : '', onClick: ev => this.onHandleClickEvent(ev), class: this.activeClass, "aria-expanded": this.expanded, "aria-controls": this.controls, href: this.href, target: this.target }, !this.clickableBlock ? (utils.h("span", null, utils.h("slot", { name: "content" }), utils.h("slot", null))) : (utils.h("div", { class: "content-button__clickable-content" }, utils.h("slot", { name: "content" }), utils.h("slot", null)))), utils.h("slot", { name: "activatedContent" })));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentButton.style = contentButtonCss;

const contentCarouselCss = "@font-face{font-family:swiper-icons;src:url('data:application/font-woff;charset=utf-8;base64, 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') format('woff');font-weight:400;font-style:normal}:root{--swiper-theme-color:#007aff}.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-container-multirow>.swiper-wrapper{flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{flex-wrap:wrap;flex-direction:column}.swiper-container-free-mode>.swiper-wrapper{transition-timing-function:ease-out;margin:0 auto}.swiper-container-pointer-events{touch-action:pan-y}.swiper-container-pointer-events.swiper-container-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-container-3d{perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{scroll-snap-type:y mandatory}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(-1 * var(--swiper-navigation-size)/ 2);z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);text-transform:none!important;letter-spacing:0;text-transform:none;font-variant:initial;line-height:1}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-container-rtl .swiper-button-next:after{content:'prev'}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{right:10px;left:auto}.swiper-button-next:after,.swiper-container-rtl .swiper-button-prev:after{content:'next'}.swiper-button-next.swiper-button-white,.swiper-button-prev.swiper-button-white{--swiper-navigation-color:#ffffff}.swiper-button-next.swiper-button-black,.swiper-button-prev.swiper-button-black{--swiper-navigation-color:#000000}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:50%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;transform:translate3d(0px,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white{--swiper-pagination-color:#ffffff}.swiper-pagination-black{--swiper-pagination-color:#000000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;animation:swiper-preloader-spin 1s infinite linear;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@keyframes swiper-preloader-spin{100%{transform:rotate(360deg)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-container-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;-webkit-filter:blur(50px);filter:blur(50px)}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}content-carousel{display:block;overflow:hidden}";

const ContentCarousel = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    /**
     * @type Select
     * @choice load
     * @choice init
     */
    this.initMethod = 'load';
    this.swiperOptions = '{"slidesPerView": 1, "slidesPerGroup": 1, "autoplay": true, "loop": false}';
    this.loadStatus = new windowResizeService.BehaviorSubject(false);
  }
  getSwiperOptions(newOptions) {
    return Object.assign({
      observer: true,
      observeParents: true,
      pagination: {
        el: this.swiperPagination,
      },
      navigation: {
        nextEl: this.swiperNextElement,
        prevEl: this.swiperPrevElement,
      },
      scrollbar: {
        el: this.swiperScrollbar,
      },
    }, newOptions);
  }
  componentDidLoad() {
    if (this.initMethod === 'load') {
      console.log(this.swiperOptions);
      if (this.swiperOptions) {
        this.swiperOptionsFinal = this.getSwiperOptions(JSON.parse(this.swiperOptions || ''));
      }
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      };
      let observer = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          console.log(entry.isIntersecting);
          if (entry.isIntersecting && !this.loadStatus.getValue()) {
            this.initSwiper();
            this.loadStatus.next(true);
          }
        });
      }, options);
      console.log(this.hostElement);
      observer.observe(this.hostElement);
    }
  }
  setSwiperOptionsCallback(event) {
    this.loadStatus.subscribe(() => {
      let loaded = this.loadStatus.value;
      if (loaded) {
        this.swiperOptionsFinal = this.getSwiperOptions(event.detail);
        this.initSwiper();
      }
    });
  }
  async initSwiper() {
    let Swiper = await Promise.resolve().then(function () { return require('./swiper.esm-7abbec1a.js'); });
    console.log(this.swiperWrapper.children);
    for (const slide of this.swiperWrapper.children) {
      slide.classList.add('swiper-slide');
    }
    this.swiperCarousel = new Swiper.Swiper(this.swiperContainer, this.swiperOptionsFinal);
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-carousel", background: this.background }, utils.h("div", { class: "content-carousel__content" }, utils.h("div", { class: "swiper-container", ref: el => this.swiperContainer = el }, utils.h("div", { class: "swiper-wrapper", ref: el => this.swiperWrapper = el }, utils.h("slot", { name: "content" }), utils.h("slot", null)), utils.h("div", { class: "swiper-pagination", ref: el => this.swiperPagination = el }), utils.h("div", { class: "swiper-button-prev", ref: el => this.swiperPrevElement = el }), utils.h("div", { class: "swiper-button-next", ref: el => this.swiperNextElement = el }), utils.h("div", { class: "swiper-scrollbar", ref: el => this.swiperScrollbar = el })))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentCarousel.style = contentCarouselCss;

const contentFormatterWrapperCss = "content-formatter-wrapper{display:block}";

const ContentFormatterWrapper = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    this.name = 'content-formatter';
    this.extraClasses = '';
    this.outerClassName = this.name + '__outer';
    this.innerClassName = this.name + '__inner';
  }
  computedClassString() {
    let classString = '';
    if (!this.extraClasses) {
      classString = this.name;
    }
    else {
      classString = `${this.name} ${this.extraClasses}`;
    }
    return classString;
  }
  render() {
    return (utils.h(utils.Host, { class: this.computedClassString(), style: {
        'background': this.background
      } }, utils.h("div", { class: this.innerClassName }, utils.h("slot", { name: "content" }), utils.h("slot", null))));
  }
};
ContentFormatterWrapper.style = contentFormatterWrapperCss;

const contentGridFormatterCss = "content-grid-formatter{display:block}.content-grid-formatter-grid{display:grid;grid-template-columns:repeat(3, 1fr);width:100%;overflow:hidden}.content-grid-formatter-grid>*{overflow:hidden}.content-grid-formatter-flex{display:flex;width:100%;align-items:stretch;flex-wrap:wrap}.content-grid-formatter-flex.content-grid-formatter-flex--flex-start{justify-content:flex-start}.content-grid-formatter-flex.content-grid-formatter-flex--space-between{justify-content:space-between}.content-grid-formatter-flex.content-grid-formatter-flex--center{justify-content:center}.content-grid-formatter-flex.content-grid-formatter-flex--space-evenly{justify-content:space-evenly}.content-grid-formatter-flex [slot=column1],.content-grid-formatter-flex [slot=column2]{height:auto}.content-grid-formatter-cols-1.content-grid-formatter-grid{grid-template-columns:repeat(1, 1fr)}.content-grid-formatter-cols-1.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/1)}.content-grid-formatter-cols-1.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-1.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-2.content-grid-formatter-grid{grid-template-columns:repeat(2, 1fr)}.content-grid-formatter-cols-2.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/2)}.content-grid-formatter-cols-2.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-2.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-3.content-grid-formatter-grid{grid-template-columns:repeat(3, 1fr)}.content-grid-formatter-cols-3.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/3)}.content-grid-formatter-cols-3.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-3.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-4.content-grid-formatter-grid{grid-template-columns:repeat(4, 1fr)}.content-grid-formatter-cols-4.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/4)}.content-grid-formatter-cols-4.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-4.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-5.content-grid-formatter-grid{grid-template-columns:repeat(5, 1fr)}.content-grid-formatter-cols-5.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/5)}.content-grid-formatter-cols-5.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-5.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-6.content-grid-formatter-grid{grid-template-columns:repeat(6, 1fr)}.content-grid-formatter-cols-6.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/6)}.content-grid-formatter-cols-6.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-6.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-7.content-grid-formatter-grid{grid-template-columns:repeat(7, 1fr)}.content-grid-formatter-cols-7.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/7)}.content-grid-formatter-cols-7.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-7.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-8.content-grid-formatter-grid{grid-template-columns:repeat(8, 1fr)}.content-grid-formatter-cols-8.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/8)}.content-grid-formatter-cols-8.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-8.content-grid-formatter-flex--grow>*{flex-grow:1}.content-grid-formatter-cols-9.content-grid-formatter-grid{grid-template-columns:repeat(9, 1fr)}.content-grid-formatter-cols-9.content-grid-formatter-flex>*{flex:0 0 auto;width:calc(100%/9)}.content-grid-formatter-cols-9.content-grid-formatter-flex--shrink>*{flex-shrink:1}.content-grid-formatter-cols-9.content-grid-formatter-flex--grow>*{flex-grow:1}";

const ContentGridFormatter = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
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
    windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
      let type = utils.getCurrentValue(this.type);
      let flexAlign = utils.getCurrentValue(this.flexAlign);
      let flexShrink = utils.getCurrentValue(this.flexShrink);
      let flexGrow = utils.getCurrentValue(this.flexGrow);
      let columns = utils.getCurrentValue(this.columns);
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
    return (utils.h("content-formatter-wrapper", { name: "content-grid-formatter" }, utils.h("div", { class: this.activeClassString }, utils.h("slot", null))));
  }
};
ContentGridFormatter.style = contentGridFormatterCss;

const contentHeroBlockCss = "content-hero-block .alignment-horizontal-left{justify-content:flex-start}content-hero-block .alignment-horizontal-center{justify-content:center}content-hero-block .alignment-horizontal-right{justify-content:flex-end}content-hero-block .alignment-vertical-top{align-items:flex-start}content-hero-block .alignment-vertical-center{align-items:center}content-hero-block .alignment-vertical-bottom{align-items:flex-end}content-hero-block .content-hero-block__media-wrapper{height:100%}content-hero-block .content-hero-block__media-wrapper content-image{height:100%}content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper{height:100%}content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image{height:100%}content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image img,content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image picture,content-hero-block .content-hero-block__media-wrapper content-image>content-element-wrapper>.content-image video{display:block;width:100%;height:100%;object-fit:cover}content-hero-block .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block__content{display:flex;top:0;left:0;width:100%;height:100%;grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block__content>*{display:block;width:100%}content-hero-block .content-hero-block-position-mobile-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-mobile-above .content-hero-block__media,content-hero-block .content-hero-block-position-mobile-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-mobile-below .content-hero-block__inner{display:block}@media screen and (min-width: 768px){content-hero-block .content-hero-block-position-tablet-portrait-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-tablet-portrait-above .content-hero-block__media,content-hero-block .content-hero-block-position-tablet-portrait-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-tablet-portrait-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1024px){content-hero-block .content-hero-block-position-tablet-landscape-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-tablet-landscape-above .content-hero-block__media,content-hero-block .content-hero-block-position-tablet-landscape-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-tablet-landscape-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1280px){content-hero-block .content-hero-block-position-desktop-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-desktop-above .content-hero-block__media,content-hero-block .content-hero-block-position-desktop-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-desktop-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1440px){content-hero-block .content-hero-block-position-large-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-large-above .content-hero-block__media,content-hero-block .content-hero-block-position-large-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-large-below .content-hero-block__inner{display:block}}@media screen and (min-width: 1920px){content-hero-block .content-hero-block-position-desktop-wide-above .content-hero-block__inner{display:grid;grid-template-columns:1fr}content-hero-block .content-hero-block-position-desktop-wide-above .content-hero-block__media,content-hero-block .content-hero-block-position-desktop-wide-above .content-hero-block__content{grid-row-start:1;grid-column-start:1}content-hero-block .content-hero-block-position-desktop-wide-below .content-hero-block__inner{display:block}}";

const ContentHeroBlock = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
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
    classString += ` ${utils.generateResponsiveClass('content-hero-block__content-position', this.contentPosition)}`;
    return classString;
  }
  computedContentClasses() {
    let classString = 'content-hero-block__content';
    return classString;
  }
  computedBackgroundClasses() {
    let classString = '';
    classString += ` ${utils.generateResponsiveClass('content-hero-block-position', this.contentPosition)}`;
    return classString;
  }
  contentBlockActivationHandler(event) {
    if (this.hostElement === event.detail) {
      this.activeClasses = this.computedClasses() + ' content-block-hero--activated';
    }
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-hero-block", "extra-classes": this.activeClasses, backgroundClasses: this.computedBackgroundClasses(), background: this.background }, this.hasMedia &&
      utils.h("div", { class: "content-hero-block__media" }, utils.h("div", { class: "content-hero-block__media-wrapper" }, utils.h("slot", { name: "media" }))), utils.h("div", { class: this.computedContentClasses() }, utils.h("slot", { name: "content" }))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentHeroBlock.style = contentHeroBlockCss;

const contentImageCss = "content-image{display:block;height:auto}content-image .content-image{opacity:0}content-image .content-image.content-image-loaded{opacity:1}content-image .content-image img,content-image .content-image picture,content-image .content-image video{display:block;width:100%;height:auto}";

const ContentImage = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    /**
     * @type Boolean
     */
    this.lazyLoad = true;
    /**
     * @type Number
     * @responsive
     */
    this.width = '16';
    /**
     * @type Number
     * @responsive
     */
    this.height = '9';
    /**
     * @type String
     */
    this.videoType = 'video/mp4';
    this.lazyLoadIsComplete = false;
    this.showVideo = false;
    this.activeMediaValues = {
      width: '1',
      height: '1',
      src: '',
      alt: '',
    };
  }
  preloadImage(src) {
    return new Promise(r => {
      const image = new Image();
      image.onload = r;
      image.onerror = r;
      image.src = src;
    });
  }
  componentWillLoad() {
    windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
      this.activeMediaValues = {
        width: utils.getCurrentValue(this.width),
        height: utils.getCurrentValue(this.height),
        src: utils.getCurrentValue(this.src),
        alt: utils.getCurrentValue(this.alt),
      };
      this.showVideo = false;
      requestAnimationFrame(async () => {
        this.showVideo = utils.getCurrentValue(this.src).indexOf('.mp4') >= 0;
        // Preload an image
        if (!this.showVideo) {
          await this.preloadImage(utils.getCurrentValue(this.src));
          setTimeout(() => {
            this.lazyLoadIsComplete = true;
          }, 1000);
        }
        else {
          this.lazyLoadIsComplete = true;
        }
      });
    });
  }
  computedLazyLoadClass() {
    let className = '';
    if (!this.lazyLoad) {
      className = 'content-image-no-lazyload';
    }
    else {
      className = 'content-image-loading';
    }
    return className;
  }
  render() {
    let pictureSrcSet = '';
    let pictureImageSrc = '';
    utils.breakpointValues.forEach((_bp, index) => {
      if (index === 0) {
        pictureImageSrc = utils.getValueAtIndex(0, this.src);
      }
      else {
        pictureSrcSet += `${utils.getValueAtIndex(index, this.src)} ${utils.breakpoints[index]}w,`;
      }
    });
    return (utils.h(utils.Host, { class: this.lazyLoadIsComplete ? 'content-image-loaded' : this.computedLazyLoadClass() }, this.showVideo ? (utils.h("video", { autoplay: true, muted: true, loop: true, preload: "none", playsinline: true, width: this.activeMediaValues.width, height: this.activeMediaValues.height }, utils.h("source", { src: this.lazyLoadIsComplete ? this.activeMediaValues.src : null, type: this.videoType }))) : (utils.h("picture", null, utils.h("source", { srcSet: pictureSrcSet }), utils.h("img", { width: this.activeMediaValues.width, height: this.activeMediaValues.height, src: pictureImageSrc, alt: this.activeMediaValues.alt })))));
  }
};
ContentImage.style = contentImageCss;

const contentLineCss = "content-line{display:block;word-break:break-word;white-space:normal}content-line[max-width] .content-line__inner{display:inline-block}.content-line-text-align-left{text-align:left}.content-line-text-align-center{text-align:center}.content-line-text-align-right{text-align:right}";

const ContentBlockLine = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
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
      windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
        this.activeClass = `${utils.getCurrentValue(this.styleClass)}`;
        this.innerActiveClass = `content-line__inner content-line-text-align-${utils.getCurrentValue(this.textAlign)}`;
        if (this.maxWidth) {
          this.inlineStyle = {
            'max-width': isNaN(utils.getCurrentValue(this.maxWidth)) ? utils.getCurrentValue(this.maxWidth) : utils.getCurrentValue(this.maxWidth) + '%',
          };
        }
      });
    }
  }
  render() {
    // The capital case in this JSX variable is important
    // const ElementTagParsed = `${this.tag}`;
    return (utils.h(utils.Host, { class: this.activeClass }, utils.h("span", { class: this.innerActiveClass, style: this.inlineStyle }, utils.h("slot", { name: "content" }), utils.h("slot", null))));
  }
};
ContentBlockLine.style = contentLineCss;

const contentSplitBlockCss = "content-split-block{display:block}@media screen and (min-width: 768px){content-split-block .content-split-block--reverse .content-grid-formatter-flex>:first-child,content-split-block .content-split-block--reverse .content-grid-formatter-grid>:first-child{order:2}}";

const ContentSplitBlock = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    /**
     * @type Boolean
     * @responsive
     */
    this.reverse = false;
  }
  componentWillLoad() {
    windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
      this.activeClass = utils.getCurrentValue(this.reverse) ? 'content-split-block--reverse' : '';
      this.activeBackground = utils.getCurrentValue(this.background);
    });
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-split-block", background: this.activeBackground, class: this.activeClass }, utils.h("content-grid-formatter", { type: "flex", "flex-grow": "true", "flex-shrink": "true", columns: "1|2" }, utils.h("slot", { name: "column1" }), utils.h("slot", { name: "column2" }))));
  }
};
ContentSplitBlock.style = contentSplitBlockCss;

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
class W3Tabs {
  constructor(stencilElement) {
    var tablist = stencilElement.querySelectorAll('[role="tablist"]')[0];
    var tabs;
    var panels;
    generateArrays();
    function generateArrays() {
      tabs = stencilElement.querySelectorAll('[role="tab"]');
      panels = stencilElement.querySelectorAll('[role="tabpanel"]');
    }
    // For easy reference
    var keys = {
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      delete: 46,
      enter: 13,
      space: 32
    };
    // Add or subtract depending on key pressed
    var direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1
    };
    // Bind listeners
    for (var i = 0; i < tabs.length; ++i) {
      addListeners(i);
    }
    function addListeners(index) {
      tabs[index].addEventListener('click', clickEventListener);
      tabs[index].addEventListener('keydown', keydownEventListener);
      tabs[index].addEventListener('keyup', keyupEventListener);
      // Build an array with all tabs (<button>s) in it
      tabs[index].index = index;
    }
    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener(event) {
      let tab = event.target.closest('button');
      activateTab(tab, false);
    }
    // Handle keydown on tabs
    function keydownEventListener(event) {
      var key = event.keyCode;
      switch (key) {
        case keys.end:
          event.preventDefault();
          // Activate last tab
          focusLastTab();
          break;
        case keys.home:
          event.preventDefault();
          // Activate first tab
          focusFirstTab();
          break;
        // Up and down are in keydown
        // because we need to prevent page scroll >:)
        case keys.up:
        case keys.down:
          determineOrientation(event);
          break;
      }
    }
    // Handle keyup on tabs
    function keyupEventListener(event) {
      var key = event.keyCode;
      switch (key) {
        case keys.left:
        case keys.right:
          determineOrientation(event);
          break;
        case keys.delete:
          determineDeletable(event);
          break;
        case keys.enter:
        case keys.space:
          activateTab(event.target);
          break;
      }
    }
    // When a tablistâ€™s aria-orientation is set to vertical,
    // only up and down arrow should function.
    // In all other cases only left and right arrow function.
    function determineOrientation(event) {
      var key = event.keyCode;
      var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
      var proceed = false;
      if (vertical) {
        if (key === keys.up || key === keys.down) {
          event.preventDefault();
          proceed = true;
        }
      }
      else {
        if (key === keys.left || key === keys.right) {
          proceed = true;
        }
      }
      if (proceed) {
        switchTabOnArrowPress(event);
      }
    }
    // Either focus the next, previous, first, or last tab
    // depending on key pressed
    function switchTabOnArrowPress(event) {
      var pressed = event.keyCode;
      if (direction[pressed]) {
        var target = event.target;
        if (target.index !== undefined) {
          if (tabs[target.index + direction[pressed]]) {
            tabs[target.index + direction[pressed]].focus();
          }
          else if (pressed === keys.left || pressed === keys.up) {
            focusLastTab();
          }
          else if (pressed === keys.right || pressed == keys.down) {
            focusFirstTab();
          }
        }
      }
    }
    // Activates any given tab panel
    function activateTab(tab, setFocus) {
      setFocus = setFocus || true;
      // Deactivate all other tabs
      deactivateTabs();
      // Remove tabindex attribute
      tab.removeAttribute('tabindex');
      // Set the tab as selected
      tab.setAttribute('aria-selected', 'true');
      // Get the value of aria-controls (which is an ID)
      var controls = tab.getAttribute('aria-controls');
      // Remove hidden attribute from tab panel to make it visible
      document.getElementById(controls).removeAttribute('hidden');
      // Set focus when required
      if (setFocus) {
        tab.focus();
      }
    }
    // Deactivate all tabs and tab panels
    function deactivateTabs() {
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].setAttribute('tabindex', '-1');
        tabs[t].setAttribute('aria-selected', 'false');
      }
      for (var p = 0; p < panels.length; p++) {
        panels[p].setAttribute('hidden', 'hidden');
      }
    }
    // Make a guess
    function focusFirstTab() {
      tabs[0].focus();
    }
    // Make a guess
    function focusLastTab() {
      tabs[tabs.length - 1].focus();
    }
    // Detect if a tab is deletable
    function determineDeletable(event) {
      var target = event.target;
      if (target.getAttribute('data-deletable') !== null) {
        // Delete target tab
        deleteTab(event);
        // Update arrays related to tabs widget
        generateArrays();
        // Activate the closest tab to the one that was just deleted
        if (target.index - 1 < 0) {
          activateTab(tabs[0]);
        }
        else {
          activateTab(tabs[target.index - 1]);
        }
      }
    }
    // Deletes a tab and its panel
    function deleteTab(event) {
      var target = event.target;
      var panel = document.getElementById(target.getAttribute('aria-controls'));
      target.parentElement.removeChild(target);
      panel.parentElement.removeChild(panel);
    }
  }
}

const contentTabsCss = "content-tabs{display:block}content-tabs button[role=tab][aria-selected][aria-controls]{padding:0;border:none;font:inherit;color:inherit;background-color:transparent;cursor:pointer;border-bottom:1px solid transparent}content-tabs button[role=tab][aria-selected][aria-controls][aria-selected=true]{border-bottom:1px solid black}";

const ContentTabs = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
  }
  componentDidLoad() {
    new W3Tabs(this.element);
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-tabs" }, utils.h("slot", { name: "content" }), utils.h("slot", null)));
  }
  get element() { return utils.getElement(this); }
};
ContentTabs.style = contentTabsCss;

const contentTextBlockCss = ".light,.white{color:white}.dark,.black{color:black}content-text-block{display:block;width:100%;height:100%;text-align:initial}content-text-block .content-text-block{height:100%}content-text-block .content-text-block__wrapper{height:100%}content-text-block .content-text-block__wrapper>[slot=footer]{padding-top:1rem}@media screen and (min-width: 1024px){content-text-block .content-text-block__wrapper>[slot=footer]{margin-top:auto;margin-bottom:0;width:100%;height:auto}}content-text-block[vertical-alignment=bottom] .content-text-block__wrapper>[slot=footer]{position:static}.content-text-block-vertical-align{display:flex;flex-direction:column;height:100%}.content-text-block-vertical-align>*{display:block;width:100%}.content-text-block-vertical-align-mobile-top{justify-content:flex-start}.content-text-block-vertical-align-mobile-center{justify-content:center}.content-text-block-vertical-align-mobile-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-mobile-bottom{justify-content:flex-end}.content-text-block-vertical-align-mobile-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-mobile-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}@media screen and (min-width: 768px){.content-text-block-vertical-align-tablet-portrait-top{justify-content:flex-start}.content-text-block-vertical-align-tablet-portrait-center{justify-content:center}.content-text-block-vertical-align-tablet-portrait-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-portrait-bottom{justify-content:flex-end}.content-text-block-vertical-align-tablet-portrait-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-portrait-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1024px){.content-text-block-vertical-align-tablet-landscape-top{justify-content:flex-start}.content-text-block-vertical-align-tablet-landscape-center{justify-content:center}.content-text-block-vertical-align-tablet-landscape-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-landscape-bottom{justify-content:flex-end}.content-text-block-vertical-align-tablet-landscape-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-tablet-landscape-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1280px){.content-text-block-vertical-align-desktop-top{justify-content:flex-start}.content-text-block-vertical-align-desktop-center{justify-content:center}.content-text-block-vertical-align-desktop-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-bottom{justify-content:flex-end}.content-text-block-vertical-align-desktop-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1440px){.content-text-block-vertical-align-desktop-large-top{justify-content:flex-start}.content-text-block-vertical-align-desktop-large-center{justify-content:center}.content-text-block-vertical-align-desktop-large-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-large-bottom{justify-content:flex-end}.content-text-block-vertical-align-desktop-large-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-large-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}@media screen and (min-width: 1920px){.content-text-block-vertical-align-desktop-wide-top{justify-content:flex-start}.content-text-block-vertical-align-desktop-wide-center{justify-content:center}.content-text-block-vertical-align-desktop-wide-center.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-wide-bottom{justify-content:flex-end}.content-text-block-vertical-align-desktop-wide-bottom.content-text-block__wrapper--footer .content-text-block__content{margin-top:auto;margin-bottom:0}.content-text-block-vertical-align-desktop-wide-bottom.content-text-block__wrapper--footer [slot=footer]{margin-top:0}}";

const ContentTextBlock = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
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
      extraClasses += ` content-text-block-vertical-align ${utils.generateResponsiveClass('content-text-block-vertical-align', this.verticalAlignment)}`;
    if (!!this.hostElement.querySelector('[slot="footer"]')) {
      extraClasses += ' content-text-block__wrapper--footer';
    }
    return extraClasses;
  }
  computedBackgroundClasses() {
    let extraClasses = '';
    if (this.verticalAlignment)
      extraClasses += ` content-text-block-vertical-align ${utils.generateResponsiveClass('content-text-block-vertical-align', this.verticalAlignment)}`;
    return extraClasses;
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-text-block", "style-class": this.styleClass, "background-classes": this.computedBackgroundClasses(), background: this.background }, utils.h("div", { class: this.computedClasses() }, utils.h("div", { class: "content-text-block__content" }, utils.h("slot", { name: "content" }), utils.h("slot", null)), utils.h("slot", { name: "footer" }))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentTextBlock.style = contentTextBlockCss;

const contentToutBlockCss = "content-tout-block .content-tout-block__media{position:relative}content-tout-block .content-tout-block__media-content{position:absolute;width:100%;height:100%;top:0;left:0;display:flex;align-items:center;justify-content:center;overflow:hidden}content-tout-block .content-tout-block__media-content [slot=mediaContent]{height:100%;width:100%}@media (hover: hover){content-tout-block .content-tout-block__media-content--hover{opacity:0}content-tout-block .content-tout-block__media-content--hover:hover{opacity:1}}";

const ContentToutBlock = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    /**
     * If true, the media content will show only on hover
     * @type Boolean
     * @responsive
    */
    this.hover = 'false|true';
    this.hasHoverContent = false;
  }
  componentWillLoad() {
    this.hasMediaContent = !!this.hostElement.querySelector('[slot="mediaContent"]');
    windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
      this.hasHoverContent = utils.getCurrentValue(this.hover) === 'true';
    });
  }
  render() {
    return (utils.h("content-block-wrapper", { name: "content-tout-block" }, utils.h("div", { class: "content-tout-block__media" }, utils.h("div", { class: "content-tout-block__media-wrapper" }, utils.h("slot", { name: "media" })), this.hasMediaContent &&
      utils.h("div", { class: `content-tout-block__media-content${this.hasHoverContent ? ' content-tout-block__media-content--hover' : ''}` }, utils.h("slot", { name: "mediaContent" }))), utils.h("div", { class: "content-tout-block__content" }, utils.h("slot", { name: "content" }), utils.h("slot", null))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentToutBlock.style = contentToutBlockCss;

const contentVideoCss = "@charset \"UTF-8\";@charset \"UTF-8\";.video-js .vjs-big-play-button .vjs-icon-placeholder:before,.video-js .vjs-modal-dialog,.vjs-button>.vjs-icon-placeholder:before,.vjs-modal-dialog .vjs-modal-dialog-content{position:absolute;top:0;left:0;width:100%;height:100%}.video-js .vjs-big-play-button .vjs-icon-placeholder:before,.vjs-button>.vjs-icon-placeholder:before{text-align:center}@font-face{font-family:VideoJS;src:url(data:application/font-woff;charset=utf-8;base64,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) format(\"woff\");font-weight:400;font-style:normal}.video-js .vjs-big-play-button .vjs-icon-placeholder:before,.video-js .vjs-play-control .vjs-icon-placeholder,.vjs-icon-play{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-big-play-button .vjs-icon-placeholder:before,.video-js .vjs-play-control .vjs-icon-placeholder:before,.vjs-icon-play:before{content:\"\\f101\"}.vjs-icon-play-circle{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-play-circle:before{content:\"\\f102\"}.video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder,.vjs-icon-pause{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-play-control.vjs-playing .vjs-icon-placeholder:before,.vjs-icon-pause:before{content:\"\\f103\"}.video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder,.vjs-icon-volume-mute{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before,.vjs-icon-volume-mute:before{content:\"\\f104\"}.video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder,.vjs-icon-volume-low{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-mute-control.vjs-vol-1 .vjs-icon-placeholder:before,.vjs-icon-volume-low:before{content:\"\\f105\"}.video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder,.vjs-icon-volume-mid{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-mute-control.vjs-vol-2 .vjs-icon-placeholder:before,.vjs-icon-volume-mid:before{content:\"\\f106\"}.video-js .vjs-mute-control .vjs-icon-placeholder,.vjs-icon-volume-high{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-mute-control .vjs-icon-placeholder:before,.vjs-icon-volume-high:before{content:\"\\f107\"}.video-js .vjs-fullscreen-control .vjs-icon-placeholder,.vjs-icon-fullscreen-enter{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-fullscreen-control .vjs-icon-placeholder:before,.vjs-icon-fullscreen-enter:before{content:\"\\f108\"}.video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder,.vjs-icon-fullscreen-exit{font-family:VideoJS;font-weight:400;font-style:normal}.video-js.vjs-fullscreen .vjs-fullscreen-control .vjs-icon-placeholder:before,.vjs-icon-fullscreen-exit:before{content:\"\\f109\"}.vjs-icon-square{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-square:before{content:\"\\f10a\"}.vjs-icon-spinner{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-spinner:before{content:\"\\f10b\"}.video-js .vjs-subs-caps-button .vjs-icon-placeholder,.video-js .vjs-subtitles-button .vjs-icon-placeholder,.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder,.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder,.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder,.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder,.vjs-icon-subtitles{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-subs-caps-button .vjs-icon-placeholder:before,.video-js .vjs-subtitles-button .vjs-icon-placeholder:before,.video-js.video-js:lang(en-AU) .vjs-subs-caps-button .vjs-icon-placeholder:before,.video-js.video-js:lang(en-GB) .vjs-subs-caps-button .vjs-icon-placeholder:before,.video-js.video-js:lang(en-IE) .vjs-subs-caps-button .vjs-icon-placeholder:before,.video-js.video-js:lang(en-NZ) .vjs-subs-caps-button .vjs-icon-placeholder:before,.vjs-icon-subtitles:before{content:\"\\f10c\"}.video-js .vjs-captions-button .vjs-icon-placeholder,.video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder,.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder,.vjs-icon-captions{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-captions-button .vjs-icon-placeholder:before,.video-js:lang(en) .vjs-subs-caps-button .vjs-icon-placeholder:before,.video-js:lang(fr-CA) .vjs-subs-caps-button .vjs-icon-placeholder:before,.vjs-icon-captions:before{content:\"\\f10d\"}.video-js .vjs-chapters-button .vjs-icon-placeholder,.vjs-icon-chapters{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-chapters-button .vjs-icon-placeholder:before,.vjs-icon-chapters:before{content:\"\\f10e\"}.vjs-icon-share{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-share:before{content:\"\\f10f\"}.vjs-icon-cog{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-cog:before{content:\"\\f110\"}.video-js .vjs-play-progress,.video-js .vjs-volume-level,.vjs-icon-circle,.vjs-seek-to-live-control .vjs-icon-placeholder{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-play-progress:before,.video-js .vjs-volume-level:before,.vjs-icon-circle:before,.vjs-seek-to-live-control .vjs-icon-placeholder:before{content:\"\\f111\"}.vjs-icon-circle-outline{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-circle-outline:before{content:\"\\f112\"}.vjs-icon-circle-inner-circle{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-circle-inner-circle:before{content:\"\\f113\"}.vjs-icon-hd{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-hd:before{content:\"\\f114\"}.video-js .vjs-control.vjs-close-button .vjs-icon-placeholder,.vjs-icon-cancel{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-control.vjs-close-button .vjs-icon-placeholder:before,.vjs-icon-cancel:before{content:\"\\f115\"}.video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder,.vjs-icon-replay{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-play-control.vjs-ended .vjs-icon-placeholder:before,.vjs-icon-replay:before{content:\"\\f116\"}.vjs-icon-facebook{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-facebook:before{content:\"\\f117\"}.vjs-icon-gplus{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-gplus:before{content:\"\\f118\"}.vjs-icon-linkedin{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-linkedin:before{content:\"\\f119\"}.vjs-icon-twitter{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-twitter:before{content:\"\\f11a\"}.vjs-icon-tumblr{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-tumblr:before{content:\"\\f11b\"}.vjs-icon-pinterest{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-pinterest:before{content:\"\\f11c\"}.video-js .vjs-descriptions-button .vjs-icon-placeholder,.vjs-icon-audio-description{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-descriptions-button .vjs-icon-placeholder:before,.vjs-icon-audio-description:before{content:\"\\f11d\"}.video-js .vjs-audio-button .vjs-icon-placeholder,.vjs-icon-audio{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-audio-button .vjs-icon-placeholder:before,.vjs-icon-audio:before{content:\"\\f11e\"}.vjs-icon-next-item{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-next-item:before{content:\"\\f11f\"}.vjs-icon-previous-item{font-family:VideoJS;font-weight:400;font-style:normal}.vjs-icon-previous-item:before{content:\"\\f120\"}.video-js .vjs-picture-in-picture-control .vjs-icon-placeholder,.vjs-icon-picture-in-picture-enter{font-family:VideoJS;font-weight:400;font-style:normal}.video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before,.vjs-icon-picture-in-picture-enter:before{content:\"\\f121\"}.video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder,.vjs-icon-picture-in-picture-exit{font-family:VideoJS;font-weight:400;font-style:normal}.video-js.vjs-picture-in-picture .vjs-picture-in-picture-control .vjs-icon-placeholder:before,.vjs-icon-picture-in-picture-exit:before{content:\"\\f122\"}.video-js{display:block;vertical-align:top;box-sizing:border-box;color:#fff;background-color:#000;position:relative;padding:0;font-size:10px;line-height:1;font-weight:400;font-style:normal;font-family:Arial,Helvetica,sans-serif;word-break:initial}.video-js:-moz-full-screen{position:absolute}.video-js:-webkit-full-screen{width:100%!important;height:100%!important}.video-js[tabindex=\"-1\"]{outline:0}.video-js *,.video-js :after,.video-js :before{box-sizing:inherit}.video-js ul{font-family:inherit;font-size:inherit;line-height:inherit;list-style-position:outside;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0}.video-js.vjs-16-9,.video-js.vjs-4-3,.video-js.vjs-fluid{width:100%;max-width:100%;height:0}.video-js.vjs-16-9{padding-top:56.25%}.video-js.vjs-4-3{padding-top:75%}.video-js.vjs-fill{width:100%;height:100%}.video-js .vjs-tech{position:absolute;top:0;left:0;width:100%;height:100%}body.vjs-full-window{padding:0;margin:0;height:100%}.vjs-full-window .video-js.vjs-fullscreen{position:fixed;overflow:hidden;z-index:1000;left:0;top:0;bottom:0;right:0}.video-js.vjs-fullscreen:not(.vjs-ios-native-fs){width:100%!important;height:100%!important;padding-top:0!important}.video-js.vjs-fullscreen.vjs-user-inactive{cursor:none}.vjs-hidden{display:none!important}.vjs-disabled{opacity:.5;cursor:default}.video-js .vjs-offscreen{height:1px;left:-9999px;position:absolute;top:0;width:1px}.vjs-lock-showing{display:block!important;opacity:1;visibility:visible}.vjs-no-js{padding:20px;color:#fff;background-color:#000;font-size:18px;font-family:Arial,Helvetica,sans-serif;text-align:center;width:300px;height:150px;margin:0 auto}.vjs-no-js a,.vjs-no-js a:visited{color:#66a8cc}.video-js .vjs-big-play-button{font-size:3em;line-height:1.5em;height:1.63332em;width:3em;display:block;position:absolute;top:10px;left:10px;padding:0;cursor:pointer;opacity:1;border:.06666em solid #fff;background-color:#2b333f;background-color:rgba(43,51,63,.7);border-radius:.3em;transition:all .4s}.vjs-big-play-centered .vjs-big-play-button{top:50%;left:50%;margin-top:-.81666em;margin-left:-1.5em}.video-js .vjs-big-play-button:focus,.video-js:hover .vjs-big-play-button{border-color:#fff;background-color:#73859f;background-color:rgba(115,133,159,.5);transition:all 0s}.vjs-controls-disabled .vjs-big-play-button,.vjs-error .vjs-big-play-button,.vjs-has-started .vjs-big-play-button,.vjs-using-native-controls .vjs-big-play-button{display:none}.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause .vjs-big-play-button{display:block}.video-js button{background:0 0;border:none;color:inherit;display:inline-block;font-size:inherit;line-height:inherit;text-transform:none;text-decoration:none;transition:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.vjs-control .vjs-button{width:100%;height:100%}.video-js .vjs-control.vjs-close-button{cursor:pointer;height:3em;position:absolute;right:0;top:.5em;z-index:2}.video-js .vjs-modal-dialog{background:rgba(0,0,0,.8);background:linear-gradient(180deg,rgba(0,0,0,.8),rgba(255,255,255,0));overflow:auto}.video-js .vjs-modal-dialog>*{box-sizing:border-box}.vjs-modal-dialog .vjs-modal-dialog-content{font-size:1.2em;line-height:1.5;padding:20px 24px;z-index:1}.vjs-menu-button{cursor:pointer}.vjs-menu-button.vjs-disabled{cursor:default}.vjs-workinghover .vjs-menu-button.vjs-disabled:hover .vjs-menu{display:none}.vjs-menu .vjs-menu-content{display:block;padding:0;margin:0;font-family:Arial,Helvetica,sans-serif;overflow:auto}.vjs-menu .vjs-menu-content>*{box-sizing:border-box}.vjs-scrubbing .vjs-control.vjs-menu-button:hover .vjs-menu{display:none}.vjs-menu li{list-style:none;margin:0;padding:.2em 0;line-height:1.4em;font-size:1.2em;text-align:center;text-transform:lowercase}.js-focus-visible .vjs-menu li.vjs-menu-item:hover,.vjs-menu li.vjs-menu-item:focus,.vjs-menu li.vjs-menu-item:hover{background-color:#73859f;background-color:rgba(115,133,159,.5)}.js-focus-visible .vjs-menu li.vjs-selected:hover,.vjs-menu li.vjs-selected,.vjs-menu li.vjs-selected:focus,.vjs-menu li.vjs-selected:hover{background-color:#fff;color:#2b333f}.vjs-menu li.vjs-menu-title{text-align:center;text-transform:uppercase;font-size:1em;line-height:2em;padding:0;margin:0 0 .3em 0;font-weight:700;cursor:default}.vjs-menu-button-popup .vjs-menu{display:none;position:absolute;bottom:0;width:10em;left:-3em;height:0;margin-bottom:1.5em;border-top-color:rgba(43,51,63,.7)}.vjs-menu-button-popup .vjs-menu .vjs-menu-content{background-color:#2b333f;background-color:rgba(43,51,63,.7);position:absolute;width:100%;bottom:1.5em;max-height:15em}.vjs-layout-tiny .vjs-menu-button-popup .vjs-menu .vjs-menu-content,.vjs-layout-x-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content{max-height:5em}.vjs-layout-small .vjs-menu-button-popup .vjs-menu .vjs-menu-content{max-height:10em}.vjs-layout-medium .vjs-menu-button-popup .vjs-menu .vjs-menu-content{max-height:14em}.vjs-layout-huge .vjs-menu-button-popup .vjs-menu .vjs-menu-content,.vjs-layout-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content,.vjs-layout-x-large .vjs-menu-button-popup .vjs-menu .vjs-menu-content{max-height:25em}.vjs-menu-button-popup .vjs-menu.vjs-lock-showing,.vjs-workinghover .vjs-menu-button-popup.vjs-hover .vjs-menu{display:block}.video-js .vjs-menu-button-inline{transition:all .4s;overflow:hidden}.video-js .vjs-menu-button-inline:before{width:2.222222222em}.video-js .vjs-menu-button-inline.vjs-slider-active,.video-js .vjs-menu-button-inline:focus,.video-js .vjs-menu-button-inline:hover,.video-js.vjs-no-flex .vjs-menu-button-inline{width:12em}.vjs-menu-button-inline .vjs-menu{opacity:0;height:100%;width:auto;position:absolute;left:4em;top:0;padding:0;margin:0;transition:all .4s}.vjs-menu-button-inline.vjs-slider-active .vjs-menu,.vjs-menu-button-inline:focus .vjs-menu,.vjs-menu-button-inline:hover .vjs-menu{display:block;opacity:1}.vjs-no-flex .vjs-menu-button-inline .vjs-menu{display:block;opacity:1;position:relative;width:auto}.vjs-no-flex .vjs-menu-button-inline.vjs-slider-active .vjs-menu,.vjs-no-flex .vjs-menu-button-inline:focus .vjs-menu,.vjs-no-flex .vjs-menu-button-inline:hover .vjs-menu{width:auto}.vjs-menu-button-inline .vjs-menu-content{width:auto;height:100%;margin:0;overflow:hidden}.video-js .vjs-control-bar{display:none;width:100%;position:absolute;bottom:0;left:0;right:0;height:3em;background-color:#2b333f;background-color:rgba(43,51,63,.7)}.vjs-has-started .vjs-control-bar{display:flex;visibility:visible;opacity:1;transition:visibility .1s,opacity .1s}.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar{visibility:visible;opacity:0;transition:visibility 1s,opacity 1s}.vjs-controls-disabled .vjs-control-bar,.vjs-error .vjs-control-bar,.vjs-using-native-controls .vjs-control-bar{display:none!important}.vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar{opacity:1;visibility:visible}.vjs-has-started.vjs-no-flex .vjs-control-bar{display:table}.video-js .vjs-control{position:relative;text-align:center;margin:0;padding:0;height:100%;width:4em;flex:none}.vjs-button>.vjs-icon-placeholder:before{font-size:1.8em;line-height:1.67}.video-js .vjs-control:focus,.video-js .vjs-control:focus:before,.video-js .vjs-control:hover:before{text-shadow:0 0 1em #fff}.video-js .vjs-control-text{border:0;clip:rect(0 0 0 0);height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.vjs-no-flex .vjs-control{display:table-cell;vertical-align:middle}.video-js .vjs-custom-control-spacer{display:none}.video-js .vjs-progress-control{cursor:pointer;flex:auto;display:flex;align-items:center;min-width:4em;touch-action:none}.video-js .vjs-progress-control.disabled{cursor:default}.vjs-live .vjs-progress-control{display:none}.vjs-liveui .vjs-progress-control{display:flex;align-items:center}.vjs-no-flex .vjs-progress-control{width:auto}.video-js .vjs-progress-holder{flex:auto;transition:all .2s;height:.3em}.video-js .vjs-progress-control .vjs-progress-holder{margin:0 10px}.video-js .vjs-progress-control:hover .vjs-progress-holder{font-size:1.6666666667em}.video-js .vjs-progress-control:hover .vjs-progress-holder.disabled{font-size:1em}.video-js .vjs-progress-holder .vjs-load-progress,.video-js .vjs-progress-holder .vjs-load-progress div,.video-js .vjs-progress-holder .vjs-play-progress{position:absolute;display:block;height:100%;margin:0;padding:0;width:0}.video-js .vjs-play-progress{background-color:#fff}.video-js .vjs-play-progress:before{font-size:.9em;position:absolute;right:-.5em;top:-.3333333333em;z-index:1}.video-js .vjs-load-progress{background:rgba(115,133,159,.5)}.video-js .vjs-load-progress div{background:rgba(115,133,159,.75)}.video-js .vjs-time-tooltip{background-color:#fff;background-color:rgba(255,255,255,.8);border-radius:.3em;color:#000;float:right;font-family:Arial,Helvetica,sans-serif;font-size:1em;padding:6px 8px 8px 8px;pointer-events:none;position:absolute;top:-3.4em;visibility:hidden;z-index:1}.video-js .vjs-progress-holder:focus .vjs-time-tooltip{display:none}.video-js .vjs-progress-control:hover .vjs-progress-holder:focus .vjs-time-tooltip,.video-js .vjs-progress-control:hover .vjs-time-tooltip{display:block;font-size:.6em;visibility:visible}.video-js .vjs-progress-control.disabled:hover .vjs-time-tooltip{font-size:1em}.video-js .vjs-progress-control .vjs-mouse-display{display:none;position:absolute;width:1px;height:100%;background-color:#000;z-index:1}.vjs-no-flex .vjs-progress-control .vjs-mouse-display{z-index:0}.video-js .vjs-progress-control:hover .vjs-mouse-display{display:block}.video-js.vjs-user-inactive .vjs-progress-control .vjs-mouse-display{visibility:hidden;opacity:0;transition:visibility 1s,opacity 1s}.video-js.vjs-user-inactive.vjs-no-flex .vjs-progress-control .vjs-mouse-display{display:none}.vjs-mouse-display .vjs-time-tooltip{color:#fff;background-color:#000;background-color:rgba(0,0,0,.8)}.video-js .vjs-slider{position:relative;cursor:pointer;padding:0;margin:0 .45em 0 .45em;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#73859f;background-color:rgba(115,133,159,.5)}.video-js .vjs-slider.disabled{cursor:default}.video-js .vjs-slider:focus{text-shadow:0 0 1em #fff;box-shadow:0 0 1em #fff}.video-js .vjs-mute-control{cursor:pointer;flex:none}.video-js .vjs-volume-control{cursor:pointer;margin-right:1em;display:flex}.video-js .vjs-volume-control.vjs-volume-horizontal{width:5em}.video-js .vjs-volume-panel .vjs-volume-control{visibility:visible;opacity:0;width:1px;height:1px;margin-left:-1px}.video-js .vjs-volume-panel{transition:width 1s}.video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active,.video-js .vjs-volume-panel .vjs-volume-control:active,.video-js .vjs-volume-panel.vjs-hover .vjs-mute-control~.vjs-volume-control,.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control,.video-js .vjs-volume-panel:active .vjs-volume-control,.video-js .vjs-volume-panel:focus .vjs-volume-control{visibility:visible;opacity:1;position:relative;transition:visibility .1s,opacity .1s,height .1s,width .1s,left 0s,top 0s}.video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-horizontal,.video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-horizontal,.video-js .vjs-volume-panel.vjs-hover .vjs-mute-control~.vjs-volume-control.vjs-volume-horizontal,.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-horizontal,.video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-horizontal,.video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-horizontal{width:5em;height:3em;margin-right:0}.video-js .vjs-volume-panel .vjs-volume-control.vjs-slider-active.vjs-volume-vertical,.video-js .vjs-volume-panel .vjs-volume-control:active.vjs-volume-vertical,.video-js .vjs-volume-panel.vjs-hover .vjs-mute-control~.vjs-volume-control.vjs-volume-vertical,.video-js .vjs-volume-panel.vjs-hover .vjs-volume-control.vjs-volume-vertical,.video-js .vjs-volume-panel:active .vjs-volume-control.vjs-volume-vertical,.video-js .vjs-volume-panel:focus .vjs-volume-control.vjs-volume-vertical{left:-3.5em;transition:left 0s}.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover,.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active,.video-js .vjs-volume-panel.vjs-volume-panel-horizontal:active{width:10em;transition:width .1s}.video-js .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-mute-toggle-only{width:4em}.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical{height:8em;width:3em;left:-3000em;transition:visibility 1s,opacity 1s,height 1s 1s,width 1s 1s,left 1s 1s,top 1s 1s}.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal{transition:visibility 1s,opacity 1s,height 1s 1s,width 1s,left 1s 1s,top 1s 1s}.video-js.vjs-no-flex .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal{width:5em;height:3em;visibility:visible;opacity:1;position:relative;transition:none}.video-js.vjs-no-flex .vjs-volume-control.vjs-volume-vertical,.video-js.vjs-no-flex .vjs-volume-panel .vjs-volume-control.vjs-volume-vertical{position:absolute;bottom:3em;left:.5em}.video-js .vjs-volume-panel{display:flex}.video-js .vjs-volume-bar{margin:1.35em .45em}.vjs-volume-bar.vjs-slider-horizontal{width:5em;height:.3em}.vjs-volume-bar.vjs-slider-vertical{width:.3em;height:5em;margin:1.35em auto}.video-js .vjs-volume-level{position:absolute;bottom:0;left:0;background-color:#fff}.video-js .vjs-volume-level:before{position:absolute;font-size:.9em}.vjs-slider-vertical .vjs-volume-level{width:.3em}.vjs-slider-vertical .vjs-volume-level:before{top:-.5em;left:-.3em}.vjs-slider-horizontal .vjs-volume-level{height:.3em}.vjs-slider-horizontal .vjs-volume-level:before{top:-.3em;right:-.5em}.video-js .vjs-volume-panel.vjs-volume-panel-vertical{width:4em}.vjs-volume-bar.vjs-slider-vertical .vjs-volume-level{height:100%}.vjs-volume-bar.vjs-slider-horizontal .vjs-volume-level{width:100%}.video-js .vjs-volume-vertical{width:3em;height:8em;bottom:8em;background-color:#2b333f;background-color:rgba(43,51,63,.7)}.video-js .vjs-volume-horizontal .vjs-menu{left:-2em}.vjs-poster{display:inline-block;vertical-align:middle;background-repeat:no-repeat;background-position:50% 50%;background-size:contain;background-color:#000;cursor:pointer;margin:0;padding:0;position:absolute;top:0;right:0;bottom:0;left:0;height:100%}.vjs-has-started .vjs-poster{display:none}.vjs-audio.vjs-has-started .vjs-poster{display:block}.vjs-using-native-controls .vjs-poster{display:none}.video-js .vjs-live-control{display:flex;align-items:flex-start;flex:auto;font-size:1em;line-height:3em}.vjs-no-flex .vjs-live-control{display:table-cell;width:auto;text-align:left}.video-js.vjs-liveui .vjs-live-control,.video-js:not(.vjs-live) .vjs-live-control{display:none}.video-js .vjs-seek-to-live-control{align-items:center;cursor:pointer;flex:none;display:inline-flex;height:100%;padding-left:.5em;padding-right:.5em;font-size:1em;line-height:3em;width:auto;min-width:4em}.vjs-no-flex .vjs-seek-to-live-control{display:table-cell;width:auto;text-align:left}.video-js.vjs-live:not(.vjs-liveui) .vjs-seek-to-live-control,.video-js:not(.vjs-live) .vjs-seek-to-live-control{display:none}.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge{cursor:auto}.vjs-seek-to-live-control .vjs-icon-placeholder{margin-right:.5em;color:#888}.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge .vjs-icon-placeholder{color:red}.video-js .vjs-time-control{flex:none;font-size:1em;line-height:3em;min-width:2em;width:auto;padding-left:1em;padding-right:1em}.vjs-live .vjs-time-control{display:none}.video-js .vjs-current-time,.vjs-no-flex .vjs-current-time{display:none}.video-js .vjs-duration,.vjs-no-flex .vjs-duration{display:none}.vjs-time-divider{display:none;line-height:3em}.vjs-live .vjs-time-divider{display:none}.video-js .vjs-play-control{cursor:pointer}.video-js .vjs-play-control .vjs-icon-placeholder{flex:none}.vjs-text-track-display{position:absolute;bottom:3em;left:0;right:0;top:0;pointer-events:none}.video-js.vjs-user-inactive.vjs-playing .vjs-text-track-display{bottom:1em}.video-js .vjs-text-track{font-size:1.4em;text-align:center;margin-bottom:.1em}.vjs-subtitles{color:#fff}.vjs-captions{color:#fc6}.vjs-tt-cue{display:block}video::-webkit-media-text-track-display{transform:translateY(-3em)}.video-js.vjs-user-inactive.vjs-playing video::-webkit-media-text-track-display{transform:translateY(-1.5em)}.video-js .vjs-picture-in-picture-control{cursor:pointer;flex:none}.video-js .vjs-fullscreen-control{cursor:pointer;flex:none}.vjs-playback-rate .vjs-playback-rate-value,.vjs-playback-rate>.vjs-menu-button{position:absolute;top:0;left:0;width:100%;height:100%}.vjs-playback-rate .vjs-playback-rate-value{pointer-events:none;font-size:1.5em;line-height:2;text-align:center}.vjs-playback-rate .vjs-menu{width:4em;left:0}.vjs-error .vjs-error-display .vjs-modal-dialog-content{font-size:1.4em;text-align:center}.vjs-error .vjs-error-display:before{color:#fff;content:\"X\";font-family:Arial,Helvetica,sans-serif;font-size:4em;left:0;line-height:1;margin-top:-.5em;position:absolute;text-shadow:.05em .05em .1em #000;text-align:center;top:50%;vertical-align:middle;width:100%}.vjs-loading-spinner{display:none;position:absolute;top:50%;left:50%;margin:-25px 0 0 -25px;opacity:.85;text-align:left;border:6px solid rgba(43,51,63,.7);box-sizing:border-box;background-clip:padding-box;width:50px;height:50px;border-radius:25px;visibility:hidden}.vjs-seeking .vjs-loading-spinner,.vjs-waiting .vjs-loading-spinner{display:block;-webkit-animation:vjs-spinner-show 0s linear .3s forwards;animation:vjs-spinner-show 0s linear .3s forwards}.vjs-loading-spinner:after,.vjs-loading-spinner:before{content:\"\";position:absolute;margin:-6px;box-sizing:inherit;width:inherit;height:inherit;border-radius:inherit;opacity:1;border:inherit;border-color:transparent;border-top-color:#fff}.vjs-seeking .vjs-loading-spinner:after,.vjs-seeking .vjs-loading-spinner:before,.vjs-waiting .vjs-loading-spinner:after,.vjs-waiting .vjs-loading-spinner:before{-webkit-animation:vjs-spinner-spin 1.1s cubic-bezier(.6,.2,0,.8) infinite,vjs-spinner-fade 1.1s linear infinite;animation:vjs-spinner-spin 1.1s cubic-bezier(.6,.2,0,.8) infinite,vjs-spinner-fade 1.1s linear infinite}.vjs-seeking .vjs-loading-spinner:before,.vjs-waiting .vjs-loading-spinner:before{border-top-color:#fff}.vjs-seeking .vjs-loading-spinner:after,.vjs-waiting .vjs-loading-spinner:after{border-top-color:#fff;-webkit-animation-delay:.44s;animation-delay:.44s}@keyframes vjs-spinner-show{to{visibility:visible}}@-webkit-keyframes vjs-spinner-show{to{visibility:visible}}@keyframes vjs-spinner-spin{100%{transform:rotate(360deg)}}@-webkit-keyframes vjs-spinner-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes vjs-spinner-fade{0%{border-top-color:#73859f}20%{border-top-color:#73859f}35%{border-top-color:#fff}60%{border-top-color:#73859f}100%{border-top-color:#73859f}}@-webkit-keyframes vjs-spinner-fade{0%{border-top-color:#73859f}20%{border-top-color:#73859f}35%{border-top-color:#fff}60%{border-top-color:#73859f}100%{border-top-color:#73859f}}.vjs-chapters-button .vjs-menu ul{width:24em}.video-js .vjs-subs-caps-button+.vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder{vertical-align:middle;display:inline-block;margin-bottom:-.1em}.video-js .vjs-subs-caps-button+.vjs-menu .vjs-captions-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before{font-family:VideoJS;content:\"\";font-size:1.5em;line-height:inherit}.video-js .vjs-audio-button+.vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder{vertical-align:middle;display:inline-block;margin-bottom:-.1em}.video-js .vjs-audio-button+.vjs-menu .vjs-main-desc-menu-item .vjs-menu-item-text .vjs-icon-placeholder:before{font-family:VideoJS;content:\" \";font-size:1.5em;line-height:inherit}.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-audio-button,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-captions-button,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-chapters-button,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-current-time,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-descriptions-button,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-duration,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-playback-rate,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-remaining-time,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-subtitles-button,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-time-divider,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-control,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-audio-button,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-captions-button,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-chapters-button,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-current-time,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-descriptions-button,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-duration,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-playback-rate,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-remaining-time,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-subtitles-button,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-time-divider,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-control,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-audio-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-captions-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-chapters-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-current-time,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-descriptions-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-duration,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-playback-rate,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-remaining-time,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-subtitles-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-time-divider,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-control{display:none}.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:active,.video-js:not(.vjs-fullscreen).vjs-layout-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:active,.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-volume-panel.vjs-volume-panel-horizontal:hover,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:active,.video-js:not(.vjs-fullscreen).vjs-layout-x-small .vjs-volume-panel.vjs-volume-panel-horizontal:hover{width:auto;width:initial}.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-subs-caps-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small:not(.vjs-live) .vjs-subs-caps-button,.video-js:not(.vjs-fullscreen).vjs-layout-x-small:not(.vjs-liveui) .vjs-subs-caps-button{display:none}.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-custom-control-spacer,.video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui .vjs-custom-control-spacer{flex:auto;display:block}.video-js:not(.vjs-fullscreen).vjs-layout-tiny.vjs-no-flex .vjs-custom-control-spacer,.video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui.vjs-no-flex .vjs-custom-control-spacer{width:auto}.video-js:not(.vjs-fullscreen).vjs-layout-tiny .vjs-progress-control,.video-js:not(.vjs-fullscreen).vjs-layout-x-small.vjs-liveui .vjs-progress-control{display:none}.vjs-modal-dialog.vjs-text-track-settings{background-color:#2b333f;background-color:rgba(43,51,63,.75);color:#fff;height:70%}.vjs-text-track-settings .vjs-modal-dialog-content{display:table}.vjs-text-track-settings .vjs-track-settings-colors,.vjs-text-track-settings .vjs-track-settings-controls,.vjs-text-track-settings .vjs-track-settings-font{display:table-cell}.vjs-text-track-settings .vjs-track-settings-controls{text-align:right;vertical-align:bottom}@supports (display:grid){.vjs-text-track-settings .vjs-modal-dialog-content{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr;padding:20px 24px 0 24px}.vjs-track-settings-controls .vjs-default-button{margin-bottom:20px}.vjs-text-track-settings .vjs-track-settings-controls{grid-column:1/-1}.vjs-layout-small .vjs-text-track-settings .vjs-modal-dialog-content,.vjs-layout-tiny .vjs-text-track-settings .vjs-modal-dialog-content,.vjs-layout-x-small .vjs-text-track-settings .vjs-modal-dialog-content{grid-template-columns:1fr}}.vjs-track-setting>select{margin-right:1em;margin-bottom:.5em}.vjs-text-track-settings fieldset{margin:5px;padding:3px;border:none}.vjs-text-track-settings fieldset span{display:inline-block}.vjs-text-track-settings fieldset span>select{max-width:7.3em}.vjs-text-track-settings legend{color:#fff;margin:0 0 5px 0}.vjs-text-track-settings .vjs-label{position:absolute;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);display:block;margin:0 0 5px 0;padding:0;border:0;height:1px;width:1px;overflow:hidden}.vjs-track-settings-controls button:active,.vjs-track-settings-controls button:focus{outline-style:solid;outline-width:medium;background-image:linear-gradient(0deg,#fff 88%,#73859f 100%)}.vjs-track-settings-controls button:hover{color:rgba(43,51,63,.75)}.vjs-track-settings-controls button{background-color:#fff;background-image:linear-gradient(-180deg,#fff 88%,#73859f 100%);color:#2b333f;cursor:pointer;border-radius:2px}.vjs-track-settings-controls .vjs-default-button{margin-right:1em}@media print{.video-js>:not(.vjs-tech):not(.vjs-poster){visibility:hidden}}.vjs-resize-manager{position:absolute;top:0;left:0;width:100%;height:100%;border:none;z-index:-1000}.js-focus-visible .video-js :focus:not(.focus-visible){outline:0;background:0 0}.video-js .vjs-menu :focus:not(:focus-visible),.video-js :focus:not(:focus-visible){outline:0;background:0 0}content-video{display:block;width:100%}content-video[fit-container=true]{height:100%}content-video>.hydrated{height:100%}content-video>.hydrated>.content-video{height:100%}content-video>.hydrated>.content-video.content-video--fit-container .video-js.vjs-fluid{height:100%;padding:0}content-video .content-video{position:relative}content-video .content-video .content-video__content{display:block;width:100%;height:100%}content-video .content-video__poster{position:relative}content-video .content-video__play{cursor:pointer;appearance:none;border:none;background:transparent;position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;z-index:1}content-video .content-video__play:before{content:\"►\";font-size:100px}content-video .vjs-content-block-theme.video-js{width:100%;height:100%}content-video .vjs-content-block-theme.video-js video.vjs-tech{position:static}content-video .vjs-content-block-theme.vjs-ended .vjs-loading-spinner,content-video .vjs-content-block-theme.vjs-waiting .vjs-loading-spinner{display:none}content-video .vjs-content-block-theme:hover .vjs-big-play-button,content-video .vjs-content-block-theme:focus .vjs-big-play-button{background-color:transparent}content-video .vjs-content-block-theme .vjs-big-play-button{position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);border:none;background:transparent}content-video .vjs-content-block-theme .vjs-big-play-button .vjs-icon-placeholder{display:block;width:100%;height:100%}content-video .vjs-content-block-theme .vjs-big-play-button .vjs-icon-placeholder:before{display:none}";

const ContentVideo = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    /**
     * If this video is opened within a container, e.g. a <content-overlay> with a target.
     * The height of the video will fit the container instead of resizing to the video aspect ratio.
     * @type Boolean
     * @responsive
     */
    this.fitContainer = false;
    /**
     * @type Select
     * @choice youtube
     * @choice html5
     */
    this.method = 'youtube';
    /**
     * If you're using this inside a content-overlay for example, you may want the video to play immediately on launch.
     * @type Boolean
     */
    this.autoplay = false;
    /**
     * Supports YouTube and self hosted URLs.
     * @type String
     */
    this.src = '';
    /**
     * @type Number
     */
    this.width = 16;
    /**
     * @type Number
     */
    this.height = 9;
    /**
     * @type String
     */
    this.type = 'video/mp4';
    /**
     * @type String
     */
    this.playButtonAriaLabel = 'Play';
    /**
     * @type String
     * @responsive
     */
    this.styleClass = '';
    /**
     * @type Boolean
     */
    this.controls = true;
    /**
     * @type String
     */
    this.preload = 'metadata';
    this.isLoaded = false;
    this.hasPoster = false;
    this.activeClass = '';
    this.isPlayed = false;
  }
  computedVideoConfig() {
    let videoConfig = {};
    if (this.method === 'youtube' || this.src.indexOf('youtube') >= 0) {
      videoConfig = {
        "fluid": true,
        "techOrder": ["youtube"],
        "sources": [{
            "type": "video/youtube",
            "src": this.src,
          }],
        "youtube": {
          "showinfo": 0,
          "rel": 0,
          "modestbranding": 1,
        }
      };
    }
    return videoConfig;
  }
  initVideo() {
    this.isLoaded = true;
  }
  componentDidRender() {
    let self = this;
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    let observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          let videojs = await Promise.resolve().then(function () { return require('./video.es-6edf6fe8.js'); }).then(function (n) { return n.video_es; });
          await Promise.resolve().then(function () { return require('./Youtube-73fd41cc.js'); }).then(function (n) { return n.Youtube; });
          this.hasPoster = !!this.hostElement.querySelector('[slot="poster"]');
          if (!this.hasPoster) {
            this.initVideo();
          }
          if (this.isLoaded && this.videoElement) {
            this.player = videojs.default(this.videoElement, this.computedVideoConfig(), function onPlayerReady() {
              if (self.hasPoster || self.autoplay) {
                self.isPlayed = true;
                this.play();
              }
            });
          }
        }
      });
    }, options);
    observer.observe(this.hostElement);
    if (this.styleClass) {
      windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
        this.activeClass = utils.getCurrentValue(this.styleClass);
        this.activeClass += ' content-video--fit-container';
      });
    }
  }
  onClickHandler(event) {
    event.preventDefault();
    if (this.hasPoster) {
      this.initVideo();
    }
    else {
      this.isPlayed = true;
      this.player.play();
    }
  }
  render() {
    return (utils.h(utils.Host, { class: this.activeClass }, (this.hasPoster && !this.isLoaded) &&
      utils.h("div", { class: "content-video__poster" }, utils.h("slot", { name: "poster" })), ((this.hasPoster && !this.isPlayed) || !this.isPlayed) &&
      utils.h("button", { class: "content-video__play", "aria-label": this.playButtonAriaLabel, onClick: ev => this.onClickHandler(ev) }, utils.h("slot", { name: "playButton" })), utils.h("div", { class: "content-video__content" }, (!this.hasPoster || this.isLoaded) &&
      utils.h("video", { ref: element => this.videoElement = element, class: "video-js vjs-content-block-theme", controls: this.controls, preload: this.preload, width: this.width, height: this.height, crossorigin: "anonymous" }, utils.h("source", { src: this.src, type: this.type }), utils.h("slot", { name: "no-js-message" }), utils.h("slot", { name: "content" }), utils.h("slot", null)))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentVideo.style = contentVideoCss;

exports.content_accordion = ContentAccordion;
exports.content_block_formatter = ContentBlockFormatter;
exports.content_block_wrapper = ContentBlockWrapper;
exports.content_button = ContentButton;
exports.content_carousel = ContentCarousel;
exports.content_formatter_wrapper = ContentFormatterWrapper;
exports.content_grid_formatter = ContentGridFormatter;
exports.content_hero_block = ContentHeroBlock;
exports.content_image = ContentImage;
exports.content_line = ContentBlockLine;
exports.content_split_block = ContentSplitBlock;
exports.content_tabs = ContentTabs;
exports.content_text_block = ContentTextBlock;
exports.content_tout_block = ContentToutBlock;
exports.content_video = ContentVideo;
