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
    default:
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
export default class W3DisclosureButton {
  constructor(stencilElement) {
    var buttons = stencilElement.querySelectorAll('button[aria-expanded][aria-controls], a[role="button"][aria-expanded][aria-controls]');
    for (var i = 0; i < buttons.length; i++) {
      var be = new ButtonExpand(buttons[i]);
      be.init();
    }
  }
}
