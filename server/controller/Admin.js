const Course = require("../models/Course");
const Schedule = require("../models/Schedules");
const User = require("../models/User");

const createCourse = async (req, res) => {
  try {
    const course = new Course({ ...req.body });
    await course.save();

    res.status(201).json({ msg: "Course created successfully" });
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
};

const getSchedules = async (req, res) => {
  try {
    const course = await Schedule.find()
      .populate({ path: "instructorID" })
      .populate({ path: "courseID" });

    res.status(200).json({ course: course, msg: "success" });
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

const getInstructors = async (req, res) => {
  try {
    const user = await User.find({ role: "instructor" });
    res.status(200).json({ user: user, msg: "success" });
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

const getCourses = async (req, res) => {
  try {
    const course = await Course.find();
    res.status(200).json({ course: course, msg: "success" });
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

const scheduleInstructor = async (req, res) => {
  try {
    const { instructorID, date } = req.body;

    const schedule = await Schedule.find({
      $or: [
        {
          instructorID: instructorID,
          date: date,
        },
        { date: date },
      ],
    });

    if (schedule.length > 0) {
      res.status(200).json({ msg: "Instructor not available" });
    } else {
      const schedule = new Schedule({
        ...req.body,
      });

      schedule.save();

      res.status(201).json({ msg: "Schedule Created" });
    }
  } catch {
    res.json({ error: "something went wrong" });
  }
};

module.exports = {
  createCourse,
  scheduleInstructor,
  getSchedules,
  getInstructors,
  getCourses,
};
