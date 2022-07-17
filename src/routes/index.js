const express = require("express");
const userRoutes = require("./api/user");
const itemRoutes = require("./api/item");

const util = require("../util");

const router = express.Router();
const app = express();
app.use("/", (req, res, next) => {
  req.data = {};

  return next();
});

router.use("/user", userRoutes);
router.use("/user", itemRoutes);



const swaggerJSDoc = require('swagger-jsdoc');
const fs = require("fs");

fs.readdirSync(appPath + '/src/models/').forEach(function (file) {
  require(appPath + '/src/models/' + file);
});

const swaggerDefinition = {
  info: {
    title: 'CSM API Explorer',
    version: '1.0.0',
    description: 'Available REST Endpoints of CSM RESTful API'
  },
  host: `${process.env.HOST}:${process.env.HTTP_PORT}/api`,
  basePath: '/',
  securityDefinitions: {
    JWT: {
      description: '',
      type: 'apiKey',
      name: 'authentication',
      in: 'header'
    }
  }
}
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['src/routes/api/*.js', 'src/models/*.js']
}

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options)
/**
* @swagger
* responses:
*   Unauthorized:
*     description: Unauthorized
*   BadRequest:
*     description: BadRequest / Invalid Input
*/

/**
* @swagger
* /:
*   get:
*     tags:
*       - Status
*     description: Returns API status
*     produces:
*       - application/json
*     responses:
*       200:
*         description: API Status
*/
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.get("/", (req, res) => res.json("Welcome to CSM APIs."));
router.get('/swagger.json', (req, res) => {
  res.status(200).json(swaggerSpec)
})
router.use(function (req, res, next) {
  res.status(400).send({
    statusCode: routes.ERRORCODE,
    url: req.originalUrl,
    error: "Bad Request url is not found!",
  });
});

module.exports = router;
