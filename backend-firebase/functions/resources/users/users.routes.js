const app = require("express");
const FBAuth = require("../../utils/authMiddleware");
const { signup, login, uploadImage, addUserDetails, getUserDeatils } = require("./users.controllers");

const Router = app.Router();

// auth routes
Router
    .post("/signup", signup)
    .post("/login", login)
    .post("/upload", FBAuth, uploadImage)

Router
    .route("/")
    .post(FBAuth, addUserDetails)
    .get(FBAuth, getUserDeatils)

module.exports = Router;