const logger = require("../config/winston.config");
const swaggerJSDoc = require("swagger-jsdoc");
const config = require("config");
const swaggerUi = require("swagger-ui-express");
const swStats = require("swagger-stats");

/**
 * Inicializa as rotas das documentações geradas para o sistema
 * @param {Object} swaggerSpec Objeto gerado para criar a documentação do swagger
 * @param {Application} app aplicação do sistema
 */
const initRoutesOfDocumentation = (swaggerSpec, app) => {
   app.use(`${config.get("swagger.route")}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
   app.use(swStats.getMiddleware({ swaggerSpec }));
};

/**
 * Configura o swagger para gerar a documentação
 * da API
 * @param {Application} app express app
 */
module.exports = (app) => {
   logger.info("Inicializando a documentação da API SWAGGER");

   const swaggerDefinition = {
      info: {
         title: "Documentation of Stock History API",
         version: "1.0.1",
         description: `Documentation.`
        //  description: `Documentation.\n API ${config.get("server.url")}/swagger-stats/ui`
      },
      host: `${config.get("server.url")}`,
      basePath: "/api",
      securityDefinitions: {
         Bearer: {
            type: "apiKey",
            description: "Bearer authorization of an API",
            name: "Authorization",
            in: "header",
         },
      },
   };

   // options for the swagger docs
   const options = {
      // import swaggerDefinitions
      swaggerDefinition,
      // path to the API docs
      apis: ["./**/*.routing.js"],
   };

   // initialize swagger-jsdoc
   const swaggerSpec = swaggerJSDoc(options);
   initRoutesOfDocumentation(swaggerSpec, app);
};
