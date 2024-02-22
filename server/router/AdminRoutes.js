const express = require("express");
const router = express.Router();

const {
  createCourse,
  scheduleInstructor,
  getSchedules,
  getInstructors,
  getCourses,
} = require("../controller/Admin");

router.route("/create-course").post(createCourse);
router.route("/schedule-instructor").post(scheduleInstructor);
router.route("/get-schedules").get(getSchedules);
router.route("/get-instructors").get(getInstructors);
router.route("/get-course").get(getCourses);

module.exports = router;
