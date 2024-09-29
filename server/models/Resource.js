// models/Resource.js
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }, // URL to the uploaded PDF
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true }, // Reference to the folder
    semesterNumber: { type: Number, required: true } // Semester number
});

module.exports = mongoose.model('Resource', resourceSchema);
