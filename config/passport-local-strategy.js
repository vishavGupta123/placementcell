const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      User.findOne({ username: req.body.username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, function (err) {
          if (err) {
            req.flash("error", "Error in decipher the password using bcrypt");
            return done(err);
          }
          console.log("HEYY");
          return done(null, user);
        });
      });
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding the user");
      return done(err);
    }
    return done(null, user);
  });
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the users in sign in pass the request to the next function
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current sign in user from the session cookie we are just sending that in res.locals
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
