const { admin, db } = require("../../utils/admin");
const firebase = require("firebase");
const config = require("../../utils/config");
const { user } = require("firebase-functions/lib/providers/auth");

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
                imageUrl: `https://firebasestorage.googleapis.com/v0/v/${config.storageBucket}/o/noimage.png?alt=media`,

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


exports.uploadImage = (req, res) => {

    // parsing form data using busboy
    const Busboy = require("busboy");
    const os = require("os");
    const fs = require("fs");
    const path = require("path");

    const busboy = new Busboy({ headers: req.headers });
    let imageToBeUploaded, imageFileName;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        
        // creating custom image filename
        const imageFileExt = filename.split(".")[filename.split(".").length-1];
        imageFileName = `${Math.round(Math.random()*1000000000)}.${imageFileExt}`;
        
        const filePath = path.join(os.tmpdir(), imageFileName);

        imageToBeUploaded = { filePath, mimetype };
        file.pipe(fs.createWriteStream(filePath));

    });

    busboy.on("finish", () => {
        console.log('Done parsing form!');
        admin.storage().bucket().upload(imageToBeUploaded.filePath, {
            resumable: false,
            metadata: {
                contentType: imageToBeUploaded.mimetype
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/users/${req.user.handle}`).update({imageUrl});
        })
        .then(() => {
            return res.status(200).send({message:"Image uploaded succsfully!"});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send({error: err.toString()});
        })
    });
    busboy.end(req.rawBody);
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.status(200).send({token});
        })
        .catch(err => {
            console.error(err);
            if(err.code === "auth/wrong-password") res.status(403).send({credential: "Incorrect credentials!"})
            return res.status(500).send({error: err.toString()});
        })
}