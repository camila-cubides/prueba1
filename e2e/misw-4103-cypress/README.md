# Proyecto Base: Pruebas End to End con Cypress

Cypress es un framework moderno y fácil de usar para realizar pruebas End-to-End (E2E) en aplicaciones web. Ofrece:

- Una interfaz intuitiva para escribir y depurar tests.
- Esperas automáticas y _time travel_ para diagnóstico en tiempo real.
- Integración nativa con navegadores reales.

Este repositorio contiene la configuración base de Cypress, ahora extendida para soportar escenarios escritos en Gherkin mediante Cucumber.

### Integración con Cucumber (Gherkin)

[Cucumber](https://cucumber.io/) es una herramienta que permite escribir tests de aceptación en un lenguaje legible (Gherkin), facilitando la colaboración entre desarrolladores y stakeholders. Para usar Cucumber con Cypress se incorporan:

- **@badeball/cypress-cucumber-preprocessor:**:Plugin que parsea y vincula archivos .feature con los step definitions.

- **@bahmutov/cypress-esbuild-preprocessor:**:Bundler rápido que compila los tests escritos en ESNext.

- **esbuild:**:Motor de bundling ultra rápido.


---

## Requisitos Básicos

- **Node.js** (v20 o superior).  
- **npm** o **yarn** para gestionar dependencias.
- Cypress instalado en el dispositivo.
- Chromium (valida que se necesita como preqrequisito para que cypress funcione headless o con interfaz)

---

## Ejecución de Pruebas

Para ejecutar las pruebas de Cypress en este proyecto, sigue los siguientes pasos:

### 1. Instalar los módulos necesarios
Primero, instala los módulos ejecutando desde la raiz del proyecto *202512-proyecto-equipo-6* el siguiente comando en la terminal:
```bash
npm ci --prefix ./e2e/misw-4103-cypress
```

### 2. Navegar al directorio de Cypress
Una vez instalados los módulos, navega al directorio `./e2e/misw-4103-cypress`:

```bash
cd ./e2e/misw-4103-cypress
```

### 3. Preparacion de Ghost
Para que funcione se debe tener en ejecucion una instancia de Ghost. Las pruebas estan divididas por funcionalidad, dependiendo de la funcionalidad que desee probar debera tener configurado el sitio de Ghost. Si va a ejecutar pruebas sobre la funcionalidad de crear sitio debera tener una instancia de Ghost sin configuracion inicial, cualquier otra funcionalidad require que el sitio ya haya sido creado y se proporcionen las credenciales de acceso. 

La configuracion de Ghost puede realizarse de dos formas:
1. Configuracion a traves de docker (docker debe estar previamente instalado), debe descargar la imagen con el comando `docker image pull ghost:VERSION` posteriormente debera crear el contenedor con el comando  `docker run -d --name some-ghost -e NODE_ENV=development -e url=http://localhost:3001 -p 3001:2368 ghost:VERSION` eso hara que ghost sea accesible a traves del navegador de su preferencia en la url http://localhost:3001, para entrar a la consola de administracion agregue la ruta /ghost.

2. Configuracion con npm: Puede requerir una version diferente de node dependiendo de la version de Ghost que quiera instalar, debe verificar que version de node necesita para la version de Ghost que quiera instalar. Ejecute el comando npm install -g ghost-cli (puede necesitar una version diferente a la ultima dependiendo de la version de ghost que quiera instalar), posteriormente cree un directorio donde instalara Ghost. Navegue por la terminal de comandos al directorio y ejecute `ghost install VERSION --no-prompt --no-start --local` (puede necesitar agregar el parametro --force si la version esta deprecada) cuando finalice podra inicializar ghost con el comando `ghost start` por defecto esto hara que ghost sea accesible en http://localhost:2368

### 3. Estructura del directorio
La estructura de la carpeta `misw-4103-cypress` es la siguiente:

```
📦 cypress
┣---- 📂 e2e
┃ ┣---- 📜 Example.feature
┃
┣---- 📂 escenarios
┃ ┣---- 📂 autenticar_usuario
┃ ┃ ┣---- 📜 ESC017.feature
┃ ┃ ┣---- 📜 ESC018.feature
┃ ┃ ┣---- 📜 ESC019.feature
┃ ┃ ┣---- 📜 ESC020.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_miembro
┃ ┃ ┣---- 📜 ESC009.feature
┃ ┃ ┣---- 📜 ESC010.feature
┃ ┃ ┣---- 📜 ESC011.feature
┃ ┃ ┣---- 📜 ESC012.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_publicacion
┃ ┃ ┣---- 📜 ESC001.feature
┃ ┃ ┣---- 📜 ESC002.feature
┃ ┃ ┣---- 📜 ESC003.feature
┃ ┃ ┣---- 📜 ESC004.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_sitio
┃ ┃ ┣---- 📜 ESC013.feature
┃ ┃ ┣---- 📜 ESC014.feature
┃ ┃ ┣---- 📜 ESC015.feature
┃ ┃ ┣---- 📜 ESC016.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_tag
┃ ┃ ┣---- 📜 ESC005.feature
┃ ┃ ┣---- 📜 ESC006.feature
┃ ┃ ┣---- 📜 ESC007.feature
┃ ┃ ┣---- 📜 ESC008.feature
┃ ┃ ┗---- 📜 step.js
┃
┃
┣---- 📂 escenarios_base
┃ ┣---- 📂 autenticar_usuario
┃ ┃ ┣---- 📜 ESC019.feature
┃ ┃ ┣---- 📜 ESC020.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_miembro
┃ ┃ ┣---- 📜 ESC010.feature
┃ ┃ ┣---- 📜 ESC011.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_publicacion
┃ ┃ ┣---- 📜 ESC003.feature
┃ ┃ ┣---- 📜 ESC004.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_sitio
┃ ┃ ┣---- 📜 ESC000.feature
┃ ┃ ┗---- 📜 step.js
┃ ┣---- 📂 crear_tag
┃ ┃ ┣---- 📜 ESC007.feature
┃ ┃ ┣---- 📜 ESC008.feature
┃ ┃ ┗---- 📜 step.js
┃
┣---- 📂 page_object
┃ ┣---- 📜 NewMemberPage.js
┃ ┣---- 📜 SignInPage.js
┃
┣---- 📂 support
┃ ┣---- 📂 step_definition
┃ ┃ ┗---- 📜 steps.js
┃
┗---- 📜 cypressRunner.js
```


- **Example.feature**: Este archivo corresponde al *feature* que se ejecutará. Su contenido debe ser reemplazado antes de ejecutar cada prueba.
- **escenarios**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 4 archivos `.feature` (escenarios de prueba).
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **escenarios_base**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 2 archivos `.feature` (escenarios de prueba). Excepto en crear_sitio que es la configuracion para la versión base y solo es la configuracion inicial.
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **page_object**: Contiene la configuración para el patrón Page Object de las funcionalidades en las que fue aplicado.
- **support/step_definitions**: Contiene los archivos `step.js` que se ejecutan durante las pruebas.

### 4. Preparar el escenario de prueba
Para ejecutar un escenario de prueba, sigue estos pasos:

1. Escoge el escenario que deseas probar.
2. Copia el contenido del archivo `.feature` correspondiente al escenario.
3. Pega el contenido copiado en el archivo `Example.feature` ubicado en la carpeta e2e.
4. Copia el contenido del archivo `step.js` correspondiente al escenario (en la carpeta de la funcionalidad seleccionada) y pégalo en el archivo `step.js` dentro de la carpeta `support/step_definitions`.

Si desea ejecutar todas las pruebas puede ejecutar el comando ` npm test:all` o `node cypressRunner.js`, esto ejecutara los escenarios de prueba de la ruta e2e\misw-4103-cypress\cypress\escenarios, estos escenarios estan diseñados para la version 5.114.1, si desea ejecutar los escenarios de prueba de la ruta e2e\misw-4103-cypress\cypress\escenarios_base debera tener en ejecucion una instancia Ghost con la version 4.5. Para ambos escenarios es imperativo que el sitio no haya sido creado con el compando ` npm test:base` o `node cypressRunner.js escenarios_base`

Si prefiere se ha creado un action que puede ejecutar que se encarga de preparar y ejecutar los escenarios, y subir los resultados en el artifact. Solo esta disposnible para la ejecucion de los escenarios de la version 5.114.1.

### 5. Configurar las variables de entorno
Asegúrate de configurar las variables de entorno necesarias en el archivo `cypress.config.js`. Debes reemplazar los valores de URL donde se ejecuta GHOST, email y contraseña con los datos correctos para tus pruebas:

```js
URL: "http://localhost:3001/ghost/#",
EMAIL: "email@example.com",
PASSWORD: "password",
```

Si decide ejecutar el workflow se le pedira que ingrese el correo y la contraseña que se quiere utilizar para la prueba, debera ingresar un correo valido y una constraseña con una longitud de al menos 10 caracteres para que no tenga problemas. 

### 6. Ejecutar las pruebas
Una vez que hayas configurado las variables de entorno y preparado el escenario de prueba, puedes ejecutar las pruebas utilizando los siguientes comandos:

- **Ejecutar un escenario sin interfaz gráfica**:

```bash
npm run test
```

- **Ejecutar un escenario con interfaz gráfica**:

```bash
npm run test:ui
```

- **Ejecutar todos los escenarios sin interfaz gráfica**:

```bash
npm run test:all
```

- **Ejecutar workflow Run Cypress with Custom Runner**:
 no cambie la version de Ghost de la que aparece por defecto e ingrese correo electronico y contraseñas validos para la ejecucion.

### Estructura de Archivos

- _cypress/e2e/Example.feature: Escenario escrito en Gherkin.
- _cypress/support/step_definitions/step.js: Definición en JS que implementan los pasos.

###Configuración en _cypress.config.js_
```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

module.exports = defineConfig({
  projectId: "monkey-cypress.io.github.thesoftwaredesignlab",
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    reportFilename: `cypress-report-${timestamp}`,
    overwrite: false,
    json: true,
    charts: true, 
  },
  e2e: {
   // 1) Incluye todas las .feature
   specPattern: "cypress/e2e/**/*.feature",
   // 2) Haz async para await en el plugin de Cucumber
   async setupNodeEvents(on, config) {
     // a) Registro del plugin de Cucumber
     await addCucumberPreprocessorPlugin(on, config);
     // b) Registro de Esbuild con el plugin de Gherkin
     on(
       "file:preprocessor",
       createBundler({
         plugins: [createEsbuildPlugin(config)],
       })
     );
     return config;
   },
    baseUrl: "http://localhost:3001",
  },
  env: {
    URL: "http://localhost:3001/ghost/#",
    EMAIL: "email@example.com",
    PASSWORD: "password",
  },
  pageLoadTimeout: 120000,
  screenshotsFolder: "cypress/results/screenshots",
  videosFolder: "cypress/results/videos",
  video: true,
  videoCompression: 32,
});
```



