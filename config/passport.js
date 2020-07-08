const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models")

passport.use(new LocalStrategy (
    {
        email: "email"
    },
    (email, password, done) => {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(dbUser => {
            if (!dbUser) {
                return done(null, false, {message: "Incorrect Email"});
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