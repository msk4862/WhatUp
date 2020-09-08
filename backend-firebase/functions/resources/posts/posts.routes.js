const app = require("express");
const { getAllPosts, createPost } = require("./posts.controllers");

const Router = app.Router();

Router
    .route("/")
    .get(getAllPosts)
    .post(createPost);

Router
    .route("/:id")
    .get()
    .put()
    .delete();
module.exports = Router;