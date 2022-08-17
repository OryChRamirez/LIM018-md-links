const fs = require('fs');
const path = require('path');

function markdown() {
  const testPath = './prueba.md';

  // VALIDACIÓN DE LA EXISTENCIA DE LA RUTA

  const ExistPath = fs.existsSync(testPath);
  console.log(ExistPath);
  if (ExistPath) {
    // CONVERTIR LA RUTA DE RELATIVA A ABSOLUTA

    const convertToAbsolute = (pathEntered) => (
      path.isAbsolute(pathEntered) ? pathEntered : path.resolve(pathEntered));
    console.log(convertToAbsolute(testPath));
    console.log('LA RUTA EXISTE');
  } else {
    console.log('LA RUTA NO EXISTE');
  }
}

markdown();

// fs.readdir('./', (error, files) => {
//   if (error) {
//     throw error;
//   }
//   console.log(files);
// });
// SI EL ARCHIVO NO ES .MD RETORNA MSJ EN CONSOLA
// const extension = path.extname(testPath);
// if (extension === '.md') {
//   fs.readFile(testPath, 'UTF-8', (error, contFile) => {
//     if (error) {
//       throw error;
//     }
//     console.log('CONTENIDO: ', contFile);
//   });
//   console.log(extension);
// } else {
//   console.log('El archivo no tiene una extensión markdown');
// }
// /\[([^\[]+)\](\(.*\))/gm     ------ regex
