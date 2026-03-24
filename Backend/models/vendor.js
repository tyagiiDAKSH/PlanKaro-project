const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  service: String
});

module.exports = mongoose.model("Vendor", vendorSchema);