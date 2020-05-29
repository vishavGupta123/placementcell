const express = require("express");
const router = express.Router();
const homeController = require("../controller/home_controller");

router.get("/", homeController.index);
router.use("/student", require("./student"));
router.use("/interview", require("./interview"));
router.use("/users", require("./users"));

module.exports = router;
