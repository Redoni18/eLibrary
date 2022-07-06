const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const requests = new Schema({
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
    },
    user: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('requests', requests);