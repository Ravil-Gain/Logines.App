const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    middle_name: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    date_of_birth: {
        type: Date,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    phone_number: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    user_name: {
        type: String,
        required: true,
        max: 255,
        min: 4
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 5
    },
    role: {
        type: String,
        enum: [
            'admin',
            'manager',
            'worker'
        ]
    },
    active: {
        type: Boolean,
    },
    created: { type: Date, default: Date.now },
    factories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Factory'}]
});

module.exports = mongoose.model('User', userSchema);
