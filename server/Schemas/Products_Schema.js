const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  subImages: { type: Array },
  colour_id: { type: mongoose.Schema.Types.ObjectId, ref: "colour" },
  description: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  rating: { type: Number },
  features: { type: String },
  createdAt: { type: Date, default: Date.now },
  quantity: { type: Number, default: 1 },
  ratedBy: { type: Array },
});

const model = mongoose.connection.model("product", Product);
module.exports = model;
