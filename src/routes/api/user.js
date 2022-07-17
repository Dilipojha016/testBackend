const express = require("express");

const app = express();
const userController = require("../../controllers/user");
const auth = require("../../middlewares/auth");
const { Joi, celebrate, errors } = require("celebrate");
const validation = require("../../validation");
const registration = Joi.object(validation.reg).required();
const login = Joi.object(validation.login).required();
const router = express.Router();

router.post("/login", celebrate({ body: login }), userController.login);
/**
  * @swagger
  * /user/login:
  *   post:
  *     tags:
  *       - User
  *     description: Customer Login
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: User Credentials
  *         in: body
  *         required: true
  *         type: string
  *         schema:
  *           $ref: '#/definitions/login'
  *     responses:
  *       200:
  *         description: Successfully Login
  *       
  */

router.put("/logout", auth.checkUserSession, userController.logout);
/**
  * @swagger
  * /user/logout:
  *   put:
  *     tags:
  *       - User
  *     description: User Logout
  *     produces:
  *       - application/json
  *     security:
  *       - JWT: []
  *     responses:
  *       200:
  *         description: Logout successfull!
  *       
  */



router.post("/signup", celebrate({ body: registration }), userController.create);
/**
  * @swagger
  * /user/signup:
  *   post:
  *     tags:
  *       - User
  *     description: Customer Registration
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         description: User Credentials
  *         in: body
  *         required: true
  *         type: string
  *         schema:
  *           $ref: '#/definitions/create-user-registration'
  *     responses:
  *       200:
  *         description: Successfully
  *       
  */

app.use(errors());
module.exports = router;
