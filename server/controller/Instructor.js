const Schedule = require("../models/Schedules");
const jwt = require("jsonwebtoken");

const getInstructorSchedules = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    const course = await Schedule.find({
      instructorID: decodedData.id,
    }).populate({
      path: "courseID",
    });

    res.status(200).json({ course: course, msg: "success" });
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = {
  getInstructorSchedules,
};
