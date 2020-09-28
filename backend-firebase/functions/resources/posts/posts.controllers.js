const { db } = require("../../utils/admin");

exports.getAllPosts = (req, res) => {
    db.collection("posts")
        .orderBy("createdAt", "desc")
        .get()
        .then((data) => {
            let posts = [];
            data.forEach((doc) => {
                posts.push({
                    postId: doc.id,
                    title: doc.data().title,
                    bodyMeta: doc.data().bodyMeta,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                });
            });
            return res.status(200).send(posts);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ error: err.toString() });
        });
};

exports.createOnePost = (req, res) => {
    const data = req.body;
    const newPost = {
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        title: data.title,
        bodyMeta: data.bodyMeta,
        body: data.body,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
    };

    db.collection("posts")
        .add(newPost)
        .then((doc) => {
            const resPost = newPost;
            resPost.postId = doc.id;
            return res.status(201).send(resPost);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// get one post
exports.getOnePost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).send({ error: "Post not found!" });
            }

            postData = doc.data();
            postData.postId = doc.id;
            return db
                .collection("comments")
                .orderBy("createdAt", "desc")
                .where("postId", "==", postData.postId)
                .get();
        })
        .then((data) => {
            postData.comments = [];
            data.forEach((doc) => {
                postData.comments.push(doc.data());
            });

            return res.status(200).send(postData);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// update a post
exports.updateOnePost = (req, res) => {
    const data = req.body;
    const updatedPost = {
        title: data.title,
        bodyMeta: data.bodyMeta,
        body: data.body,
    };

    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).send({ error: "Unauthorized!" });
            } else {
                return doc.ref.update(updatedPost);
            }
        })
        .then(() => {
            return res
                .status(200)
                .send({ message: "Post updated successfully!" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// delete a post
exports.deleteOnePost = (req, res) => {
    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).send({ error: "Unauthorized!" });
            } else {
                return doc.ref.delete();
            }
        })
        .then(() => {
            return res
                .status(200)
                .send({ message: "Post deleted successfully!" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// comment on post
exports.commentOnPost = (req, res) => {
    const commentData = {
        body: req.body.body,
        postId: req.params.postId,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
    };

    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).send({ error: "Post doesn't exist!" });
            }

            return doc.ref.update({
                commentCount: doc.data().commentCount + 1,
            });
        })
        .then(() => {
            return db.collection("comments").add(commentData);
        })
        .then(() => {
            return res.status(201).send(commentData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// like a post
exports.likeAPost = (req, res) => {
    const likeData = {
        userHandle: req.user.handle,
        postId: req.params.postId,
    };

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData;

    postDoc
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).send({ error: "Post doesn't exist!" });
            }

            postData = {
                postId: doc.id,
                title: doc.data().title,
                bodyMeta: doc.data().bodyMeta,
                body: doc.data().body,
                createdAt: doc.data().createdAt,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount,
                userHandle: doc.data().userHandle,
                userImage: doc.data().userImage,
            };
            return db.collection("likes").add(likeData);
        })
        .then(() => {
            postData.likeCount++;
            return postDoc.update({ likeCount: postData.likeCount });
        })
        .then(() => {
            return res.status(200).send(postData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// unlike a post
exports.unlikeAPost = (req, res) => {
    const likeDoc = db
        .collection("likes")
        .where("userHandle", "==", req.user.handle)
        .where("postId", "==", req.params.postId)
        .limit(1);

    const postDoc = db.doc(`/posts/${req.params.postId}`);
    let postData;

    postDoc
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).send({ error: "Post doesn't exist!" });
            }
            postData = {
                postId: doc.id,
                title: doc.data().title,
                bodyMeta: doc.data().bodyMeta,
                body: doc.data().body,
                createdAt: doc.data().createdAt,
                likeCount: doc.data().likeCount,
                commentCount: doc.data().commentCount,
                userHandle: doc.data().userHandle,
                userImage: doc.data().userImage,
            };
            return likeDoc.get();
        })
        .then((data) => {
            if (data.empty) {
                return res.status(404).send({ error: "Like  not found!" });
            }
            // deleting like from collection
            return db.doc(`/likes/${data.docs[0].id}`).delete();
        })
        .then(() => {
            if (postData.likeCount > 0) postData.likeCount--;
            return postDoc.update({ likeCount: postData.likeCount });
        })
        .then(() => {
            return res.status(200).send(postData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};
