'use strict';

const utils = require('./utils-e18255dc.js');

const SCRIPT_NAME = '/content-blocks.esm.js';
let scriptPathFound = false;
let scriptPath = '';
let scripts = document.querySelectorAll('script[type="module"]');
scripts.forEach(script => {
  if (!scriptPathFound && script['src'].includes(SCRIPT_NAME)) {
    scriptPathFound = true;
    scriptPath = script['src'].replace(SCRIPT_NAME, '');
  }
});
utils.insertCssIntoHead(document, `${scriptPath}/global/content-blocks-reset.css`);
