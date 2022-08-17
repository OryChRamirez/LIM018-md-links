const fs = require('fs');
const path = require('path');

function markdown() {
  const testPath = './index.js';
  // fs.readdir('./', (error, files) => {
  //   if (error) {
  //     throw error;
  //   }
  //   console.log(files);
  // });

  // VALIDACIÓN DE LA RUTA
  const ExistPath = fs.existsSync(testPath);
  console.log(ExistPath);
  if (ExistPath) {
  // SI EL ARCHIVO NO ES .MD RETORNA MSJ EN CONSOLA
    const extension = path.extname(testPath);
    if (extension === '.md') {
      fs.readFile(testPath, 'UTF-8', (error, contFile) => {
        if (error) {
          throw error;
        }
        console.log('CONTENIDO: ', contFile);
      });
      console.log(extension);
    } else {
      console.log('El archivo no tiene una extensión markdown');
    }
  } else {
    console.log('LA RUTA NO EXISTE');
  }
}

markdown();

// /\[([^\[]+)\](\(.*\))/gm     ------ regex
