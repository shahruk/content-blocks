'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const utils = require('./utils-e18255dc.js');
const windowResizeService = require('./window-resize-service-fa769f30.js');

/**
 * @namespace aria
 */
var aria$2 = aria$2 || {};
aria$2.Utils = aria$2.Utils || {};
// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria$2.Utils.matches = function (element, selector) {
  return element.matches(selector);
};
aria$2.Utils.remove = function (item) {
  if (item.remove && typeof item.remove === 'function') {
    return item.remove();
  }
  if (item.parentNode &&
    item.parentNode.removeChild &&
    typeof item.parentNode.removeChild === 'function') {
    return item.parentNode.removeChild(item);
  }
  return false;
};
aria$2.Utils.isFocusable = function (element) {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true;
  }
  if (element.disabled) {
    return false;
  }
  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';
    case 'INPUT':
      return element.type != 'hidden' && element.type != 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};
aria$2.Utils.getAncestorBySelector = function (element, selector) {
  if (!aria$2.Utils.matches(element, selector + ' ' + element.tagName)) {
    // Element is not inside an element that matches selector
    return null;
  }
  // Move up the DOM tree until a parent matching the selector is found
  var currentNode = element;
  var ancestor = null;
  while (ancestor === null) {
    if (aria$2.Utils.matches(currentNode.parentNode, selector)) {
      ancestor = currentNode.parentNode;
    }
    else {
      currentNode = currentNode.parentNode;
    }
  }
  return ancestor;
};
aria$2.Utils.hasClass = function (element, className) {
  return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
};
aria$2.Utils.addClass = function (element, className) {
  if (!aria$2.Utils.hasClass(element, className)) {
    element.className += ' ' + className;
  }
};
aria$2.Utils.removeClass = function (element, className) {
  var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
  element.className = element.className.replace(classRegex, ' ').trim();
};
aria$2.Utils.bindMethods = function (object) {
  var methodNames = Array.prototype.slice.call(arguments, 1);
  methodNames.forEach(function (method) {
    object[method] = object[method].bind(object);
  });
};
window.aria = aria$2;

/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
/**
 * @namespace aria
 */
var aria$1 = aria$1 || {};
aria$1.Utils = aria$1.Utils || {};
// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria$1.Utils.matches = function (element, selector) {
  return element.matches(selector);
};
aria$1.Utils.remove = function (item) {
  if (item.remove && typeof item.remove === 'function') {
    return item.remove();
  }
  if (item.parentNode &&
    item.parentNode.removeChild &&
    typeof item.parentNode.removeChild === 'function') {
    return item.parentNode.removeChild(item);
  }
  return false;
};
aria$1.Utils.isFocusable = function (element) {
  if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
    return true;
  }
  if (element.disabled) {
    return false;
  }
  switch (element.nodeName) {
    case 'A':
      return !!element.href && element.rel != 'ignore';
    case 'INPUT':
      return element.type != 'hidden' && element.type != 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};
aria$1.Utils.getAncestorBySelector = function (element, selector) {
  if (!aria$1.Utils.matches(element, selector + ' ' + element.tagName)) {
    // Element is not inside an element that matches selector
    return null;
  }
  // Move up the DOM tree until a parent matching the selector is found
  var currentNode = element;
  var ancestor = null;
  while (ancestor === null) {
    if (aria$1.Utils.matches(currentNode.parentNode, selector)) {
      ancestor = currentNode.parentNode;
    }
    else {
      currentNode = currentNode.parentNode;
    }
  }
  return ancestor;
};
aria$1.Utils.hasClass = function (element, className) {
  return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
};
aria$1.Utils.addClass = function (element, className) {
  if (!aria$1.Utils.hasClass(element, className)) {
    element.className += ' ' + className;
  }
};
aria$1.Utils.removeClass = function (element, className) {
  var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
  element.className = element.className.replace(classRegex, ' ').trim();
};
aria$1.Utils.bindMethods = function (object) {
  var methodNames = Array.prototype.slice.call(arguments, 1);
  methodNames.forEach(function (method) {
    object[method] = object[method].bind(object);
  });
};
/*
* When util functions move focus around, set this true so the focus listener
* can ignore the events.
*/
aria$1.Utils.IgnoreUtilFocusChanges = false;
aria$1.Utils.dialogOpenClass = 'has-dialog';
/**
 * @desc Set focus on descendant nodes until the first focusable element is
 *       found.
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */
aria$1.Utils.focusFirstDescendant = function (element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    if (aria$1.Utils.attemptFocus(child) ||
      aria$1.Utils.focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
}; // end focusFirstDescendant
/**
 * @desc Find the last descendant node that is focusable.
 * @param element
 *          DOM node for which to find the last focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */
aria$1.Utils.focusLastDescendant = function (element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i];
    if (aria$1.Utils.attemptFocus(child) ||
      aria$1.Utils.focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
}; // end focusLastDescendant
/**
 * @desc Set Attempt to set focus on the current node.
 * @param element
 *          The node to attempt to focus on.
 * @returns
 *  true if element is focused.
 */
aria$1.Utils.attemptFocus = function (element) {
  if (!aria$1.Utils.isFocusable(element)) {
    return false;
  }
  aria$1.Utils.IgnoreUtilFocusChanges = true;
  try {
    element.focus();
  }
  catch (e) {
  }
  aria$1.Utils.IgnoreUtilFocusChanges = false;
  return (document.activeElement === element);
}; // end attemptFocus
/* Modals can open modals. Keep track of them with this array. */
aria$1.OpenDialogList = aria$1.OpenDialogList || new Array(0);
/**
 * @returns the last opened dialog (the current dialog)
 */
aria$1.getCurrentDialog = function () {
  if (aria$1.OpenDialogList && aria$1.OpenDialogList.length) {
    return aria$1.OpenDialogList[aria$1.OpenDialogList.length - 1];
  }
};
aria$1.closeCurrentDialog = function () {
  var currentDialog = aria$1.getCurrentDialog();
  if (currentDialog) {
    currentDialog.close();
    return true;
  }
  return false;
};
aria$1.handleEscape = function (event) {
  if (event.key === 'Escape' && aria$1.closeCurrentDialog()) {
    event.stopPropagation();
  }
};
document.addEventListener('keyup', aria$1.handleEscape);
/**
 * @constructor
 * @desc Dialog object providing modal focus management.
 *
 * Assumptions: The element serving as the dialog container is present in the
 * DOM and hidden. The dialog container has role='dialog'.
 *
 * @param dialogNode
 *          The element serving as the dialog container.
 * @param focusAfterClosed
 *          Either the DOM node or the ID of the DOM node to focus when the
 *          dialog closes.
 * @param focusFirst
 *          Optional parameter containing either the DOM node or the ID of the
 *          DOM node to focus when the dialog opens. If not specified, the
 *          first focusable element in the dialog will receive focus.
 */
aria$1.Dialog = function (dialogNode, focusAfterClosed, focusFirst, isFullScreen) {
  this.dialogNode = dialogNode;
  if (this.dialogNode === null) {
    throw new Error('No element found');
  }
  var validRoles = ['dialog', 'alertdialog'];
  var isDialog = (this.dialogNode.getAttribute('role') || '')
    .trim()
    .split(/\s+/g)
    .some(function (token) {
    return validRoles.some(function (role) {
      return token === role;
    });
  });
  if (!isDialog) {
    throw new Error('Dialog() requires a DOM element with ARIA role of dialog or alertdialog.');
  }
  // Wrap in an individual backdrop element if one doesn't exist
  // Native <dialog> elements use the ::backdrop pseudo-element, which
  // works similarly.
  var backdropClass = 'content-overlay-background';
  if (this.dialogNode.parentNode.classList.contains(backdropClass)) {
    this.backdropNode = this.dialogNode.parentNode;
  }
  else {
    this.backdropNode = document.createElement('div');
    this.backdropNode.className = backdropClass;
    this.dialogNode.parentNode.insertBefore(this.backdropNode, this.dialogNode);
    this.backdropNode.appendChild(this.dialogNode);
  }
  this.backdropNode.classList.add('active');
  setTimeout(() => {
    this.backdropNode.classList.add('transition');
  }, 1);
  // Disable scroll on the body element
  this.isFullscreen = isFullScreen;
  if (isFullScreen) {
    document.body.classList.add(aria$1.Utils.dialogOpenClass);
  }
  if (typeof focusAfterClosed === 'string') {
    this.focusAfterClosed = document.getElementById(focusAfterClosed);
  }
  else if (typeof focusAfterClosed === 'object') {
    this.focusAfterClosed = focusAfterClosed;
  }
  else {
    throw new Error('the focusAfterClosed parameter is required for the aria.Dialog constructor.');
  }
  if (typeof focusFirst === 'string') {
    this.focusFirst = document.getElementById(focusFirst);
  }
  else if (typeof focusFirst === 'object') {
    this.focusFirst = focusFirst;
  }
  else {
    this.focusFirst = null;
  }
  // Bracket the dialog node with two invisible, focusable nodes.
  // While this dialog is open, we use these to make sure that focus never
  // leaves the document even if dialogNode is the first or last node.
  var preDiv = document.createElement('div');
  this.preNode = this.dialogNode.parentNode.insertBefore(preDiv, this.dialogNode);
  this.preNode.tabIndex = 0;
  var postDiv = document.createElement('div');
  this.postNode = this.dialogNode.parentNode.insertBefore(postDiv, this.dialogNode.nextSibling);
  this.postNode.tabIndex = 0;
  // If this modal is opening on top of one that is already open,
  // get rid of the document focus listener of the open dialog.
  if (aria$1.OpenDialogList.length > 0) {
    aria$1.getCurrentDialog().removeListeners();
  }
  this.addListeners();
  aria$1.OpenDialogList.push(this);
  this.clearDialog();
  this.dialogNode.className = 'content-overlay-dialog'; // make visible
  if (this.focusFirst) {
    this.focusFirst.focus();
  }
  else {
    aria$1.Utils.focusFirstDescendant(this.dialogNode);
  }
  this.lastFocus = document.activeElement;
}; // end Dialog constructor
aria$1.Dialog.prototype.clearDialog = function () {
  Array.prototype.map.call(this.dialogNode.querySelectorAll('input'), function (input) {
    input.value = '';
  });
};
/**
 * @desc
 *  Hides the current top dialog,
 *  removes listeners of the top dialog,
 *  restore listeners of a parent dialog if one was open under the one that just closed,
 *  and sets focus on the element specified for focusAfterClosed.
 */
aria$1.Dialog.prototype.close = function () {
  aria$1.OpenDialogList.pop();
  this.removeListeners();
  aria$1.Utils.remove(this.preNode);
  aria$1.Utils.remove(this.postNode);
  this.dialogNode.className = 'hidden';
  this.backdropNode.classList.remove('active');
  this.backdropNode.classList.remove('transition');
  this.focusAfterClosed.focus();
  // If a dialog was open underneath this one, restore its listeners.
  if (aria$1.OpenDialogList.length > 0 && aria$1.OpenDialogList.filter(dialog => dialog.isFullscreen === true).length) {
    aria$1.getCurrentDialog().addListeners();
  }
  else {
    document.body.classList.remove(aria$1.Utils.dialogOpenClass);
  }
  this.dialogNode.dispatchEvent(new CustomEvent("ariaDialog.closed", {
    bubbles: true,
    "detail": {
      "slidesPerView": 1.1,
      "slidesPerGroup": 1,
      "centeredSlides": true,
      "spaceBetween": 0,
      "autoplay": false,
      "loop": false,
      breakpoints: {
        768: {
          slidesPerView: 1,
        }
      }
    }
  }));
}; // end close
/**
 * @desc
 *  Hides the current dialog and replaces it with another.
 *
 * @param newDialogId
 *  ID of the dialog that will replace the currently open top dialog.
 * @param newFocusAfterClosed
 *  Optional ID or DOM node specifying where to place focus when the new dialog closes.
 *  If not specified, focus will be placed on the element specified by the dialog being replaced.
 * @param newFocusFirst
 *  Optional ID or DOM node specifying where to place focus in the new dialog when it opens.
 *  If not specified, the first focusable element will receive focus.
 */
aria$1.Dialog.prototype.replace = function (newDialogId, newFocusAfterClosed, newFocusFirst) {
  // var closedDialog = aria.getCurrentDialog();
  aria$1.OpenDialogList.pop();
  this.removeListeners();
  aria$1.Utils.remove(this.preNode);
  aria$1.Utils.remove(this.postNode);
  this.dialogNode.className = 'hidden';
  this.backdropNode.classList.remove('active');
  this.backdropNode.classList.remove('transition');
  var focusAfterClosed = newFocusAfterClosed || this.focusAfterClosed;
  new aria$1.Dialog(newDialogId, focusAfterClosed, newFocusFirst);
  // var dialog = new aria.Dialog(newDialogId, focusAfterClosed, newFocusFirst);
}; // end replace
aria$1.Dialog.prototype.addListeners = function () {
  document.addEventListener('focus', this.trapFocus, true);
}; // end addListeners
aria$1.Dialog.prototype.removeListeners = function () {
  document.removeEventListener('focus', this.trapFocus, true);
}; // end removeListeners
aria$1.Dialog.prototype.trapFocus = function (event) {
  if (aria$1.Utils.IgnoreUtilFocusChanges) {
    return;
  }
  var currentDialog = aria$1.getCurrentDialog();
  if (currentDialog.dialogNode.contains(event.target)) {
    currentDialog.lastFocus = event.target;
  }
  else {
    aria$1.Utils.focusFirstDescendant(currentDialog.dialogNode);
    if (currentDialog.lastFocus == document.activeElement) {
      aria$1.Utils.focusLastDescendant(currentDialog.dialogNode);
    }
    currentDialog.lastFocus = document.activeElement;
  }
}; // end trapFocus
aria$1.closeDialog = function (closeButton) {
  var topDialog = aria$1.getCurrentDialog();
  if (topDialog.dialogNode.contains(closeButton)) {
    topDialog.close();
  }
}; // end closeDialog
aria$1.replaceDialog = function (newDialogId, newFocusAfterClosed, newFocusFirst) {
  var topDialog = aria$1.getCurrentDialog();
  if (topDialog.dialogNode.contains(document.activeElement)) {
    topDialog.replace(newDialogId, newFocusAfterClosed, newFocusFirst);
  }
}; // end replaceDialog
window.aria = aria$1;

const contentOverlayCss = "@charset \"UTF-8\";.content-block-overlay-container{position:relative;display:block}content-overlay{display:block;position:relative}content-overlay.content-overlay-inactive{display:none}content-overlay.content-overlay-active{display:block}content-overlay .content-overlay-background{background:rgba(255, 255, 255, 0.8);bottom:0;display:none;top:0;z-index:100000;right:0;left:0}content-overlay .content-overlay-background.active{display:block}content-overlay .content-overlay__header{display:flex;align-items:center}content-overlay .content-overlay__close{order:2;margin-left:auto;cursor:pointer;z-index:1;appearance:none;background:none;border:none}content-overlay .content-overlay__close:after{content:\"×\";font-size:2.5rem}content-overlay.content-overlay--fullscreen .content-overlay-background{position:fixed}content-overlay.content-overlay--absolute{position:absolute;box-sizing:border-box;z-index:100000;height:100%;width:100%;top:0;left:0}content-overlay.content-overlay--absolute .content-overlay-background{position:absolute}content-overlay.content-overlay--absolute .content-overlay__content,content-overlay.content-overlay--fullscreen .content-overlay__content{flex:1}content-overlay [role=dialog]{display:flex;flex-direction:column;height:100%;justify-content:center}content-overlay [role=dialog].hidden{display:none}content-overlay .content-overlay-horizontal-position-mobile-left{align-items:flex-start}content-overlay .content-overlay-horizontal-position-mobile-center{align-items:center}content-overlay .content-overlay-horizontal-position-mobile-right{align-items:flex-end}@media screen and (min-width: 768px){content-overlay .content-overlay-horizontal-position-tablet-portrait-left{align-items:flex-start}content-overlay .content-overlay-horizontal-position-tablet-portrait-center{align-items:center}content-overlay .content-overlay-horizontal-position-tablet-portrait-right{align-items:flex-end}}@media screen and (min-width: 1024px){content-overlay .content-overlay-horizontal-position-tablet-landscape-left{align-items:flex-start}content-overlay .content-overlay-horizontal-position-tablet-landscape-center{align-items:center}content-overlay .content-overlay-horizontal-position-tablet-landscape-right{align-items:flex-end}}@media screen and (min-width: 1280px){content-overlay .content-overlay-horizontal-position-desktop-left{align-items:flex-start}content-overlay .content-overlay-horizontal-position-desktop-center{align-items:center}content-overlay .content-overlay-horizontal-position-desktop-right{align-items:flex-end}}@media screen and (min-width: 1440px){content-overlay .content-overlay-horizontal-position-desktop-large-left{align-items:flex-start}content-overlay .content-overlay-horizontal-position-desktop-large-center{align-items:center}content-overlay .content-overlay-horizontal-position-desktop-large-right{align-items:flex-end}}@media screen and (min-width: 1920px){content-overlay .content-overlay-horizontal-position-desktop-wide-left{align-items:flex-start}content-overlay .content-overlay-horizontal-position-desktop-wide-center{align-items:center}content-overlay .content-overlay-horizontal-position-desktop-wide-right{align-items:flex-end}}content-overlay .content-overlay-vertical-position-mobile-top{justify-content:flex-start}content-overlay .content-overlay-vertical-position-mobile-center{justify-content:center}content-overlay .content-overlay-vertical-position-mobile-bottom{justify-content:flex-end}@media screen and (min-width: 768px){content-overlay .content-overlay-vertical-position-tablet-portrait-top{justify-content:flex-start}content-overlay .content-overlay-vertical-position-tablet-portrait-center{justify-content:center}content-overlay .content-overlay-vertical-position-tablet-portrait-bottom{justify-content:flex-end}}@media screen and (min-width: 1024px){content-overlay .content-overlay-vertical-position-tablet-landscape-top{justify-content:flex-start}content-overlay .content-overlay-vertical-position-tablet-landscape-center{justify-content:center}content-overlay .content-overlay-vertical-position-tablet-landscape-bottom{justify-content:flex-end}}@media screen and (min-width: 1280px){content-overlay .content-overlay-vertical-position-desktop-top{justify-content:flex-start}content-overlay .content-overlay-vertical-position-desktop-center{justify-content:center}content-overlay .content-overlay-vertical-position-desktop-bottom{justify-content:flex-end}}@media screen and (min-width: 1440px){content-overlay .content-overlay-vertical-position-desktop-large-top{justify-content:flex-start}content-overlay .content-overlay-vertical-position-desktop-large-center{justify-content:center}content-overlay .content-overlay-vertical-position-desktop-large-bottom{justify-content:flex-end}}@media screen and (min-width: 1920px){content-overlay .content-overlay-vertical-position-desktop-wide-top{justify-content:flex-start}content-overlay .content-overlay-vertical-position-desktop-wide-center{justify-content:center}content-overlay .content-overlay-vertical-position-desktop-wide-bottom{justify-content:flex-end}}body.has-dialog{overflow:hidden}";

const ContentOverlay = class {
  constructor(hostRef) {
    utils.registerInstance(this, hostRef);
    this.contentOverlayActivated = utils.createEvent(this, "contentOverlayActivated", 7);
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
    this.activeClass = `content-overlay ${this.isActive ? 'content-overlay-active' : 'content-overlay-inactive'}  content-overlay--${positioningValue} ${utils.getCurrentValue(this.styleClass)}`;
  }
  ;
  componentWillLoad() {
    let targetElement = document.getElementById(this.target);
    this.contentSlot = this.hostElement.querySelector('[slot="content"]');
    windowResizeService.WindowResizeService.breakpointIndex$.subscribe(() => {
      this.isFullScreen = (!targetElement && utils.getCurrentValue(this.fullScreen) === 'true');
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
    return (utils.h(utils.Host, { class: this.activeClass }, utils.h("div", { ref: element => this.dialogElement = element, role: "dialog", "aria-modal": "true", class: "hidden", "aria-expanded": "false" }, utils.h("div", { class: "content-overlay__header" }, utils.h("button", { onClick: e => this.closeOverlayButtonClicked(e), class: "content-overlay__close", title: this.closeTitle }, utils.h("slot", { name: "closeButton" })), utils.h("slot", { name: "header" })), utils.h("slot", { name: "content" }), utils.h("div", { ref: element => this.contentElement = element, class: `content-overlay__content ${utils.generateResponsiveClass('content-overlay-vertical-position', this.verticalAlignment)} ${utils.generateResponsiveClass('content-overlay-horizontal-position', this.horizontalAlignment)}` }))));
  }
  get hostElement() { return utils.getElement(this); }
};
ContentOverlay.style = contentOverlayCss;

exports.content_overlay = ContentOverlay;
