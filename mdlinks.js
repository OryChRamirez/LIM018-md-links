const mdFunctions = require('./mdFunctions');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const newArrayOfFiles = [];
  // VERIFICAR QUE EXISTA EL PATH PRIMERO
  if (mdFunctions.ExistPath(mdFunctions.convertToAbsolute(path))) {
    // SI LA RUTA NO ES ABSOLUTA DEBE VOLVERLA ABSOLUTA
    if (!mdFunctions.pathIsAbsolute(path)) {
      // REASIGNAMOS EL VALOR AL PATH PARA QUE SEA ABSOLUTA
      // eslint-disable-next-line no-param-reassign
      path = mdFunctions.convertToAbsolute(path);
      // SI LA RUTA ES UN DIRECTORIO
      if (mdFunctions.isAnDirectory(path)) {
        const arrayOfFiles = mdFunctions.recursionToGetFilesPath(path);
        arrayOfFiles.forEach((pathElem) => {
          // SI ES UN ARCHIVO MARKDOWN LO AGREGA AL ARRAY DE RUTAS DE ARCHIVOS
          if (mdFunctions.extension(pathElem) === '.md') {
            newArrayOfFiles.push(pathElem);
          }
          return newArrayOfFiles;
        });
        const newArrayOfLinks = [];
        // RECORRIDO DEL NUEVO ARRAY DE RUTAS DE ARCHIVO
        newArrayOfFiles.forEach((pathElem) => {
          const contFile = mdFunctions.fileContent(pathElem);
          const arrayOfLinks = mdFunctions.foundLinks(contFile, pathElem);
          if (options.validate) {
            newArrayOfLinks.push(mdFunctions.validatedUrl(arrayOfLinks));
          }
          // if (options.stats) {
          //   console.log(newArrayOfLinks.stats);
          //   newArrayOfLinks.push(mdFunctions.statsUrl(arrayOfLinks));
          //   // Object.assign(newArrayOfLinks, { Broken: broken });
          // }
          return newArrayOfLinks;
        });
        Promise.all(newArrayOfLinks)
          .then((result) => {
            resolve(result.flat());
          });
        // SI LA RUTA ES UN ARCHIVO
      } else if (mdFunctions.isAnFile(path)) {
        if (mdFunctions.extension(path) === '.md') {
          if (options.validate) {
            const contFile = mdFunctions.fileContent(path);
            const arrayOfLinks = mdFunctions.foundLinks(contFile, path);
            mdFunctions.validatedUrl(arrayOfLinks).then((result) => {
              resolve(result);
            });
          }
        } else {
          console.log('NO ES UN ARCHIVO MARKDOWN');
        }
      }
    }
  } else {
    reject(new Error('LA RUTA NO EXISTE'));
  }
});

mdLinks('test/testFiles', { validate: true, stats: true })
  .then((resolve) => {
    console.log('ESTE OTRO', resolve);
  })
  .catch((err) => console.log(err.message));

module.exports = {
  mdLinks,
};
