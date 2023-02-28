const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  address: {},
  totalPrice: Number,
  userEmail: String,
  productDetails: Array,
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model("order", Order);
module.exports = model;
