const fetch = require('node-fetch');
const {
  ExistPath,
  convertToAbsolute,
  extension,
  fileContent,
  foundLinks,
  urlState,
  recursionToGetFilesPath,
} = require('../mdFunctions');

jest.mock('node-fetch', () => jest.fn());

describe('ExistPath', () => {
  it('Existe la ruta que se le pasa ', () => {
    expect(ExistPath('test\\testFiles\\prueba.md')).toBe(true);
  });

  it('convertToAbsolute', () => {
    const newLocal = 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\mdFunctions.js';
    expect(convertToAbsolute('mdFunctions.js')).toBe(newLocal);
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
    expect(fileContent(convertToAbsolute('test/testFiles/prueba.md'))).toBe(fileCont);
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
    expect(foundLinks(fileContent('test/testFiles/prueba.md'))).toStrictEqual(objectResult);
  });
});

describe('urlState', () => {
  const resultOk = {
    status: 200,
    message: 'OK',
    ok: true,
  };

  it('debería retornar el status, mensaje y true en caso de que el link esté ok', (done) => {
    fetch.mockResolvedValue({ status: 200, statusText: 'OK', ok: true });
    urlState('https://noattack.com/proyectos/')
      .then((res) => {
        expect(res).toStrictEqual(resultOk);
        done();
      });
  });

  const resultFail = {
    status: 500,
    message: 'Fail',
  };

  it('debería retornar el status y el mensaje Fail', (done) => {
    fetch.mockRejectedValue({ status: 500, message: 'Fail' });
    urlState('https://noattacm/proyectos/')
      .then((res) => {
        console.log(res);
        expect(res).toStrictEqual(resultFail);
        done();
      });
  });
});

describe('recursionToGetFiles', () => {
  it('debería retornar un array de archivos si la ruta contiene documentos', () => {
    const links = [
      'test\\testFiles\\prueba.md',
      'test\\testFiles\\prueba2.md',
    ];
    expect(recursionToGetFilesPath('test/testFiles')).toStrictEqual(links);
  });
});
