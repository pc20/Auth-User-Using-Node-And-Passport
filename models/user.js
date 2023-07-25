const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// define user schema
const userSchama = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// generate hash for the given passwrd
userSchama.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

// check hashvalue with the stored password
userSchama.statics.validPassword = function (password, user) {
    return bcrypt.compareSync(password, user);
};

const User = mongoose.model("User", userSchama);

module.exports = User;