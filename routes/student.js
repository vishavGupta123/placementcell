const express = require("express");
const router = express.Router();

const studentController = require("../controller/student_controller.js");

router.get("/", studentController.index);
router.post("/create", studentController.createStudent);
router.post("/add-status/:id", studentController.addStatus);
module.exports = router;
