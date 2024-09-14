const swaggerJsDoc = require("swagger-jsdoc");
const swaggerLocalURL = process.env.SWAGGER_URI;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Take-Home-API",
      version: "1.0.0",
      description: "Take-Home API Documentation",
    },
    servers: [
      {
        url: swaggerLocalURL,
        description: "Local Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = swaggerSpecs;
