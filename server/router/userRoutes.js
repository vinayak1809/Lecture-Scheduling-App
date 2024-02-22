const express = require("express");
const router = express.Router();

const { login, register, checkLoginDetails } = require("../controller/User");

router.route("/login").post(login);
router.route("/login-details").get(checkLoginDetails);
router.route("/register").post(register);

module.exports = router;
