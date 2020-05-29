const Student = require("../model/student");
const Status = require("../model/status");
const interview = require("../model/interview");

module.exports.createStudent = async function (req, res) {
  try {
    if (
      !req.body.name ||
      !req.body.college ||
      !req.body.batch ||
      !req.body.dsa ||
      !req.body.webD ||
      !req.body.react
    ) {
      req.flash("error", "Please check all the Input fields carefully");
      return res.redirect("back");
    }

    let student = await Student.create({
      name: req.body.name,
      college: req.body.college,
      batch: req.body.batch,
      course: {
        dsa: req.body.dsa,
        webD: req.body.webD,
        react: req.body.react,
      },
      interview: [],
      status: [],
    });
    if (student) {
      req.flash("success", "Created a new student successfully");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Cannot Create a new Student please check the fields");
    console.log(err);
    res.redirect("back");
  }
};

module.exports.addStatus = async function (req, res) {
  try {
    req.flash("success", "Added the company Status successfully");
    let status = await Status.findById(req.params.id);
    status.result = req.body.result;
    await status.save();
    return res.redirect("back");
  } catch (err) {
    console.log(err);
  }
};

module.exports.index = async function (req, res) {
  try {
    let students = await Student.find({});
    return res.render("student_info", {
      students: students,
    });
  } catch (err) {
    console.log(err);
  }
};
