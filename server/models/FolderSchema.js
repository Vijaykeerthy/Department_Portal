// models/Folder.js
const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Folder', FolderSchema);
