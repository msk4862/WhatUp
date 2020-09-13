const { db } = require("../../utils/admin");

exports.getAllPosts = (req, res) => {

    db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
        let posts = [];
        data.forEach(doc => {
            posts.push({
                postId: doc.id,
                userHandle: doc.data().userHandle,
                bodyMeta: doc.data().bodyMeta,
                body: doc.data().body,
                createdAt: doc.data().createdAt,
            });
        })
        return res.status(200).send(posts);
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({error: err.toString()});
    });
}


exports.createPost = (req, res) => {

    const data = req.body;
    const newPost = {
        userHandle: req.user.handle,
        bodyMeta: data.bodyMeta,
        body: data.body,
        createdAt: new Date().toISOString(),
    }

    db.collection("posts")
    .add(newPost)
    .then(doc => {
        return res.status(201).send({message: `Post with id ${doc.id} is created successfully.`});
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({error: err.toString()});
    });
    
}

// get one post
exports.getOnePost = (req, res) => {
 
    let postData = {}
    db.doc(`/posts/${req.params.postId}`).get()
        .then(doc => {
            if(!doc.exists) {
                return res.status(404).send({error: "Post not found!"});
            }

            postData = doc.data();
            postData.id = doc.id;
            return db.collection("comments").where("postId", "==", postData.id).get();
        })
        .then(data => {
            postData.comments = [];
            data.forEach(doc => {
                postData.comments.push(doc.data());
            });

            return res.status(200).send(postData);
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send({error: err.toString()});
        });
}

// update a post
exports.updateOnePost = (req, res) => {
    const data = req.body;
    const updatedPost = {
        bodyMeta: data.bodyMeta,
        body: data.body,
    }

    db.doc(`/posts/${req.params.postId}`).update(updatedPost)
        .then(() => {
            return res.status(200).send({message:"Post updated successfully!"});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send({error: err.toString()});
        });
}

// delete a post
exports.deleteOnePost = (req, res) => {

    db.doc(`/posts/${req.params.postId}`).delete()
        .then(() => {
            return res.status(200).send({message:"Post deleted successfully!"});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send({error: err.toString()});
        });
}

