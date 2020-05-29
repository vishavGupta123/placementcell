const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/CareerCampDataBaseSystem");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connection to database"));

db.once("open", function (err) {
  if (err) {
    console.log("Error in connecting to the database");
    return;
  }
  console.log("Database connection successfull");
});

module.exports = db;
