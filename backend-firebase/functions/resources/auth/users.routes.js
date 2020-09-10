const app = require("express");
const FBAuth = require("../../utils/AuthMiddleware");
const { signup, login, uploadImage } = require("./users.controllers");

const Router = app.Router();

Router
    .post("/signup", signup)
    .post("/login", login)
    .post("/upload", FBAuth, uploadImage)

module.exports = Router;