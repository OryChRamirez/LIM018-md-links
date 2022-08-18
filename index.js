const fs = require('fs');
const path = require('path');
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

// /\[([^\[]+)\](\(.*\))/gm     ------ regex

module.exports = {
  ExistPath,
  convertToAbsolute,
  extension,
  fileContent,
};
