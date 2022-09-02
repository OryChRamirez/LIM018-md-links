const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// LEER LA RUTA
const readDir = (paths) => fs.readdirSync(paths);

// VERIFICAR SI ES UN DIRECTORIO
const isAnDirectory = (paths) => fs.lstatSync(paths).isDirectory();

// VERIFICAR SI ES UN ARCHIVO
const isAnFile = (paths) => fs.lstatSync(paths).isFile();

// VALIDACIÓN DE LA EXISTENCIA DE LA RUTA
const ExistPath = (paths) => fs.existsSync(paths);

// CONVERTIR RUTA RELATIVA A ABSOLUTA
const convertToAbsolute = (pathEntered) => (path.isAbsolute(pathEntered) ? pathEntered : path.resolve(pathEntered));

// LA RUTA ES ABSOLUTA
const pathIsAbsolute = (pathEntered) => path.isAbsolute(pathEntered);

// CONFIRMACIÓN DE LA EXTENSIÓN DEL ARCHIVO
const extension = (paths) => path.extname(paths);

// LEER EL ARCHIVO MARKDOWN
const readFile = (file) => fs.readFileSync(file, 'UTF-8');
const fileContent = (pathAbsolute) => readFile(pathAbsolute);

// EXTRAER LOS LINKS DEL ARCHIVO MARKDOWN
const foundLinks = (fileCont, paths) => {
  let objOfLinks = {};
  // eslint-disable-next-line no-useless-escape
  const expRegMdLinks = /(\[(.*?)\])?\(http(.*?)\)/gm;
  const dataFile = fileCont.match(expRegMdLinks);
  if (dataFile !== null) {
    return dataFile.map((link) => {
      const txtRef = link.indexOf(']');
      const href = link.slice(txtRef + 2, link.length - 1);
      const text = link.slice(1, txtRef);
      const file = paths;
      objOfLinks = { href, text, file };
      return objOfLinks;
    });
  }
  return objOfLinks;
};

// VERIFICAR EL ESTADO DEL URL PARA RETORNAR STATUS / MESAGGE / OK
const urlState = (objUrl) => new Promise((resolve) => {
  const linksData = {};
  const result = fetch(objUrl)
    .then((response) => {
      linksData.status = response.status;
      linksData.message = 'OK';
      linksData.ok = response.ok;
      return { ...objUrl, ...linksData };
    })
    .catch(() => {
      linksData.status = 500;
      linksData.message = 'Fail';
      return { ...objUrl, ...linksData };
    });
  resolve(result);
});

// FUNCIÓN PARA VER LOS STATS DE LOS LINKS DE UN DOCUMENTO
const statsUrl = (arrayOfLinks) => {
  const total = arrayOfLinks.length;
  const unique = new Set(arrayOfLinks.map((link) => link.href)).size;
  return {
    total,
    unique,
  };
};

// RECORRIDO PARA VALIDAR EL ESTADO DE LOS URL UNO POR UNO
const validatedUrl = (arrayOfLinks) => new Promise((resolve) => {
  const newArrayOfLinks = [];
  arrayOfLinks.forEach((link) => newArrayOfLinks.push(urlState(link)));
  Promise.all(newArrayOfLinks)
    .then((result) => resolve(result));
});

// RECURSIVIDAD PARA OBTENER LOS ARCHIVOS
const recursionToGetFilesPath = (paths) => {
  const arrayOfFiles = [];
  if (isAnFile(paths)) {
    return [paths];
  }
  const readFiles = readDir(paths);
  readFiles.forEach((file) => {
    const newPath = path.join(paths, file);
    arrayOfFiles.push(recursionToGetFilesPath(newPath));
  });
  return arrayOfFiles.flat();
};

module.exports = {
  ExistPath,
  convertToAbsolute,
  extension,
  fileContent,
  foundLinks,
  urlState,
  readDir,
  isAnDirectory,
  isAnFile,
  recursionToGetFilesPath,
  validatedUrl,
  pathIsAbsolute,
  statsUrl,
};
