const app = require("express");
const { getAllPosts, createPost, getOnePost } = require("./posts.controllers");

const Router = app.Router();

Router
    .route("/")
    .get(getAllPosts)
    .post(createPost);

Router
    .route("/:id")
    .get(getOnePost)
    .put()
    .delete();
module.exports = Router;