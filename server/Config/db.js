const mongoose = require("mongoose");
let connectDB;
const DB = () => {
  connectDB = mongoose.connect("mongodb://localhost:27017/NeoStore");
  return connectDB;
};
module.exports = DB;
