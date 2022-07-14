const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    books: [{ 
        type: mongoose.Schema.Types.Mixed, 
        ref: 'books' 
    }],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('events',eventSchema);