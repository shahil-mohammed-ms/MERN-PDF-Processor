require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDb Connected!");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });