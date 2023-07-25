const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

// for loading inital page if authenticated then profile page otherwise login page
router.get("/", passport.checkAuthentication, function (req, res) {
    return res.redirect('/users/profile');
});

//  for all req having users
router.use('/users', require('./users'));

module.exports = router;