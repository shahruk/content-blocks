import { p as promiseResolve, b as bootstrapLazy } from './utils-bec23d2d.js';
import './globalScript-d352d632.js';

/*
 Stencil Client Patch Browser v2.5.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["content-overlay",[[4,"content-overlay",{"target":[1],"fullScreen":[1,"full-screen"],"styleClass":[1,"style-class"],"horizontalAlignment":[1,"horizontal-alignment"],"verticalAlignment":[1,"vertical-alignment"],"closeTitle":[1,"close-title"],"isActive":[32],"activeClass":[32]},[[8,"contentBlockActivated","onContentBlockActivated"],[0,"ariaDialog.closed","onAriaDialogClosed"]]]]],["content-spacing-wrapper",[[4,"content-spacing-wrapper",{"maxWidth":[1,"max-width"],"fullHeight":[1,"full-height"],"textAlign":[1,"text-align"],"horizontalAlignment":[1,"horizontal-alignment"],"topOffset":[1,"top-offset"],"bottomOffset":[1,"bottom-offset"],"leftOffset":[1,"left-offset"],"rightOffset":[1,"right-offset"],"offsetClass":[1,"offset-class"],"inlineStyle":[32]}]]],["content-accordion_15",[[4,"content-split-block",{"reverse":[8],"background":[1],"activeClass":[32],"activeBackground":[32]}],[4,"content-accordion"],[4,"content-block-formatter"],[4,"content-carousel",{"initMethod":[1,"init-method"],"background":[1],"swiperOptions":[1,"swiper-options"]},[[0,"setSwiperOptions","setSwiperOptionsCallback"]]],[4,"content-hero-block",{"contentPosition":[1,"content-position"],"background":[1],"activeClasses":[32],"revealHiddenContent":[32]},[[8,"contentBlockActivated","contentBlockActivationHandler"]]],[4,"content-tabs"],[4,"content-text-block",{"styleClass":[1,"style-class"],"background":[1],"verticalAlignment":[1,"vertical-alignment"]}],[4,"content-tout-block",{"hover":[1],"hasHoverContent":[32]}],[4,"content-button",{"href":[1025],"target":[1],"styleClass":[1,"style-class"],"clickableBlock":[4,"clickable-block"],"expanded":[1],"controls":[1],"activeClass":[32]}],[0,"content-image",{"lazyLoad":[4,"lazy-load"],"src":[1],"alt":[1],"width":[1],"height":[1],"videoType":[1,"video-type"],"lazyLoadIsComplete":[32],"showVideo":[32],"activeMediaValues":[32]}],[4,"content-line",{"textAlign":[1,"text-align"],"styleClass":[1,"style-class"],"maxWidth":[1,"max-width"],"activeClass":[32],"innerActiveClass":[32],"inlineStyle":[32]}],[4,"content-video",{"fitContainer":[4,"fit-container"],"method":[1],"autoplay":[4],"src":[1],"width":[2],"height":[2],"type":[1],"playButtonAriaLabel":[1,"play-button-aria-label"],"styleClass":[1,"style-class"],"controls":[4],"preload":[1],"isLoaded":[32],"hasPoster":[32],"activeClass":[32],"isPlayed":[32]}],[4,"content-grid-formatter",{"type":[1],"flexGrow":[1,"flex-grow"],"flexShrink":[1,"flex-shrink"],"flexAlign":[1,"flex-align"],"columns":[1],"activeClassString":[32]}],[4,"content-formatter-wrapper",{"background":[1],"name":[1],"extraClasses":[1,"extra-classes"]}],[4,"content-block-wrapper",{"background":[1],"name":[1],"styleClass":[1,"style-class"],"backgroundClasses":[1,"background-classes"],"maxWidth":[1,"max-width"],"styleObject":[32],"activeClass":[32],"inlineStyle":[32]}]]]], options);
});
