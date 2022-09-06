const mdLinks = require('../src/mdlinks');

const arrayOfLinks = [
  {
    href: 'https://www.npmjs.com/package/chalk',
    text: 'npm Chalk',
    file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\test2\\nuevo.md',
    status: 200,
    message: 'OK',
    ok: true,
  },
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
    status: 500,
    message: 'Fail',
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
    status: 500,
    message: 'Fail',
  },
];
jest.mock('../src/mdFunctions', () => {
  const mdFunctions = jest.requireActual('../src/mdFunctions');
  mdFunctions.urlState = jest.fn(() => [
    Promise.resolve({
      href: 'https://www.npmjs.com/package/chalk',
      text: 'npm Chalk',
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\test2\\nuevo.md',
      status: 200,
      message: 'OK',
      ok: true,
    }),
    Promise.resolve({
      href: 'https://www.google.com/',
      text: 'Google',
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba.md',
      status: 200,
      message: 'OK',
      ok: true,
    }),
    Promise.resolve({
      href: 'https://www.google.com/',
      text: 'Google',
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba2.md',
      status: 200,
      message: 'OK',
      ok: true,
    }),
    Promise.resolve({
      href: 'http://community.laboratoria.la/c/js',
      text: 'Foro de la comunidad',
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba2.md',
      status: 500,
      message: 'Fail',
    }),
    Promise.resolve({
      href: 'https://www.facebook.com/',
      text: 'Facebook',
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba2.md',
      status: 200,
      message: 'OK',
      ok: true,
    }),
    Promise.resolve({
      href: 'http://community.laboratoria.la/c/js',
      text: 'Foro de la comunidad',
      file: 'C:\\Users\\oryma\\Desktop\\CLASES\\JAVASCRIPT\\4Proyecto\\LIM018-md-links\\test\\testFiles\\prueba3.md',
      status: 500,
      message: 'Fail',
    }),
  ]);
  return mdFunctions;
});

it('Si mdlinks se resuelve con validate y una ruta', () => {
  mdLinks.mdLinks('test', { validate: true }).then((res) => {
    expect(res).toStrictEqual(arrayOfLinks);
  });
});
