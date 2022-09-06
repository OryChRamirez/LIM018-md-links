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

  it('debería retornar un objeto vacío si no hay links en la ruta', (done) => {
    expect(mdFunctions.foundLinks('', 'ruta')).toStrictEqual({});
    done();
  });
});

describe('mdLinks con la ruta inexistente', () => {
  it('Si la ruta no existe', (done) => {
    mdLinks.mdLinks('./test/test2/nuevo.m', { validate: true }).catch((res) => {
      expect(res).toStrictEqual(new Error('\n\n LA RUTA NO EXISTE \n\n'));
      done();
    });
  });

  it('si mdlinks se resuelve con validate', (done) => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });

    const objResult = [
      {
        href: 'https://www.npmjs.com/package/chalk',
        text: 'npm Chalk',
        file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\test2\\nuevo.md',
        status: 200,
        message: 'OK',
        ok: true,
      },
    ];
    const result = mdLinks.mdLinks('test/test2', { validate: true });
    result.then((res) => {
      expect(res).toStrictEqual(objResult);
      done();
    });
  });

  it('Si mdlinks se resuelve con stats y un archivo md', (done) => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });

    const objResult = { total: 1, unique: 1 };
    const result = mdLinks.mdLinks('test/test2/nuevo.md', { stats: true });
    result.then((res) => {
      expect(res).toStrictEqual(objResult);
      done();
    });
  });

  it('mdlinks con un solo archivo .md y validate true', (done) => {
    fetch.mockResolvedValue({
      status: 200,
      message: 'OK',
      ok: true,
    });
    const result = mdLinks.mdLinks('test/test2/nuevo.md', { validate: true });
    const objResult = [{
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\test2\\nuevo.md',
      href: 'https://www.npmjs.com/package/chalk',
      message: 'OK',
      ok: true,
      status: 200,
      text: 'npm Chalk',
    }];
    result.then((res) => {
      expect(res).toStrictEqual(objResult);
      done();
    });
  });
});
