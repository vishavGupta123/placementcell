const Student = require("../model/student");
const Status = require("../model/status");
module.exports.index = async function (req, res) {
  try {
    let students = await Student.find({}).populate({
      path: "status",
      populate: {
        path: "interview",
      },
    });

    return res.render("home", {
      students: students,
    });
  } catch (err) {
    console.log(err, "Error on loading the home page");
  }
};
