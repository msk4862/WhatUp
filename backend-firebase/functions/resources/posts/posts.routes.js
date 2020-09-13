const app = require("express");
const { 
    getAllPosts, 
    createPost, 
    getOnePost, 
    updateOnePost, 
    deleteOnePost, 
    commentOnPost, 
    likeAPost,
    unlikeAPost,
} = require("./posts.controllers");

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

Router
    .route("/:postId/comment")
    .post(commentOnPost)
    
Router
    .route("/:postId/like")
    .post(likeAPost);

Router
    .route("/:postId/unlike")    
    .post(unlikeAPost);

module.exports = Router;