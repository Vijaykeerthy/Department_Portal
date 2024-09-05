const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    group: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    pdfFileName: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
