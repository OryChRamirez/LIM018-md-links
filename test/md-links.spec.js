const {
  ExistPath,
  convertToAbsolute,
  extension,
  fileContent,
  foundLinks,
} = require('../index');

describe('ExistPath', () => {
  it('Existe la ruta que se le pasa ', () => {
    expect(ExistPath('index.js')).toBe(true);
  });

  it('convertToAbsolute', () => {
    const newLocal = 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\index.js';
    expect(convertToAbsolute('index.js')).toBe(newLocal);
    expect(convertToAbsolute(newLocal)).toBe(newLocal);
  });
});

describe('extension', () => {
  it('debería retornar .md si el archivo es markdown', () => {
    expect(extension('prueba.md')).toBe('.md');
  });
});

describe('fileContent', () => {
  it('debería retornar el contenido del archivo markdown', () => {
    const fileCont = 'Este archivo es para verificar que el test esté pasando [Google](https://www.google.com/)';
    expect(fileContent(convertToAbsolute('test/prueba.md'))).toBe(fileCont);
  });
});

describe('foundLinks', () => {
  const objectResult = [
    {
      href: 'https://www.google.com/',
      text: 'Google',
      file: 'Este archivo es para verificar que el test esté pasando [Google](https://www.google.com/)',
    },
  ];

  it('debería retornar un arreglo con el contenido href, texto y contenido del archivo markdown', () => {
    expect(foundLinks(fileContent('test/prueba.md'))).toStrictEqual(objectResult);
  });
});
