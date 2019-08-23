const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    message: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    user: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
