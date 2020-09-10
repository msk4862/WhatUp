const app = require("express");
const { signup, login } = require("./users.controllers");
const FBAuth = require("../../utils/AuthMiddleware");

const Router = app.Router();

Router
    .post("/signup", signup)
    .post("/login", login)
    .post("/upload", FBAuth, )

module.exports = Router;