const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dummyPassword = "abcd123";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {

        User.findOne({ email: profile.emails[0].value })
            .then((user) => {
                if (user) {
                    // check if user exist 
                    return done(null, user);
                } else {
                    // if user don't exist create one with dummy Password
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: User.generateHash(dummyPassword),
                    }).then((user) => {
                        // send dummyPassword as flash message to users
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