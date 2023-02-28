const mongoose = require("mongoose");

const Category = new mongoose.Schema({
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model("category", Category);
module.exports = model;
