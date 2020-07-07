const passport = require("passport");
LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy (
    (username, password, done) => {
        db.User.findOne({
            where: {
                username: username
            }
        }).then(dbUser => {
            if (!dbUser) {
                return done (null, false, {message: "Incorrect Usrname"});
        } else if (!dbUser.validPassword(password)) {
            return done(null, false, {message: "Incorrect Password"});
        }
        return done(null, dbUser)
        });
    }
));

//serialize/de to keep authentication consistent
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

//export
module.exports = passport;