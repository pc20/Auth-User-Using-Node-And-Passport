const passport = require('passport');
const User = require('../models/user');
const crypto = require("crypto");
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: "316984738561-9kvb7puaef2mne6frdaoupcgl82vl3it.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {

        User.findOne({ email: profile.emails[0].value })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: User.generateHash("abcd123"),
                    }).then((user) => {
                        req.flash('success', "User registered");
                        return done(null, user, { message: `User registered and your new password is abcd123 .Please update it` });
                    }).catch((err) => {
                        console.log("Error in creating user google statgy", err);
                        return;
                    });
                }
            }).catch((err) => {
                console.log("Error in google stratgy", err);
            });
    }));

module.exports = passport;