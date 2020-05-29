const Interview = require("../model/interview");
const Student = require("../model/student");
const Status = require("../model/status");

module.exports.createInterviewPage = async function (req, res) {
  try {
    let interviews = await Interview.find({});
    return res.render("create_interview", {
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.createInterview = async function (req, res) {
  try {
    console.log(req.body);
    let interview = await Interview.create({
      company: req.body.company,
      student: [],
      date: req.body.date,
    });
    if (interview) {
      req.flash("success", "Successfully created a new Interview");
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports.assignInterview = async function (req, res) {
  try {
    let student = await Student.findOne({ name: req.body.student });
    if (!student) {
      req.flash("error", "student name not there in database");
      return res.redirect("back");
    }
    let interview = await Interview.findById(req.params.id);
    interview.student.push(student.id);
    await interview.save();
    student.interview.push(interview.id);
    await student.save();
    let status = await Status.create({
      interview: interview.id,
      student: student.id,
    });
    student.status.push(status.id);
    student.save();
    req.flash("success", "Successfully Assigned Interview");
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports.allInterviews = async function (req, res) {
  try {
    let interviews = await Interview.find({});
    return res.render("interview", {
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.assignInterviewPage = async function (req, res) {
  let company = await Interview.findById(req.params.id).populate("student");
  let statusArray = [];
  for (let i = 0; i < company.student.length; i++) {
    let status = await Status.findOne({
      student: company.student[i]._id,
      interview: company._id,
    });
    if (status) {
      statusArray.push(status);
    }
  }
  console.log(statusArray);
  console.log(company);
  if (company) {
    return res.render("assign_interview", {
      company: company,
      statusArray: statusArray,
    });
  }
};

module.exports.interviewInfo = async function (req, res) {
  try {
    let interviews = await Interview.find({}).populate({
      path: "student",
      populate: {
        path: "status",
      },
    });
    res.render("interview_info", {
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.resultSummary = async function (req, res) {
  try {
    let statuses = await Status.find({})
      .populate("interview")
      .populate("student");
    return res.render("result_summary", {
      statuses: statuses,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
