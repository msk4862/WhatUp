const app = require("express");
const FBAuth = require("../../utils/authMiddleware");
const { 
    signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUserDetails,
    getUserDetails,
    markNotificationRead,
} = require("./users.controllers");

const Router = app.Router();

// auth routes
Router
    .post("/signup", signup)
    .post("/login", login)
    .post("/upload", FBAuth, uploadImage)

// current logged in user details
Router
    .route("/")
    .post(FBAuth, addUserDetails)
    .get(FBAuth, getAuthenticatedUserDetails)

Router
    .get("/:handle", getUserDetails);

Router
    .post("/notification", markNotificationRead);

module.exports = Router;