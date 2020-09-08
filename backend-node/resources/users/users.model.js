const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true,
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
        },
        userHandle: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true,
        },
    }
)

const User = mongoose.model("user", userSchema);
module.exports = User;