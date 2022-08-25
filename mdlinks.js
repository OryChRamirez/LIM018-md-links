const mdFunctions = require('./mdFunctions');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  if (mdFunctions.ExistPath(mdFunctions.convertToAbsolute(path))) {
    if (!mdFunctions.pathIsAbsolute(path)) {
      // eslint-disable-next-line no-param-reassign
      path = mdFunctions.convertToAbsolute(path);
      if (options.validate) {
        const contFile = mdFunctions.fileContent(path);
        const arrayOfLinks = mdFunctions.foundLinks(contFile);
        mdFunctions.validatedUrl(arrayOfLinks).then((result) => {
          resolve(result);
        });
      }
    }
  } else {
    reject(new Error('LA RUTA NO EXISTE'));
  }
});

mdLinks('test/testFiles/prueba2.md', { validate: true }).then((resolve) => {
  console.log(resolve);
});

module.exports = {
  mdLinks,
};
