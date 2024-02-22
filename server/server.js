const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { connection } = require("../server/database");

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  `mongodb+srv://vinayak202256:${process.env.password}@ideamagix-cluster.mzgclpo.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(require("./router/AdminRoutes"));
app.use(require("./router/InstructorRoutes"));
app.use(require("./router/userRoutes"));

app.get("/api/getKey", (req, res) => {
  res.status(200).json({ CLOUD_KEY: process.env.CLOUD_KEY });
});

app.listen(process.env.PORT, () => {
  console.log("Server is working on Port:", process.env.PORT);
});
