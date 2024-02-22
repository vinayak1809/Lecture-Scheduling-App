const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  level: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true,
  },
});

module.exports = mongoose.model("course", CourseSchema);
