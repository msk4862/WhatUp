const functions = require("firebase-functions");
const app = require('express')();
const admin = require("firebase-admin");
const firebase = require("firebase");
// const firebaseConfig = require("./firebaseConfig");

const firebaseConfig = {
    apiKey: "AIzaSyBaiVMeH_TFWaM_ijDosdgofyHZKBblLmA",
    authDomain: "what-up-bde10.firebaseapp.com",
    databaseURL: "https://what-up-bde10.firebaseio.com",
    projectId: "what-up-bde10",
    storageBucket: "what-up-bde10.appspot.com",
    messagingSenderId: "293432711466",
    appId: "1:293432711466:web:fa05a45bc4a174a39da653",
    measurementId: "G-Q6RL99JKEX"
};

firebase.initializeApp(firebaseConfig);
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
        return res.status(200).send(posts);
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({error: err.toString()});
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
        return res.status(201).send({message: `Post with id ${doc.id} is created successfully.`});
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({error: err.toString()});
    });
    
});

// app.put("posts/:id", (req, res) => {
// });

app.post("/signup", (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,        
    }
    // TODO: validate data

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists) {
                return res.status(400).send({handle: "Handle is already taken!"});
            }
            else {
                return firebase
                            .auth()
                            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then(idToken =>{
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
            }

            return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).send({token});
        })
        .catch(err => {
            console.log(err);
            if(err.code === "auth/email-already-in-use") {
                return res.status(500).send({email: "Email already in use!"});
            }
            return res.status(500).send({error: err.toString()});
        })

});



exports.api = functions.https.onRequest(app);