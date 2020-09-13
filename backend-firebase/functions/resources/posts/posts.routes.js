const app = require("express");
const { getAllPosts, createPost, getOnePost, updateOnePost, deleteOnePost } = require("./posts.controllers");

const Router = app.Router();

Router
    .route("/")
    .get(getAllPosts)
    .post(createPost);

Router
    .route("/:postId")
    .get(getOnePost)
    .put(updateOnePost)
    .delete(deleteOnePost);

module.exports = Router;