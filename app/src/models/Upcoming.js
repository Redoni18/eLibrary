const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const upcoming = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});


module.exports = mongoose.model('upcoming', upcoming);