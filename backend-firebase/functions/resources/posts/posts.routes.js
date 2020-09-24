const app = require("express");
const FBAuth = require("../../utils/authMiddleware");
const {
    getAllPosts,
    createOnePost,
    getOnePost,
    updateOnePost,
    deleteOnePost,
    commentOnPost,
    likeAPost,
    unlikeAPost,
} = require("./posts.controllers");

const Router = app.Router();

Router.route("/")
    .get(getAllPosts)
    .post(FBAuth, createOnePost);

Router.route("/:postId")
    .get(FBAuth, getOnePost)
    .put(FBAuth, updateOnePost)
    .delete(FBAuth, deleteOnePost);

Router.route("/:postId/comment").post(FBAuth, commentOnPost);

Router.route("/:postId/like").post(FBAuth, likeAPost);

Router.route("/:postId/unlike").post(FBAuth, unlikeAPost);

module.exports = Router;
