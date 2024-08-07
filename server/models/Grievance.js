const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  response: {
    type: String,
    default: '',
  },
});

const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = Grievance;
