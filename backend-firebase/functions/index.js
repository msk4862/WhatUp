const functions = require("firebase-functions");
const app = require('express')();
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

app.get("/posts", (req, res) => {
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
        res.status(200).send(posts);
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({Error: "Something went wrong!"});
    });

});


app.post("/posts", (req, res) => {

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
        res.status(201).json({message: `Post with id ${doc.id} is created successfully.`});
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({Error: "Something went wrong!"});
    });
    
});

// app.put("posts/:id", (req, res) => {
// });

exports.api = functions.https.onRequest(app);