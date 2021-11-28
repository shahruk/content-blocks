import { Component, h, Prop, Listen, Element } from '@stencil/core';
import { BehaviorSubject } from 'rxjs';
export class ContentCarousel {
  constructor() {
    /**
     * @type Select
     * @choice load
     * @choice init
     */
    this.initMethod = 'load';
    this.swiperOptions = '{"slidesPerView": 1, "slidesPerGroup": 1, "autoplay": true, "loop": false}';
    this.loadStatus = new BehaviorSubject(false);
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
    let Swiper = await import('swiper');
    console.log(this.swiperWrapper.children);
    for (const slide of this.swiperWrapper.children) {
      slide.classList.add('swiper-slide');
    }
    this.swiperCarousel = new Swiper.Swiper(this.swiperContainer, this.swiperOptionsFinal);
  }
  render() {
    return (h("content-block-wrapper", { name: "content-carousel", background: this.background },
      h("div", { class: "content-carousel__content" },
        h("div", { class: "swiper-container", ref: el => this.swiperContainer = el },
          h("div", { class: "swiper-wrapper", ref: el => this.swiperWrapper = el },
            h("slot", { name: "content" }),
            h("slot", null)),
          h("div", { class: "swiper-pagination", ref: el => this.swiperPagination = el }),
          h("div", { class: "swiper-button-prev", ref: el => this.swiperPrevElement = el }),
          h("div", { class: "swiper-button-next", ref: el => this.swiperNextElement = el }),
          h("div", { class: "swiper-scrollbar", ref: el => this.swiperScrollbar = el })))));
  }
  static get is() { return "content-carousel"; }
  static get originalStyleUrls() { return {
    "$": ["content-carousel.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["content-carousel.css"]
  }; }
  static get properties() { return {
    "initMethod": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "InitMethodType",
        "resolved": "\"event\" | \"load\"",
        "references": {
          "InitMethodType": {
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
            "text": "load",
            "name": "choice"
          }, {
            "text": "init",
            "name": "choice"
          }],
        "text": ""
      },
      "attribute": "init-method",
      "reflect": false,
      "defaultValue": "'load'"
    },
    "background": {
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
      "attribute": "background",
      "reflect": false
    },
    "swiperOptions": {
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
        "tags": [],
        "text": ""
      },
      "attribute": "swiper-options",
      "reflect": false,
      "defaultValue": "'{\"slidesPerView\": 1, \"slidesPerGroup\": 1, \"autoplay\": true, \"loop\": false}'"
    }
  }; }
  static get elementRef() { return "hostElement"; }
  static get listeners() { return [{
      "name": "setSwiperOptions",
      "method": "setSwiperOptionsCallback",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
