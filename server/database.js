const mongoose = require("mongoose");
const URI = `mongodb+srv://vinayak202256:${process.env.password}@ideamagix-cluster.mzgclpo.mongodb.net/?retryWrites=true&w=majority`;

async function connection() {
  return await mongoose
    .connect(URI, {
      connectTimeoutMS: 30000,
    })
    .then(() => {
      console.log("Database Connected!!");
    })
    .catch((err) => {
      if (err) throw err;
    });
}

module.exports = { connection };
