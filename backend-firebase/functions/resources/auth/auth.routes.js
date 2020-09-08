const app = require("express");
const { signup } = require("./auth.controllers");

const Router = app.Router();

Router
    .post("/signup", signup)


module.exports = Router;