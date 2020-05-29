const express = require("express");
const router = express.Router();
const interviewController = require("../controller/interview_controller");

router.get("/assign_interview/:id", interviewController.assignInterviewPage);
router.get("/assign_interview", interviewController.allInterviews);
router.post("/assign_interview/:id", interviewController.assignInterview);
router.get("/create_interview", interviewController.createInterviewPage);
router.post("/create_interview", interviewController.createInterview);
router.get("/", interviewController.interviewInfo);
router.get("/result-summary", interviewController.resultSummary);

module.exports = router;
