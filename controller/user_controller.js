const User = require("../model/user");
const bcrypt = require("bcrypt");
module.exports.signUpPage = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_up");
};

module.exports.signUp = function (req, res) {
  console.log(req.body);
  if (req.body.password != req.body.confirmpassword) {
    req.flash("error", "Passwords did not match");
    return res.redirect("back");
  } else {
    var salt = 10;
    let encryptedPassword;
    bcrypt.hash(req.body.password, salt, (err, encrypted) => {
      if (err) {
        req.flash("error", "Error in creating hashed Password");
      }
      User.create(
        {
          username: req.body.username,
          password: encrypted,
        },
        function (err, user) {
          if (err) {
            console.log(err);
            req.flash("error", "Internal server error");
            return res.redirect("back");
          }
          if (user) {
            req.flash("success", "Registered Successfully");
            return res.redirect("/users/sign-in");
          }
        }
      );
    });
  }
};

module.exports.signInPage = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  return res.render("user_sign_in");
};

module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "Logout Successfully");
  req.logout();
  return res.redirect("/");
};
