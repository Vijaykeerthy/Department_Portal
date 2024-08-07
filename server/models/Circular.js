const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const circularSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true,
});

const Circular = mongoose.model('Circular', circularSchema);

module.exports = Circular;
