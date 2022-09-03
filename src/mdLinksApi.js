/* eslint-disable no-console */
const { table } = require('table');
const chalk = require('chalk');
const mdLinksImport = require('./mdlinks');
const mdFunctions = require('./mdFunctions');

const shortLine = '═════════════════════════';
const separatorLine = '.-+**+-.-+**+-.-+**+-.-+**+-.-+**+-.-+**+-.-+**+-.-+**+-.-+**+-.';
const line = '══════════════════════════════════════════════════════════════════════';

const useInfo = `
  "Uso: md-links <path> [option]"
  Nota: Tambien puede usar los alias de los comandos.
        md-links -h
        md-links -v
        md-links ./archivo/ejemplo.md -s
        md-links ./archivo/ejemplo.md -va
        md-links ./archivo/ejemplo.md -s -va
`;

const help = () => {
  console.log(useInfo);

  const info = [
    [
      `${chalk.hex('#66FF33').bold('OPCIONES')}`,
      `${chalk.hex('#66FF33').bold('ALIAS')}`,
      `${chalk.hex('#66FF33').bold('DESCRIPCION')}`,
      `${chalk.hex('#66FF33').bold('EJEMPLO')}`,
    ],
    ['--help', '-h', 'Use esta opción para mostrar ayuda', 'md-links --help'],
    [
      '--version',
      '-v',
      'Use esta opción para mostrar la versión de esta paquetería',
      'md-links --version',
    ],
    [
      '--validate',
      '-va',
      'Use esta opción para mostrar una lista de información adicional de los enlaces',
      'md-links ./archivo/ejemplo.md --validate',
    ],
    [
      '--stats',
      '-s',
      'use esta opción para mostrar información sobra las estadísticas de los enlaces',
      'md-links ./archivo/ejemplo.md --stats',
    ],
    [
      '--stats --validate',
      '-s -va',
      'Use estas opciones juntas para mostrar información sobre las estadisticas de los enlaces más detallada',
      'md-links ./archivo/ejemplo.md --stats --validate',
    ],
    [
      'opción "vacía"',
      '',
      'Use esta opción para mostrar una lista de la información básica de los enlaces',
      'md-links ./archivo/ejemplo.md',
    ],
  ];
  // Controla las medidas de la tabla.
  const configTable = {
    columns: {
      0: { width: 18 },
      1: { width: 6 },
      2: { width: 40 },
      3: { width: 40 },
    },
  };
  console.log(table(info, configTable));
  console.log('\n');
};

// EN CASO SE LLAME MDLINKS SIN NINGUNA OPCION
const mdLinksDefault = (path) => {
  mdLinksImport.mdLinks(path, { validate: true }).then((res) => {
    if (mdFunctions.isAnFile(path) && mdFunctions.extension(path) !== '.md') {
      console.log(`${chalk.hex('#f44611').bold('\n \n LA RUTA DEBE SER UN DIRECTORIO O UN ARCHIVO MARKDONW \n \n')}`);
    }
    if (mdFunctions.isAnDirectory(path) || mdFunctions.extension(path) === '.md') {
      console.log('\n', separatorLine);
      console.log(shortLine, 'ENLACE ENCONTRADOS', shortLine);
      console.log(separatorLine, '\n');
      res.forEach((element) => {
        console.log(element.href, ' --- ', element.text, ' --- ', element.file);
      });
      if (res[0] === undefined) {
        console.log(`${chalk.hex('#f44611').bold('NO SE ENCONTRARON ENLACES EN LA RUTA INGRESADA')}`);
      }
      console.log('\n', separatorLine, '\n', line, '\n', separatorLine, '\n');
    }
  }).catch((err) => console.log(err));
};

// EN CASO SE LLAME MDLINKS CON OPCION VALIDATE
const mdLinksValidate = (path) => {
  mdLinksImport.mdLinks(path, { validate: true }).then((res) => {
    if (mdFunctions.isAnFile(path) && mdFunctions.extension(path) !== '.md') {
      console.log(`${chalk.hex('#f44611').bold('\n \n LA RUTA DEBE SER UN DIRECTORIO O UN ARCHIVO MARKDONW \n \n')}`);
    }
    if (mdFunctions.isAnDirectory(path) || mdFunctions.extension(path) === '.md') {
      console.log('\n', separatorLine);
      console.log(shortLine, 'LINKS ENCONTRADOS', shortLine, '');
      console.log(separatorLine, '\n');
      res.forEach((element) => {
        console.log(element.href, ' --- ', element.status, ' --- ', element.message, ' --- ', element.text);
      });
      if (res[0] === undefined) {
        console.log(`${chalk.hex('#f44611').bold('NO SE ENCONTRARON ENLACES EN LA RUTA INGRESADA')}`);
      }
      console.log('\n', separatorLine, '\n', line, '\n', separatorLine, '\n');
    }
  }).catch((err) => console.log(err));
};

const mdLinksStats = (path) => {
  mdLinksImport.mdLinks(path, { stats: true }).then((res) => {
    if (mdFunctions.isAnFile(path) && mdFunctions.extension(path) !== '.md') {
      console.log(`${chalk.hex('#f44611').bold('\n \n LA RUTA DEBE SER UN DIRECTORIO O UN ARCHIVO MARKDONW \n \n')}`);
    }
    if (mdFunctions.isAnDirectory(path) || mdFunctions.extension(path) === '.md') {
      console.log('\n', separatorLine);
      console.log(shortLine, '  ESTADISTICAS  ', shortLine, '');
      console.log(separatorLine, '\n');
      console.log('Links Totales: ', res.total);
      console.log('Links Unicos: ', res.unique);
      console.log('\n', separatorLine, '\n', line, '\n', separatorLine, '\n');
    }
  }).catch((err) => console.log(err));
};
// EN CASO SE LLAME MDLINKS CON LAS OPCIONES VALIDATE Y STATS
const mdLinksCombinate = (path) => {
  mdLinksImport.mdLinks(path, { validate: true }).then((res) => {
    if (mdFunctions.isAnFile(path) && mdFunctions.extension(path) !== '.md') {
      console.log(`${chalk.hex('#f44611').bold('\n \n LA RUTA DEBE SER UN DIRECTORIO O UN ARCHIVO MARKDONW \n \n')}`);
    }
    if (mdFunctions.isAnDirectory(path) || mdFunctions.extension(path) === '.md') {
      let broken = 0;
      const arrNew = res.reduce((x, y) => x.concat(y), []);
      arrNew.forEach((element) => {
        if (element.status !== 200) {
          broken += 1;
        }
      });
      mdLinksImport.mdLinks(path, { stats: true }).then((result) => {
        console.log('\n', separatorLine);
        console.log(shortLine, '  ESTADISTICAS  ', shortLine, '');
        console.log(separatorLine, '\n');
        console.log('Enlaces Totales: ', result.total);
        console.log('Enlaces Unicos: ', result.unique);
        console.log('Enlaces Rotos: ', broken);
        console.log('\n', separatorLine, '\n', line, '\n', separatorLine, '\n');
      }).catch((err) => console.log(err));
    }
  }).catch((err) => console.log(err));
};
module.exports = {
  help,
  mdLinksDefault,
  mdLinksValidate,
  mdLinksCombinate,
  mdLinksStats,
};
