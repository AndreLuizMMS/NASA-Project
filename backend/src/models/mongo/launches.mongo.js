const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  rocket: {
    type: String,
    required: true
  },
  launchDate: {
    type: Date,
    required: true
  },
  target: {
    type: String,
    required: false
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    require: true
  },
  success: {
    type: Boolean,
    require: true,
    default: true
  }
});

module.exports = mongoose.model('Launch', launchesSchema);
