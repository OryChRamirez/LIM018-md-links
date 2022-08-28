const fetch = require('node-fetch');
const mdFunctions = require('../mdFunctions');

jest.mock('node-fetch', () => jest.fn());

describe('ExistPath', () => {
  it('Existe la ruta que se le pasa ', () => {
    expect(mdFunctions.ExistPath('test\\testFiles\\prueba.md')).toBe(true);
  });

  it('convertToAbsolute', () => {
    const newLocal = 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\mdFunctions.js';
    expect(mdFunctions.convertToAbsolute('mdFunctions.js')).toBe(newLocal);
    expect(mdFunctions.convertToAbsolute(newLocal)).toBe(newLocal);
  });
});

describe('extension', () => {
  it('debería retornar .md si el archivo es markdown', () => {
    expect(mdFunctions.extension('prueba.md')).toBe('.md');
  });
});

describe('validatedUrl', () => {
  it('status: 200 | message: ok', () => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });
    const resExpected = [{
      status: 200,
      message: 'OK',
      ok: true,
      file: undefined,
      href: 'https://www.google.com/',
      text: 'Google',
    }];
    return mdFunctions.validatedUrl(mdFunctions.foundLinks(mdFunctions.fileContent(mdFunctions.convertToAbsolute('test\\testFiles\\prueba.md'))))
      .then((res) => {
        expect(res).toStrictEqual(resExpected);
      });
  });
  it('status: 500 | message: fail', () => {
    fetch.mockRejectedValue({
      status: 500,
      message: 'Fail',
    });
    const rejExpected = [{
      status: 500,
      message: 'Fail',
      file: undefined,
      href: 'http://community.laboratoria.la/c/js',
      text: 'Foro de la comunidad',
    }];
    return mdFunctions.validatedUrl(mdFunctions.foundLinks(mdFunctions.fileContent(mdFunctions.convertToAbsolute('test\\testFiles\\prueba3.md'))))
      .then((res) => {
        expect(res).toStrictEqual(rejExpected);
      });
  });
});

describe('recursionToGetFiles', () => {
  it('debería retornar un array de archivos si la ruta contiene documentos', () => {
    const links = [
      'test\\testFiles\\prueba.md',
      'test\\testFiles\\prueba2.md',
      'test\\testFiles\\prueba3.md',
    ];
    expect(mdFunctions.recursionToGetFilesPath('test/testFiles')).toStrictEqual(links);
  });
});

describe('statsUrl', () => {
  const objLinks = [
    { href: 'https://www.google.com/', text: 'Google', file: undefined },
    {
      href: 'http://community.laboratoria.la/c/js',
      text: 'Foro de la comunidad',
      file: undefined,
    },
    {
      href: 'https://www.facebook.com/',
      text: 'Facebook',
      file: undefined,
    }];

  const objResult = { Total: 3, Unique: 3 };
  it('debería retornar la cantidad de links totales, unicos y rotos', () => {
    expect(mdFunctions.statsUrl(objLinks)).toStrictEqual(objResult);
  });
});
