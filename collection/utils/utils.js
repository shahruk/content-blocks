export const breakpoints = ['mobile', 'tablet-portrait', 'tablet-landscape', 'tablet-pro', 'desktop-large', 'desktop-wide'];
export const breakpointValues = [0, 768, 1024, 1366, 1440, 1920];
export function insertCssIntoHead(document, fontCssUrl) {
  let element = document.querySelector(`link[href="${fontCssUrl}"]`);
  // Only inject the element if it's not yet present
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'stylesheet');
    element.setAttribute('href', fontCssUrl);
    document.head.prepend(element);
  }
}
export function generateResponsiveClass(classPrefix, responsiveValue) {
  let index = -1;
  let classString = '';
  responsiveValue.split('|').forEach(value => {
    index++;
    if (!value || value === 'false') {
      return false;
    }
    classString += ` ${classPrefix}-${breakpoints[index]}-${value}`;
  });
  return classString;
}
// Fills in default value if none exists for a breakpoint
export function generateResponsiveValues(responsiveValue) {
  if (!responsiveValue) {
    return [];
  }
  let responseArray = [];
  let splitResponsiveValues = responsiveValue.split('|');
  let lastGoodValue = splitResponsiveValues[0];
  breakpointValues.forEach((_value, index) => {
    let thisBreakpointValue = splitResponsiveValues[index];
    if (thisBreakpointValue) {
      lastGoodValue = thisBreakpointValue;
    }
    responseArray.push(thisBreakpointValue ? thisBreakpointValue : lastGoodValue);
  });
  return responseArray;
}
export function getCurrentBreakpointIndex() {
  let activeBreakpointIndex = 0;
  let windowWidth = window.innerWidth;
  breakpointValues.some((width) => {
    // The first time this is true will end the loop
    let condition = width > windowWidth;
    if (!condition) {
      activeBreakpointIndex = breakpointValues.indexOf(width);
    }
    return condition;
  });
  return activeBreakpointIndex;
}
export function getCurrentValue(responsiveValue) {
  if (!responsiveValue) {
    return '';
  }
  let currentBreakpoint = getCurrentBreakpointIndex();
  let responsiveValues = generateResponsiveValues(responsiveValue.toString());
  let returnValue;
  for (var i = currentBreakpoint; i >= 0; i--) {
    if (responsiveValues[i]) {
      returnValue = responsiveValues[i];
      i = -1;
    }
  }
  return returnValue;
}
export function getValueAtIndex(index, responsiveValue) {
  let responsiveValues = generateResponsiveValues(responsiveValue.toString());
  return responsiveValues[index].trim();
}
