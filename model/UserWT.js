const mongoose = require('mongoose');

const UserWT = new mongoose.Schema({
    
    start_time:{ type: Date, required: true },
    end_time: { type: Date, required: true },
    lunch: { type: Number },
    description: { type: String, min: 1, max: 255},
    commited_amount: { type: Number },
    created: { type: Date, default: Date.now },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    factory: {type: mongoose.Schema.Types.ObjectId, ref: 'Factory'},
});

module.exports = mongoose.model('UserWT', UserWT);
