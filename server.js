"use strict";
require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const { errors } = require("celebrate");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
require("./src/db");
app.use(bodyParser.json({}));
global.appPath = __dirname;
global.routes = require("./src/middlewares/index");
global.io = "";
const apiRouter = require("./src/routes");
app.use("/api", apiRouter);
app.use(errors());
app.get("/", (req, res) => {
  res.json({ message: "Welcome test project" });
});

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4010;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
  require("./src/socket.io")(server);
});
exports.closeServer = function () {
  httpServer.close();
};


