const { db } = require("../../utils/admin");
const firebase = require("firebase");
const config = require("../../utils/config");

firebase.initializeApp(config);

exports.signup = (req, res) => {
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

}