const mongoose = require("mongoose");

const Colour = new mongoose.Schema({
  colorName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model("colour", Colour);
module.exports = model;
