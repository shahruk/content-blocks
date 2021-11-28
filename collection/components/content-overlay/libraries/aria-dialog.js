/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
/**
 * @namespace aria
 */
var aria = aria || {};
aria.Utils = aria.Utils || {};
// Polyfill src https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
aria.Utils.matches = function (element, selector) {
  return element.matches(selector);
};
aria.Utils.remove = function (item) {
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
aria.Utils.isFocusable = function (element) {
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
aria.Utils.getAncestorBySelector = function (element, selector) {
  if (!aria.Utils.matches(element, selector + ' ' + element.tagName)) {
    // Element is not inside an element that matches selector
    return null;
  }
  // Move up the DOM tree until a parent matching the selector is found
  var currentNode = element;
  var ancestor = null;
  while (ancestor === null) {
    if (aria.Utils.matches(currentNode.parentNode, selector)) {
      ancestor = currentNode.parentNode;
    }
    else {
      currentNode = currentNode.parentNode;
    }
  }
  return ancestor;
};
aria.Utils.hasClass = function (element, className) {
  return (new RegExp('(\\s|^)' + className + '(\\s|$)')).test(element.className);
};
aria.Utils.addClass = function (element, className) {
  if (!aria.Utils.hasClass(element, className)) {
    element.className += ' ' + className;
  }
};
aria.Utils.removeClass = function (element, className) {
  var classRegex = new RegExp('(\\s|^)' + className + '(\\s|$)');
  element.className = element.className.replace(classRegex, ' ').trim();
};
aria.Utils.bindMethods = function (object) {
  var methodNames = Array.prototype.slice.call(arguments, 1);
  methodNames.forEach(function (method) {
    object[method] = object[method].bind(object);
  });
};
/*
* When util functions move focus around, set this true so the focus listener
* can ignore the events.
*/
aria.Utils.IgnoreUtilFocusChanges = false;
aria.Utils.dialogOpenClass = 'has-dialog';
/**
 * @desc Set focus on descendant nodes until the first focusable element is
 *       found.
 * @param element
 *          DOM node for which to find the first focusable descendant.
 * @returns
 *  true if a focusable element is found and focus is set.
 */
aria.Utils.focusFirstDescendant = function (element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    if (aria.Utils.attemptFocus(child) ||
      aria.Utils.focusFirstDescendant(child)) {
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
aria.Utils.focusLastDescendant = function (element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i];
    if (aria.Utils.attemptFocus(child) ||
      aria.Utils.focusLastDescendant(child)) {
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
aria.Utils.attemptFocus = function (element) {
  if (!aria.Utils.isFocusable(element)) {
    return false;
  }
  aria.Utils.IgnoreUtilFocusChanges = true;
  try {
    element.focus();
  }
  catch (e) {
  }
  aria.Utils.IgnoreUtilFocusChanges = false;
  return (document.activeElement === element);
}; // end attemptFocus
/* Modals can open modals. Keep track of them with this array. */
aria.OpenDialogList = aria.OpenDialogList || new Array(0);
/**
 * @returns the last opened dialog (the current dialog)
 */
aria.getCurrentDialog = function () {
  if (aria.OpenDialogList && aria.OpenDialogList.length) {
    return aria.OpenDialogList[aria.OpenDialogList.length - 1];
  }
};
aria.closeCurrentDialog = function () {
  var currentDialog = aria.getCurrentDialog();
  if (currentDialog) {
    currentDialog.close();
    return true;
  }
  return false;
};
aria.handleEscape = function (event) {
  if (event.key === 'Escape' && aria.closeCurrentDialog()) {
    event.stopPropagation();
  }
};
document.addEventListener('keyup', aria.handleEscape);
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
aria.Dialog = function (dialogNode, focusAfterClosed, focusFirst, isFullScreen) {
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
    document.body.classList.add(aria.Utils.dialogOpenClass);
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
  if (aria.OpenDialogList.length > 0) {
    aria.getCurrentDialog().removeListeners();
  }
  this.addListeners();
  aria.OpenDialogList.push(this);
  this.clearDialog();
  this.dialogNode.className = 'content-overlay-dialog'; // make visible
  if (this.focusFirst) {
    this.focusFirst.focus();
  }
  else {
    aria.Utils.focusFirstDescendant(this.dialogNode);
  }
  this.lastFocus = document.activeElement;
}; // end Dialog constructor
aria.Dialog.prototype.clearDialog = function () {
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
aria.Dialog.prototype.close = function () {
  aria.OpenDialogList.pop();
  this.removeListeners();
  aria.Utils.remove(this.preNode);
  aria.Utils.remove(this.postNode);
  this.dialogNode.className = 'hidden';
  this.backdropNode.classList.remove('active');
  this.backdropNode.classList.remove('transition');
  this.focusAfterClosed.focus();
  // If a dialog was open underneath this one, restore its listeners.
  if (aria.OpenDialogList.length > 0 && aria.OpenDialogList.filter(dialog => dialog.isFullscreen === true).length) {
    aria.getCurrentDialog().addListeners();
  }
  else {
    document.body.classList.remove(aria.Utils.dialogOpenClass);
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
aria.Dialog.prototype.replace = function (newDialogId, newFocusAfterClosed, newFocusFirst) {
  // var closedDialog = aria.getCurrentDialog();
  aria.OpenDialogList.pop();
  this.removeListeners();
  aria.Utils.remove(this.preNode);
  aria.Utils.remove(this.postNode);
  this.dialogNode.className = 'hidden';
  this.backdropNode.classList.remove('active');
  this.backdropNode.classList.remove('transition');
  var focusAfterClosed = newFocusAfterClosed || this.focusAfterClosed;
  new aria.Dialog(newDialogId, focusAfterClosed, newFocusFirst);
  // var dialog = new aria.Dialog(newDialogId, focusAfterClosed, newFocusFirst);
}; // end replace
aria.Dialog.prototype.addListeners = function () {
  document.addEventListener('focus', this.trapFocus, true);
}; // end addListeners
aria.Dialog.prototype.removeListeners = function () {
  document.removeEventListener('focus', this.trapFocus, true);
}; // end removeListeners
aria.Dialog.prototype.trapFocus = function (event) {
  if (aria.Utils.IgnoreUtilFocusChanges) {
    return;
  }
  var currentDialog = aria.getCurrentDialog();
  if (currentDialog.dialogNode.contains(event.target)) {
    currentDialog.lastFocus = event.target;
  }
  else {
    aria.Utils.focusFirstDescendant(currentDialog.dialogNode);
    if (currentDialog.lastFocus == document.activeElement) {
      aria.Utils.focusLastDescendant(currentDialog.dialogNode);
    }
    currentDialog.lastFocus = document.activeElement;
  }
}; // end trapFocus
aria.closeDialog = function (closeButton) {
  var topDialog = aria.getCurrentDialog();
  if (topDialog.dialogNode.contains(closeButton)) {
    topDialog.close();
  }
}; // end closeDialog
aria.replaceDialog = function (newDialogId, newFocusAfterClosed, newFocusFirst) {
  var topDialog = aria.getCurrentDialog();
  if (topDialog.dialogNode.contains(document.activeElement)) {
    topDialog.replace(newDialogId, newFocusAfterClosed, newFocusFirst);
  }
}; // end replaceDialog
window.aria = aria;
