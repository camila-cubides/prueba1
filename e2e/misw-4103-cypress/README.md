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

---

## Ejecución de Pruebas

Para ejecutar las pruebas de Cypress en este proyecto, sigue los siguientes pasos:

### 1. Instalar los módulos necesarios
Primero, instala los módulos ejecutando desde la raiz del proyecto *202512-proyecto-equipo-6* el siguiente comando en la terminal:
```bash
npm install --prefix ./e2e/misw-4103-cypress
```

### 2. Navegar al directorio de Cypress
Una vez instalados los módulos, navega al directorio `./e2e/misw-4103-cypress`:

```bash
cd ./e2e/misw-4103-cypress
```
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
┣---- 📂 page_object
┃ ┣---- 📜 NewMemberPage.js
┃ ┣---- 📜 SignInPage.js
┃
┣---- 📂 support
┃ ┣---- 📂 step_definition
┃ ┃ ┗---- 📜 steps.js
┃
```


- **Example.feature**: Este archivo corresponde al *feature* que se ejecutará. Su contenido debe ser reemplazado antes de ejecutar cada prueba.
- **escenarios**: Contiene 5 subcarpetas, cada una correspondiente a una funcionalidad del sistema. Dentro de cada subcarpeta encontrarás:
  - 4 archivos `.feature` (escenarios de prueba).
  - Un archivo `step.js` con los pasos asociados a esa funcionalidad.
- **page_object**: Contiene la configuración para el patrón Page Object de las funcionalidades en las que fue aplicado.
- **support/step_definitions**: Contiene los archivos `step.js` que se ejecutan durante las pruebas.

### 4. Preparar el escenario de prueba
Para ejecutar un escenario de prueba, sigue estos pasos:

1. Escoge el escenario que deseas probar.
2. Copia el contenido del archivo `.feature` correspondiente al escenario.
3. Pega el contenido copiado en el archivo `Example.feature` ubicado en la carpeta e2e.
4. Copia el contenido del archivo `step.js` correspondiente al escenario (en la carpeta de la funcionalidad seleccionada) y pégalo en el archivo `step.js` dentro de la carpeta `support/step_definitions`.

### 5. Configurar las variables de entorno
Asegúrate de configurar las variables de entorno necesarias en el archivo `cypress.config.js`. Debes reemplazar los valores de URL donde se ejecuta GHOST, email y contraseña con los datos correctos para tus pruebas:

```js
URL: "http://localhost:3001/ghost/#",
EMAIL: "email@example.com",
PASSWORD: "password",
SITE_TITLE: "Example Test site E2E",
FULL_NAME: "Example Name"
```

### 6. Ejecutar las pruebas
Una vez que hayas configurado las variables de entorno y preparado el escenario de prueba, puedes ejecutar las pruebas utilizando los siguientes comandos:

- **Ejecutar sin interfaz gráfica**:

```bash
npm run test
```

- **Ejecutar con interfaz gráfica**:

```bash
npm run test:ui
```

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
    reportFilename: `monkey-report-${timestamp}`,
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
    SITE_TITLE: "Example Test site E2E",
    FULL_NAME: "Example Name",
    seed: 0xf1ae533d,
    delay: 1000,
    actions: {
      click: 10,
      scroll: 5,
      keypress: 10,
      viewport: 2,
      navigation: 4,

      smartClick: 5,
      smartCleanup: 2,
      smartInput: 5,
    },
  },
  pageLoadTimeout: 120000,
  screenshotsFolder: "cypress/results/screenshots",
  videosFolder: "cypress/results/videos",
  video: true,
  videoCompression: 32,
});
```



