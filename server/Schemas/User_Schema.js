const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String },
  password: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  dob: { type: Date },
  profile: { type: String },
  address: [
    {
      adress: { type: String, unique: true },
      pincode: { type: Number },
      city: { type: String },
      state: { type: String },
      country: { type: String },
    },
  ],
  cart: { type: Array },
});

const model = mongoose.model("user", User);
module.exports = model;
