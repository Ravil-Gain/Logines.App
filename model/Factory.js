const mongoose = require('mongoose');

const factorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    description: {
        type: String,
        required: false,
        min: 6,
        max: 255
    },
    address: {
        type: String,
        min: 6,
        max: 255
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    active: {
        type: Boolean,
    },
    created: { type: Date, default: Date.now },
    factoryWT: [{type: mongoose.Schema.Types.ObjectId, ref: 'FactoryWT'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    userWT: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserWT'}],
});

module.exports = mongoose.model('Factory', factorySchema);
