import { h, proxyCustomElement } from '@stencil/core/internal/client';

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
    // When a tablist????????s aria-orientation is set to vertical,
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

const ContentTabs$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  componentDidLoad() {
    new W3Tabs(this.element);
  }
  render() {
    return (h("content-block-wrapper", { name: "content-tabs" }, h("slot", { name: "content" }), h("slot", null)));
  }
  get element() { return this; }
  static get style() { return contentTabsCss; }
};

const ContentTabs = /*@__PURE__*/proxyCustomElement(ContentTabs$1, [4,"content-tabs"]);

export { ContentTabs };
