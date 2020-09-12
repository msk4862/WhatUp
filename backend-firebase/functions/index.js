const functions = require("firebase-functions");
const app = require('express')();
const postRoute = require("./resources/posts/posts.routes");
const userRoute = require("./resources/users/users.routes");
const FBAuth = require("./utils/authMiddleware");

// Routes
app.use("/posts", FBAuth,  postRoute);
app.use("/users", userRoute)

exports.api = functions.https.onRequest(app);