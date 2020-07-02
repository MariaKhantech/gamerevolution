module.exports = (req, res, next) => {
    //request to next page if user logs in
    if (req.user) {
        return next();
    }
    //if user not logged in - redirect to login
    return res.redirect("/");
}