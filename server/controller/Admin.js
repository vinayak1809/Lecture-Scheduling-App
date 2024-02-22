const Course = require("../models/Course");
const Schedule = require("../models/Schedules");
const User = require("../models/User");

const createCourse = async (req, res) => {
  console.log(req.body, "course");
  try {
    const course = new Course({ ...req.body });
    await course.save();

    res.status(201).json({ msg: "Course Created" });
  } catch (err) {
    console.log(err, "errrrr");
    res.json({ msg: "something went wrong" });
  }
};

const getSchedules = async (req, res) => {
  const course = await Schedule.find()
    .populate({ path: "instructorID" })
    .populate({ path: "courseID" });

  res.status(200).json({ course: course, msg: "success" });
};

const getInstructors = async (req, res) => {
  const user = await User.find({ role: "instructor" });
  res.status(200).json({ user: user, msg: "success" });
};

const getCourses = async (req, res) => {
  const course = await Course.find();
  res.status(200).json({ course: course, msg: "success" });
};

const scheduleInstructor = async (req, res) => {
  const { courseID, instructorID, timeOfDay, date } = req.body;

  const schedule = await Schedule.find({
    courseID: courseID,
    timeOfDay: timeOfDay,
    instructorID: instructorID,
  });

  if (schedule.length > 0) {
    res.status(200).json({ msg: "Instructor not avalaible" });
  } else {
    const schedule = new Schedule({
      ...req.body,
    });

    schedule.save();

    res.status(201).json({ msg: "Schedule created" });
  }
};

module.exports = {
  createCourse,
  scheduleInstructor,
  getSchedules,
  getInstructors,
  getCourses,
};
