const { admin, db } = require("../../utils/admin");
const firebase = require("firebase");
const config = require("../../utils/config");
const { validateSignupData } = require("../../utils/dataValidators");

firebase.initializeApp(config);

// signup handler
exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    // data validations
    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).send(errors);

    let token, userId;
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res
                    .status(400)
                    .send({ handle: "Handle is already taken!" });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        newUser.email,
                        newUser.password
                    );
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newUser.handle,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId,
                imageUrl: `https://firebasestorage.googleapis.com/v0/v/${config.storageBucket}/o/noimage.png?alt=media`,
            };

            return db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).send({ token });
        })
        .catch((err) => {
            console.log(err);
            if (err.code === "auth/email-already-in-use") {
                return res.status(500).send({ email: "Email already in use!" });
            }
            return res.status(500).send({ error: err.toString() });
        });
};

// login handler
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.status(200).send({ token });
        })
        .catch((err) => {
            console.error(err);
            if (
                err.code === "auth/wrong-password" ||
                err.code === "auth/user-not-found"
            )
                return res
                    .status(404)
                    .send({ credential: "Incorrect credentials!" });
            return res.status(500).send({ error: err.toString() });
        });
};

// uplaod image handler
exports.uploadImage = (req, res) => {
    // parsing form data using busboy
    const Busboy = require("busboy");
    const os = require("os");
    const fs = require("fs");
    const path = require("path");

    const busboy = new Busboy({ headers: req.headers });
    let imageToBeUploaded, imageFileName;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
        if (
            mimetype !== "image/jpg" &&
            mimetype !== "image/jpeg" &&
            mimetype !== "image/png"
        ) {
            return res.status(400).send({ error: "Inavlid file type!" });
        }
        // creating custom image filename
        const imageFileExt = filename.split(".")[
            filename.split(".").length - 1
        ];
        imageFileName = `${Math.round(
            Math.random() * 1000000000
        )}.${imageFileExt}`;

        const filePath = path.join(os.tmpdir(), imageFileName);

        imageToBeUploaded = { filePath, mimetype };
        file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on("finish", () => {
        console.log("Done parsing form!");
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filePath, {
                resumable: false,
                metadata: {
                    contentType: imageToBeUploaded.mimetype,
                },
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
            })
            .then(() => {
                return res
                    .status(200)
                    .send({ message: "Image uploaded successfully!" });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send({ error: err.toString() });
            });
    });
    busboy.end(req.rawBody);
};

// add user profile data handler
exports.addUserDetails = (req, res) => {
    const data = req.body;

    const userDetails = {
        bio: data.bio,
        website: data.website,
        location: data.location,
    };

    db.doc(`/users/${req.user.handle}`)
        .update(userDetails)
        .then(() => {
            return res
                .status(200)
                .send({ message: "Details added successfully!" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// get authenticated user details
exports.getAuthenticatedUserDetails = (req, res) => {
    let userData = {};

    db.doc(`users/${req.user.handle}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).send({ error: "User not found!" });
            }
            userData.credentials = doc.data();
            return db
                .collection("likes")
                .where("userHandle", "==", req.user.handle)
                .get();
        })
        .then((data) => {
            userData.likes = [];
            data.forEach((doc) => {
                userData.likes.push(doc.data());
            });

            return db
                .collection("notifications")
                .where("userHandle", "==", req.user.handle)
                .get();
        })
        .then(data => {
            userData.notifications = [];
            data.forEach(doc => {
                userData.notifications.push(doc.data());
            });

            return res.status(200).send(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// get any user's details based on handle
exports.getUserDetails = (req, res) => {
    let userData = {};

    db.doc(`users/${req.params.handle}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).send({ error: "User not found!" });
            }
            userData.user = doc.data();
            return db
                .collection("posts")
                .orderBy("createdAt", "desc")
                .where("userHandle", "==", req.params.handle)
                .get();
        })
        .then((data) => {
            userData.posts = [];
            data.forEach((post) => {
                userData.posts.push({
                    postId: post.id,
                    bodyMeta: post.data().bodyMeta,
                    createdAt: post.data().createdAt,
                    userHandle: post.data().userHandle,
                    imageUrl: post.data().userImage,
                    likeCount: post.data().likeCount,
                    commentCount: post.data().commentCount,
                });
            });
            return res.status(200).send(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};

// update notifications as read
exports.markNotificationRead = (req, res) => {
    const batch = db.batch();
    req.body.forEach((noticationId) => {
        const notification = db.doc(`/notification/${noticationId}`);
        batch.update(notification, { read: true });
    });

    batch
        .commit()
        .then(() => {
            return res
                .status(200)
                .send({ message: "Notifications marked read!" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).send({ error: err.toString() });
        });
};
