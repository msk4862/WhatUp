const app = require("express");
const { signup, login } = require("./auth.controllers");

const Router = app.Router();

Router
    .post("/signup", signup)
    .post("/login", login);

module.exports = Router;