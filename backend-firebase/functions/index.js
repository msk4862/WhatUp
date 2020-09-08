const functions = require("firebase-functions");
const app = require('express')();
const postRoute = require("./resources/posts/posts.routes");
const authRoute = require("./resources/auth/auth.routes");

// Routes
app.use("/posts", postRoute);
app.use("/auth", authRoute)

exports.api = functions.https.onRequest(app);