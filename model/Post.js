const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    date: { type: Date, default: Date.now },
    active: { type: Boolean }
});

module.exports = mongoose.model('Post', postSchema);
