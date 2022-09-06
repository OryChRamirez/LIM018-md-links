![md-links](https://github.com/OryChRamirez/LIM018-md-links/blob/main/src/img/mdlinks-logo.png)

# Descripción

Markdown links es una biblioteca para examinar archivos tipo markdown, a través de rutas ingresadas a través de la línea de comando (CLI), las cuales pueden ser archivos unitarios o directorios que contengan archivos con extensión '.md'. Esta nos permite obtener reportes estadísticos de los enlaces encontrados, información sobre el estado de los links a través de peticiones HTTP, así como datos generales.

# Diagrama de Flujo

![Diagrama de Fujo](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/diagramaDeFlujo.jpg)

# Instalación

Para instalar la biblioteca debe ejecutar el siguiente comando:

  npm md-links-ory-chacon -g
  
 # Guía de uso

Para ejecutar la línea de comandos en la terminal debe utilizar: 

  md-links <path-tofile> [options]

Para visualizar la tabla de ayuda utilice la opción --help o -h luego de una ruta, o ingrese md-links sin ruta ni opciones.

![help](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/help.jpg)

Para verificar la versión instalada ingrese la opción --version o -v.

![version](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/option-version.jpg)

Para verificar el status HTTP a través de una consulta fetch, ingresar la opción --validate o -va. Se mostrará el href, status HTTP, Ok o Fail, text.

![validate](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/option-validate.jpg)

Para verificar los stats de los enlaces (totales y únicos) ingresar la opción --stats o -s.

![stats](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/option-stats.jpg)

Para verificar los stats  de los enlaces (totales, únicos y rotos) ingresar las opciones --validate o -va y --stats o -s (cualquier convinación de validate y stats es válida).

![validate-and-stats](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/options-validate-stats.jpg)

En caso de ingresar md-lins con una ruta pero sin opciones validate o stats se mostrará el href, text, y ruta de cada enlace

![default](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/without-options.jpg)

Si la ruta ingresada no existe: "LA RUTA NO EXISTE".

Si la ruta no contiene enlaces: 

Caso Validate: 

![default](https://raw.githubusercontent.com/OryChRamirez/LIM018-md-links/main/src/img/ruta-sin-enlaces.jpg)
