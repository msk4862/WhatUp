const functions = require("firebase-functions");
const app = require('express')();
const postRoute = require("./resources/posts/posts.routes");
const authRoute = require("./resources/auth/auth.routes");
const { admin, db } = require("./utils/admin");

// firebase request authentication middleware
const FBAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split(" ")[1];
    }
    else {
        console.error("No token found!");
        return res.status(403).send({error: "Unauthorized!"})
    }

    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            req.user = decodedToken;
            return db.collection("users")
                .where("userId", "==", req.user.uid)
                .limit(1)
                .get()
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error(err);
            return res.status(403).send({error: err.toString()});
        })
}

// Routes
app.use("/posts", FBAuth,  postRoute);
app.use("/auth", authRoute)

exports.api = functions.https.onRequest(app);