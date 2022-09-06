#!/usr/bin/env node
const mdLinksApi = require('./mdLinksApi');

const options = process.argv;
const inputPath = options[2];

if (options.length === 2 || options[3] === '-h' || options[3] === '-help') {
  mdLinksApi.help();
}

const forVersion = options.indexOf('--version');
const forV = options.indexOf('-v');
if (forVersion !== -1 || forV !== -1) {
  console.log('\n\nEsta es la versión 1.1.0 de md-Links ∼ by Ory Ch Ramirez ᕦ(ò_óˇ)ᕤ\n\n');
} else {
  if (options.length === 3) {
    mdLinksApi.mdLinksDefault(inputPath);
  }

  if (options.length === 4) {
    if (options[3] === '--validate' || options[3] === '-va') {
      mdLinksApi.mdLinksValidate(inputPath);
    } else if (options[3] === '--stats' || options[3] === '-s') {
      mdLinksApi.mdLinksStats(inputPath);
    }
  }
  if (options.length === 5) {
    if ((options[3] === '--stats' || options[3] === '-s') && (options[4] === '--validate' || options[4] === '-va')) {
      mdLinksApi.mdLinksCombinate(inputPath);
    }
    if ((options[4] === '--stats' || options[4] === '-s') && (options[3] === '--validate' || options[3] === '-va')) {
      mdLinksApi.mdLinksCombinate(inputPath);
    }
  }
}
