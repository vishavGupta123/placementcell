const express = require("express");
const app = express();
const db = require("./config/mongoose");
const port = 8000;
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser({ extended: false }));

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "careercamp",
    secret: "my-super-secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successfully running the server");
});
