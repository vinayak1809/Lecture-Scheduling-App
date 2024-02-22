const Course = require("../models/Course");
const Schedule = require("../models/Schedules");
const User = require("../models/User");

const createCourse = async (req, res) => {
  const course = await new Course({
    ...req.body,
  });
  course.save();

  res.status(201).json({ msg: "Course Created" });
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
  console.log(courseID, instructorID, timeOfDay, date);
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

    //const course = await Course.findOneAndUpdate(
    //  {
    //    _id: req.body.courseID,
    //  },
    //  {
    //    $push: {
    //      batches: {
    //        instructorID: instructorID,
    //        time: "",
    //        timeOfDay: timeOfDay,
    //      },
    //    },
    //  }
    //);

    res.status(201).json({ msg: "schedule created" });
  }
};

module.exports = {
  createCourse,
  scheduleInstructor,
  getSchedules,
  getInstructors,
  getCourses,
};
