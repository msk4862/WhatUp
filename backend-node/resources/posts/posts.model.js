const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 50,
            trim: true,
            required: true, 
        },
        bodyMeta: {
            type: String,
            maxlength: 500,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
            required: true,
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;