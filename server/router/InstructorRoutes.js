const express = require("express");
const router = express.Router();

const { getInstructorSchedules } = require("../controller/Instructor");

router.get("/get-instructor-schedules", getInstructorSchedules);

module.exports = router;
