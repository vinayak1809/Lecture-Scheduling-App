const Schedule = require("../models/Schedules");
const jwt = require("jsonwebtoken");

const getInstructorSchedules = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData, "user");

  const course = await Schedule.find({
    instructorID: decodedData.id,
  }).populate({
    path: "courseID",
  });

  res.status(200).json({ course: course, msg: "success" });
};

module.exports = {
  getInstructorSchedules,
};
