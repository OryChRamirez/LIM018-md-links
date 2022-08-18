const { ExistPath, convertToAbsolute } = require('../index');

describe('Funciones', () => {
  it('Existe la ruta que se le pasa ', () => {
    expect(ExistPath('index.js')).toBe(true);
  });

  it('La ruta es relativa, debe volverla absoluta', () => {
    const newLocal = 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\index.js';
    expect(convertToAbsolute('index.js')).toBe(newLocal);
    expect(convertToAbsolute(newLocal)).toBe(newLocal);
  });
});
