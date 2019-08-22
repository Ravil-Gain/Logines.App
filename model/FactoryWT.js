const mongoose = require('mongoose');

const factoryWTSchema = new mongoose.Schema({
    start_time:{ type: Date, required: true },
    end_time: { type: Date, required: true },
    amount: { type: Number, required: true },
    description: { type: String, min: 1, max: 255},
    created: { type: Date, default: Date.now },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    factory: {type: mongoose.Schema.Types.ObjectId, ref: 'Factory'},
});

module.exports = mongoose.model('FactoryWT', factoryWTSchema);
