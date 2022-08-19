const fs = require('fs');
const path = require('path');
const XMLHttpRequest = require('xhr2');
// const marked = require('marked');

// VALIDACIÓN DE LA EXISTENCIA DE LA RUTA
const ExistPath = (paths) => fs.existsSync(paths);

// CONVERTIR RUTA RELATIVA A ABSOLUTA
const convertToAbsolute = (pathEntered) => (path.isAbsolute(pathEntered) ? pathEntered : path.resolve(pathEntered));

// CONFIRMACIÓN DE LA EXTENSIÓN DEL ARCHIVO
const extension = (paths) => path.extname(paths);

// LEER EL ARCHIVO MARKDOWN
const readFile = (file) => fs.readFileSync(file, 'UTF-8');
const fileContent = (pathAbsolute) => readFile(pathAbsolute);

// EXTRAER LOS LINKS DEL ARCHIVO MARKDOWN
const foundLinks = (fileCont) => {
  // eslint-disable-next-line no-useless-escape
  const expReg = /\[([^\[]+)\](\(.*\))/gm;
  const dataFile = fileCont.match(expReg);
  return dataFile.map((link) => {
    const finalTxt = link.indexOf(']');
    return {
      href: link.slice(finalTxt + 2, link.length - 1),
      text: link.slice(1, finalTxt),
      file: fileCont,
    };
  });
};

module.exports = {
  ExistPath,
  convertToAbsolute,
  extension,
  fileContent,
  foundLinks,
};
