const { db } = require("../../utils/admin");
const firebase = require("firebase");
const config = require("../../utils/config");

firebase.initializeApp(config);

const isEmpty = (string) => {
    if(string.trim() === "") return true;
    return false;
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(email.match(emailRegEx)) return true;
    return false;
}

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,        
    }
    
    // data validations
    let errors = {};
    if(isEmpty(newUser.email)) errors.email = "Must not be empty!";
    else if(!isEmail(newUser.email)) errors.email = "Must be valid!";

    if(isEmpty(newUser.password)) errors.password = "Must not be empty!";
    else if(newUser.password !== newUser.confirmPassword) errors.password = "Passwords must match!";

    if(isEmpty(newUser.email)) errors.handle = "Must not be empty!";

    if(Object.keys(errors).length > 0) return res.status(400).send(errors);


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