// set the flash msg to object which we pass it to ejs file for rendering
module.exports.setMsg = function (req, res, next) {
    res.locals.flash = {
        success: req.flash("success"),
        error: req.flash("error"),
    };
    next();
};