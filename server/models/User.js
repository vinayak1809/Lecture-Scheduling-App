const mongoose = require("mongoose");
const { Schema } = mongoose;

const jwt = require("jsonwebtoken");
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "admin",
  },
});

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("user", UserSchema);
