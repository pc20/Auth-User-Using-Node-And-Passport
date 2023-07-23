const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

router.get("/", passport.checkAuthentication, function (req, res) {
    return res.redirect('/users/profile');
});
router.use('/users', require('./users'));

module.exports = router;