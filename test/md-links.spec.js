const {
  ExistPath,
  convertToAbsolute,
  extension,
  fileContent,
} = require('../index');

describe('Verificación de rutas', () => {
  it('Existe la ruta que se le pasa ', () => {
    expect(ExistPath('index.js')).toBe(true);
  });

  it('La ruta es relativa, debe volverla absoluta', () => {
    const newLocal = 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\index.js';
    expect(convertToAbsolute('index.js')).toBe(newLocal);
    expect(convertToAbsolute(newLocal)).toBe(newLocal);
  });
});

describe('Verificación de la extensión del archivo', () => {
  it('debería retornar .md si el archivo es markdown', () => {
    expect(extension('prueba.md')).toBe('.md');
  });
});

describe('Trae el contenido del archivo markdown', () => {
  it('debería retornar el contenido del archivo markdown', () => {
    expect(fileContent(convertToAbsolute('test/prueba.md'))).toBe('Este archivo es para verificar que el test esté pasando');
  });
});
