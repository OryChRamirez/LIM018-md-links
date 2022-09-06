const mdFunctions = require('./mdFunctions');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const newArrayOfFiles = [];
  // VERIFICAR QUE EXISTA EL PATH PRIMERO
  if (!mdFunctions.ExistPath(mdFunctions.convertToAbsolute(path))) {
    reject(new Error('\n\n LA RUTA NO EXISTE \n\n'));
  }
  // SI LA RUTA NO ES ABSOLUTA DEBE VOLVERLA ABSOLUTA

  if (!mdFunctions.pathIsAbsolute(path)) {
    // REASIGNAMOS EL VALOR AL PATH PARA QUE SEA ABSOLUTA
    const newPath = mdFunctions.convertToAbsolute(path);
    // SI LA RUTA ES UN DIRECTORIO
    let arrayOfLinks = [];
    const newArrayOfLinks = [];
    const arrayOfFiles = mdFunctions.recursionToGetFilesPath(newPath);
    arrayOfFiles.forEach((pathElem) => {
      // SI ES UN ARCHIVO MARKDOWN LO AGREGA AL ARRAY DE RUTAS DE ARCHIVOS
      if (mdFunctions.extension(pathElem) === '.md') {
        newArrayOfFiles.push(pathElem);
      }
      // return newArrayOfFiles;
    });
    // RECORRIDO DEL NUEVO ARRAY DE RUTAS DE ARCHIVO
    newArrayOfFiles.forEach((pathElem) => {
      const contFile = mdFunctions.fileContent(pathElem);
      if (contFile !== '' || arrayOfLinks[0] !== undefined) {
        const links4File = mdFunctions.foundLinks(contFile, pathElem);
        newArrayOfLinks.push(mdFunctions.validatedUrl(links4File));
      }
    });
    if (options.validate) {
      Promise.all(newArrayOfLinks)
        .then((result) => {
          resolve(result.flat());
        });
    }
    if (options.stats) {
      Promise.all(newArrayOfLinks)
        .then((result) => {
          const arrayOfstats = mdFunctions.statsUrl(result.flat());
          resolve(arrayOfstats);
        });
    }
    // SI LA RUTA ES UN ARCHIVO
    if (mdFunctions.isAnFile(newPath)) {
      if (mdFunctions.extension(newPath) === '.md') {
        const contFile = mdFunctions.fileContent(newPath);
        if (contFile !== '') {
          arrayOfLinks = mdFunctions.foundLinks(contFile, newPath);
        }
        if (arrayOfLinks[0] !== undefined) {
          if (options.validate) {
            newArrayOfLinks.push(mdFunctions.validatedUrl(arrayOfLinks));
          }
          if (options.stats) {
            newArrayOfLinks.push(mdFunctions.statsUrl(arrayOfLinks));
          }
        }
      }
    }
    Promise.all(newArrayOfLinks)
      .then((result) => {
        resolve(result.flat());
      });
  }
});

// mdLinks('test/', { validate: true })
//   .then((resolve) => {
//     console.log('console del RESOLVE --------', resolve);
//   })
//   .catch((err) => console.log(err.message));

module.exports = {
  mdLinks,
};

// sin opciones debería salir
// href, text, ruta

// con validate solamente
// href, text, ruta, status http, ok o fail

// con stats solamente
// totales, unicos
// con validate y stats
// total, unicos y rotos
