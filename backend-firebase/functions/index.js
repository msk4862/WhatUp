const functions = require("firebase-functions");
const app = require('express')();
const postRoute = require("./resources/posts/posts.routes");
const userRoute = require("./resources/users/users.routes");
const FBAuth = require("./utils/authMiddleware");
const { db } = require("./utils/admin");

// Routes
app.use("/posts", FBAuth,  postRoute);
app.use("/users", userRoute)

exports.api = functions.https.onRequest(app);


// Handling Notifications
// just storing notifications in db first
exports.createNotifictionOnLike = functions.firestore.document("likes/{id}")
    .onCreate((likeDoc) => {
        return db.doc(`/posts/${likeDoc.data().postId}`).get()
            .then(post => {
                if(!post.exists) {
                    return;
                }
                // sender == receiver
                else if (post.data().userHandle === likeDoc.data().userHandle) {
                    return;
                }
                else {
                    return db.doc(`/notification/${likeDoc.id}`).set({
                        recipient: post.data().userHandle,
                        sender: likeDoc.data().userHandle,
                        type: "like",
                        read: false,
                        postId: post.id,
                    })
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    });

exports.deleteNotifictionOnUnlike = functions.firestore.document("likes/{id}")
    .onDelete((likeDoc) => {
        // notification ids are same as likeDoc/commentDoc
        return db.doc(`/posts/${likeDoc.id}`).delete()
        .then(() => {
            return;
        })
        .catch(err => {
            console.error(err);
            return;
        })
            
    });


exports.createNotifictionOnComment = functions.firestore.document("comments/{id}")
    .onCreate((commentDoc) => {
        return db.doc(`/posts/${commentDoc.data().postId}`).get()
            .then(post => {
                if(!post.exists) {
                    return res.status(404).send({error: "Post doesn't exist!"});
                }
                else {
                    return db.doc(`/notification/${commentDoc.id}`).set({
                        recipient: post.data().userHandle,
                        sender: commentDoc.data().userHandle,
                        type: "comment",
                        read: false,
                        postId: post.id,
                    })
                }
            })
            .then(() => {
                return;
            })
            .catch(err => {
                console.error(err);
                return;
            })
    });