import { i as insertCssIntoHead } from './utils-bec23d2d.js';

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
insertCssIntoHead(document, `${scriptPath}/global/content-blocks-reset.css`);
