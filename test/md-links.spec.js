const fetch = require('node-fetch');
const mdFunctions = require('../src/mdFunctions');
const mdLinks = require('../src/mdlinks');

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

  const objResult = { total: 3, unique: 3 };
  it('debería retornar la cantidad de links totales, unicos y rotos', () => {
    expect(mdFunctions.statsUrl(objLinks)).toStrictEqual(objResult);
  });
});

describe('foundLinks', () => {
  const content = `[Google](https://www.google.com/)
  [Foro de la comunidad](http://community.laboratoria.la/c/js)
  [Facebook](https://www.facebook.com/)`;
  const path = 'C:/Users/oryma/Desktop/CLASES/JAVASCRIPT/4Proyecto/LIM018-md-links/test/testFiles/prueba2.md';
  const objLinks = [
    {
      href: 'https://www.google.com/',
      text: 'Google',
      file: 'C:/Users/oryma/Desktop/CLASES/JAVASCRIPT/4Proyecto/LIM018-md-links/test/testFiles/prueba2.md',
    },
    {
      href: 'http://community.laboratoria.la/c/js',
      text: 'Foro de la comunidad',
      file: 'C:/Users/oryma/Desktop/CLASES/JAVASCRIPT/4Proyecto/LIM018-md-links/test/testFiles/prueba2.md',
    },
    {
      href: 'https://www.facebook.com/',
      text: 'Facebook',
      file: 'C:/Users/oryma/Desktop/CLASES/JAVASCRIPT/4Proyecto/LIM018-md-links/test/testFiles/prueba2.md',
    },
  ];
  it('debería retornar array con un objeto que contenga el href, texto y ruta del archivo', () => {
    expect(mdFunctions.foundLinks(content, path)).toStrictEqual(objLinks);
  });

  it('debería retornar un objeto vacío si no hay links en la ruta', () => {
    expect(mdFunctions.foundLinks('', 'ruta')).toStrictEqual({});
  });
});

describe('mdLinks caso default', () => {
  it('Si la ruta no existe', () => {
    mdLinks.mdLinks('test/test2/nuevo.m', { valdate: true }).catch((res) => expect(res).toStrictEqual(new Error('\n\n LA RUTA NO EXISTE \n\n')));
  });

  it('Si mdlinks se resuelve con validate y un archivo md', () => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });
    const resExpected = [{
      status: 200,
      message: 'OK',
      ok: true,
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\test2\\nuevo.md',
      href: 'https://www.npmjs.com/package/chalk',
      text: 'npm Chalk',
    }];
    mdLinks.mdLinks('test/test2/nuevo.md', { valdate: true }).then((res) => expect(res).toStrictEqual(resExpected));
  });

  it('Si mdlinks se resuelve con stats y un archivo md', () => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });

    const objResult = { total: 1, unique: 1 };
    const result = mdLinks.mdLinks('test/test2/nuevo.md', { stats: true });
    result.then((res) => expect(res).toStrictEqual(objResult));
  });

  it('si mdlinks se resuelve con validate y un directorio como ruta', () => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });

    const resExpected = [
      {
        href: 'https://www.google.com/',
        text: 'Google',
        file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba.md',
        status: 200,
        message: 'OK',
        ok: true,
      },
      {
        href: 'https://www.google.com/',
        text: 'Google',
        file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba2.md',
        status: 200,
        message: 'OK',
        ok: true,
      },
      {
        href: 'http://community.laboratoria.la/c/js',
        text: 'Foro de la comunidad',
        file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba2.md',
        status: 200,
        message: 'OK',
        ok: true,
      },
      {
        href: 'https://www.facebook.com/',
        text: 'Facebook',
        file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba2.md',
        status: 200,
        message: 'OK',
        ok: true,
      },
      {
        href: 'http://community.laboratoria.la/c/js',
        text: 'Foro de la comunidad',
        file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba3.md',
        status: 200,
        message: 'OK',
        ok: true,
      },
    ];
    mdLinks.mdLinks('test/testFiles', { valdate: true }).then((res) => expect(res).toStrictEqual(resExpected));
  });
});
