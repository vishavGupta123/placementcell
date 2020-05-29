const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user_controller");

router.get("/sign-up", userController.signUpPage);
router.post("/sign-up", userController.signUp);
router.get("/sign-in", userController.signInPage);
//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
router.get("/sign-out", userController.destroySession);

module.exports = router;
