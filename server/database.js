const mongoose = require("mongoose");

const connection = () => {
  mongoose.connect(
    "mongodb+srv://vinayak202256:<password>@ideamagix-cluster.mzgclpo.mongodb.net/?retryWrites=true&w=majority"
  );
};

module.exports = { connection };
