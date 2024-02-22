const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
  courseID: {
    type: mongoose.Types.ObjectId,
    ref: "course",
  },
  instructorID: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: String,
  },

  timeOfDay: {
    type: String,
    default: "morning",
  },
});

module.exports = mongoose.model("schedule", ScheduleSchema);
