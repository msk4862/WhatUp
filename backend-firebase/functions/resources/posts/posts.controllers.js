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
        userHandle: data.userHandle,
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

exports.getOnePost = (req, res) => {
    const id = req.query.param;
}