const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const usersController = require('../controller/userController');

router.get('/profile', usersController.profile);
router.get("/sign-out", usersController.signOut);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/register', usersController.register);
router.post("/update/:id", passport.checkAuthentication, usersController.updatePass);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in?error=true' },
), usersController.createSession);


// for google account login, use passport oAuth2.0


// redirect to google login page
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// redirect back to create session once successfully login via google
router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
    usersController.createSession
);

module.exports = router;