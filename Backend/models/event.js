const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: String,
  date: String,
  guests: Number,
  budget: Number,
  location: String,
  requirements: String,
  status: {
    type: String,
    default: "Pending"
  },
  vendorStatus: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Event", eventSchema);