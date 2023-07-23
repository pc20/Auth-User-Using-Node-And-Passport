const User = require("../models/user");

module.exports.profile = async function (req, res) {
    try {
        let user = await User.findById(req.user.id);
        if (user) {
            return res.render('profile', {
                id: req.user.id,
                currUser: user
            })
        } else {
            console.log("User not found");
            return res.redirect("/users/sign-in");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/users/sign-in");
    }
}

module.exports.register = async function (req, res) {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: User.generateHash(req.body.password),
        });
        if (user) {
            req.flash("success", "User registered");
            return res.redirect("/users/sign-in");
        } else {
            console.log("There is an error in creating the user");
            return res.redirect("/users/sign-up");
        }
    }
}

module.exports.updatePass = async function (req, res) {
    const reCheckOldPass = User.validPassword(req.body.old, req.user.password);
    if (!reCheckOldPass) {
        console.log("old password is wrong");
        req.flash("error", "Your old Password is wrong");
        res.redirect("back");
    } else {
        let newPass = User.generateHash(req.body.new);
        const user = User.findByIdAndUpdate(req.user._id, { password: newPass, });
        if (user) {
            console.log("password is updated");
            await req.flash("success", "Your Password is updated");
        } else {
            console.log("User not found");
        }
        return res.redirect("back");
    }
}

module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("success", "You have logged out");
        res.redirect('/users/sign-in');
    });
};

module.exports.signIn = function (req, res) {
    return res.render('login', {
        error: req.query.error,
    });
};

module.exports.signUp = function (req, res) {
    return res.render('signUp')
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash("success", req.authInfo.message);
    return res.redirect('/');
}