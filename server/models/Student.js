const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true, // Ensure roll number is unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  group: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
