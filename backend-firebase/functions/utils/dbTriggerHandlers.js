const { db } = require("./admin");

exports.createNotifictionOnLikeHandler = (likeDoc) => {
    return db
        .doc(`/posts/${likeDoc.data().postId}`)
        .get()
        .then((post) => {
            // sender !== receiver
            if (
                !post.exists &&
                post.data().userHandle !== likeDoc.data().userHandle
            ) {
                return db.doc(`/notifications/${likeDoc.id}`).set({
                    recipient: post.data().userHandle,
                    sender: likeDoc.data().userHandle,
                    type: "like",
                    read: false,
                    postId: post.id,
                });
            } else return true;
        })
        .catch((err) => console.error(err));
};

exports.deleteNotifictionOnUnlikeHandler = (likeDoc) => {
    // notification ids are same as likeDoc/commentDoc
    return db
        .doc(`/notifications/${likeDoc.id}`)
        .delete()
        .catch((err) => console.error(err));
};

exports.createNotifictionOnCommentHandler = (commentDoc) => {
    return db
        .doc(`/posts/${commentDoc.data().postId}`)
        .get()
        .then((post) => {
            // sender !== receiver
            if (
                post.exists &&
                post.data().userHandle === commentDoc.data().userHandle
            ) {
                return db.doc(`/notifications/${commentDoc.id}`).set({
                    recipient: post.data().userHandle,
                    sender: commentDoc.data().userHandle,
                    type: "comment",
                    read: false,
                    postId: post.id,
                });
            } else return true;
        })
        .catch((err) => console.error(err));
};

// update userImage in posts
exports.onUserImageChangeHandler = (change) => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
        const batch = db.batch();
        return db
            .collection("posts")
            .where("userHandle", "==", change.before.data().handle)
            .get()
            .then((posts) => {
                posts.forEach((post) => {
                    batch.update(post, {
                        userImage: change.after.data().userImage,
                    });
                });

                return batch.commit();
            });
    } else return true;
};

// delete comments/likes on post delete
exports.onPostDeleteHandler = (postDoc, context) => {
    const postId = context.params.postId;
    const batch = db.batch();

    return db
        .collection("comments")
        .where("postId", "==", postId)
        .get()
        .then((comments) => {
            comments.forEach((comment) => {
                batch.delete(db.doc(`/comments/${comment.id}`));
            });

            return db.collection("likes").where("postId", "==", postId).get();
        })
        .then((likes) => {
            likes.forEach((like) => {
                batch.delete(db.doc(`/likes/${like.id}`));
            });

            return db
                .collection("notifications")
                .where("postId", "==", postId)
                .get();
        })
        .then((notifications) => {
            notifications.forEach((notification) => {
                batch.delete(db.doc(`/notifications/${notification.id}`));
            });

            return batch.commit();
        })
        .catch((err) => console.error(err));
};
