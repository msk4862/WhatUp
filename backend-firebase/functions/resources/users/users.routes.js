const app = require("express");
const FBAuth = require("../../utils/authMiddleware");
const { signup, login, uploadImage, addUserDetails } = require("./users.controllers");

const Router = app.Router();

// auth routes
Router
    .post("/signup", signup)
    .post("/login", login)
    .post("/upload", FBAuth, uploadImage)

Router
    .route("/")
    .post(FBAuth, addUserDetails);

module.exports = Router;