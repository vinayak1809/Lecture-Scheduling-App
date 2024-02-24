const User = require("../models/User");

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log();
    const user = await User.findOne({ email: email, password: password });
    const token = user.getJWTToken();

    res.status(200).json({ user: user, token: token });
  } catch {
    res
      .status(500)
      .json({ error: "Wrong Email or Password", user: { role: "" } });
  }
};

const checkLoginDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decodedData.id });
    res.json({ user: user });
  } catch (err) {
    res.status(500).json({ error: "something went wrong", user: { role: "" } });
  }
};

//Tested with Postman
const register = async (req, res) => {
  try {
    const user = await new User({ ...req.body });
    user.save();

    res.status(201).json({ msg: "user created successfully" });
  } catch {
    res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = { login, register, checkLoginDetails };
