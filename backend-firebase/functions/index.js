const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
const postRoute = require("./resources/posts/posts.routes");
const userRoute = require("./resources/users/users.routes");
const {
    createNotifictionOnLikeHandler,
    deleteNotifictionOnUnlikeHandler,
    createNotifictionOnCommentHandler,
    onUserImageChangeHandler,
    onPostDeleteHandler,
} = require("./utils/dbTriggerHandlers");

// Middlewares
app.use(cors());

// Routes
app.use("/users", userRoute);
app.use("/posts", postRoute);

exports.api = functions.https.onRequest(app);

// Handling DB Triggers
// just storing notifications in db
exports.createNotifictionOnLike = functions.firestore
    .document("likes/{id}")
    .onCreate(createNotifictionOnLikeHandler);
exports.deleteNotifictionOnUnlike = functions.firestore
    .document("likes/{id}")
    .onDelete(deleteNotifictionOnUnlikeHandler);
exports.createNotifictionOnComment = functions.firestore
    .document("comments/{id}")
    .onCreate(createNotifictionOnCommentHandler);

// update userImage in posts
exports.onUserImageChange = functions.firestore
    .document("users/{userId}")
    .onUpdate(onUserImageChangeHandler);
// delete comments/likes on post delete
exports.onPostDelete = functions.firestore
    .document("posts/{postId}")
    .onDelete(onPostDeleteHandler);
