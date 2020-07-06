const passport = require("passport");
LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy (
    (username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if(err) {
                return done (err);
            };
            if (!user) {
                return done (null, false, {message: "Incorrect Usrname"});
            };
            if (!user.validPassword(password)) {
                return done(null, false, {message: "Incorrect Password"})
            }
            return done (null, user);
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